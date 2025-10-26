import { Link } from "react-router-dom";
import { NavSection } from "@/data/navigation-structure-new";
import { ChevronRight } from "lucide-react";

interface NavDropdownProps {
  sections: NavSection[];
  isOpen: boolean;
  onClose: () => void;
}

export const NavDropdown = ({ sections, isOpen, onClose }: NavDropdownProps) => {
  if (!isOpen) return null;

  return (
    <div 
      className="absolute top-full left-0 mt-2 bg-background border border-border rounded-lg shadow-xl z-mega-menu animate-fade-in min-w-[280px]"
      onMouseLeave={onClose}
    >
      <div className="p-4">
        {sections.map((section, sectionIndex) => (
          <div key={section.title} className={sectionIndex > 0 ? "mt-6" : ""}>
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.link}>
                  <Link
                    to={item.link}
                    onClick={onClose}
                    className="group flex items-start gap-3 px-3 py-2.5 rounded-md hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-sm group-hover:text-primary transition-colors">
                        {item.name}
                      </div>
                      {item.description && (
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {item.description}
                        </div>
                      )}
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};