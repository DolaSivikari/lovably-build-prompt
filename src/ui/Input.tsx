import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={cn(
          "w-full rounded-[var(--radius-sm)] border border-[hsl(var(--line))] bg-white px-4 py-2.5 text-sm min-h-[44px]",
          "text-[hsl(var(--ink))] placeholder:text-[hsl(var(--muted))]",
          "focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-primary))] focus:border-transparent",
          "disabled:cursor-not-allowed disabled:opacity-50",
          props.className
        )}
      />
    );
  }
);

Input.displayName = "Input";
