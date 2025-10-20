-- Add fields to services table for enhanced services explorer
ALTER TABLE public.services
ADD COLUMN IF NOT EXISTS featured boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS typical_timeline text,
ADD COLUMN IF NOT EXISTS project_types text[] DEFAULT ARRAY['commercial', 'residential'];

-- Update some existing services to be featured (most popular)
UPDATE public.services 
SET featured = true,
    typical_timeline = '3-5 days',
    project_types = ARRAY['commercial', 'residential', 'industrial']
WHERE id IN (
  SELECT id FROM public.services 
  WHERE category = 'Painting Services' 
  ORDER BY name
  LIMIT 3
);

UPDATE public.services 
SET typical_timeline = '1-2 weeks',
    project_types = ARRAY['commercial', 'industrial']
WHERE id IN (
  SELECT id FROM public.services 
  WHERE category = 'Exterior Systems'
  ORDER BY name
  LIMIT 2
);

UPDATE public.services 
SET typical_timeline = '5-10 days',
    project_types = ARRAY['commercial', 'residential']
WHERE id IN (
  SELECT id FROM public.services 
  WHERE category = 'Specialty Services'
  ORDER BY name
  LIMIT 1
);

COMMENT ON COLUMN public.services.featured IS 'Whether this service is featured/most popular';
COMMENT ON COLUMN public.services.typical_timeline IS 'Typical project timeline (e.g., "3-5 days", "1-2 weeks")';
COMMENT ON COLUMN public.services.project_types IS 'Array of project types: residential, commercial, industrial';