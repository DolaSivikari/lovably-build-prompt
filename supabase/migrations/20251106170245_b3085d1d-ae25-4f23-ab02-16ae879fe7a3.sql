-- =====================================================
-- DATABASE CLEANUP - Full Safe Cleanup
-- Removes empty tables, old logs, and unused functions
-- Date: 2025-01-06
-- Total Impact: ~1.5 MB savings, 27 tables removed
-- =====================================================

-- PART 1: Clean Old Error Logs (Keep last 7 days)
-- Expected: Remove ~14 old log entries
DELETE FROM public.error_logs 
WHERE created_at < NOW() - INTERVAL '7 days';

-- PART 2A: Drop Empty Business Management Tables (10 tables, ~500 KB)
-- These were created for future features but never used
DROP TABLE IF EXISTS public.business_activity_log CASCADE;
DROP TABLE IF EXISTS public.business_documents CASCADE;
DROP TABLE IF EXISTS public.business_payments CASCADE;
DROP TABLE IF EXISTS public.business_invoice_line_items CASCADE;
DROP TABLE IF EXISTS public.business_invoices CASCADE;
DROP TABLE IF EXISTS public.business_estimate_line_items CASCADE;
DROP TABLE IF EXISTS public.business_estimates CASCADE;
DROP TABLE IF EXISTS public.business_unit_costs CASCADE;
DROP TABLE IF EXISTS public.business_projects CASCADE;
DROP TABLE IF EXISTS public.business_clients CASCADE;

-- PART 2B: Drop Empty Submission Tables (4 tables, ~150 KB)
-- Can be recreated via migrations if needed later
DROP TABLE IF EXISTS public.resume_submissions CASCADE;
DROP TABLE IF EXISTS public.contact_submissions CASCADE;
DROP TABLE IF EXISTS public.prequalification_downloads CASCADE;
DROP TABLE IF EXISTS public.rfp_submissions CASCADE;

-- PART 2C: Drop Empty Infrastructure Tables (8 tables, ~350 KB)
-- Unused security and monitoring features
DROP TABLE IF EXISTS public.newsletter_subscribers CASCADE;
DROP TABLE IF EXISTS public.analytics_snapshots CASCADE;
DROP TABLE IF EXISTS public.security_alerts CASCADE;
DROP TABLE IF EXISTS public.user_sessions CASCADE;
DROP TABLE IF EXISTS public.auth_account_lockouts CASCADE;
DROP TABLE IF EXISTS public.rate_limits CASCADE;
DROP TABLE IF EXISTS public.sitemap_logs CASCADE;
DROP TABLE IF EXISTS public.document_access_log CASCADE;

-- PART 2D: Drop Empty Content Tables (5 tables, ~150 KB)
-- Features that were planned but not implemented
DROP TABLE IF EXISTS public.seo_settings CASCADE;
DROP TABLE IF EXISTS public.content_comments CASCADE;
DROP TABLE IF EXISTS public.templates CASCADE;
DROP TABLE IF EXISTS public.style_presets CASCADE;
DROP TABLE IF EXISTS public.navigation_menus CASCADE;

-- PART 3: Drop Unused Functions Related to Dropped Tables
-- These were for business management features
DROP FUNCTION IF EXISTS public.generate_project_number() CASCADE;
DROP FUNCTION IF EXISTS public.generate_estimate_number() CASCADE;
DROP FUNCTION IF EXISTS public.generate_invoice_number() CASCADE;
DROP FUNCTION IF EXISTS public.set_project_number() CASCADE;
DROP FUNCTION IF EXISTS public.set_estimate_number() CASCADE;
DROP FUNCTION IF EXISTS public.set_invoice_number() CASCADE;
DROP FUNCTION IF EXISTS public.update_business_updated_at() CASCADE;

-- PART 4: Drop Unused Notification Triggers for Dropped Tables
DROP FUNCTION IF EXISTS public.notify_admins_for_prequal() CASCADE;
DROP FUNCTION IF EXISTS public.notify_admins_for_rfp() CASCADE;
DROP FUNCTION IF EXISTS public.notify_admins_for_contact() CASCADE;
DROP FUNCTION IF EXISTS public.notify_admins_for_resume() CASCADE;

-- PART 5: Drop Unused Security Functions for Dropped Tables
DROP FUNCTION IF EXISTS public.cleanup_old_failed_attempts() CASCADE;
DROP FUNCTION IF EXISTS public.cleanup_expired_lockouts() CASCADE;
DROP FUNCTION IF EXISTS public.cleanup_expired_sessions() CASCADE;
DROP FUNCTION IF EXISTS public.is_account_locked(text) CASCADE;

-- PART 6: Drop Unused Cleanup Functions
DROP FUNCTION IF EXISTS public.cleanup_rate_limits() CASCADE;