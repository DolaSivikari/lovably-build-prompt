import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Menu, X, HardHat, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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
  ];

  const blogDropdownItems = [
    { name: "Blog", path: "/blog" },
    { name: "Case Studies", path: "/case-studies" },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isBlogSection = location.pathname.startsWith("/blog") || location.pathname.startsWith("/case-stud");
  const isAboutSection = location.pathname.startsWith("/about") || location.pathname === "/values" || location.pathname === "/safety";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <HardHat className="h-8 w-8 text-primary" />
            <span className="text-primary">Ascen</span>
            <span className="text-foreground">Group</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.path) ? "text-primary" : "text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* About Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
                isAboutSection ? "text-primary" : "text-foreground"
              }`}>
                About <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border shadow-lg z-50">
                {aboutDropdownItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link 
                      to={item.path}
                      className={`w-full cursor-pointer ${
                        isActive(item.path) ? "text-primary font-medium" : ""
                      }`}
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Blog Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
                isBlogSection ? "text-primary" : "text-foreground"
              }`}>
                Blog <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border shadow-lg z-50">
                {blogDropdownItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link 
                      to={item.path}
                      className={`w-full cursor-pointer ${
                        isActive(item.path) ? "text-primary font-medium" : ""
                      }`}
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="default" asChild className="bg-secondary hover:bg-secondary/90 text-primary">
              <Link to="/estimate">Get Estimate</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block text-sm font-medium py-2 transition-colors hover:text-primary ${
                  isActive(link.path) ? "text-primary" : "text-foreground"
                }`}
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
  );
};

export default Navigation;
