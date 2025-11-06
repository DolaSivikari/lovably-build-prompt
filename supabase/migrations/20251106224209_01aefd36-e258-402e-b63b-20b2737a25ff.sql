-- Add rfp_email column to contact_page_settings table
ALTER TABLE public.contact_page_settings
ADD COLUMN IF NOT EXISTS rfp_email text;

COMMENT ON COLUMN public.contact_page_settings.rfp_email IS 'Email address for RFP and proposal submissions';