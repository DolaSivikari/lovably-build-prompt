import { useState, useRef, useEffect } from "react";
import { CategoryItem } from "@/data/navigation-structure";
import { MegaMenuCategory } from "./MegaMenuCategory";
import { MegaMenuDetail } from "./MegaMenuDetail";
import { cn } from "@/lib/utils";

interface MegaMenuProps {
  categories: CategoryItem[];
  isOpen: boolean;
  onClose: () => void;
}

export const MegaMenu = ({ categories, isOpen, onClose }: MegaMenuProps) => {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setActiveCategory(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!categories || categories.length === 0) return null;

  return (
    <div
      ref={menuRef}
      className={cn("mega-menu", isOpen && "mega-menu--open")}
      aria-hidden={!isOpen}
    >
      <div className="mega-menu-wrapper">
        <ul className="mega-menu-main-list">
          {categories.map((category, index) => (
            <MegaMenuCategory
              key={index}
              title={category.title}
              isActive={activeCategory === index}
              onClick={() => setActiveCategory(index)}
            />
          ))}
        </ul>

        <div className="mega-menu-detail-panel">
          <MegaMenuDetail
            category={categories[activeCategory]}
            onLinkClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};
