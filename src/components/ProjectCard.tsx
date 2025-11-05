import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { MapPin, Calendar, Ruler, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { resolveAssetPath } from "@/utils/assetResolver";

interface ProjectCardProps {
  title: string;
  category: string;
  location: string;
  year: string;
  size: string;
  image: string;
  slug: string;
  tags?: string[];
  description: string;
  highlights?: string[];
  onViewDetails: (slug: string) => void;
  // GC Metrics
  project_value?: number;
  your_role?: string;
  on_time_completion?: boolean;
  on_budget?: boolean;
  safety_incidents?: number;
}

const ProjectCard = ({
  title,
  category,
  location,
  year,
  size,
  image,
  slug,
  tags,
  description,
  highlights,
  onViewDetails,
  project_value,
  your_role,
  on_time_completion,
  on_budget,
  safety_incidents,
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)] hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onViewDetails(slug)}
    >
      {/* Image Container - PCL style */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={resolveAssetPath(image) || "/placeholder.svg"}
          alt={title}
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg";
          }}
          className={cn(
            "w-full h-full object-cover object-center transition-all duration-500",
            isHovered && "scale-110 brightness-90"
          )}
        />
        
        {/* Clean overlay on hover */}
        <div className={cn(
          "absolute inset-0 bg-primary/90 flex items-center justify-center transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <div className="text-center px-6">
            <Button variant="secondary" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              View Project
            </Button>
          </div>
        </div>
        
        {/* Simple category badge */}
        <div className="absolute top-4 right-4">
          <Badge className="bg-primary text-primary-foreground">{category}</Badge>
        </div>
      </div>
      
      {/* Card Content - Clean PCL style */}
      <CardContent className="p-6">
        <h3 className="text-lg font-bold mb-3 line-clamp-2">{title}</h3>
        
        {/* Compact stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{year}</span>
          </div>
        </div>
        
        {/* GC Metrics Badges */}
        {(project_value || your_role || on_time_completion !== undefined || on_budget !== undefined || safety_incidents !== undefined) && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project_value && (
              <Badge variant="outline" className="text-xs">
                ${(project_value / 100 / 1000000).toFixed(1)}M
              </Badge>
            )}
            {your_role && (
              <Badge variant="outline" className="text-xs">
                {your_role}
              </Badge>
            )}
            {on_time_completion && (
              <Badge variant="default" className="text-xs bg-green-600">
                On-Time
              </Badge>
            )}
            {on_budget && (
              <Badge variant="default" className="text-xs bg-blue-600">
                On-Budget
              </Badge>
            )}
            {safety_incidents === 0 && (
              <Badge variant="default" className="text-xs bg-green-700">
                Zero Incidents
              </Badge>
            )}
          </div>
        )}
        
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
