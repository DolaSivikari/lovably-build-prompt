import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
import { NavBadge } from "@/components/ui/nav-badge";
import { NAVIGATION_ICONS } from "@/data/navigation-icons";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  name: string;
  link: string;
  description?: string;
  badge?: "new" | "popular" | "important";
  onLinkClick: () => void;
  variant?: "default" | "large";
}

export const ServiceCard = ({
  name,
  link,
  description,
  badge,
  onLinkClick,
  variant = "default",
}: ServiceCardProps) => {
  const iconName = NAVIGATION_ICONS[link] || "Circle";
  const Icon = (Icons[iconName as keyof typeof Icons] || Icons.Circle) as LucideIcon;

  const isLarge = variant === "large";

  return (
    <Link
      to={link}
      onClick={onLinkClick}
      className={cn(
        "group relative flex flex-col gap-4 p-6 rounded-xl border border-border/60 bg-card hover:bg-accent/5 hover:border-accent/30 transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1",
        isLarge && "p-8"
      )}
    >
      {/* Icon Container with Gradient */}
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "flex-shrink-0 rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center group-hover:from-accent/30 group-hover:to-accent/10 group-hover:scale-110 transition-all duration-300",
            isLarge ? "w-16 h-16" : "w-12 h-12"
          )}
        >
          <Icon className={cn("text-accent", isLarge ? "w-8 h-8" : "w-6 h-6")} />
        </div>
        {badge && <NavBadge variant={badge} />}
      </div>

      {/* Content */}
      <div className="flex-1 space-y-2">
        <h4
          className={cn(
            "font-semibold text-foreground group-hover:text-accent transition-colors duration-300",
            isLarge ? "text-lg" : "text-base"
          )}
        >
          {name}
        </h4>
        {description && (
          <p
            className={cn(
              "text-muted-foreground line-clamp-2",
              isLarge ? "text-sm" : "text-xs"
            )}
          >
            {description}
          </p>
        )}
      </div>

      {/* Hover Arrow Indicator */}
      <div className="flex items-center gap-2 text-xs font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span>View details</span>
        <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>

      {/* Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-accent/50 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-xl" />
    </Link>
  );
};
