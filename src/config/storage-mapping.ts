/**
 * Storage bucket configuration and URL generation
 * Maps logical storage locations to Supabase bucket names
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export const STORAGE_CONFIG = {
  buckets: {
    projectImages: 'project-images',
    documents: 'documents',
    drawings: 'drawings',
  },
  
  /**
   * Generate public URL for a file in a bucket
   */
  getPublicUrl: (bucket: string, path: string): string => {
    if (!path) return '';
    // If already a full URL, return as-is
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;
  },
  
  /**
   * Extract filename from path
   */
  getFilename: (path: string): string => {
    return path.split('/').pop() || path;
  },
  
  /**
   * Generate storage path with timestamp to avoid collisions
   */
  generatePath: (filename: string, folder?: string): string => {
    const timestamp = Date.now();
    const sanitized = filename.replace(/[^a-zA-Z0-9.-]/g, '_');
    return folder ? `${folder}/${timestamp}-${sanitized}` : `${timestamp}-${sanitized}`;
  }
};
