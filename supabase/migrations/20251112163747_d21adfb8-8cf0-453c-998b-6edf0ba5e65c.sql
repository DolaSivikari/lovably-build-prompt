
-- =====================================================
-- HTML VALIDATION TRIGGER (Reject Malicious HTML)
-- Instead of sanitizing in SQL (which is complex and error-prone),
-- we validate and REJECT obviously malicious content at storage time.
-- Content is still sanitized at render time with DOMPurify.
-- =====================================================

-- Create validation function that checks for malicious HTML patterns
CREATE OR REPLACE FUNCTION public.validate_html_content()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check content field for malicious patterns
  IF NEW.content IS NOT NULL THEN
    -- Reject script tags
    IF NEW.content ~* '<script[\s>]' THEN
      RAISE EXCEPTION 'Content contains prohibited script tags';
    END IF;
    
    -- Reject inline event handlers (onerror, onclick, onload, etc.)
    IF NEW.content ~* '\son(error|load|click|mouseover|mouseout|focus|blur|change|submit|keypress|keydown|keyup)[\s]*=' THEN
      RAISE EXCEPTION 'Content contains prohibited inline event handlers';
    END IF;
    
    -- Reject javascript: protocol
    IF NEW.content ~* 'javascript[\s]*:' THEN
      RAISE EXCEPTION 'Content contains prohibited javascript: protocol';
    END IF;
    
    -- Reject data: protocol (except for images)
    IF NEW.content ~* 'data[\s]*:(?!image/)' THEN
      RAISE EXCEPTION 'Content contains prohibited data: protocol';
    END IF;
    
    -- Reject iframe, embed, object tags
    IF NEW.content ~* '<(iframe|embed|object)[\s>]' THEN
      RAISE EXCEPTION 'Content contains prohibited iframe/embed/object tags';
    END IF;
    
    -- Reject form tags (forms should use dedicated form components)
    IF NEW.content ~* '<form[\s>]' THEN
      RAISE EXCEPTION 'Content contains prohibited form tags';
    END IF;
    
    -- Reject style attributes with javascript
    IF NEW.content ~* 'style[\s]*=.*javascript:' THEN
      RAISE EXCEPTION 'Content contains JavaScript in style attributes';
    END IF;
    
    -- Reject svg with event handlers
    IF NEW.content ~* '<svg.*on\w+[\s]*=' THEN
      RAISE EXCEPTION 'Content contains SVG with event handlers';
    END IF;
  END IF;
  
  -- Check other text fields that might contain HTML
  IF NEW.summary IS NOT NULL THEN
    IF NEW.summary ~* '<script[\s>]' OR NEW.summary ~* '\son\w+[\s]*=' OR NEW.summary ~* 'javascript:' THEN
      RAISE EXCEPTION 'Summary contains prohibited HTML content';
    END IF;
  END IF;
  
  IF NEW.description IS NOT NULL THEN
    IF NEW.description ~* '<script[\s>]' OR NEW.description ~* '\son\w+[\s]*=' OR NEW.description ~* 'javascript:' THEN
      RAISE EXCEPTION 'Description contains prohibited HTML content';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Apply validation trigger to blog_posts
DROP TRIGGER IF EXISTS validate_blog_posts_html ON public.blog_posts;
CREATE TRIGGER validate_blog_posts_html
  BEFORE INSERT OR UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_html_content();

-- Apply validation trigger to projects
DROP TRIGGER IF EXISTS validate_projects_html ON public.projects;
CREATE TRIGGER validate_projects_html
  BEFORE INSERT OR UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_html_content();

-- Apply validation trigger to services  
DROP TRIGGER IF EXISTS validate_services_html ON public.services;
CREATE TRIGGER validate_services_html
  BEFORE INSERT OR UPDATE ON public.services
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_html_content();

-- Add comments explaining the security approach
COMMENT ON FUNCTION public.validate_html_content() IS 
  'Validates HTML content and rejects malicious patterns at storage time. This works in conjunction with client-side DOMPurify sanitization at render time for defense in depth.';
