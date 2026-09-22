import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const RECIPIENT_EMAIL = "withdaniel912@gmail.com";
const CONTACT_PERSON = "Joy";
const COMPANY_NAME = "Nuvyra Technologies";

const ALLOWED_SERVICES = [
  "Business Website",
  "Landing Page",
  "E-commerce Website",
  "Web Application",
  "Portfolio Website",
  "Website Redesign",
  "Custom Digital Solution",
  "Not Sure — Let's Discuss",
];

const ALLOWED_BUDGETS = [
  "₹2,000 – ₹5,000",
  "₹5,000 – ₹10,000",
  "₹10,000 – ₹15,000",
  "₹15,000+",
  "Not sure — Let's Discuss",
];

interface ContactRequestBody {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  service?: string;
  budget?: string;
  description?: string;
  honeypot?: string;
}

function sanitize(input: string): string {
  return input.replace(/[<>]/g, "").trim();
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactRequestBody = await request.json();

    // Honeypot spam check — silently pass to not reveal anti-spam logic
    if (body.honeypot && body.honeypot.trim().length > 0) {
      return NextResponse.json({ success: true, message: "Inquiry processed." });
    }

    const rawName = body.name || "";
    const rawCompany = body.company || "";
    const rawEmail = body.email || "";
    const rawPhone = body.phone || "";
    const rawService = body.service || "";
    const rawBudget = body.budget || "";
    const rawDescription = body.description || "";

    const name = sanitize(rawName);
    const company = sanitize(rawCompany);
    const email = sanitize(rawEmail).toLowerCase();
    const phone = sanitize(rawPhone);
    const service = ALLOWED_SERVICES.includes(rawService) ? rawService : "";
    const budget = ALLOWED_BUDGETS.includes(rawBudget) ? rawBudget : "";
    const description = sanitize(rawDescription);

    // --- Validation ---
    if (!name || name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { success: false, error: "Please provide your name (2–100 characters)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email) || email.length > 150) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!service) {
      return NextResponse.json(
        { success: false, error: "Please select a service." },
        { status: 400 }
      );
    }

    if (!budget) {
      return NextResponse.json(
        { success: false, error: "Please select an estimated budget." },
        { status: 400 }
      );
    }

    if (!description || description.length < 10 || description.length > 3000) {
      return NextResponse.json(
        { success: false, error: "Please provide project details (10–3000 characters)." },
        { status: 400 }
      );
    }

    // --- Gmail SMTP config ---
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailPass) {
      console.error(
        "[Nuvyra] GMAIL_USER or GMAIL_APP_PASSWORD not set in .env.local. " +
        "Email delivery is disabled until these are configured."
      );
      return NextResponse.json(
        {
          success: false,
          error: "Your request could not be sent right now. Please try again or contact us directly.",
        },
        { status: 503 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    const submissionTime = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "long",
    });

    const ownerHtml = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;line-height:1.6;color:#111;max-width:600px;margin:0 auto;border:1px solid #e2e8f0;border-radius:8px;padding:24px;background:#fff;">
        <h2 style="color:#0891b2;margin-top:0;border-bottom:1px solid #e2e8f0;padding-bottom:12px;font-size:20px;">New Project Inquiry — ${COMPANY_NAME}</h2>
        <p style="color:#475569;font-size:14px;">You received a new project inquiry from the website contact form.</p>
        <table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:14px;">
          <tr><td style="padding:8px 0;font-weight:600;width:160px;color:#64748b;">Name:</td><td style="padding:8px 0;color:#0f172a;font-weight:500;">${name}</td></tr>
          <tr><td style="padding:8px 0;font-weight:600;color:#64748b;">Business / Company:</td><td style="padding:8px 0;color:#0f172a;">${company || "Not provided"}</td></tr>
          <tr><td style="padding:8px 0;font-weight:600;color:#64748b;">Email:</td><td style="padding:8px 0;color:#0f172a;"><a href="mailto:${email}" style="color:#0891b2;text-decoration:none;">${email}</a></td></tr>
          <tr><td style="padding:8px 0;font-weight:600;color:#64748b;">WhatsApp / Phone:</td><td style="padding:8px 0;color:#0f172a;">${phone || "Not provided"}</td></tr>
          <tr><td style="padding:8px 0;font-weight:600;color:#64748b;">Service Needed:</td><td style="padding:8px 0;color:#0f172a;">${service}</td></tr>
          <tr><td style="padding:8px 0;font-weight:600;color:#64748b;">Estimated Budget:</td><td style="padding:8px 0;color:#0f172a;">${budget}</td></tr>
          <tr><td style="padding:8px 0;font-weight:600;color:#64748b;">Submitted On:</td><td style="padding:8px 0;color:#64748b;">${submissionTime} (IST)</td></tr>
        </table>
        <div style="background:#f8fafc;border-left:4px solid #0891b2;padding:14px 16px;margin:20px 0;border-radius:4px;">
          <p style="margin:0 0 6px 0;font-weight:600;color:#334155;font-size:13px;text-transform:uppercase;letter-spacing:.5px;">Project Details / Goals:</p>
          <p style="margin:0;white-space:pre-wrap;color:#0f172a;font-size:14px;line-height:1.6;">${description}</p>
        </div>
        <p style="font-size:12px;color:#94a3b8;margin-top:24px;border-top:1px solid #e2e8f0;padding-top:12px;">
          This message was sent from the Nuvyra Technologies website contact form.
        </p>
      </div>
    `;

    const ownerText = `New Project Inquiry — ${COMPANY_NAME}
======================================
Name: ${name}
Business / Company: ${company || "Not provided"}
Email: ${email}
WhatsApp / Phone: ${phone || "Not provided"}
Service Needed: ${service}
Estimated Budget: ${budget}
Submitted On: ${submissionTime} (IST)

Project Details / Goals:
------------------------
${description}`;

    // 1. Send notification to Joy
    await transporter.sendMail({
      from: `"${COMPANY_NAME} Inquiries" <${gmailUser}>`,
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `New Project Inquiry — ${COMPANY_NAME}`,
      html: ownerHtml,
      text: ownerText,
    });

    // 2. Send confirmation to visitor (best-effort — do not fail if this errors)
    try {
      await transporter.sendMail({
        from: `"${COMPANY_NAME}" <${gmailUser}>`,
        to: email,
        subject: `Project Inquiry Received — ${COMPANY_NAME}`,
        text: `Hi ${name},\n\nThank you for contacting ${COMPANY_NAME}.\n\nWe have received your project inquiry and will review the details you submitted.\n\nRegards,\n${CONTACT_PERSON}\n${COMPANY_NAME}`,
        html: `
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;line-height:1.6;color:#111;max-width:540px;margin:0 auto;padding:24px;border:1px solid #e2e8f0;border-radius:8px;background:#fff;">
            <p style="font-size:15px;color:#0f172a;margin-top:0;">Hi ${name},</p>
            <p style="font-size:15px;color:#334155;">Thank you for contacting <strong>${COMPANY_NAME}</strong>.</p>
            <p style="font-size:15px;color:#334155;">We have received your project inquiry and will review the details you submitted.</p>
            <br />
            <p style="font-size:15px;color:#0f172a;margin-bottom:0;">Regards,<br /><strong>${CONTACT_PERSON}</strong><br />${COMPANY_NAME}</p>
          </div>
        `,
      });
    } catch (confirmErr) {
      console.warn("[Nuvyra] Visitor confirmation email failed (non-fatal):", confirmErr);
    }

    return NextResponse.json({
      success: true,
      message: "Your project request has been sent successfully.",
    });
  } catch (error) {
    console.error("[Nuvyra] Contact handler error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Your request could not be sent right now. Please try again or contact us directly.",
      },
      { status: 500 }
    );
  }
}
