-- Drop unused tables that have no frontend integration

-- Drop awards_certifications table and its dependencies
DROP TABLE IF EXISTS public.awards_certifications CASCADE;

-- Drop leadership_team table and its dependencies
DROP TABLE IF EXISTS public.leadership_team CASCADE;

-- Drop hero_images table and its dependencies
DROP TABLE IF EXISTS public.hero_images CASCADE;

-- Drop industry_pulse_metrics table and its dependencies
DROP TABLE IF EXISTS public.industry_pulse_metrics CASCADE;

-- Drop job_postings table and its dependencies
DROP TABLE IF EXISTS public.job_postings CASCADE;

-- Drop resume_submissions table (no longer needed without job postings)
DROP TABLE IF EXISTS public.resume_submissions CASCADE;