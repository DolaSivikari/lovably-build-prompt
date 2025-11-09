-- Add challenge_tags to services table for Market Intelligence alignment
ALTER TABLE public.services 
ADD COLUMN IF NOT EXISTS challenge_tags TEXT[] DEFAULT '{}';

COMMENT ON COLUMN public.services.challenge_tags IS 'Tags linking services to Market Intelligence challenges (housing, envelope, infrastructure, sustainability)';

-- Update existing services with appropriate challenge tags based on their category and type
-- Core Project Delivery Services
UPDATE public.services 
SET challenge_tags = ARRAY['housing', 'infrastructure']
WHERE category = 'Construction Management' 
  AND name IN ('General Contracting', 'Construction Management');

UPDATE public.services 
SET challenge_tags = ARRAY['housing', 'infrastructure', 'sustainability']
WHERE name = 'Design-Build';

-- Building Envelope Services
UPDATE public.services 
SET challenge_tags = ARRAY['envelope', 'sustainability']
WHERE category = 'Exterior Cladding Systems' 
   OR category = 'Exterior Systems'
   OR name ILIKE '%waterproof%'
   OR name ILIKE '%envelope%'
   OR name ILIKE '%restoration%';

-- Painting and Interior Services
UPDATE public.services 
SET challenge_tags = ARRAY['housing']
WHERE category = 'Painting Services';

-- Sustainability-focused services
UPDATE public.services 
SET challenge_tags = array_append(COALESCE(challenge_tags, '{}'), 'sustainability')
WHERE name ILIKE '%green%' 
   OR name ILIKE '%sustainable%'
   OR name ILIKE '%energy%'
   OR name ILIKE '%LEED%';

-- Ensure service_tier is set appropriately
UPDATE public.services 
SET service_tier = 'primary_delivery'
WHERE category = 'Construction Management' 
  AND service_tier IS NULL;

UPDATE public.services 
SET service_tier = 'self_perform'
WHERE category IN ('Exterior Cladding Systems', 'Exterior Systems', 'Painting Services')
  AND service_tier IS NULL;

UPDATE public.services 
SET service_tier = 'specialized'
WHERE service_tier IS NULL;