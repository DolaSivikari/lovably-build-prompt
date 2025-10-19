-- Add rich content fields to services table
ALTER TABLE public.services 
ADD COLUMN service_overview text,
ADD COLUMN process_steps jsonb DEFAULT '[]'::jsonb,
ADD COLUMN what_we_provide jsonb DEFAULT '[]'::jsonb,
ADD COLUMN typical_applications jsonb DEFAULT '[]'::jsonb,
ADD COLUMN key_benefits jsonb DEFAULT '[]'::jsonb,
ADD COLUMN faq_items jsonb DEFAULT '[]'::jsonb;

-- Remove pricing and timeline columns as requested
ALTER TABLE public.services 
DROP COLUMN IF EXISTS pricing_range_min,
DROP COLUMN IF EXISTS pricing_range_max,
DROP COLUMN IF EXISTS estimated_timeline;

-- Add comments for documentation
COMMENT ON COLUMN public.services.service_overview IS 'Comprehensive overview of what the service is and who it is for';
COMMENT ON COLUMN public.services.process_steps IS 'Array of objects with step_number, title, and description fields';
COMMENT ON COLUMN public.services.what_we_provide IS 'Array of strings or objects describing what is included';
COMMENT ON COLUMN public.services.typical_applications IS 'Array of strings or objects describing common use cases';
COMMENT ON COLUMN public.services.key_benefits IS 'Array of strings or objects describing service benefits';
COMMENT ON COLUMN public.services.faq_items IS 'Array of objects with question and answer fields';