-- Fix Storage Bucket RLS Policies for project-images
-- Add admin-only upload restrictions

-- Policy: Only authenticated admins can upload to project-images bucket
CREATE POLICY "Admin uploads only to project-images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'project-images' AND
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'super_admin')
  )
);

-- Policy: Public read access to project-images
CREATE POLICY "Public read access to project-images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'project-images');

-- Policy: Admins can update their uploaded images
CREATE POLICY "Admin manage project-images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'project-images' AND
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'super_admin')
  )
);

-- Policy: Admins can delete project images
CREATE POLICY "Admin delete project-images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'project-images' AND
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'super_admin')
  )
);