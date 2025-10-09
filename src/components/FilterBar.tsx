import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, X, Building2, Home, School, Factory, Grid3x3, List } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedYear: string;
  onYearChange: (year: string) => void;
  categories: Array<{ label: string; value: string; icon: any }>;
  years: string[];
  projectCount: number;
  viewMode?: "grid" | "list";
  onViewModeChange?: (mode: "grid" | "list") => void;
}

const FilterBar = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedYear,
  onYearChange,
  categories,
  years,
  projectCount,
  viewMode = "grid",
  onViewModeChange,
}: FilterBarProps) => {
  const activeFiltersCount = [selectedCategory !== "All", selectedYear !== "All", searchTerm !== ""].filter(Boolean).length;

  const clearFilters = () => {
    onSearchChange("");
    onCategoryChange("All");
    onYearChange("All");
  };

  return (
    <div className="sticky top-20 z-30 bg-background/95 backdrop-blur-lg border-b shadow-sm">
      <div className="container mx-auto px-4 py-6 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Search projects by name, location, or description..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-12 text-base"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSearchChange("")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Button
                key={cat.value}
                variant={selectedCategory === cat.value ? "default" : "outline"}
                onClick={() => onCategoryChange(cat.value)}
                className={cn(
                  "rounded-full transition-all",
                  selectedCategory === cat.value && "shadow-lg"
                )}
              >
                <Icon className="w-4 h-4 mr-2" />
                {cat.label}
              </Button>
            );
          })}
        </div>

        {/* Year Filter and View Toggle */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {years.map((year) => (
              <Button
                key={year}
                variant={selectedYear === year ? "secondary" : "ghost"}
                size="sm"
                onClick={() => onYearChange(year)}
                className="rounded-full"
              >
                {year}
              </Button>
            ))}
          </div>

          {onViewModeChange && (
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => onViewModeChange("grid")}
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => onViewModeChange("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Active Filters and Results Count */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {projectCount} {projectCount === 1 ? "project" : "projects"} found
            </span>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary">
                {activeFiltersCount} {activeFiltersCount === 1 ? "filter" : "filters"} active
              </Badge>
            )}
          </div>
          
          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="w-4 h-4 mr-2" />
              Clear Filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
