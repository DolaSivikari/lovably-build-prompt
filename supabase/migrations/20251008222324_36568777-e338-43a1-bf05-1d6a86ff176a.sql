-- Phases 3-6: SEO, Performance, Collaboration, Templates Database Schema

-- ============= PHASE 3: SEO ENHANCEMENTS =============

-- Table for SEO settings per page/content
CREATE TABLE IF NOT EXISTS public.seo_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type text NOT NULL, -- 'page', 'blog_post', 'project', 'service'
  entity_id uuid NOT NULL,
  permalink text,
  meta_title text,
  meta_description text,
  meta_keywords text[],
  og_title text,
  og_description text,
  og_image text,
  canonical_url text,
  robots_meta text DEFAULT 'index,follow',
  focus_keyword text,
  seo_score integer DEFAULT 0,
  last_analyzed_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(entity_type, entity_id)
);

ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "SEO settings viewable by authenticated users"
ON public.seo_settings FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "SEO settings manageable by content editors"
ON public.seo_settings FOR ALL
USING (can_edit_content(auth.uid()));

CREATE INDEX idx_seo_settings_entity ON public.seo_settings(entity_type, entity_id);

-- Table for tracking sitemap generation
CREATE TABLE IF NOT EXISTS public.sitemap_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  generated_at timestamp with time zone DEFAULT now(),
  url_count integer,
  status text,
  error_message text
);

ALTER TABLE public.sitemap_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sitemap logs viewable by admins"
ON public.sitemap_logs FOR SELECT
USING (is_admin(auth.uid()));

-- Table for Google Analytics data
CREATE TABLE IF NOT EXISTS public.analytics_snapshots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  snapshot_date date NOT NULL,
  page_path text NOT NULL,
  page_views integer DEFAULT 0,
  unique_visitors integer DEFAULT 0,
  avg_time_on_page numeric,
  bounce_rate numeric,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(snapshot_date, page_path)
);

ALTER TABLE public.analytics_snapshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Analytics viewable by authenticated users"
ON public.analytics_snapshots FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE INDEX idx_analytics_date ON public.analytics_snapshots(snapshot_date DESC);
CREATE INDEX idx_analytics_page ON public.analytics_snapshots(page_path);

-- ============= PHASE 4: PERFORMANCE MONITORING =============

-- Table for performance metrics
CREATE TABLE IF NOT EXISTS public.performance_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_type text NOT NULL, -- 'page_load', 'api_response', 'database_query'
  metric_name text NOT NULL,
  value numeric NOT NULL,
  unit text, -- 'ms', 'seconds', 'bytes'
  metadata jsonb DEFAULT '{}'::jsonb,
  recorded_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.performance_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Performance metrics viewable by authenticated users"
ON public.performance_metrics FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Performance metrics insertable by authenticated users"
ON public.performance_metrics FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

CREATE INDEX idx_performance_type ON public.performance_metrics(metric_type);
CREATE INDEX idx_performance_date ON public.performance_metrics(recorded_at DESC);

-- Table for optimization recommendations
CREATE TABLE IF NOT EXISTS public.optimization_recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL, -- 'images', 'caching', 'database', 'code'
  title text NOT NULL,
  description text NOT NULL,
  priority text CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'dismissed')),
  resolved_by uuid REFERENCES auth.users(id),
  resolved_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.optimization_recommendations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Optimization recommendations viewable by authenticated users"
ON public.optimization_recommendations FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Optimization recommendations manageable by admins"
ON public.optimization_recommendations FOR ALL
USING (is_admin(auth.uid()));

-- ============= PHASE 5: COLLABORATION TOOLS =============

