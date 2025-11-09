-- Fix function search path security issue
-- Drop trigger first, then function, then recreate both
DROP TRIGGER IF EXISTS set_newsletter_unsubscribe_token ON newsletter_subscribers;
DROP FUNCTION IF EXISTS generate_unsubscribe_token();

-- Recreate function with proper security settings
CREATE OR REPLACE FUNCTION generate_unsubscribe_token()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.unsubscribe_token IS NULL THEN
    NEW.unsubscribe_token := encode(gen_random_bytes(32), 'hex');
  END IF;
  RETURN NEW;
END;
$$;

-- Recreate trigger
CREATE TRIGGER set_newsletter_unsubscribe_token
BEFORE INSERT ON newsletter_subscribers
FOR EACH ROW
EXECUTE FUNCTION generate_unsubscribe_token();