import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        // Gradient variants with solid backgrounds
        primary: "border-0 bg-gradient-to-br from-[hsl(var(--brand-primary))] to-[hsl(210_100%_30%)] text-white shadow-md hover:shadow-lg hover:scale-105",
        success: "border-0 bg-gradient-to-br from-[hsl(142_76%_36%)] to-[hsl(142_76%_30%)] text-white shadow-md hover:shadow-[0_0_12px_rgba(16,185,129,0.4)] hover:scale-105",
        warning: "border-0 bg-gradient-to-br from-[hsl(38_92%_50%)] to-[hsl(38_92%_45%)] text-white shadow-md hover:shadow-[0_0_12px_rgba(245,158,11,0.4)] hover:scale-105",
        info: "border-0 bg-gradient-to-br from-[hsl(217_91%_60%)] to-[hsl(217_91%_55%)] text-white shadow-md hover:shadow-[0_0_12px_rgba(59,130,246,0.4)] hover:scale-105",
        danger: "border-0 bg-gradient-to-br from-[hsl(0_84%_60%)] to-[hsl(0_84%_55%)] text-white shadow-md hover:shadow-[0_0_12px_rgba(239,68,68,0.4)] hover:scale-105",
        
        // Glass morphism effect
        glass: "border border-white/20 bg-white/10 backdrop-blur-md text-white shadow-lg hover:bg-white/20 hover:scale-105",
        
        // Outline with gradient border
        "outline-gradient": "border-2 border-transparent bg-gradient-to-br from-[hsl(var(--brand-primary))] to-[hsl(var(--brand-accent))] bg-clip-border bg-origin-border text-[hsl(var(--brand-primary))] hover:shadow-md hover:scale-105 [background-clip:padding-box,border-box] [background-origin:padding-box,border-box] relative before:absolute before:inset-0 before:bg-white before:rounded-[inherit] before:-z-10",
        
        // Status indicators with dots
        "status-active": "border-0 bg-gradient-to-br from-[hsl(142_76%_36%)] to-[hsl(142_76%_30%)] text-white shadow-md hover:scale-105 animate-pulse",
        "status-pending": "border-0 bg-gradient-to-br from-[hsl(38_92%_50%)] to-[hsl(38_92%_45%)] text-white shadow-md hover:scale-105",
        "status-inactive": "border-0 bg-gradient-to-br from-[hsl(215_16%_47%)] to-[hsl(215_16%_40%)] text-white shadow-md hover:scale-105",
        
        // Legacy compatibility
        default: "border-0 bg-gradient-to-br from-[hsl(var(--brand-primary))] to-[hsl(210_100%_30%)] text-white shadow-md hover:scale-105",
        secondary: "border-0 bg-gradient-to-br from-[hsl(var(--bg-soft))] to-[hsl(210_40%_95%)] text-[hsl(var(--brand-primary))] shadow-sm hover:scale-105",
        destructive: "border-0 bg-gradient-to-br from-[hsl(0_84%_60%)] to-[hsl(0_84%_55%)] text-white shadow-md hover:scale-105",
        outline: "border-2 border-[hsl(var(--line))] bg-transparent text-[hsl(var(--ink))] hover:bg-[hsl(var(--bg-soft))] hover:scale-105",
        
        // Additional status variants
        new: "border-0 bg-gradient-to-br from-[hsl(var(--brand-accent))] to-[hsl(25_95%_45%)] text-white shadow-md hover:scale-105",
        contacted: "border-0 bg-gradient-to-br from-[hsl(217_91%_60%)] to-[hsl(217_91%_55%)] text-white shadow-md hover:scale-105",
        resolved: "border-0 bg-gradient-to-br from-[hsl(142_76%_36%)] to-[hsl(142_76%_30%)] text-white shadow-md hover:scale-105",
        completed: "border-0 bg-gradient-to-br from-[hsl(142_76%_36%)] to-[hsl(142_76%_30%)] text-white shadow-md hover:scale-105",
        active: "border-0 bg-gradient-to-br from-[hsl(142_76%_36%)] to-[hsl(142_76%_30%)] text-white shadow-md hover:scale-105",
        inactive: "border-0 bg-gradient-to-br from-[hsl(215_16%_47%)] to-[hsl(215_16%_40%)] text-white/90 shadow-sm hover:scale-105",
      },
      size: {
        xs: "text-[10px] px-2 py-0.5 gap-1 rounded-full",
        sm: "text-xs px-2.5 py-1 gap-1.5 rounded-full",
        md: "text-sm px-3 py-1.5 gap-2 rounded-full",
        lg: "text-base px-4 py-2 gap-2 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  icon?: LucideIcon;
  showDot?: boolean;
}

function Badge({ className, variant, size, icon: Icon, showDot, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {showDot && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
