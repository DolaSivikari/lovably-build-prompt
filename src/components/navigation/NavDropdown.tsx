import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface NavLink {
  label: string;
  href?: string;
  badge?: string;
  items?: NavLink[];
}

interface NavDropdownProps {
  label: string;
  items: NavLink[];
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClose: () => void;
}

export const NavDropdown = ({
  label,
  items,
  isOpen,
  onMouseEnter,
  onMouseLeave,
  onClose,
}: NavDropdownProps) => {
  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        className={cn(
          "px-2 py-2 text-sm font-medium transition-colors hover:text-primary inline-flex items-center gap-1",
          isOpen && "text-primary"
        )}
        aria-expanded={isOpen}
      >
        {label}
        <ChevronDown className={cn(
          "w-4 h-4 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 min-w-[240px] bg-background border border-border rounded-lg shadow-lg py-2 z-mega-menu animate-in fade-in-0 zoom-in-95 slide-in-from-top-2">
          {items.map((item, index) => {
            if (item.items) {
              return (
                <div key={index} className="px-2 py-2">
                  <div className="text-xs font-semibold text-muted-foreground px-3 py-1 uppercase tracking-wider">
                    {item.label}
                  </div>
                  <div className="space-y-1">
                    {item.items.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.href || "#"}
                        onClick={onClose}
                        className="flex items-center justify-between px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors"
                      >
                        <span>{subItem.label}</span>
                        {subItem.badge && (
                          <Badge variant="secondary" className="text-xs ml-2">
                            {subItem.badge}
                          </Badge>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            } else {
              return (
                <Link
                  key={index}
                  to={item.href || "#"}
                  onClick={onClose}
                  className="flex items-center justify-between px-4 py-2 text-sm hover:bg-muted transition-colors"
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs ml-2">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};
