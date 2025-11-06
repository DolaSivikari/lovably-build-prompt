-- =====================================================
-- RESTORE SUBMISSION TABLES - These are actively used!
-- Recreate tables that were incorrectly dropped
-- =====================================================

-- Restore contact_submissions table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  created_at timestamptz DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  message text NOT NULL,
  submission_type text DEFAULT 'general',
  status text DEFAULT 'new',
  admin_notes text
);

-- Restore RLS policies for contact_submissions
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view contact submissions"
  ON public.contact_submissions FOR SELECT
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins can update contact submissions"
  ON public.contact_submissions FOR UPDATE
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete contact submissions"
  ON public.contact_submissions FOR DELETE
  USING (is_admin(auth.uid()));

CREATE POLICY "Anyone can submit contact forms"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Block anonymous SELECT on contact submissions"
  ON public.contact_submissions FOR SELECT
  USING (false);

-- Restore resume_submissions table
CREATE TABLE IF NOT EXISTS public.resume_submissions (
  id uuid PRIMARY KEY DEFAULT extensions.uuid_generate_v4(),
  job_id uuid,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  applicant_name text NOT NULL,
  email text NOT NULL,
  phone text,
  cover_message text,
  resume_url text,
  portfolio_links text[],
  admin_notes text
);

-- Restore RLS policies for resume_submissions
ALTER TABLE public.resume_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Resume submissions viewable by admins"
  ON public.resume_submissions FOR SELECT
  USING (is_admin(auth.uid()));

CREATE POLICY "Resume submissions manageable by admins"
  ON public.resume_submissions FOR UPDATE
  USING (is_admin(auth.uid()));

CREATE POLICY "Resume submissions deletable by admins"
  ON public.resume_submissions FOR DELETE
  USING (is_admin(auth.uid()));

CREATE POLICY "Anyone can submit resumes"
  ON public.resume_submissions FOR INSERT
  WITH CHECK (true);

-- Restore prequalification_downloads table  
CREATE TABLE IF NOT EXISTS public.prequalification_downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  downloaded_at timestamptz DEFAULT now(),
  company_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text,
  project_type text,
  project_value_range text,
  message text,
  status text DEFAULT 'new'
);

-- Restore RLS policies for prequalification_downloads
ALTER TABLE public.prequalification_downloads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view prequalification downloads"
  ON public.prequalification_downloads FOR SELECT
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins can update prequalification downloads"
  ON public.prequalification_downloads FOR UPDATE
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete prequalification downloads"
  ON public.prequalification_downloads FOR DELETE
  USING (is_admin(auth.uid()));

CREATE POLICY "Anyone can submit prequalification request"
  ON public.prequalification_downloads FOR INSERT
  WITH CHECK (true);

-- Restore rfp_submissions table (referenced in code)
CREATE TABLE IF NOT EXISTS public.rfp_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  company_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text,
  project_name text NOT NULL,
  project_type text,
  project_location text,
  estimated_value_range text,
  estimated_start_date date,
  project_description text,
  special_requirements text,
  status text DEFAULT 'new',
  admin_notes text
);

-- Restore RLS policies for rfp_submissions
ALTER TABLE public.rfp_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage rfp submissions"
  ON public.rfp_submissions FOR ALL
  USING (is_admin(auth.uid()));

CREATE POLICY "Anyone can submit RFPs"
  ON public.rfp_submissions FOR INSERT
  WITH CHECK (true);