-- Add consent tracking to newsletter_subscribers
ALTER TABLE newsletter_subscribers
ADD COLUMN IF NOT EXISTS consent_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS consent_ip TEXT,
ADD COLUMN IF NOT EXISTS consent_method TEXT DEFAULT 'footer',
ADD COLUMN IF NOT EXISTS unsubscribed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS unsubscribe_token TEXT UNIQUE;

-- Add consent tracking to contact_submissions
ALTER TABLE contact_submissions
ADD COLUMN IF NOT EXISTS consent_timestamp TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS consent_ip TEXT,
ADD COLUMN IF NOT EXISTS newsletter_consent BOOLEAN DEFAULT false;

-- Add consent tracking to resume_submissions
ALTER TABLE resume_submissions
ADD COLUMN IF NOT EXISTS consent_timestamp TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS consent_ip TEXT;

-- Add consent tracking to prequalification_downloads
ALTER TABLE prequalification_downloads
ADD COLUMN IF NOT EXISTS consent_timestamp TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS consent_ip TEXT;

-- Create partner_permissions table
CREATE TABLE IF NOT EXISTS partner_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_name TEXT NOT NULL,
  website_url TEXT,
  contact_email TEXT,
  permission_status TEXT CHECK (permission_status IN ('requested', 'approved', 'denied', 'pending')) DEFAULT 'pending',
  permission_date DATE,
  permission_scope TEXT[] DEFAULT '{}',
  logo_file_path TEXT,
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on partner_permissions
ALTER TABLE partner_permissions ENABLE ROW LEVEL SECURITY;

-- Admin can manage partner permissions
CREATE POLICY "Admins manage partner permissions"
ON partner_permissions
FOR ALL
USING (is_admin(auth.uid()));

-- Create trigger for updated_at on partner_permissions
CREATE TRIGGER update_partner_permissions_updated_at
BEFORE UPDATE ON partner_permissions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Add index for unsubscribe token lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_unsubscribe_token 
ON newsletter_subscribers(unsubscribe_token) 
WHERE unsubscribe_token IS NOT NULL;

-- Function to generate unsubscribe tokens
CREATE OR REPLACE FUNCTION generate_unsubscribe_token()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.unsubscribe_token IS NULL THEN
    NEW.unsubscribe_token := encode(gen_random_bytes(32), 'hex');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate unsubscribe tokens
CREATE TRIGGER set_newsletter_unsubscribe_token
BEFORE INSERT ON newsletter_subscribers
FOR EACH ROW
EXECUTE FUNCTION generate_unsubscribe_token();