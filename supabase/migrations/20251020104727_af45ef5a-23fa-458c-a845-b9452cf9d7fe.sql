-- Create certifications table
CREATE TABLE public.certifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  description TEXT,
  issued_by TEXT,
  expiry_date DATE,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create prequalification_downloads table
CREATE TABLE public.prequalification_downloads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  project_type TEXT,
  project_value_range TEXT,
  message TEXT,
  downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prequalification_downloads ENABLE ROW LEVEL SECURITY;

-- Certifications viewable by everyone
CREATE POLICY "Active certifications viewable by everyone"
ON public.certifications
FOR SELECT
USING (is_active = true);

-- Certifications manageable by admins
CREATE POLICY "Certifications manageable by admins"
ON public.certifications
FOR ALL
USING (is_admin(auth.uid()));

-- Anyone can submit prequalification request
CREATE POLICY "Anyone can submit prequalification request"
ON public.prequalification_downloads
FOR INSERT
WITH CHECK (true);

-- Admins can view prequalification downloads
CREATE POLICY "Admins can view prequalification downloads"
ON public.prequalification_downloads
FOR SELECT
USING (is_admin(auth.uid()));

-- Create trigger for updated_at
CREATE TRIGGER update_certifications_updated_at
BEFORE UPDATE ON public.certifications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial certification data
INSERT INTO public.certifications (name, description, issued_by, display_order, is_active) VALUES
('WSIB Compliant', 'Full compliance with Workplace Safety and Insurance Board regulations', 'WSIB Ontario', 1, true),
('$5M+ Liability Insurance', 'Comprehensive general liability coverage protecting your project', 'Commercial Insurance Provider', 2, true),
('Master Painters Association', 'Certified member in good standing', 'Master Painters Association', 3, true),
('BBB A+ Rating', 'Accredited business with excellent customer satisfaction', 'Better Business Bureau', 4, true),
('OSHA Safety Certified', 'Occupational Safety and Health Administration compliance', 'OSHA', 5, true),
('Licensed & Bonded', 'Fully licensed contractor with performance bonds available', 'Ontario Government', 6, true),
('Environmental Compliance', 'Eco-friendly practices and waste management certification', 'Environmental Standards', 7, true),
('Manufacturer Certified', 'Authorized applicator for premium paint brands', 'Sherwin-Williams, Benjamin Moore', 8, true);