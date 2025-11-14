/**
 * TEMPORARY KILL-SWITCH SERVICE WORKER
 * Clears all caches and unregisters to unstick mixed theme issue
 * Replace with permanent worker once users see fresh content
 */

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    // Clear ALL caches
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map(name => caches.delete(name)));
    
    // Unregister this worker
    await self.registration.unregister();
    
    // Force all pages to refresh
    const clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach(client => client.navigate(client.url));
  })());
});
