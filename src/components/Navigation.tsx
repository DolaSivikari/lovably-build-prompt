import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/ui/Button";
import ascentLogoHorizontalDark from "@/assets/ascent-logo-horizontal-dark.png";
import ascentLogoHorizontalLight from "@/assets/ascent-logo-horizontal-light.png";
import { Shield, Phone, ArrowRight, FileText } from "lucide-react";
import { useCompanySettings } from "@/hooks/useCompanySettings";
import { supabase } from "@/integrations/supabase/client";
import { DrawerNavigationMenu } from "./navigation/DrawerNavigationMenu";
import { MobileNavSheet } from "./navigation/MobileNavSheet";

import { megaMenuDataEnhanced } from "@/data/navigation-structure-enhanced";
import { cn } from "@/lib/utils";

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
  const location = useLocation();
  const { scrollDirection, isAtTop } = useScrollDirection();
  
  const heroPages = [
    '/', '/services', '/services/painting-services', '/services/building-envelope',
    '/services/waterproofing', '/services/masonry-restoration', '/services/interior-buildouts',
    '/services/tile-flooring', '/services/cladding-systems', '/services/protective-coatings',
    '/services/sustainable-building', '/about', '/careers', '/capabilities',
    '/company/certifications-insurance', '/company/developers', '/company/equipment-resources',
    '/resources/contractor-portal', '/resources/service-areas', '/contact',
    '/why-specialty-contractor', '/prequalification', '/submit-rfp', '/for-general-contractors',
    '/property-managers', '/commercial-clients', '/our-process', '/sustainability',
    '/faq', '/insights', '/blog'
  ];
  const isHeroPage = heroPages.includes(location.pathname);
  
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [openDrawer, setOpenDrawer] = useState<string | null>(null);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  const { settings } = useCompanySettings();
  const { isAdmin } = useAdminRoleCheck();

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
  const isDrawerSection = (section: string) => location.pathname.startsWith(`/${section.toLowerCase()}`);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-navigation transition-all duration-500",
          scrollDirection === "down" && !isAtTop ? "-translate-y-full" : "translate-y-0",
          isHeroPage && isAtTop
            ? "bg-transparent border-transparent shadow-none"
            : "bg-background/95 backdrop-blur-xl shadow-lg border-b border-border/50"
        )}
      >
        <div className="w-full max-w-none px-6 md:px-8 lg:px-16 xl:px-20">
          <div className="hidden md:flex items-center justify-between w-full h-20">
            <Link to="/" className="flex items-center group" aria-label="Ascent Group Construction - Home">
              <img 
                src={isHeroPage && isAtTop ? ascentLogoHorizontalLight : ascentLogoHorizontalDark} 
                alt="Ascent Group Construction Logo" 
                className="h-14 md:h-18 lg:h-20 w-auto hover-scale-icon transition-all duration-500"
              />
            </Link>

            <nav className="flex items-center gap-2" aria-label="Main navigation">
              <Link
                to="/"
                aria-current={isActive("/") ? "page" : undefined}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                  isActive("/") 
                    ? "text-accent bg-accent/10" 
                    : (isHeroPage && isAtTop ? "text-white hover:text-accent hover:bg-white/10" : "text-foreground hover:text-accent hover:bg-accent/5")
                )}
              >
                Home
              </Link>
              
              <DrawerNavigationMenu
                trigger="Services"
                sections={megaMenuDataEnhanced.services}
                open={openDrawer === "services"}
                onOpenChange={(open) => setOpenDrawer(open ? "services" : null)}
                isActive={isDrawerSection("services")}
              />

              <Link
                to="/projects"
                aria-current={isActive("/projects") ? "page" : undefined}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                  isActive("/projects") 
                    ? "text-accent bg-accent/10" 
                    : (isHeroPage && isAtTop ? "text-white hover:text-accent hover:bg-white/10" : "text-foreground hover:text-accent hover:bg-accent/5")
                )}
              >
                Projects
              </Link>

              <DrawerNavigationMenu
                trigger="Company"
                sections={megaMenuDataEnhanced.company}
                open={openDrawer === "company"}
                onOpenChange={(open) => setOpenDrawer(open ? "company" : null)}
                isActive={isDrawerSection("company") || isActive("/about") || isActive("/careers")}
              />

              <DrawerNavigationMenu
                trigger="Resources"
                sections={megaMenuDataEnhanced.resources}
                open={openDrawer === "resources"}
                onOpenChange={(open) => setOpenDrawer(open ? "resources" : null)}
                isActive={isDrawerSection("resources")}
              />

              <Link
                to="/contact"
                aria-current={isActive("/contact") ? "page" : undefined}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                  isActive("/contact") 
                    ? "text-accent bg-accent/10" 
                    : (isHeroPage && isAtTop ? "text-white hover:text-accent hover:bg-white/10" : "text-foreground hover:text-accent hover:bg-accent/5")
                )}
              >
                Contact
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              {settings?.phone && (
                <a
                  href={`tel:${settings.phone}`}
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors duration-300",
                    isHeroPage && isAtTop ? "text-white" : "text-foreground"
                  )}
                  aria-label={`Call us at ${settings.phone}`}
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  <span className="hidden lg:inline">{settings.phone}</span>
                </a>
              )}

              <Button 
                asChild
                size="sm"
                variant="default"
                className="hidden lg:flex bg-accent hover:bg-accent/90 text-white font-semibold shadow-[var(--shadow-accent)]"
              >
                <Link to="/contact" className="flex items-center gap-2">
                  Get Free Quote
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </Button>

              {isAuthenticated && (
                <Button 
                  asChild
                  size="sm"
                  variant="ghost"
                  className={cn(
                    "hidden lg:flex font-semibold",
                    isHeroPage && isAtTop ? "text-white hover:text-accent hover:bg-white/10" : "text-foreground hover:text-accent"
                  )}
                >
                  <Link to="/portal" className="flex items-center gap-2">
                    <Shield className="w-4 h-4" aria-hidden="true" />
                    Client Portal
                  </Link>
                </Button>
              )}

              {isAdmin && (
                <DropdownMenu open={adminDropdownOpen} onOpenChange={setAdminDropdownOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "font-semibold",
                        isHeroPage && isAtTop ? "text-white hover:text-accent hover:bg-white/10" : "text-foreground hover:text-accent"
                      )}
                    >
                      Admin
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur-xl border-border/50 z-[var(--z-dropdown)]">
                    <DropdownMenuLabel>Admin Panel</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/admin/dashboard" className="cursor-pointer flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/admin/hero-editor" className="cursor-pointer">Hero Editor</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/admin/services-editor" className="cursor-pointer">Services</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/admin/projects-editor" className="cursor-pointer">Projects</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/admin/navigation-builder" className="cursor-pointer">Navigation</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/admin/blog-manager" className="cursor-pointer">Blog Manager</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/admin/analytics" className="cursor-pointer">Analytics</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
      </nav>

      <MobileNavSheet 
        open={isOpen} 
        onOpenChange={setIsOpen}
      />
    </>
  );
};

export default Navigation;
