-- Phase 1: Fix 13 uncategorized services with proper categories
-- Update services to have proper category assignments

-- Painting Services
UPDATE public.services 
SET category = 'Painting Services',
    category_description = 'Professional painting solutions for all property types',
    category_icon = 'Paintbrush',
    category_color = 'hsl(210 95% 25%)'
WHERE slug IN ('condo-painting', 'residential-painting');

-- Exterior Systems
UPDATE public.services 
SET category = 'Exterior Systems',
    category_description = 'Comprehensive building envelope solutions',
    category_icon = 'Building2',
    category_color = 'hsl(25 95% 53%)'
WHERE slug IN ('masonry', 'masonry-restoration', 'sealants', 'metal-cladding', 'exterior-siding-cladding', 'waterproofing-restoration', 'roofing-services');

-- Specialty Services
UPDATE public.services 
SET category = 'Specialty Services',
    category_description = 'Specialized construction and finishing services',
    category_icon = 'Layers',
    category_color = 'hsl(142 52% 45%)'
WHERE slug IN ('parking-garage', 'parking-garage-coating', 'window-door-installation', 'drywall-interior-finishing', 'sustainable-building', 'suite-buildouts', 'tile-flooring', 'popcorn-ceiling-removal');

-- Construction Management (separate category)
UPDATE public.services 
SET category = 'Construction Management',
    category_description = 'Professional project management and planning services',
    category_icon = 'Building',
    category_color = 'hsl(210 95% 25%)'
WHERE slug IN ('construction-management', 'preconstruction-advisory', 'virtual-design-bim');