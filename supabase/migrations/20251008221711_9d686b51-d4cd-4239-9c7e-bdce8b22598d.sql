-- Phase 2: Enhanced Authentication & Access Control Database Schema

-- Table for tracking failed login attempts
CREATE TABLE IF NOT EXISTS public.auth_failed_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_identifier text NOT NULL, -- email or phone
  ip_address text,
  user_agent text,
  attempt_time timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.auth_failed_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view failed attempts"
ON public.auth_failed_attempts
FOR SELECT
USING (is_admin(auth.uid()));

CREATE INDEX idx_auth_failed_attempts_identifier ON public.auth_failed_attempts(user_identifier);
CREATE INDEX idx_auth_failed_attempts_time ON public.auth_failed_attempts(attempt_time);

-- Table for account lockouts
CREATE TABLE IF NOT EXISTS public.auth_account_lockouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_identifier text NOT NULL,
  locked_at timestamp with time zone DEFAULT now(),
  locked_until timestamp with time zone NOT NULL,
  reason text DEFAULT 'Too many failed login attempts',
  unlocked_by uuid REFERENCES auth.users(id),
  unlocked_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.auth_account_lockouts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage lockouts"
ON public.auth_account_lockouts
FOR ALL
USING (is_admin(auth.uid()));

CREATE INDEX idx_auth_account_lockouts_identifier ON public.auth_account_lockouts(user_identifier);
CREATE INDEX idx_auth_account_lockouts_until ON public.auth_account_lockouts(locked_until);

-- Table for security alerts
CREATE TABLE IF NOT EXISTS public.security_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  alert_type text NOT NULL,
  severity text NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  user_id uuid REFERENCES auth.users(id),
  description text NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  resolved boolean DEFAULT false,
  resolved_by uuid REFERENCES auth.users(id),
  resolved_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.security_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage security alerts"
ON public.security_alerts
FOR ALL
USING (is_admin(auth.uid()));

CREATE INDEX idx_security_alerts_type ON public.security_alerts(alert_type);
CREATE INDEX idx_security_alerts_severity ON public.security_alerts(severity);
CREATE INDEX idx_security_alerts_resolved ON public.security_alerts(resolved);

-- Table for active sessions tracking
CREATE TABLE IF NOT EXISTS public.user_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  session_token text NOT NULL,
  ip_address text,
  user_agent text,
  last_activity timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  expires_at timestamp with time zone NOT NULL
);

ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own sessions"
ON public.user_sessions
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all sessions"
ON public.user_sessions
FOR SELECT
USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete sessions"
ON public.user_sessions
FOR DELETE
USING (is_admin(auth.uid()));

CREATE INDEX idx_user_sessions_user_id ON public.user_sessions(user_id);
CREATE INDEX idx_user_sessions_expires ON public.user_sessions(expires_at);

-- Function to check if account is locked
CREATE OR REPLACE FUNCTION public.is_account_locked(p_user_identifier text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.auth_account_lockouts
    WHERE user_identifier = p_user_identifier
    AND locked_until > now()
    AND unlocked_at IS NULL
  );
$$;

-- Function to cleanup old failed attempts (older than 24 hours)
CREATE OR REPLACE FUNCTION public.cleanup_old_failed_attempts()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM public.auth_failed_attempts
  WHERE attempt_time < now() - interval '24 hours';
$$;

-- Function to cleanup expired lockouts
CREATE OR REPLACE FUNCTION public.cleanup_expired_lockouts()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM public.auth_account_lockouts
  WHERE locked_until < now()
  AND unlocked_at IS NULL;
$$;

-- Function to cleanup expired sessions
CREATE OR REPLACE FUNCTION public.cleanup_expired_sessions()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM public.user_sessions
  WHERE expires_at < now();
$$;