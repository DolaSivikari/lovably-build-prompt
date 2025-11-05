-- Add GC tracking fields to projects table
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS project_value TEXT,
ADD COLUMN IF NOT EXISTS square_footage TEXT,
ADD COLUMN IF NOT EXISTS duration TEXT,
ADD COLUMN IF NOT EXISTS your_role TEXT,
ADD COLUMN IF NOT EXISTS delivery_method TEXT,
ADD COLUMN IF NOT EXISTS client_type TEXT,
ADD COLUMN IF NOT EXISTS trades_coordinated INTEGER,
ADD COLUMN IF NOT EXISTS peak_workforce INTEGER,
ADD COLUMN IF NOT EXISTS on_time_completion BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS on_budget BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS safety_incidents INTEGER DEFAULT 0;

-- Add comments for documentation
COMMENT ON COLUMN projects.project_value IS 'Total project value in text format (e.g., "$2.5M")';
COMMENT ON COLUMN projects.square_footage IS 'Building size (e.g., "45,000 sq ft")';
COMMENT ON COLUMN projects.duration IS 'Project timeline (e.g., "8 months")';
COMMENT ON COLUMN projects.your_role IS 'Role in project: General Contractor, Construction Manager, Design-Build, Self-Perform';
COMMENT ON COLUMN projects.delivery_method IS 'Lump Sum, CM-at-Risk, Design-Build, etc.';
COMMENT ON COLUMN projects.client_type IS 'Multi-Family, Commercial, Institutional, Industrial';
COMMENT ON COLUMN projects.trades_coordinated IS 'Number of specialty trades coordinated';
COMMENT ON COLUMN projects.peak_workforce IS 'Maximum workers on site';
COMMENT ON COLUMN projects.on_time_completion IS 'Whether project was completed on schedule';
COMMENT ON COLUMN projects.on_budget IS 'Whether project was delivered within budget';
COMMENT ON COLUMN projects.safety_incidents IS 'Number of safety incidents during project';