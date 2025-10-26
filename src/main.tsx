import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import { reportWebVitals } from "./lib/webVitals";
import { initErrorLogging } from "./utils/errorLogger";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

// Initialize Web Vitals tracking
reportWebVitals();

// Initialize error logging
initErrorLogging();

// Register service worker for offline support
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('[Service Worker] Registered successfully:', registration.scope);
      })
      .catch((error) => {
        console.error('[Service Worker] Registration failed:', error);
      });
  });
}
