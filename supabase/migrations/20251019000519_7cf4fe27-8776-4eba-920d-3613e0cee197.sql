-- Create hero_content table for hero section
CREATE TABLE public.hero_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  headline TEXT NOT NULL,
  subheadline TEXT NOT NULL,
  badge_text TEXT,
  primary_cta_text TEXT NOT NULL,
  primary_cta_url TEXT NOT NULL,
  secondary_cta_text TEXT,
  secondary_cta_url TEXT,
  background_image TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- Create site_settings table for global settings
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL DEFAULT 'Ascent Group Construction',
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT,
  business_hours JSONB DEFAULT '{"weekday": "Mon-Fri: 8AM-6PM", "saturday": "Sat: 9AM-4PM", "sunday": "Closed"}'::jsonb,
  social_links JSONB DEFAULT '{"linkedin": "", "twitter": "", "facebook": "", "instagram": ""}'::jsonb,
  certifications TEXT[] DEFAULT ARRAY['Fully Insured & Licensed', 'WSIB Compliant'],
  google_analytics_id TEXT,
  meta_title TEXT,
  meta_description TEXT,
  og_image TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quote TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_position TEXT,
  company_name TEXT,
  project_name TEXT,
  rating NUMERIC DEFAULT 5.0 CHECK (rating >= 0 AND rating <= 5),
  date_published DATE DEFAULT CURRENT_DATE,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  publish_state publish_state DEFAULT 'published',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- Create stats table for homepage statistics
CREATE TABLE public.stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL,
  value INTEGER NOT NULL,
  suffix TEXT,
  description TEXT,
  icon_name TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;

-- RLS Policies for hero_content
CREATE POLICY "Hero content viewable by everyone"
  ON public.hero_content FOR SELECT
  USING (is_active = true);

CREATE POLICY "Hero content manageable by content editors"
  ON public.hero_content FOR ALL
  USING (can_edit_content(auth.uid()));

-- RLS Policies for site_settings
CREATE POLICY "Site settings viewable by everyone"
  ON public.site_settings FOR SELECT
  USING (is_active = true);

CREATE POLICY "Site settings manageable by admins"
  ON public.site_settings FOR ALL
  USING (is_admin(auth.uid()));

-- RLS Policies for testimonials
CREATE POLICY "Published testimonials viewable by everyone"
  ON public.testimonials FOR SELECT
  USING (publish_state = 'published');

CREATE POLICY "Testimonials manageable by content editors"
  ON public.testimonials FOR ALL
  USING (can_edit_content(auth.uid()));

-- RLS Policies for stats
CREATE POLICY "Active stats viewable by everyone"
  ON public.stats FOR SELECT
  USING (is_active = true);

CREATE POLICY "Stats manageable by content editors"
  ON public.stats FOR ALL
  USING (can_edit_content(auth.uid()));

-- Create triggers for updated_at
CREATE TRIGGER update_hero_content_updated_at
  BEFORE UPDATE ON public.hero_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON public.testimonials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_stats_updated_at
  BEFORE UPDATE ON public.stats
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default hero content
INSERT INTO public.hero_content (
  headline,
  subheadline,
  badge_text,
  primary_cta_text,
  primary_cta_url,
  secondary_cta_text,
  secondary_cta_url,
  background_image,
  is_active
) VALUES (
  'Building Excellence, Crafting Legacy',
  'Ascent Group Construction merges heritage craftsmanship with modern innovation to deliver exceptional painting and exterior finishing services across the GTA. Trusted by homeowners and businesses for over 15 years.',
  'Trusted Excellence Since 2009',
  'Get Started',
  '/contact',
  'View Our Work',
  '/projects',
  '/hero-construction.jpg',
  true
);

-- Insert default site settings
INSERT INTO public.site_settings (
  company_name,
  phone,
  email,
  address,
  business_hours,
  certifications,
  meta_title,
  meta_description,
  is_active
) VALUES (
  'Ascent Group Construction',
  '(416) 555-1234',
  'info@ascentgroupconstruction.com',
  'Greater Toronto Area, Ontario',
  '{"weekday": "Mon-Fri: 8AM-6PM", "saturday": "Sat: 9AM-4PM", "sunday": "Closed"}'::jsonb,
  ARRAY['Fully Insured & Licensed', 'WSIB Compliant'],
  'Ascent Group Construction - Professional Painting & Restoration',
  'Leading painting and exterior finishing services across the GTA',
  true
);

-- Insert default stats
INSERT INTO public.stats (label, value, suffix, description, icon_name, display_order, is_active) VALUES
  ('Projects Completed', 500, '+', 'Residential and commercial painting projects across the GTA', 'Building', 1, true),
  ('Skilled Professionals', 50, '+', 'Dedicated team of experts committed to excellence', 'Users', 2, true),
  ('Client Satisfaction', 98, '%', 'Proven track record of delivering on promises', 'Award', 3, true),
  ('Years of Experience', 15, '+', 'Serving the GTA since 2009 with quality craftsmanship', 'TrendingUp', 4, true);

-- Insert default testimonials
INSERT INTO public.testimonials (
  quote,
  author_name,
  author_position,
  company_name,
  project_name,
  rating,
  date_published,
  is_featured,
  display_order,
  publish_state
) VALUES
  (
    'Our 200-space parking garage restoration came out beautifully. Ascent handled everything from concrete repair to waterproofing, and we haven''t had a single leak since.',
    'Robert Chang',
    'Property Manager',
    'Skyline Properties',
    'Parking Garage Restoration',
    5.0,
    '2024-09-15',
    true,
    1,
    'published'
  ),
  (
    'They painted our entire 24-unit condo building in just under 3 weeks. Great crew, fair price, and the exterior looks fantastic. Would definitely hire again.',
    'Maria Santos',
    'Condo Board President',
    'Lakeview Condominiums',
    'Exterior Condo Painting',
    5.0,
    '2024-08-22',
    true,
    2,
    'published'
  ),
  (
    'Professional team that understood our tight timeline. The warehouse floor coating was done over a weekend with zero disruption to our operations.',
    'Jennifer Foster',
    'Facility Director',
    'Metro Distribution',
    'Warehouse Flooring',
    4.5,
    '2024-07-10',
    true,
    3,
    'published'
  );