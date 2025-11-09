-- Add sector classification, source attribution, and pinning to blog_posts
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS sector text CHECK (sector IN ('Infrastructure', 'Buildings', 'Both', 'General')) DEFAULT 'General',
ADD COLUMN IF NOT EXISTS source text,
ADD COLUMN IF NOT EXISTS is_pinned boolean DEFAULT false;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_sector ON blog_posts(sector);
CREATE INDEX IF NOT EXISTS idx_blog_posts_source ON blog_posts(source) WHERE source IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_blog_posts_pinned ON blog_posts(is_pinned, published_at DESC);