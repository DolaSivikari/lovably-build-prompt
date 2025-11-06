import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  Search, Clock, TrendingUp, X, Building2, Wrench, Target, 
  Briefcase, Shield, ChevronDown, Phone, Mail, MapPin
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScreenReaderAnnouncement } from "@/components/ui/ScreenReaderAnnouncement";
import { useNavigationHistory } from "@/hooks/useNavigationHistory";
import { useRecommendations } from "@/hooks/useRecommendations";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { useScrollIndicator } from "@/hooks/useScrollIndicator";
import { haptics } from "@/utils/haptics";
import { NAVIGATION_ICONS } from "@/data/navigation-icons";
import { NAVIGATION_DESCRIPTIONS } from "@/data/navigation-descriptions";

interface MobileFooterMegaProps {
  companyLinks: Array<{ label: string; href: string }>;
  services: Array<{ name: string; slug: string; service_tier?: string }>;
  marketLinks: Array<{ label: string; href: string }>;
  projectLinks: Array<{ label: string; href: string }>;
  certifications: Array<{ icon: any; title: string; subtitle: string }>;
  displayTrustItems: boolean;
  trustBarItems: Array<{ label: string; value: string }>;
  contactInfo: {
    phone?: string;
    email?: string;
    address?: string;
  };
}

