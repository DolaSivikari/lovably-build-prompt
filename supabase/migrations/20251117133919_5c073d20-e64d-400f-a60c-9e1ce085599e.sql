-- Add missing columns to rfp_submissions table
ALTER TABLE public.rfp_submissions
ADD COLUMN IF NOT EXISTS consent_timestamp timestamp with time zone,
ADD COLUMN IF NOT EXISTS consent_ip text,
ADD COLUMN IF NOT EXISTS title text,
ADD COLUMN IF NOT EXISTS plans_available boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS site_visit_required boolean DEFAULT false;

-- Add comment to document these fields
COMMENT ON COLUMN public.rfp_submissions.consent_timestamp IS 'Timestamp when user gave consent';
COMMENT ON COLUMN public.rfp_submissions.consent_ip IS 'IP address of user when consent was given';
COMMENT ON COLUMN public.rfp_submissions.title IS 'Job title of contact person';
COMMENT ON COLUMN public.rfp_submissions.plans_available IS 'Whether project plans are available';
COMMENT ON COLUMN public.rfp_submissions.site_visit_required IS 'Whether a site visit is required';