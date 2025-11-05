-- Create RFP submissions table
CREATE TABLE public.rfp_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  project_name TEXT NOT NULL,
  project_type TEXT NOT NULL, -- commercial, multi-family, institutional, industrial
  project_location TEXT,
  estimated_value_range TEXT NOT NULL, -- under-500k, 500k-1m, 1m-5m, 5m-10m, 10m-plus
  estimated_timeline TEXT, -- 3-6 months, 6-12 months, 12-18 months, 18-plus
  project_start_date DATE,
  scope_of_work TEXT NOT NULL,
  delivery_method TEXT, -- general-contracting, construction-management, design-build
  bonding_required BOOLEAN DEFAULT false,
  prequalification_complete BOOLEAN DEFAULT false,
  additional_requirements TEXT,
  status TEXT DEFAULT 'new', -- new, reviewing, quoted, awarded, declined
  admin_notes TEXT,
  assigned_to UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.rfp_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for RFP submissions
CREATE POLICY "Anyone can submit RFPs"
  ON public.rfp_submissions
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all RFPs"
  ON public.rfp_submissions
  FOR SELECT
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins can update RFPs"
  ON public.rfp_submissions
  FOR UPDATE
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete RFPs"
  ON public.rfp_submissions
  FOR DELETE
  USING (is_admin(auth.uid()));

-- Add update trigger
CREATE TRIGGER update_rfp_submissions_updated_at
  BEFORE UPDATE ON public.rfp_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create notification trigger for new RFP submissions
CREATE OR REPLACE FUNCTION public.notify_admins_for_rfp()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_record record;
BEGIN
  -- Loop through all admins and super_admins
  FOR admin_record IN 
    SELECT user_id FROM user_roles 
    WHERE role IN ('admin', 'super_admin')
  LOOP
    -- Create notification for each admin
    INSERT INTO public.notifications (user_id, type, title, message, link, metadata)
    VALUES (
      admin_record.user_id,
      'rfp_submission',
      'New RFP Submission',
      NEW.company_name || ' submitted an RFP for ' || NEW.project_name,
      '/admin/rfp-submissions',
      jsonb_build_object(
        'submission_id', NEW.id, 
        'company_name', NEW.company_name,
        'project_name', NEW.project_name,
        'estimated_value', NEW.estimated_value_range
      )
    );
  END LOOP;
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER notify_admins_on_rfp_submission
  AFTER INSERT ON public.rfp_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_admins_for_rfp();

-- Create documents library table
CREATE TABLE public.documents_library (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- prequalification, insurance, capability-statement, safety, certifications, other
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size BIGINT,
  file_type TEXT,
  version TEXT DEFAULT '1.0',
  is_active BOOLEAN DEFAULT true,
  requires_authentication BOOLEAN DEFAULT false,
  expiry_date DATE,
  display_order INTEGER DEFAULT 0,
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.documents_library ENABLE ROW LEVEL SECURITY;

-- RLS Policies for documents library
CREATE POLICY "Active public documents viewable by everyone"
  ON public.documents_library
  FOR SELECT
  USING (is_active = true AND requires_authentication = false);

CREATE POLICY "Active authenticated documents viewable by logged in users"
  ON public.documents_library
  FOR SELECT
  USING (is_active = true AND requires_authentication = true AND auth.uid() IS NOT NULL);

CREATE POLICY "Admins can manage all documents"
  ON public.documents_library
  FOR ALL
  USING (is_admin(auth.uid()));

-- Add update trigger
CREATE TRIGGER update_documents_library_updated_at
  BEFORE UPDATE ON public.documents_library
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create document access log table
CREATE TABLE public.document_access_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID REFERENCES public.documents_library(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  ip_address TEXT,
  user_agent TEXT,
  accessed_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.document_access_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies for access log
CREATE POLICY "Anyone can log document access"
  ON public.document_access_log
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view access logs"
  ON public.document_access_log
  FOR SELECT
  USING (is_admin(auth.uid()));

-- Create storage bucket for documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for documents bucket
CREATE POLICY "Public documents are viewable by everyone"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'documents');

CREATE POLICY "Admins can upload documents"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'documents' AND is_admin(auth.uid()));

CREATE POLICY "Admins can update documents"
  ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'documents' AND is_admin(auth.uid()));

CREATE POLICY "Admins can delete documents"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'documents' AND is_admin(auth.uid()));