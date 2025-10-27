-- Create about_page_settings table for CMS
CREATE TABLE public.about_page_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Header Stats
  years_in_business INTEGER DEFAULT 15,
  total_projects INTEGER DEFAULT 500,
  satisfaction_rate INTEGER DEFAULT 98,
  
  -- Company Story
  story_headline TEXT DEFAULT 'Our Story',
  story_content JSONB DEFAULT '[]'::jsonb,
  story_image_url TEXT,
  story_promise_title TEXT DEFAULT 'Our Promise',
  story_promise_text TEXT,
  
  -- Core Values
  values JSONB DEFAULT '[]'::jsonb,
  
  -- Sustainability
  sustainability_headline TEXT DEFAULT 'Sustainability Commitment',
  sustainability_commitment TEXT,
  sustainability_initiatives JSONB DEFAULT '[]'::jsonb,
  
  -- Safety
  safety_headline TEXT DEFAULT 'Safety First, Always',
  safety_commitment TEXT,
  safety_stats JSONB DEFAULT '[]'::jsonb,
  safety_programs JSONB DEFAULT '[]'::jsonb,
  
  -- FAQ
  faq_items JSONB DEFAULT '[]'::jsonb,
  
  -- CTA
  cta_headline TEXT DEFAULT 'Ready to Work with Us?',
  cta_subheadline TEXT,
  
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.about_page_settings ENABLE ROW LEVEL SECURITY;

-- Public read access to active settings
CREATE POLICY "Public read access to about_page_settings"
  ON public.about_page_settings FOR SELECT
  USING (is_active = true);

-- Admin full access
CREATE POLICY "Admin full access to about_page_settings"
  ON public.about_page_settings FOR ALL
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- Trigger for updated_at
CREATE TRIGGER update_about_page_settings_updated_at
  BEFORE UPDATE ON public.about_page_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Seed with current data
INSERT INTO public.about_page_settings (
  years_in_business,
  total_projects,
  satisfaction_rate,
  story_headline,
  story_content,
  story_promise_title,
  story_promise_text,
  values,
  sustainability_headline,
  sustainability_commitment,
  sustainability_initiatives,
  safety_headline,
  safety_commitment,
  safety_stats,
  safety_programs,
  cta_headline,
  cta_subheadline
) VALUES (
  15,
  500,
  98,
  'Our Story',
  '["Founded in 2009, Ascent Group Construction began with a simple mission: deliver exceptional painting and exterior finishing services with uncompromising quality and integrity.", "What started as a small team of dedicated craftsmen has grown into one of the GTA''s most trusted contractors. We''ve completed over 500 projects, built lasting relationships with hundreds of satisfied clients, and established a reputation for excellence that speaks for itself.", "Today, we continue to uphold the same values that guided us from day one—quality first, transparent communication, unwavering commitment to safety, and complete customer satisfaction."]'::jsonb,
  'Our Promise',
  'Every project completed on time, within budget, and exceeding expectations.',
  '[{"icon": "award", "title": "Quality First", "description": "We never compromise on materials or workmanship. Every project receives the same attention to detail."}, {"icon": "message-circle", "title": "Clear Communication", "description": "Transparent updates throughout your project. You''ll always know what''s happening and when."}, {"icon": "shield", "title": "Safety & Compliance", "description": "Full WSIB coverage, liability insurance, and strict adherence to all safety protocols."}, {"icon": "heart", "title": "Customer Focus", "description": "Your satisfaction is our success. We''re not done until you''re completely happy."}]'::jsonb,
  'Sustainability Commitment',
  'We''re committed to reducing our environmental impact through responsible practices, eco-friendly materials, and waste reduction initiatives.',
  '[{"title": "Low-VOC Materials", "description": "We use premium low-VOC and zero-VOC paints that are better for indoor air quality and the environment", "impact": "90% reduction in harmful emissions"}, {"title": "Waste Management", "description": "Comprehensive recycling program for paint cans, drop cloths, and construction materials", "impact": "75% of waste diverted from landfills"}, {"title": "Energy Efficiency", "description": "Our EIFS and insulation services help buildings reduce energy consumption year-round", "impact": "Average 25% reduction in heating/cooling costs"}]'::jsonb,
  'Safety First, Always',
  'Our comprehensive safety program protects our team, your property, and everyone on site.',
  '[{"value": "500+", "label": "Projects with Zero Lost-Time Incidents"}, {"value": "2,000+", "label": "Hours of Safety Training Annually"}, {"value": "100%", "label": "OSHA Compliance Rate"}]'::jsonb,
  '[{"title": "Daily Safety Briefings", "description": "Every crew starts with a safety meeting covering the day''s specific hazards and protocols"}, {"title": "Fall Protection Systems", "description": "Full harness systems, guardrails, and scaffolding for all elevated work"}, {"title": "Hazard Communication", "description": "Proper labeling and handling procedures for all materials and chemicals"}, {"title": "Emergency Response", "description": "All crew members trained in first aid with emergency procedures for every site"}]'::jsonb,
  'Ready to Work with Us?',
  'Experience the Ascent Group difference—quality craftsmanship, transparent communication, and complete satisfaction.'
);