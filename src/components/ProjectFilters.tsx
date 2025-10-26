import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Home, DollarSign, Users } from "lucide-react";

interface ProjectFiltersProps {
  selectedScales: string[];
  selectedClientTypes: string[];
  onScaleToggle: (scale: string) => void;
  onClientTypeToggle: (type: string) => void;
  activeCount: number;
}

const ProjectFilters = ({
  selectedScales,
  selectedClientTypes,
  onScaleToggle,
  onClientTypeToggle,
  activeCount
}: ProjectFiltersProps) => {
  const scales = [
    { id: "small", label: "Small ($5K-$50K)", icon: Home },
    { id: "medium", label: "Medium ($50K-$250K)", icon: Building2 },
    { id: "large", label: "Large ($250K-$1M)", icon: Building2 },
    { id: "major", label: "Major ($1M+)", icon: Building2 }
  ];

  const clientTypes = [
    { id: "homeowner", label: "Homeowner", icon: Home },
    { id: "property_manager", label: "Property Manager", icon: Building2 },
    { id: "developer", label: "Developer/GC", icon: Building2 },
    { id: "commercial", label: "Commercial", icon: Building2 }
  ];

  return (
    <div className="space-y-6">
      {/* Active Filters Count */}
      {activeCount > 0 && (
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{activeCount} Active Filters</Badge>
        </div>
      )}

      {/* By Scale */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            By Project Scale
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {scales.map((scale) => {
            const Icon = scale.icon;
            return (
              <div key={scale.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`scale-${scale.id}`}
                  checked={selectedScales.includes(scale.id)}
                  onCheckedChange={() => onScaleToggle(scale.id)}
                />
                <Label
                  htmlFor={`scale-${scale.id}`}
                  className="flex items-center gap-2 text-sm font-normal cursor-pointer"
                >
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  {scale.label}
                </Label>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* By Client Type */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            By Client Type
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {clientTypes.map((type) => {
            const Icon = type.icon;
            return (
              <div key={type.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`client-${type.id}`}
                  checked={selectedClientTypes.includes(type.id)}
                  onCheckedChange={() => onClientTypeToggle(type.id)}
                />
                <Label
                  htmlFor={`client-${type.id}`}
                  className="flex items-center gap-2 text-sm font-normal cursor-pointer"
                >
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  {type.label}
                </Label>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectFilters;