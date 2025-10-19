-- Add new fields to landing_page table for PCL-inspired design
ALTER TABLE public.landing_page
ADD COLUMN IF NOT EXISTS featured_stories JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS projects_count INTEGER DEFAULT 500,
ADD COLUMN IF NOT EXISTS years_in_business INTEGER DEFAULT 25,
ADD COLUMN IF NOT EXISTS insured BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS background_image_alt TEXT DEFAULT 'Ascent Group construction project background';

-- Add helpful comment
COMMENT ON COLUMN public.landing_page.featured_stories IS 'Array of featured story objects: [{id, title, image, link, tag}]';
COMMENT ON COLUMN public.landing_page.background_image_alt IS 'Alt text for background image (accessibility)';

-- Update existing row with sample data if exists
UPDATE public.landing_page
SET 
  featured_stories = COALESCE(featured_stories, '[]'::jsonb),
  projects_count = COALESCE(projects_count, 500),
  years_in_business = COALESCE(years_in_business, 25),
  insured = COALESCE(insured, true),
  background_image_alt = COALESCE(background_image_alt, 'Ascent Group construction project background')
WHERE id IS NOT NULL;