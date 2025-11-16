import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Section } from "@/data/navigation-structure-enhanced";
import { cn } from "@/lib/utils";

interface SimpleDropdownMenuProps {
  sections: Section[];
  isOpen: boolean;
  onClose: () => void;
}

export const SimpleDropdownMenu = ({
  sections,
  isOpen,
  onClose,
}: SimpleDropdownMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

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

  if (!sections || sections.length === 0) return null;

  return (
    <div
      ref={menuRef}
      className={cn(
        "simple-dropdown",
        isOpen && "simple-dropdown--open"
      )}
      aria-hidden={!isOpen}
    >
      <div className="simple-dropdown-content">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="simple-dropdown-section">
            {section.categories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="simple-dropdown-category">
                {/* Category Header */}
                <div className="simple-dropdown-category-header">
                  {category.title}
                </div>
                
                {/* Category Items */}
                <ul className="simple-dropdown-list">
                  {category.subItems.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <Link
                        to={item.link}
                        className="simple-dropdown-link"
                        onClick={onClose}
                      >
                        <span>{item.name}</span>
                        {item.badge && (
                          <span className={cn(
                            "simple-dropdown-badge",
                            `simple-dropdown-badge--${item.badge}`
                          )}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
