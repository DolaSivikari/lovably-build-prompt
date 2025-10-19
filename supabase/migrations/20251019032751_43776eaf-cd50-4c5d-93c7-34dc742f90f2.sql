-- Add category columns to services table
ALTER TABLE services 
ADD COLUMN IF NOT EXISTS category TEXT,
ADD COLUMN IF NOT EXISTS category_description TEXT,
ADD COLUMN IF NOT EXISTS category_icon TEXT,
ADD COLUMN IF NOT EXISTS category_color TEXT;

-- Update existing services with Painting Services category
UPDATE services SET 
  category = 'Painting Services',
  category_description = 'Professional interior and exterior painting for all property types',
  category_icon = 'Paintbrush',
  category_color = 'primary'
WHERE slug IN ('commercial-painting', 'residential-painting', 'condo-painting', 'popcorn-ceiling-removal');

-- Update existing services with Exterior Systems category
UPDATE services SET 
  category = 'Exterior Systems',
  category_description = 'Comprehensive building envelope solutions and restoration',
  category_icon = 'Building2',
  category_color = 'terracotta'
WHERE slug IN ('stucco-eifs', 'metal-cladding', 'masonry-restoration', 'sealants-caulking', 'parking-garage-restoration');

-- Update existing services with Specialty Services category
UPDATE services SET 
  category = 'Specialty Services',
  category_description = 'Specialized construction and restoration services',
  category_icon = 'Layers',
  category_color = 'sage'
WHERE slug IN ('tile-flooring', 'suite-buildouts');

-- Update Construction Management services (hidden from homepage)
UPDATE services SET 
  category = 'Construction Management',
  category_description = 'Comprehensive project management and construction services',
  category_icon = 'Building',
  category_color = 'primary'
WHERE slug IN ('general-contracting', 'design-build', 'project-management', 'value-engineering', 'cost-estimating', 'construction-consulting');