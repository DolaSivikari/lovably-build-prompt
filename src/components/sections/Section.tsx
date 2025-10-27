import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  size?: "major" | "subsection";
  className?: string;
  background?: "default" | "muted";
}

/**
 * Consistent section wrapper with standardized spacing
 * - major: py-20 (main page sections)
 * - subsection: py-16 (nested content areas)
 */
export const Section = ({ 
  children, 
  size = "major", 
  className,
  background = "default"
}: SectionProps) => {
  return (
    <section 
      className={cn(
        "w-full",
        size === "major" ? "py-12 sm:py-16 lg:py-20" : "py-10 sm:py-12 lg:py-16",
        background === "muted" && "bg-muted/30",
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6">
        {children}
      </div>
    </section>
  );
};
