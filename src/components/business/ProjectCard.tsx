import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, Edit, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusBadge } from "./StatusBadge";

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description?: string | null;
    status: string;
    start_date?: string | null;
    end_date?: string | null;
    client?: {
      name: string;
      company?: string | null;
    } | null;
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onClick: (id: string) => void;
}

export const ProjectCard = ({
  project,
  onEdit,
  onDelete,
  onClick,
}: ProjectCardProps) => {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => onClick(project.id)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">{project.name}</h3>
          {project.client && (
            <p className="text-sm text-muted-foreground mb-2">
              {project.client.company ? `${project.client.name} (${project.client.company})` : project.client.name}
            </p>
          )}
          {project.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {project.description}
            </p>
          )}
          <div className="flex items-center gap-2">
            <StatusBadge status={project.status} type="project" />
            {project.start_date && (
              <span className="text-xs text-muted-foreground">
                {new Date(project.start_date).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit(project.id); }}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={(e) => { e.stopPropagation(); onDelete(project.id); }}
              className="text-destructive"
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
};