export function MobileFooterMega({
  companyLinks,
  services,
  marketLinks,
  projectLinks,
  certifications,
  displayTrustItems,
  trustBarItems,
  contactInfo
}: MobileFooterMegaProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [expandedAccordions, setExpandedAccordions] = useState<string[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const { history, trackNavigation, getRecentlyViewed } = useNavigationHistory();
  const { recommendations } = useRecommendations();
  const { 
    searchQuery: navSearchQuery, 
    setSearchQuery: setNavSearchQuery,
    filteredResults 
  } = useNavigationSearch();
  const { isScrollable, isAtBottom } = useScrollIndicator(contentRef);

  // Sync search with navigation search
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setNavSearchQuery(value);
  };

  const handleClearSearch = () => {
    haptics.light();
    setSearchQuery("");
    setNavSearchQuery("");
    setAnnouncement("Search cleared");
  };

  const handleLinkClick = (name: string, category: string) => {
    haptics.light();
    trackNavigation(name, category);
  };

  const addRipple = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    const ripple = document.createElement("span");
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add("ripple");

    target.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  const recentlyViewed = getRecentlyViewed(4);
  const hasSearchResults = searchQuery.length > 0;

  return (
    <div className="md:hidden space-y-4">
      <ScreenReaderAnnouncement message={announcement} />
      
      {/* Search Bar */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            placeholder="Search footer links..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => {
              setSearchFocused(true);
              haptics.light();
            }}
            onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
            className="pl-10 pr-10 h-11 bg-background/50 border-border/50 focus:bg-background"
            aria-label="Search footer navigation"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearSearch}
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Search Results Count */}
        {hasSearchResults && (
          <div className="mt-2 px-3 py-2 bg-muted/50 rounded-md border border-border/30">
            <p className="text-xs text-muted-foreground">
              Found <span className="font-semibold text-foreground">{filteredResults.length}</span> results
            </p>
          </div>
        )}
      </div>

      {/* Search Results */}
      {hasSearchResults ? (
        <div className="space-y-2" ref={contentRef}>
          {filteredResults.length > 0 ? (
            <>
              {filteredResults.map((result, index) => {
                const Icon = NAVIGATION_ICONS[result.link] || Briefcase;
                return (
                  <Link
                    key={`${result.link}-${index}`}
                    to={result.link}
                    onClick={(e) => {
                      addRipple(e);
                      handleLinkClick(result.name, result.category);
                    }}
                    className="block p-3 bg-muted/30 hover:bg-muted/60 rounded-lg border border-border/50 transition-all active:scale-[0.98]"
                    style={{ 
                      animationDelay: `${index * 50}ms`,
                      touchAction: 'manipulation'
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-md bg-primary/10 flex-shrink-0">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-foreground">{result.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {result.category} • {result.section}
                        </div>
                        {NAVIGATION_DESCRIPTIONS[result.link] && (
                          <p className="text-xs text-muted-foreground/80 mt-1 line-clamp-1">
                            {NAVIGATION_DESCRIPTIONS[result.link]}
                          </p>
                        )}
                      </div>
                      {result.badge && (
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5">
                          {result.badge}
                        </Badge>
                      )}
                    </div>
                  </Link>
                );
              })}
            </>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">No results found</p>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Recently Viewed */}
          {recentlyViewed.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Recently Viewed
                </h3>
              </div>
              <div className="space-y-2">
                {recentlyViewed.map((item, index) => {
                  const Icon = NAVIGATION_ICONS[item.path] || Briefcase;
                  return (
                    <Link
                      key={`${item.path}-${index}`}
                      to={item.path}
                      onClick={(e) => {
                        addRipple(e);
                        handleLinkClick(item.name, item.category);
                      }}
                      className="block p-3 bg-gradient-to-br from-primary/5 to-accent/5 hover:from-primary/10 hover:to-accent/10 rounded-lg border border-primary/20 transition-all active:scale-[0.98]"
                      style={{ touchAction: 'manipulation' }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-md bg-primary/10">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm text-foreground truncate">{item.name}</div>
                          <div className="text-xs text-muted-foreground">{item.category}</div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 px-1">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Recommended For You
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {recommendations.map((rec, index) => {
                  const Icon = NAVIGATION_ICONS[rec.link] || Briefcase;
                  return (
                    <Link
                      key={`${rec.link}-${index}`}
                      to={rec.link}
                      onClick={(e) => {
                        addRipple(e);
                        handleLinkClick(rec.name, rec.category);
                      }}
                      className="p-3 bg-muted/30 hover:bg-muted/60 rounded-lg border border-border/50 transition-all active:scale-[0.98]"
                      style={{ touchAction: 'manipulation' }}
                    >
                      <div className="flex flex-col items-center text-center gap-2">
                        <div className="p-2 rounded-md bg-accent/10">
                          <Icon className="h-4 w-4 text-accent" />
                        </div>
                        <div className="text-xs font-medium text-foreground line-clamp-2">
                          {rec.name}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Accordion Sections */}
          <Accordion 
            type="multiple" 
            value={expandedAccordions}
            onValueChange={setExpandedAccordions}
            className="space-y-3"
          >
            {/* Company Section */}
            <AccordionItem value="company" className="bg-muted/30 rounded-lg border border-border/50 overflow-hidden">
              <AccordionTrigger 
                onClick={(e) => {
                  addRipple(e);
                  haptics.light();
                }}
                className="px-4 py-3 hover:no-underline hover:bg-muted/50 transition-colors [&[data-state=open]]:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-primary/10">
                    <Building2 className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-semibold text-foreground">Company</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2">
                <nav className="space-y-1">
                  {companyLinks.map((link, index) => (
                    <Link 
                      key={index}
                      to={link.href}
                      onClick={(e) => {
                        addRipple(e);
                        handleLinkClick(link.label, 'Company');
                      }}
                      className="block py-2.5 px-3 text-sm text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-md transition-all active:scale-95 stagger-item"
                      style={{ 
                        animationDelay: `${index * 50}ms`,
                        touchAction: 'manipulation' 
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </AccordionContent>
            </AccordionItem>

            {/* Services Section */}
            <AccordionItem value="services" className="bg-muted/30 rounded-lg border border-border/50 overflow-hidden">
              <AccordionTrigger 
                onClick={(e) => {
                  addRipple(e);
                  haptics.light();
                }}
                className="px-4 py-3 hover:no-underline hover:bg-muted/50 transition-colors [&[data-state=open]]:bg-muted/50"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="p-2 rounded-md bg-primary/10">
                    <Wrench className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-semibold text-foreground">Services</span>
                  <Badge variant="secondary" className="ml-auto mr-2 text-xs">
                    {services.length}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2">
                <nav className="grid grid-cols-2 gap-2">
                  {services.map((service, index) => (
                    <Link 
                      key={index}
                      to={`/services/${service.slug}`}
                      onClick={(e) => {
                        addRipple(e);
                        handleLinkClick(service.name, 'Services');
                      }}
                      className="py-2.5 px-3 text-xs text-muted-foreground hover:text-primary bg-background/50 hover:bg-muted rounded-md transition-all active:scale-95 border border-border/30 stagger-item"
                      style={{ 
                        animationDelay: `${index * 30}ms`,
                        touchAction: 'manipulation' 
                      }}
                    >
                      {service.name}
                    </Link>
                  ))}
                </nav>
              </AccordionContent>
            </AccordionItem>

            {/* Markets Section */}
            <AccordionItem value="markets" className="bg-muted/30 rounded-lg border border-border/50 overflow-hidden">
              <AccordionTrigger 
                onClick={(e) => {
                  addRipple(e);
                  haptics.light();
                }}
                className="px-4 py-3 hover:no-underline hover:bg-muted/50 transition-colors [&[data-state=open]]:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-primary/10">
                    <Target className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-semibold text-foreground">Markets</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2">
                <nav className="space-y-1">
                  {marketLinks.map((link, index) => (
                    <Link 
                      key={index}
                      to={link.href}
                      onClick={(e) => {
                        addRipple(e);
                        handleLinkClick(link.label, 'Markets');
                      }}
                      className="block py-2.5 px-3 text-sm text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-md transition-all active:scale-95 stagger-item"
                      style={{ 
                        animationDelay: `${index * 50}ms`,
                        touchAction: 'manipulation' 
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </AccordionContent>
            </AccordionItem>

            {/* Projects Section */}
            <AccordionItem value="projects" className="bg-muted/30 rounded-lg border border-border/50 overflow-hidden">
              <AccordionTrigger 
                onClick={(e) => {
                  addRipple(e);
                  haptics.light();
                }}
                className="px-4 py-3 hover:no-underline hover:bg-muted/50 transition-colors [&[data-state=open]]:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-primary/10">
                    <Briefcase className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-semibold text-foreground">Projects</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2">
                <nav className="space-y-1">
                  {projectLinks.map((link, index) => (
                    <Link 
                      key={index}
                      to={link.href}
                      onClick={(e) => {
                        addRipple(e);
                        handleLinkClick(link.label, 'Projects');
                      }}
                      className="block py-2.5 px-3 text-sm text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-md transition-all active:scale-95 stagger-item"
                      style={{ 
                        animationDelay: `${index * 50}ms`,
                        touchAction: 'manipulation' 
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </AccordionContent>
            </AccordionItem>

            {/* Certifications Section */}
            <AccordionItem value="certifications" className="bg-muted/30 rounded-lg border border-border/50 overflow-hidden">
              <AccordionTrigger 
                onClick={(e) => {
                  addRipple(e);
                  haptics.light();
                }}
                className="px-4 py-3 hover:no-underline hover:bg-muted/50 transition-colors [&[data-state=open]]:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-primary/10">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-semibold text-foreground">{displayTrustItems ? 'Credentials' : 'Certifications'}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2">
                {displayTrustItems ? (
                  <div className="space-y-3">
                    {trustBarItems.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-background/50 rounded-md border border-border/30 stagger-item" style={{ animationDelay: `${index * 50}ms` }}>
                        <Shield className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-sm font-semibold text-foreground">{item.label}</div>
                          <div className="text-xs text-muted-foreground">{item.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {certifications.map((cert, index) => {
                      const Icon = cert.icon;
                      return (
                        <div key={index} className="flex items-start gap-3 p-3 bg-background/50 rounded-md border border-border/30 stagger-item" style={{ animationDelay: `${index * 50}ms` }}>
                          <Icon className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="text-sm font-semibold text-foreground">{cert.title}</div>
                            <div className="text-xs text-muted-foreground">{cert.subtitle}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Contact Card */}
          <div className="p-4 bg-gradient-to-br from-primary/5 via-primary/10 to-accent/5 rounded-lg border border-primary/20">
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2 text-foreground">
              <Phone className="h-4 w-4 text-primary" />
              Get In Touch
            </h3>
            <div className="space-y-2.5 text-sm">
              {contactInfo.phone && (
                <a 
                  href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`}
                  onClick={() => haptics.light()}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors min-h-[44px] active:scale-95"
                  style={{ touchAction: 'manipulation' }}
                >
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span className="font-medium">{contactInfo.phone}</span>
                </a>
              )}
              {contactInfo.email && (
                <a 
                  href={`mailto:${contactInfo.email}`}
                  onClick={() => haptics.light()}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors min-h-[44px] active:scale-95"
                  style={{ touchAction: 'manipulation' }}
                >
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span>{contactInfo.email}</span>
                </a>
              )}
              {contactInfo.address && (
                <div className="flex items-start gap-2 text-muted-foreground pt-1">
                  <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span className="text-xs leading-relaxed">{contactInfo.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Scroll Indicator */}
          {isScrollable && !isAtBottom && (
            <div className="fixed bottom-20 left-1/2 -translate-x-1/2 animate-bounce pointer-events-none">
              <div className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                <ChevronDown className="h-3 w-3" />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
