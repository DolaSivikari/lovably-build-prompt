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
import { Input } from "@/components/ui/input";
import { Phone, Search, Users, Building, Wrench, Star, X, Home, Mail, FileText, Briefcase, Sparkles, ChevronRight, Clock, TrendingUp, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { megaMenuDataEnhanced } from "@/data/navigation-structure-enhanced";
import { NAVIGATION_ICONS } from "@/data/navigation-icons";
import { NAVIGATION_DESCRIPTIONS } from "@/data/navigation-descriptions";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { MobileSearchResults } from "./MobileSearchResults";
import { EnhancedPopularServices } from "./EnhancedPopularServices";
import { SearchSuggestions } from "./SearchSuggestions";
import { RecentlyViewed } from "./RecentlyViewed";
import { useRecentSearches } from "@/hooks/useRecentSearches";
import { useNavigationHistory } from "@/hooks/useNavigationHistory";
import { useRecommendations } from "@/hooks/useRecommendations";
import { useSwipeGesture } from "@/hooks/useSwipeGesture";
import { useScrollIndicator } from "@/hooks/useScrollIndicator";
import { useStaggerAnimation } from "@/hooks/useStaggerAnimation";
import { haptics } from "@/utils/haptics";
import { NavCategoryCard } from "./NavCategoryCard";
import { ScreenReaderAnnouncement } from "@/components/ui/ScreenReaderAnnouncement";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface MobileNavSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileNavSheet({ open, onOpenChange }: MobileNavSheetProps) {
  const location = useLocation();
  const { searchQuery, setSearchQuery, filteredResults, isSearching, activeCategory, setActiveCategory } = useNavigationSearch();
  const { addRecentSearch } = useRecentSearches();
  const { trackNavigation, getRecentlyViewed } = useNavigationHistory();
  const { recommendations } = useRecommendations();
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [showMoreServices, setShowMoreServices] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const servicesContentRef = useRef<HTMLDivElement>(null);
  
  const { isScrollable: isServicesScrollable, isAtBottom: isServicesAtBottom, isAtTop: isServicesAtTop } = useScrollIndicator(servicesContentRef);
  
  const swipeGesture = useSwipeGesture(() => {
    haptics.medium();
    setAnnouncement("Navigation closed");
    onOpenChange(false);
  });

  const recentlyViewed = getRecentlyViewed(5);
  const allCategories = ["All", "Services", "Markets", "Projects", "Company", "Resources"];

  // Get all service items for Show More/Less functionality
  const allServiceItems = megaMenuDataEnhanced.services.flatMap(section => 
    section.categories.flatMap(cat => cat.subItems || [])
  );
  const visibleServiceItems = showMoreServices ? allServiceItems : allServiceItems.slice(0, 8);

  // Get icon component from name
  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon || ChevronRight;
  };

  const isActive = (path: string) => location.pathname === path;

  const handleLinkClick = (name?: string, category?: string) => {
    haptics.light();
    if (name && category) {
      trackNavigation(name, category);
    }
    onOpenChange(false);
    setSearchQuery("");
    setShowSearchSuggestions(false);
  };

  const handleClearSearch = () => {
    haptics.light();
    setSearchQuery("");
    setAnnouncement("Search cleared");
  };

  const handleSearchFocus = () => {
    setSearchFocused(true);
    if (!searchQuery) {
      setShowSearchSuggestions(true);
    }
  };

  const handleSearchBlur = () => {
    setTimeout(() => setSearchFocused(false), 200);
  };

  const handleCategoryClick = (category: string) => {
    haptics.light();
    setActiveCategory(category === "All" ? "" : category);
    setAnnouncement(`Filtered by ${category}`);
  };

  const handleSelectSearch = (query: string) => {
    haptics.light();
    setSearchQuery(query);
    addRecentSearch(query);
    setShowSearchSuggestions(false);
  };

  // Add ripple effect on touch
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

  // Stagger delays for animations
  const delays = useStaggerAnimation({ itemCount: 10, staggerDelay: 50 });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="left" 
        className="w-full sm:max-w-md overflow-y-auto p-0 animate-slide-in-right bg-gradient-to-br from-background via-background to-muted/20"
        style={{
          transform: `translateX(${swipeGesture.translateX}px)`,
          transition: swipeGesture.translateX === 0 ? 'transform 0.3s ease-out' : 'none',
        }}
        {...swipeGesture}
      >
        <ScreenReaderAnnouncement message={announcement} />
        
        {/* Swipe Indicator */}
        <div className="swipe-indicator" aria-hidden="true" />

        <SheetHeader className="p-6 pb-4 text-left border-b border-border/50 backdrop-blur-xl bg-background/80 sticky top-0 z-10 animate-fade-in">
          <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Navigation
          </SheetTitle>
          <SheetDescription className="text-base text-muted-foreground">
            Explore our complete range of services
          </SheetDescription>
        </SheetHeader>

        <div className="px-6 py-4">
          {/* Enhanced Search Bar with Gradient Border */}
          <div className="mb-4 search-input-focus">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary pointer-events-none" aria-hidden="true" />
              <Input
                type="search"
                placeholder="Search services, markets, projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                className="pl-11 pr-10 h-14 min-h-[44px] text-base touch-manipulation bg-background/50 backdrop-blur-sm border-2 border-border/50 focus:border-primary/50 rounded-[var(--radius-md)] shadow-lg"
                aria-label="Search navigation"
                aria-controls="search-results"
                aria-expanded={showSearchSuggestions || isSearching}
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-muted rounded-full transition-all hover:scale-110 touch-manipulation ripple"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            {isSearching && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-2 scrollbar-hide" role="tablist" aria-label="Filter by category">
                {allCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    onMouseDown={addRipple}
                    role="tab"
                    aria-selected={activeCategory === (category === "All" ? "" : category)}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 touch-manipulation ripple relative overflow-hidden",
                      activeCategory === (category === "All" ? "" : category)
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}

            {isSearching && (
              <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground animate-fade-in">
                <div className="h-1 w-1 rounded-full bg-primary animate-pulse" aria-hidden="true" />
                <span>Searching across all sections...</span>
              </div>
            )}
          </div>

          {/* Search Suggestions Dropdown */}
          {showSearchSuggestions && !isSearching && (
            <div className="mb-4 animate-fade-in">
              <SearchSuggestions
                mobile={true}
                onSelectSearch={handleSelectSearch}
                onNavigate={() => handleLinkClick()}
              />
            </div>
          )}

          {/* Conditional Rendering: Search Results OR Normal Navigation */}
          {isSearching ? (
            <div id="search-results" role="region" aria-label="Search results">
              <MobileSearchResults
                results={filteredResults}
                searchQuery={searchQuery}
                onLinkClick={() => handleLinkClick()}
              />
            </div>
          ) : (
            <>
              {/* Recently Viewed Section */}
              {recentlyViewed.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3 px-2">
                    <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      Recently Viewed
                    </h4>
                  </div>
                  <RecentlyViewed items={recentlyViewed} onLinkClick={() => handleLinkClick()} />
                </div>
              )}

              {/* Recommendations Section */}
              {recommendations.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3 px-2">
                    <TrendingUp className="h-4 w-4 text-secondary" aria-hidden="true" />
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      Recommended For You
                    </h4>
                  </div>
                  <div className="space-y-1">
                    {recommendations.map((item, index) => {
                      const IconComponent = getIcon(NAVIGATION_ICONS[item.link] || "ChevronRight");
                      const description = NAVIGATION_DESCRIPTIONS[item.link];
                      
                      return (
                        <Link
                          key={item.link}
                          to={item.link}
                          onClick={() => handleLinkClick(item.name, item.category)}
                          onMouseDown={addRipple}
                          className="group flex items-center gap-3 p-3 min-h-[56px] rounded-[var(--radius-md)] text-sm bg-background/50 backdrop-blur-sm border border-border/50 hover:border-secondary/30 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 touch-manipulation ripple relative overflow-hidden stagger-item"
                        >
                          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                            <IconComponent className="h-4 w-4 text-secondary" aria-hidden="true" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-foreground">{item.name}</div>
                            {description && (
                              <div className="text-xs text-muted-foreground">{description}</div>
                            )}
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {item.category}
                          </Badge>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Enhanced Popular Services Section */}
              <div>
                <EnhancedPopularServices onLinkClick={() => handleLinkClick()} />
              </div>

              {/* Quick Access Section */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-2">
                  Quick Access
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/"
                    onClick={() => handleLinkClick("Home", "Navigation")}
                    onMouseDown={addRipple}
                    className={cn(
                      "flex items-center gap-2 p-3 min-h-[56px] rounded-[var(--radius-md)] text-sm font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] touch-manipulation ripple relative overflow-hidden",
                      isActive("/")
                        ? "bg-gradient-to-br from-primary/20 to-primary/10 text-primary border-2 border-primary/30"
                        : "bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/30"
                    )}
                    aria-current={isActive("/") ? "page" : undefined}
                  >
                    <Home className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                    <span>Home</span>
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => handleLinkClick("Contact", "Navigation")}
                    onMouseDown={addRipple}
                    className={cn(
                      "flex items-center gap-2 p-3 min-h-[56px] rounded-[var(--radius-md)] text-sm font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] touch-manipulation ripple relative overflow-hidden",
                      isActive("/contact")
                        ? "bg-gradient-to-br from-secondary/20 to-secondary/10 text-secondary border-2 border-secondary/30"
                        : "bg-background/50 backdrop-blur-sm border border-border/50 hover:border-secondary/30"
                    )}
                    aria-current={isActive("/contact") ? "page" : undefined}
                  >
                    <Mail className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                    <span>Contact</span>
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => handleLinkClick("Request Quote", "Navigation")}
                    onMouseDown={addRipple}
                    className="flex items-center gap-2 p-3 min-h-[56px] rounded-[var(--radius-md)] text-sm font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] touch-manipulation bg-background/50 backdrop-blur-sm border border-border/50 hover:border-accent/30 ripple relative overflow-hidden"
                  >
                    <FileText className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                    <span>Request Quote</span>
                  </Link>
                  <Link
                    to="/resources/contractor-portal"
                    onClick={() => handleLinkClick("Portal", "Navigation")}
                    onMouseDown={addRipple}
                    className="flex items-center gap-2 p-3 min-h-[56px] rounded-[var(--radius-md)] text-sm font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] touch-manipulation bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 ripple relative overflow-hidden"
                  >
                    <Briefcase className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                    <span>Portal</span>
                  </Link>
                  <Link
                    to="/projects"
                    onClick={() => handleLinkClick("Projects", "Navigation")}
                    onMouseDown={addRipple}
                    className={cn(
                      "flex items-center gap-2 p-3 min-h-[56px] rounded-[var(--radius-md)] text-sm font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] touch-manipulation ripple relative overflow-hidden",
                      isActive("/projects")
                        ? "bg-gradient-to-br from-accent/20 to-accent/10 text-accent border-2 border-accent/30"
                        : "bg-background/50 backdrop-blur-sm border border-border/50 hover:border-accent/30"
                    )}
                    aria-current={isActive("/projects") ? "page" : undefined}
                  >
                    <Building className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                    <span>Projects</span>
                  </Link>
                </div>
              </div>

              {/* Enhanced Accordion Sections */}
              <Accordion 
                type="multiple" 
                className="space-y-4" 
                onValueChange={(value) => {
                  haptics.medium();
                  const actionText = value.length > 0 ? "expanded" : "collapsed";
                  setAnnouncement(`Section ${actionText}`);
                }}
              >
                {/* Services Section with Show More/Less */}
                <AccordionItem value="services" className="border border-border rounded-lg overflow-hidden transition-all duration-200 hover:border-primary/30 hover:shadow-sm">
                  <AccordionTrigger 
                    className="px-4 py-3.5 hover:no-underline bg-transparent hover:bg-muted/30 transition-colors [&[data-state=open]]:bg-muted/50 [&[data-state=open]]:text-primary touch-manipulation"
                    onMouseDown={addRipple}
                    aria-label="Services menu"
                  >
                    <NavCategoryCard
                      icon={Wrench}
                      title="Services"
                      itemCount={megaMenuDataEnhanced.services.reduce((acc, section) => acc + section.categories.length, 0)}
                      gradient="bg-gradient-to-br from-[hsl(24,95%,53%)] to-[hsl(20,91%,48%)]"
                      iconColor="text-white"
                    >
                      <span className="text-base font-bold">Services</span>
                    </NavCategoryCard>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 pt-2 relative" ref={servicesContentRef}>
                    {/* Scroll Indicators */}
                    {isServicesScrollable && !isServicesAtTop && (
                      <div className="scroll-fade-top" aria-hidden="true" />
                    )}
                    
                    {megaMenuDataEnhanced.services.map((section, sectionIndex) => (
                      <div key={section.sectionTitle} className="mb-3">
                        {sectionIndex > 0 && <Separator className="my-3" />}
                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2 px-2">
                          {section.sectionTitle}
                        </h4>
                        <div className="space-y-1">
                          {section.categories.map((category) => (
                            <div key={category.title} className="ml-1">
                              <div className="font-semibold text-sm py-1.5 px-2 text-foreground/90">{category.title}</div>
                              {category.subItems && (
                                <div className="ml-2 space-y-0.5">
                                  {category.subItems.map((item, itemIndex) => {
                                    const IconComponent = getIcon(NAVIGATION_ICONS[item.link] || "ChevronRight");
                                    const description = NAVIGATION_DESCRIPTIONS[item.link];
                                    
                                    return (
                                      <Link
                                        key={item.link}
                                        to={item.link}
                                        onClick={() => handleLinkClick(item.name, "Services")}
                                        onMouseDown={addRipple}
                                        className="group flex items-center gap-2 py-2.5 px-3 min-h-[44px] text-sm text-muted-foreground border-l-2 border-transparent hover:text-primary hover:bg-muted/30 hover:border-l-primary hover:pl-4 active:scale-[0.98] transition-all duration-200 touch-manipulation stagger-item"
                                        aria-label={`${item.name}${description ? `: ${description}` : ""}`}
                                      >
                                        <IconComponent className="h-4 w-4 flex-shrink-0 text-primary/60" aria-hidden="true" />
                                        <div className="flex-1 min-w-0">
                                          <span className="group-hover:translate-x-0.5 transition-transform block">{item.name}</span>
                                          {description && (
                                            <span className="text-xs text-muted-foreground/70 block">{description}</span>
                                          )}
                                        </div>
                                        {item.badge && (
                                          <Badge variant={item.badge === "new" ? "secondary" : "default"} size="xs" className="ml-2">
                                            {item.badge === "new" ? <Sparkles className="h-3 w-3" aria-hidden="true" /> : <Star className="h-3 w-3" aria-hidden="true" />}
                                          </Badge>
                                        )}
                                      </Link>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    {isServicesScrollable && !isServicesAtBottom && (
                      <div className="scroll-fade-bottom" aria-hidden="true" />
                    )}
                  </AccordionContent>
                </AccordionItem>

                {/* Markets Section */}
                <AccordionItem value="markets" className="border border-border rounded-lg overflow-hidden transition-all duration-200 hover:border-primary/30 hover:shadow-sm">
                  <AccordionTrigger 
                    className="px-4 py-3.5 hover:no-underline bg-transparent hover:bg-muted/30 transition-colors [&[data-state=open]]:bg-muted/50 [&[data-state=open]]:text-primary touch-manipulation"
                    onMouseDown={addRipple}
                    aria-label="Markets menu"
                  >
                    <NavCategoryCard
                      icon={Building}
                      title="Markets"
                      itemCount={megaMenuDataEnhanced.markets.reduce((acc, section) => acc + section.categories.length, 0)}
                      gradient="bg-gradient-to-br from-[hsl(217,91%,60%)] to-[hsl(221,83%,53%)]"
                      iconColor="text-white"
                    >
                      <span className="text-base font-bold">Markets</span>
                    </NavCategoryCard>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 pt-2">
                    {megaMenuDataEnhanced.markets.map((section, sectionIndex) => (
                      <div key={section.sectionTitle} className="mb-3">
                        {sectionIndex > 0 && <Separator className="my-3" />}
                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2 px-2">
                          {section.sectionTitle}
                        </h4>
                        <div className="space-y-1">
                          {section.categories.map((category) => (
                            <div key={category.title} className="ml-1">
                              <div className="font-semibold text-sm py-1.5 px-2 text-foreground/90">{category.title}</div>
                              {category.subItems && (
                                <div className="ml-2 space-y-0.5">
                                  {category.subItems.map((item, itemIndex) => {
                                    const IconComponent = getIcon(NAVIGATION_ICONS[item.link] || "ChevronRight");
                                    const description = NAVIGATION_DESCRIPTIONS[item.link];
                                    
                                    return (
                                      <Link
                                        key={item.link}
                                        to={item.link}
                                        onClick={() => handleLinkClick(item.name, "Markets")}
                                        onMouseDown={addRipple}
                                        className="group flex items-center gap-2 py-2.5 px-3 min-h-[44px] text-sm text-muted-foreground border-l-2 border-transparent hover:text-primary hover:bg-muted/30 hover:border-l-primary hover:pl-4 active:scale-[0.98] transition-all duration-200 touch-manipulation stagger-item"
                                        aria-label={`${item.name}${description ? `: ${description}` : ""}`}
                                      >
                                        <IconComponent className="h-4 w-4 flex-shrink-0 text-secondary/60" aria-hidden="true" />
                                        <div className="flex-1 min-w-0">
                                          <span className="group-hover:translate-x-0.5 transition-transform block">{item.name}</span>
                                          {description && (
                                            <span className="text-xs text-muted-foreground/70 block">{description}</span>
                                          )}
                                        </div>
                                        {item.badge === "new" && (
                                          <Badge variant="secondary" size="xs" className="ml-2">
                                            <Sparkles className="h-3 w-3" aria-hidden="true" />
                                          </Badge>
                                        )}
                                      </Link>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>

                {/* Company Section */}
                <AccordionItem value="company" className="border border-border rounded-lg overflow-hidden transition-all duration-200 hover:border-primary/30 hover:shadow-sm">
                  <AccordionTrigger 
                    className="px-4 py-3.5 hover:no-underline bg-transparent hover:bg-muted/30 transition-colors [&[data-state=open]]:bg-muted/50 [&[data-state=open]]:text-primary touch-manipulation"
                    onMouseDown={addRipple}
                    aria-label="Company menu"
                  >
                    <NavCategoryCard
                      icon={Users}
                      title="Company"
                      itemCount={megaMenuDataEnhanced.company.reduce((acc, section) => acc + section.categories.length, 0)}
                      gradient="bg-gradient-to-br from-[hsl(221,83%,53%)] to-[hsl(230,81%,48%)]"
                      iconColor="text-white"
                    >
                      <span className="text-base font-bold">Company</span>
                    </NavCategoryCard>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 pt-2">
                    {megaMenuDataEnhanced.company.map((section, sectionIndex) => (
                      <div key={section.sectionTitle} className="mb-3">
                        {sectionIndex > 0 && <Separator className="my-3" />}
                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2 px-2">
                          {section.sectionTitle}
                        </h4>
                        <div className="space-y-1">
                          {section.categories.map((category) => (
                            <div key={category.title} className="ml-1">
                              {category.subItems && (
                                <div className="space-y-0.5">
                                  {category.subItems.map((item, itemIndex) => {
                                    const IconComponent = getIcon(NAVIGATION_ICONS[item.link] || "ChevronRight");
                                    const description = NAVIGATION_DESCRIPTIONS[item.link];
                                    
                                    return (
                                      <Link
                                        key={item.link}
                                        to={item.link}
                                        onClick={() => handleLinkClick(item.name, "Company")}
                                        onMouseDown={addRipple}
                                        className="group flex items-center gap-2 py-2.5 px-3 min-h-[44px] text-sm text-muted-foreground border-l-2 border-transparent hover:text-primary hover:bg-muted/30 hover:border-l-primary hover:pl-4 active:scale-[0.98] transition-all duration-200 touch-manipulation stagger-item"
                                        aria-label={`${item.name}${description ? `: ${description}` : ""}`}
                                      >
                                        <IconComponent className="h-4 w-4 flex-shrink-0 text-primary/60" aria-hidden="true" />
                                        <div className="flex-1 min-w-0">
                                          <span className="group-hover:translate-x-0.5 transition-transform block">{item.name}</span>
                                          {description && (
                                            <span className="text-xs text-muted-foreground/70 block">{description}</span>
                                          )}
                                        </div>
                                        {item.badge === "new" && (
                                          <Badge variant="secondary" size="xs" className="ml-2">
                                            <Sparkles className="h-3 w-3" aria-hidden="true" />
                                          </Badge>
                                        )}
                                        {item.badge === "important" && (
                                          <Badge variant="default" size="xs" className="ml-2">
                                            <Star className="h-3 w-3" aria-hidden="true" />
                                          </Badge>
                                        )}
                                      </Link>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>

                {/* Resources Section */}
                <AccordionItem value="resources" className="border border-border rounded-lg overflow-hidden transition-all duration-200 hover:border-primary/30 hover:shadow-sm">
                  <AccordionTrigger 
                    className="px-4 py-3.5 hover:no-underline bg-transparent hover:bg-muted/30 transition-colors [&[data-state=open]]:bg-muted/50 [&[data-state=open]]:text-primary touch-manipulation"
                    onMouseDown={addRipple}
                    aria-label="Resources menu"
                  >
                    <NavCategoryCard
                      icon={Building}
                      title="Resources"
                      itemCount={megaMenuDataEnhanced.resources.reduce((acc, section) => acc + section.categories.length, 0)}
                      gradient="bg-gradient-to-br from-[hsl(262,83%,58%)] to-[hsl(251,91%,60%)]"
                      iconColor="text-white"
                    >
                      <span className="text-base font-bold">Resources</span>
                    </NavCategoryCard>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 pt-2">
                    {megaMenuDataEnhanced.resources.map((section, sectionIndex) => (
                      <div key={section.sectionTitle} className="mb-3">
                        {sectionIndex > 0 && <Separator className="my-3" />}
                        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2 px-2">
                          {section.sectionTitle}
                        </h4>
                        <div className="space-y-1">
                          {section.categories.map((category) => (
                            <div key={category.title} className="ml-1">
                              {category.subItems && (
                                <div className="space-y-0.5">
                                  {category.subItems.map((item, itemIndex) => {
                                    const IconComponent = getIcon(NAVIGATION_ICONS[item.link] || "ChevronRight");
                                    const description = NAVIGATION_DESCRIPTIONS[item.link];
                                    
                                    return (
                                      <Link
                                        key={item.link}
                                        to={item.link}
                                        onClick={() => handleLinkClick(item.name, "Resources")}
                                        onMouseDown={addRipple}
                                        className="group flex items-center gap-2 py-2.5 px-3 min-h-[44px] text-sm text-muted-foreground border-l-2 border-transparent hover:text-primary hover:bg-muted/30 hover:border-l-primary hover:pl-4 active:scale-[0.98] transition-all duration-200 touch-manipulation stagger-item"
                                        aria-label={`${item.name}${description ? `: ${description}` : ""}`}
                                      >
                                        <IconComponent className="h-4 w-4 flex-shrink-0 text-secondary/60" aria-hidden="true" />
                                        <div className="flex-1 min-w-0">
                                          <span className="group-hover:translate-x-0.5 transition-transform block">{item.name}</span>
                                          {description && (
                                            <span className="text-xs text-muted-foreground/70 block">{description}</span>
                                          )}
                                        </div>
                                        {item.badge === "new" && (
                                          <Badge variant="secondary" size="xs" className="ml-2">
                                            <Sparkles className="h-3 w-3" aria-hidden="true" />
                                          </Badge>
                                        )}
                                        {item.badge === "important" && (
                                          <Badge variant="default" size="xs" className="ml-2">
                                            <Star className="h-3 w-3" aria-hidden="true" />
                                          </Badge>
                                        )}
                                      </Link>
                                    );
                                  })}
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
            </>
          )}
        </div>

        {/* Enhanced Pinned CTA at bottom */}
        <div className="sticky bottom-0 left-0 right-0 p-4 border-t border-border/50 bottom-cta-enhanced backdrop-blur-xl animate-fade-in z-20">
          <Button
            asChild
            size="lg"
            className="w-full gap-3 min-h-[56px] text-base font-bold active:scale-[0.98] transition-all duration-300 bg-gradient-to-r from-primary to-primary-dark hover:shadow-2xl hover:-translate-y-0.5 text-white touch-manipulation relative overflow-hidden group ripple"
            onMouseDown={addRipple}
          >
            <Link to="/contact" onClick={() => handleLinkClick("Request Site Assessment", "CTA")} aria-label="Request a site assessment for your project">
              <Phone className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" aria-hidden="true" />
              <span>Request Site Assessment</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
