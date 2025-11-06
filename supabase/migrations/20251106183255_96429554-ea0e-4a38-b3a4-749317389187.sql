-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  source text DEFAULT 'footer',
  subscribed_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to subscribe
CREATE POLICY "Anyone can subscribe to newsletter"
ON public.newsletter_subscribers
FOR INSERT
WITH CHECK (true);

-- Only admins can view/manage subscribers
CREATE POLICY "Admins can view newsletter subscribers"
ON public.newsletter_subscribers
FOR SELECT
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can update newsletter subscribers"
ON public.newsletter_subscribers
FOR UPDATE
USING (is_admin(auth.uid()));

-- Create document_access_log table
CREATE TABLE IF NOT EXISTS public.document_access_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES public.documents_library(id) ON DELETE CASCADE,
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.document_access_log ENABLE ROW LEVEL SECURITY;

-- Allow anyone to log document access
CREATE POLICY "Anyone can log document access"
ON public.document_access_log
FOR INSERT
WITH CHECK (true);

-- Only admins can view logs
CREATE POLICY "Admins can view document access logs"
ON public.document_access_log
FOR SELECT
USING (is_admin(auth.uid()));

-- Create analytics_snapshots table
CREATE TABLE IF NOT EXISTS public.analytics_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path text NOT NULL,
  page_views integer DEFAULT 0,
  unique_visitors integer DEFAULT 0,
  avg_time_on_page numeric(10, 2) DEFAULT 0,
  bounce_rate numeric(5, 2) DEFAULT 0,
  snapshot_date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.analytics_snapshots ENABLE ROW LEVEL SECURITY;

-- Only admins can manage analytics
CREATE POLICY "Admins can manage analytics snapshots"
ON public.analytics_snapshots
FOR ALL
USING (is_admin(auth.uid()));

-- Create sitemap_logs table
CREATE TABLE IF NOT EXISTS public.sitemap_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url_count integer DEFAULT 0,
  status text NOT NULL,
  error_message text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.sitemap_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view sitemap logs
CREATE POLICY "Admins can view sitemap logs"
ON public.sitemap_logs
FOR SELECT
USING (is_admin(auth.uid()));

-- System can insert sitemap logs
CREATE POLICY "System can insert sitemap logs"
ON public.sitemap_logs
FOR INSERT
WITH CHECK (true);

-- Add missing columns to rfp_submissions table (if they don't exist)
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rfp_submissions' AND column_name = 'estimated_timeline') THEN
    ALTER TABLE public.rfp_submissions ADD COLUMN estimated_timeline text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rfp_submissions' AND column_name = 'project_start_date') THEN
    ALTER TABLE public.rfp_submissions ADD COLUMN project_start_date text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rfp_submissions' AND column_name = 'scope_of_work') THEN
    ALTER TABLE public.rfp_submissions ADD COLUMN scope_of_work text NOT NULL DEFAULT '';
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rfp_submissions' AND column_name = 'delivery_method') THEN
    ALTER TABLE public.rfp_submissions ADD COLUMN delivery_method text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rfp_submissions' AND column_name = 'bonding_required') THEN
    ALTER TABLE public.rfp_submissions ADD COLUMN bonding_required boolean DEFAULT false;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rfp_submissions' AND column_name = 'prequalification_complete') THEN
    ALTER TABLE public.rfp_submissions ADD COLUMN prequalification_complete boolean DEFAULT false;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'rfp_submissions' AND column_name = 'additional_requirements') THEN
    ALTER TABLE public.rfp_submissions ADD COLUMN additional_requirements text;
  END IF;
END $$;

-- Add updated_at trigger for newsletter_subscribers
CREATE TRIGGER update_newsletter_subscribers_updated_at
BEFORE UPDATE ON public.newsletter_subscribers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();