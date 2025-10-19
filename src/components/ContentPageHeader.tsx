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
    <section className={cn("relative h-[60vh] min-h-[500px]", className)}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center container mx-auto px-4">
        <div className="max-w-4xl">
          {/* Breadcrumbs */}
          <nav aria-label="breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-white/80">
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {title}
          </h1>

          {/* Accent Line */}
          <div className="w-16 h-1 bg-secondary mb-6" aria-hidden="true" />

          {/* Subtitle */}
          {subtitle && (
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContentPageHeader;
