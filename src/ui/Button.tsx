import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: React.ElementType;
  asChild?: boolean;
  variant?: Variant;
  size?: Size;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ as: Tag = "button", asChild = false, variant = "primary", size = "md", className, children, ...props }, ref) => {
    const Comp = asChild ? Slot : Tag;
    
    const variants = {
      primary: "bg-[hsl(var(--brand-primary))] text-white hover:opacity-90",
      secondary: "border-2 border-[hsl(var(--brand-primary))] text-[hsl(var(--brand-primary))] hover:bg-[hsl(var(--bg-soft))]",
      ghost: "text-[hsl(var(--brand-primary))] hover:bg-[hsl(var(--bg-soft))]",
      danger: "bg-[hsl(var(--danger))] text-white hover:opacity-90"
    };

    const sizes = {
      sm: "px-3 py-2 text-sm rounded-[var(--radius-xs)] min-h-[40px]",
      md: "px-4 py-2.5 text-sm rounded-[var(--radius-sm)] min-h-[44px]",
      lg: "px-5 py-3 text-base rounded-[var(--radius-md)] min-h-[48px]"
    };

    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-300",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";
