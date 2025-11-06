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
import { Phone, Search, TrendingUp, Users, Building, Wrench, Sparkles, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
          <Accordion type="multiple" className="space-y-3 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            {/* Services Section */}
            <AccordionItem value="services" className="border rounded-[var(--radius-sm)] bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 overflow-hidden">
              <AccordionTrigger className="px-4 py-3 min-h-[44px] hover:no-underline hover:bg-muted/50 active:bg-muted/70 rounded-[var(--radius-sm)] font-semibold transition-all duration-200 touch-manipulation">
                <div className="flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-primary" />
                  Services
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2">
                {megaMenuDataEnhanced.services.map((section, sectionIndex) => (
                  <div key={section.sectionTitle} className="mb-3">
                    {sectionIndex > 0 && <Separator className="my-3" />}
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2 px-2">
                      {section.sectionTitle}
                    </h4>
                    <div className="space-y-1">
                      {section.categories.map((category) => (
                        <div key={category.title} className="ml-1">
                          <div className="font-semibold text-sm py-1.5 px-2 text-foreground/90">{category.title}</div>
                          {category.subItems && (
                            <div className="ml-2 space-y-0.5">
                              {category.subItems.map((item) => (
                                <Link
                                  key={item.link}
                                  to={item.link}
                                  onClick={handleLinkClick}
                                  className="group flex items-center justify-between py-2.5 px-3 min-h-[44px] text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 active:scale-[0.98] rounded-[var(--radius-xs)] transition-all duration-200 touch-manipulation"
                                >
                                  <span className="group-hover:translate-x-0.5 transition-transform">{item.name}</span>
                                  {item.badge && (
                                    <Badge variant={item.badge === "new" ? "secondary" : "default"} size="xs" className="ml-2">
                                      {item.badge === "new" ? <Sparkles className="h-3 w-3" /> : <Star className="h-3 w-3" />}
                                    </Badge>
                                  )}
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
            <AccordionItem value="markets" className="border rounded-[var(--radius-sm)] bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 overflow-hidden">
              <AccordionTrigger className="px-4 py-3 min-h-[44px] hover:no-underline hover:bg-muted/50 active:bg-muted/70 rounded-[var(--radius-sm)] font-semibold transition-all duration-200 touch-manipulation">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-secondary" />
                  Markets
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2">
                {megaMenuDataEnhanced.markets.map((section, sectionIndex) => (
                  <div key={section.sectionTitle} className="mb-3">
                    {sectionIndex > 0 && <Separator className="my-3" />}
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2 px-2">
                      {section.sectionTitle}
                    </h4>
                    <div className="space-y-1">
                      {section.categories.map((category) => (
                        <div key={category.title} className="ml-1">
                          <div className="font-semibold text-sm py-1.5 px-2 text-foreground/90">{category.title}</div>
                          {category.subItems && (
                            <div className="ml-2 space-y-0.5">
                              {category.subItems.map((item) => (
                                <Link
                                  key={item.link}
                                  to={item.link}
                                  onClick={handleLinkClick}
                                  className="group flex items-center justify-between py-2.5 px-3 min-h-[44px] text-sm text-muted-foreground hover:text-secondary hover:bg-secondary/5 active:scale-[0.98] rounded-[var(--radius-xs)] transition-all duration-200 touch-manipulation"
                                >
                                  <span className="group-hover:translate-x-0.5 transition-transform">{item.name}</span>
                                  {item.badge === "new" && (
                                    <Badge variant="secondary" size="xs" className="ml-2">
                                      <Sparkles className="h-3 w-3" />
                                    </Badge>
                                  )}
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
            <AccordionItem value="projects" className="border rounded-[var(--radius-sm)] bg-gradient-to-br from-accent/5 via-transparent to-primary/5 overflow-hidden">
              <AccordionTrigger className="px-4 py-3 min-h-[44px] hover:no-underline hover:bg-muted/50 active:bg-muted/70 rounded-[var(--radius-sm)] font-semibold transition-all duration-200 touch-manipulation">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-accent" />
                  Projects
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2">
                {megaMenuDataEnhanced.projects.map((section) => (
                  <div key={section.sectionTitle} className="mb-3">
                    <div className="space-y-0.5">
                      {section.categories.map((category) => (
                        <div key={category.title} className="ml-1">
                          {category.subItems && (
                            <div className="space-y-0.5">
                              {category.subItems.map((item) => (
                                <Link
                                  key={item.link}
                                  to={item.link}
                                  onClick={handleLinkClick}
                                  className="group flex items-center justify-between py-2.5 px-3 min-h-[44px] text-sm text-muted-foreground hover:text-accent hover:bg-accent/5 active:scale-[0.98] rounded-[var(--radius-xs)] transition-all duration-200 touch-manipulation"
                                >
                                  <span className="group-hover:translate-x-0.5 transition-transform">{item.name}</span>
                                  {item.badge === "popular" && (
                                    <Badge variant="warning" size="xs" className="ml-2">
                                      <Star className="h-3 w-3" />
                                    </Badge>
                                  )}
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
            <AccordionItem value="company" className="border rounded-[var(--radius-sm)] bg-gradient-to-br from-primary/5 via-transparent to-accent/5 overflow-hidden">
              <AccordionTrigger className="px-4 py-3 min-h-[44px] hover:no-underline hover:bg-muted/50 active:bg-muted/70 rounded-[var(--radius-sm)] font-semibold transition-all duration-200 touch-manipulation">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  Company
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2">
                {megaMenuDataEnhanced.company.map((section, sectionIndex) => (
                  <div key={section.sectionTitle} className="mb-3">
                    {sectionIndex > 0 && <Separator className="my-3" />}
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2 px-2">
                      {section.sectionTitle}
                    </h4>
                    <div className="space-y-1">
                      {section.categories.map((category) => (
                        <div key={category.title} className="ml-1">
                          {category.subItems && (
                            <div className="space-y-0.5">
                              {category.subItems.map((item) => (
                                <Link
                                  key={item.link}
                                  to={item.link}
                                  onClick={handleLinkClick}
                                  className="group flex items-center justify-between py-2.5 px-3 min-h-[44px] text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 active:scale-[0.98] rounded-[var(--radius-xs)] transition-all duration-200 touch-manipulation"
                                >
                                  <span className="group-hover:translate-x-0.5 transition-transform">{item.name}</span>
                                  {item.badge === "new" && (
                                    <Badge variant="secondary" size="xs" className="ml-2">
                                      <Sparkles className="h-3 w-3" />
                                    </Badge>
                                  )}
                                  {item.badge === "important" && (
                                    <Badge variant="default" size="xs" className="ml-2">
                                      <Star className="h-3 w-3" />
                                    </Badge>
                                  )}
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
            <AccordionItem value="resources" className="border rounded-[var(--radius-sm)] bg-gradient-to-br from-secondary/5 via-transparent to-accent/5 overflow-hidden">
              <AccordionTrigger className="px-4 py-3 min-h-[44px] hover:no-underline hover:bg-muted/50 active:bg-muted/70 rounded-[var(--radius-sm)] font-semibold transition-all duration-200 touch-manipulation">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-secondary" />
                  Resources
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2">
                {megaMenuDataEnhanced.resources.map((section, sectionIndex) => (
                  <div key={section.sectionTitle} className="mb-3">
                    {sectionIndex > 0 && <Separator className="my-3" />}
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2 px-2">
                      {section.sectionTitle}
                    </h4>
                    <div className="space-y-1">
                      {section.categories.map((category) => (
                        <div key={category.title} className="ml-1">
                          {category.subItems && (
                            <div className="space-y-0.5">
                              {category.subItems.map((item) => (
                                <Link
                                  key={item.link}
                                  to={item.link}
                                  onClick={handleLinkClick}
                                  className="group flex items-center justify-between py-2.5 px-3 min-h-[44px] text-sm text-muted-foreground hover:text-secondary hover:bg-secondary/5 active:scale-[0.98] rounded-[var(--radius-xs)] transition-all duration-200 touch-manipulation"
                                >
                                  <span className="group-hover:translate-x-0.5 transition-transform">{item.name}</span>
                                  {item.badge === "new" && (
                                    <Badge variant="secondary" size="xs" className="ml-2">
                                      <Sparkles className="h-3 w-3" />
                                    </Badge>
                                  )}
                                  {item.badge === "important" && (
                                    <Badge variant="default" size="xs" className="ml-2">
                                      <Star className="h-3 w-3" />
                                    </Badge>
                                  )}
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
