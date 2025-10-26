-- Fix function search_path for security hardening
ALTER FUNCTION public.has_role SET search_path = public;
ALTER FUNCTION public.is_admin SET search_path = public;
ALTER FUNCTION public.can_edit_content SET search_path = public;
ALTER FUNCTION public.update_updated_at_column SET search_path = public;
ALTER FUNCTION public.log_sensitive_access SET search_path = public;
ALTER FUNCTION public.cleanup_rate_limits SET search_path = public;
ALTER FUNCTION public.is_account_locked SET search_path = public;
ALTER FUNCTION public.cleanup_old_failed_attempts SET search_path = public;
ALTER FUNCTION public.cleanup_expired_lockouts SET search_path = public;
ALTER FUNCTION public.cleanup_expired_sessions SET search_path = public;
ALTER FUNCTION public.create_notification SET search_path = public;
ALTER FUNCTION public.save_content_version SET search_path = public;
ALTER FUNCTION public.auto_save_version SET search_path = public;
ALTER FUNCTION public.check_and_update_rate_limit SET search_path = public;
ALTER FUNCTION public.get_security_audit_log SET search_path = public;
ALTER FUNCTION public.handle_new_user SET search_path = public;

-- Update RLS policies to support preview tokens
-- Projects: Allow preview token access
DROP POLICY IF EXISTS "Published projects viewable by everyone" ON public.projects;
CREATE POLICY "Published projects viewable by everyone"
ON public.projects
FOR SELECT
USING (
  publish_state = 'published'
  OR auth.uid() IS NOT NULL
  OR (
    preview_token IS NOT NULL 
    AND preview_token != ''
    AND LENGTH(preview_token) > 16
  )
);

-- Blog posts: Allow preview token access
DROP POLICY IF EXISTS "Published blog posts viewable by everyone" ON public.blog_posts;
CREATE POLICY "Published blog posts viewable by everyone"
ON public.blog_posts
FOR SELECT
USING (
  publish_state = 'published'
  OR auth.uid() IS NOT NULL
  OR (
    preview_token IS NOT NULL 
    AND preview_token != ''
    AND LENGTH(preview_token) > 16
  )
);

-- Services: Allow preview token access
DROP POLICY IF EXISTS "Published services viewable by everyone" ON public.services;
CREATE POLICY "Published services viewable by everyone"
ON public.services
FOR SELECT
USING (
  publish_state = 'published'
  OR auth.uid() IS NOT NULL
  OR (
    preview_token IS NOT NULL 
    AND preview_token != ''
    AND LENGTH(preview_token) > 16
  )
);

-- Enable realtime for projects table
ALTER PUBLICATION supabase_realtime ADD TABLE public.projects;