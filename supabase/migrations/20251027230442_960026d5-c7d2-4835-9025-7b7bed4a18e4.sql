-- Create table for storing Google Search Console OAuth tokens
CREATE TABLE IF NOT EXISTS public.google_auth_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  access_token text NOT NULL,
  refresh_token text,
  token_expiry timestamp with time zone NOT NULL,
  scope text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT unique_user_token UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.google_auth_tokens ENABLE ROW LEVEL SECURITY;

-- RLS Policies for google_auth_tokens
CREATE POLICY "Users can view their own tokens"
  ON public.google_auth_tokens
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tokens"
  ON public.google_auth_tokens
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tokens"
  ON public.google_auth_tokens
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tokens"
  ON public.google_auth_tokens
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create table for storing Search Console data
CREATE TABLE IF NOT EXISTS public.search_console_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  site_url text NOT NULL,
  date date NOT NULL,
  clicks integer DEFAULT 0,
  impressions integer DEFAULT 0,
  ctr numeric DEFAULT 0,
  position numeric DEFAULT 0,
  page_path text,
  query text,
  device text,
  country text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.search_console_data ENABLE ROW LEVEL SECURITY;

-- RLS Policies for search_console_data
CREATE POLICY "Admins can view all search console data"
  ON public.search_console_data
  FOR SELECT
  USING (is_admin(auth.uid()));

CREATE POLICY "Users can view their own search console data"
  ON public.search_console_data
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert search console data"
  ON public.search_console_data
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_search_console_data_user_id ON public.search_console_data(user_id);
CREATE INDEX IF NOT EXISTS idx_search_console_data_date ON public.search_console_data(date);
CREATE INDEX IF NOT EXISTS idx_search_console_data_site_url ON public.search_console_data(site_url);

-- Trigger for updated_at
CREATE TRIGGER update_google_auth_tokens_updated_at
  BEFORE UPDATE ON public.google_auth_tokens
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_search_console_data_updated_at
  BEFORE UPDATE ON public.search_console_data
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();