import { z } from "zod";

/**
 * Allowed service options — matches frontend SERVICE_OPTIONS in components/contact/contact.tsx.
 * Normalized to support standard and typographic quotation marks / dashes.
 */
export const ALLOWED_SERVICES = [
  "Business Website",
  "Landing Page",
  "E-commerce Website",
  "Web Application",
  "Portfolio Website",
  "Website Redesign",
  "Custom Digital Solution",
  "Not Sure — Let's Discuss",
  "Not Sure — Let’s Discuss",
] as const;

/**
 * Allowed budget options — matches frontend BUDGET_OPTIONS in components/contact/contact.tsx.
 */
export const ALLOWED_BUDGETS = [
  "₹2,000 – ₹5,000",
  "₹5,000 – ₹10,000",
  "₹10,000 – ₹15,000",
  "₹15,000+",
  "Not sure — Let's Discuss",
  "Not sure — Let’s Discuss",
] as const;

/**
 * Strip HTML tags and trim whitespace for basic XSS prevention.
 */
function sanitize(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim();
}

/**
 * Zod schema for the contact/inquiry form.
 */
export const contactFormSchema = z
  .object({
    name: z
      .string()
      .min(1, "Please enter your name.")
      .max(100, "Name must be 100 characters or less.")
      .transform(sanitize)
      .pipe(z.string().min(2, "Name must be at least 2 characters.")),

    email: z
      .string()
      .min(1, "Please enter your email address.")
      .max(150, "Email must be 150 characters or less.")
      .email("Please enter a valid email address.")
      .transform((v) => sanitize(v).toLowerCase()),

    phone: z
      .string()
      .max(30, "Phone number must be 30 characters or less.")
      .transform(sanitize)
      .optional()
      .default(""),

    company: z
      .string()
      .max(200, "Company name must be 200 characters or less.")
      .transform(sanitize)
      .optional()
      .default(""),

    service: z
      .string()
      .min(1, "Please select a service.")
      .transform(sanitize)
      .refine(
        (val) => {
          const normalized = val.replace(/’/g, "'");
          return ALLOWED_SERVICES.some((s) => s.replace(/’/g, "'") === normalized);
        },
        { message: "Please select a valid service option." }
      ),

    budget: z
      .string()
      .min(1, "Please select an estimated budget.")
      .transform(sanitize)
      .refine(
        (val) => {
          const normalized = val.replace(/’/g, "'");
          return ALLOWED_BUDGETS.some((b) => b.replace(/’/g, "'") === normalized);
        },
        { message: "Please select a valid budget range." }
      ),

    // The frontend field is called "description", mapped to "message"
    description: z
      .string()
      .min(1, "Please describe your project details or goals.")
      .max(3000, "Project details must be 3000 characters or less.")
      .transform(sanitize)
      .pipe(
        z
          .string()
          .min(10, "Please provide at least 10 characters describing your project.")
      ),

    // Honeypot field — should always be empty for real users
    honeypot: z.string().optional().default(""),
  })
  .transform((data) => ({
    name: data.name,
    email: data.email,
    phone: data.phone,
    company: data.company,
    service: data.service.replace(/’/g, "'"),
    budget: data.budget.replace(/’/g, "'"),
    message: data.description, // map description → message
    honeypot: data.honeypot,
  }));

export type ContactFormData = z.output<typeof contactFormSchema>;
