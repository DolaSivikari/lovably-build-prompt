-- Create awards and certifications table
CREATE TABLE public.awards_certifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  issuing_organization TEXT NOT NULL,
  date_received DATE NOT NULL,
  expiry_date DATE,
  category TEXT NOT NULL CHECK (category IN ('certification', 'award', 'membership', 'accreditation')),
  badge_image_url TEXT,
  credential_number TEXT,
  verification_url TEXT,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  show_on_homepage BOOLEAN NOT NULL DEFAULT false,
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.awards_certifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Active awards viewable by everyone"
  ON public.awards_certifications
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Awards manageable by admins"
  ON public.awards_certifications
  FOR ALL
  USING (is_admin(auth.uid()));

-- Trigger for updated_at
CREATE TRIGGER update_awards_certifications_updated_at
  BEFORE UPDATE ON public.awards_certifications
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for performance
CREATE INDEX idx_awards_certifications_display_order ON public.awards_certifications(display_order);
CREATE INDEX idx_awards_certifications_category ON public.awards_certifications(category);
CREATE INDEX idx_awards_certifications_expiry ON public.awards_certifications(expiry_date);

-- Insert seed data for common GC certifications
INSERT INTO public.awards_certifications (
  title, issuing_organization, date_received, expiry_date, category, 
  description, display_order, show_on_homepage
) VALUES
  ('WSIB Clearance Certificate', 'Workplace Safety and Insurance Board', '2024-01-01', '2025-12-31', 'certification',
   'Current WSIB clearance demonstrating compliance with Ontario workplace safety regulations', 1, true),
  ('Commercial General Liability Insurance', 'Insurance Provider', '2024-01-01', '2025-12-31', 'certification',
   '$5M comprehensive commercial general liability coverage', 2, true),
  ('COR Certification', 'Infrastructure Health & Safety Association', '2023-06-01', '2026-06-01', 'certification',
   'Certificate of Recognition for workplace health and safety excellence', 3, true),
  ('LEED Accredited Professional', 'Canada Green Building Council', '2022-03-15', NULL, 'accreditation',
   'Leadership in Energy and Environmental Design professional accreditation', 4, true),
  ('Ontario General Contractor License', 'Technical Standards and Safety Authority', '2009-01-01', '2025-12-31', 'certification',
   'Licensed and bonded general contractor in Ontario', 5, true),
  ('Better Business Bureau Accredited', 'BBB of Ontario', '2015-06-01', NULL, 'membership',
   'A+ rating with Better Business Bureau, demonstrating commitment to ethical business practices', 6, true);