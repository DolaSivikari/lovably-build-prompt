import { cn } from "@/lib/utils";

interface OptimizedPictureProps {
  src: string;
  srcAvif?: string;
  srcWebp?: string;
  srcset?: string;
  srcsetAvif?: string;
  srcsetWebp?: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  className?: string;
  imgClassName?: string;
}

/**
 * OptimizedPicture - Modern responsive picture element with AVIF/WebP support
 * 
 * Use this for all images to maximize performance with modern formats and responsive sizing.
 * 
 * @example
 * <OptimizedPicture
 *   src="/images/project-800.jpg"
 *   srcsetAvif="/images/project-400.avif 400w, /images/project-800.avif 800w"
 *   srcsetWebp="/images/project-400.webp 400w, /images/project-800.webp 800w"
 *   alt="Project showcase"
 *   width={800}
 *   height={600}
 *   sizes="(max-width: 768px) 100vw, 800px"
 *   loading="lazy"
 * />
 */
const OptimizedPicture = ({
  src,
  srcAvif,
  srcWebp,
  srcset,
  srcsetAvif,
  srcsetWebp,
  alt,
  width,
  height,
  sizes = "100vw",
  loading = "lazy",
  fetchPriority = "auto",
  className,
  imgClassName,
}: OptimizedPictureProps) => {
  return (
    <picture className={cn("block", className)}>
      {/* AVIF - smallest file size, best compression */}
      {(srcsetAvif || srcAvif) && (
        <source
          type="image/avif"
          srcSet={srcsetAvif || srcAvif}
          sizes={sizes}
        />
      )}

      {/* WebP - widely supported fallback */}
      {(srcsetWebp || srcWebp) && (
        <source
          type="image/webp"
          srcSet={srcsetWebp || srcWebp}
          sizes={sizes}
        />
      )}

      {/* JPEG/PNG fallback for older browsers */}
      <img
        src={src}
        srcSet={srcset}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={loading}
        decoding={loading === "eager" ? "sync" : "async"}
        fetchPriority={fetchPriority}
        className={cn("w-full h-auto", imgClassName)}
        style={{ aspectRatio: `${width}/${height}` }}
      />
    </picture>
  );
};

export default OptimizedPicture;
