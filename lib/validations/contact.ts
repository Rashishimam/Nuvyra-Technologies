import { z } from "zod";

/**
 * Allowed service options — must match the frontend `SERVICE_OPTIONS` array
 * in components/contact/contact.tsx.
 */
export const ALLOWED_SERVICES = [
  "Business Website",
  "Landing Page",
  "E-commerce Website",
  "Web Application",
  "Portfolio Website",
  "Website Redesign",
  "Custom Digital Solution",
  "Not Sure — Let\u2019s Discuss",
] as const;

/**
 * Allowed budget options — must match the frontend `BUDGET_OPTIONS` array
 * in components/contact/contact.tsx.
 */
export const ALLOWED_BUDGETS = [
  "\u20B92,000 \u2013 \u20B95,000",
  "\u20B95,000 \u2013 \u20B910,000",
  "\u20B910,000 \u2013 \u20B915,000",
  "\u20B915,000+",
  "Not sure \u2014 Let\u2019s Discuss",
] as const;

/**
 * Strip HTML tags and trim whitespace for basic XSS prevention.
 */
function sanitize(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim();
}

/**
 * Zod schema for the contact/inquiry form.
 *
 * The frontend sends `description` but the database column is `message`.
 * This schema accepts `description` and transforms it into the validated output.
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
      .max(20, "Phone number must be 20 characters or less.")
      .transform(sanitize)
      .optional()
      .default(""),

    company: z
      .string()
      .max(200, "Company name must be 200 characters or less.")
      .transform(sanitize)
      .optional()
      .default(""),

    service: z.enum(ALLOWED_SERVICES, {
      message: "Please select a valid service.",
    }),

    budget: z.enum(ALLOWED_BUDGETS, {
      message: "Please select a valid budget range.",
    }),

    // The frontend field is called "description" but we map it to "message"
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
    service: data.service,
    budget: data.budget,
    message: data.description, // map description → message
    honeypot: data.honeypot,
  }));

/**
 * The validated + transformed output type from the contact form schema.
 */
export type ContactFormData = z.output<typeof contactFormSchema>;
