import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  (props, ref) => {
    return (
      <textarea
        ref={ref}
        {...props}
        className={cn(
          "w-full rounded-[var(--radius-sm)] border border-[hsl(var(--line))] bg-white px-4 py-2.5 text-sm min-h-[120px]",
          "text-[hsl(var(--ink))] placeholder:text-[hsl(var(--muted))]",
          "focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-primary))] focus:border-transparent",
          "disabled:cursor-not-allowed disabled:opacity-50",
          props.className
        )}
      />
    );
  }
);

Textarea.displayName = "Textarea";
