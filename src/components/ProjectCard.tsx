import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Ruler, Eye, Building2, Home, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  category: string;
  location: string;
  year: string;
  size: string;
  image: string;
  tags?: string[];
  description: string;
  highlights?: string[];
  onViewDetails: () => void;
  unitsCount?: number;
  squareFootage?: number;
  timelineWeeks?: number;
  projectScale?: 'small' | 'medium' | 'large' | 'major';
  clientType?: 'homeowner' | 'property_manager' | 'developer' | 'commercial';
}

const ProjectCard = ({
  title,
  category,
  location,
  year,
  size,
  image,
  tags,
  description,
  highlights,
  onViewDetails,
  unitsCount,
  squareFootage,
  timelineWeeks,
  projectScale,
  clientType,
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onViewDetails}
    >
      {/* Image Container - PCL style */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className={cn(
            "w-full h-full object-cover transition-all duration-300",
            isHovered && "scale-105 brightness-90"
          )}
        />
        
        {/* Clean overlay on hover */}
        <div className={cn(
          "absolute inset-0 bg-primary/90 flex items-center justify-center transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <div className="text-center px-6">
            <Button variant="secondary" size="sm" className="bg-white text-primary hover:bg-white/90">
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
        
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        
        {/* Metadata Badges */}
        {(unitsCount || squareFootage || timelineWeeks || projectScale) && (
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t">
            {unitsCount && (
              <Badge variant="secondary" className="text-xs">
                <Building2 className="w-3 h-3 mr-1" />
                {unitsCount} Units
              </Badge>
            )}
            {squareFootage && (
              <Badge variant="secondary" className="text-xs">
                <Ruler className="w-3 h-3 mr-1" />
                {squareFootage.toLocaleString()} sq ft
              </Badge>
            )}
            {timelineWeeks && (
              <Badge variant="secondary" className="text-xs">
                <Clock className="w-3 h-3 mr-1" />
                {timelineWeeks} weeks
              </Badge>
            )}
            {projectScale && (
              <Badge 
                variant={projectScale === 'major' ? 'default' : 'outline'} 
                className="text-xs"
              >
                {projectScale.charAt(0).toUpperCase() + projectScale.slice(1)} Scale
              </Badge>
            )}
            {clientType && (
              <Badge variant="outline" className="text-xs">
                {clientType === 'homeowner' ? <Home className="w-3 h-3 mr-1" /> : <Building2 className="w-3 h-3 mr-1" />}
                {clientType.replace('_', ' ')}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
