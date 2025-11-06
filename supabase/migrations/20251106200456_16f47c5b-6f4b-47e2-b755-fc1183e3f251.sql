-- Phase 2: WordPress Parity Features - Database Schema

-- 1. Media Library Enhancements
ALTER TABLE public.documents_library ADD COLUMN IF NOT EXISTS focal_point_x decimal DEFAULT 0.5;
ALTER TABLE public.documents_library ADD COLUMN IF NOT EXISTS focal_point_y decimal DEFAULT 0.5;
ALTER TABLE public.documents_library ADD COLUMN IF NOT EXISTS alt_text text;
ALTER TABLE public.documents_library ADD COLUMN IF NOT EXISTS crop_presets jsonb DEFAULT '[]'::jsonb;

-- 2. Redirects Manager
CREATE TABLE public.redirects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_path text NOT NULL UNIQUE,
  destination_path text NOT NULL,
  redirect_type integer DEFAULT 301,
  is_active boolean DEFAULT true,
  hit_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid,
  notes text
);

ALTER TABLE public.redirects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage redirects"
  ON public.redirects FOR ALL
  USING (is_admin(auth.uid()));

CREATE POLICY "Public can view active redirects"
  ON public.redirects FOR SELECT
  USING (is_active = true);

-- 3. SEO Enhancements - Add OG images and canonical URLs
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS og_image_url text;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS canonical_url text;

ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS og_image_url text;
ALTER TABLE public.projects ADD COLUMN IF NOT EXISTS canonical_url text;

ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS og_image_url text;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS canonical_url text;

-- Structured Data Templates
CREATE TABLE public.structured_data_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL, -- 'Article', 'Product', 'FAQ', 'Organization', etc.
  schema_json jsonb NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid
);

ALTER TABLE public.structured_data_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage structured data"
  ON public.structured_data_templates FOR ALL
  USING (is_admin(auth.uid()));

CREATE POLICY "Public view active structured data"
  ON public.structured_data_templates FOR SELECT
  USING (is_active = true);

-- 4. Workflow Comments for Review Process
CREATE TABLE public.content_review_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type text NOT NULL, -- 'blog_posts', 'projects', 'services'
  entity_id uuid NOT NULL,
  comment text NOT NULL,
  created_by uuid NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text -- 'pending', 'approved', 'rejected'
);

ALTER TABLE public.content_review_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users view comments"
  ON public.content_review_comments FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users create comments"
  ON public.content_review_comments FOR INSERT
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Admins manage all comments"
  ON public.content_review_comments FOR ALL
  USING (is_admin(auth.uid()));

-- Triggers
CREATE TRIGGER update_redirects_updated_at
  BEFORE UPDATE ON public.redirects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_structured_data_updated_at
  BEFORE UPDATE ON public.structured_data_templates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();