
-- Phase 2: Specialty Landing Pages Infrastructure

BEGIN;

-- Create specialty_pages table with JSONB content blocks
CREATE TABLE specialty_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  content_blocks JSONB NOT NULL DEFAULT '[]',
  meta_title TEXT,
  meta_description TEXT,
  og_image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES profiles(id),
  updated_by UUID REFERENCES profiles(id)
);

-- Enable RLS
ALTER TABLE specialty_pages ENABLE ROW LEVEL SECURITY;

-- Public can view active specialty pages
CREATE POLICY "Public can view active specialty pages"
  ON specialty_pages FOR SELECT
  USING (is_active = true);

-- Admins can manage specialty pages
CREATE POLICY "Admins can manage specialty pages"
  ON specialty_pages FOR ALL
  USING (is_admin(auth.uid()));

-- Add updated_at trigger
CREATE TRIGGER update_specialty_pages_updated_at
  BEFORE UPDATE ON specialty_pages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert 3 specialty landing pages
INSERT INTO specialty_pages (slug, title, subtitle, content_blocks, meta_title, meta_description) VALUES
('for-general-contractors', 
 'Trade Packages for General Contractors',
 'We''ll take your EIFS / sealants / paint / masonry package',
 '[
   {"type":"intro","content":"When you need a reliable specialty trade partner for building envelope work, we deliver submittals in 48 hours, maintain QA/QC documentation, and close out clean with lien waivers and warranty packages."},
   {"type":"features","items":["Submittals in 48h; shop drawings & SDS included","QA/QC checklists and sample ITPs","Weekend/night work available","Clean closeouts with lien waivers","Unit rates available upon request"]},
   {"type":"services_grid","services":[
     {"title":"EIFS & Stucco","description":"Patch, repair, refinish"},
     {"title":"Sealant Replacement","description":"Perimeters, joints, penetrations"},
     {"title":"Masonry Tuck-Pointing","description":"Brick, block, stone"},
     {"title":"Protective Coatings","description":"Traffic decks, parkades"}
   ]},
   {"type":"cta","primary":{"text":"Request Unit Rates","url":"/quote"},"secondary":{"text":"View Our Services","url":"/services"}}
 ]',
 'Trade Packages for GCs | Ascent Group Construction',
 'Reliable EIFS, sealants, paint, and masonry packages for general contractors. 48h submittals, QA/QC included.'
),
('emergency-maintenance',
 'Emergency & Maintenance — Leak & Seal Program',
 '48–72h response for building envelope emergencies',
 '[
   {"type":"intro","content":"We respond with diagnostic site walks within 48–72 hours, provide photo-documented reports, and execute repairs with NTE (not-to-exceed) options."},
   {"type":"features","items":["Sealant failures and leak investigation","EIFS patches and emergency repairs","Tuck-pointing for water infiltration","Spall repair and concrete protection","Diagnostic photos & simple reports","After-hours response available","NTE pricing options"]},
   {"type":"cta","primary":{"text":"Book a Site Walk","url":"/quote"}}
 ]',
 'Emergency Building Envelope Repairs | Ascent Group',
 '48–72h response for leaks, EIFS patches, and sealant failures. After-hours available.'
),
('vendor-packet',
 'Vendor Packet & Compliance',
 'Prequalification documentation for contractors & building owners',
 '[
   {"type":"intro","content":"We maintain WSIB coverage, commercial liability insurance, and site-specific safety planning. Download docs or request via email."},
   {"type":"document_list","title":"Insurance & Clearances","documents":[
     {"title":"WSIB Clearance Certificate","action":"email","subject":"WSIB Clearance Request"},
     {"title":"Certificate of Insurance (summary)","action":"email","subject":"COI Request"},
     {"title":"HST Number & EFT Details","action":"email","subject":"HST & Banking Info Request"}
   ]},
   {"type":"document_list","title":"Safety & Quality","documents":[
     {"title":"Safety Policy (1-page)","action":"email","subject":"Safety Policy Request"},
     {"title":"Site-Specific Safety Plan Template","action":"email","subject":"SSSP Template Request"},
     {"title":"QA/QC Checklist & Sample ITPs (Sealants / EIFS / Masonry)","action":"email","subject":"Sample ITPs Request"}
   ]}
 ]',
 'Vendor Packet & Compliance | Ascent Group Construction',
 'WSIB, insurance, and safety documentation for prequalification.'
);

COMMIT;
