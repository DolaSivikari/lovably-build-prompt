import { useState, useMemo } from "react";
import { useImageLoad } from "@/hooks/useImageLoad";
import { cn } from "@/lib/utils";
import { addCacheBuster } from "@/utils/cacheBuster";

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
  // Add cache-busting for public assets (not Vite-hashed build assets)
  const bustedSrc = useMemo(() => {
    if (src.startsWith("/") && !src.includes("/assets/")) {
      return addCacheBuster(src);
    }
    return src;
  }, [src]);

  const bustedSrcAvif = useMemo(() => {
    if (srcAvif && srcAvif.startsWith("/") && !srcAvif.includes("/assets/")) {
      return addCacheBuster(srcAvif);
    }
    return srcAvif;
  }, [srcAvif]);

  const bustedSrcWebp = useMemo(() => {
    if (srcWebp && srcWebp.startsWith("/") && !srcWebp.includes("/assets/")) {
      return addCacheBuster(srcWebp);
    }
    return srcWebp;
  }, [srcWebp]);

  const [imgSrc, setImgSrc] = useState(bustedSrc);
  const [hasError, setHasError] = useState(false);
  const { isLoaded, isInView, imageRef } = useImageLoad({
    rootMargin: "50px",
    threshold: 0.01,
  });

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc("/placeholder.svg");
    }
  };

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
      {shouldLoad && (bustedSrcAvif || bustedSrcWebp) ? (
        <picture>
          {bustedSrcAvif && (
            <source type="image/avif" srcSet={bustedSrcAvif} sizes={sizes} />
          )}
          {bustedSrcWebp && (
            <source type="image/webp" srcSet={bustedSrcWebp} sizes={sizes} />
          )}
          <img
            ref={imageRef}
            src={imgSrc}
            alt={alt}
            width={width}
            height={height}
            loading={loading || (priority ? "eager" : "lazy")}
            decoding={priority ? "sync" : "async"}
            fetchPriority={fetchPriority}
            onError={handleError}
            className={cn(
              isLoaded ? "opacity-100" : "opacity-0",
              `object-${objectFit}`,
              "w-full h-full",
            )}
            style={{
              objectFit,
              transition: "var(--transition-slow)",
            }}
          />
        </picture>
      ) : (
        <img
          ref={imageRef}
          src={shouldLoad ? imgSrc : undefined}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          loading={loading || (priority ? "eager" : "lazy")}
          decoding={priority ? "sync" : "async"}
          fetchPriority={fetchPriority}
          onError={handleError}
          className={cn(
            isLoaded ? "opacity-100" : "opacity-0",
            `object-${objectFit}`,
            "w-full h-full",
          )}
          style={{
            objectFit,
            transition: "var(--transition-slow)",
          }}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
