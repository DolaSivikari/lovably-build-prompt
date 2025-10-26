-- Create error_logs table for client-side error tracking
CREATE TABLE IF NOT EXISTS public.error_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message TEXT NOT NULL,
  stack TEXT,
  context JSONB,
  url TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.error_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view error logs
CREATE POLICY "Admins can view error logs"
  ON public.error_logs
  FOR SELECT
  USING (public.is_admin(auth.uid()));

-- Anyone can insert error logs (for logging from client)
CREATE POLICY "Anyone can insert error logs"
  ON public.error_logs
  FOR INSERT
  WITH CHECK (true);

-- Add index for faster queries
CREATE INDEX idx_error_logs_created_at ON public.error_logs(created_at DESC);
CREATE INDEX idx_error_logs_message ON public.error_logs(message);

-- Add cleanup function to remove old logs (30 days)
CREATE OR REPLACE FUNCTION public.cleanup_old_error_logs()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM public.error_logs
  WHERE created_at < now() - interval '30 days';
$$;

COMMENT ON TABLE public.error_logs IS 'Client-side error logs for monitoring and debugging';
COMMENT ON FUNCTION public.cleanup_old_error_logs IS 'Remove error logs older than 30 days (run via cron)';
