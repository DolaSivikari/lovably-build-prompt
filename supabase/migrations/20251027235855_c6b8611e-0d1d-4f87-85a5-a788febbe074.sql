-- Phase 3: Set Up Automated Fetching
-- Enable pg_cron extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Schedule daily fetch at 2 AM UTC
SELECT cron.schedule(
  'fetch-search-console-daily',
  '0 2 * * *',
  $$
  SELECT
    net.http_post(
        url:='https://xdowuirheazerlwatwja.supabase.co/functions/v1/scheduled-fetch-search-console',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhkb3d1aXJoZWF6ZXJsd2F0d2phIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4NzIxMjIsImV4cCI6MjA3NTQ0ODEyMn0.sbaK7yjJJngyIvnMlOrvOf19gJqGnV-h-fZPrEBO3BM"}'::jsonb,
        body:='{}'::jsonb
    ) as request_id;
  $$
);