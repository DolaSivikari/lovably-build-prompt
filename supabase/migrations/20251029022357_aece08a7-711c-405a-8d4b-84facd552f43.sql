-- =====================================================
-- PHASE 1: BUSINESS MANAGEMENT SYSTEM - DATABASE SETUP
-- Ascent Group Construction Admin Panel
-- =====================================================

-- Create enum types
CREATE TYPE business_client_type AS ENUM ('residential', 'commercial');
CREATE TYPE business_project_status AS ENUM ('lead', 'quoted', 'scheduled', 'in_progress', 'completed', 'cancelled');
CREATE TYPE business_project_priority AS ENUM ('low', 'normal', 'high', 'urgent');
CREATE TYPE business_estimate_status AS ENUM ('draft', 'sent', 'viewed', 'accepted', 'rejected', 'expired', 'converted');
CREATE TYPE business_invoice_status AS ENUM ('draft', 'sent', 'partially_paid', 'paid', 'overdue', 'cancelled');
CREATE TYPE business_invoice_type AS ENUM ('standard', 'progress', 'final', 'deposit');
CREATE TYPE business_payment_method AS ENUM ('cash', 'check', 'credit_card', 'e_transfer', 'wire_transfer', 'other');

-- =====================================================
-- TABLE: business_clients
-- =====================================================
CREATE TABLE business_clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_type business_client_type DEFAULT 'residential',
    company_name VARCHAR(255),
    contact_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    secondary_phone VARCHAR(50),
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(100),
    province VARCHAR(50) DEFAULT 'Ontario',
    postal_code VARCHAR(20),
    lifetime_value_cents BIGINT DEFAULT 0,
    total_projects INTEGER DEFAULT 0,
    rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    source VARCHAR(100),
    notes TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id)
);

-- =====================================================
-- TABLE: business_projects
-- =====================================================
CREATE TABLE business_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_number VARCHAR(50) UNIQUE NOT NULL,
    client_id UUID REFERENCES business_clients(id) ON DELETE CASCADE,
    project_name VARCHAR(255) NOT NULL,
    project_type VARCHAR(100),
    status business_project_status DEFAULT 'lead',
    priority business_project_priority DEFAULT 'normal',
    site_address_line1 VARCHAR(255),
    site_address_line2 VARCHAR(255),
    site_city VARCHAR(100),
    site_province VARCHAR(50),
    site_postal_code VARCHAR(20),
    inquiry_date DATE,
    quote_date DATE,
    scheduled_start_date DATE,
    estimated_completion_date DATE,
    actual_completion_date DATE,
    estimated_value_cents BIGINT,
    actual_value_cents BIGINT,
    square_footage DECIMAL(10,2),
    description TEXT,
    notes TEXT,
    crew_assignment VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id)
);

-- =====================================================
-- TABLE: business_estimates
-- =====================================================
CREATE TABLE business_estimates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    estimate_number VARCHAR(50) UNIQUE NOT NULL,
    client_id UUID REFERENCES business_clients(id) ON DELETE CASCADE,
    project_id UUID REFERENCES business_projects(id) ON DELETE SET NULL,
    status business_estimate_status DEFAULT 'draft',
    estimate_date DATE NOT NULL DEFAULT CURRENT_DATE,
    valid_until DATE NOT NULL,
    subtotal_cents BIGINT DEFAULT 0,
    discount_type VARCHAR(20) DEFAULT 'none',
    discount_amount_cents BIGINT DEFAULT 0,
    discount_percentage DECIMAL(5,2) DEFAULT 0,
    tax_rate DECIMAL(5,2) DEFAULT 13.00,
    tax_amount_cents BIGINT DEFAULT 0,
    total_cents BIGINT DEFAULT 0,
    notes TEXT,
    terms_and_conditions TEXT,
    internal_notes TEXT,
    converted_to_invoice_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id)
);

-- =====================================================
-- TABLE: business_estimate_line_items
-- =====================================================
CREATE TABLE business_estimate_line_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    estimate_id UUID REFERENCES business_estimates(id) ON DELETE CASCADE,
    line_number INTEGER NOT NULL,
    category VARCHAR(50) DEFAULT 'labor',
    description TEXT NOT NULL,
    quantity DECIMAL(10,2) NOT NULL DEFAULT 1,
    unit VARCHAR(50) DEFAULT 'each',
    unit_price_cents BIGINT NOT NULL,
    line_total_cents BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLE: business_invoices
