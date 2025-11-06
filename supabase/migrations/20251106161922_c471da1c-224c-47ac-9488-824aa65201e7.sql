-- Create hero_images table for managing page hero images
CREATE TABLE IF NOT EXISTS public.hero_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL UNIQUE,
  page_title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add index for active images and page lookup
CREATE INDEX IF NOT EXISTS idx_hero_images_page_path ON public.hero_images(page_path);
CREATE INDEX IF NOT EXISTS idx_hero_images_active ON public.hero_images(is_active);

-- Enable RLS
ALTER TABLE public.hero_images ENABLE ROW LEVEL SECURITY;

-- Public can view active hero images
CREATE POLICY "Anyone can view active hero images"
  ON public.hero_images
  FOR SELECT
  USING (is_active = true);

-- Authenticated users can manage hero images (admin check should be done in application)
CREATE POLICY "Authenticated users can manage hero images"
  ON public.hero_images
  FOR ALL
  USING (auth.uid() IS NOT NULL);

-- Create updated_at trigger
CREATE TRIGGER update_hero_images_updated_at
  BEFORE UPDATE ON public.hero_images
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default hero images for existing pages
INSERT INTO public.hero_images (page_path, page_title, image_url, alt_text, is_active) VALUES
  ('/about', 'About Us', '/src/assets/heroes/hero-about-company.jpg', 'Construction team collaboration in modern office', true),
  ('/markets', 'Markets We Serve', '/src/assets/heroes/hero-markets-overview.jpg', 'Diverse urban skyline showing multiple building types', true),
  ('/resources/contractor-portal', 'Contractor Portal', '/src/assets/heroes/hero-contractor-portal.jpg', 'Professional contractor documentation workspace', true),
  ('/resources/financing', 'Financing Options', '/src/assets/heroes/hero-financing.jpg', 'Financial planning and construction financing', true),
  ('/resources/service-areas', 'Service Areas', '/src/assets/heroes/hero-service-areas.jpg', 'Ontario service coverage map', true),
  ('/resources/warranties', 'Warranties & Guarantees', '/src/assets/heroes/hero-warranties.jpg', 'Warranty certificates and quality assurance documents', true),
  ('/company/team', 'Our Team', '/src/assets/heroes/hero-team.jpg', 'Diverse construction leadership team', true),
  ('/company/developers', 'For Developers', '/src/assets/heroes/hero-developers.jpg', 'Developers collaborating over architectural models', true),
  ('/company/equipment', 'Equipment & Resources', '/src/assets/heroes/hero-equipment.jpg', 'Construction equipment fleet and machinery', true),
  ('/company/certifications-insurance', 'Certifications & Insurance', '/src/assets/heroes/hero-certifications.jpg', 'Professional certifications and credentials display', true)
ON CONFLICT (page_path) DO NOTHING;