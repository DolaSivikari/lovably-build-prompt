import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProjectForm, ProjectFormData } from "@/components/business/ProjectForm";
import { ProjectCard } from "@/components/business/ProjectCard";
import { ProjectDetail } from "@/components/business/ProjectDetail";
import { Card } from "@/components/ui/card";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useTableSort } from "@/hooks/useTableSort";
import { useTablePagination } from "@/hooks/useTablePagination";
import { useTableFilters } from "@/hooks/useTableFilters";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BusinessProjects() {
  const { isLoading, isAdmin } = useAdminAuth();
  const [projects, setProjects] = useState<any[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [viewingProject, setViewingProject] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { toast } = useToast();
  
  const { sortConfig, requestSort, sortData } = useTableSort<any>();
  const { filters, updateFilter, hasActiveFilters, clearFilters } = useTableFilters();

  useEffect(() => {
    if (isAdmin) {
      fetchProjects();
    }
  }, [isAdmin]);

  useEffect(() => {
    let filtered = projects;
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(project => project.status === statusFilter);
    }
    
    // Apply sorting
    filtered = sortData(filtered);
    
    setFilteredProjects(filtered);
  }, [searchTerm, projects, statusFilter, sortData]);
  
  const {
    currentPage,
    itemsPerPage,
    totalPages,
    paginatedData,
    goToPage,
    nextPage,
    previousPage,
    changeItemsPerPage,
    totalItems,
    startIndex,
    endIndex,
  } = useTablePagination(filteredProjects);

  const fetchProjects = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("business_projects")
        .select(`
          *,
          client:clients(name, company, email, phone)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProjects(data || []);
      setFilteredProjects(data || []);
    } catch (error) {
      toast({
        title: "Error loading projects",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (formData: ProjectFormData) => {
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const projectData = {
        name: formData.name,
        client_id: formData.client_id || null,
        description: formData.description || null,
        status: formData.status,
        start_date: formData.start_date || null,
        end_date: formData.end_date || null,
        user_id: user.id,
      };

      if (editingProject) {
        const { error } = await supabase
          .from("business_projects")
          .update(projectData)
          .eq("id", editingProject.id);
        if (error) throw error;
        toast({ title: "Project updated successfully" });
      } else {
        const { error } = await supabase
          .from("business_projects")
          .insert(projectData);
        if (error) throw error;
        toast({ title: "Project created successfully" });
      }

      setShowForm(false);
      setEditingProject(null);
      fetchProjects();
    } catch (error) {
      toast({
        title: "Error saving project",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setProjectToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!projectToDelete) return;

    try {
      const { error } = await supabase.from("business_projects").delete().eq("id", projectToDelete);
      if (error) throw error;
      toast({ title: "Project deleted successfully" });
      setSelectedProjects(prev => prev.filter(id => id !== projectToDelete));
      fetchProjects();
    } catch (error) {
      toast({
        title: "Error deleting project",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
    setProjectToDelete(null);
  };
  
  const handleBulkDelete = async () => {
    if (selectedProjects.length === 0) return;
    if (!confirm(`Delete ${selectedProjects.length} projects?`)) return;

    try {
      const { error } = await supabase
        .from("business_projects")
        .delete()
        .in("id", selectedProjects);
      if (error) throw error;
      toast({ title: `${selectedProjects.length} projects deleted` });
      setSelectedProjects([]);
      fetchProjects();
    } catch (error) {
      toast({
        title: "Error deleting projects",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  };
  
  const toggleProjectSelection = (id: string) => {
    setSelectedProjects(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };
  
  const toggleAllProjects = () => {
    if (selectedProjects.length === paginatedData.length) {
      setSelectedProjects([]);
    } else {
      setSelectedProjects(paginatedData.map(p => p.id));
    }
  };

  if (isLoading) return <div className="p-8">Loading...</div>;

  if (viewingProject) {
    return (
      <div className="space-y-6">
        <ProjectDetail
          project={viewingProject}
          onEdit={() => { setEditingProject(viewingProject); setShowForm(true); setViewingProject(null); }}
          onClose={() => setViewingProject(null)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage your business projects</p>
        </div>
        <Button onClick={() => { setEditingProject(null); setShowForm(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="on-hold">On Hold</SelectItem>
            </SelectContent>
          </Select>
          {selectedProjects.length > 0 && (
            <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
              Delete ({selectedProjects.length})
            </Button>
          )}
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Checkbox
            checked={selectedProjects.length === paginatedData.length && paginatedData.length > 0}
            onCheckedChange={toggleAllProjects}
          />
          <span className="text-sm text-muted-foreground">
            {selectedProjects.length > 0 ? `${selectedProjects.length} selected` : "Select all"}
          </span>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {paginatedData.map((project) => (
            <div key={project.id} className="relative">
              <Checkbox
                className="absolute top-2 left-2 z-10"
                checked={selectedProjects.includes(project.id)}
                onCheckedChange={() => toggleProjectSelection(project.id)}
              />
              <ProjectCard
                project={project}
                onEdit={(id) => { setEditingProject(projects.find(p => p.id === id)); setShowForm(true); }}
                onDelete={handleDeleteClick}
                onClick={(id) => setViewingProject(projects.find(p => p.id === id))}
              />
            </div>
          ))}
        </div>
        
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex}-{endIndex} of {totalItems} projects
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={previousPage}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={nextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
              <Select value={itemsPerPage.toString()} onValueChange={(v) => changeItemsPerPage(Number(v))}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25">25 / page</SelectItem>
                  <SelectItem value="50">50 / page</SelectItem>
                  <SelectItem value="100">100 / page</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </Card>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingProject ? "Edit Project" : "Add Project"}</DialogTitle>
          </DialogHeader>
          <ProjectForm
            defaultValues={editingProject}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Project"
        description="Are you sure you want to delete this project? This action cannot be undone."
        confirmText="Delete"
        variant="destructive"
      />
    </div>
  );
}
