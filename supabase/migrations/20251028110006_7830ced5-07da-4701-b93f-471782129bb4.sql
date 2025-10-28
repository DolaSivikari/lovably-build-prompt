-- Add preview token expiration and ownership tracking to projects, services, and blog_posts

-- Add columns to projects table
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS preview_token_expires_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS preview_token_created_by uuid REFERENCES auth.users(id);

-- Add columns to services table
ALTER TABLE public.services 
ADD COLUMN IF NOT EXISTS preview_token_expires_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS preview_token_created_by uuid REFERENCES auth.users(id);

-- Add columns to blog_posts table
ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS preview_token_expires_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS preview_token_created_by uuid REFERENCES auth.users(id);

-- Drop and recreate RLS policy for projects with expiration check
DROP POLICY IF EXISTS "Published projects viewable by everyone" ON public.projects;
CREATE POLICY "Published projects viewable by everyone"
ON public.projects FOR SELECT
USING (
  publish_state = 'published' 
  OR auth.uid() IS NOT NULL 
  OR (
    preview_token IS NOT NULL 
    AND preview_token <> '' 
    AND length(preview_token) > 16
    AND (preview_token_expires_at IS NULL OR preview_token_expires_at > now())
  )
);

-- Drop and recreate RLS policy for services with expiration check
DROP POLICY IF EXISTS "Published services viewable by everyone" ON public.services;
CREATE POLICY "Published services viewable by everyone"
ON public.services FOR SELECT
USING (
  publish_state = 'published' 
  OR auth.uid() IS NOT NULL 
  OR (
    preview_token IS NOT NULL 
    AND preview_token <> '' 
    AND length(preview_token) > 16
    AND (preview_token_expires_at IS NULL OR preview_token_expires_at > now())
  )
);

-- Drop and recreate RLS policy for blog_posts with expiration check
DROP POLICY IF EXISTS "Published blog posts viewable by everyone" ON public.blog_posts;
CREATE POLICY "Published blog posts viewable by everyone"
ON public.blog_posts FOR SELECT
USING (
  publish_state = 'published' 
  OR auth.uid() IS NOT NULL 
  OR (
    preview_token IS NOT NULL 
    AND preview_token <> '' 
    AND length(preview_token) > 16
    AND (preview_token_expires_at IS NULL OR preview_token_expires_at > now())
  )
);

-- Create function to generate time-limited preview tokens (24 hour expiry)
CREATE OR REPLACE FUNCTION public.generate_preview_token_with_expiry()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only set expiration if preview_token is being set/updated
  IF NEW.preview_token IS NOT NULL AND NEW.preview_token <> '' THEN
    -- Set expiration to 24 hours from now if not already set
    IF NEW.preview_token_expires_at IS NULL THEN
      NEW.preview_token_expires_at := now() + interval '24 hours';
    END IF;
    
    -- Track who created the token
    IF NEW.preview_token_created_by IS NULL THEN
      NEW.preview_token_created_by := auth.uid();
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Add triggers to automatically set expiration on preview token creation
DROP TRIGGER IF EXISTS set_preview_token_expiry ON public.projects;
CREATE TRIGGER set_preview_token_expiry
BEFORE INSERT OR UPDATE OF preview_token ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.generate_preview_token_with_expiry();

DROP TRIGGER IF EXISTS set_preview_token_expiry ON public.services;
CREATE TRIGGER set_preview_token_expiry
BEFORE INSERT OR UPDATE OF preview_token ON public.services
FOR EACH ROW
EXECUTE FUNCTION public.generate_preview_token_with_expiry();

DROP TRIGGER IF EXISTS set_preview_token_expiry ON public.blog_posts;
CREATE TRIGGER set_preview_token_expiry
BEFORE INSERT OR UPDATE OF preview_token ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.generate_preview_token_with_expiry();