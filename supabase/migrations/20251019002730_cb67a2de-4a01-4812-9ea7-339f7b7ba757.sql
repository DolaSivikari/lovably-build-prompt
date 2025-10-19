-- Add missing columns to projects table for public display
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS year TEXT,
ADD COLUMN IF NOT EXISTS duration TEXT;

-- Add comment explaining featured flag
COMMENT ON COLUMN projects.featured IS 'Flag to mark projects for featured/spotlight sections on public site';