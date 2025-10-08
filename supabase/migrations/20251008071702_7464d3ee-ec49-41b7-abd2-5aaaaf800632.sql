-- Add preview_token and scheduled_publish_at columns to content tables for Phase A

-- Add to blog_posts
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS preview_token TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS scheduled_publish_at TIMESTAMPTZ;

-- Add to projects
ALTER TABLE projects
ADD COLUMN IF NOT EXISTS preview_token TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS scheduled_publish_at TIMESTAMPTZ;

-- Add to services
ALTER TABLE services
ADD COLUMN IF NOT EXISTS preview_token TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS scheduled_publish_at TIMESTAMPTZ;

-- Add to pages
ALTER TABLE pages
ADD COLUMN IF NOT EXISTS preview_token TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS scheduled_publish_at TIMESTAMPTZ;

-- Create tasks table for Gantt/Task Management
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'todo', -- todo, in_progress, review, done
  priority TEXT DEFAULT 'medium', -- low, medium, high, critical
  assigned_to UUID REFERENCES profiles(id),
  start_date DATE,
  due_date DATE,
  estimated_hours DECIMAL,
  actual_hours DECIMAL,
  dependencies JSONB DEFAULT '[]',
  tags TEXT[],
  gantt_position INT,
  is_milestone BOOLEAN DEFAULT false,
  created_by UUID REFERENCES profiles(id),
  updated_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on tasks
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Tasks viewable by everyone (authenticated)
CREATE POLICY "Tasks viewable by authenticated users"
ON tasks FOR SELECT
USING (auth.uid() IS NOT NULL);

-- Tasks manageable by content editors
CREATE POLICY "Tasks manageable by content editors"
ON tasks FOR ALL
USING (can_edit_content(auth.uid()));

-- Create task_comments table
CREATE TABLE IF NOT EXISTS task_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id),
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on task_comments
ALTER TABLE task_comments ENABLE ROW LEVEL SECURITY;

-- Comments viewable by authenticated users
CREATE POLICY "Task comments viewable by authenticated users"
ON task_comments FOR SELECT
USING (auth.uid() IS NOT NULL);

-- Comments manageable by authenticated users
CREATE POLICY "Task comments manageable by authenticated users"
ON task_comments FOR ALL
USING (auth.uid() = user_id);

-- Add trigger for updated_at on tasks
CREATE OR REPLACE TRIGGER update_tasks_updated_at
BEFORE UPDATE ON tasks
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();