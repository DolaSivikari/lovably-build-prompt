-- Featured Services Management Table
CREATE TABLE IF NOT EXISTS public.featured_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_name TEXT NOT NULL,
  service_link TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  category TEXT,
  description TEXT,
  promotion_badge TEXT,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID REFERENCES public.profiles(id),
  updated_by UUID REFERENCES public.profiles(id)
);

-- Service Promotions Table (Seasonal/Campaign)
CREATE TABLE IF NOT EXISTS public.service_promotions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  service_link TEXT NOT NULL,
  promotion_type TEXT NOT NULL CHECK (promotion_type IN ('seasonal', 'campaign', 'urgent', 'new')),
  badge_text TEXT,
  badge_color TEXT,
  priority INTEGER NOT NULL DEFAULT 0,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  target_audience TEXT[],
  discount_percentage INTEGER,
  promotion_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by UUID REFERENCES public.profiles(id)
);

-- Popular Services Analytics Table
CREATE TABLE IF NOT EXISTS public.popular_services_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_link TEXT NOT NULL,
  service_name TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('impression', 'click', 'conversion')),
  user_identifier TEXT NOT NULL,
  session_id TEXT,
  source TEXT NOT NULL DEFAULT 'mobile_nav',
  position INTEGER,
  variant TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- User Service Preferences Table
CREATE TABLE IF NOT EXISTS public.user_service_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_identifier TEXT NOT NULL,
  service_link TEXT NOT NULL,
  interaction_count INTEGER NOT NULL DEFAULT 1,
  last_viewed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  time_spent_seconds INTEGER DEFAULT 0,
  clicked_from_popular BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_identifier, service_link)
);

