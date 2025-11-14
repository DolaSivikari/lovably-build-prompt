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
      // Tablet: 2 columns with tighter spacing
      "md:grid md:grid-cols-2 md:gap-3",
      // Desktop: 4 columns with tighter spacing
      "lg:grid-cols-4 lg:gap-4",
      className
    )}>
      {/* Mobile scroll container */}
      <div className="flex gap-2 pb-2 md:hidden" style={{ width: 'max-content' }}>
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
        "group relative overflow-hidden flex flex-col gap-1.5",
        "bg-white/5 backdrop-blur-xl border border-white/10",
        "rounded-xl hover:border-white/30",
        "transition-all duration-500 ease-out",
        "hover:shadow-2xl hover:shadow-primary/20",
        "hover:-translate-y-2 hover:scale-[1.02]",
        // Mobile sizing
        isMobile && "min-w-[200px] snap-start p-3",
        // Desktop sizing  
        !isMobile && "p-3",
        className
      )}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Glassmorphism gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Badge with glow effect */}
      {item.badge && (
        <div className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg shadow-primary/50 animate-pulse">
          {item.badge}
        </div>
      )}

      {/* Icon & Number - Compact */}
      <div className="relative flex items-center gap-2 mb-1">
        {Icon && (
          <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-300">
            <Icon className="w-3.5 h-3.5 text-primary group-hover:scale-110 transition-transform duration-300" />
          </div>
        )}
        <span className="text-xl font-black bg-gradient-to-br from-primary/40 to-primary/20 bg-clip-text text-transparent group-hover:from-primary/60 group-hover:to-primary/40 transition-all duration-300">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Content - More compact */}
      <div className="relative flex-1 space-y-0.5">
        <h3 className="font-bold text-xs leading-tight text-white/90 group-hover:text-white transition-colors line-clamp-1">
          {item.title}
        </h3>
        <p className="text-[10px] leading-snug text-white/60 group-hover:text-white/80 transition-colors line-clamp-2">
          {item.description}
        </p>
      </div>

      {/* Minimal arrow indicator */}
      <div className="relative flex items-center justify-end mt-1">
        <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:translate-x-1 transition-all duration-300">
          <svg className="w-2.5 h-2.5 text-white/60 group-hover:text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
