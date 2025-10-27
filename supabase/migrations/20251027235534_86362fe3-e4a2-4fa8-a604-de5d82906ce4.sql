-- Phase 1: Fix Database Constraint
-- Add unique constraint to prevent duplicate records
ALTER TABLE search_console_data 
ADD CONSTRAINT search_console_data_unique_record 
UNIQUE (user_id, site_url, page_path, query, date);

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_search_console_data_lookup 
ON search_console_data(user_id, site_url, date DESC);

-- Add index for page performance queries
CREATE INDEX IF NOT EXISTS idx_search_console_data_pages
ON search_console_data(user_id, site_url, page_path, date DESC);

-- Add index for query performance
CREATE INDEX IF NOT EXISTS idx_search_console_data_queries
ON search_console_data(user_id, site_url, query, date DESC);