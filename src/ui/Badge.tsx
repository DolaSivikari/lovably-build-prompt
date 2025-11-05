import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "secondary" | "outline";
}

export function Badge({ children, className, variant = "default" }: BadgeProps) {
  const variants = {
    default: "bg-[hsl(var(--bg-soft))] text-[hsl(var(--muted))]",
    secondary: "bg-[hsl(var(--bg-soft))] text-[hsl(var(--brand-primary))]",
    outline: "border border-[hsl(var(--line))] bg-transparent text-[hsl(var(--ink))]"
  };

  return (
    <span className={cn(
      "inline-flex px-2 py-0.5 text-[11px] rounded-md font-medium",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}
