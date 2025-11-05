-- Add service_tier column to services table for Primary Delivery vs Self-Perform grouping
ALTER TABLE public.services 
ADD COLUMN service_tier TEXT CHECK (service_tier IN ('primary_delivery', 'self_perform'));

-- Migrate existing services based on their names and categories
-- Primary Delivery: General Contracting, Construction Management, Design-Build
UPDATE public.services 
SET service_tier = 'primary_delivery'
WHERE name IN ('General Contracting', 'Construction Management', 'Design-Build')
   OR slug IN ('general-contracting', 'construction-management', 'design-build');

-- All other services are Self-Perform trades
UPDATE public.services 
SET service_tier = 'self_perform'
WHERE service_tier IS NULL;

-- Add index for better query performance
CREATE INDEX idx_services_tier ON public.services(service_tier) WHERE publish_state = 'published';