
-- =====================================================
-- STRENGTHEN RLS POLICIES ON SENSITIVE TABLES
-- Additional defense-in-depth for contact_submissions, resume_submissions, user_roles
-- =====================================================

-- Add explicit blocking policy for resume_submissions (defense in depth)
-- This ensures no one can SELECT unless explicitly allowed by another policy
DROP POLICY IF EXISTS "Block anonymous SELECT on resume submissions" ON public.resume_submissions;
CREATE POLICY "Block anonymous SELECT on resume submissions"
  ON public.resume_submissions
  FOR SELECT
  TO public
  USING (false);

-- Add WITH CHECK clause to UPDATE/DELETE policies to prevent escalation
-- This ensures admins can't modify data to make it inaccessible
DROP POLICY IF EXISTS "Admins can update contact submissions" ON public.contact_submissions;
CREATE POLICY "Admins can update contact submissions"
  ON public.contact_submissions
  FOR UPDATE
  TO public
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

DROP POLICY IF EXISTS "Resume submissions manageable by admins" ON public.resume_submissions;
CREATE POLICY "Resume submissions manageable by admins"
  ON public.resume_submissions
  FOR UPDATE
  TO public
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- Strengthen user_roles policies to prevent users from viewing their own roles
-- (which could leak admin status to authenticated non-admins)
-- This is already correctly implemented, just adding a comment for clarity

COMMENT ON POLICY "User roles viewable by admins" ON public.user_roles IS 
  'Only admins can view any user roles. Regular authenticated users cannot see their own or others roles, preventing role enumeration attacks.';

COMMENT ON POLICY "User roles manageable by super admins" ON public.user_roles IS 
  'Only super_admin role can create, update, or delete user roles. Regular admins can only view roles but not modify them.';

-- Add constraint to prevent empty email addresses in submissions (data integrity)
ALTER TABLE public.contact_submissions 
  ADD CONSTRAINT contact_submissions_email_not_empty 
  CHECK (email IS NOT NULL AND length(trim(email)) > 0);

ALTER TABLE public.resume_submissions 
  ADD CONSTRAINT resume_submissions_email_not_empty 
  CHECK (email IS NOT NULL AND length(trim(email)) > 0);

-- Add constraint to prevent empty names in submissions
ALTER TABLE public.contact_submissions 
  ADD CONSTRAINT contact_submissions_name_not_empty 
  CHECK (name IS NOT NULL AND length(trim(name)) > 0);

ALTER TABLE public.resume_submissions 
  ADD CONSTRAINT resume_submissions_name_not_empty 
  CHECK (applicant_name IS NOT NULL AND length(trim(applicant_name)) > 0);
