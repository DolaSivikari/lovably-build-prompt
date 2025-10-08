import { useState, useRef, useEffect } from "react";
import { Section } from "@/data/navigation-structure-enhanced";
import { MegaMenuSection } from "./MegaMenuSection";
import { cn } from "@/lib/utils";

interface MegaMenuWithSectionsProps {
  sections: Section[];
  isOpen: boolean;
  onClose: () => void;
}

export const MegaMenuWithSections = ({
  sections,
  isOpen,
  onClose,
}: MegaMenuWithSectionsProps) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Expand first category of first section by default
      if (sections.length > 0 && sections[0].categories.length > 0) {
        setExpandedCategories([sections[0].categories[0].title]);
      }
    } else {
      setExpandedCategories([]);
    }
  }, [isOpen, sections]);

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

  const handleToggleCategory = (categoryTitle: string) => {
    setExpandedCategories((prev) => {
      if (prev.includes(categoryTitle)) {
        return prev.filter((title) => title !== categoryTitle);
      } else {
        // Allow multiple expanded categories
        return [...prev, categoryTitle];
      }
    });
  };

  if (!sections || sections.length === 0) return null;

  return (
    <div
      ref={menuRef}
      className={cn("mega-menu-sections", isOpen && "mega-menu-sections--open")}
      aria-hidden={!isOpen}
    >
      <div className="mega-menu-sections-wrapper">
        {sections.map((section, index) => (
          <MegaMenuSection
            key={index}
            section={section}
            expandedCategories={expandedCategories}
            onToggleCategory={handleToggleCategory}
            onLinkClick={onClose}
          />
        ))}
      </div>
    </div>
  );
};
