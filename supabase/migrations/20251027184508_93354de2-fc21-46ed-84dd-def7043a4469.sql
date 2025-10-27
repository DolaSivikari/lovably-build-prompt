-- Security Enhancement: Add search_path to all database functions
-- This prevents schema manipulation attacks

-- Already secure functions (no changes needed):
-- has_role, is_admin, can_edit_content, update_updated_at_column, log_sensitive_access

-- Fix functions that need search_path security:

-- 1. normalize_slug function
CREATE OR REPLACE FUNCTION public.normalize_slug()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  NEW.slug = lower(trim(NEW.slug));
  RETURN NEW;
END;
$function$;

-- 2. cleanup_rate_limits function
CREATE OR REPLACE FUNCTION public.cleanup_rate_limits()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $function$
  DELETE FROM public.rate_limits
  WHERE window_start < now() - interval '1 hour';
$function$;

-- 3. is_account_locked function
CREATE OR REPLACE FUNCTION public.is_account_locked(p_user_identifier text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.auth_account_lockouts
    WHERE user_identifier = p_user_identifier
    AND locked_until > now()
    AND unlocked_at IS NULL
  );
$function$;

-- 4. cleanup_old_failed_attempts function
CREATE OR REPLACE FUNCTION public.cleanup_old_failed_attempts()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $function$
  DELETE FROM public.auth_failed_attempts
  WHERE attempt_time < now() - interval '24 hours';
$function$;

-- 5. cleanup_expired_lockouts function
CREATE OR REPLACE FUNCTION public.cleanup_expired_lockouts()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $function$
  DELETE FROM public.auth_account_lockouts
  WHERE locked_until < now()
  AND unlocked_at IS NULL;
$function$;

-- 6. cleanup_expired_sessions function
CREATE OR REPLACE FUNCTION public.cleanup_expired_sessions()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $function$
  DELETE FROM public.user_sessions
  WHERE expires_at < now();
$function$;

-- 7. cleanup_old_error_logs function
CREATE OR REPLACE FUNCTION public.cleanup_old_error_logs()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $function$
  DELETE FROM public.error_logs
  WHERE created_at < now() - interval '30 days';
$function$;

-- 8. handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$function$;

COMMENT ON FUNCTION public.normalize_slug() IS 'Security hardened: search_path set to public';
COMMENT ON FUNCTION public.cleanup_rate_limits() IS 'Security hardened: search_path set to public';
COMMENT ON FUNCTION public.is_account_locked(text) IS 'Security hardened: search_path set to public';
COMMENT ON FUNCTION public.cleanup_old_failed_attempts() IS 'Security hardened: search_path set to public';
COMMENT ON FUNCTION public.cleanup_expired_lockouts() IS 'Security hardened: search_path set to public';
COMMENT ON FUNCTION public.cleanup_expired_sessions() IS 'Security hardened: search_path set to public';
COMMENT ON FUNCTION public.cleanup_old_error_logs() IS 'Security hardened: search_path set to public';
COMMENT ON FUNCTION public.handle_new_user() IS 'Security hardened: search_path set to public';