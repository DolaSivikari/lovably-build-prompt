-- Fix Profile Table RLS Policy to Prevent User Email Harvesting
-- Remove the vulnerable policies that allow all authenticated users to view all profiles
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Create secure policy: Users can ONLY view their own profile
CREATE POLICY "Users view own profile only" ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Create separate policy: Admins can view all profiles
CREATE POLICY "Admins view all profiles" ON public.profiles
  FOR SELECT
  USING (is_admin(auth.uid()));