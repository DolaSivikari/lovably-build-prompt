-- Phase 1: Enforce single active row per settings table
-- Add partial unique indexes to prevent multiple active rows

CREATE UNIQUE INDEX IF NOT EXISTS uniq_site_settings_active 
ON public.site_settings ((true)) 
WHERE is_active = true;

CREATE UNIQUE INDEX IF NOT EXISTS uniq_homepage_settings_active 
ON public.homepage_settings ((true)) 
WHERE is_active = true;

CREATE UNIQUE INDEX IF NOT EXISTS uniq_footer_settings_active 
ON public.footer_settings ((true)) 
WHERE is_active = true;

CREATE UNIQUE INDEX IF NOT EXISTS uniq_contact_page_settings_active 
ON public.contact_page_settings ((true)) 
WHERE is_active = true;

CREATE UNIQUE INDEX IF NOT EXISTS uniq_about_page_settings_active 
ON public.about_page_settings ((true)) 
WHERE is_active = true;

-- Clean up any existing duplicate active rows (keep newest)
-- For site_settings
UPDATE public.site_settings
SET is_active = false
WHERE is_active = true
AND id NOT IN (
  SELECT id FROM public.site_settings
  WHERE is_active = true
  ORDER BY updated_at DESC
  LIMIT 1
);

-- For homepage_settings
UPDATE public.homepage_settings
SET is_active = false
WHERE is_active = true
AND id NOT IN (
  SELECT id FROM public.homepage_settings
  WHERE is_active = true
  ORDER BY updated_at DESC
  LIMIT 1
);

-- For footer_settings
UPDATE public.footer_settings
SET is_active = false
WHERE is_active = true
AND id NOT IN (
  SELECT id FROM public.footer_settings
  WHERE is_active = true
  ORDER BY updated_at DESC
  LIMIT 1
);

-- For contact_page_settings
UPDATE public.contact_page_settings
SET is_active = false
WHERE is_active = true
AND id NOT IN (
  SELECT id FROM public.contact_page_settings
  WHERE is_active = true
  ORDER BY updated_at DESC
  LIMIT 1
);

-- For about_page_settings
UPDATE public.about_page_settings
SET is_active = false
WHERE is_active = true
AND id NOT IN (
  SELECT id FROM public.about_page_settings
  WHERE is_active = true
  ORDER BY updated_at DESC
  LIMIT 1
);