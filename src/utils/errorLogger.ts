import { supabase } from "@/integrations/supabase/client";

/**
 * Log client-side errors to database for monitoring
 */
export const logError = async (error: Error, context?: Record<string, any>) => {
  try {
    // Avoid logging in development to reduce noise
    if (import.meta.env.DEV) {
      console.error("[Error Logger]", error, context);
      return;
    }

    await supabase.from("error_logs").insert({
      message: error.message,
      stack: error.stack || "",
      context: context ? JSON.stringify(context) : null,
      url: window.location.href,
      user_agent: navigator.userAgent,
    });
  } catch (logError) {
    // Silently fail - don't break the app if logging fails
    console.error("[Error Logger] Failed to log error:", logError);
  }
};

/**
 * Initialize error logging interceptors
 */
export const initErrorLogging = () => {
  // Intercept window.onerror
  const originalOnError = window.onerror;
  window.onerror = (message, source, lineno, colno, error) => {
    if (error) {
      logError(error, {
        source,
        line: lineno,
        column: colno,
      });
    }

    if (originalOnError) {
      return originalOnError(message, source, lineno, colno, error);
    }
    return false;
  };

  // Intercept unhandled promise rejections
  window.addEventListener("unhandledrejection", (event) => {
    logError(new Error(`Unhandled Promise Rejection: ${event.reason}`), {
      reason: event.reason,
    });
  });

  // Intercept console.error
  const originalError = console.error;
  console.error = (...args) => {
    originalError(...args);

    // Only log if first argument is an Error object
    if (args[0] instanceof Error) {
      logError(args[0], { additionalArgs: args.slice(1) });
    }
  };
};
