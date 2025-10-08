-- Create storage buckets for media library
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('project-images', 'project-images', true),
  ('documents', 'documents', false),
  ('drawings', 'drawings', false)
ON CONFLICT (id) DO NOTHING;

-- Add RLS policies for project-images bucket
CREATE POLICY "Public can view project images"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-images');

CREATE POLICY "Authenticated users can upload project images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'project-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update project images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'project-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete project images"
ON storage.objects FOR DELETE
USING (bucket_id = 'project-images' AND auth.role() = 'authenticated');

-- Add RLS policies for documents bucket
CREATE POLICY "Authenticated users can view documents"
ON storage.objects FOR SELECT
USING (bucket_id = 'documents' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can upload documents"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'documents' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update documents"
ON storage.objects FOR UPDATE
USING (bucket_id = 'documents' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete documents"
ON storage.objects FOR DELETE
USING (bucket_id = 'documents' AND auth.role() = 'authenticated');

-- Add RLS policies for drawings bucket
CREATE POLICY "Authenticated users can view drawings"
ON storage.objects FOR SELECT
USING (bucket_id = 'drawings' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can upload drawings"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'drawings' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update drawings"
ON storage.objects FOR UPDATE
USING (bucket_id = 'drawings' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete drawings"
ON storage.objects FOR DELETE
USING (bucket_id = 'drawings' AND auth.role() = 'authenticated');

-- Add new columns to projects table for visual editor
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS content_blocks JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS version INT DEFAULT 1,
ADD COLUMN IF NOT EXISTS draft_content JSONB;