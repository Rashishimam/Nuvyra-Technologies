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

const RATE_LIMIT_MAX = 15;
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute

// ─── Helper: Extract client IP ──────────────────────────────

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  const realIP = request.headers.get("x-real-ip");
  if (realIP) {
    return realIP.trim();
  }

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
      console.warn(`[Nuvyra:RATE_LIMIT] Rate limit exceeded for IP: ${clientIP}`);
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please wait a moment before trying again.",
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
      console.warn("[Nuvyra:VALIDATION] Invalid JSON in request body");
      return NextResponse.json(
        { success: false, error: "Invalid request format." },
        { status: 400 }
      );
    }

    // ──────────────────────────────────────────────────────────
    // 3. Validate with Zod
    // ──────────────────────────────────────────────────────────
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const firstError =
        Object.values(fieldErrors).flat().filter(Boolean)[0] ||
        "Invalid form data.";

      console.warn("[Nuvyra:VALIDATION] Form validation failed:", firstError);

      return NextResponse.json(
        { success: false, error: firstError, fieldErrors },
        { status: 400 }
      );
    }

    const inquiry = result.data;

    // ──────────────────────────────────────────────────────────
    // 4. Honeypot check — silently accept bots without processing
    // ──────────────────────────────────────────────────────────
    if (inquiry.honeypot && inquiry.honeypot.trim().length > 0) {
      console.info("[Nuvyra:BOT] Honeypot triggered, ignoring submission.");
      return NextResponse.json({
        success: true,
        message: "Project request sent successfully. We'll get back to you soon.",
      });
    }

    // ──────────────────────────────────────────────────────────
    // 5. Database insert (Supabase) — Priority 1
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
          console.error("[Nuvyra:DATABASE] Supabase insert error:", error.message);
          dbError = error.message;
        } else {
          dbSaved = true;
          console.info("[Nuvyra:DATABASE] Inquiry successfully saved to Supabase.");
        }
      } catch (err) {
        console.error("[Nuvyra:DATABASE] Supabase insert exception:", err);
        dbError =
          err instanceof Error ? err.message : "Database insertion failed";
      }
    } else {
      console.warn("[Nuvyra:DATABASE] Supabase client not initialized (missing environment variables).");
      dbError = "Database not configured";
    }

    // ──────────────────────────────────────────────────────────
    // 6. Send notification email to owner (Resend)
    // ──────────────────────────────────────────────────────────
    let emailSent = false;
    let emailError: string | null = null;

    try {
      const ownerResult = await sendOwnerNotification(inquiry);
      emailSent = ownerResult.success;
      if (!ownerResult.success) {
        emailError = ownerResult.error || "Owner notification failed";
        console.error("[Nuvyra:EMAIL] Owner notification failed:", emailError);
      } else {
        console.info("[Nuvyra:EMAIL] Owner notification email sent successfully.");
      }
    } catch (err) {
      console.error("[Nuvyra:EMAIL] Owner email exception:", err);
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
          "[Nuvyra:EMAIL] Visitor confirmation email failed (non-fatal):",
          visitorResult.error
        );
      } else {
        console.info("[Nuvyra:EMAIL] Visitor confirmation email sent successfully.");
      }
    } catch (err) {
      console.warn(
        "[Nuvyra:EMAIL] Visitor confirmation email exception (non-fatal):",
        err
      );
    }

    // ──────────────────────────────────────────────────────────
    // 8. Overall Success / Error Response
    // ──────────────────────────────────────────────────────────
    if (dbSaved || emailSent) {
      return NextResponse.json(
        {
          success: true,
          message: "Project request sent successfully. We'll get back to you soon.",
        },
        {
          headers: {
            "X-RateLimit-Remaining": String(rateLimitResult.remaining),
          },
        }
      );
    }

    // Both DB and email failed — inquiry could not be delivered
    console.error(
      `[Nuvyra:UNKNOWN] CRITICAL: Inquiry delivery failed — DB: ${dbError}, Email: ${emailError}`
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
    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, error: "Invalid form data." },
        { status: 400 }
      );
    }

    console.error("[Nuvyra:UNKNOWN] Unexpected handler exception:", error);
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
