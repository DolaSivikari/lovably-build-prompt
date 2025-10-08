import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import ascentLogo from "@/assets/ascent-logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Menu, X, HardHat, ChevronDown, Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ScrollProgress from "./ScrollProgress";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

  const aboutDropdownItems = [
    { name: "About Us", path: "/about" },
    { name: "Our Values", path: "/values" },
    { name: "Safety", path: "/safety" },
    { name: "Careers", path: "/careers" },
  ];

  const blogDropdownItems = [
    { name: "Blog", path: "/blog" },
    { name: "Case Studies", path: "/case-studies" },
    { name: "Sustainability", path: "/sustainability" },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isBlogSection = location.pathname.startsWith("/blog") || location.pathname.startsWith("/case-stud");
  const isAboutSection = location.pathname.startsWith("/about") || location.pathname === "/values" || location.pathname === "/safety";

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
                className={`text-sm font-medium transition-all relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform hover:after:scale-x-100 ${
                  isActive(link.path) ? "text-primary after:scale-x-100" : "text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* About Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger 
                className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
                  isAboutSection ? "text-primary" : "text-foreground"
                }`}
                aria-label="About menu"
                aria-expanded={false}
              >
                About <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border shadow-lg z-50">
                {aboutDropdownItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link 
                      to={item.path}
                      className={`w-full cursor-pointer ${
                        isActive(item.path) ? "text-primary font-medium" : ""
                      }`}
                      aria-current={isActive(item.path) ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Blog Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger 
                className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
                  isBlogSection ? "text-primary" : "text-foreground"
                }`}
                aria-label="Blog menu"
                aria-expanded={false}
              >
                Blog <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border shadow-lg z-50">
                {blogDropdownItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link 
                      to={item.path}
                      className={`w-full cursor-pointer ${
                        isActive(item.path) ? "text-primary font-medium" : ""
                      }`}
                      aria-current={isActive(item.path) ? "page" : undefined}
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

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
            className="md:hidden text-foreground relative w-10 h-10 flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
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
          <div className="md:hidden py-4 space-y-2 animate-slide-in-right" role="navigation" aria-label="Mobile navigation">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                aria-current={isActive(link.path) ? "page" : undefined}
                className={`block text-sm font-medium py-3 px-4 rounded-lg transition-all hover:bg-muted hover:translate-x-2 ${
                  isActive(link.path) ? "text-primary bg-muted" : "text-foreground"
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Mobile About Section */}
            <div className="border-t pt-4">
              <p className="text-xs font-semibold text-muted-foreground mb-2 px-2">ABOUT</p>
              {aboutDropdownItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive(item.path) ? "page" : undefined}
                  className={`block text-sm font-medium py-2 pl-4 transition-colors hover:text-primary ${
                    isActive(item.path) ? "text-primary" : "text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            {/* Mobile Blog Section */}
            <div className="border-t pt-4">
              <p className="text-xs font-semibold text-muted-foreground mb-2 px-2">BLOG</p>
              {blogDropdownItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  aria-current={isActive(item.path) ? "page" : undefined}
                  className={`block text-sm font-medium py-2 pl-4 transition-colors hover:text-primary ${
                    isActive(item.path) ? "text-primary" : "text-foreground"
                  }`}
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
