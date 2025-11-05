import * as React from "react";
import { cn } from "@/lib/utils";

interface EnhancedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverScale?: boolean;
  hoverLift?: boolean;
}

const EnhancedCard = React.forwardRef<HTMLDivElement, EnhancedCardProps>(
  ({ className, hoverScale = false, hoverLift = true, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300",
        hoverLift && "hover:-translate-y-2 hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)]",
        hoverScale && "hover:scale-[1.02]",
        className
      )}
      {...props}
    />
  )
);
EnhancedCard.displayName = "EnhancedCard";

export { EnhancedCard };
