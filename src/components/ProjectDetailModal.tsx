import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Ruler, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ProjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    category: string;
    location: string;
    year: string;
    size: string;
    duration: string;
    image: string;
    images: string[];
    description: string;
    highlights: string[];
    slug: string;
  } | null;
}

const ProjectDetailModal = ({ isOpen, onClose, project }: ProjectDetailModalProps) => {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{project.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Hero Image */}
          <div className="rounded-lg overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-64 object-cover"
            />
          </div>
          
          {/* Badges and Stats */}
          <div className="flex flex-wrap gap-3">
            <Badge variant="secondary">{project.category}</Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {project.location}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              {project.year}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Ruler className="w-4 h-4" />
              {project.size}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              {project.duration}
            </div>
          </div>
          
          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Project Overview</h3>
            <p className="text-muted-foreground">{project.description}</p>
          </div>
          
          {/* Highlights */}
          <div>
            <h3 className="font-semibold mb-3">Key Highlights</h3>
            <ul className="space-y-2">
              {project.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-muted-foreground">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Additional Images */}
          {project.images.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Project Gallery</h3>
              <div className="grid grid-cols-2 gap-4">
                {project.images.map((img, idx) => (
                  <div key={idx} className="rounded-lg overflow-hidden">
                    <img
                      src={img}
                      alt={`${project.title} ${idx + 1}`}
                      className="w-full h-40 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* CTA Button */}
          <Button asChild className="w-full">
            <Link to={`/case-studies/${project.slug}`}>
              View Full Case Study
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailModal;
