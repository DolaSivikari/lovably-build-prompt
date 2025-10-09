-- ============================================================================
-- SECURITY FIXES: Address Critical Vulnerabilities
-- ============================================================================

-- 1. FIX: Rate Limiting Could Be Bypassed
-- Drop the overly permissive rate_limits policy and create a secure one
DROP POLICY IF EXISTS "Rate limits manageable by system" ON public.rate_limits;

-- Block all direct user access to rate_limits table
-- Only Edge Functions with service role can access this table
CREATE POLICY "Block all direct user access to rate_limits"
ON public.rate_limits
FOR ALL
TO authenticated, anon
USING (false)
WITH CHECK (false);


-- 2. FIX: User Email Addresses Could Be Stolen
-- Add audit logging trigger to profiles table if not exists
DROP TRIGGER IF EXISTS audit_profiles ON public.profiles;

CREATE TRIGGER audit_profiles
  AFTER INSERT OR UPDATE OR DELETE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.log_sensitive_access();


-- 3. FIX: Customer Contact Information Could Be Harvested
-- Verify audit triggers exist on contact_submissions and resume_submissions
-- (These were added in Phase 1, but we'll ensure they exist)

DROP TRIGGER IF EXISTS audit_contact_submissions ON public.contact_submissions;
CREATE TRIGGER audit_contact_submissions
  AFTER INSERT OR UPDATE OR DELETE ON public.contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.log_sensitive_access();

DROP TRIGGER IF EXISTS audit_resume_submissions ON public.resume_submissions;
CREATE TRIGGER audit_resume_submissions
  AFTER INSERT OR UPDATE OR DELETE ON public.resume_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.log_sensitive_access();


-- 4. Create function to retrieve security audit data (admins only)
CREATE OR REPLACE FUNCTION public.get_security_audit_log(limit_count integer DEFAULT 100)
RETURNS TABLE (
  id uuid,
  object_type text,
  object_id uuid,
  action text,
  user_id uuid,
  created_at timestamptz,
  ip_address text,
  user_agent text,
  accessed_by_email text,
  accessed_email text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    al.id,
    al.object_type,
    al.object_id,
    al.action,
    al.user_id,
    al.created_at,
    al.ip_address,
    al.user_agent,
    p.email as accessed_by_email,
    CASE 
      WHEN al.object_type = 'profiles' THEN (al.after_state->>'email')
      WHEN al.object_type = 'contact_submissions' THEN (al.after_state->>'email')
      WHEN al.object_type = 'resume_submissions' THEN (al.after_state->>'email')
    END as accessed_email
  FROM public.audit_log al
  LEFT JOIN public.profiles p ON p.id = al.user_id
  WHERE al.object_type IN ('profiles', 'contact_submissions', 'resume_submissions')
    AND is_admin(auth.uid())
  ORDER BY al.created_at DESC
  LIMIT limit_count;
$$;