import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Select = forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  (props, ref) => {
    return (
      <select
        ref={ref}
        {...props}
        className={cn(
          "w-full rounded-[var(--radius-sm)] border border-[hsl(var(--line))] bg-white px-4 py-2.5 text-sm min-h-[44px]",
          "text-[hsl(var(--ink))]",
          "focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-primary))] focus:border-transparent",
          "disabled:cursor-not-allowed disabled:opacity-50",
          props.className
        )}
      />
    );
  }
);

Select.displayName = "Select";
