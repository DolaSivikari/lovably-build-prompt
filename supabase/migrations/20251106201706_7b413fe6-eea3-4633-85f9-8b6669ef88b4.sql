-- Create why_choose_us_items table
CREATE TABLE IF NOT EXISTS public.why_choose_us_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  stats_badge text,
  icon_name text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  updated_by uuid REFERENCES auth.users(id)
);

-- Enable RLS for why_choose_us_items
ALTER TABLE public.why_choose_us_items ENABLE ROW LEVEL SECURITY;

-- Public read access for active items
CREATE POLICY "Active items viewable by everyone"
  ON public.why_choose_us_items
  FOR SELECT
  USING (is_active = true);

-- Content editors can manage items
CREATE POLICY "Content editors can manage why choose us items"
  ON public.why_choose_us_items
  FOR ALL
  USING (can_edit_content(auth.uid()));

-- Create company_overview_sections table
CREATE TABLE IF NOT EXISTS public.company_overview_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_type text NOT NULL CHECK (section_type IN ('approach', 'values', 'promise')),
  title text NOT NULL,
  description text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  updated_by uuid REFERENCES auth.users(id)
);

-- Enable RLS for company_overview_sections
ALTER TABLE public.company_overview_sections ENABLE ROW LEVEL SECURITY;

-- Public read access for active sections
CREATE POLICY "Active sections viewable by everyone"
  ON public.company_overview_sections
  FOR SELECT
  USING (is_active = true);

-- Content editors can manage sections
CREATE POLICY "Content editors can manage overview sections"
  ON public.company_overview_sections
  FOR ALL
  USING (can_edit_content(auth.uid()));

-- Create company_overview_items table
CREATE TABLE IF NOT EXISTS public.company_overview_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id uuid NOT NULL REFERENCES public.company_overview_sections(id) ON DELETE CASCADE,
  title text,
  content text NOT NULL,
  icon_name text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  updated_by uuid REFERENCES auth.users(id)
);

-- Enable RLS for company_overview_items
ALTER TABLE public.company_overview_items ENABLE ROW LEVEL SECURITY;

-- Public read access for active items
CREATE POLICY "Active overview items viewable by everyone"
  ON public.company_overview_items
  FOR SELECT
  USING (is_active = true);

-- Content editors can manage items
CREATE POLICY "Content editors can manage overview items"
  ON public.company_overview_items
  FOR ALL
  USING (can_edit_content(auth.uid()));

-- Add updated_at trigger for why_choose_us_items
CREATE TRIGGER update_why_choose_us_items_updated_at
  BEFORE UPDATE ON public.why_choose_us_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add updated_at trigger for company_overview_sections
CREATE TRIGGER update_company_overview_sections_updated_at
  BEFORE UPDATE ON public.company_overview_sections
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add updated_at trigger for company_overview_items
CREATE TRIGGER update_company_overview_items_updated_at
  BEFORE UPDATE ON public.company_overview_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better query performance
CREATE INDEX idx_why_choose_us_items_active_order ON public.why_choose_us_items(is_active, display_order);
CREATE INDEX idx_company_overview_sections_type ON public.company_overview_sections(section_type);
CREATE INDEX idx_company_overview_items_section ON public.company_overview_items(section_id, display_order);