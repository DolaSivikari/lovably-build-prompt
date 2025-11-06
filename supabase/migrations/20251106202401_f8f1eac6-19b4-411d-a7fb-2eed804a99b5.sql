-- Create navigation_menu_items table
CREATE TABLE IF NOT EXISTS public.navigation_menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_type text NOT NULL DEFAULT 'primary', -- 'primary' | 'footer' | 'mobile'
  parent_id uuid REFERENCES public.navigation_menu_items(id) ON DELETE CASCADE,
  label text NOT NULL,
  url text NOT NULL,
  description text,
  badge text, -- 'new' | 'popular' | 'important'
  icon_name text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  is_mega_menu boolean DEFAULT false,
  mega_menu_section_title text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  updated_by uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.navigation_menu_items ENABLE ROW LEVEL SECURITY;

-- Public read access for active items
CREATE POLICY "Active navigation items viewable by everyone"
  ON public.navigation_menu_items
  FOR SELECT
  USING (is_active = true);

-- Admins can manage navigation
CREATE POLICY "Admins can manage navigation"
  ON public.navigation_menu_items
  FOR ALL
  USING (is_admin(auth.uid()));

-- Add updated_at trigger
CREATE TRIGGER update_navigation_menu_items_updated_at
  BEFORE UPDATE ON public.navigation_menu_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes
CREATE INDEX idx_navigation_menu_items_type ON public.navigation_menu_items(menu_type, display_order);
CREATE INDEX idx_navigation_menu_items_parent ON public.navigation_menu_items(parent_id);
CREATE INDEX idx_navigation_menu_items_active ON public.navigation_menu_items(is_active, display_order);