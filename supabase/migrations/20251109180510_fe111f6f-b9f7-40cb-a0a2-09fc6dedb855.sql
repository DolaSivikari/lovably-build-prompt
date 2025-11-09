-- Create industry pulse metrics table for dynamic market indicators
CREATE TABLE public.industry_pulse_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_name TEXT NOT NULL,
  current_value TEXT NOT NULL,
  change_direction TEXT CHECK (change_direction IN ('up', 'down', 'neutral')),
  change_percentage TEXT,
  unit TEXT,
  source TEXT NOT NULL,
  source_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID,
  updated_by UUID
);

-- Enable RLS
ALTER TABLE public.industry_pulse_metrics ENABLE ROW LEVEL SECURITY;

-- Public read access for active metrics
CREATE POLICY "Active industry pulse metrics viewable by everyone"
  ON public.industry_pulse_metrics
  FOR SELECT
  USING (is_active = true);

-- Admin full access
CREATE POLICY "Industry pulse metrics manageable by content editors"
  ON public.industry_pulse_metrics
  FOR ALL
  USING (can_edit_content(auth.uid()));

-- Create update trigger
CREATE TRIGGER update_industry_pulse_metrics_updated_at
  BEFORE UPDATE ON public.industry_pulse_metrics
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data
INSERT INTO public.industry_pulse_metrics (metric_name, current_value, change_direction, change_percentage, unit, source, source_url, display_order) VALUES
('Ontario Building Permits', '48,520', 'up', '+12.3%', 'YoY', 'Statistics Canada', 'https://www150.statcan.gc.ca', 1),
('Material Cost Index', '142.5', 'up', '+3.2%', 'Month-over-Month', 'Statistics Canada', 'https://www150.statcan.gc.ca', 2),
('Construction Employment', '485,000', 'up', '+2.1%', 'Workers in Ontario', 'Statistics Canada', 'https://www150.statcan.gc.ca', 3),
('GTA Office Absorption', '2.1M', 'up', 'Net Positive', 'sq ft', 'CBRE Market Report', 'https://www.cbre.ca', 4);