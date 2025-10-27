-- Drop unused tables that don't match any displayed content
DROP TABLE IF EXISTS public.homepage_settings CASCADE;
DROP TABLE IF EXISTS public.hero_content CASCADE;

-- Create new landing_menu_items table for NumberedLandingHero component
CREATE TABLE public.landing_menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  number TEXT NOT NULL,
  title TEXT NOT NULL,
  subtext TEXT NOT NULL,
  link TEXT NOT NULL,
  display_order INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id),
  CONSTRAINT unique_display_order UNIQUE(display_order)
);

-- Enable RLS
ALTER TABLE public.landing_menu_items ENABLE ROW LEVEL SECURITY;

-- Public can read active menu items
CREATE POLICY "Public read active menu items"
  ON public.landing_menu_items FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

-- Admins can manage all menu items
CREATE POLICY "Admins manage menu items"
  ON public.landing_menu_items FOR ALL
  TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- Seed with current data from landing-menu.ts
INSERT INTO public.landing_menu_items (number, title, subtext, link, display_order) VALUES
  ('01', 'OUR SERVICES', 'Painting, Exterior Systems & Specialty Work', '/services', 1),
  ('02', 'WHO WE SERVE', 'Homeowners, Property Managers & Commercial Clients', '/homeowners', 2),
  ('03', 'ABOUT US', '15+ Years of Craftsmanship & Excellence', '/about', 3),
  ('04', 'OUR PROJECTS', '500+ Completed Projects Across the GTA', '/projects', 4),
  ('05', 'CONTACT US', 'Let''s Build Something Exceptional Together', '/contact', 5);