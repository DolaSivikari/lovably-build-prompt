import { cn } from "@/lib/utils";

interface NavBadgeProps {
  variant: "new" | "popular" | "important";
  className?: string;
}

export const NavBadge = ({ variant, className }: NavBadgeProps) => {
  const styles = {
    new: "bg-accent text-accent-foreground",
    popular: "bg-secondary text-secondary-foreground",
    important: "bg-primary text-primary-foreground",
  };

  const labels = {
    new: "New",
    popular: "★",
    important: "★",
  };

  return (
    <span className={cn("ml-2 px-1.5 py-0.5 text-[10px] font-bold rounded uppercase", styles[variant], className)}>
      {labels[variant]}
    </span>
  );
};
