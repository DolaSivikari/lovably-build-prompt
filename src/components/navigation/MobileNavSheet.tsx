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
import { Phone } from "lucide-react";
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
          {/* Top-level routes */}
          <nav className="space-y-1 mb-6">
            <Link
              to="/"
              onClick={handleLinkClick}
              className={`block py-3 px-4 rounded-md text-base font-medium transition-colors ${
                isActive("/")
                  ? "bg-sage/20 text-sage-dark"
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
                  ? "bg-sage/20 text-sage-dark"
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
                  ? "bg-sage/20 text-sage-dark"
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
                                  className="block py-2 text-sm text-muted-foreground hover:text-sage-dark hover:bg-sage/10 px-2 rounded transition-colors"
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
                                  className="block py-2 text-sm text-muted-foreground hover:text-sage-dark hover:bg-sage/10 px-2 rounded transition-colors"
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
                                  className="block py-2 text-sm text-muted-foreground hover:text-sage-dark hover:bg-sage/10 px-2 rounded transition-colors"
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
