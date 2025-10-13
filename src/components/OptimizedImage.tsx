import { useImageLoad } from "@/hooks/useImageLoad";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  srcset?: string;
  srcAvif?: string;
  srcsetAvif?: string;
  srcWebp?: string;
  srcsetWebp?: string;
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
  srcset,
  srcAvif,
  srcsetAvif,
  srcWebp,
  srcsetWebp,
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
      {shouldLoad && (srcAvif || srcWebp || srcsetAvif || srcsetWebp) ? (
        <picture>
          {(srcAvif || srcsetAvif) && (
            <source
              type="image/avif"
              srcSet={srcsetAvif || srcAvif}
              sizes={sizes}
            />
          )}
          {(srcWebp || srcsetWebp) && (
            <source
              type="image/webp"
              srcSet={srcsetWebp || srcWebp}
              sizes={sizes}
            />
          )}
          <img
            ref={imageRef}
            src={src}
            srcSet={srcset}
            alt={alt}
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
        </picture>
      ) : (
        <img
          ref={imageRef}
          src={shouldLoad ? src : undefined}
          srcSet={shouldLoad ? srcset : undefined}
          alt={alt}
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
