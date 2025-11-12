
-- Fix validation function to only check fields that exist
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
  
  -- Check summary field (common across blog_posts and projects)
  IF TG_TABLE_NAME IN ('blog_posts', 'projects') AND NEW.summary IS NOT NULL THEN
    IF NEW.summary ~* '<script[\s>]' OR NEW.summary ~* '\son\w+[\s]*=' OR NEW.summary ~* 'javascript:' THEN
      RAISE EXCEPTION 'Summary contains prohibited HTML content';
    END IF;
  END IF;
  
  -- Check description field (exists on projects and services)
  IF TG_TABLE_NAME IN ('projects', 'services') THEN
    -- Use dynamic SQL to check if column exists and has malicious content
    IF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') THEN
      DECLARE
        desc_value TEXT;
      BEGIN
        -- Safely get description value if it exists
        EXECUTE format('SELECT ($1).%I', 'description') USING NEW INTO desc_value;
        IF desc_value IS NOT NULL THEN
          IF desc_value ~* '<script[\s>]' OR desc_value ~* '\son\w+[\s]*=' OR desc_value ~* 'javascript:' THEN
            RAISE EXCEPTION 'Description contains prohibited HTML content';
          END IF;
        END IF;
      EXCEPTION
        WHEN undefined_column THEN
          -- Column doesn't exist, skip check
          NULL;
      END;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;