-- =====================================================
CREATE TABLE business_invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    client_id UUID REFERENCES business_clients(id) ON DELETE CASCADE,
    project_id UUID REFERENCES business_projects(id) ON DELETE SET NULL,
    estimate_id UUID REFERENCES business_estimates(id) ON DELETE SET NULL,
    invoice_type business_invoice_type DEFAULT 'standard',
    status business_invoice_status DEFAULT 'draft',
    invoice_date DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL,
    subtotal_cents BIGINT DEFAULT 0,
    discount_type VARCHAR(20) DEFAULT 'none',
    discount_amount_cents BIGINT DEFAULT 0,
    discount_percentage DECIMAL(5,2) DEFAULT 0,
    tax_rate DECIMAL(5,2) DEFAULT 13.00,
    tax_amount_cents BIGINT DEFAULT 0,
    total_cents BIGINT DEFAULT 0,
    amount_paid_cents BIGINT DEFAULT 0,
    amount_due_cents BIGINT DEFAULT 0,
    late_fee_cents BIGINT DEFAULT 0,
    payment_terms TEXT,
    notes TEXT,
    payment_instructions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id)
);

-- =====================================================
-- TABLE: business_invoice_line_items
-- =====================================================
CREATE TABLE business_invoice_line_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id UUID REFERENCES business_invoices(id) ON DELETE CASCADE,
    line_number INTEGER NOT NULL,
    category VARCHAR(50) DEFAULT 'labor',
    description TEXT NOT NULL,
    quantity DECIMAL(10,2) NOT NULL DEFAULT 1,
    unit VARCHAR(50) DEFAULT 'each',
    unit_price_cents BIGINT NOT NULL,
    line_total_cents BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLE: business_payments
-- =====================================================
CREATE TABLE business_payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id UUID REFERENCES business_invoices(id) ON DELETE CASCADE,
    payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
    amount_cents BIGINT NOT NULL,
    payment_method business_payment_method NOT NULL,
    reference_number VARCHAR(100),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id)
);

-- =====================================================
-- TABLE: business_unit_costs
-- =====================================================
CREATE TABLE business_unit_costs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    unit VARCHAR(50) NOT NULL DEFAULT 'each',
    cost_cents BIGINT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- TABLE: business_documents
-- =====================================================
CREATE TABLE business_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    document_name VARCHAR(255) NOT NULL,
    document_type VARCHAR(100),
    file_path TEXT NOT NULL,
    file_size_bytes BIGINT,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    uploaded_by UUID REFERENCES auth.users(id)
);

-- =====================================================
-- TABLE: business_activity_log
-- =====================================================
CREATE TABLE business_activity_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    action VARCHAR(50) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID NOT NULL,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- AUTO-NUMBER GENERATION FUNCTIONS
-- =====================================================

-- Function to generate project numbers
CREATE OR REPLACE FUNCTION generate_project_number()
RETURNS TEXT AS $$
DECLARE
  next_num INTEGER;
  year_prefix TEXT;
BEGIN
  year_prefix := 'PRJ-' || EXTRACT(YEAR FROM CURRENT_DATE)::TEXT || '-';
  
  SELECT COALESCE(MAX(
    CAST(SUBSTRING(project_number FROM '[0-9]+$') AS INTEGER)
  ), 0) + 1
  INTO next_num
  FROM business_projects
  WHERE project_number LIKE year_prefix || '%';
  
  RETURN year_prefix || LPAD(next_num::TEXT, 3, '0');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Function to generate estimate numbers
CREATE OR REPLACE FUNCTION generate_estimate_number()
RETURNS TEXT AS $$
DECLARE
  next_num INTEGER;
  year_prefix TEXT;
BEGIN
  year_prefix := 'EST-' || EXTRACT(YEAR FROM CURRENT_DATE)::TEXT || '-';
  
  SELECT COALESCE(MAX(
    CAST(SUBSTRING(estimate_number FROM '[0-9]+$') AS INTEGER)
  ), 0) + 1
  INTO next_num
  FROM business_estimates
  WHERE estimate_number LIKE year_prefix || '%';
  
  RETURN year_prefix || LPAD(next_num::TEXT, 3, '0');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Function to generate invoice numbers
CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS TEXT AS $$
DECLARE
  next_num INTEGER;
  year_prefix TEXT;
BEGIN
  year_prefix := 'INV-' || EXTRACT(YEAR FROM CURRENT_DATE)::TEXT || '-';
  
  SELECT COALESCE(MAX(
    CAST(SUBSTRING(invoice_number FROM '[0-9]+$') AS INTEGER)
  ), 0) + 1
  INTO next_num
  FROM business_invoices
  WHERE invoice_number LIKE year_prefix || '%';
  
  RETURN year_prefix || LPAD(next_num::TEXT, 3, '0');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- =====================================================
