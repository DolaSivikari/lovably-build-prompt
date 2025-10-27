-- Create footer_settings table for managing footer content
CREATE TABLE IF NOT EXISTS public.footer_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quick_links JSONB DEFAULT '[]'::jsonb,
  sectors_links JSONB DEFAULT '[]'::jsonb,
  contact_info JSONB DEFAULT '{}'::jsonb,
  social_media JSONB DEFAULT '{}'::jsonb,
  trust_bar_items JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.footer_settings ENABLE ROW LEVEL SECURITY;

-- Public can view active footer settings
CREATE POLICY "Public read access to footer_settings"
  ON public.footer_settings
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Admins have full access
CREATE POLICY "Admin full access to footer_settings"
  ON public.footer_settings
  FOR ALL
  TO authenticated
  USING (is_admin(auth.uid()));

-- Add update trigger
CREATE TRIGGER update_footer_settings_updated_at
  BEFORE UPDATE ON public.footer_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create contact_page_settings table for managing contact page
CREATE TABLE IF NOT EXISTS public.contact_page_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  office_address TEXT,
  main_phone TEXT,
  toll_free_phone TEXT,
  general_email TEXT,
  projects_email TEXT,
  careers_email TEXT,
  weekday_hours TEXT,
  saturday_hours TEXT,
  sunday_hours TEXT,
  map_embed_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_page_settings ENABLE ROW LEVEL SECURITY;

-- Public can view active contact page settings
CREATE POLICY "Public read access to contact_page_settings"
  ON public.contact_page_settings
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Admins have full access
CREATE POLICY "Admin full access to contact_page_settings"
  ON public.contact_page_settings
  FOR ALL
  TO authenticated
  USING (is_admin(auth.uid()));

-- Add update trigger
CREATE TRIGGER update_contact_page_settings_updated_at
  BEFORE UPDATE ON public.contact_page_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default footer settings
INSERT INTO public.footer_settings (
  quick_links,
  sectors_links,
  contact_info,
  social_media,
  trust_bar_items,
  is_active
) VALUES (
  '[
    {"label": "Services", "href": "/services"},
    {"label": "Projects", "href": "/projects"},
    {"label": "About Us", "href": "/about"},
    {"label": "Our Process", "href": "/our-process"},
    {"label": "Careers", "href": "/careers"},
    {"label": "Contact", "href": "/contact"}
  ]'::jsonb,
  '[
    {"label": "Homeowners", "href": "/homeowners"},
    {"label": "Property Managers", "href": "/property-managers"},
    {"label": "Commercial Clients", "href": "/commercial-clients"},
    {"label": "Developers", "href": "/company/developers"}
  ]'::jsonb,
  '{
    "address": "7895 Tranmere Drive, Unit #22, Mississauga, ON L5S 1V9",
    "phone": "(437) 747-5850",
    "email": "info@ascentgroupconstruction.com"
  }'::jsonb,
  '{
    "linkedin": "https://linkedin.com/company/ascent-group-construction",
    "facebook": "",
    "twitter": "",
    "instagram": ""
  }'::jsonb,
  '[
    {"label": "WSIB Certified", "value": "Certified"},
    {"label": "Years Excellence", "value": "15+"},
    {"label": "Licensed & Insured", "value": "Verified"},
    {"label": "Liability Coverage", "value": "$5M"}
  ]'::jsonb,
  true
);

-- Insert default contact page settings
INSERT INTO public.contact_page_settings (
  office_address,
  main_phone,
  toll_free_phone,
  general_email,
  projects_email,
  careers_email,
  weekday_hours,
  saturday_hours,
  sunday_hours,
  map_embed_url,
  is_active
) VALUES (
  '7895 Tranmere Drive, Unit #22, Mississauga, ON L5S 1V9',
  '(437) 747-5850',
  '1-800-ASCENT-1',
  'info@ascentgroupconstruction.com',
  'projects@ascentgroupconstruction.com',
  'careers@ascentgroupconstruction.com',
  'Monday - Friday: 8:00 AM - 6:00 PM',
  'Saturday: 9:00 AM - 4:00 PM',
  'Sunday: Closed',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2890.123!2d-79.123!3d43.123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1',
  true
);