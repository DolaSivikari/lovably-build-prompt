-- Fix remaining uncategorized services

-- Painting Services
UPDATE public.services 
SET category = 'Painting Services',
    category_description = 'Professional painting solutions for all property types',
    category_icon = 'Paintbrush',
    category_color = 'hsl(210 95% 25%)'
WHERE slug = 'condo-multi-unit';

-- Exterior Systems
UPDATE public.services 
SET category = 'Exterior Systems',
    category_description = 'Comprehensive building envelope solutions',
    category_icon = 'Building2',
    category_color = 'hsl(25 95% 53%)'
WHERE slug IN ('exterior-siding', 'waterproofing', 'roofing');

-- Specialty Services
UPDATE public.services 
SET category = 'Specialty Services',
    category_description = 'Specialized construction and finishing services',
    category_icon = 'Layers',
    category_color = 'hsl(142 52% 45%)'
WHERE slug IN ('drywall-finishing', 'windows-doors', 'sustainable-construction');

-- Construction Management
UPDATE public.services 
SET category = 'Construction Management',
    category_description = 'Professional project management and planning services',
    category_icon = 'Building',
    category_color = 'hsl(210 95% 25%)'
WHERE slug IN ('preconstruction-services', 'virtual-design-construction');