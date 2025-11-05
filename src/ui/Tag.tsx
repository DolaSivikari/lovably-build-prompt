import { cn } from "@/lib/utils";

interface TagProps {
  intent?: "default" | "success" | "warning" | "info";
  children: React.ReactNode;
  className?: string;
}

export function Tag({ intent = "default", children, className }: TagProps) {
  const intents = {
    default: "bg-[hsl(var(--bg-soft))] text-[hsl(var(--ink))]",
    success: "bg-[hsl(142,71%,94%)] text-[hsl(var(--success))]",
    warning: "bg-[hsl(38,100%,95%)] text-[hsl(var(--warning))]",
    info: "bg-[hsl(217,91%,95%)] text-[hsl(var(--info))]"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        intents[intent],
        className
      )}
    >
      {children}
    </span>
  );
}
