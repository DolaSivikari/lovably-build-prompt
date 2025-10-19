import { useImageLoad } from "@/hooks/useImageLoad";
import { cn } from "@/lib/utils";
import { resolveAssetPath } from "@/utils/assetResolver";

interface OptimizedImageProps {
  src: string;
  srcAvif?: string;
  srcWebp?: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  fetchPriority?: "high" | "low" | "auto";
  loading?: "eager" | "lazy";
}

const OptimizedImage = ({
  src,
  srcAvif,
  srcWebp,
  alt,
  width,
  height,
  priority = false,
  sizes = "100vw",
  className,
  objectFit = "cover",
  fetchPriority = "auto",
  loading,
}: OptimizedImageProps) => {
  const { isLoaded, isInView, imageRef } = useImageLoad({
    rootMargin: "50px",
    threshold: 0.01,
  });

  // For priority images, load immediately
  const shouldLoad = priority || isInView;

  // Resolve asset path and provide fallback
  const resolvedSrc = resolveAssetPath(src) || '/placeholder.svg';
  const hasValidSrc = src && src !== '';

  return (
    <div
      className={cn("relative overflow-hidden bg-muted/20", className)}
      style={{
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : "100%",
      }}
    >
      {/* Placeholder skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-muted/30 via-muted/50 to-muted/30 bg-[length:200%_100%]" />
      )}

      {/* Modern image formats with picture element */}
      {shouldLoad && (srcAvif || srcWebp) ? (
        <picture>
          {srcAvif && (
            <source
              type="image/avif"
              srcSet={srcAvif}
              sizes={sizes}
            />
          )}
          {srcWebp && (
            <source
              type="image/webp"
              srcSet={srcWebp}
              sizes={sizes}
            />
          )}
          <img
            ref={imageRef}
            src={resolvedSrc}
            alt={alt || 'Image'}
            width={width}
            height={height}
            loading={loading || (priority ? "eager" : "lazy")}
            decoding={priority ? "sync" : "async"}
            fetchPriority={fetchPriority}
            className={cn(
              "transition-opacity duration-500",
              isLoaded ? "opacity-100" : "opacity-0",
              `object-${objectFit}`,
              "w-full h-full"
            )}
            style={{
              objectFit,
            }}
          />
        </picture>
      ) : (
        <img
          ref={imageRef}
          src={shouldLoad ? resolvedSrc : undefined}
          alt={alt || 'Image'}
          width={width}
          height={height}
          sizes={sizes}
          loading={loading || (priority ? "eager" : "lazy")}
          decoding={priority ? "sync" : "async"}
          fetchPriority={fetchPriority}
          className={cn(
            "transition-opacity duration-500",
            isLoaded ? "opacity-100" : "opacity-0",
            `object-${objectFit}`,
            "w-full h-full"
          )}
          style={{
            objectFit,
          }}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
