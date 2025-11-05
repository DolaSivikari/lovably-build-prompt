import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
}

export function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-flex px-2 py-0.5 text-[11px] rounded-md bg-[hsl(var(--bg-soft))] text-[hsl(var(--muted))] font-medium">
      {children}
    </span>
  );
}
