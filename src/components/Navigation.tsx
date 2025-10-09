import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import ascentLogo from "@/assets/ascent-logo.png";
import { ChevronDown, Phone, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ScrollProgress from "./ScrollProgress";
import { MegaMenuWithSections } from "./navigation/MegaMenuWithSections";
import { megaMenuDataEnhanced } from "@/data/navigation-structure-enhanced";
import { cn } from "@/lib/utils";
import { trackPhoneClick } from "@/lib/analytics";
import { useHoverTimeout } from "@/hooks/useHoverTimeout";
import { useAdminRoleCheck } from "@/hooks/useAdminRoleCheck";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [contactDropdownOpen, setContactDropdownOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileWhoWeServeOpen, setMobileWhoWeServeOpen] = useState(false);
  const [mobileBlogOpen, setMobileBlogOpen] = useState(false);
  const [mobileAdminOpen, setMobileAdminOpen] = useState(false);
  const location = useLocation();
  
  // Check admin role
  const { isAdmin } = useAdminRoleCheck();
  
  // Use custom hook for hover timeout management with automatic cleanup
  const megaMenuHover = useHoverTimeout();
  const contactHover = useHoverTimeout();
  const adminHover = useHoverTimeout();

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

  const isActive = (path: string) => location.pathname === path;

  // Memoize event handlers for better performance
  const handleMegaMenuEnter = useCallback((menuKey: string) => {
    megaMenuHover.clearPendingTimeout();
    setActiveMegaMenu(menuKey);
  }, [megaMenuHover]);

  const handleMegaMenuLeave = useCallback(() => {
    megaMenuHover.scheduleAction(() => setActiveMegaMenu(null), 300);
  }, [megaMenuHover]);

  const closeMegaMenu = useCallback(() => {
    setActiveMegaMenu(null);
    megaMenuHover.clearPendingTimeout();
  }, [megaMenuHover]);

  // Contact dropdown hover handlers - now matching mega menu behavior (300ms delay)
  const openContactDropdown = useCallback(() => {
    contactHover.clearPendingTimeout();
    setContactDropdownOpen(true);
  }, [contactHover]);

  const scheduleCloseContactDropdown = useCallback(() => {
    contactHover.scheduleAction(() => setContactDropdownOpen(false), 300);
  }, [contactHover]);

  // Admin dropdown hover handlers
  const openAdminDropdown = useCallback(() => {
    adminHover.clearPendingTimeout();
    setAdminDropdownOpen(true);
  }, [adminHover]);

  const scheduleCloseAdminDropdown = useCallback(() => {
    adminHover.scheduleAction(() => setAdminDropdownOpen(false), 300);
  }, [adminHover]);

  return (
    <>
      <ScrollProgress />
      <nav className="fixed top-0 left-0 right-0 z-navigation bg-background/95 backdrop-blur-sm border-b border-border" role="banner">
        <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group relative z-navigation" aria-label="Ascent Group Construction - Home">
            <img 
              src={ascentLogo} 
              alt="Ascent Group Construction" 
              className="h-20 w-auto transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-bold text-foreground">Ascent Group</span>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Construction</span>
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
              <Link
                to="/services"
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
              </Link>
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

            {/* Blog & Resources Mega-Menu */}
            <div
              className="relative"
              onMouseEnter={() => handleMegaMenuEnter("blog")}
              onMouseLeave={handleMegaMenuLeave}
            >
              <Link
                to="/blog"
                className={cn(
                  "px-2 py-2 text-sm font-medium transition-colors hover:text-sage inline-flex items-center gap-1",
                  activeMegaMenu === "blog" && "text-sage"
                )}
                aria-expanded={activeMegaMenu === "blog"}
                aria-controls="blog-mega-menu"
              >
                Blog
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  activeMegaMenu === "blog" && "rotate-180"
                )} />
              </Link>
              <MegaMenuWithSections
                sections={megaMenuDataEnhanced.blog}
                isOpen={activeMegaMenu === "blog"}
                onClose={closeMegaMenu}
              />
            </div>
            
            {/* Contact Dropdown */}
            <DropdownMenu open={contactDropdownOpen} onOpenChange={setContactDropdownOpen}>
              <DropdownMenuTrigger 
                onMouseEnter={openContactDropdown}
                onMouseLeave={scheduleCloseContactDropdown}
                className={cn(
                  "px-2 py-2 text-sm font-medium transition-colors hover:text-sage inline-flex items-center gap-1",
                  contactDropdownOpen && "text-sage"
                )}
                aria-expanded={contactDropdownOpen}
              >
                Contact
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  contactDropdownOpen && "rotate-180"
                )} />
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end"
                onMouseEnter={openContactDropdown}
                onMouseLeave={scheduleCloseContactDropdown}
                className="w-64 bg-background text-foreground rounded-lg border border-border z-mega-menu mt-2 p-0 animate-enter shadow-[0_10px_40px_-10px_hsl(var(--charcoal)_/_0.2)]"
              >
                <DropdownMenuItem asChild className="p-0 focus:bg-transparent focus:text-inherit">
                  <Link 
                    to="/contact" 
                    onClick={() => setContactDropdownOpen(false)}
                    className="block w-full px-4 py-2 text-sm text-muted-foreground rounded-md transition-all border-l-2 border-transparent hover:bg-muted/30 hover:text-primary hover:pl-5 hover:border-l-primary focus:bg-muted/30 focus:text-primary"
                  >
                    Contact Us
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="p-0 focus:bg-transparent focus:text-inherit">
                  <Link 
                    to="/careers" 
                    onClick={() => setContactDropdownOpen(false)}
                    className="block w-full px-4 py-2 text-sm text-muted-foreground rounded-md transition-all border-l-2 border-transparent hover:bg-muted/30 hover:text-primary hover:pl-5 hover:border-l-primary focus:bg-muted/30 focus:text-primary"
                  >
                    Careers
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Admin Dropdown - Only visible to admin users */}
            {isAdmin && (
              <DropdownMenu open={adminDropdownOpen} onOpenChange={setAdminDropdownOpen}>
                <DropdownMenuTrigger 
                  onMouseEnter={openAdminDropdown}
                  onMouseLeave={scheduleCloseAdminDropdown}
                  className={cn(
                    "px-2 py-2 text-sm font-medium transition-colors hover:text-sage inline-flex items-center gap-1",
                    adminDropdownOpen && "text-sage"
                  )}
                  aria-expanded={adminDropdownOpen}
                >
                  <Shield className="w-4 h-4" />
                  Admin
                  <ChevronDown className={cn(
                    "w-4 h-4 transition-transform duration-200",
                    adminDropdownOpen && "rotate-180"
                  )} />
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end"
                  onMouseEnter={openAdminDropdown}
                  onMouseLeave={scheduleCloseAdminDropdown}
                  className="w-64 bg-background text-foreground rounded-lg border border-border z-mega-menu mt-2 p-0 animate-enter shadow-[0_10px_40px_-10px_hsl(var(--charcoal)_/_0.2)]"
                >
                  <DropdownMenuItem asChild className="p-0 focus:bg-transparent focus:text-inherit">
                    <Link 
                      to="/admin" 
                      onClick={() => setAdminDropdownOpen(false)}
                      className="block w-full px-4 py-2 text-sm text-muted-foreground rounded-md transition-all border-l-2 border-transparent hover:bg-muted/30 hover:text-primary hover:pl-5 hover:border-l-primary focus:bg-muted/30 focus:text-primary"
                    >
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className="px-4 py-2 text-xs font-semibold text-muted-foreground">
                    Content Management
                  </DropdownMenuLabel>
                  
                  <DropdownMenuItem asChild className="p-0 focus:bg-transparent focus:text-inherit">
                    <Link 
                      to="/admin/services" 
                      onClick={() => setAdminDropdownOpen(false)}
                      className="block w-full px-4 py-2 text-sm text-muted-foreground rounded-md transition-all border-l-2 border-transparent hover:bg-muted/30 hover:text-primary hover:pl-5 hover:border-l-primary focus:bg-muted/30 focus:text-primary"
                    >
                      Services
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="p-0 focus:bg-transparent focus:text-inherit">
                    <Link 
                      to="/admin/projects" 
                      onClick={() => setAdminDropdownOpen(false)}
                      className="block w-full px-4 py-2 text-sm text-muted-foreground rounded-md transition-all border-l-2 border-transparent hover:bg-muted/30 hover:text-primary hover:pl-5 hover:border-l-primary focus:bg-muted/30 focus:text-primary"
                    >
                      Projects
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="p-0 focus:bg-transparent focus:text-inherit">
                    <Link 
                      to="/admin/blog-posts" 
                      onClick={() => setAdminDropdownOpen(false)}
                      className="block w-full px-4 py-2 text-sm text-muted-foreground rounded-md transition-all border-l-2 border-transparent hover:bg-muted/30 hover:text-primary hover:pl-5 hover:border-l-primary focus:bg-muted/30 focus:text-primary"
                    >
                      Blog Posts
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="p-0 focus:bg-transparent focus:text-inherit">
                    <Link 
                      to="/admin/case-studies" 
                      onClick={() => setAdminDropdownOpen(false)}
                      className="block w-full px-4 py-2 text-sm text-muted-foreground rounded-md transition-all border-l-2 border-transparent hover:bg-muted/30 hover:text-primary hover:pl-5 hover:border-l-primary focus:bg-muted/30 focus:text-primary"
                    >
                      Case Studies
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className="px-4 py-2 text-xs font-semibold text-muted-foreground">
                    Submissions
                  </DropdownMenuLabel>
                  
                  <DropdownMenuItem asChild className="p-0 focus:bg-transparent focus:text-inherit">
                    <Link 
                      to="/admin/contact-submissions" 
                      onClick={() => setAdminDropdownOpen(false)}
                      className="block w-full px-4 py-2 text-sm text-muted-foreground rounded-md transition-all border-l-2 border-transparent hover:bg-muted/30 hover:text-primary hover:pl-5 hover:border-l-primary focus:bg-muted/30 focus:text-primary"
                    >
                      Contact Submissions
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="p-0 focus:bg-transparent focus:text-inherit">
                    <Link 
                      to="/admin/resume-submissions" 
                      onClick={() => setAdminDropdownOpen(false)}
                      className="block w-full px-4 py-2 text-sm text-muted-foreground rounded-md transition-all border-l-2 border-transparent hover:bg-muted/30 hover:text-primary hover:pl-5 hover:border-l-primary focus:bg-muted/30 focus:text-primary"
                    >
                      Resume Submissions
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className="px-4 py-2 text-xs font-semibold text-muted-foreground">
                    Settings
                  </DropdownMenuLabel>
                  
                  <DropdownMenuItem asChild className="p-0 focus:bg-transparent focus:text-inherit">
                    <Link 
                      to="/admin/media-library" 
                      onClick={() => setAdminDropdownOpen(false)}
                      className="block w-full px-4 py-2 text-sm text-muted-foreground rounded-md transition-all border-l-2 border-transparent hover:bg-muted/30 hover:text-primary hover:pl-5 hover:border-l-primary focus:bg-muted/30 focus:text-primary"
                    >
                      Media Library
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="p-0 focus:bg-transparent focus:text-inherit">
                    <Link 
                      to="/admin/users" 
                      onClick={() => setAdminDropdownOpen(false)}
                      className="block w-full px-4 py-2 text-sm text-muted-foreground rounded-md transition-all border-l-2 border-transparent hover:bg-muted/30 hover:text-primary hover:pl-5 hover:border-l-primary focus:bg-muted/30 focus:text-primary"
                    >
                      Users
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="p-0 focus:bg-transparent focus:text-inherit">
                    <Link 
                      to="/admin/security-center" 
                      onClick={() => setAdminDropdownOpen(false)}
                      className="block w-full px-4 py-2 text-sm text-muted-foreground rounded-md transition-all border-l-2 border-transparent hover:bg-muted/30 hover:text-primary hover:pl-5 hover:border-l-primary focus:bg-muted/30 focus:text-primary"
                    >
                      Security Center
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="p-0 focus:bg-transparent focus:text-inherit">
                    <Link 
                      to="/admin/seo-dashboard" 
                      onClick={() => setAdminDropdownOpen(false)}
                      className="block w-full px-4 py-2 text-sm text-muted-foreground rounded-md transition-all border-l-2 border-transparent hover:bg-muted/30 hover:text-primary hover:pl-5 hover:border-l-primary focus:bg-muted/30 focus:text-primary"
                    >
                      SEO Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="p-0 focus:bg-transparent focus:text-inherit">
                    <Link 
                      to="/admin/performance-dashboard" 
                      onClick={() => setAdminDropdownOpen(false)}
                      className="block w-full px-4 py-2 text-sm text-muted-foreground rounded-md transition-all border-l-2 border-transparent hover:bg-muted/30 hover:text-primary hover:pl-5 hover:border-l-primary focus:bg-muted/30 focus:text-primary"
                    >
                      Performance Dashboard
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <Button variant="secondary" asChild className="group ml-4">
              <Link to="/estimate" className="flex items-center gap-2">
                <div className="p-1 bg-primary/10 rounded-full">
                  <Phone 
                    className="h-4 w-4" 
                    aria-hidden="true"
                    onClick={(e) => {
                      e.preventDefault();
                      trackPhoneClick();
                    }}
                  />
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
              <Link
                to="/services"
                onClick={() => setIsOpen(false)}
                className="block text-sm font-medium py-3 px-4 rounded-lg transition-all hover:bg-muted hover:translate-x-2 touch-target text-foreground mb-2"
              >
                View All Services
              </Link>
              <Collapsible open={mobileServicesOpen} onOpenChange={setMobileServicesOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-semibold text-muted-foreground mb-2 px-2">
                  <span>Browse by Category</span>
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
            
            <Link
              to="/projects"
              onClick={() => setIsOpen(false)}
              aria-current={isActive("/projects") ? "page" : undefined}
              className={`block text-sm font-medium py-4 px-4 rounded-lg transition-all hover:bg-muted hover:translate-x-2 touch-target ${
                isActive("/projects") ? "text-primary bg-muted" : "text-foreground"
              }`}
            >
              Projects
            </Link>

            {/* Blog & Resources with Accordion */}
            <div className="border-t border-border pt-4">
              <Link
                to="/blog"
                onClick={() => setIsOpen(false)}
                className="block text-sm font-medium py-3 px-4 rounded-lg transition-all hover:bg-muted hover:translate-x-2 touch-target text-foreground mb-2"
              >
                View All Blog Articles
              </Link>
              <Collapsible open={mobileBlogOpen} onOpenChange={setMobileBlogOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-semibold text-muted-foreground mb-2 px-2">
                  <span>Browse Resources</span>
                  <ChevronDown className={cn(
                    "w-4 h-4 transition-transform",
                    mobileBlogOpen && "rotate-180"
                  )} />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {megaMenuDataEnhanced.blog.map((section, sectionIdx) => (
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
              to="/contact"
              onClick={() => setIsOpen(false)}
              aria-current={isActive("/contact") ? "page" : undefined}
              className={`block text-sm font-medium py-4 px-4 rounded-lg transition-all hover:bg-muted hover:translate-x-2 touch-target ${
                isActive("/contact") ? "text-primary bg-muted" : "text-foreground"
              }`}
            >
              Contact
            </Link>

            <Link
              to="/careers"
              onClick={() => setIsOpen(false)}
              aria-current={isActive("/careers") ? "page" : undefined}
              className={`block text-sm font-medium py-4 px-4 rounded-lg transition-all hover:bg-muted hover:translate-x-2 touch-target ${
                isActive("/careers") ? "text-primary bg-muted" : "text-foreground"
              }`}
            >
              Careers
            </Link>

            {/* Admin Section - Only visible to admin users */}
            {isAdmin && (
              <div className="border-t border-border pt-4">
                <Collapsible open={mobileAdminOpen} onOpenChange={setMobileAdminOpen}>
                  <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-semibold text-primary mb-2 px-2">
                    <span className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      ADMIN
                    </span>
                    <ChevronDown className={cn(
                      "w-4 h-4 transition-transform",
                      mobileAdminOpen && "rotate-180"
                    )} />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="space-y-1">
                      <Link
                        to="/admin"
                        className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2 px-4"
                        onClick={() => setIsOpen(false)}
                      >
                        Dashboard
                      </Link>
                      
                      <div className="pt-2 px-2">
                        <div className="text-xs font-semibold text-muted-foreground mb-1">Content</div>
                      </div>
                      <Link
                        to="/admin/services"
                        className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1 px-4 ml-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Services
                      </Link>
                      <Link
                        to="/admin/projects"
                        className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1 px-4 ml-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Projects
                      </Link>
                      <Link
                        to="/admin/blog-posts"
                        className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1 px-4 ml-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Blog Posts
                      </Link>
                      <Link
                        to="/admin/case-studies"
                        className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1 px-4 ml-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Case Studies
                      </Link>
                      
                      <div className="pt-2 px-2">
                        <div className="text-xs font-semibold text-muted-foreground mb-1">Submissions</div>
                      </div>
                      <Link
                        to="/admin/contact-submissions"
                        className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1 px-4 ml-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Contact Submissions
                      </Link>
                      <Link
                        to="/admin/resume-submissions"
                        className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1 px-4 ml-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Resume Submissions
                      </Link>
                      
                      <div className="pt-2 px-2">
                        <div className="text-xs font-semibold text-muted-foreground mb-1">Settings</div>
                      </div>
                      <Link
                        to="/admin/media-library"
                        className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1 px-4 ml-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Media Library
                      </Link>
                      <Link
                        to="/admin/users"
                        className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1 px-4 ml-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Users
                      </Link>
                      <Link
                        to="/admin/security-center"
                        className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1 px-4 ml-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Security Center
                      </Link>
                      <Link
                        to="/admin/seo-dashboard"
                        className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1 px-4 ml-2"
                        onClick={() => setIsOpen(false)}
                      >
                        SEO Dashboard
                      </Link>
                      <Link
                        to="/admin/performance-dashboard"
                        className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1 px-4 ml-2"
                        onClick={() => setIsOpen(false)}
                      >
                        Performance Dashboard
                      </Link>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            )}
            
            <Button variant="secondary" className="w-full" asChild>
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
