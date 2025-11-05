import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Service {
  id: string;
  slug: string;
  name: string;
  short_description: string | null;
  category: string | null;
}

interface DynamicServicesMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DynamicServicesMegaMenu = ({ isOpen, onClose }: DynamicServicesMegaMenuProps) => {
  const [services, setServices] = useState<Service[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await supabase
        .from('services')
        .select('id, slug, name, short_description, category')
        .eq('publish_state', 'published')
        .order('name');
      
      if (data) setServices(data);
    };

    if (isOpen) {
      fetchServices();
    }
  }, [isOpen]);

  // Group services by category
  const categories = {
    'Construction Services': services.filter(s => s.category === 'Painting Services'),
    'Exterior Systems': services.filter(s => s.category === 'Exterior Systems'),
    'Construction Management': services.filter(s => s.category === 'Construction Management'),
    'Specialty Services': services.filter(s => 
      !['Painting Services', 'Exterior Systems', 'Construction Management'].includes(s.category || '')
    ),
  };

  const categoryDescriptions = {
    'Construction Services': 'Professional construction and finishing for all property types',
    'Exterior Systems': 'Comprehensive building envelope solutions and restoration',
    'Construction Management': 'End-to-end project management and coordination',
    'Specialty Services': 'Specialized construction and restoration services',
  };

  if (!isOpen) return null;

  return (
    <div 
      className="absolute left-0 top-full mt-0 w-[600px] bg-background border border-border rounded-lg shadow-[0_10px_40px_-10px_hsl(var(--charcoal)_/_0.2)] z-mega-menu animate-enter"
      onMouseEnter={() => {}}
      onMouseLeave={onClose}
    >
      <div className="p-4">
        <div className="mb-3">
          <Link
            to="/services"
            onClick={onClose}
            className="text-base font-bold text-primary hover:text-sage transition-colors"
          >
            View All Services →
          </Link>
        </div>

        <div className="space-y-2">
          {Object.entries(categories).map(([categoryName, categoryServices]) => {
            if (categoryServices.length === 0) return null;
            
            const isExpanded = expandedCategory === categoryName;

            return (
              <div key={categoryName} className="border border-border rounded-md overflow-hidden">
                <button
                  className={cn(
                    "w-full px-4 py-3 flex items-center justify-between bg-muted/30 hover:bg-muted/50 transition-colors",
                    isExpanded && "bg-muted/50"
                  )}
                  onClick={() => setExpandedCategory(isExpanded ? null : categoryName)}
                  aria-expanded={isExpanded}
                >
                  <div className="text-left">
                    <div className="text-sm font-semibold text-foreground">{categoryName}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {categoryDescriptions[categoryName as keyof typeof categoryDescriptions]}
                    </div>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-muted-foreground transition-transform flex-shrink-0",
                      isExpanded && "rotate-180"
                    )}
                  />
                </button>

                {isExpanded && (
                  <div className="bg-background border-t border-border">
                    <ul className="py-2">
                      {categoryServices.map((service) => (
                        <li key={service.id}>
                          <Link
                            to={`/services/${service.slug}`}
                            onClick={onClose}
                            className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted/30 transition-all"
                          >
                            <div className="font-medium">{service.name}</div>
                            {service.short_description && (
                              <div className="text-xs text-muted-foreground mt-0.5">
                                {service.short_description}
                              </div>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
