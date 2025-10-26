/**
 * Asset Resolver Utility - Phase 0
 * Fixes broken images on mobile by converting JSON paths to Vite URLs
 */

// Import all images from assets folder
const imageModules = import.meta.glob('/src/assets/**/*.{jpg,jpeg,png,webp,svg}', { eager: true });

// Create a map of image paths for fast lookup
const imageMap: Record<string, string> = {};

Object.entries(imageModules).forEach(([path, module]) => {
  // Extract the file name from the path
  const fileName = path.split('/').pop() || '';
  const moduleWithDefault = module as { default: string };
  
  // Store multiple path formats for flexible matching
  imageMap[path] = moduleWithDefault.default;
  imageMap[path.replace('/src', '')] = moduleWithDefault.default;
  imageMap[`/assets/${fileName}`] = moduleWithDefault.default;
  imageMap[`/src/assets/${fileName}`] = moduleWithDefault.default;
  imageMap[fileName] = moduleWithDefault.default;
});

/**
 * Resolves asset paths to Vite URLs
 * @param path - The asset path from JSON or component
 * @returns The resolved Vite URL or placeholder
 */
export const resolveAsset = (path: string | undefined | null): string => {
  if (!path) return '/placeholder.svg';
  
  // Return absolute URLs as-is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Return public folder paths as-is
  if (path.startsWith('/public/')) {
    return path.replace('/public', '');
  }
  
  // Try to find the image in our map
  const resolved = imageMap[path];
  if (resolved) return resolved;
  
  // Try with leading slash removed
  const withoutLeadingSlash = path.startsWith('/') ? path.substring(1) : path;
  if (imageMap[withoutLeadingSlash]) return imageMap[withoutLeadingSlash];
  
  // Try just the filename
  const filename = path.split('/').pop() || '';
  if (imageMap[filename]) return imageMap[filename];
  
  // Fallback to placeholder
  console.warn(`Asset not found: ${path}`);
  return '/placeholder.svg';
};

/**
 * Batch resolve multiple assets
 */
export const resolveAssets = (paths: (string | undefined | null)[]): string[] => {
  return paths.map(resolveAsset);
};

/**
 * Legacy alias for backwards compatibility
 */
export const resolveAssetPath = resolveAsset;
