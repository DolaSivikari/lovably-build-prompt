-- Fix Contact Submissions RLS - Explicit DENY for anonymous users
-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Anyone can submit contact forms" ON public.contact_submissions;
DROP POLICY IF EXISTS "Contact submissions viewable by admins" ON public.contact_submissions;
DROP POLICY IF EXISTS "Contact submissions manageable by admins" ON public.contact_submissions;
DROP POLICY IF EXISTS "Contact submissions deletable by admins" ON public.contact_submissions;

-- Recreate policies with explicit DENY for SELECT
CREATE POLICY "Anyone can submit contact forms" 
ON public.contact_submissions 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Admins can view contact submissions" 
ON public.contact_submissions 
FOR SELECT 
TO authenticated
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can update contact submissions" 
ON public.contact_submissions 
FOR UPDATE 
TO authenticated
USING (is_admin(auth.uid()))
WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can delete contact submissions" 
ON public.contact_submissions 
FOR DELETE 
TO authenticated
USING (is_admin(auth.uid()));

-- Ensure anonymous users cannot SELECT (explicit DENY)
CREATE POLICY "Block anonymous SELECT on contact submissions" 
ON public.contact_submissions 
FOR SELECT 
TO anon
USING (false);