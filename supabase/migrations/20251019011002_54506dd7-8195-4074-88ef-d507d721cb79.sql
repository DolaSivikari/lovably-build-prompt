-- Add content_type to blog_posts for merging articles and case studies
CREATE TYPE post_content_type AS ENUM ('article', 'case_study', 'insight');

ALTER TABLE blog_posts 
  ADD COLUMN IF NOT EXISTS content_type post_content_type DEFAULT 'article',
  ADD COLUMN IF NOT EXISTS project_location TEXT,
  ADD COLUMN IF NOT EXISTS project_size TEXT,
  ADD COLUMN IF NOT EXISTS project_duration TEXT,
  ADD COLUMN IF NOT EXISTS challenge TEXT,
  ADD COLUMN IF NOT EXISTS solution TEXT,
  ADD COLUMN IF NOT EXISTS results TEXT;

-- Create landing_page table
CREATE TABLE IF NOT EXISTS landing_page (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  headline TEXT NOT NULL DEFAULT 'Building Excellence Across the GTA',
  subheadline TEXT NOT NULL DEFAULT 'Premium painting, restoration & finishing services for commercial, residential & industrial properties',
  cta_primary_text TEXT NOT NULL DEFAULT 'Enter Site',
  cta_primary_url TEXT NOT NULL DEFAULT '/home',
  cta_secondary_text TEXT DEFAULT 'Get Free Estimate',
  cta_secondary_url TEXT DEFAULT '/estimate',
  background_image TEXT,
  rotating_project_images JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE landing_page ENABLE ROW LEVEL SECURITY;

-- Create policy for public read
CREATE POLICY "Landing page viewable by everyone"
  ON landing_page FOR SELECT
  USING (is_active = true);

-- Create policy for admin edit
CREATE POLICY "Landing page editable by content editors"
  ON landing_page FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role IN ('admin', 'super_admin', 'editor')
    )
  );

-- Insert default landing page data
INSERT INTO landing_page (headline, subheadline, is_active)
VALUES (
  'Building Excellence Across the GTA',
  'Premium painting, restoration & finishing services for commercial, residential & industrial properties',
  true
)
ON CONFLICT DO NOTHING;