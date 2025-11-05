import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
  variant?: "elevated" | "outlined";
  className?: string;
  children: ReactNode;
}

export function Card({ variant = "elevated", className, children }: CardProps) {
  const base = "rounded-[var(--radius-md)] bg-white p-6";
  const variants = {
    elevated: "shadow-[var(--shadow-md)]",
    outlined: "border border-[hsl(var(--line))]"
  };

  return <div className={cn(base, variants[variant], className)}>{children}</div>;
}
