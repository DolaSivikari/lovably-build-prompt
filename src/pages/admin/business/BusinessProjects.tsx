import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Search, Grid, List } from 'lucide-react';
import { ProjectForm } from '@/components/business/ProjectForm';
import { ProjectCard } from '@/components/business/ProjectCard';
import { toast } from 'sonner';

const STATUS_FILTERS = [
  { value: 'all', label: 'All Projects' },
  { value: 'lead', label: 'Leads' },
  { value: 'quoted', label: 'Quoted' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];

export const BusinessProjects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | undefined>();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('business_projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('Failed to load projects');
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.project_number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleFormSuccess = () => {
    setShowForm(false);
    setSelectedProject(undefined);
    loadProjects();
  };

  const handleEditProject = (projectId: string) => {
    setSelectedProject(projectId);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="business-page-title">Projects</h1>
          <p className="business-page-subtitle">Track and manage construction projects</p>
        </div>
        <Button onClick={() => setShowForm(true)} style={{ background: 'var(--business-accent)' }}>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      <div className="business-glass-card mb-6" style={{ padding: '1.5rem' }}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'var(--business-text-secondary)' }} />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'var(--business-text-primary)',
              }}
            />
          </div>
          
          <div className="flex gap-2">
            {STATUS_FILTERS.map((filter) => (
              <Button
                key={filter.value}
                variant={statusFilter === filter.value ? 'default' : 'outline'}
                onClick={() => setStatusFilter(filter.value)}
                size="sm"
              >
                {filter.label}
              </Button>
            ))}
          </div>

          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="business-glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--business-text-secondary)' }}>Loading projects...</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="business-glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
          <p style={{ color: 'var(--business-text-secondary)' }}>
            {searchTerm || statusFilter !== 'all' ? 'No projects match your filters' : 'No projects yet'}
          </p>
          {!searchTerm && statusFilter === 'all' && (
            <Button onClick={() => setShowForm(true)} className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Create First Project
            </Button>
          )}
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => handleEditProject(project.id)}
            />
          ))}
        </div>
      )}

      <Dialog open={showForm} onOpenChange={(open) => {
        setShowForm(open);
        if (!open) setSelectedProject(undefined);
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedProject ? 'Edit Project' : 'New Project'}</DialogTitle>
          </DialogHeader>
          <ProjectForm
            projectId={selectedProject}
            onSuccess={handleFormSuccess}
            onCancel={() => {
              setShowForm(false);
              setSelectedProject(undefined);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
