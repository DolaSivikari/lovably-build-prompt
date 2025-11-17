-- Create admin notifications table
CREATE TABLE IF NOT EXISTS public.admin_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  notification_type TEXT NOT NULL CHECK (notification_type IN ('rfp', 'contact', 'resume', 'prequal', 'quote', 'newsletter')),
  reference_id UUID NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_admin_notifications_user_id ON public.admin_notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_notifications_is_read ON public.admin_notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_admin_notifications_created_at ON public.admin_notifications(created_at DESC);

-- Enable RLS
ALTER TABLE public.admin_notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Admins can view all notifications"
  ON public.admin_notifications FOR SELECT
  TO authenticated
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins can update their notifications"
  ON public.admin_notifications FOR UPDATE
  TO authenticated
  USING (is_admin(auth.uid()));

CREATE POLICY "System can insert notifications"
  ON public.admin_notifications FOR INSERT
  WITH CHECK (true);

-- Function to create notification for all admins
CREATE OR REPLACE FUNCTION public.notify_admins(
  p_type TEXT,
  p_ref_id UUID,
  p_title TEXT,
  p_message TEXT
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_record RECORD;
BEGIN
  -- Insert notification for each admin user
  FOR admin_record IN 
    SELECT DISTINCT ur.user_id
    FROM public.user_roles ur
    WHERE ur.role IN ('admin', 'super_admin')
  LOOP
    INSERT INTO public.admin_notifications (
      user_id,
      notification_type,
      reference_id,
      title,
      message
    ) VALUES (
      admin_record.user_id,
      p_type,
      p_ref_id,
      p_title,
      p_message
    );
  END LOOP;
END;
$$;

-- Trigger function for RFP submissions
CREATE OR REPLACE FUNCTION public.notify_new_rfp()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM notify_admins(
    'rfp',
    NEW.id,
    'New RFP Submission',
    'New RFP from ' || NEW.contact_name || ' (' || NEW.company_name || ') - ' || NEW.project_name
  );
  RETURN NEW;
END;
$$;

-- Trigger function for contact submissions
CREATE OR REPLACE FUNCTION public.notify_new_contact()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM notify_admins(
    'contact',
    NEW.id,
    'New Contact Submission',
    'New contact from ' || NEW.name || ' - ' || COALESCE(NEW.submission_type, 'general')
  );
  RETURN NEW;
END;
$$;

-- Trigger function for resume submissions
CREATE OR REPLACE FUNCTION public.notify_new_resume()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM notify_admins(
    'resume',
    NEW.id,
    'New Resume Submission',
    'New resume from ' || NEW.applicant_name
  );
  RETURN NEW;
END;
$$;

-- Trigger function for prequalification requests
CREATE OR REPLACE FUNCTION public.notify_new_prequal()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM notify_admins(
    'prequal',
    NEW.id,
    'New Prequalification Request',
    'New prequal from ' || NEW.contact_name || ' (' || NEW.company_name || ')'
  );
  RETURN NEW;
END;
$$;

-- Trigger function for quote requests
CREATE OR REPLACE FUNCTION public.notify_new_quote()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM notify_admins(
    'quote',
    NEW.id,
    'New Quote Request',
    'New quote request from ' || NEW.name || ' - ' || NEW.quote_type
  );
  RETURN NEW;
END;
$$;

-- Create triggers
DROP TRIGGER IF EXISTS trigger_notify_new_rfp ON public.rfp_submissions;
CREATE TRIGGER trigger_notify_new_rfp
  AFTER INSERT ON public.rfp_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_new_rfp();

DROP TRIGGER IF EXISTS trigger_notify_new_contact ON public.contact_submissions;
CREATE TRIGGER trigger_notify_new_contact
  AFTER INSERT ON public.contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_new_contact();

DROP TRIGGER IF EXISTS trigger_notify_new_resume ON public.resume_submissions;
CREATE TRIGGER trigger_notify_new_resume
  AFTER INSERT ON public.resume_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_new_resume();

DROP TRIGGER IF EXISTS trigger_notify_new_prequal ON public.prequalification_downloads;
CREATE TRIGGER trigger_notify_new_prequal
  AFTER INSERT ON public.prequalification_downloads
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_new_prequal();

DROP TRIGGER IF EXISTS trigger_notify_new_quote ON public.quote_requests;
CREATE TRIGGER trigger_notify_new_quote
  AFTER INSERT ON public.quote_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_new_quote();