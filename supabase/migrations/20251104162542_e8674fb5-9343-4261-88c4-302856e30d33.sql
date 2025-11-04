-- Add DELETE policy for prequalification_downloads
CREATE POLICY "Admins can delete prequalification downloads"
ON public.prequalification_downloads
FOR DELETE
USING (is_admin(auth.uid()));

-- Add DELETE policy for resume_submissions  
CREATE POLICY "Admins can delete resume submissions"
ON public.resume_submissions
FOR DELETE
USING (is_admin(auth.uid()));