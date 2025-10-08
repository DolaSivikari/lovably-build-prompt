import { useImageLoad } from "@/hooks/useImageLoad";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes = "100vw",
  className,
  objectFit = "cover",
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

      {/* Actual image */}
      <img
        ref={imageRef}
        src={shouldLoad ? src : undefined}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
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
    </div>
  );
};

export default OptimizedImage;
