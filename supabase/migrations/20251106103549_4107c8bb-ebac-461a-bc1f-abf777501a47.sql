-- Create hero_slides table for managing homepage hero carousel
CREATE TABLE public.hero_slides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  headline TEXT NOT NULL,
  subheadline TEXT NOT NULL,
  description TEXT,
  stat_number TEXT,
  stat_label TEXT,
  primary_cta_text TEXT NOT NULL DEFAULT 'Submit RFP',
  primary_cta_url TEXT NOT NULL DEFAULT '/submit-rfp',
  primary_cta_icon TEXT DEFAULT 'FileText',
  secondary_cta_text TEXT,
  secondary_cta_url TEXT,
  video_url TEXT,
  poster_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Active hero slides viewable by everyone"
ON public.hero_slides
FOR SELECT
USING (is_active = true);

CREATE POLICY "Hero slides manageable by admins"
ON public.hero_slides
FOR ALL
USING (is_admin(auth.uid()));

-- Create trigger for updated_at
CREATE TRIGGER update_hero_slides_updated_at
BEFORE UPDATE ON public.hero_slides
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Seed with existing 6 slides
INSERT INTO public.hero_slides (display_order, headline, subheadline, description, stat_number, stat_label, primary_cta_text, primary_cta_url, primary_cta_icon, secondary_cta_text, secondary_cta_url, video_url, poster_url) VALUES
(1, 'Commercial Construction', 'Expert General Contracting', 'From office buildings to retail spaces, we deliver commercial projects that meet demanding schedules and budgets. Our team specializes in multi-family, institutional, and commercial construction with proven project management excellence.', '500+', 'Projects Completed', 'View Our Work', '/projects', 'Building2', 'Get a Quote', '/contact', '/hero-clipchamp.mp4', '/hero-poster-1.webp'),

(2, 'Design-Build Excellence', 'Integrated Project Delivery', 'Streamline your construction process with our design-build approach. We coordinate architecture, engineering, and construction under one roof, reducing costs and accelerating timelines while maintaining exceptional quality standards.', '15+', 'Years Experience', 'Learn More', '/services/design-build', 'Ruler', 'Start a Project', '/submit-rfp', '/hero-clipchamp.mp4', '/hero-poster-2.webp'),

(3, 'Building Envelope Solutions', 'Protect Your Investment', 'Expert installation and restoration of building facades, waterproofing systems, and exterior cladding. We ensure your building envelope performs efficiently, protecting against weather while enhancing aesthetic appeal and energy performance.', '98%', 'Client Satisfaction', 'Our Services', '/services/building-envelope', 'Shield', 'Request Consultation', '/contact', '/hero-clipchamp.mp4', '/hero-poster-3.webp'),

(4, 'Construction Management', 'On-Time, On-Budget Delivery', 'Professional construction management services that keep your project on track. Our experienced team coordinates trades, manages schedules, controls costs, and ensures quality from groundbreaking to final inspection.', '$2B+', 'Projects Managed', 'View Capabilities', '/services/construction-management', 'ClipboardCheck', 'Discuss Your Project', '/contact', '/hero-clipchamp.mp4', '/hero-poster-4.webp'),

(5, 'Masonry & Restoration', 'Heritage & Modern Masonry', 'Specializing in both new construction and restoration of masonry structures. From historic building preservation to contemporary masonry installations, our craftsmen deliver lasting quality with attention to architectural detail.', '200+', 'Masonry Projects', 'See Our Work', '/services/masonry-restoration', 'Hammer', 'Get Expert Advice', '/contact', '/hero-clipchamp.mp4', '/hero-poster-5.webp'),

(6, 'Waterproofing Systems', 'Complete Moisture Protection', 'Comprehensive waterproofing solutions for commercial and institutional buildings. We prevent water intrusion through advanced membrane systems, sealants, and drainage solutions that protect structural integrity and indoor environments.', '1000+', 'Systems Installed', 'Learn About Solutions', '/services/waterproofing', 'Droplets', 'Schedule Assessment', '/contact', '/hero-clipchamp.mp4', '/hero-poster-6.webp');

-- Create index for ordering
CREATE INDEX idx_hero_slides_display_order ON public.hero_slides(display_order);
CREATE INDEX idx_hero_slides_active ON public.hero_slides(is_active);