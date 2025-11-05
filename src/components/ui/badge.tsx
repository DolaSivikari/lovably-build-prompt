import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success: "border-transparent bg-[hsl(142_76%_36%)] text-white hover:bg-[hsl(142_76%_30%)]",
        warning: "border-transparent bg-[hsl(38_92%_50%)] text-white hover:bg-[hsl(38_92%_45%)]",
        info: "border-transparent bg-[hsl(217_91%_60%)] text-white hover:bg-[hsl(217_91%_55%)]",
        new: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        contacted: "border-transparent bg-[hsl(217_91%_60%)] text-white hover:bg-[hsl(217_91%_55%)]",
        resolved: "border-transparent bg-[hsl(142_76%_36%)] text-white hover:bg-[hsl(142_76%_30%)]",
        completed: "border-transparent bg-[hsl(142_76%_36%)] text-white hover:bg-[hsl(142_76%_30%)]",
        active: "border-transparent bg-[hsl(142_76%_36%)] text-white hover:bg-[hsl(142_76%_30%)]",
        inactive: "border-transparent bg-muted text-muted-foreground hover:bg-muted/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
