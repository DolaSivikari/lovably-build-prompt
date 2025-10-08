-- Phase 1: Critical Security Fix
-- Add SELECT policy to contact_submissions to prevent unauthorized data access

-- Drop existing SELECT policy if it exists (to avoid conflicts)
DROP POLICY IF EXISTS "Contact submissions viewable by admins" ON public.contact_submissions;

-- Create admin-only SELECT policy for contact_submissions
CREATE POLICY "Contact submissions viewable by admins"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (is_admin(auth.uid()));

-- This ensures that only authenticated admin users can view contact form submissions
-- protecting customer email addresses, phone numbers, and messages from unauthorized access