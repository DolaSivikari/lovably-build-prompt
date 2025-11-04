-- Create project_images table with 4-category system
CREATE TABLE IF NOT EXISTS project_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  url TEXT NOT NULL,
  category VARCHAR(20) NOT NULL CHECK (category IN ('before', 'after', 'process', 'gallery')),
  caption TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON project_images(project_id);
CREATE INDEX IF NOT EXISTS idx_project_images_category ON project_images(category);
CREATE INDEX IF NOT EXISTS idx_project_images_featured ON project_images(featured);
CREATE INDEX IF NOT EXISTS idx_project_images_order ON project_images(display_order);

-- Enable RLS
ALTER TABLE project_images ENABLE ROW LEVEL SECURITY;

-- Public can view published project images
CREATE POLICY "Anyone can view project images"
  ON project_images FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM projects 
      WHERE projects.id = project_images.project_id 
      AND projects.publish_state = 'published'
    )
  );

-- Authenticated users can view all images (for admin)
CREATE POLICY "Authenticated users can view all project images"
  ON project_images FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Content editors can manage images
CREATE POLICY "Content editors can manage project images"
  ON project_images FOR ALL
  USING (can_edit_content(auth.uid()));

-- Add trigger for updated_at
CREATE TRIGGER update_project_images_updated_at
  BEFORE UPDATE ON project_images
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();