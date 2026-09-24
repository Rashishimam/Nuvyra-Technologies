import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client.
 *
 * Uses the SERVICE_ROLE key which bypasses Row Level Security.
 * This module must ONLY be imported from server-side code
 * (API routes, server components, server actions).
 *
 * Returns `null` if the required environment variables are not set,
 * allowing the API route to degrade gracefully.
 */
export function getSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.warn(
      "[Nuvyra] SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set. " +
        "Database storage is disabled until these are configured."
    );
    return null;
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
