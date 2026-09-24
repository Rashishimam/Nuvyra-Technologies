import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { contactFormSchema } from "@/lib/validations/contact";
import { getSupabaseClient } from "@/lib/supabase/client";
import {
  sendOwnerNotification,
  sendVisitorConfirmation,
} from "@/lib/email/resend";
import { rateLimit } from "@/lib/rate-limit";

// ─── Constants ──────────────────────────────────────────────

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute

// ─── Helper: Extract client IP ──────────────────────────────

function getClientIP(request: NextRequest): string {
  // Vercel / reverse proxy headers
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  const realIP = request.headers.get("x-real-ip");
  if (realIP) {
    return realIP.trim();
  }

  // Fallback for local development
  return "127.0.0.1";
}

// ─── POST Handler ───────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    // ──────────────────────────────────────────────────────────
    // 1. Rate limiting
    // ──────────────────────────────────────────────────────────
    const clientIP = getClientIP(request);
    const rateLimitResult = rateLimit(clientIP, {
      maxRequests: RATE_LIMIT_MAX,
      windowMs: RATE_LIMIT_WINDOW_MS,
    });

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Too many requests. Please wait a moment before trying again.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(
              Math.ceil((rateLimitResult.resetAt - Date.now()) / 1000)
            ),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(rateLimitResult.resetAt),
          },
        }
      );
    }

    // ──────────────────────────────────────────────────────────
    // 2. Parse request body
    // ──────────────────────────────────────────────────────────
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid request body." },
        { status: 400 }
      );
    }

    // ──────────────────────────────────────────────────────────
    // 3. Validate with Zod
    // ──────────────────────────────────────────────────────────
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      // Return the first error message for display
      const firstError =
        Object.values(fieldErrors).flat().filter(Boolean)[0] ||
        "Invalid form data.";

      return NextResponse.json(
        { success: false, error: firstError, fieldErrors },
        { status: 400 }
      );
    }

    const inquiry = result.data;

    // ──────────────────────────────────────────────────────────
    // 4. Honeypot check — silently "accept" to not reveal logic
    // ──────────────────────────────────────────────────────────
    if (inquiry.honeypot && inquiry.honeypot.trim().length > 0) {
      return NextResponse.json({
        success: true,
        message: "Your project request has been sent successfully.",
      });
    }

    // ──────────────────────────────────────────────────────────
    // 5. Database insert (Supabase) — first priority
    //    Even if email fails later, the inquiry is preserved.
    // ──────────────────────────────────────────────────────────
    let dbSaved = false;
    let dbError: string | null = null;

    const supabase = getSupabaseClient();

    if (supabase) {
      try {
        const { error } = await supabase.from("inquiries").insert({
          name: inquiry.name,
          email: inquiry.email,
          phone: inquiry.phone || null,
          company: inquiry.company || null,
          service: inquiry.service,
          budget: inquiry.budget,
          message: inquiry.message,
          status: "new",
        });

        if (error) {
          console.error("[Nuvyra] Supabase insert error:", error);
          dbError = error.message;
        } else {
          dbSaved = true;
        }
      } catch (err) {
        console.error("[Nuvyra] Supabase insert exception:", err);
        dbError =
          err instanceof Error ? err.message : "Database insertion failed";
      }
    } else {
      dbError = "Database not configured";
    }

    // ──────────────────────────────────────────────────────────
    // 6. Send notification email to owner
    // ──────────────────────────────────────────────────────────
    let emailSent = false;
    let emailError: string | null = null;

    try {
      const ownerResult = await sendOwnerNotification(inquiry);
      emailSent = ownerResult.success;
      if (!ownerResult.success) {
        emailError = ownerResult.error || "Owner notification failed";
      }
    } catch (err) {
      console.error("[Nuvyra] Owner email exception:", err);
      emailError =
        err instanceof Error ? err.message : "Owner notification failed";
    }

    // ──────────────────────────────────────────────────────────
    // 7. Send confirmation email to visitor (best-effort)
    // ──────────────────────────────────────────────────────────
    try {
      const visitorResult = await sendVisitorConfirmation(inquiry);
      if (!visitorResult.success) {
        console.warn(
          "[Nuvyra] Visitor confirmation email failed (non-fatal):",
          visitorResult.error
        );
      }
    } catch (err) {
      console.warn(
        "[Nuvyra] Visitor confirmation email exception (non-fatal):",
        err
      );
    }

    // ──────────────────────────────────────────────────────────
    // 8. Determine overall response
    //
    //    Success if EITHER the DB save or owner email succeeded.
    //    The inquiry is considered "received" if we have it
    //    stored somewhere (DB) or someone was notified (email).
    //    Both failing = inquiry would be lost = error.
    // ──────────────────────────────────────────────────────────
    if (dbSaved || emailSent) {
      // Log any partial failures for monitoring
      if (!dbSaved) {
        console.warn(
          `[Nuvyra] Inquiry from ${inquiry.email} — DB save failed (${dbError}), but email was sent.`
        );
      }
      if (!emailSent) {
        console.warn(
          `[Nuvyra] Inquiry from ${inquiry.email} — Email failed (${emailError}), but saved to DB.`
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: "Your project request has been sent successfully.",
        },
        {
          headers: {
            "X-RateLimit-Remaining": String(rateLimitResult.remaining),
          },
        }
      );
    }

    // Both DB and email failed — inquiry would be lost
    console.error(
      `[Nuvyra] CRITICAL: Inquiry from ${inquiry.email} LOST — ` +
        `DB error: ${dbError}, Email error: ${emailError}`
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Your request could not be sent right now. Please try again or contact us directly.",
      },
      { status: 503 }
    );
  } catch (error) {
    // Catch-all for unexpected errors
    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, error: "Invalid form data." },
        { status: 400 }
      );
    }

    console.error("[Nuvyra] Contact handler unexpected error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "Your request could not be sent right now. Please try again or contact us directly.",
      },
      { status: 500 }
    );
  }
}