-- Table for inline comments on content
CREATE TABLE IF NOT EXISTS public.content_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type text NOT NULL,
  entity_id uuid NOT NULL,
  parent_id uuid REFERENCES public.content_comments(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  content text NOT NULL,
  block_id text, -- For block-level comments
  resolved boolean DEFAULT false,
  resolved_by uuid REFERENCES auth.users(id),
  resolved_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.content_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Comments viewable by authenticated users"
ON public.content_comments FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can create comments"
ON public.content_comments FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments"
ON public.content_comments FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Admins can resolve comments"
ON public.content_comments FOR UPDATE
USING (is_admin(auth.uid()));

CREATE INDEX idx_comments_entity ON public.content_comments(entity_type, entity_id);
CREATE INDEX idx_comments_resolved ON public.content_comments(resolved);

-- Table for approval workflows
CREATE TABLE IF NOT EXISTS public.approval_workflows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type text NOT NULL,
  entity_id uuid NOT NULL,
  submitted_by uuid REFERENCES auth.users(id) NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewer_id uuid REFERENCES auth.users(id),
  review_notes text,
  reviewed_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.approval_workflows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Workflows viewable by authenticated users"
ON public.approval_workflows FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can create workflows"
ON public.approval_workflows FOR INSERT
WITH CHECK (auth.uid() = submitted_by);

CREATE POLICY "Admins can review workflows"
ON public.approval_workflows FOR UPDATE
USING (is_admin(auth.uid()));

-- Table for content version history
CREATE TABLE IF NOT EXISTS public.content_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type text NOT NULL,
  entity_id uuid NOT NULL,
  version_number integer NOT NULL,
  content_snapshot jsonb NOT NULL,
  changed_by uuid REFERENCES auth.users(id) NOT NULL,
  change_summary text,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.content_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Versions viewable by authenticated users"
ON public.content_versions FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "System can create versions"
ON public.content_versions FOR INSERT
WITH CHECK (auth.uid() = changed_by);

CREATE INDEX idx_versions_entity ON public.content_versions(entity_type, entity_id, version_number DESC);

-- Table for real-time notifications
CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  type text NOT NULL, -- 'comment', 'mention', 'approval', 'system'
  title text NOT NULL,
  message text NOT NULL,
  link text,
  read boolean DEFAULT false,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own notifications"
ON public.notifications FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
ON public.notifications FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "System can create notifications"
ON public.notifications FOR INSERT
WITH CHECK (true);

CREATE INDEX idx_notifications_user ON public.notifications(user_id, read, created_at DESC);

-- Enable realtime for notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- ============= PHASE 6: TEMPLATE MANAGEMENT =============

-- Table for custom templates
CREATE TABLE IF NOT EXISTS public.templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL, -- 'header', 'footer', 'page_layout', 'section'
  description text,
  thumbnail text,
  content jsonb NOT NULL, -- Stores block structure
  is_active boolean DEFAULT false,
  is_default boolean DEFAULT false,
  created_by uuid REFERENCES auth.users(id),
  updated_by uuid REFERENCES auth.users(id),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Templates viewable by authenticated users"
ON public.templates FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Templates manageable by content editors"
ON public.templates FOR ALL
USING (can_edit_content(auth.uid()));

CREATE INDEX idx_templates_type ON public.templates(type);
CREATE INDEX idx_templates_active ON public.templates(is_active);

-- Table for style presets
CREATE TABLE IF NOT EXISTS public.style_presets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL, -- 'colors', 'typography', 'spacing'
  values jsonb NOT NULL,
  is_active boolean DEFAULT false,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.style_presets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Style presets viewable by authenticated users"
ON public.style_presets FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Style presets manageable by admins"
ON public.style_presets FOR ALL
USING (is_admin(auth.uid()));

-- Table for navigation menus
CREATE TABLE IF NOT EXISTS public.navigation_menus (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text NOT NULL, -- 'primary', 'footer', 'mobile'
  items jsonb NOT NULL, -- Menu structure
  is_active boolean DEFAULT false,
  created_by uuid REFERENCES auth.users(id),
  updated_by uuid REFERENCES auth.users(id),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.navigation_menus ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Navigation menus viewable by everyone"
ON public.navigation_menus FOR SELECT
USING (true);

CREATE POLICY "Navigation menus manageable by content editors"
ON public.navigation_menus FOR ALL
USING (can_edit_content(auth.uid()));

-- ============= UTILITY FUNCTIONS =============

-- Function to create notification
CREATE OR REPLACE FUNCTION public.create_notification(
  p_user_id uuid,
  p_type text,
  p_title text,
  p_message text,
  p_link text DEFAULT NULL,
  p_metadata jsonb DEFAULT '{}'::jsonb
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_notification_id uuid;
BEGIN
  INSERT INTO public.notifications (user_id, type, title, message, link, metadata)
  VALUES (p_user_id, p_type, p_title, p_message, p_link, p_metadata)
  RETURNING id INTO v_notification_id;
  
  RETURN v_notification_id;
END;
$$;

-- Function to save content version
CREATE OR REPLACE FUNCTION public.save_content_version(
  p_entity_type text,
  p_entity_id uuid,
  p_content_snapshot jsonb,
  p_change_summary text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_next_version integer;
BEGIN
  -- Get next version number
  SELECT COALESCE(MAX(version_number), 0) + 1
  INTO v_next_version
  FROM public.content_versions
  WHERE entity_type = p_entity_type AND entity_id = p_entity_id;
  
  -- Insert new version
  INSERT INTO public.content_versions (
    entity_type,
    entity_id,
    version_number,
    content_snapshot,
    changed_by,
    change_summary
  ) VALUES (
    p_entity_type,
    p_entity_id,
    v_next_version,
    p_content_snapshot,
    auth.uid(),
    p_change_summary
  );
END;
$$;

-- Trigger for automatic version saving on content updates
CREATE OR REPLACE FUNCTION public.auto_save_version()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  PERFORM public.save_content_version(
    TG_TABLE_NAME,
    NEW.id,
    to_jsonb(NEW),
    'Automatic version save'
  );
  RETURN NEW;
END;
$$;

-- Add update triggers to content tables
DROP TRIGGER IF EXISTS trigger_blog_posts_version ON public.blog_posts;
CREATE TRIGGER trigger_blog_posts_version
AFTER UPDATE ON public.blog_posts
FOR EACH ROW
EXECUTE FUNCTION public.auto_save_version();

DROP TRIGGER IF EXISTS trigger_projects_version ON public.projects;
CREATE TRIGGER trigger_projects_version
AFTER UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.auto_save_version();

DROP TRIGGER IF EXISTS trigger_pages_version ON public.pages;
CREATE TRIGGER trigger_pages_version
AFTER UPDATE ON public.pages
FOR EACH ROW
EXECUTE FUNCTION public.auto_save_version();