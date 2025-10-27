-- Remove conflicting permissive storage policies for project-images bucket
-- These old policies allowed ANY authenticated user to upload/delete images
-- The new admin-only policies (already created) will remain in effect

DROP POLICY IF EXISTS "Authenticated users can upload project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update project images" ON storage.objects;

-- Verify only secure admin-only policies remain:
-- ✅ "Admin uploads only to project-images" (INSERT - admin only)
-- ✅ "Admin manage project-images" (UPDATE - admin only)  
-- ✅ "Admin delete project-images" (DELETE - admin only)
-- ✅ "Public read access to project-images" (SELECT - public)

-- This migration ensures only admins can upload/modify images
-- while maintaining public read access for the website