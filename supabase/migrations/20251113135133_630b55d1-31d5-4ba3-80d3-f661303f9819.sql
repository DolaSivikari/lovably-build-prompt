-- Add video support to services table
ALTER TABLE services 
ADD COLUMN IF NOT EXISTS video_url TEXT,
ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;

-- Create quiz submissions table
CREATE TABLE IF NOT EXISTS quiz_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  answers JSONB NOT NULL,
  recommended_services TEXT[],
  user_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on quiz_submissions
ALTER TABLE quiz_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit quiz responses
CREATE POLICY "Anyone can submit quiz responses"
ON quiz_submissions
FOR INSERT
TO public
WITH CHECK (true);

-- Only admins can view quiz submissions
CREATE POLICY "Admins can view quiz submissions"
ON quiz_submissions
FOR SELECT
TO public
USING (is_admin(auth.uid()));