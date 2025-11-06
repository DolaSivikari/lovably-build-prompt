-- Add 'review' to publish_state enum
ALTER TYPE publish_state ADD VALUE IF NOT EXISTS 'review';