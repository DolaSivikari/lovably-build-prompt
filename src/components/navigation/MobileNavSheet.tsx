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
import { Phone, Search, Users, Building, Wrench, Star, X, Home, Mail, FileText, Briefcase, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { megaMenuDataEnhanced } from "@/data/navigation-structure-enhanced";
import { useNavigationSearch } from "@/hooks/useNavigationSearch";
import { MobileSearchResults } from "./MobileSearchResults";
import { EnhancedPopularServices } from "./EnhancedPopularServices";
import { SearchSuggestions } from "./SearchSuggestions";
import { RecentlyViewed } from "./RecentlyViewed";
import { useRecentSearches } from "@/hooks/useRecentSearches";
import { useNavigationHistory } from "@/hooks/useNavigationHistory";
import { useRecommendations } from "@/hooks/useRecommendations";
import { useSwipeGesture } from "@/hooks/useSwipeGesture";
import { haptics } from "@/utils/haptics";
import { NavCategoryCard } from "./NavCategoryCard";
import { useState } from "react";

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
  
  const swipeGesture = useSwipeGesture(() => {
    haptics.medium();
    onOpenChange(false);
  });

  const isActive = (path: string) => location.pathname === path;

  const handleLinkClick = () => {
    onOpenChange(false);
    setSearchQuery(""); // Clear search on navigation
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="left" 
        className="w-full sm:max-w-md overflow-y-auto p-0 animate-slide-in-right bg-gradient-to-br from-background via-background to-muted/20"
      >
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
          <div className="mb-6 animate-fade-in search-input-focus" style={{ animationDelay: "0.1s" }}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary pointer-events-none" />
              <Input
                type="search"
                placeholder="Search services, markets, projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 pr-10 h-14 min-h-[44px] text-base touch-manipulation bg-background/50 backdrop-blur-sm border-2 border-border/50 focus:border-primary/50 rounded-[var(--radius-md)] shadow-lg"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-muted rounded-full transition-all hover:scale-110 touch-manipulation"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>
            {isSearching && (
              <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground animate-fade-in">
                <div className="h-1 w-1 rounded-full bg-primary animate-pulse" />
                <span>Searching across all sections...</span>
              </div>
            )}
          </div>

          {/* Conditional Rendering: Search Results OR Normal Navigation */}
          {isSearching ? (
            <MobileSearchResults
              results={filteredResults}
              searchQuery={searchQuery}
              onLinkClick={handleLinkClick}
            />
          ) : (
            <>
              {/* Enhanced Popular Services Section */}
              <EnhancedPopularServices onLinkClick={handleLinkClick} />
          {/* Quick Access Section */}
          <div className="mb-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 px-2">
              Quick Access
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/"
                onClick={handleLinkClick}
                className={`flex items-center gap-2 p-3 min-h-[56px] rounded-[var(--radius-md)] text-sm font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] touch-manipulation ${
                  isActive("/")
                    ? "bg-gradient-to-br from-primary/20 to-primary/10 text-primary border-2 border-primary/30"
                    : "bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/30"
                }`}
              >
                <Home className="h-5 w-5 flex-shrink-0" />
                <span>Home</span>
              </Link>
              <Link
                to="/contact"
                onClick={handleLinkClick}
                className={`flex items-center gap-2 p-3 min-h-[56px] rounded-[var(--radius-md)] text-sm font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] touch-manipulation ${
                  isActive("/contact")
                    ? "bg-gradient-to-br from-secondary/20 to-secondary/10 text-secondary border-2 border-secondary/30"
                    : "bg-background/50 backdrop-blur-sm border border-border/50 hover:border-secondary/30"
                }`}
              >
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span>Contact</span>
              </Link>
              <Link
                to="/submit-rfp"
                onClick={handleLinkClick}
                className="flex items-center gap-2 p-3 min-h-[56px] rounded-[var(--radius-md)] text-sm font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] touch-manipulation bg-background/50 backdrop-blur-sm border border-border/50 hover:border-accent/30"
              >
                <FileText className="h-5 w-5 flex-shrink-0" />
                <span>Submit RFP</span>
              </Link>
              <Link
                to="/resources/contractor-portal"
                onClick={handleLinkClick}
                className="flex items-center gap-2 p-3 min-h-[56px] rounded-[var(--radius-md)] text-sm font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] touch-manipulation bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/30"
              >
                <Briefcase className="h-5 w-5 flex-shrink-0" />
                <span>Portal</span>
              </Link>
            </div>
          </div>

          {/* Enhanced Accordion Sections */}
          <Accordion type="multiple" className="space-y-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            {/* Services Section */}
            <AccordionItem value="services" className="border-none">
              <AccordionTrigger className="px-4 py-4 min-h-[68px] hover:no-underline rounded-[var(--radius-md)] font-semibold transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-background/80 to-background/50 backdrop-blur-sm border border-border/50 hover:border-[hsl(24,95%,53%)]/30 touch-manipulation group">
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
              <AccordionContent className="px-4 pb-4 pt-2">
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
                              {category.subItems.map((item) => (
                                <Link
                                  key={item.link}
                                  to={item.link}
                                  onClick={handleLinkClick}
                                  className="group flex items-center justify-between py-2.5 px-3 min-h-[44px] text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 active:scale-[0.98] rounded-[var(--radius-xs)] transition-all duration-200 touch-manipulation"
                                >
                                  <span className="group-hover:translate-x-0.5 transition-transform">{item.name}</span>
                                  {item.badge && (
                                    <Badge variant={item.badge === "new" ? "secondary" : "default"} size="xs" className="ml-2">
                                      {item.badge === "new" ? <Sparkles className="h-3 w-3" /> : <Star className="h-3 w-3" />}
                                    </Badge>
                                  )}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>

            {/* Markets Section */}
            <AccordionItem value="markets" className="border-none">
              <AccordionTrigger className="px-4 py-4 min-h-[68px] hover:no-underline rounded-[var(--radius-md)] font-semibold transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-background/80 to-background/50 backdrop-blur-sm border border-border/50 hover:border-[hsl(217,91%,60%)]/30 touch-manipulation group">
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
                              {category.subItems.map((item) => (
                                <Link
                                  key={item.link}
                                  to={item.link}
                                  onClick={handleLinkClick}
                                  className="group flex items-center justify-between py-2.5 px-3 min-h-[44px] text-sm text-muted-foreground hover:text-secondary hover:bg-secondary/5 active:scale-[0.98] rounded-[var(--radius-xs)] transition-all duration-200 touch-manipulation"
                                >
                                  <span className="group-hover:translate-x-0.5 transition-transform">{item.name}</span>
                                  {item.badge === "new" && (
                                    <Badge variant="secondary" size="xs" className="ml-2">
                                      <Sparkles className="h-3 w-3" />
                                    </Badge>
                                  )}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>

            {/* Projects Section */}
            <AccordionItem value="projects" className="border-none">
              <AccordionTrigger className="px-4 py-4 min-h-[68px] hover:no-underline rounded-[var(--radius-md)] font-semibold transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-background/80 to-background/50 backdrop-blur-sm border border-border/50 hover:border-[hsl(173,58%,39%)]/30 touch-manipulation group">
                <NavCategoryCard
                  icon={Building}
                  title="Projects"
                  itemCount={megaMenuDataEnhanced.projects.reduce((acc, section) => acc + section.categories.length, 0)}
                  gradient="bg-gradient-to-br from-[hsl(158,64%,52%)] to-[hsl(173,58%,39%)]"
                  iconColor="text-white"
                >
                  <span className="text-base font-bold">Projects</span>
                </NavCategoryCard>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 pt-2">
                {megaMenuDataEnhanced.projects.map((section) => (
                  <div key={section.sectionTitle} className="mb-3">
                    <div className="space-y-0.5">
                      {section.categories.map((category) => (
                        <div key={category.title} className="ml-1">
                          {category.subItems && (
                            <div className="space-y-0.5">
                              {category.subItems.map((item) => (
                                <Link
                                  key={item.link}
                                  to={item.link}
                                  onClick={handleLinkClick}
                                  className="group flex items-center justify-between py-2.5 px-3 min-h-[44px] text-sm text-muted-foreground hover:text-accent hover:bg-accent/5 active:scale-[0.98] rounded-[var(--radius-xs)] transition-all duration-200 touch-manipulation"
                                >
                                  <span className="group-hover:translate-x-0.5 transition-transform">{item.name}</span>
                                  {item.badge === "popular" && (
                                    <Badge variant="warning" size="xs" className="ml-2">
                                      <Star className="h-3 w-3" />
                                    </Badge>
                                  )}
                                </Link>
                              ))}
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
            <AccordionItem value="company" className="border-none">
              <AccordionTrigger className="px-4 py-4 min-h-[68px] hover:no-underline rounded-[var(--radius-md)] font-semibold transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-background/80 to-background/50 backdrop-blur-sm border border-border/50 hover:border-[hsl(221,83%,53%)]/30 touch-manipulation group">
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
                              {category.subItems.map((item) => (
                                <Link
                                  key={item.link}
                                  to={item.link}
                                  onClick={handleLinkClick}
                                  className="group flex items-center justify-between py-2.5 px-3 min-h-[44px] text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 active:scale-[0.98] rounded-[var(--radius-xs)] transition-all duration-200 touch-manipulation"
                                >
                                  <span className="group-hover:translate-x-0.5 transition-transform">{item.name}</span>
                                  {item.badge === "new" && (
                                    <Badge variant="secondary" size="xs" className="ml-2">
                                      <Sparkles className="h-3 w-3" />
                                    </Badge>
                                  )}
                                  {item.badge === "important" && (
                                    <Badge variant="default" size="xs" className="ml-2">
                                      <Star className="h-3 w-3" />
                                    </Badge>
                                  )}
                                </Link>
                              ))}
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
            <AccordionItem value="resources" className="border-none">
              <AccordionTrigger className="px-4 py-4 min-h-[68px] hover:no-underline rounded-[var(--radius-md)] font-semibold transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-background/80 to-background/50 backdrop-blur-sm border border-border/50 hover:border-[hsl(262,83%,58%)]/30 touch-manipulation group">
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
                              {category.subItems.map((item) => (
                                <Link
                                  key={item.link}
                                  to={item.link}
                                  onClick={handleLinkClick}
                                  className="group flex items-center justify-between py-2.5 px-3 min-h-[44px] text-sm text-muted-foreground hover:text-secondary hover:bg-secondary/5 active:scale-[0.98] rounded-[var(--radius-xs)] transition-all duration-200 touch-manipulation"
                                >
                                  <span className="group-hover:translate-x-0.5 transition-transform">{item.name}</span>
                                  {item.badge === "new" && (
                                    <Badge variant="secondary" size="xs" className="ml-2">
                                      <Sparkles className="h-3 w-3" />
                                    </Badge>
                                  )}
                                  {item.badge === "important" && (
                                    <Badge variant="default" size="xs" className="ml-2">
                                      <Star className="h-3 w-3" />
                                    </Badge>
                                  )}
                                </Link>
                              ))}
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
            className="w-full gap-3 min-h-[56px] text-base font-bold active:scale-[0.98] transition-all duration-300 bg-gradient-to-r from-primary to-primary-dark hover:shadow-2xl hover:-translate-y-0.5 text-white touch-manipulation relative overflow-hidden group"
          >
            <Link to="/estimate" onClick={handleLinkClick}>
              <Phone className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
              <span>Request Proposal</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
