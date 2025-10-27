-- Phase 1a: Add 'case-study' to post_content_type enum
ALTER TYPE post_content_type ADD VALUE IF NOT EXISTS 'case-study';