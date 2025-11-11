-- Create quote_requests table with lead scoring
CREATE TABLE IF NOT EXISTS quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_type TEXT NOT NULL CHECK (quote_type IN ('specialty_prime', 'trade_package', 'emergency', 'general')),
  
  -- Contact
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  role TEXT CHECK (role IN ('owner', 'developer', 'gc', 'pm', 'consultant', 'other')),
  city TEXT,
  
  -- Project
  project_address TEXT,
  scope_categories TEXT[],
  estimated_lf JSONB,
  estimated_sf JSONB,
  
  -- Schedule
  access_hours TEXT,
  after_hours_required BOOLEAN DEFAULT false,
  target_deadline DATE,
  nte_budget NUMERIC,
  
  -- Files & Notes
  uploaded_files TEXT[],
  additional_notes TEXT,
  
  -- Lead Scoring (auto-calculated)
  lead_score INTEGER,
  priority TEXT CHECK (priority IN ('hot', 'warm', 'cold')),
  estimated_value NUMERIC,
  
  -- Tracking
  source TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'won', 'lost')),
  assigned_to UUID REFERENCES profiles(id),
  
  -- Compliance
  consent_given BOOLEAN DEFAULT false,
  consent_timestamp TIMESTAMPTZ,
  consent_ip TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert quote requests"
  ON quote_requests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all quote requests"
  ON quote_requests FOR SELECT
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins can manage quote requests"
  ON quote_requests FOR ALL
  USING (is_admin(auth.uid()));

-- Lead scoring function
CREATE OR REPLACE FUNCTION calculate_lead_score(req quote_requests)
RETURNS INTEGER AS $$
DECLARE
  score INTEGER := 0;
BEGIN
  IF req.company IS NOT NULL AND req.company != '' THEN score := score + 20; END IF;
  IF req.role = 'owner' OR req.role = 'developer' THEN score := score + 30;
  ELSIF req.role = 'gc' THEN score := score + 25;
  ELSIF req.role = 'pm' THEN score := score + 20;
  END IF;
  IF req.nte_budget IS NOT NULL THEN score := score + 15; END IF;
  IF array_length(req.uploaded_files, 1) > 0 THEN score := score + 10; END IF;
  IF req.after_hours_required THEN score := score + 10; END IF;
  IF array_length(req.scope_categories, 1) >= 2 THEN score := score + 15; END IF;
  RETURN LEAST(score, 100);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to auto-calculate lead score
CREATE OR REPLACE FUNCTION set_lead_score_and_priority()
RETURNS TRIGGER AS $$
BEGIN
  NEW.lead_score := calculate_lead_score(NEW);
  IF NEW.lead_score >= 70 THEN NEW.priority := 'hot';
  ELSIF NEW.lead_score >= 40 THEN NEW.priority := 'warm';
  ELSE NEW.priority := 'cold';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER calculate_lead_score_trigger
  BEFORE INSERT OR UPDATE ON quote_requests
  FOR EACH ROW
  EXECUTE FUNCTION set_lead_score_and_priority();