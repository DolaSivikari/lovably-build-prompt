-- =====================================================
-- Phase 1: Create All Missing Database Objects
-- =====================================================

-- 1.1: Create homepage_settings table
CREATE TABLE IF NOT EXISTS public.homepage_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  headline text NOT NULL DEFAULT 'Welcome to Ascent Group Construction',
  subheadline text NOT NULL DEFAULT 'Premium services for the Greater Toronto Area',
  hero_description text DEFAULT '',
  why_choose_content text DEFAULT '',
  services_intro text DEFAULT '',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid,
  updated_by uuid
);

-- Enable RLS
ALTER TABLE public.homepage_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Homepage settings viewable by everyone"
  ON public.homepage_settings FOR SELECT
  USING (is_active = true);

CREATE POLICY "Homepage settings manageable by admins"
  ON public.homepage_settings FOR ALL
  USING (is_admin(auth.uid()));

-- Insert default row if none exists
INSERT INTO public.homepage_settings (headline, subheadline, hero_description, is_active)
SELECT 
  'Building Excellence Across the GTA',
  'Premium painting, restoration & finishing services for commercial, residential & industrial properties',
  'With over 25 years of experience, Ascent Group Construction delivers exceptional results across the Greater Toronto Area. Our expert team specializes in commercial, residential, and industrial projects.',
  true
WHERE NOT EXISTS (SELECT 1 FROM public.homepage_settings);

-- 1.2: Create get_admin_dashboard_stats() RPC function
CREATE OR REPLACE FUNCTION public.get_admin_dashboard_stats()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result jsonb;
BEGIN
  -- Verify user is admin
  IF NOT is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Access denied: admin privileges required';
  END IF;

  -- Build stats object
  SELECT jsonb_build_object(
    'projects_published', (SELECT COUNT(*) FROM projects WHERE publish_state = 'published'),
    'projects_draft', (SELECT COUNT(*) FROM projects WHERE publish_state = 'draft'),
    'projects_total', (SELECT COUNT(*) FROM projects),
    'blog_posts_published', (SELECT COUNT(*) FROM blog_posts WHERE publish_state = 'published'),
    'blog_posts_draft', (SELECT COUNT(*) FROM blog_posts WHERE publish_state = 'draft'),
    'blog_posts_total', (SELECT COUNT(*) FROM blog_posts),
    'services_total', (SELECT COUNT(*) FROM services),
    'contact_submissions_total', (SELECT COUNT(*) FROM contact_submissions),
    'contact_submissions_new', (SELECT COUNT(*) FROM contact_submissions WHERE status = 'new'),
    'resume_submissions_total', (SELECT COUNT(*) FROM resume_submissions),
    'resume_submissions_new', (SELECT COUNT(*) FROM resume_submissions WHERE status = 'new')
  ) INTO result;

  RETURN result;
END;
$$;

-- 1.3: Create notification functions
CREATE OR REPLACE FUNCTION public.notify_admins_for_contact()
RETURNS trigger
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
      'contact_submission',
      'New Contact Form Submission',
      NEW.name || ' submitted a ' || COALESCE(NEW.submission_type, 'general') || ' inquiry',
      '/admin/contact-submissions',
      jsonb_build_object(
        'submission_id', NEW.id, 
        'submission_type', NEW.submission_type,
        'email', NEW.email
      )
    );
  END LOOP;
  
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.notify_admins_for_resume()
RETURNS trigger
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
      'resume_submission',
      'New Resume Submission',
      NEW.applicant_name || ' applied for a position',
      '/admin/resume-submissions',
      jsonb_build_object(
        'submission_id', NEW.id, 
        'applicant_name', NEW.applicant_name,
        'email', NEW.email
      )
    );
  END LOOP;
  
  RETURN NEW;
END;
$$;

-- 1.4: Create triggers
DROP TRIGGER IF EXISTS trg_contact_notify ON public.contact_submissions;
CREATE TRIGGER trg_contact_notify
  AFTER INSERT ON public.contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_admins_for_contact();

DROP TRIGGER IF EXISTS trg_resume_notify ON public.resume_submissions;
CREATE TRIGGER trg_resume_notify
  AFTER INSERT ON public.resume_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_admins_for_resume();

-- 1.5: Configure realtime for resume_submissions (others already configured)
ALTER TABLE public.resume_submissions REPLICA IDENTITY FULL;

-- Add to realtime publication (will skip if already exists)
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.resume_submissions;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;