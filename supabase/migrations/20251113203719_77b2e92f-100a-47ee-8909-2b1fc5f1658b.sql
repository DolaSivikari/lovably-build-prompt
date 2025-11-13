-- Phase 4: Database Maintenance - Schedule Cleanup Jobs and Add Indexes

-- 1. Performance Metrics Cleanup (90 days retention)
SELECT cron.schedule(
  'cleanup-performance-metrics',
  '0 2 * * *', -- 2 AM daily
  $$DELETE FROM performance_metrics WHERE recorded_at < now() - interval '90 days'$$
);

-- 2. Error Logs Cleanup (30 days retention)
SELECT cron.schedule(
  'cleanup-error-logs',
  '0 3 * * 0', -- 3 AM every Sunday
  $$SELECT cleanup_old_error_logs()$$
);

-- 3. Audit Log Archival (1 year retention)
SELECT cron.schedule(
  'archive-audit-logs',
  '0 4 1 * *', -- 4 AM first day of month
  $$DELETE FROM audit_log WHERE created_at < now() - interval '1 year'$$
);

-- 4. Add Performance Indexes
CREATE INDEX IF NOT EXISTS idx_review_requests_status 
ON review_requests(status)
WHERE status IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_performance_metrics_date 
ON performance_metrics(recorded_at DESC);

CREATE INDEX IF NOT EXISTS idx_error_logs_date 
ON error_logs(created_at DESC);

-- 5. Run Immediate Cleanup
DELETE FROM performance_metrics 
WHERE recorded_at < now() - interval '90 days';

DELETE FROM error_logs 
WHERE created_at < now() - interval '30 days';