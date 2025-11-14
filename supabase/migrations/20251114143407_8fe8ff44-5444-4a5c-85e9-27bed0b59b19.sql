
-- Drop the triggers and function with CASCADE
DROP FUNCTION IF EXISTS validate_html_content() CASCADE;

-- Archive services to be removed
UPDATE services SET publish_state = 'archived' 
WHERE slug IN (
  'facade-remediation', 
  'parking-garage-restoration', 
  'sealant-replacement', 
  'waterproofing-restoration',
  'parking-rehabilitation', 
  'roofing', 
  'windows-doors', 
  'preconstruction-services', 
  'virtual-design-construction', 
  'suite-buildouts', 
  'exterior-envelope',
  'painting',
  'eifs-stucco',
  'metal-cladding',
  'exterior-cladding'
);

-- Publish Sustainable Building
UPDATE services SET 
  publish_state = 'published', 
  service_tier = 'PRIME_SPECIALTY',
  short_description = 'Sustainable construction solutions including LEED consulting, energy-efficient building systems, and green building certifications.',
  featured = false
WHERE slug = 'sustainable-construction';

-- Update Tile & Flooring  
UPDATE services SET 
  service_tier = 'TRADE_PACKAGE', 
  category = 'Interior Construction',
  short_description = 'Professional tile installation and flooring services for commercial, institutional, and multi-family projects.',
  featured = false
WHERE slug = 'tile-flooring';

-- Update commercial-painting to become unified Painting Services
UPDATE services SET 
  name = 'Painting Services', 
  slug = 'painting-services', 
  publish_state = 'published', 
  service_tier = 'TRADE_PACKAGE',
  category = 'Interior Construction',
  short_description = 'Complete painting services for commercial, multi-family, and residential projects with certified crews.',
  featured = false
WHERE slug = 'commercial-painting';

-- Create new Cladding Systems service
INSERT INTO services (
  slug, 
  name, 
  category, 
  service_tier, 
  publish_state, 
  featured,
  short_description,
  icon_name
) VALUES (
  'cladding-systems', 
  'Cladding Systems', 
  'Exterior Systems', 
  'PRIME_SPECIALTY', 
  'published', 
  false,
  'Complete exterior cladding solutions including metal panels, EIFS/stucco, and rainscreen assemblies.',
  'Building2'
) ON CONFLICT (slug) DO NOTHING;
