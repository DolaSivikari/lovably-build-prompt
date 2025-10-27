import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onViewDetails(slug)}
    >
      {/* Image Container - PCL style */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={resolveAssetPath(image) || "/placeholder.svg"}
          alt={title}
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg";
          }}
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
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
