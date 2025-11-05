-- Create homepage_settings table for admin-managed hero content
CREATE TABLE IF NOT EXISTS public.homepage_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  headline TEXT NOT NULL DEFAULT 'Ontario''s Trusted General Contractor',
  subheadline TEXT NOT NULL DEFAULT 'Delivering commercial, multi-family, and institutional projects on-time and on-budget since 2009',
  hero_description TEXT DEFAULT 'With 15+ years of construction management expertise across Ontario, Ascent Group Construction specializes in design-build, general contracting, and construction management for commercial, institutional, and multi-family projects. We deliver quality results through transparent project management and proven construction methodologies.',
  cta_primary_text TEXT DEFAULT 'Submit RFP',
  cta_primary_url TEXT DEFAULT '/submit-rfp',
  cta_secondary_text TEXT DEFAULT 'Request Proposal',
  cta_secondary_url TEXT DEFAULT '/contact',
  cta_tertiary_text TEXT DEFAULT 'View Projects',
  cta_tertiary_url TEXT DEFAULT '/projects',
  value_prop_1 TEXT DEFAULT 'Licensed & Bonded',
  value_prop_2 TEXT DEFAULT '500+ Projects Completed',
  value_prop_3 TEXT DEFAULT '98% Client Satisfaction',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID,
  updated_by UUID
);

-- Enable RLS
ALTER TABLE public.homepage_settings ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Homepage settings viewable by everyone"
  ON public.homepage_settings
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Homepage settings manageable by admins"
  ON public.homepage_settings
  FOR ALL
  USING (is_admin(auth.uid()));

-- Insert default GC-focused content
INSERT INTO public.homepage_settings (
  headline,
  subheadline,
  hero_description,
  is_active
) VALUES (
  'Ontario''s Trusted General Contractor',
  'Delivering commercial, multi-family, and institutional projects on-time and on-budget since 2009',
  'With 15+ years of construction management expertise across Ontario, Ascent Group Construction specializes in design-build, general contracting, and construction management for commercial, institutional, and multi-family projects. We deliver quality results through transparent project management and proven construction methodologies.',
  true
);

-- Create trigger for updated_at
CREATE TRIGGER update_homepage_settings_updated_at
  BEFORE UPDATE ON public.homepage_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();