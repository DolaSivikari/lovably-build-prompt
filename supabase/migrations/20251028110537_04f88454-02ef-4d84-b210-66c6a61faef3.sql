-- Fix 1: Add missing RLS policies for user_sessions table
-- Allow authenticated users to create their own session records
CREATE POLICY "Users can insert own sessions"
ON public.user_sessions FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow authenticated users to update their own session activity
CREATE POLICY "Users can update own sessions"
ON public.user_sessions FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Fix 2: Restrict performance_metrics to admin-only insertions
-- Drop the current overly permissive policy
DROP POLICY IF EXISTS "Performance metrics insertable by authenticated users" 
  ON public.performance_metrics;

-- Create admin-only insert policy
CREATE POLICY "Only admins can insert metrics"
ON public.performance_metrics FOR INSERT
TO authenticated
WITH CHECK (is_admin(auth.uid()));