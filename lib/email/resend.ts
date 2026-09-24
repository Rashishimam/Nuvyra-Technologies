import { Resend } from "resend";
import type { ContactFormData } from "@/lib/validations/contact";

const COMPANY_NAME = "Nuvyra Technologies";
const CONTACT_PERSON = "Joy";

/**
 * Get a configured Resend client.
 * Returns `null` if the API key is not set.
 */
function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      "[Nuvyra] RESEND_API_KEY not set. Email delivery is disabled."
    );
    return null;
  }
  return new Resend(apiKey);
}

/**
 * Get the configured sender and owner email addresses.
 */
function getEmailConfig() {
  return {
    from:
      process.env.EMAIL_FROM ||
      `${COMPANY_NAME} <onboarding@resend.dev>`,
    ownerEmail: process.env.OWNER_EMAIL || "withdaniel912@gmail.com",
  };
}

/**
 * Send a notification email to the Nuvyra owner when a new inquiry arrives.
 */
export async function sendOwnerNotification(
  inquiry: ContactFormData
): Promise<{ success: boolean; error?: string }> {
  const resend = getResendClient();
  if (!resend) {
    return { success: false, error: "Email service not configured." };
  }

  const { from, ownerEmail } = getEmailConfig();

  const submissionTime = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "long",
  });

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;line-height:1.6;color:#111;max-width:600px;margin:0 auto;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;background:#fff;">
      <!-- Header -->
      <div style="background:linear-gradient(135deg,#12372A 0%,#168B72 100%);padding:24px 28px;">
        <h2 style="color:#F8FAF9;margin:0;font-size:20px;font-weight:700;letter-spacing:-0.3px;">
          New Project Inquiry
        </h2>
        <p style="color:#2AB7A9;margin:6px 0 0;font-size:13px;font-weight:500;">${COMPANY_NAME}</p>
      </div>

      <!-- Body -->
      <div style="padding:24px 28px;">
        <p style="color:#475569;font-size:14px;margin:0 0 20px;">
          You received a new project inquiry from the website contact form.
        </p>

        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr>
            <td style="padding:10px 0;font-weight:600;width:160px;color:#64748b;vertical-align:top;">Name:</td>
            <td style="padding:10px 0;color:#0f172a;font-weight:500;">${inquiry.name}</td>
          </tr>
          <tr style="border-top:1px solid #f1f5f9;">
            <td style="padding:10px 0;font-weight:600;color:#64748b;vertical-align:top;">Business / Company:</td>
            <td style="padding:10px 0;color:#0f172a;">${inquiry.company || "Not provided"}</td>
          </tr>
          <tr style="border-top:1px solid #f1f5f9;">
            <td style="padding:10px 0;font-weight:600;color:#64748b;vertical-align:top;">Email:</td>
            <td style="padding:10px 0;color:#0f172a;">
              <a href="mailto:${inquiry.email}" style="color:#168B72;text-decoration:none;font-weight:500;">${inquiry.email}</a>
            </td>
          </tr>
          <tr style="border-top:1px solid #f1f5f9;">
            <td style="padding:10px 0;font-weight:600;color:#64748b;vertical-align:top;">WhatsApp / Phone:</td>
            <td style="padding:10px 0;color:#0f172a;">${inquiry.phone || "Not provided"}</td>
          </tr>
          <tr style="border-top:1px solid #f1f5f9;">
            <td style="padding:10px 0;font-weight:600;color:#64748b;vertical-align:top;">Service Needed:</td>
            <td style="padding:10px 0;color:#0f172a;font-weight:500;">${inquiry.service}</td>
          </tr>
          <tr style="border-top:1px solid #f1f5f9;">
            <td style="padding:10px 0;font-weight:600;color:#64748b;vertical-align:top;">Estimated Budget:</td>
            <td style="padding:10px 0;color:#0f172a;font-weight:500;">${inquiry.budget}</td>
          </tr>
          <tr style="border-top:1px solid #f1f5f9;">
            <td style="padding:10px 0;font-weight:600;color:#64748b;vertical-align:top;">Submitted On:</td>
            <td style="padding:10px 0;color:#64748b;font-size:13px;">${submissionTime} (IST)</td>
          </tr>
        </table>

        <!-- Project Details -->
        <div style="background:#f8fafc;border-left:4px solid #168B72;padding:16px 18px;margin:24px 0 0;border-radius:0 8px 8px 0;">
          <p style="margin:0 0 8px;font-weight:700;color:#334155;font-size:12px;text-transform:uppercase;letter-spacing:0.8px;">
            Project Details / Goals
          </p>
          <p style="margin:0;white-space:pre-wrap;color:#0f172a;font-size:14px;line-height:1.7;">${inquiry.message}</p>
        </div>
      </div>

      <!-- Footer -->
      <div style="padding:16px 28px;border-top:1px solid #e2e8f0;background:#f8fafc;">
        <p style="font-size:11px;color:#94a3b8;margin:0;">
          This message was sent from the ${COMPANY_NAME} website contact form.
        </p>
      </div>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from,
      to: ownerEmail,
      replyTo: inquiry.email,
      subject: `New Project Inquiry — ${COMPANY_NAME}`,
      html,
    });

    if (error) {
      console.error("[Nuvyra] Owner notification email failed:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("[Nuvyra] Owner notification email error:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown email error",
    };
  }
}

