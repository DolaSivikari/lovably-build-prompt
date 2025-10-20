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
        className="w-full sm:max-w-md overflow-y-auto p-0"
      >
        <SheetHeader className="p-6 pb-4 text-left border-b">
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>
            Explore our services and resources
          </SheetDescription>
        </SheetHeader>

        <div className="px-6 py-4">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search services..."
                className="pl-10 h-11"
              />
            </div>
          </div>

          {/* Mini Stats Bar */}
          <div className="grid grid-cols-3 gap-2 mb-6 p-4 bg-muted/30 rounded-lg">
            <div className="text-center">
              <div className="text-xl font-bold text-primary">15+</div>
              <div className="text-xs text-muted-foreground">Years</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-primary">500+</div>
              <div className="text-xs text-muted-foreground">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-primary">98%</div>
              <div className="text-xs text-muted-foreground">Satisfied</div>
            </div>
          </div>

          {/* Popular Services Quick Links */}
          <div className="mb-6 p-4 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
            <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Popular Services
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/services/commercial-painting"
                onClick={handleLinkClick}
                className="flex items-center gap-2 text-xs py-2 px-3 bg-background rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Building className="h-3 w-3" />
                Commercial
              </Link>
              <Link
                to="/services/residential-painting"
                onClick={handleLinkClick}
                className="flex items-center gap-2 text-xs py-2 px-3 bg-background rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Users className="h-3 w-3" />
                Residential
              </Link>
              <Link
                to="/services/stucco-eifs"
                onClick={handleLinkClick}
                className="flex items-center gap-2 text-xs py-2 px-3 bg-background rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Wrench className="h-3 w-3" />
                Stucco
              </Link>
              <Link
                to="/services/parking-garage-restoration"
                onClick={handleLinkClick}
                className="flex items-center gap-2 text-xs py-2 px-3 bg-background rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <Building className="h-3 w-3" />
                Restoration
              </Link>
            </div>
          </div>
          {/* Top-level routes */}
          <nav className="space-y-1 mb-6">
            <Link
              to="/"
              onClick={handleLinkClick}
              className={`block py-3 px-4 rounded-md text-base font-medium transition-colors ${
                isActive("/")
                  ? "bg-[hsl(var(--sage))]/20 text-[hsl(var(--sage-dark))]"
                  : "hover:bg-muted"
              }`}
            >
              Home
            </Link>
            <Link
              to="/our-process"
              onClick={handleLinkClick}
              className={`block py-3 px-4 rounded-md text-base font-medium transition-colors ${
                isActive("/our-process")
                  ? "bg-[hsl(var(--sage))]/20 text-[hsl(var(--sage-dark))]"
                  : "hover:bg-muted"
              }`}
            >
              Our Process
            </Link>
            <Link
              to="/projects"
              onClick={handleLinkClick}
              className={`block py-3 px-4 rounded-md text-base font-medium transition-colors ${
                isActive("/projects")
                  ? "bg-[hsl(var(--sage))]/20 text-[hsl(var(--sage-dark))]"
                  : "hover:bg-muted"
              }`}
            >
              Projects
            </Link>
          </nav>

          {/* Accordion sections */}
          <Accordion type="multiple" className="space-y-2">
            {/* Services Section */}
            <AccordionItem value="services" className="border rounded-md">
              <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted rounded-md font-semibold">
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
                                  className="block py-2 text-sm text-muted-foreground hover:text-[hsl(var(--sage-dark))] hover:bg-[hsl(var(--sage))]/10 px-2 rounded transition-colors"
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

            {/* Who We Serve Section */}
            <AccordionItem value="who-we-serve" className="border rounded-md">
              <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted rounded-md font-semibold">
                Who We Serve
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                {megaMenuDataEnhanced.whoWeServe.map((section) => (
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

            {/* Blog & Resources Section */}
            <AccordionItem value="blog" className="border rounded-md">
              <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted rounded-md font-semibold">
                Blog & Resources
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                {megaMenuDataEnhanced.blog.map((section) => (
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

        {/* Pinned CTA at bottom */}
        <div className="sticky bottom-0 left-0 right-0 p-6 border-t bg-background">
          <Button
            asChild
            size="lg"
            className="w-full gap-2"
          >
            <Link to="/estimate" onClick={handleLinkClick}>
              <Phone className="h-5 w-5" />
              Get Free Estimate
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
