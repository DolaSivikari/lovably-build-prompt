-- Phase 1: Foundation & Positioning (Fixed)

-- 1) HERO - Specialty positioning (deactivate all, insert new)
UPDATE hero_slides SET is_active = false;

INSERT INTO hero_slides (
  headline, subheadline, description,
  primary_cta_text, primary_cta_url, primary_cta_icon,
  secondary_cta_text, secondary_cta_url,
  stat_number, stat_label, display_order, is_active
) VALUES (
  'Envelope & Restoration Contractor',
  'Prime Contractor for Façade Remediation, Parking Garage Restoration & Sealant Programs. Self-performed trades serving developers, property managers & building owners across Ontario & the GTA.',
  'Specialty envelope execution with transparent project controls, permit coordination, and warranty-backed results.',
  'Request Project Quote', '/quote', 'FileText',
  'View Our Services', '/services',
  '$25k-$150k', 'Typical Project Range', 1, true
);

-- 2) SERVICE TIERS - Update constraint first
ALTER TABLE services DROP CONSTRAINT IF EXISTS services_service_tier_check;

ALTER TABLE services ADD CONSTRAINT services_service_tier_check 
  CHECK (service_tier = ANY (ARRAY['primary_delivery'::text, 'self_perform'::text, 'PRIME_SPECIALTY'::text, 'TRADE_PACKAGE'::text]));

-- Now update service tiers
UPDATE services SET 
  service_tier = 'PRIME_SPECIALTY',
  challenge_tags = ARRAY['building_envelope', 'water_infiltration', 'facade_restoration']
WHERE slug IN ('building-envelope', 'parking-rehabilitation', 'masonry-restoration', 'waterproofing', 'eifs-stucco');

UPDATE services SET 
  service_tier = 'TRADE_PACKAGE'
WHERE slug IN ('metal-cladding', 'exterior-cladding', 'painting', 'roofing');

-- 3) VALUE PILLARS TABLE (new)
CREATE TABLE value_pillars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT,
  display_order INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES profiles(id),
  updated_by UUID REFERENCES profiles(id)
);

ALTER TABLE value_pillars ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active value pillars"
  ON value_pillars FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage value pillars"
  ON value_pillars FOR ALL
  USING (is_admin(auth.uid()));

INSERT INTO value_pillars (title, description, icon_name, display_order) VALUES
('Prime Delivery Within Your Specialty', 'We take full project responsibility for envelope and garage scopes, from permit coordination through warranty, so you have one point of accountability.', 'Target', 1),
('Self-Performed Core Trades', 'EIFS, sealants, masonry, and coatings executed by our crews—not layered subcontractors—giving you schedule certainty and quality control.', 'Users', 2),
('Transparent Risk Management', 'Site-specific safety plans, daily photo documentation, ITP hold points, and clean closeout packages that satisfy consultants and reduce your liability.', 'ShieldCheck', 3);