/**
 * Send a confirmation email to the visitor who submitted the inquiry.
 * This is best-effort — failures are logged but do not cause the API to fail.
 */
export async function sendVisitorConfirmation(
  inquiry: ContactFormData
): Promise<{ success: boolean; error?: string }> {
  const resend = getResendClient();
  if (!resend) {
    return { success: false, error: "Email service not configured." };
  }

  const { from } = getEmailConfig();

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;line-height:1.6;color:#111;max-width:540px;margin:0 auto;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;background:#fff;">
      <!-- Header -->
      <div style="background:linear-gradient(135deg,#12372A 0%,#168B72 100%);padding:24px 28px;">
        <h2 style="color:#F8FAF9;margin:0;font-size:18px;font-weight:700;">
          We received your project inquiry
        </h2>
        <p style="color:#2AB7A9;margin:6px 0 0;font-size:13px;font-weight:500;">${COMPANY_NAME}</p>
      </div>

      <!-- Body -->
      <div style="padding:24px 28px;">
        <p style="font-size:15px;color:#0f172a;margin:0 0 12px;">Hi ${inquiry.name},</p>
        <p style="font-size:15px;color:#334155;margin:0 0 12px;">
          Thank you for reaching out to <strong>${COMPANY_NAME}</strong>.
        </p>
        <p style="font-size:15px;color:#334155;margin:0 0 12px;">
          We have received your project inquiry and will review the details you submitted. Our team will get back to you shortly to discuss your project.
        </p>

        <!-- Summary -->
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px 18px;margin:20px 0;">
          <p style="margin:0 0 8px;font-weight:700;color:#334155;font-size:12px;text-transform:uppercase;letter-spacing:0.8px;">
            Your Inquiry Summary
          </p>
          <p style="margin:4px 0;font-size:14px;color:#475569;">
            <strong>Service:</strong> ${inquiry.service}
          </p>
          <p style="margin:4px 0;font-size:14px;color:#475569;">
            <strong>Budget:</strong> ${inquiry.budget}
          </p>
        </div>

        <p style="font-size:15px;color:#0f172a;margin:20px 0 0;">
          Regards,<br />
          <strong>${CONTACT_PERSON}</strong><br />
          <span style="color:#64748b;font-size:14px;">${COMPANY_NAME}</span>
        </p>
      </div>

      <!-- Footer -->
      <div style="padding:16px 28px;border-top:1px solid #e2e8f0;background:#f8fafc;">
        <p style="font-size:11px;color:#94a3b8;margin:0;">
          You're receiving this because you submitted an inquiry on the ${COMPANY_NAME} website.
        </p>
      </div>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from,
      to: inquiry.email,
      subject: `Project Inquiry Received — ${COMPANY_NAME}`,
      html,
    });

    if (error) {
      console.warn("[Nuvyra] Visitor confirmation email failed:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.warn("[Nuvyra] Visitor confirmation email error:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown email error",
    };
  }
}
