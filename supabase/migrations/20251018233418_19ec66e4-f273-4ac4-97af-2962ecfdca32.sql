-- =====================================================
-- SECURITY FIX: Content Length Validation & Rate Limiting
-- =====================================================

-- Add content length constraints to prevent DoS attacks
ALTER TABLE public.blog_posts 
  ADD CONSTRAINT blog_posts_content_length_check 
  CHECK (length(content) <= 50000);

ALTER TABLE public.blog_posts 
  ADD CONSTRAINT blog_posts_summary_length_check 
  CHECK (length(summary) <= 500);

ALTER TABLE public.services 
  ADD CONSTRAINT services_long_description_length_check 
  CHECK (length(long_description) <= 20000);

ALTER TABLE public.services 
  ADD CONSTRAINT services_short_description_length_check 
  CHECK (length(short_description) <= 500);

-- =====================================================
-- SECURITY FIX: Rate Limiting Function (Security Definer)
-- =====================================================

-- Create security definer function for rate limiting
-- This bypasses RLS and allows edge functions to manage rate limits
CREATE OR REPLACE FUNCTION public.check_and_update_rate_limit(
  p_identifier text,
  p_endpoint text,
  p_limit int DEFAULT 50,
  p_window_minutes int DEFAULT 1
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_now timestamptz := now();
  v_window_start timestamptz := v_now - (p_window_minutes || ' minutes')::interval;
  v_existing_limit record;
  v_result jsonb;
BEGIN
  -- Try to get existing rate limit entry
  SELECT * INTO v_existing_limit
  FROM public.rate_limits
  WHERE user_identifier = p_identifier
    AND endpoint = p_endpoint
  FOR UPDATE;

  IF NOT FOUND THEN
    -- Create new rate limit entry
    INSERT INTO public.rate_limits (
      user_identifier,
      endpoint,
      request_count,
      window_start
    ) VALUES (
      p_identifier,
      p_endpoint,
      1,
      v_now
    );
    
    RETURN jsonb_build_object(
      'allowed', true,
      'request_count', 1,
      'limit', p_limit
    );
  END IF;

  -- Check if we're still in the same window
  IF v_existing_limit.window_start > v_window_start THEN
    -- Same window - check count
    IF v_existing_limit.request_count >= p_limit THEN
      RETURN jsonb_build_object(
        'allowed', false,
        'request_count', v_existing_limit.request_count,
        'limit', p_limit,
        'retry_after_seconds', EXTRACT(EPOCH FROM (v_existing_limit.window_start + (p_window_minutes || ' minutes')::interval - v_now))::int
      );
    END IF;
    
    -- Increment count
    UPDATE public.rate_limits
    SET request_count = request_count + 1
    WHERE user_identifier = p_identifier
      AND endpoint = p_endpoint;
    
    RETURN jsonb_build_object(
      'allowed', true,
      'request_count', v_existing_limit.request_count + 1,
      'limit', p_limit
    );
  ELSE
    -- New window - reset count
    UPDATE public.rate_limits
    SET request_count = 1,
        window_start = v_now
    WHERE user_identifier = p_identifier
      AND endpoint = p_endpoint;
    
    RETURN jsonb_build_object(
      'allowed', true,
      'request_count', 1,
      'limit', p_limit
    );
  END IF;
END;
$$;

-- Add comment explaining the function
COMMENT ON FUNCTION public.check_and_update_rate_limit IS 
'Security definer function for rate limiting. Bypasses RLS to allow edge functions to manage rate limits safely.';