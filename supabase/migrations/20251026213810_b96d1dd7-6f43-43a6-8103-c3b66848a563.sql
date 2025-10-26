-- Add unique indexes on slugs for data integrity
CREATE UNIQUE INDEX IF NOT EXISTS idx_services_slug ON services (lower(slug));
CREATE UNIQUE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts (lower(slug));
CREATE UNIQUE INDEX IF NOT EXISTS idx_projects_slug ON projects (lower(slug));

-- Function to normalize slugs (lowercase and trim)
CREATE OR REPLACE FUNCTION normalize_slug()
RETURNS TRIGGER AS $$
BEGIN
  NEW.slug = lower(trim(NEW.slug));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to enforce slug normalization
DROP TRIGGER IF EXISTS normalize_services_slug ON services;
CREATE TRIGGER normalize_services_slug
  BEFORE INSERT OR UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION normalize_slug();

DROP TRIGGER IF EXISTS normalize_blog_posts_slug ON blog_posts;
CREATE TRIGGER normalize_blog_posts_slug
  BEFORE INSERT OR UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION normalize_slug();

DROP TRIGGER IF EXISTS normalize_projects_slug ON projects;
CREATE TRIGGER normalize_projects_slug
  BEFORE INSERT OR UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION normalize_slug();