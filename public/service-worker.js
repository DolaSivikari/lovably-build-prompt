/**
 * Permanent Service Worker - No dependencies
 * Ensures fresh HTML + cached assets never mix versions
 */

const CACHE_VERSION = '1.0.0';
const PRECACHE_NAME = `app-precache-${CACHE_VERSION}`;
const RUNTIME_CACHE = `app-runtime-${CACHE_VERSION}`;
const API_CACHE = `app-api-${CACHE_VERSION}`;

// Activate immediately & take control of all pages
self.skipWaiting();

self.addEventListener('install', event => {
  // Minimal precache: only critical assets that always exist
  const precacheUrls = [
    '/',
    '/index.html',
  ];
  
  event.waitUntil(
    caches.open(PRECACHE_NAME)
      .then(cache => {
        // Use addAll but catch failures gracefully
        return Promise.allSettled(
          precacheUrls.map(url => cache.add(url))
        ).catch(() => {
          // If precache fails, continue anyway
          console.warn('[SW] Precache failed, continuing');
        });
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      // Claim all clients immediately
      await self.clients.claim();
      
      // Delete old caches
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter(name => !name.includes(CACHE_VERSION))
          .map(name => caches.delete(name))
      );
    })()
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // HTML pages: ALWAYS network-first to prevent stale markup
  if (request.destination === 'document' || request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Only cache successful HTML
          if (response.status === 200) {
            const cloned = response.clone();
            caches.open(RUNTIME_CACHE).then(cache => cache.put(request, cloned));
          }
          return response;
        })
        .catch(() => {
          // Fallback to cached HTML
          return caches.match(request)
            .then(cached => cached || new Response('Offline', { status: 503 }));
        })
    );
    return;
  }

  // API calls (Supabase, etc.): Network-first with timeout
  if (url.hostname.includes('supabase') || url.pathname.includes('/api/')) {
    event.respondWith(
      Promise.race([
        fetch(request),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('timeout')), 5000)
        ),
      ])
        .then(response => {
          if (response.ok) {
            caches.open(API_CACHE).then(cache => cache.put(request, response.clone()));
          }
          return response;
        })
        .catch(() => {
          return caches.match(request)
            .then(cached => cached || new Response('API Offline', { status: 503 }));
        })
    );
    return;
  }

  // JS/CSS: Stale-while-revalidate (serve cached, fetch fresh in background)
  if (request.destination === 'script' || request.destination === 'style') {
    event.respondWith(
      caches.match(request)
        .then(cached => {
          const fetchPromise = fetch(request).then(response => {
            if (response.ok) {
              caches.open(RUNTIME_CACHE).then(cache => cache.put(request, response.clone()));
            }
            return response;
          }).catch(() => cached);
          
          return cached || fetchPromise;
        })
    );
    return;
  }

  // Images/fonts: Cache-first
  if (request.destination === 'image' || request.destination === 'font') {
    event.respondWith(
      caches.match(request)
        .then(cached => {
          if (cached) return cached;
          
          return fetch(request).then(response => {
            if (response.ok) {
              caches.open(RUNTIME_CACHE).then(cache => cache.put(request, response.clone()));
            }
            return response;
          });
        })
        .catch(() => new Response('Not found', { status: 404 }))
    );
    return;
  }

  // Default: Network-first
  event.respondWith(
    fetch(request)
      .then(response => {
        if (response.ok) {
          caches.open(RUNTIME_CACHE).then(cache => cache.put(request, response.clone()));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});

// Handle messages from page
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
