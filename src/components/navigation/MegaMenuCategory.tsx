import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MegaMenuCategoryProps {
  title: string;
  isActive: boolean;
  onClick: () => void;
}

export const MegaMenuCategory = ({ title, isActive, onClick }: MegaMenuCategoryProps) => {
  return (
    <li className="mega-menu-category">
      <button
        className={cn(
          "mega-menu-category-btn",
          isActive && "mega-menu-category-btn--active"
        )}
        onClick={onClick}
        aria-current={isActive ? "true" : undefined}
      >
        <span className="mega-menu-category-title">{title}</span>
        <ChevronRight className="mega-menu-category-icon" />
      </button>
    </li>
  );
};
