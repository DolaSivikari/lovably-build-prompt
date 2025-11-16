import { ReactNode } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/ui/Button";
import { ChevronDown, X } from "lucide-react";
import { Section } from "@/data/navigation-structure-enhanced";
import { ServiceCard } from "./ServiceCard";
import { cn } from "@/lib/utils";

interface DrawerNavigationMenuProps {
  trigger: string;
  sections: Section[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  isActive?: boolean;
}

export const DrawerNavigationMenu = ({
  trigger,
  sections,
  open,
  onOpenChange,
  isActive,
}: DrawerNavigationMenuProps) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "text-sm font-medium flex items-center gap-1 hover:text-accent transition-colors",
            isActive && "text-accent"
          )}
        >
          {trigger}
          <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh] bg-background/95 backdrop-blur-xl border-t border-border/50">
        <DrawerHeader className="border-b border-border/50 bg-background/50">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div>
              <DrawerTitle className="text-2xl font-bold text-foreground">
                {trigger}
              </DrawerTitle>
              <DrawerDescription className="text-muted-foreground">
                Explore our {trigger.toLowerCase()} and capabilities
              </DrawerDescription>
            </div>
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-accent/10 hover:text-accent"
              >
                <X className="w-5 h-5" />
                <span className="sr-only">Close</span>
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="overflow-y-auto px-4 py-8">
          <div className="max-w-7xl mx-auto space-y-12">
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-8">
                {section.categories.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="space-y-4">
                    {/* Category Header */}
                    <div className="flex items-center gap-3">
                      <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent" />
                      <div className="space-y-1">
                        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                          {category.title}
                        </h3>
                        {category.description && (
                          <p className="text-xs text-muted-foreground max-w-2xl">
                            {category.description}
                          </p>
                        )}
                      </div>
                      <div className="h-px flex-1 bg-gradient-to-l from-accent/50 to-transparent" />
                    </div>

                    {/* Service Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {category.subItems.map((item, itemIndex) => (
                        <ServiceCard
                          key={itemIndex}
                          name={item.name}
                          link={item.link}
                          description={item.description}
                          badge={item.badge}
                          onLinkClick={() => onOpenChange?.(false)}
                          variant="large"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
