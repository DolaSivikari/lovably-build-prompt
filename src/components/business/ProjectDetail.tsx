import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatusBadge } from './StatusBadge';
import { formatCurrency } from '@/utils/currency';
import { format } from 'date-fns';
import { Edit, MapPin, Calendar, DollarSign, FileText, Receipt } from 'lucide-react';
import { toast } from 'sonner';

interface ProjectDetailProps {
  projectId: string;
  onEdit: () => void;
  onCreateEstimate: () => void;
  onCreateInvoice: () => void;
}

export const ProjectDetail = ({ projectId, onEdit, onCreateEstimate, onCreateInvoice }: ProjectDetailProps) => {
  const [project, setProject] = useState<any>(null);
  const [client, setClient] = useState<any>(null);
  const [estimates, setEstimates] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjectDetails();
  }, [projectId]);

  const loadProjectDetails = async () => {
    try {
      setLoading(true);

      // Load project
      const { data: projectData, error: projectError } = await supabase
        .from('business_projects')
        .select('*, business_clients(*)')
        .eq('id', projectId)
        .single();

      if (projectError) throw projectError;
      setProject(projectData);
      setClient(projectData.business_clients);

      // Load estimates
      const { data: estimatesData, error: estimatesError } = await supabase
        .from('business_estimates')
        .select('*')
        .eq('project_id', projectId)
        .order('estimate_date', { ascending: false });

      if (estimatesError) throw estimatesError;
      setEstimates(estimatesData || []);

      // Load invoices
      const { data: invoicesData, error: invoicesError } = await supabase
        .from('business_invoices')
        .select('*')
        .eq('project_id', projectId)
        .order('invoice_date', { ascending: false });

      if (invoicesError) throw invoicesError;
      setInvoices(invoicesData || []);
    } catch (error) {
      console.error('Error loading project details:', error);
      toast.error('Failed to load project details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="business-glass-card p-6 animate-pulse">
          <div className="h-40" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <p style={{ color: 'var(--business-text-secondary)' }}>Project not found</p>
      </div>
    );
  }

  const statusSteps = [
    { key: 'lead', label: 'Lead' },
    { key: 'quoted', label: 'Quoted' },
    { key: 'scheduled', label: 'Scheduled' },
    { key: 'in_progress', label: 'In Progress' },
    { key: 'completed', label: 'Completed' },
  ];

  const currentStepIndex = statusSteps.findIndex(s => s.key === project.status);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold" style={{ color: 'var(--business-text-primary)' }}>
              {project.project_name}
            </h2>
            <StatusBadge status={project.status} type="project" />
            {project.priority !== 'normal' && (
              <Badge variant="outline" className="capitalize">
                {project.priority}
              </Badge>
            )}
          </div>
          <p className="text-sm" style={{ color: 'var(--business-text-secondary)' }}>
            {project.project_number} • {client?.company_name || client?.contact_name}
          </p>
        </div>
        <Button onClick={onEdit} variant="outline">
          <Edit className="h-4 w-4 mr-2" />
          Edit Project
        </Button>
      </div>

      {/* Status Timeline */}
      <Card className="business-glass-card p-6">
        <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--business-text-primary)' }}>
          Project Timeline
        </h3>
        <div className="flex items-center justify-between">
          {statusSteps.map((step, index) => (
            <div key={step.key} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    index <= currentStepIndex
                      ? 'bg-blue-500 text-[hsl(var(--bg))]'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {index < currentStepIndex ? '✓' : index + 1}
                </div>
                <span className="text-xs mt-2" style={{ color: 'var(--business-text-secondary)' }}>
                  {step.label}
                </span>
              </div>
              {index < statusSteps.length - 1 && (
                <div
                  className={`h-0.5 w-20 mx-2 ${
                    index < currentStepIndex ? 'bg-blue-500' : 'bg-gray-700'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Project Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <Card className="business-glass-card p-6">
          <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--business-text-primary)' }}>
            Project Information
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5" style={{ color: 'var(--business-text-secondary)' }} />
              <div>
                <p className="text-xs" style={{ color: 'var(--business-text-secondary)' }}>Site Address</p>
                <p className="text-sm" style={{ color: 'var(--business-text-primary)' }}>
                  {project.site_address_line1 || 'N/A'}
                  {project.site_address_line2 && <><br />{project.site_address_line2}</>}
                  {(project.site_city || project.site_province || project.site_postal_code) && (
                    <><br />{[project.site_city, project.site_province, project.site_postal_code].filter(Boolean).join(', ')}</>
                  )}
                </p>
              </div>
            </div>
            
            {project.project_type && (
              <div>
                <p className="text-xs" style={{ color: 'var(--business-text-secondary)' }}>Type</p>
                <p className="text-sm capitalize" style={{ color: 'var(--business-text-primary)' }}>
                  {project.project_type}
                </p>
              </div>
            )}

            {project.square_footage && (
              <div>
                <p className="text-xs" style={{ color: 'var(--business-text-secondary)' }}>Square Footage</p>
                <p className="text-sm" style={{ color: 'var(--business-text-primary)' }}>
                  {project.square_footage.toLocaleString()} sq ft
                </p>
              </div>
            )}

            {project.crew_assignment && (
              <div>
                <p className="text-xs" style={{ color: 'var(--business-text-secondary)' }}>Crew Assignment</p>
                <p className="text-sm" style={{ color: 'var(--business-text-primary)' }}>
                  {project.crew_assignment}
                </p>
              </div>
            )}
          </div>
        </Card>

        {/* Dates & Financials */}
        <Card className="business-glass-card p-6">
          <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--business-text-primary)' }}>
            Schedule & Financials
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Calendar className="h-4 w-4 mt-0.5" style={{ color: 'var(--business-text-secondary)' }} />
              <div className="flex-1">
                <p className="text-xs" style={{ color: 'var(--business-text-secondary)' }}>Key Dates</p>
                <div className="text-sm space-y-1" style={{ color: 'var(--business-text-primary)' }}>
                  {project.inquiry_date && <p>Inquiry: {format(new Date(project.inquiry_date), 'MMM d, yyyy')}</p>}
                  {project.scheduled_start_date && <p>Start: {format(new Date(project.scheduled_start_date), 'MMM d, yyyy')}</p>}
                  {project.estimated_completion_date && <p>Est. Completion: {format(new Date(project.estimated_completion_date), 'MMM d, yyyy')}</p>}
                  {project.actual_completion_date && <p>Completed: {format(new Date(project.actual_completion_date), 'MMM d, yyyy')}</p>}
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <DollarSign className="h-4 w-4 mt-0.5" style={{ color: 'var(--business-text-secondary)' }} />
              <div className="flex-1">
                <p className="text-xs" style={{ color: 'var(--business-text-secondary)' }}>Value</p>
                <div className="text-sm space-y-1" style={{ color: 'var(--business-text-primary)' }}>
                  {project.estimated_value_cents > 0 && (
                    <p>Estimated: {formatCurrency(project.estimated_value_cents)}</p>
                  )}
                  {project.actual_value_cents > 0 && (
                    <p>Actual: {formatCurrency(project.actual_value_cents)}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Description & Notes */}
      {(project.description || project.notes) && (
        <Card className="business-glass-card p-6">
          <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--business-text-primary)' }}>
            Details
          </h3>
          {project.description && (
            <div className="mb-4">
              <p className="text-xs mb-1" style={{ color: 'var(--business-text-secondary)' }}>Description</p>
              <p className="text-sm" style={{ color: 'var(--business-text-primary)' }}>{project.description}</p>
            </div>
          )}
          {project.notes && (
            <div>
              <p className="text-xs mb-1" style={{ color: 'var(--business-text-secondary)' }}>Notes</p>
              <p className="text-sm" style={{ color: 'var(--business-text-primary)' }}>{project.notes}</p>
            </div>
          )}
        </Card>
      )}

      {/* Related Documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Estimates */}
        <Card className="business-glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold" style={{ color: 'var(--business-text-primary)' }}>
              Estimates ({estimates.length})
            </h3>
            <Button onClick={onCreateEstimate} size="sm" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              New
            </Button>
          </div>
          {estimates.length === 0 ? (
            <p className="text-sm text-center py-8" style={{ color: 'var(--business-text-secondary)' }}>
              No estimates yet
            </p>
          ) : (
            <div className="space-y-2">
              {estimates.map((estimate) => (
                <div key={estimate.id} className="flex items-center justify-between p-3 rounded bg-white/5">
                  <div>
                    <p className="text-sm font-mono" style={{ color: 'var(--business-text-primary)' }}>
                      {estimate.estimate_number}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--business-text-secondary)' }}>
                      {format(new Date(estimate.estimate_date), 'MMM d, yyyy')}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-semibold" style={{ color: 'var(--business-text-primary)' }}>
                      {formatCurrency(estimate.total_cents)}
                    </p>
                    <StatusBadge status={estimate.status} type="estimate" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Invoices */}
        <Card className="business-glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold" style={{ color: 'var(--business-text-primary)' }}>
              Invoices ({invoices.length})
            </h3>
            <Button onClick={onCreateInvoice} size="sm" variant="outline">
              <Receipt className="h-4 w-4 mr-2" />
              New
            </Button>
          </div>
          {invoices.length === 0 ? (
            <p className="text-sm text-center py-8" style={{ color: 'var(--business-text-secondary)' }}>
              No invoices yet
            </p>
          ) : (
            <div className="space-y-2">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-3 rounded bg-white/5">
                  <div>
                    <p className="text-sm font-mono" style={{ color: 'var(--business-text-primary)' }}>
                      {invoice.invoice_number}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--business-text-secondary)' }}>
                      {format(new Date(invoice.invoice_date), 'MMM d, yyyy')}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-semibold" style={{ color: 'var(--business-text-primary)' }}>
                        {formatCurrency(invoice.total_cents)}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--business-text-secondary)' }}>
                        Balance: {formatCurrency(invoice.total_cents - invoice.amount_paid_cents)}
                      </p>
                    </div>
                    <StatusBadge status={invoice.status} type="invoice" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
