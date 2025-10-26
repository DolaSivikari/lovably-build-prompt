/**
 * Cache-busting utility for API requests and asset URLs
 * Ensures users always get fresh content after CMS updates
 */

const APP_VERSION = Date.now().toString();

/**
 * Add cache-busting query parameter to URL
 */
export const addCacheBuster = (url: string): string => {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}v=${APP_VERSION}`;
};

/**
 * Force reload with cache invalidation
 */
export const bustCache = (): void => {
  const timestamp = Date.now();
  
  // Clear service worker caches if available
  if ('caches' in window) {
    caches.keys().then((names) => {
      names.forEach(name => caches.delete(name));
    });
  }
  
  // Force reload with new timestamp
  window.location.search = `?v=${timestamp}`;
};

/**
 * Get current cache version
 */
export const getCacheVersion = (): string => APP_VERSION;

/**
 * Check if cache needs refresh (compares stored vs current version)
 */
export const needsCacheRefresh = (): boolean => {
  const storedVersion = localStorage.getItem('app_version');
  return storedVersion !== APP_VERSION;
};

/**
 * Mark cache as refreshed
 */
export const markCacheRefreshed = (): void => {
  localStorage.setItem('app_version', APP_VERSION);
  localStorage.setItem('last_cache_refresh', new Date().toISOString());
};
