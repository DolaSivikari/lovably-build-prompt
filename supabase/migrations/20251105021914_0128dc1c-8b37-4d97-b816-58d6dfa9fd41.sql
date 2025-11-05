-- Drop unused tables that have zero code references
-- This cleanup was verified by codebase audit on 2025

-- Drop landing_page table (replaced by homepage_settings)
DROP TABLE IF EXISTS public.landing_page CASCADE;

-- Drop pages table (custom page builder not implemented)
DROP TABLE IF EXISTS public.pages CASCADE;

-- Drop tasks and task_comments (task management not implemented)
DROP TABLE IF EXISTS public.task_comments CASCADE;
DROP TABLE IF EXISTS public.tasks CASCADE;

-- Drop approval_workflows (approval workflow not implemented)
DROP TABLE IF EXISTS public.approval_workflows CASCADE;

-- Note: Keeping navigation_menus (used in TemplateManager)
-- Note: Keeping google_auth_tokens (used in SEODashboard)