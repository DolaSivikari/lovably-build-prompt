-- Use session replication role to bypass triggers temporarily
-- This is safe for data migrations
SET session_replication_role = 'replica';

-- Consolidate "Case Studies" (plural) to "Case Study" (singular)
UPDATE blog_posts 
SET category = 'Case Study' 
WHERE category = 'Case Studies';

-- Reset session replication role back to normal
SET session_replication_role = 'origin';

-- Add comment for documentation
COMMENT ON COLUMN blog_posts.category IS 'Standard categories: Case Study, Painting, Commercial, Residential, Industrial, Institutional, Restoration, Waterproofing. Use "Case Study" (singular) for all case study content.';