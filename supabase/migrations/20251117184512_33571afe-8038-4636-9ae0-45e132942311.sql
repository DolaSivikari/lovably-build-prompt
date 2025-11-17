-- Create security_settings table for admin security configuration
CREATE TABLE IF NOT EXISTS public.security_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mfa_required BOOLEAN DEFAULT false,
  session_timeout_minutes INTEGER DEFAULT 120,
  ip_whitelist TEXT[] DEFAULT '{}',
  audit_retention_days INTEGER DEFAULT 90,
  max_failed_login_attempts INTEGER DEFAULT 5,
  password_min_length INTEGER DEFAULT 8,
  password_require_uppercase BOOLEAN DEFAULT true,
  password_require_lowercase BOOLEAN DEFAULT true,
  password_require_numbers BOOLEAN DEFAULT true,
  password_require_special BOOLEAN DEFAULT true,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES public.profiles(id),
  updated_by UUID REFERENCES public.profiles(id)
);

-- Enable RLS
ALTER TABLE public.security_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for security_settings
CREATE POLICY "Admins can manage security settings"
ON public.security_settings
FOR ALL
USING (is_admin(auth.uid()));

CREATE POLICY "Active security settings viewable by admins"
ON public.security_settings
FOR SELECT
USING (is_active = true AND is_admin(auth.uid()));

-- Create trigger for updated_at
CREATE TRIGGER update_security_settings_updated_at
BEFORE UPDATE ON public.security_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default security settings
INSERT INTO public.security_settings (
  mfa_required,
  session_timeout_minutes,
  max_failed_login_attempts,
  is_active
) VALUES (
  false,
  120,
  5,
  true
) ON CONFLICT DO NOTHING;