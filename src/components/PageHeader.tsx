import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Breadcrumb {
  label: string;
  href?: string;
}

interface Stat {
  value: string;
  label: string;
}

interface CTA {
  label: string;
  href: string;
  variant?: "default" | "secondary" | "outline";
}

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  variant?: "standard" | "with-cta" | "with-stats" | "minimal";
  cta?: CTA;
  stats?: Stat[];
  className?: string;
}

const PageHeader = ({
  eyebrow,
  title,
  description,
  breadcrumbs,
  variant = "standard",
  cta,
  stats,
  className
}: PageHeaderProps) => {
  const location = useLocation();

  // Auto-generate breadcrumbs if not provided
  const finalBreadcrumbs = breadcrumbs || [
    { label: "Home", href: "/" },
    { label: title }
  ];

  return (
    <section className={cn("pt-24 pb-16 bg-background", className)}>
      <div className="container mx-auto px-6 sm:px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <nav aria-label="breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              {finalBreadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center gap-2">
                  {crumb.href ? (
                    <Link 
                      to={crumb.href} 
                      className="hover:text-foreground transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center -m-2 p-2"
                      aria-label={`Navigate to ${crumb.label}`}
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-foreground font-medium min-h-[44px] flex items-center">{crumb.label}</span>
                  )}
                  {index < finalBreadcrumbs.length - 1 && (
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {/* Header Content */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              {/* Eyebrow */}
              {eyebrow && (
                <div className="text-sm uppercase tracking-wider text-muted-foreground mb-2 font-semibold">
                  {eyebrow}
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                {title}
              </h1>

              {/* Accent Line */}
              <div className="w-16 h-1 bg-primary mb-6" aria-hidden="true" />

              {/* Description */}
              {description && (
                <p className="text-lg text-muted-foreground max-w-2xl">
                  {description}
                </p>
              )}

              {/* Stats (inline with description on with-stats variant) */}
              {variant === "with-stats" && stats && (
                <div className="flex flex-wrap gap-8 mt-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl md:text-4xl font-bold text-primary">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CTA Button (right-aligned on with-cta variant) */}
            {variant === "with-cta" && cta && (
              <div className="md:pt-12">
                <Button 
                  size="lg" 
                  variant={cta.variant || "default"} 
                  asChild
                  className="w-full md:w-auto"
                >
                  <Link to={cta.href}>
                    {cta.label}
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
