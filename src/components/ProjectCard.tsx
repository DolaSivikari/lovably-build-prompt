import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Ruler, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  category: string;
  location: string;
  year: string;
  size: string;
  image: string;
  tags: string[];
  description: string;
  highlights: string[];
  onViewDetails: () => void;
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
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onViewDetails}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className={cn(
            "w-full h-full object-cover transition-transform duration-500",
            isHovered && "scale-110"
          )}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
        
        {/* Badges on Image */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge variant="secondary">{category}</Badge>
          <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
            {year}
          </Badge>
        </div>
        
        {/* Hover Overlay with Details */}
        <div
          className={cn(
            "absolute inset-0 bg-primary/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          <p className="text-primary-foreground text-center mb-4">{description}</p>
          <ul className="space-y-2 mb-4">
            {highlights.slice(0, 3).map((highlight, idx) => (
              <li key={idx} className="text-primary-foreground text-sm flex items-start gap-2">
                <span className="text-secondary mt-1">✓</span>
                {highlight}
              </li>
            ))}
          </ul>
          <Button variant="secondary" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </div>
      </div>
      
      {/* Card Content */}
      <CardContent className="p-6 space-y-4">
        <h3 className="text-xl font-bold line-clamp-2">{title}</h3>
        
        {/* Stats Row */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {location}
          </div>
          <div className="flex items-center gap-1">
            <Ruler className="w-4 h-4" />
            {size}
          </div>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <Badge key={idx} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
