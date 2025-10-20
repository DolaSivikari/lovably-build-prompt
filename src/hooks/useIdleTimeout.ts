import { useEffect, useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const IDLE_TIMEOUT = 15 * 60 * 1000; // 15 minutes in milliseconds
const WARNING_TIME = 14 * 60 * 1000; // Show warning at 14 minutes

export const useIdleTimeout = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60);
  const navigate = useNavigate();

  const onIdle = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const onActive = () => {
    if (showWarning) {
      setShowWarning(false);
      reset();
    }
  };

  const { reset, getRemainingTime } = useIdleTimer({
    onIdle,
    onActive,
    timeout: IDLE_TIMEOUT,
    throttle: 500,
    crossTab: true,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = getRemainingTime();
      const remainingSeconds = Math.floor(remaining / 1000);
      
      // Show warning when 1 minute left
      if (remaining <= 60 * 1000 && remaining > 0) {
        setShowWarning(true);
        setRemainingTime(remainingSeconds);
      } else if (remaining <= 0) {
        setShowWarning(false);
      } else {
        setShowWarning(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [getRemainingTime]);

  const extendSession = () => {
    reset();
    setShowWarning(false);
  };

  return {
    showWarning,
    remainingTime,
    extendSession,
  };
};
