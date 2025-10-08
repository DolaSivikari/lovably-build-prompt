-- Enable pg_cron extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule cleanup jobs to run hourly

-- Clean up failed login attempts older than 24 hours (runs hourly)
SELECT cron.schedule(
  'cleanup-failed-attempts',
  '0 * * * *',  -- Every hour at minute 0
  $$SELECT public.cleanup_old_failed_attempts()$$
);

-- Clean up expired account lockouts (runs hourly)
SELECT cron.schedule(
  'cleanup-expired-lockouts',
  '5 * * * *',  -- Every hour at minute 5
  $$SELECT public.cleanup_expired_lockouts()$$
);

-- Clean up expired user sessions (runs hourly)
SELECT cron.schedule(
  'cleanup-expired-sessions',
  '10 * * * *',  -- Every hour at minute 10
  $$SELECT public.cleanup_expired_sessions()$$
);

-- Clean up old rate limit records (runs hourly)
SELECT cron.schedule(
  'cleanup-rate-limits',
  '15 * * * *',  -- Every hour at minute 15
  $$SELECT public.cleanup_rate_limits()$$
);