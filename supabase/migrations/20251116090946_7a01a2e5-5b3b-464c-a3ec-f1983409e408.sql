
-- Drop unused business management tables
DROP TABLE IF EXISTS public.business_projects CASCADE;
DROP TABLE IF EXISTS public.clients CASCADE;
DROP TABLE IF EXISTS public.estimates CASCADE;
DROP TABLE IF EXISTS public.invoices CASCADE;

-- Drop other unused tables
DROP TABLE IF EXISTS public.quiz_submissions CASCADE;
DROP TABLE IF EXISTS public.partner_permissions CASCADE;
DROP TABLE IF EXISTS public.structured_data_templates CASCADE;
DROP TABLE IF EXISTS public.review_requests CASCADE;
