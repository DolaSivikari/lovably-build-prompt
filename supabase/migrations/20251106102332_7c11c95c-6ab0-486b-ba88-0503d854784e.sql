-- Create search analytics table for tracking user searches
CREATE TABLE IF NOT EXISTS public.search_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  search_query TEXT NOT NULL,
  results_count INTEGER NOT NULL DEFAULT 0,
  clicked_result_name TEXT,
  clicked_result_link TEXT,
  section_distribution JSONB,
  searched_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add index for efficient querying
CREATE INDEX idx_search_analytics_query ON public.search_analytics(search_query);
CREATE INDEX idx_search_analytics_searched_at ON public.search_analytics(searched_at DESC);
CREATE INDEX idx_search_analytics_session ON public.search_analytics(user_session_id);

-- Enable RLS
ALTER TABLE public.search_analytics ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts (for tracking)
CREATE POLICY "Allow anonymous search tracking"
ON public.search_analytics
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Create policy for authenticated users to view analytics
CREATE POLICY "Authenticated users can view search analytics"
ON public.search_analytics
FOR SELECT
TO authenticated
USING (true);

-- Add comment
COMMENT ON TABLE public.search_analytics IS 'Tracks user search queries to identify popular services and improve navigation';
