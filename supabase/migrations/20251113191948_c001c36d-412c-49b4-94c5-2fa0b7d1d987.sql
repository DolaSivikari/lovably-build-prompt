-- Add case study fields to projects table for detailed project case studies
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS challenge TEXT,
ADD COLUMN IF NOT EXISTS solution TEXT,
ADD COLUMN IF NOT EXISTS results TEXT;

-- Add comments for documentation
COMMENT ON COLUMN projects.challenge IS 'Detailed description of project challenges and problems (HTML format)';
COMMENT ON COLUMN projects.solution IS 'Detailed description of approach and solutions implemented (HTML format)';
COMMENT ON COLUMN projects.results IS 'Detailed description of outcomes and results achieved (HTML format)';