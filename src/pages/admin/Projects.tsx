import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const Projects = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isLoading: authLoading, isAdmin } = useAdminAuth();
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) return;
    loadProjects();
  }, [isAdmin]);

  const loadProjects = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load projects",
        variant: "destructive",
      });
    } else {
      setProjects(data || []);
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
      loadProjects();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "default";
      case "draft": return "secondary";
      case "archived": return "outline";
      default: return "secondary";
    }
  };

  if (authLoading) {
    return null;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 className="business-page-title">Projects</h1>
          <p className="business-page-subtitle">Manage your portfolio projects</p>
        </div>
        <button className="business-btn business-btn-primary" onClick={() => navigate("/admin/projects/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </button>
      </div>

      <div>
        {isLoading ? (
          <div className="text-center py-12" style={{ color: 'var(--business-text-secondary)' }}>Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="business-glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--business-text-secondary)', marginBottom: '1rem' }}>
              No projects yet. Create your first project to get started.
            </p>
            <button className="business-btn business-btn-primary" onClick={() => navigate("/admin/projects/new")}>
              <Plus className="h-4 w-4 mr-2" />
              Create Project
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div key={project.id} className="business-glass-card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <Badge variant={getStatusColor(project.publish_state)}>
                    {project.publish_state}
                  </Badge>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                      className="business-btn business-btn-ghost"
                      style={{ padding: '0.5rem' }}
                      onClick={() => navigate(`/admin/projects/${project.id}`)}
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      className="business-btn business-btn-ghost"
                      style={{ padding: '0.5rem' }}
                      onClick={() => handleDelete(project.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <h3 style={{ 
                  fontSize: '1.125rem', 
                  fontWeight: '700', 
                  color: 'var(--business-text-primary)',
                  marginBottom: '0.5rem'
                }}>
                  {project.title}
                </h3>
                {project.subtitle && (
                  <p style={{ 
                    fontSize: '0.875rem', 
                    color: 'var(--business-text-secondary)',
                    marginBottom: '1rem'
                  }}>
                    {project.subtitle}
                  </p>
                )}
                <div style={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  color: 'var(--business-text-secondary)'
                }}>
                  {project.client_name && (
                    <div>Client: {project.client_name}</div>
                  )}
                  {project.location && (
                    <div>Location: {project.location}</div>
                  )}
                  {project.category && (
                    <Badge variant="outline">{project.category}</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
