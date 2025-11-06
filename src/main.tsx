import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./styles/tokens.css";
import "./styles/typography.css";
import "./styles/animations.css";
import "./styles/mobile-nav.css";
import "./index.css";
import { reportWebVitals } from "./lib/webVitals";
import { initErrorLogging } from "./utils/errorLogger";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
);

// Initialize Web Vitals tracking
reportWebVitals();

// Initialize error logging
initErrorLogging();

// Register service worker for offline support
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log(
          "[Service Worker] Registered successfully:",
          registration.scope,
        );

        // Check for updates
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                // New service worker available, send skip waiting message
                newWorker.postMessage({ type: "SKIP_WAITING" });

                // Reload page after a short delay
                setTimeout(() => {
                  console.log("[Service Worker] Reloading for update...");
                  window.location.reload();
                }, 100);
              }
            });
          }
        });
      })
      .catch((error) => {
        console.error("[Service Worker] Registration failed:", error);
      });
  });
}
