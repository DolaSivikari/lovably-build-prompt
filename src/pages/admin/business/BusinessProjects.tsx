import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { ProjectCard } from '@/components/business/ProjectCard';
import { ProjectForm } from '@/components/business/ProjectForm';
import { ProjectDetail } from '@/components/business/ProjectDetail';
import { EstimateEditor } from '@/components/business/EstimateEditor';
import { InvoiceEditor } from '@/components/business/InvoiceEditor';
import { toast } from 'sonner';

export const BusinessProjects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | undefined>();
  
  const [viewingProjectId, setViewingProjectId] = useState<string | null>(null);
  const [creatingEstimateForProject, setCreatingEstimateForProject] = useState<string | null>(null);
  const [creatingInvoiceForProject, setCreatingInvoiceForProject] = useState<string | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('business_projects')
        .select('*, business_clients(company_name, contact_name)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error loading projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleNewProject = () => {
    setEditingId(undefined);
    setShowForm(true);
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setShowForm(true);
  };

  const handleSuccess = () => {
    setShowForm(false);
    setEditingId(undefined);
    setViewingProjectId(null);
    setCreatingEstimateForProject(null);
    setCreatingInvoiceForProject(null);
    loadProjects();
  };

  const handleViewProject = (id: string) => {
    setViewingProjectId(id);
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.project_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.business_clients?.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.business_clients?.contact_name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div>
        <h1 className="business-page-title">Projects</h1>
        <p className="business-page-subtitle">Manage project pipeline</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="business-glass-card p-6 animate-pulse">
              <div className="h-40" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="business-page-title">Projects</h1>
          <p className="business-page-subtitle">Manage project pipeline</p>
        </div>
        <Button onClick={handleNewProject} className="gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Filters */}
      <div className="business-glass-card p-4 mb-6">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="lead">Lead</SelectItem>
              <SelectItem value="quoted">Quoted</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="on_hold">On Hold</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="business-glass-card p-12 text-center">
          <p style={{ color: 'var(--business-text-secondary)' }}>
            {searchTerm || statusFilter !== 'all' ? 'No projects found' : 'No projects yet'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => handleViewProject(project.id)}
            />
          ))}
        </div>
      )}

      {/* Project Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Project' : 'New Project'}</DialogTitle>
          </DialogHeader>
          <ProjectForm
            projectId={editingId}
            onSuccess={handleSuccess}
            onCancel={() => setShowForm(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Project Detail Dialog */}
      <Dialog open={!!viewingProjectId} onOpenChange={() => setViewingProjectId(null)}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          {viewingProjectId && (
            <ProjectDetail
              projectId={viewingProjectId}
              onEdit={() => {
                setEditingId(viewingProjectId);
                setViewingProjectId(null);
                setShowForm(true);
              }}
              onCreateEstimate={() => {
                setCreatingEstimateForProject(viewingProjectId);
                setViewingProjectId(null);
              }}
              onCreateInvoice={() => {
                setCreatingInvoiceForProject(viewingProjectId);
                setViewingProjectId(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Create Estimate Dialog */}
      <Dialog open={!!creatingEstimateForProject} onOpenChange={() => setCreatingEstimateForProject(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <EstimateEditor
            onSuccess={handleSuccess}
            onCancel={() => setCreatingEstimateForProject(null)}
          />
        </DialogContent>
      </Dialog>

      {/* Create Invoice Dialog */}
      <Dialog open={!!creatingInvoiceForProject} onOpenChange={() => setCreatingInvoiceForProject(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <InvoiceEditor
            onSuccess={handleSuccess}
            onCancel={() => setCreatingInvoiceForProject(null)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
