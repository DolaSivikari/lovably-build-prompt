-- Create trigger function to notify admins for prequalification requests
CREATE OR REPLACE FUNCTION notify_admins_for_prequal()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  admin_record record;
BEGIN
  -- Loop through all admins and super_admins
  FOR admin_record IN 
    SELECT user_id FROM user_roles 
    WHERE role IN ('admin', 'super_admin')
  LOOP
    -- Create notification for each admin
    INSERT INTO public.notifications (user_id, type, title, message, link, metadata)
    VALUES (
      admin_record.user_id,
      'prequal_submission',
      'New Prequalification Request',
      NEW.company_name || ' submitted a prequalification package request',
      '/admin/prequalifications',
      jsonb_build_object(
        'submission_id', NEW.id, 
        'company_name', NEW.company_name,
        'contact_name', NEW.contact_name,
        'email', NEW.email
      )
    );
  END LOOP;
  
  RETURN NEW;
END;
$$;

-- Attach trigger to prequalification_downloads table
DROP TRIGGER IF EXISTS trg_prequal_notify ON prequalification_downloads;
CREATE TRIGGER trg_prequal_notify
  AFTER INSERT ON prequalification_downloads
  FOR EACH ROW
  EXECUTE FUNCTION notify_admins_for_prequal();