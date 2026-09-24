-- ═══════════════════════════════════════════════════════════════
-- Nuvyra Technologies — Complete Inquiries Database Schema
-- Matches app/api/contact/route.ts & lib/supabase/client.ts
-- ═══════════════════════════════════════════════════════════════

-- 1. Create the inquiries table
CREATE TABLE IF NOT EXISTS public.inquiries (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT,
  company     TEXT,
  service     TEXT NOT NULL,
  budget      TEXT,
  message     TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'new'
              CHECK (status IN ('new', 'contacted', 'in_progress', 'completed', 'rejected')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Performance indexes for status, timestamp, and email queries
CREATE INDEX IF NOT EXISTS idx_inquiries_status_created
  ON public.inquiries (status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_inquiries_email
  ON public.inquiries (email);

-- 3. Function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 4. Trigger to invoke the update_updated_at function on row updates
DROP TRIGGER IF EXISTS trg_inquiries_updated_at ON public.inquiries;
CREATE TRIGGER trg_inquiries_updated_at
  BEFORE UPDATE ON public.inquiries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- 5. Enable Row Level Security (RLS) to restrict direct database access
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- 6. Grant full access strictly to the service_role (server-side API only)
--    This prevents any public/anon client access to visitor inquiries
DROP POLICY IF EXISTS "Service role full access" ON public.inquiries;
CREATE POLICY "Service role full access"
  ON public.inquiries FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
