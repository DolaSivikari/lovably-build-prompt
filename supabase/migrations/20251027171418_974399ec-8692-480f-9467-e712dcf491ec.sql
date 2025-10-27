-- Phase 1b: Add case study fields and migrate data

-- Add case study specific fields to blog_posts table
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS project_location TEXT,
ADD COLUMN IF NOT EXISTS project_size TEXT,
ADD COLUMN IF NOT EXISTS project_duration TEXT,
ADD COLUMN IF NOT EXISTS challenge TEXT,
ADD COLUMN IF NOT EXISTS solution TEXT,
ADD COLUMN IF NOT EXISTS results TEXT,
ADD COLUMN IF NOT EXISTS before_images JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS after_images JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS process_steps JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS client_name TEXT,
ADD COLUMN IF NOT EXISTS budget_range TEXT;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_content_type ON blog_posts(content_type);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);

-- Migrate existing case studies from projects table into blog_posts
INSERT INTO blog_posts (
  slug, title, summary, content, category, featured_image,
  published_at, publish_state, seo_title, seo_description, seo_keywords,
  project_location, project_size, project_duration,
  before_images, after_images, process_steps, client_name, budget_range,
  content_type, created_at, updated_at, created_by, updated_by
)
SELECT 
  slug, 
  title, 
  summary, 
  COALESCE(description, summary) as content,
  'Case Study' as category, 
  featured_image,
  COALESCE(updated_at, created_at) as published_at, 
  publish_state, 
  seo_title, 
  seo_description, 
  seo_keywords,
  location as project_location, 
  project_size, 
  duration as project_duration,
  COALESCE(before_images, '[]'::jsonb) as before_images,
  COALESCE(after_images, '[]'::jsonb) as after_images,
  COALESCE(content_blocks, '[]'::jsonb) as process_steps,
  client_name, 
  budget_range,
  'case-study'::post_content_type as content_type,
  created_at, 
  updated_at,
  created_by,
  updated_by
FROM projects
WHERE publish_state = 'published'
ON CONFLICT (slug) DO UPDATE SET
  content_type = 'case-study'::post_content_type,
  category = 'Case Study',
  project_location = EXCLUDED.project_location,
  project_size = EXCLUDED.project_size,
  project_duration = EXCLUDED.project_duration,
  before_images = EXCLUDED.before_images,
  after_images = EXCLUDED.after_images,
  process_steps = EXCLUDED.process_steps,
  client_name = EXCLUDED.client_name,
  budget_range = EXCLUDED.budget_range;

-- Update any existing blog posts that are categorized as "Case Study"
UPDATE blog_posts 
SET content_type = 'case-study'::post_content_type
WHERE category = 'Case Study' AND content_type != 'case-study'::post_content_type;