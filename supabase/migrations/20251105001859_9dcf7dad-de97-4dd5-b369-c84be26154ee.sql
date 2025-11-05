-- Add scope_of_work and team_credits to projects table
ALTER TABLE public.projects 
ADD COLUMN IF NOT EXISTS scope_of_work TEXT,
ADD COLUMN IF NOT EXISTS team_credits JSONB DEFAULT '[]'::jsonb;

-- Add comment for documentation
COMMENT ON COLUMN public.projects.scope_of_work IS 'Detailed scope of work description for GC projects';
COMMENT ON COLUMN public.projects.team_credits IS 'Array of team members: [{"role": "Project Manager", "name": "John Doe", "company": "ABC Corp"}]';