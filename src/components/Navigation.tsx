import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/ui/Button";
import ascentLogo from "@/assets/ascent-logo.png";
import { ChevronDown, Shield, Phone, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import ScrollProgress from "./ScrollProgress";
import { MegaMenuWithSections } from "./navigation/MegaMenuWithSections";
import { MobileNavSheet } from "./navigation/MobileNavSheet";
import { DynamicServicesMegaMenu } from "./navigation/DynamicServicesMegaMenu";
import { megaMenuDataEnhanced } from "@/data/navigation-structure-enhanced";
import { cn } from "@/lib/utils";

import { useHoverTimeout } from "@/hooks/useHoverTimeout";
import { useAdminRoleCheck } from "@/hooks/useAdminRoleCheck";
import { useScrollDirection } from "@/hooks/useScrollDirection";
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
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const location = useLocation();
  
  // Check admin role
  const { isAdmin } = useAdminRoleCheck();
  
  // Use custom hook for hover timeout management with automatic cleanup
  const megaMenuHover = useHoverTimeout();
  const adminHover = useHoverTimeout();
  
  // Track scroll direction for auto-hide navigation
  const { scrollDirection, isAtTop } = useScrollDirection();

  // Sync mobile menu state with body data attribute
  useEffect(() => {
    document.body.dataset.mobileMenuOpen = isOpen ? "true" : "false";
  }, [isOpen]);

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

  // Close mega menus when scrolling down
  useEffect(() => {
    if (scrollDirection === "down" && !isAtTop) {
      closeMegaMenu();
      setAdminDropdownOpen(false);
    }
  }, [scrollDirection, isAtTop, closeMegaMenu]);

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
      <nav 
        className={cn(
          "fixed top-0 left-0 right-0 z-navigation border-b transition-all duration-500 ease-in-out",
          isAtTop 
            ? "bg-transparent backdrop-blur-none border-transparent" 
            : "bg-background/95 backdrop-blur-xl shadow-lg border-border/50",
          scrollDirection === "down" && !isAtTop
            ? "-translate-y-full"
            : "translate-y-0"
        )}
      >
        <div className="w-full max-w-none px-6 md:px-8 lg:px-12">
        <div className="hidden md:flex md:items-center md:justify-between md:h-20 md:w-full relative">
          {/* Left Navigation Group */}
          <nav className="flex items-center gap-3 lg:gap-4 2xl:gap-5" aria-label="Main navigation">
            <Link
              to="/"
              aria-current={isActive("/") ? "page" : undefined}
              className={cn(
                "text-sm font-medium transition-all duration-300 relative py-2 hover:scale-105 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100",
                isActive("/") ? "text-primary after:scale-x-100" : "text-foreground hover:text-primary"
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
                  "px-2 py-2 text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-105 inline-flex items-center gap-1",
                  activeMegaMenu === "services" && "text-primary scale-105"
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
              <DynamicServicesMegaMenu
                isOpen={activeMegaMenu === "services"}
                onClose={closeMegaMenu}
              />
            </div>

            {/* Markets Mega-Menu */}
            <div
              className="relative"
              onMouseEnter={() => handleMegaMenuEnter("markets")}
              onMouseLeave={handleMegaMenuLeave}
            >
              <Link
                to="/projects"
                className={cn(
                  "px-2 py-2 text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-105 inline-flex items-center gap-1",
                  activeMegaMenu === "markets" && "text-primary scale-105"
                )}
                aria-expanded={activeMegaMenu === "markets"}
                aria-controls="markets-mega-menu"
              >
                Markets
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  activeMegaMenu === "markets" && "rotate-180"
                )} />
              </Link>
              <MegaMenuWithSections
                sections={megaMenuDataEnhanced.markets}
                isOpen={activeMegaMenu === "markets"}
                onClose={closeMegaMenu}
              />
            </div>
          </nav>

          {/* Center Group: Logo + Company Name + Phone (Absolutely Centered) */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4 lg:gap-6">
            <Link to="/" className="flex items-center gap-3 group relative z-navigation" aria-label="Ascent Group Construction - Home">
              <img 
                src={ascentLogo} 
                alt="Ascent Group Construction Logo" 
                className="h-14 md:h-16 lg:h-18 w-auto transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_hsl(var(--primary)/0.4)]"
              />
              <div className="flex flex-col items-start leading-tight">
                <span className="text-lg md:text-xl lg:text-2xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  Ascent Group
                </span>
                <span className="text-xs md:text-sm lg:text-base font-bold text-primary uppercase tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  CONSTRUCTION
                </span>
              </div>
            </Link>
            
            <div className={cn(
              "h-8 w-px bg-border/50 hidden lg:block",
              isAtTop ? "bg-white/30" : "bg-border/50"
            )} />
            
            <a 
              href="tel:+14165551234" 
              className={cn(
                "hidden lg:flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:scale-105 whitespace-nowrap group",
                isAtTop ? "text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" : "text-foreground"
              )}
            >
              <Phone className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
              <span>(416) 555-1234</span>
            </a>
          </div>

          {/* Right Navigation Group */}
          <nav className="flex items-center gap-3 lg:gap-4 2xl:gap-5" aria-label="Secondary navigation">
            {/* Projects Mega-Menu */}
            <div
              className="relative"
              onMouseEnter={() => handleMegaMenuEnter("projects")}
              onMouseLeave={handleMegaMenuLeave}
            >
              <Link
                to="/projects"
                className={cn(
                  "px-2 py-2 text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-105 inline-flex items-center gap-1",
                  activeMegaMenu === "projects" && "text-primary scale-105"
                )}
                aria-expanded={activeMegaMenu === "projects"}
                aria-controls="projects-mega-menu"
              >
                Projects
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  activeMegaMenu === "projects" && "rotate-180"
                )} />
              </Link>
              <MegaMenuWithSections
                sections={megaMenuDataEnhanced.projects}
                isOpen={activeMegaMenu === "projects"}
                onClose={closeMegaMenu}
              />
            </div>

            {/* Company Mega-Menu */}
            <div
              className="relative"
              onMouseEnter={() => handleMegaMenuEnter("company")}
              onMouseLeave={handleMegaMenuLeave}
            >
              <button
                className={cn(
                  "px-2 py-2 text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-105 inline-flex items-center gap-1",
                  activeMegaMenu === "company" && "text-primary scale-105"
                )}
                aria-expanded={activeMegaMenu === "company"}
                aria-controls="company-mega-menu"
              >
                Company
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  activeMegaMenu === "company" && "rotate-180"
                )} />
              </button>
              <MegaMenuWithSections
                sections={megaMenuDataEnhanced.company}
                isOpen={activeMegaMenu === "company"}
                onClose={closeMegaMenu}
              />
            </div>

            {/* Resources Mega-Menu */}
            <div
              className="relative"
              onMouseEnter={() => handleMegaMenuEnter("resources")}
              onMouseLeave={handleMegaMenuLeave}
            >
              <button
                className={cn(
                  "px-2 py-2 text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-105 inline-flex items-center gap-1",
                  activeMegaMenu === "resources" && "text-primary scale-105"
                )}
                aria-expanded={activeMegaMenu === "resources"}
                aria-controls="resources-mega-menu"
              >
                Resources
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  activeMegaMenu === "resources" && "rotate-180"
                )} />
              </button>
              <MegaMenuWithSections
                sections={megaMenuDataEnhanced.resources}
                isOpen={activeMegaMenu === "resources"}
                onClose={closeMegaMenu}
              />
            </div>

            <Link
              to="/contact"
              className={cn(
                "text-sm font-medium transition-all duration-300 relative py-2 hover:scale-105 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100",
                isActive("/contact") ? "text-primary after:scale-x-100" : "text-foreground hover:text-primary"
              )}
            >
              Contact
            </Link>

            <Button asChild variant="primary" size="sm">
              <Link to="/submit-rfp">
                Submit RFP
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Link 
              to="/resources/contractor-portal" 
              className="text-sm font-medium text-foreground hover:text-primary transition-all duration-300 hover:scale-105 whitespace-nowrap"
            >
              Client Portal
            </Link>

          {/* Admin Dropdown - Only visible to admin users */}
          {isAdmin && (
            <DropdownMenu open={adminDropdownOpen} onOpenChange={setAdminDropdownOpen}>
                <DropdownMenuTrigger 
                  onMouseEnter={openAdminDropdown}
                  onMouseLeave={scheduleCloseAdminDropdown}
                  className={cn(
                    "px-2 py-2 text-sm font-medium transition-all duration-300 hover:text-primary hover:scale-105 inline-flex items-center gap-1",
                    adminDropdownOpen && "text-primary scale-105"
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
                      to="/admin/blog" 
                      onClick={() => setAdminDropdownOpen(false)}
                      className="block w-full px-4 py-2 text-sm text-muted-foreground rounded-md transition-all border-l-2 border-transparent hover:bg-muted/30 hover:text-primary hover:pl-5 hover:border-l-primary focus:bg-muted/30 focus:text-primary"
                    >
                      Blog Posts & Case Studies
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="p-0 focus:bg-transparent focus:text-inherit">
                    <Link 
                      to="/admin/testimonials" 
                      onClick={() => setAdminDropdownOpen(false)}
                      className="block w-full px-4 py-2 text-sm text-muted-foreground rounded-md transition-all border-l-2 border-transparent hover:bg-muted/30 hover:text-primary hover:pl-5 hover:border-l-primary focus:bg-muted/30 focus:text-primary"
                    >
                      Testimonials
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="p-0 focus:bg-transparent focus:text-inherit">
                    <Link 
                      to="/admin/stats" 
                      onClick={() => setAdminDropdownOpen(false)}
                      className="block w-full px-4 py-2 text-sm text-muted-foreground rounded-md transition-all border-l-2 border-transparent hover:bg-muted/30 hover:text-primary hover:pl-5 hover:border-l-primary focus:bg-muted/30 focus:text-primary"
                    >
                      Stats
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className="px-4 py-2 text-xs font-semibold text-muted-foreground">
                    Page Editors
                  </DropdownMenuLabel>
                  
                  <DropdownMenuItem asChild className="p-0 focus:bg-transparent focus:text-inherit">
                    <Link 
                      to="/admin/landing-menu" 
                      onClick={() => setAdminDropdownOpen(false)}
                      className="block w-full px-4 py-2 text-sm text-muted-foreground rounded-md transition-all border-l-2 border-transparent hover:bg-muted/30 hover:text-primary hover:pl-5 hover:border-l-primary focus:bg-muted/30 focus:text-primary"
                    >
                      Home Hero Menu
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="p-0 focus:bg-transparent focus:text-inherit">
                    <Link 
                      to="/admin/about-page" 
                      onClick={() => setAdminDropdownOpen(false)}
                      className="block w-full px-4 py-2 text-sm text-muted-foreground rounded-md transition-all border-l-2 border-transparent hover:bg-muted/30 hover:text-primary hover:pl-5 hover:border-l-primary focus:bg-muted/30 focus:text-primary"
                    >
                      About Us Page
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="p-0 focus:bg-transparent focus:text-inherit">
                    <Link 
                      to="/admin/footer-settings" 
                      onClick={() => setAdminDropdownOpen(false)}
                      className="block w-full px-4 py-2 text-sm text-muted-foreground rounded-md transition-all border-l-2 border-transparent hover:bg-muted/30 hover:text-primary hover:pl-5 hover:border-l-primary focus:bg-muted/30 focus:text-primary"
                    >
                      Footer Content
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="p-0 focus:bg-transparent focus:text-inherit">
                    <Link 
                      to="/admin/contact-page-settings" 
                      onClick={() => setAdminDropdownOpen(false)}
                      className="block w-full px-4 py-2 text-sm text-muted-foreground rounded-md transition-all border-l-2 border-transparent hover:bg-muted/30 hover:text-primary hover:pl-5 hover:border-l-primary focus:bg-muted/30 focus:text-primary"
                    >
                      Contact Page
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className="px-4 py-2 text-xs font-semibold text-muted-foreground">
                    Submissions
                  </DropdownMenuLabel>
                  
                  <DropdownMenuItem asChild className="p-0 focus:bg-transparent focus:text-inherit">
                    <Link 
                      to="/admin/contacts" 
                      onClick={() => setAdminDropdownOpen(false)}
                      className="block w-full px-4 py-2 text-sm text-muted-foreground rounded-md transition-all border-l-2 border-transparent hover:bg-muted/30 hover:text-primary hover:pl-5 hover:border-l-primary focus:bg-muted/30 focus:text-primary"
                    >
                      Contact Submissions
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="p-0 focus:bg-transparent focus:text-inherit">
                    <Link 
                      to="/admin/resumes" 
                      onClick={() => setAdminDropdownOpen(false)}
                      className="block w-full px-4 py-2 text-sm text-muted-foreground rounded-md transition-all border-l-2 border-transparent hover:bg-muted/30 hover:text-primary hover:pl-5 hover:border-l-primary focus:bg-muted/30 focus:text-primary"
                    >
                      Resume Submissions
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel className="px-4 py-2 text-xs font-semibold text-muted-foreground">
                    Settings & Tools
                  </DropdownMenuLabel>
                  
                  <DropdownMenuItem asChild className="p-0 focus:bg-transparent focus:text-inherit">
                    <Link 
                      to="/admin/site-settings" 
                      onClick={() => setAdminDropdownOpen(false)}
                      className="block w-full px-4 py-2 text-sm text-muted-foreground rounded-md transition-all border-l-2 border-transparent hover:bg-muted/30 hover:text-primary hover:pl-5 hover:border-l-primary focus:bg-muted/30 focus:text-primary"
                    >
                      Site Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="p-0 focus:bg-transparent focus:text-inherit">
                    <Link 
                      to="/admin/media" 
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
                  <DropdownMenuItem asChild className="p-0 focus:bg-transparent focus:text-inherit">
                    <Link 
                      to="/admin/settings-health" 
                      onClick={() => setAdminDropdownOpen(false)}
                      className="block w-full px-4 py-2 text-sm text-muted-foreground rounded-md transition-all border-l-2 border-transparent hover:bg-muted/30 hover:text-primary hover:pl-5 hover:border-l-primary focus:bg-muted/30 focus:text-primary"
                    >
                      Settings Health Check
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>
        </div>

        {/* Mobile Layout */}
        <div className="flex md:hidden items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2 group relative z-navigation" aria-label="Ascent Group Construction - Home">
            <img 
              src={ascentLogo} 
              alt="Ascent Group Construction Logo" 
              className="h-12 w-auto transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold text-foreground">Ascent Group</span>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Construction</span>
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground relative flex items-center justify-center h-11 w-11 min-h-[44px] min-w-[44px] rounded-md hover:bg-muted"
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

        {/* Mobile Navigation Sheet */}
        <MobileNavSheet
          open={isOpen}
          onOpenChange={setIsOpen}
        />
        </div>
      </nav>
    </>
  );
};

export default Navigation;
