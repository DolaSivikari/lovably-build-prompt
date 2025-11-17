-- Drop unused resume notification function (trigger already gone with table)
DROP FUNCTION IF EXISTS public.notify_new_resume();

-- Update get_admin_dashboard_stats function to remove resume_submissions references
CREATE OR REPLACE FUNCTION public.get_admin_dashboard_stats()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  result jsonb;
BEGIN
  -- Verify user is admin
  IF NOT is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Access denied: admin privileges required';
  END IF;

  -- Build stats object (removed resume_submissions references)
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
    'rfp_submissions_total', (SELECT COUNT(*) FROM rfp_submissions),
    'rfp_submissions_new', (SELECT COUNT(*) FROM rfp_submissions WHERE status = 'new'),
    'quote_requests_total', (SELECT COUNT(*) FROM quote_requests),
    'quote_requests_new', (SELECT COUNT(*) FROM quote_requests WHERE status = 'new')
  ) INTO result;

  RETURN result;
END;
$$;