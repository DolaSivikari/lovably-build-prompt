-- Add admin_quick_actions column to site_settings table for storing customizable admin shortcuts
ALTER TABLE public.site_settings
ADD COLUMN IF NOT EXISTS admin_quick_actions JSONB DEFAULT '[]'::jsonb;

COMMENT ON COLUMN public.site_settings.admin_quick_actions IS 'Stores customizable quick action shortcuts for admin dashboard';