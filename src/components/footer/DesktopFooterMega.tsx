import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Search, Clock, TrendingUp, X, Building2, Wrench, Target, 
  Briefcase, Shield, ChevronRight, Sparkles
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigationHistory } from "@/hooks/useNavigationHistory";
import { useRecommendations } from "@/hooks/useRecommendations";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { usePopularSearches } from "@/hooks/usePopularSearches";
import { NAVIGATION_ICONS } from "@/data/navigation-icons";
import { NAVIGATION_DESCRIPTIONS } from "@/data/navigation-descriptions";

interface DesktopFooterMegaProps {
  companyLinks: Array<{ label: string; href: string }>;
  services: Array<{ name: string; slug: string; service_tier?: string }>;
  marketLinks: Array<{ label: string; href: string }>;
  projectLinks: Array<{ label: string; href: string }>;
  certifications: Array<{ icon: any; title: string; subtitle: string }>;
  displayTrustItems: boolean;
  trustBarItems: Array<{ label: string; value: string }>;
}

export function DesktopFooterMega({
  companyLinks,
  services,
  marketLinks,
  projectLinks,
  certifications,
  displayTrustItems,
  trustBarItems
}: DesktopFooterMegaProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const { history, trackNavigation, getRecentlyViewed } = useNavigationHistory();
  const { recommendations } = useRecommendations();
  const { popularSearches } = usePopularSearches();
  const { 
    setSearchQuery: setNavSearchQuery,
    filteredResults 
  } = useNavigationSearch();

  // Sync search with navigation search
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setNavSearchQuery(value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setNavSearchQuery("");
  };

  const handleLinkClick = (name: string, category: string) => {
    trackNavigation(name, category);
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const recentlyViewed = getRecentlyViewed(5);
  const hasSearchResults = searchQuery.length > 0;
  const showSearchDropdown = searchFocused && (hasSearchResults || recentlyViewed.length > 0 || popularSearches.length > 0);

  return (
    <div className="hidden md:block">
      <div className="grid grid-cols-12 gap-8 mb-12">
        
        {/* Main Content - 9 columns */}
        <div className="col-span-9 space-y-8">
          
          {/* Search Bar with Dropdown */}
          <div className="relative" ref={searchRef}>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary pointer-events-none" />
              <Input
                type="search"
                placeholder="Quick search footer links..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                className="pl-12 pr-12 h-12 bg-muted/30 border-border/50 hover:bg-muted/50 focus:bg-background transition-all text-base"
                aria-label="Search footer navigation"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-background"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Search Dropdown */}
            {showSearchDropdown && (
              <Card className="absolute top-full mt-2 w-full p-4 shadow-2xl border-2 border-primary/10 z-50 max-h-[500px] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                
                {/* Search Results */}
                {hasSearchResults ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs text-muted-foreground font-medium">
                        {filteredResults.length} results found
                      </p>
                    </div>
                    
                    {filteredResults.length > 0 ? (
                      <div className="space-y-1">
                        {filteredResults.map((result, index) => {
                          const Icon = NAVIGATION_ICONS[result.link] || Briefcase;
                          return (
                            <Link
                              key={`${result.link}-${index}`}
                              to={result.link}
                              onClick={() => {
                                handleLinkClick(result.name, result.category);
                                setSearchFocused(false);
                              }}
                              onMouseEnter={() => setHoveredLink(result.link)}
                              onMouseLeave={() => setHoveredLink(null)}
                              className="block p-3 hover:bg-muted/60 rounded-lg transition-all group border border-transparent hover:border-primary/20"
                            >
                              <div className="flex items-start gap-3">
                                <div className="p-2 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                                  <Icon className="h-4 w-4 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                                      {result.name}
                                    </span>
                                    {result.badge && (
                                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5">
                                        {result.badge}
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="text-xs text-muted-foreground mt-0.5">
                                    {result.category} • {result.section}
                                  </div>
                                  {hoveredLink === result.link && NAVIGATION_DESCRIPTIONS[result.link] && (
                                    <p className="text-xs text-muted-foreground/80 mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
                                      {NAVIGATION_DESCRIPTIONS[result.link]}
                                    </p>
                                  )}
                                </div>
                                <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" />
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">
                        <p className="text-sm">No results found</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    {/* Recently Viewed */}
                    {recentlyViewed.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2 px-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Recently Viewed
                          </h4>
                        </div>
                        <div className="space-y-1">
                          {recentlyViewed.map((item, index) => {
                            const Icon = NAVIGATION_ICONS[item.path] || Briefcase;
                            return (
                              <Link
                                key={`${item.path}-${index}`}
                                to={item.path}
                                onClick={() => {
                                  handleLinkClick(item.name, item.category);
                                  setSearchFocused(false);
                                }}
                                className="flex items-center gap-3 p-2 hover:bg-muted/60 rounded-lg transition-all group"
                              >
                                <div className="p-1.5 rounded-md bg-primary/10">
                                  <Icon className="h-3.5 w-3.5 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                                    {item.name}
                                  </div>
                                </div>
                                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Popular Searches */}
                    {popularSearches.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-2 px-1">
                          <TrendingUp className="h-4 w-4 text-muted-foreground" />
                          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Popular Searches
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {popularSearches.map((search, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setSearchQuery(search.query);
                                setNavSearchQuery(search.query);
                              }}
                              className="px-3 py-1.5 bg-muted/50 hover:bg-muted rounded-full text-xs font-medium text-foreground hover:text-primary transition-all hover:scale-105"
                            >
                              {search.query}
                              <span className="ml-1.5 text-muted-foreground">({search.count})</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </Card>
            )}
          </div>

          {/* Main Grid - 4 columns */}
          <div className="grid grid-cols-4 gap-6">
            
            {/* Company Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-md bg-primary/10">
                  <Building2 className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-xs font-bold text-primary uppercase tracking-wider">
                  Company
                </h3>
              </div>
              <nav>
                <ul className="space-y-2">
                  {companyLinks.map((link, index) => (
                    <li key={index}>
                      <Link 
                        to={link.href}
                        onClick={() => handleLinkClick(link.label, 'Company')}
                        onMouseEnter={() => setHoveredLink(link.href)}
                        onMouseLeave={() => setHoveredLink(null)}
                        className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-all py-1"
                      >
                        <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                        <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Services Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-md bg-primary/10">
                  <Wrench className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-xs font-bold text-primary uppercase tracking-wider">
                  Services
                </h3>
                <Badge variant="secondary" className="ml-auto text-[10px] px-1.5 py-0 h-5">
                  {services.length}
                </Badge>
              </div>
              <nav>
                <ul className="space-y-2 max-h-[300px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-muted [&::-webkit-scrollbar-thumb]:bg-primary/30 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-primary/50">
                  {services.map((service, index) => {
                    const Icon = NAVIGATION_ICONS[`/services/${service.slug}`] || Wrench;
                    return (
                      <li key={index}>
                        <Link 
                          to={`/services/${service.slug}`}
                          onClick={() => handleLinkClick(service.name, 'Services')}
                          onMouseEnter={() => setHoveredLink(`/services/${service.slug}`)}
                          onMouseLeave={() => setHoveredLink(null)}
                          className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-all py-1"
                        >
                          <Icon className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                          <span className="group-hover:translate-x-1 transition-transform line-clamp-1">{service.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            {/* Markets Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-md bg-primary/10">
                  <Target className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-xs font-bold text-primary uppercase tracking-wider">
                  Markets
                </h3>
              </div>
              <nav>
                <ul className="space-y-2">
                  {marketLinks.map((link, index) => (
                    <li key={index}>
                      <Link 
                        to={link.href}
                        onClick={() => handleLinkClick(link.label, 'Markets')}
                        onMouseEnter={() => setHoveredLink(link.href)}
                        onMouseLeave={() => setHoveredLink(null)}
                        className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-all py-1"
                      >
                        <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                        <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Projects Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-md bg-primary/10">
                  <Briefcase className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-xs font-bold text-primary uppercase tracking-wider">
                  Projects
                </h3>
              </div>
              <nav>
                <ul className="space-y-2">
                  {projectLinks.map((link, index) => (
                    <li key={index}>
                      <Link 
                        to={link.href}
                        onClick={() => handleLinkClick(link.label, 'Projects')}
                        onMouseEnter={() => setHoveredLink(link.href)}
                        onMouseLeave={() => setHoveredLink(null)}
                        className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-all py-1"
                      >
                        <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                        <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {/* Sidebar - 3 columns */}
        <div className="col-span-3 space-y-6">
          
          {/* Recommendations Card */}
          {recommendations.length > 0 && (
            <Card className="p-5 bg-gradient-to-br from-primary/5 via-primary/10 to-accent/5 border-primary/20">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-4 w-4 text-primary" />
                <h3 className="text-xs font-bold text-primary uppercase tracking-wider">
                  Recommended For You
                </h3>
              </div>
              <div className="space-y-2">
                {recommendations.map((rec, index) => {
                  const Icon = NAVIGATION_ICONS[rec.link] || Briefcase;
                  return (
                    <Link
                      key={`${rec.link}-${index}`}
                      to={rec.link}
                      onClick={() => handleLinkClick(rec.name, rec.category)}
                      className="block p-3 bg-background/50 hover:bg-background rounded-lg transition-all group border border-transparent hover:border-primary/30 hover:shadow-md"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-md bg-accent/10 group-hover:bg-accent/20 transition-colors">
                          <Icon className="h-4 w-4 text-accent" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                            {rec.name}
                          </div>
                          <div className="text-xs text-muted-foreground">{rec.category}</div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </Card>
          )}

          {/* Certifications Card */}
          <Card className="p-5 border-border/50">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-4 w-4 text-primary" />
              <h3 className="text-xs font-bold text-primary uppercase tracking-wider">
                {displayTrustItems ? 'Credentials' : 'Certifications'}
              </h3>
            </div>
            <div className="space-y-3">
              {displayTrustItems ? (
                <>
                  {trustBarItems.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-3 p-2.5 bg-muted/30 rounded-md hover:bg-muted/50 transition-colors group"
                    >
                      <Shield className="w-4 h-4 text-accent flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div>
                        <div className="text-xs font-semibold text-foreground">{item.label}</div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {certifications.map((cert, index) => {
                    const Icon = cert.icon;
                    return (
                      <div 
                        key={index} 
                        className="flex items-start gap-3 p-2.5 bg-muted/30 rounded-md hover:bg-muted/50 transition-colors group"
                      >
                        <Icon className="w-4 h-4 text-accent flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                        <div>
                          <div className="text-xs font-semibold text-foreground">{cert.title}</div>
                          <div className="text-[10px] text-muted-foreground mt-0.5">{cert.subtitle}</div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
