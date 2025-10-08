-- Phase 1: Critical Security Fixes Migration
-- 1. Fix database functions with proper search_path

-- Update has_role function with secure search_path
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Update is_admin function with secure search_path
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id 
    AND role IN ('super_admin', 'admin')
  )
$$;

-- Update can_edit_content function with secure search_path
CREATE OR REPLACE FUNCTION public.can_edit_content(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id 
    AND role IN ('super_admin', 'admin', 'editor', 'contributor')
  )
$$;

-- Update update_updated_at_column with secure search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- 2. Create audit logging function for sensitive operations
CREATE OR REPLACE FUNCTION public.log_sensitive_access()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.audit_log (
    object_type,
    object_id,
    action,
    user_id,
    before_state,
    after_state
  ) VALUES (
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    TG_OP,
    auth.uid(),
    CASE WHEN TG_OP IN ('UPDATE', 'DELETE') THEN to_jsonb(OLD) ELSE NULL END,
    CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN to_jsonb(NEW) ELSE NULL END
  );
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- 3. Add audit triggers to sensitive tables
DROP TRIGGER IF EXISTS audit_contact_submissions ON public.contact_submissions;
CREATE TRIGGER audit_contact_submissions
  AFTER INSERT OR UPDATE OR DELETE ON public.contact_submissions
  FOR EACH ROW EXECUTE FUNCTION public.log_sensitive_access();

DROP TRIGGER IF EXISTS audit_resume_submissions ON public.resume_submissions;
CREATE TRIGGER audit_resume_submissions
  AFTER INSERT OR UPDATE OR DELETE ON public.resume_submissions
  FOR EACH ROW EXECUTE FUNCTION public.log_sensitive_access();

DROP TRIGGER IF EXISTS audit_user_roles ON public.user_roles;
CREATE TRIGGER audit_user_roles
  AFTER INSERT OR UPDATE OR DELETE ON public.user_roles
  FOR EACH ROW EXECUTE FUNCTION public.log_sensitive_access();

-- 4. Verify and strengthen RLS policies on contact_submissions
-- Drop existing policies to recreate them properly
DROP POLICY IF EXISTS "Anyone can submit contact forms" ON public.contact_submissions;
DROP POLICY IF EXISTS "Contact submissions viewable by admins" ON public.contact_submissions;
DROP POLICY IF EXISTS "Contact submissions manageable by admins" ON public.contact_submissions;

-- Recreate with proper security
CREATE POLICY "Anyone can submit contact forms"
  ON public.contact_submissions
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Contact submissions viewable by admins"
  ON public.contact_submissions
  FOR SELECT
  USING (is_admin(auth.uid()));

CREATE POLICY "Contact submissions manageable by admins"
  ON public.contact_submissions
  FOR UPDATE
  USING (is_admin(auth.uid()));

CREATE POLICY "Contact submissions deletable by admins"
  ON public.contact_submissions
  FOR DELETE
  USING (is_admin(auth.uid()));

-- 5. Add similar protection to resume_submissions
DROP POLICY IF EXISTS "Anyone can submit resumes" ON public.resume_submissions;
DROP POLICY IF EXISTS "Resume submissions viewable by admins" ON public.resume_submissions;
DROP POLICY IF EXISTS "Resume submissions manageable by admins" ON public.resume_submissions;

CREATE POLICY "Anyone can submit resumes"
  ON public.resume_submissions
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Resume submissions viewable by admins"
  ON public.resume_submissions
  FOR SELECT
  USING (is_admin(auth.uid()));

CREATE POLICY "Resume submissions manageable by admins"
  ON public.resume_submissions
  FOR UPDATE
  USING (is_admin(auth.uid()));

CREATE POLICY "Resume submissions deletable by admins"
  ON public.resume_submissions
  FOR DELETE
  USING (is_admin(auth.uid()));

-- 6. Create rate limiting tracking table
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_identifier text NOT NULL,
  endpoint text NOT NULL,
  request_count integer DEFAULT 1,
  window_start timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_identifier, endpoint)
);

ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Rate limits manageable by system"
  ON public.rate_limits
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create cleanup function for rate limits (remove old entries)
CREATE OR REPLACE FUNCTION public.cleanup_rate_limits()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM public.rate_limits
  WHERE window_start < now() - interval '1 hour';
$$;