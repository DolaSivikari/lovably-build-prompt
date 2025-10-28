import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface ContentPageHeaderProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  breadcrumbs?: Breadcrumb[];
  className?: string;
}

const ContentPageHeader = ({
  title,
  subtitle,
  imageUrl,
  breadcrumbs,
  className
}: ContentPageHeaderProps) => {
  // Auto-generate breadcrumbs if not provided
  const finalBreadcrumbs = breadcrumbs || [
    { label: "Home", href: "/" },
    { label: title }
  ];

  return (
    <section className={cn("relative h-[40vh] sm:h-[50vh] md:h-[60vh] min-h-[350px] sm:min-h-[400px] md:min-h-[500px]", className)}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black/80 sm:from-black/70 sm:via-black/50 sm:to-black/70" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center container mx-auto px-6 sm:px-6">
        <div className="max-w-4xl">
          {/* Breadcrumbs */}
          <nav aria-label="breadcrumb" className="mb-4 sm:mb-6">
            <ol className="flex flex-wrap items-center gap-2 sm:gap-2 text-sm sm:text-sm text-white/80">
              {finalBreadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center gap-2">
                  {crumb.href ? (
                    <Link 
                      to={crumb.href} 
                      className="hover:text-white transition-colors"
                      aria-label={`Navigate to ${crumb.label}`}
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white font-medium">{crumb.label}</span>
                  )}
                  {index < finalBreadcrumbs.length - 1 && (
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 break-words leading-tight">
            {title}
          </h1>

          {/* Accent Line */}
          <div className="w-16 h-1 bg-secondary mb-6" aria-hidden="true" />

          {/* Subtitle */}
          {subtitle && (
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl break-words">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContentPageHeader;
