import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Building, FileText, DollarSign } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

interface ProjectDetailProps {
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
      email?: string | null;
      phone?: string | null;
    } | null;
  };
  onEdit: () => void;
  onClose: () => void;
}

export const ProjectDetail = ({ project, onEdit, onClose }: ProjectDetailProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">{project.name}</h2>
          <StatusBadge status={project.status} type="project" />
        </div>
        <div className="flex gap-2">
          <Button onClick={onEdit}>Edit Project</Button>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>
      </div>

      {project.description && (
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-muted-foreground">{project.description}</p>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {project.client && (
          <Card className="p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <User className="h-4 w-4" />
              Client Information
            </h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Name:</span>{" "}
                <span className="font-medium">{project.client.name}</span>
              </div>
              {project.client.company && (
                <div>
                  <span className="text-muted-foreground">Company:</span>{" "}
                  <span className="font-medium">{project.client.company}</span>
                </div>
              )}
              {project.client.email && (
                <div>
                  <span className="text-muted-foreground">Email:</span>{" "}
                  <span className="font-medium">{project.client.email}</span>
                </div>
              )}
              {project.client.phone && (
                <div>
                  <span className="text-muted-foreground">Phone:</span>{" "}
                  <span className="font-medium">{project.client.phone}</span>
                </div>
              )}
            </div>
          </Card>
        )}

        <Card className="p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Timeline
          </h3>
          <div className="space-y-2 text-sm">
            {project.start_date && (
              <div>
                <span className="text-muted-foreground">Start Date:</span>{" "}
                <span className="font-medium">
                  {new Date(project.start_date).toLocaleDateString()}
                </span>
              </div>
            )}
            {project.end_date && (
              <div>
                <span className="text-muted-foreground">End Date:</span>{" "}
                <span className="font-medium">
                  {new Date(project.end_date).toLocaleDateString()}
                </span>
              </div>
            )}
            {!project.start_date && !project.end_date && (
              <p className="text-muted-foreground italic">No timeline set</p>
            )}
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="font-semibold mb-3">Related Documents</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            View Estimates
          </Button>
          <Button variant="outline" size="sm">
            <DollarSign className="h-4 w-4 mr-2" />
            View Invoices
          </Button>
        </div>
      </Card>
    </div>
  );
};
