import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroNavigationCard {
  id: string;
  title: string;
  description: string;
  icon?: LucideIcon;
  url: string;
  badge?: string;
  display_order: number;
}

interface HeroNavigationCardsProps {
  items: HeroNavigationCard[];
  className?: string;
}

export default function HeroNavigationCards({ items, className }: HeroNavigationCardsProps) {
  return (
    <div className={cn(
      "w-full",
      // Mobile: horizontal scroll
      "overflow-x-auto md:overflow-visible",
      "scrollbar-hide snap-x snap-mandatory",
      // Tablet: 2 columns
      "md:grid md:grid-cols-2 md:gap-4",
      // Desktop: 4 columns
      "lg:grid-cols-4 lg:gap-6",
      className
    )}>
      {/* Mobile scroll container */}
      <div className="flex gap-3 pb-2 md:hidden" style={{ width: 'max-content' }}>
        {items.map((item, index) => (
          <CardContent key={item.id} item={item} index={index} isMobile />
        ))}
      </div>

      {/* Desktop/Tablet grid items */}
      {items.map((item, index) => (
        <CardContent key={`desktop-${item.id}`} item={item} index={index} className="hidden md:block" />
      ))}
    </div>
  );
}

interface CardContentProps {
  item: HeroNavigationCard;
  index: number;
  isMobile?: boolean;
  className?: string;
}

function CardContent({ item, index, isMobile, className }: CardContentProps) {
  const Icon = item.icon;

  return (
    <Link
      to={item.url}
      className={cn(
        "group relative flex flex-col gap-2",
        "bg-background/90 backdrop-blur-md",
        "border-2 border-white/20 rounded-xl",
        "hover:border-primary/50 hover:bg-background/98",
        "transition-all duration-300",
        "hover:shadow-lg hover:-translate-y-1",
        // Mobile sizing
        isMobile && "min-w-[240px] snap-start p-3",
        // Desktop sizing
        !isMobile && "p-4",
        className
      )}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Badge */}
      {item.badge && (
        <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full shadow-lg">
          {item.badge}
        </div>
      )}

      {/* Icon & Number */}
      <div className="flex items-center gap-2">
        {Icon && (
          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Icon className="w-4 h-4 text-primary" />
          </div>
        )}
        <span className="text-2xl font-bold text-primary/30 group-hover:text-primary/50 transition-colors">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-1">
        <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {item.title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {item.description}
        </p>
      </div>

      {/* Arrow indicator */}
      <div className="flex items-center justify-end">
        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:translate-x-1 transition-all">
          <svg className="w-3 h-3 text-primary group-hover:text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
