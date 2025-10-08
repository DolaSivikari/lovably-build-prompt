import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import ascentLogo from "@/assets/ascent-logo.png";
import { ChevronDown, Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ScrollProgress from "./ScrollProgress";
import { MegaMenuWithSections } from "./navigation/MegaMenuWithSections";
import { megaMenuDataEnhanced } from "@/data/navigation-structure-enhanced";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [megaMenuHoverTimeout, setMegaMenuHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileWhoWeServeOpen, setMobileWhoWeServeOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    checkAuth();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Our Process", path: "/our-process" },
    { name: "Contact", path: "/contact" },
    ...(isAuthenticated ? [{ name: "Admin", path: "/admin" }] : []),
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleMegaMenuEnter = (menuKey: string) => {
    if (megaMenuHoverTimeout) {
      clearTimeout(megaMenuHoverTimeout);
    }
    setActiveMegaMenu(menuKey);
  };

  const handleMegaMenuLeave = () => {
    const timeout = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 300);
    setMegaMenuHoverTimeout(timeout);
  };

  const closeMegaMenu = () => {
    setActiveMegaMenu(null);
    if (megaMenuHoverTimeout) {
      clearTimeout(megaMenuHoverTimeout);
    }
  };

  return (
    <>
      <ScrollProgress />
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border" role="banner">
        <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" aria-label="Ascent Group Construction - Home">
            <img 
              src={ascentLogo} 
              alt="Ascent Group Construction" 
              className="h-14 w-auto transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold text-foreground">Ascent Group</span>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Construction</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-end" role="navigation" aria-label="Main navigation">
            <Link
              to="/"
              aria-current={isActive("/") ? "page" : undefined}
              className={cn(
                "text-sm font-medium transition-all relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform hover:after:scale-x-100",
                isActive("/") ? "text-primary after:scale-x-100" : "text-foreground"
              )}
            >
              Home
            </Link>
            
            {/* Services Mega-Menu */}
            <div
              className="relative"
              onMouseEnter={() => handleMegaMenuEnter("services")}
              onMouseLeave={handleMegaMenuLeave}
            >
              <button
                className={cn(
                  "px-2 py-2 text-sm font-medium transition-colors hover:text-sage inline-flex items-center gap-1",
                  activeMegaMenu === "services" && "text-sage"
                )}
                aria-expanded={activeMegaMenu === "services"}
                aria-controls="services-mega-menu"
              >
                Services
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  activeMegaMenu === "services" && "rotate-180"
                )} />
              </button>
              <MegaMenuWithSections
                sections={megaMenuDataEnhanced.services}
                isOpen={activeMegaMenu === "services"}
                onClose={closeMegaMenu}
              />
            </div>

            {/* Who We Serve Mega-Menu */}
            <div
              className="relative"
              onMouseEnter={() => handleMegaMenuEnter("whoWeServe")}
              onMouseLeave={handleMegaMenuLeave}
            >
              <button
                className={cn(
                  "px-2 py-2 text-sm font-medium transition-colors hover:text-sage inline-flex items-center gap-1",
                  activeMegaMenu === "whoWeServe" && "text-sage"
                )}
                aria-expanded={activeMegaMenu === "whoWeServe"}
                aria-controls="whowesserve-mega-menu"
              >
                Who We Serve
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  activeMegaMenu === "whoWeServe" && "rotate-180"
                )} />
              </button>
              <MegaMenuWithSections
                sections={megaMenuDataEnhanced.whoWeServe}
                isOpen={activeMegaMenu === "whoWeServe"}
                onClose={closeMegaMenu}
              />
            </div>
            
            <Link
              to="/our-process"
              className={cn(
                "text-sm font-medium transition-all relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform hover:after:scale-x-100",
                isActive("/our-process") ? "text-primary after:scale-x-100" : "text-foreground"
              )}
            >
              Our Process
            </Link>
            
            <Link
              to="/projects"
              className={cn(
                "text-sm font-medium transition-all relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform hover:after:scale-x-100",
                isActive("/projects") ? "text-primary after:scale-x-100" : "text-foreground"
              )}
            >
              Projects
            </Link>

            <Link
              to="/blog"
              className={cn(
                "text-sm font-medium transition-all relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform hover:after:scale-x-100",
                isActive("/blog") ? "text-primary after:scale-x-100" : "text-foreground"
              )}
            >
              Blog
            </Link>
            
            <Link
              to="/contact"
              className={cn(
                "text-sm font-medium transition-all relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform hover:after:scale-x-100",
                isActive("/contact") ? "text-primary after:scale-x-100" : "text-foreground"
              )}
            >
              Contact
            </Link>

            <Button variant="default" asChild className="bg-secondary hover:bg-secondary/90 text-primary group ml-4">
              <Link to="/estimate" className="flex items-center gap-2">
                <div className="p-1 bg-primary/10 rounded-full">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </div>
                Get Estimate
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button - Animated Hamburger */}
          <button
            className="md:hidden text-foreground relative touch-target flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <div className="flex flex-col gap-1.5 w-6">
              <span className={`h-0.5 w-full bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`h-0.5 w-full bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 w-full bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div id="mobile-menu" className="md:hidden py-4 space-y-2 animate-slide-in-right" role="navigation" aria-label="Mobile navigation">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              aria-current={isActive("/") ? "page" : undefined}
              className={`block text-sm font-medium py-4 px-4 rounded-lg transition-all hover:bg-muted hover:translate-x-2 touch-target ${
                isActive("/") ? "text-primary bg-muted" : "text-foreground"
              }`}
            >
              Home
            </Link>
            
            {/* Services with Accordion */}
            <div className="border-t border-border pt-4">
              <Collapsible open={mobileServicesOpen} onOpenChange={setMobileServicesOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-semibold text-muted-foreground mb-2 px-2">
                  <span>SERVICES</span>
                  <ChevronDown className={cn(
                    "w-4 h-4 transition-transform",
                    mobileServicesOpen && "rotate-180"
                  )} />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {megaMenuDataEnhanced.services.map((section, sectionIdx) => (
                    <div key={sectionIdx} className="space-y-3">
                      {section.categories.map((category, categoryIdx) => (
                        <div key={categoryIdx} className="mb-3">
                          <div className="font-medium text-primary text-sm mb-2 px-2">
                            {category.title}
                          </div>
                          <ul className="space-y-1 ml-3">
                            {category.subItems.map((item, itemIdx) => (
                              <li key={itemIdx}>
                                <Link
                                  to={item.link}
                                  className="text-sm text-muted-foreground hover:text-foreground transition-colors block py-1"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </div>

            {/* Who We Serve with Accordion */}
            <div className="border-t border-border pt-4">
              <Collapsible open={mobileWhoWeServeOpen} onOpenChange={setMobileWhoWeServeOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-semibold text-muted-foreground mb-2 px-2">
                  <span>WHO WE SERVE</span>
                  <ChevronDown className={cn(
                    "w-4 h-4 transition-transform",
                    mobileWhoWeServeOpen && "rotate-180"
                  )} />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {megaMenuDataEnhanced.whoWeServe.map((section, sectionIdx) => (
                    <div key={sectionIdx} className="space-y-3">
                      {section.categories.map((category, categoryIdx) => (
                        <div key={categoryIdx} className="mb-3">
                          <div className="font-medium text-primary text-sm mb-2 px-2">
                            {category.title}
                          </div>
                          <ul className="space-y-1 ml-3">
                            {category.subItems.map((item, itemIdx) => (
                              <li key={itemIdx}>
                                <Link
                                  to={item.link}
                                  className="text-sm text-muted-foreground hover:text-foreground transition-colors block py-1"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </div>
            
            <Link
              to="/our-process"
              onClick={() => setIsOpen(false)}
              aria-current={isActive("/our-process") ? "page" : undefined}
              className={`block text-sm font-medium py-4 px-4 rounded-lg transition-all hover:bg-muted hover:translate-x-2 touch-target ${
                isActive("/our-process") ? "text-primary bg-muted" : "text-foreground"
              }`}
            >
              Our Process
            </Link>
            
            {/* Projects & Blog */}
            <div className="border-t border-border pt-4 space-y-3">
              <Link
                to="/projects"
                className="block text-sm font-medium py-4 px-4 rounded-lg transition-all hover:bg-muted hover:translate-x-2 touch-target text-foreground"
                onClick={() => setIsOpen(false)}
              >
                Projects
              </Link>
              <Link
                to="/blog"
                className="block text-sm font-medium py-4 px-4 rounded-lg transition-all hover:bg-muted hover:translate-x-2 touch-target text-foreground"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/contact"
                className="block text-sm font-medium py-4 px-4 rounded-lg transition-all hover:bg-muted hover:translate-x-2 touch-target text-foreground"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </div>
            
            <Button variant="default" className="w-full bg-secondary hover:bg-secondary/90 text-primary" asChild>
              <Link to="/estimate" onClick={() => setIsOpen(false)}>
                Get Estimate
              </Link>
            </Button>
          </div>
        )}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
