-- Add status column for tracking prequalification requests
ALTER TABLE prequalification_downloads 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new';

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_prequalification_status 
ON prequalification_downloads(status);

CREATE INDEX IF NOT EXISTS idx_prequalification_downloaded_at 
ON prequalification_downloads(downloaded_at DESC);

-- Update RLS policies to allow admins to update status
DROP POLICY IF EXISTS "Admins can update prequalification downloads" ON prequalification_downloads;

CREATE POLICY "Admins can update prequalification downloads"
ON prequalification_downloads
FOR UPDATE
USING (is_admin(auth.uid()))
WITH CHECK (is_admin(auth.uid()));

-- Add realtime support
ALTER PUBLICATION supabase_realtime ADD TABLE prequalification_downloads;