import { Link } from "react-router-dom";
import { Section } from "@/data/navigation-structure-enhanced";
import { MegaMenuAccordionCategory } from "./MegaMenuAccordionCategory";

interface MegaMenuSectionProps {
  section: Section;
  expandedCategories: string[];
  onToggleCategory: (categoryTitle: string) => void;
  onLinkClick: () => void;
}

export const MegaMenuSection = ({
  section,
  expandedCategories,
  onToggleCategory,
  onLinkClick,
}: MegaMenuSectionProps) => {
  return (
    <div className="mega-menu-section">
      {section.sectionLink ? (
        <Link
          to={section.sectionLink}
          className="mega-menu-section-header-link"
          onClick={onLinkClick}
        >
          {section.sectionTitle}
        </Link>
      ) : (
        <h3 className="mega-menu-section-header">{section.sectionTitle}</h3>
      )}
      
      <div className="mega-menu-section-categories">
        {section.categories.map((category, index) => (
          <MegaMenuAccordionCategory
            key={index}
            category={category}
            isExpanded={expandedCategories.includes(category.title)}
            onToggle={() => onToggleCategory(category.title)}
            onLinkClick={onLinkClick}
          />
        ))}
      </div>
    </div>
  );
};