-- TRIGGERS FOR AUTO-NUMBERING
-- =====================================================

CREATE OR REPLACE FUNCTION set_project_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.project_number IS NULL OR NEW.project_number = '' THEN
    NEW.project_number := generate_project_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_set_project_number
  BEFORE INSERT ON business_projects
  FOR EACH ROW
  EXECUTE FUNCTION set_project_number();

CREATE OR REPLACE FUNCTION set_estimate_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.estimate_number IS NULL OR NEW.estimate_number = '' THEN
    NEW.estimate_number := generate_estimate_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_set_estimate_number
  BEFORE INSERT ON business_estimates
  FOR EACH ROW
  EXECUTE FUNCTION set_estimate_number();

CREATE OR REPLACE FUNCTION set_invoice_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.invoice_number IS NULL OR NEW.invoice_number = '' THEN
    NEW.invoice_number := generate_invoice_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_set_invoice_number
  BEFORE INSERT ON business_invoices
  FOR EACH ROW
  EXECUTE FUNCTION set_invoice_number();

-- =====================================================
-- TRIGGER FOR UPDATED_AT TIMESTAMPS
-- =====================================================

CREATE OR REPLACE FUNCTION update_business_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_business_clients_updated_at
  BEFORE UPDATE ON business_clients
  FOR EACH ROW
  EXECUTE FUNCTION update_business_updated_at();

CREATE TRIGGER trg_business_projects_updated_at
  BEFORE UPDATE ON business_projects
  FOR EACH ROW
  EXECUTE FUNCTION update_business_updated_at();

CREATE TRIGGER trg_business_estimates_updated_at
  BEFORE UPDATE ON business_estimates
  FOR EACH ROW
  EXECUTE FUNCTION update_business_updated_at();

CREATE TRIGGER trg_business_invoices_updated_at
  BEFORE UPDATE ON business_invoices
  FOR EACH ROW
  EXECUTE FUNCTION update_business_updated_at();

CREATE TRIGGER trg_business_unit_costs_updated_at
  BEFORE UPDATE ON business_unit_costs
  FOR EACH ROW
  EXECUTE FUNCTION update_business_updated_at();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all business tables
ALTER TABLE business_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_estimate_line_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_invoice_line_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_unit_costs ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_activity_log ENABLE ROW LEVEL SECURITY;

-- Admin-only access policies for all business tables
CREATE POLICY "Admins full access to business_clients"
  ON business_clients FOR ALL
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins full access to business_projects"
  ON business_projects FOR ALL
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins full access to business_estimates"
  ON business_estimates FOR ALL
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins full access to business_estimate_line_items"
  ON business_estimate_line_items FOR ALL
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins full access to business_invoices"
  ON business_invoices FOR ALL
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins full access to business_invoice_line_items"
  ON business_invoice_line_items FOR ALL
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins full access to business_payments"
  ON business_payments FOR ALL
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins full access to business_unit_costs"
  ON business_unit_costs FOR ALL
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins full access to business_documents"
  ON business_documents FOR ALL
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins full access to business_activity_log"
  ON business_activity_log FOR ALL
  USING (is_admin(auth.uid()));

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX idx_business_clients_email ON business_clients(email);
CREATE INDEX idx_business_clients_phone ON business_clients(phone);
CREATE INDEX idx_business_clients_is_active ON business_clients(is_active);
CREATE INDEX idx_business_projects_client_id ON business_projects(client_id);
CREATE INDEX idx_business_projects_status ON business_projects(status);
CREATE INDEX idx_business_projects_project_number ON business_projects(project_number);
CREATE INDEX idx_business_estimates_client_id ON business_estimates(client_id);
CREATE INDEX idx_business_estimates_status ON business_estimates(status);
CREATE INDEX idx_business_estimates_estimate_number ON business_estimates(estimate_number);
CREATE INDEX idx_business_invoices_client_id ON business_invoices(client_id);
CREATE INDEX idx_business_invoices_status ON business_invoices(status);
CREATE INDEX idx_business_invoices_invoice_number ON business_invoices(invoice_number);
CREATE INDEX idx_business_invoices_due_date ON business_invoices(due_date);
CREATE INDEX idx_business_payments_invoice_id ON business_payments(invoice_id);
CREATE INDEX idx_business_activity_log_entity ON business_activity_log(entity_type, entity_id);