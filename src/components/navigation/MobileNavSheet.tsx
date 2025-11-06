import { Link, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Search, TrendingUp, Users, Building, Wrench } from "lucide-react";
import { megaMenuDataEnhanced } from "@/data/navigation-structure-enhanced";

interface MobileNavSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileNavSheet({ open, onOpenChange }: MobileNavSheetProps) {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleLinkClick = () => {
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="left" 
        className="w-full sm:max-w-md overflow-y-auto p-0 animate-slide-in-right"
      >
        <SheetHeader className="p-6 pb-4 text-left border-b animate-fade-in">
          <SheetTitle className="text-2xl font-bold">Menu</SheetTitle>
          <SheetDescription className="text-base">
            Explore our services and resources
          </SheetDescription>
        </SheetHeader>

        <div className="px-6 py-4">
          {/* Search Bar - Optimized Touch Target */}
          <div className="mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                placeholder="Search services..."
                className="pl-10 h-12 min-h-[44px] text-base touch-manipulation"
              />
            </div>
          </div>

          {/* Popular Services Quick Links - Optimized Touch Targets */}
          <div className="mb-6 p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-[var(--radius-sm)] border border-primary/10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Popular Services
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/services/commercial-painting"
                onClick={handleLinkClick}
                className="flex items-center gap-2 text-sm py-3 px-3 min-h-[44px] bg-background rounded-[var(--radius-xs)] hover:bg-primary/10 hover:text-primary active:scale-95 transition-all duration-200 touch-manipulation"
              >
                <Building className="h-4 w-4" />
                Commercial
              </Link>
              <Link
                to="/services/residential-painting"
                onClick={handleLinkClick}
                className="flex items-center gap-2 text-sm py-3 px-3 min-h-[44px] bg-background rounded-[var(--radius-xs)] hover:bg-primary/10 hover:text-primary active:scale-95 transition-all duration-200 touch-manipulation"
              >
                <Users className="h-4 w-4" />
                Residential
              </Link>
              <Link
                to="/services/stucco-eifs"
                onClick={handleLinkClick}
                className="flex items-center gap-2 text-sm py-3 px-3 min-h-[44px] bg-background rounded-[var(--radius-xs)] hover:bg-primary/10 hover:text-primary active:scale-95 transition-all duration-200 touch-manipulation"
              >
                <Wrench className="h-4 w-4" />
                Stucco
              </Link>
              <Link
                to="/services/parking-garage"
                onClick={handleLinkClick}
                className="flex items-center gap-2 text-sm py-3 px-3 min-h-[44px] bg-background rounded-[var(--radius-xs)] hover:bg-primary/10 hover:text-primary active:scale-95 transition-all duration-200 touch-manipulation"
              >
                <Building className="h-4 w-4" />
                Restoration
              </Link>
            </div>
          </div>
          {/* Top-level routes - Optimized Touch Targets */}
          <nav className="space-y-1 mb-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link
              to="/"
              onClick={handleLinkClick}
              className={`block py-3 px-4 min-h-[44px] rounded-[var(--radius-xs)] text-base font-medium active:scale-[0.98] transition-all duration-200 touch-manipulation ${
                isActive("/")
                  ? "bg-[hsl(var(--sage))]/20 text-[hsl(var(--sage-dark))]"
                  : "hover:bg-muted"
              }`}
            >
              Home
            </Link>
            <Link
              to="/contact"
              onClick={handleLinkClick}
              className={`block py-3 px-4 min-h-[44px] rounded-[var(--radius-xs)] text-base font-medium active:scale-[0.98] transition-all duration-200 touch-manipulation ${
                isActive("/contact")
                  ? "bg-[hsl(var(--sage))]/20 text-[hsl(var(--sage-dark))]"
                  : "hover:bg-muted"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Accordion sections with staggered animation */}
          <Accordion type="multiple" className="space-y-2 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            {/* Services Section */}
            <AccordionItem value="services" className="border rounded-[var(--radius-xs)]">
              <AccordionTrigger className="px-4 py-3 min-h-[44px] hover:no-underline hover:bg-muted active:bg-muted/70 rounded-[var(--radius-xs)] font-semibold transition-all duration-200 touch-manipulation">
                Services
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                {megaMenuDataEnhanced.services.map((section) => (
                  <div key={section.sectionTitle} className="mb-4">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                      {section.sectionTitle}
                    </h4>
                    <div className="space-y-1">
                      {section.categories.map((category) => (
                        <div key={category.title} className="ml-2">
                          <div className="font-medium text-sm py-1">{category.title}</div>
                          {category.subItems && (
                            <div className="ml-3 space-y-1">
                              {category.subItems.map((item) => (
                                <Link
                                  key={item.link}
                                  to={item.link}
                                  onClick={handleLinkClick}
                                  className="block py-2 px-2 min-h-[44px] flex items-center text-sm text-muted-foreground hover:text-[hsl(var(--sage-dark))] hover:bg-[hsl(var(--sage))]/10 active:scale-[0.98] rounded-[var(--radius-xs)] transition-all duration-200 touch-manipulation"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>

            {/* Markets Section */}
            <AccordionItem value="markets" className="border rounded-[var(--radius-xs)]">
              <AccordionTrigger className="px-4 py-3 min-h-[44px] hover:no-underline hover:bg-muted active:bg-muted/70 rounded-[var(--radius-xs)] font-semibold transition-all duration-200 touch-manipulation">
                Markets
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                {megaMenuDataEnhanced.markets.map((section) => (
                  <div key={section.sectionTitle} className="mb-4">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                      {section.sectionTitle}
                    </h4>
                    <div className="space-y-1">
                      {section.categories.map((category) => (
                        <div key={category.title} className="ml-2">
                          <div className="font-medium text-sm py-1">{category.title}</div>
                          {category.subItems && (
                            <div className="ml-3 space-y-1">
                              {category.subItems.map((item) => (
                                <Link
                                  key={item.link}
                                  to={item.link}
                                  onClick={handleLinkClick}
                                  className="block py-2 text-sm text-muted-foreground hover:text-[hsl(var(--sage-dark))] hover:bg-[hsl(var(--sage))]/10 px-2 rounded transition-colors"
                                >
                                  {item.name}
                                  {item.badge === "new" && <span className="ml-2 text-xs text-blue-500">New</span>}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>

            {/* Projects Section */}
            <AccordionItem value="projects" className="border rounded-[var(--radius-xs)]">
              <AccordionTrigger className="px-4 py-3 min-h-[44px] hover:no-underline hover:bg-muted active:bg-muted/70 rounded-[var(--radius-xs)] font-semibold transition-all duration-200 touch-manipulation">
                Projects
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                {megaMenuDataEnhanced.projects.map((section) => (
                  <div key={section.sectionTitle} className="mb-4">
                    <div className="space-y-1">
                      {section.categories.map((category) => (
                        <div key={category.title} className="ml-2">
                          {category.subItems && (
                            <div className="space-y-1">
                              {category.subItems.map((item) => (
                                <Link
                                  key={item.link}
                                  to={item.link}
                                  onClick={handleLinkClick}
                                  className="block py-2 text-sm text-muted-foreground hover:text-[hsl(var(--sage-dark))] hover:bg-[hsl(var(--sage))]/10 px-2 rounded transition-colors"
                                >
                                  {item.name}
                                  {item.badge === "popular" && <span className="ml-2 text-xs text-secondary">★</span>}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>

            {/* Company Section */}
            <AccordionItem value="company" className="border rounded-[var(--radius-xs)]">
              <AccordionTrigger className="px-4 py-3 min-h-[44px] hover:no-underline hover:bg-muted active:bg-muted/70 rounded-[var(--radius-xs)] font-semibold transition-all duration-200 touch-manipulation">
                Company
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                {megaMenuDataEnhanced.company.map((section) => (
                  <div key={section.sectionTitle} className="mb-4">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                      {section.sectionTitle}
                    </h4>
                    <div className="space-y-1">
                      {section.categories.map((category) => (
                        <div key={category.title} className="ml-2">
                          {category.subItems && (
                            <div className="space-y-1">
                              {category.subItems.map((item) => (
                                <Link
                                  key={item.link}
                                  to={item.link}
                                  onClick={handleLinkClick}
                                  className="block py-2 text-sm text-muted-foreground hover:text-[hsl(var(--sage-dark))] hover:bg-[hsl(var(--sage))]/10 px-2 rounded transition-colors"
                                >
                                  {item.name}
                                  {item.badge === "new" && <span className="ml-2 text-xs text-blue-500">New</span>}
                                  {item.badge === "important" && <span className="ml-2 text-xs text-primary">★</span>}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>

            {/* Resources Section */}
            <AccordionItem value="resources" className="border rounded-[var(--radius-xs)]">
              <AccordionTrigger className="px-4 py-3 min-h-[44px] hover:no-underline hover:bg-muted active:bg-muted/70 rounded-[var(--radius-xs)] font-semibold transition-all duration-200 touch-manipulation">
                Resources
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                {megaMenuDataEnhanced.resources.map((section) => (
                  <div key={section.sectionTitle} className="mb-4">
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">
                      {section.sectionTitle}
                    </h4>
                    <div className="space-y-1">
                      {section.categories.map((category) => (
                        <div key={category.title} className="ml-2">
                          {category.subItems && (
                            <div className="space-y-1">
                              {category.subItems.map((item) => (
                                <Link
                                  key={item.link}
                                  to={item.link}
                                  onClick={handleLinkClick}
                                  className="block py-2 text-sm text-muted-foreground hover:text-[hsl(var(--sage-dark))] hover:bg-[hsl(var(--sage))]/10 px-2 rounded transition-colors"
                                >
                                  {item.name}
                                  {item.badge === "new" && <span className="ml-2 text-xs text-blue-500">New</span>}
                                  {item.badge === "important" && <span className="ml-2 text-xs text-primary">★★</span>}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Pinned CTA at bottom - Enhanced Touch Target */}
        <div className="sticky bottom-0 left-0 right-0 p-6 border-t bg-background backdrop-blur-md animate-fade-in">
          <Button
            asChild
            size="lg"
            className="w-full gap-2 min-h-[48px] text-base active:scale-95 transition-transform duration-200 touch-manipulation"
          >
            <Link to="/estimate" onClick={handleLinkClick}>
              <Phone className="h-5 w-5" />
              Request Proposal
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
