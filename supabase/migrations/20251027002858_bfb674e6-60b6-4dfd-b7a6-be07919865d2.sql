-- Add before/after image fields for comprehensive project storytelling
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS before_images JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS after_images JSONB DEFAULT '[]'::jsonb;

COMMENT ON COLUMN projects.before_images IS 'Array of before images with captions: [{"url": "...", "caption": "...", "alt": "...", "order": 0}]';
COMMENT ON COLUMN projects.after_images IS 'Array of after images with captions: [{"url": "...", "caption": "...", "alt": "...", "order": 0}]';

-- content_blocks field already exists (JSONB) - will be used for process_steps
-- gallery field already exists (JSONB) - will be auto-generated from before + process + after images

-- Example structure for before_images/after_images:
-- [
--   {
--     "url": "https://...",
--     "caption": "Original building facade",
--     "alt": "Before renovation exterior view",
--     "order": 0
--   }
-- ]

-- Example structure for content_blocks (process steps):
-- [
--   {
--     "type": "process_step",
--     "step_number": 1,
--     "title": "Surface Preparation",
--     "description": "Cleaned and primed all surfaces...",
--     "image_url": "https://...",
--     "image_alt": "Worker preparing surface",
--     "duration": "2 days"
--   }
-- ]