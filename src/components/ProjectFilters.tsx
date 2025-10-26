/**
 * Project Filters Component - Phase 5
 * Advanced filtering for projects page
 */
import { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { X, Filter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

interface ProjectFiltersProps {
  selectedClientTypes: string[];
  selectedScales: string[];
  selectedServiceTypes: string[];
  onClientTypeChange: (types: string[]) => void;
  onScaleChange: (scales: string[]) => void;
  onServiceTypeChange: (types: string[]) => void;
  onClearFilters: () => void;
  resultCount: number;
  totalCount: number;
}

const ProjectFilters = ({
  selectedClientTypes,
  selectedScales,
  selectedServiceTypes,
  onClientTypeChange,
  onScaleChange,
  onServiceTypeChange,
  onClearFilters,
  resultCount,
  totalCount,
}: ProjectFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const clientTypes = [
    { id: "homeowner", label: "Homeowner" },
    { id: "property_manager", label: "Property Manager" },
    { id: "developer", label: "Developer/GC" },
    { id: "commercial", label: "Commercial Business" },
  ];

  const scales = [
    { id: "small", label: "Small ($5K-$50K)" },
    { id: "medium", label: "Medium ($50K-$250K)" },
    { id: "large", label: "Large ($250K-$1M)" },
    { id: "major", label: "Major ($1M+)" },
  ];

  const serviceTypes = [
    { id: "painting", label: "Painting" },
    { id: "stucco", label: "Stucco/EIFS" },
    { id: "multi_unit", label: "Multi-Unit" },
    { id: "new_construction", label: "New Construction" },
    { id: "renovation", label: "Renovation" },
  ];

  const handleCheckboxChange = (
    checked: boolean,
    value: string,
    currentValues: string[],
    onChange: (values: string[]) => void
  ) => {
    if (checked) {
      onChange([...currentValues, value]);
    } else {
      onChange(currentValues.filter((v) => v !== value));
    }
  };

  const hasActiveFilters = 
    selectedClientTypes.length > 0 || 
    selectedScales.length > 0 || 
    selectedServiceTypes.length > 0;

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Result Count */}
      <div className="text-sm text-muted-foreground">
        Showing {resultCount} of {totalCount} projects
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          className="w-full"
        >
          <X className="w-4 h-4 mr-2" />
          Clear All Filters
        </Button>
      )}

      {/* Client Type Filter */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Client Type</h3>
        {clientTypes.map((type) => (
          <div key={type.id} className="flex items-center space-x-2">
            <Checkbox
              id={`client-${type.id}`}
              checked={selectedClientTypes.includes(type.id)}
              onCheckedChange={(checked) =>
                handleCheckboxChange(
                  checked as boolean,
                  type.id,
                  selectedClientTypes,
                  onClientTypeChange
                )
              }
            />
            <Label
              htmlFor={`client-${type.id}`}
              className="text-sm cursor-pointer"
            >
              {type.label}
            </Label>
          </div>
        ))}
      </div>

      {/* Project Scale Filter */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Project Scale</h3>
        {scales.map((scale) => (
          <div key={scale.id} className="flex items-center space-x-2">
            <Checkbox
              id={`scale-${scale.id}`}
              checked={selectedScales.includes(scale.id)}
              onCheckedChange={(checked) =>
                handleCheckboxChange(
                  checked as boolean,
                  scale.id,
                  selectedScales,
                  onScaleChange
                )
              }
            />
            <Label
              htmlFor={`scale-${scale.id}`}
              className="text-sm cursor-pointer"
            >
              {scale.label}
            </Label>
          </div>
        ))}
      </div>

      {/* Service Type Filter */}
      <div className="space-y-3">
        <h3 className="font-semibold text-sm">Service Type</h3>
        {serviceTypes.map((service) => (
          <div key={service.id} className="flex items-center space-x-2">
            <Checkbox
              id={`service-${service.id}`}
              checked={selectedServiceTypes.includes(service.id)}
              onCheckedChange={(checked) =>
                handleCheckboxChange(
                  checked as boolean,
                  service.id,
                  selectedServiceTypes,
                  onServiceTypeChange
                )
              }
            />
            <Label
              htmlFor={`service-${service.id}`}
              className="text-sm cursor-pointer"
            >
              {service.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <FilterContent />
          </CardContent>
        </Card>
      </div>

      {/* Mobile Drawer */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <Filter className="w-4 h-4 mr-2" />
              Filters {hasActiveFilters && `(${selectedClientTypes.length + selectedScales.length + selectedServiceTypes.length})`}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle>Filter Projects</SheetTitle>
              <SheetDescription>
                Narrow down your project search
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default ProjectFilters;
