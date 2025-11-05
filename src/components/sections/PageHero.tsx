import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight, ArrowRight } from "lucide-react";

interface PageHeroRootProps {
  children: ReactNode;
  backgroundImage?: string;
  className?: string;
}

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

interface StatItem {
  label: string;
  value: string;
}

interface StatsProps {
  stats: StatItem[];
}

interface CTAsProps {
  primaryText?: string;
  primaryHref?: string;
  secondaryText?: string;
  secondaryHref?: string;
}

const PageHeroRoot = ({ children, backgroundImage, className }: PageHeroRootProps) => {
  return (
    <section className={cn("relative min-h-[520px] md:min-h-[640px] flex items-center overflow-hidden", className)}>
      {backgroundImage && (
        <>
          <div className="absolute inset-0 z-0">
            <img
              src={backgroundImage}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 z-[1] bg-gradient-to-r from-background/90 via-background/70 to-background/50" />
        </>
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          {children}
        </div>
      </div>
    </section>
  );
};

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center gap-2 text-sm text-muted-foreground">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {item.href ? (
              <Link to={item.href} className="hover:text-primary transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium">{item.label}</span>
            )}
            {index < items.length - 1 && (
              <ChevronRight className="w-4 h-4" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

const Title = ({ children }: { children: ReactNode }) => {
  return <h1 className="text-foreground mb-4">{children}</h1>;
};

const Subtitle = ({ children }: { children: ReactNode }) => {
  return <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">{children}</p>;
};

const Stats = ({ stats }: StatsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 mb-8 p-6 bg-background/80 backdrop-blur-sm rounded-lg border border-border">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
            {stat.value}
          </div>
          <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wide">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

const CTAs = ({ primaryText = "Request Proposal", primaryHref = "/contact", secondaryText, secondaryHref }: CTAsProps) => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button asChild size="lg" className="shadow-lg">
        <Link to={primaryHref}>
          {primaryText}
          <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </Button>
      {secondaryText && secondaryHref && (
        <Button asChild variant="outline" size="lg">
          <Link to={secondaryHref}>{secondaryText}</Link>
        </Button>
      )}
    </div>
  );
};

export const PageHero = {
  Root: PageHeroRoot,
  Breadcrumb,
  Title,
  Subtitle,
  Stats,
  CTAs,
};
