import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import ascentLogo from "@/assets/ascent-logo.png";
import { ChevronDown, Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ScrollProgress from "./ScrollProgress";
import { MegaMenu } from "./navigation/MegaMenu";
import { megaMenuData } from "@/data/navigation-structure";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [megaMenuHoverTimeout, setMegaMenuHoverTimeout] = useState<NodeJS.Timeout | null>(null);
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
    { name: "Services", path: "/services" },
    { name: "Our Process", path: "/our-process" },
    { name: "Projects", path: "/projects" },
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
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                aria-current={isActive(link.path) ? "page" : undefined}
                className={cn(
                  "text-sm font-medium transition-all relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform hover:after:scale-x-100",
                  isActive(link.path) ? "text-primary after:scale-x-100" : "text-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
            
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
              <MegaMenu
                categories={megaMenuData.services}
                isOpen={activeMegaMenu === "services"}
                onClose={closeMegaMenu}
              />
            </div>

            {/* About Mega-Menu */}
            <div
              className="relative"
              onMouseEnter={() => handleMegaMenuEnter("about")}
              onMouseLeave={handleMegaMenuLeave}
            >
              <button
                className={cn(
                  "px-2 py-2 text-sm font-medium transition-colors hover:text-sage inline-flex items-center gap-1",
                  activeMegaMenu === "about" && "text-sage"
                )}
                aria-expanded={activeMegaMenu === "about"}
                aria-controls="about-mega-menu"
              >
                About
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  activeMegaMenu === "about" && "rotate-180"
                )} />
              </button>
              <MegaMenu
                categories={megaMenuData.about}
                isOpen={activeMegaMenu === "about"}
                onClose={closeMegaMenu}
              />
            </div>

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
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                aria-current={isActive(link.path) ? "page" : undefined}
                className={`block text-sm font-medium py-4 px-4 rounded-lg transition-all hover:bg-muted hover:translate-x-2 touch-target ${
                  isActive(link.path) ? "text-primary bg-muted" : "text-foreground"
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile Services Section */}
            <div className="border-t pt-4">
              <p className="text-xs font-semibold text-muted-foreground mb-2 px-2">SERVICES</p>
              {megaMenuData.services.flatMap(cat => cat.subItems).map((item) => (
                <Link
                  key={item.link}
                  to={item.link}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive(item.link) ? "page" : undefined}
                  className={cn(
                    "block text-sm font-medium py-3 pl-4 transition-colors hover:text-primary touch-target",
                    isActive(item.link) ? "text-primary" : "text-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            {/* Mobile About Section */}
            <div className="border-t pt-4">
              <p className="text-xs font-semibold text-muted-foreground mb-2 px-2">ABOUT</p>
              {megaMenuData.about.flatMap(cat => cat.subItems).map((item) => (
                <Link
                  key={item.link}
                  to={item.link}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive(item.link) ? "page" : undefined}
                  className={cn(
                    "block text-sm font-medium py-3 pl-4 transition-colors hover:text-primary touch-target",
                    isActive(item.link) ? "text-primary" : "text-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
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
