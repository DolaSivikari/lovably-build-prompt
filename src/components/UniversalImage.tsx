import { useMemo } from 'react';
import OptimizedImage from './OptimizedImage';
import { resolveAssetPath } from '@/utils/assetResolver';

interface UniversalImageProps {
  src: string | null | undefined;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

/**
 * UniversalImage - Unified image component that handles multiple source types
 * 
 * Resolves images from:
 * 1. Full URLs (Supabase Storage, external CDNs)
 * 2. Local assets via Vite's import system (src/assets/*)
 * 3. Public folder assets (/public/*)
 * 4. Fallback to placeholder on error
 * 
 * @example
 * <UniversalImage 
 *   src="blog-exterior-painting.jpg" 
 *   alt="Exterior painting project"
 *   width={800}
 *   height={600}
 * />
 */
export const UniversalImage = ({ 
  src, 
  alt, 
  width = 800, 
  height = 600,
  priority = false,
  sizes = '100vw',
  className,
  objectFit = 'cover'
}: UniversalImageProps) => {
  const resolvedSrc = useMemo(() => {
    if (!src) return '/placeholder.svg';
    
    // 1. Return if already full URL (Supabase Storage, external CDN)
    if (src.startsWith('http://') || src.startsWith('https://')) {
      return src;
    }
    
    // 2. Return if absolute path to public folder
    if (src.startsWith('/')) {
      return src;
    }
    
    // 3. Try local asset resolution via Vite
    const localAsset = resolveAssetPath(src);
    if (localAsset && localAsset !== '/placeholder.svg') {
      return localAsset;
    }
    
    // 4. Fallback to placeholder
    console.warn(`[UniversalImage] Could not resolve image: ${src}`);
    return '/placeholder.svg';
  }, [src]);

  return (
    <OptimizedImage
      src={resolvedSrc}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes}
      className={className}
      objectFit={objectFit}
    />
  );
};

export default UniversalImage;
