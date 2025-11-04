-- Add missing company credentials fields to about_page_settings
ALTER TABLE about_page_settings
ADD COLUMN IF NOT EXISTS licenses jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS memberships text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS insurance jsonb DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS credentials_cta_headline text DEFAULT 'Our Credentials',
ADD COLUMN IF NOT EXISTS credentials_cta_text text DEFAULT 'View our complete certifications and insurance coverage';

-- Add company info fields to site_settings for global access
ALTER TABLE site_settings
ADD COLUMN IF NOT EXISTS service_areas text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS knows_about text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS founded_year integer DEFAULT 2009,
ADD COLUMN IF NOT EXISTS company_tagline text DEFAULT 'Your Complete Construction Partner Across Ontario';

-- Migrate data from company-credentials.json to about_page_settings
UPDATE about_page_settings
SET 
  licenses = '[
    {
      "name": "Ontario General Contractor License",
      "description": "Fully licensed for commercial and residential construction"
    },
    {
      "name": "WSIB Clearance Certificate",
      "description": "Active workplace safety and insurance coverage"
    },
    {
      "name": "Municipal Business Licenses",
      "description": "Licensed to operate in Toronto, Mississauga, Brampton, Vaughan, and Markham"
    }
  ]'::jsonb,
  memberships = ARRAY[
    'Ontario General Contractors Association (OGCA)',
    'Toronto Construction Association',
    'Canadian Construction Association',
    'Building Industry and Land Development Association'
  ],
  insurance = '{
    "liability": "$5,000,000 Commercial General Liability",
    "wsib": "Active WSIB Coverage for All Workers",
    "bonding": "Bonding Available for Large Projects"
  }'::jsonb
WHERE is_active = true;

-- Migrate company info to site_settings
UPDATE site_settings
SET 
  service_areas = ARRAY[
    'Toronto',
    'Mississauga',
    'Brampton',
    'Vaughan',
    'Markham',
    'Richmond Hill',
    'Oakville',
    'Burlington'
  ],
  knows_about = ARRAY[
    'Commercial Painting',
    'Residential Painting',
    'Stucco Installation',
    'EIFS Systems',
    'Masonry Restoration',
    'Metal Cladding',
    'Parking Garage Waterproofing',
    'Exterior Building Restoration',
    'Construction Project Management',
    'Building Envelope Services'
  ],
  founded_year = 2009,
  company_tagline = 'Your Complete Construction Partner Across Ontario'
WHERE is_active = true;