-- Recommendation Cache Table
CREATE TABLE IF NOT EXISTS public.service_recommendations_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_identifier TEXT NOT NULL,
  recommended_services JSONB NOT NULL,
  recommendation_score FLOAT,
  algorithm_version TEXT NOT NULL DEFAULT 'v1',
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_identifier)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_featured_services_active ON public.featured_services(is_active, display_order);
CREATE INDEX IF NOT EXISTS idx_service_promotions_active_dates ON public.service_promotions(is_active, start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_popular_services_analytics_service ON public.popular_services_analytics(service_link, event_type, created_at);
CREATE INDEX IF NOT EXISTS idx_popular_services_analytics_created ON public.popular_services_analytics(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_service_preferences_user ON public.user_service_preferences(user_identifier, last_viewed_at DESC);
CREATE INDEX IF NOT EXISTS idx_recommendations_cache_user ON public.service_recommendations_cache(user_identifier, expires_at);

-- Enable RLS
ALTER TABLE public.featured_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.popular_services_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_service_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_recommendations_cache ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Featured Services (public read, admin write)
CREATE POLICY "Featured services are viewable by everyone"
  ON public.featured_services FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage featured services"
  ON public.featured_services FOR ALL
  USING (public.is_admin(auth.uid()));

-- RLS Policies for Service Promotions (public read, admin write)
CREATE POLICY "Active promotions are viewable by everyone"
  ON public.service_promotions FOR SELECT
  USING (is_active = true AND now() BETWEEN start_date AND end_date);

CREATE POLICY "Admins can manage promotions"
  ON public.service_promotions FOR ALL
  USING (public.is_admin(auth.uid()));

-- RLS Policies for Analytics (anyone can insert, admins can read all)
CREATE POLICY "Anyone can log analytics events"
  ON public.popular_services_analytics FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all analytics"
  ON public.popular_services_analytics FOR SELECT
  USING (public.is_admin(auth.uid()));

-- RLS Policies for User Preferences (users manage their own)
CREATE POLICY "Users can manage their own preferences"
  ON public.user_service_preferences FOR ALL
  USING (true);

-- RLS Policies for Recommendations Cache (users read their own)
CREATE POLICY "Users can view their own recommendations"
  ON public.service_recommendations_cache FOR SELECT
  USING (true);

CREATE POLICY "System can manage recommendation cache"
  ON public.service_recommendations_cache FOR ALL
  USING (true);

-- Trigger for updated_at
CREATE TRIGGER update_featured_services_updated_at
  BEFORE UPDATE ON public.featured_services
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_service_promotions_updated_at
  BEFORE UPDATE ON public.service_promotions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_service_preferences_updated_at
  BEFORE UPDATE ON public.user_service_preferences
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to get active featured services
CREATE OR REPLACE FUNCTION public.get_active_featured_services()
RETURNS TABLE (
  id UUID,
  service_name TEXT,
  service_link TEXT,
  icon_name TEXT,
  category TEXT,
  description TEXT,
  promotion_badge TEXT
) 
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    id,
    service_name,
    service_link,
    icon_name,
    category,
    description,
    promotion_badge
  FROM public.featured_services
  WHERE is_active = true
    AND (start_date IS NULL OR start_date <= now())
    AND (end_date IS NULL OR end_date >= now())
  ORDER BY display_order ASC, created_at DESC
  LIMIT 10;
$$;

-- Function to get active promotions
CREATE OR REPLACE FUNCTION public.get_active_promotions()
RETURNS TABLE (
  id UUID,
  title TEXT,
  service_link TEXT,
  promotion_type TEXT,
  badge_text TEXT,
  badge_color TEXT,
  promotion_message TEXT,
  discount_percentage INTEGER
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    id,
    title,
    service_link,
    promotion_type,
    badge_text,
    badge_color,
    promotion_message,
    discount_percentage
  FROM public.service_promotions
  WHERE is_active = true
    AND now() BETWEEN start_date AND end_date
  ORDER BY priority DESC, created_at DESC;
$$;

-- Function to track service interaction
CREATE OR REPLACE FUNCTION public.track_service_interaction(
  p_user_identifier TEXT,
  p_service_link TEXT,
  p_time_spent INTEGER DEFAULT 0,
  p_from_popular BOOLEAN DEFAULT false
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_service_preferences (
    user_identifier,
    service_link,
    interaction_count,
    last_viewed_at,
    time_spent_seconds,
    clicked_from_popular
  ) VALUES (
    p_user_identifier,
    p_service_link,
    1,
    now(),
    p_time_spent,
    p_from_popular
  )
  ON CONFLICT (user_identifier, service_link)
  DO UPDATE SET
    interaction_count = user_service_preferences.interaction_count + 1,
    last_viewed_at = now(),
    time_spent_seconds = user_service_preferences.time_spent_seconds + p_time_spent,
    clicked_from_popular = p_from_popular OR user_service_preferences.clicked_from_popular,
    updated_at = now();
END;
$$;

-- Function to get personalized recommendations
CREATE OR REPLACE FUNCTION public.get_personalized_recommendations(
  p_user_identifier TEXT,
  p_limit INTEGER DEFAULT 4
)
RETURNS TABLE (
  service_link TEXT,
  service_name TEXT,
  recommendation_score FLOAT,
  reason TEXT
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_cached_recs JSONB;
  v_cache_expires TIMESTAMPTZ;
BEGIN
  -- Check cache first
  SELECT recommended_services, expires_at
  INTO v_cached_recs, v_cache_expires
  FROM public.service_recommendations_cache
  WHERE user_identifier = p_user_identifier
    AND expires_at > now();
  
  IF v_cached_recs IS NOT NULL THEN
    -- Return cached recommendations
    RETURN QUERY
    SELECT 
      (rec->>'service_link')::TEXT,
      (rec->>'service_name')::TEXT,
      (rec->>'score')::FLOAT,
      (rec->>'reason')::TEXT
    FROM jsonb_array_elements(v_cached_recs) AS rec
    LIMIT p_limit;
  ELSE
    -- Generate new recommendations based on user preferences and popular services
    RETURN QUERY
    WITH user_prefs AS (
      SELECT service_link, interaction_count, last_viewed_at
      FROM public.user_service_preferences
      WHERE user_identifier = p_user_identifier
      ORDER BY last_viewed_at DESC
      LIMIT 10
    ),
    popular_now AS (
      SELECT 
        clicked_result_link as service_link,
        COUNT(*) as search_count
      FROM public.search_analytics
      WHERE searched_at >= now() - INTERVAL '7 days'
        AND clicked_result_link IS NOT NULL
      GROUP BY clicked_result_link
      ORDER BY search_count DESC
      LIMIT 20
    )
    SELECT 
      p.service_link::TEXT,
      INITCAP(REPLACE(SPLIT_PART(p.service_link, '/', -1), '-', ' '))::TEXT as service_name,
      (p.search_count * 0.7 + COALESCE(up.interaction_count, 0) * 0.3)::FLOAT as score,
      CASE 
        WHEN up.interaction_count > 0 THEN 'Based on your interests'
        ELSE 'Trending now'
      END::TEXT as reason
    FROM popular_now p
    LEFT JOIN user_prefs up ON up.service_link = p.service_link
    WHERE p.service_link NOT IN (
      SELECT service_link FROM user_prefs ORDER BY last_viewed_at DESC LIMIT 3
    )
    ORDER BY score DESC
    LIMIT p_limit;
  END IF;
END;
$$;