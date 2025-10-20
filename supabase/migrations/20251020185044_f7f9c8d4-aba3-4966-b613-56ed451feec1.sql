-- Create newsletter_subscribers table for Phase 4
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  source TEXT DEFAULT 'footer',
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (new subscriptions)
CREATE POLICY "Anyone can subscribe to newsletter"
ON public.newsletter_subscribers
FOR INSERT
TO public
WITH CHECK (true);

-- Only admins can view subscribers
CREATE POLICY "Only admins can view newsletter subscribers"
ON public.newsletter_subscribers
FOR SELECT
USING (is_admin(auth.uid()));

-- Only admins can update (for unsubscribe management)
CREATE POLICY "Only admins can update newsletter subscribers"
ON public.newsletter_subscribers
FOR UPDATE
USING (is_admin(auth.uid()));

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_email 
ON public.newsletter_subscribers(email);

-- Create index for subscription status
CREATE INDEX IF NOT EXISTS idx_newsletter_subscribers_status 
ON public.newsletter_subscribers(subscribed_at, unsubscribed_at);

COMMENT ON TABLE public.newsletter_subscribers IS 'Stores newsletter subscriber emails with subscription tracking';
