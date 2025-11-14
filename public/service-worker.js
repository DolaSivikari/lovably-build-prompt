/**
 * Service Worker for Ascent Group Construction
 * Implements network-first caching strategy for optimal freshness
 */

const CACHE_VERSION = Date.now().toString();
const CACHE_NAME = `ascent-v${CACHE_VERSION}`;
const RUNTIME_CACHE = `ascent-runtime-v${CACHE_VERSION}`;

// Assets to precache (minimal - HTML is handled separately)
const PRECACHE_URLS = [
  '/manifest.json',
  '/hero-poster-1.webp',
  '/hero-poster-2.webp',
  '/hero-poster-3.webp',
  '/hero-poster-4.webp',
  '/hero-poster-5.webp',
  '/hero-poster-6.webp',
];

// Install event - precache essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - network-first strategy for API calls
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Network-first strategy for API calls and Supabase
  if (url.pathname.includes('/api/') || 
      url.hostname.includes('supabase.co') ||
      url.pathname.includes('/rest/v1/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone and cache successful responses
          if (response.ok) {
            const clonedResponse = response.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, clonedResponse);
            });
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache on network failure
          return caches.match(request).then((cached) => {
            if (cached) {
              console.log('[Service Worker] Serving from cache (offline):', request.url);
              return cached;
            }
            // Return offline page or error response
            return new Response('Offline - please check your connection', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain',
              }),
            });
          });
        })
    );
    return;
  }

  // Network-first for CSS/JS to ensure fresh content
  if (request.destination === 'style' || request.destination === 'script') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const clonedResponse = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, clonedResponse);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(request).then((cached) => {
            if (cached) {
              console.log('[Service Worker] Serving stale CSS/JS from cache:', request.url);
              return cached;
            }
            return new Response('Resource unavailable', {
              status: 503,
              statusText: 'Service Unavailable',
            });
          });
        })
    );
    return;
  }

  // Cache-first for images and fonts only
  if (request.destination === 'image' || request.destination === 'font') {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) {
          return cached;
        }
        return fetch(request).then((response) => {
          if (response.ok) {
            const clonedResponse = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, clonedResponse);
            });
          }
          return response;
        });
      })
    );
    return;
  }

  // Default: network-first
  event.respondWith(
    fetch(request)
      .catch(() => caches.match(request))
  );
});

// Listen for messages from the client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((names) => {
        return Promise.all(names.map(name => caches.delete(name)));
      })
    );
  }
});
