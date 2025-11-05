-- Create leadership_team table
CREATE TABLE public.leadership_team (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  position TEXT NOT NULL,
  bio TEXT,
  photo_url TEXT,
  email TEXT,
  linkedin_url TEXT,
  credentials TEXT[] DEFAULT '{}',
  notable_projects TEXT[] DEFAULT '{}',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.leadership_team ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Active leadership team viewable by everyone"
  ON public.leadership_team
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Leadership team manageable by admins"
  ON public.leadership_team
  FOR ALL
  USING (is_admin(auth.uid()));

-- Add update trigger
CREATE TRIGGER update_leadership_team_updated_at
  BEFORE UPDATE ON public.leadership_team
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();