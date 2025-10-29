import { Building2, Calendar, DollarSign, MapPin } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { formatCurrency } from '@/utils/currency';

interface ProjectCardProps {
  project: any;
  onClick: () => void;
}

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  return (
    <div
      onClick={onClick}
      className="business-glass-card p-4 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1" style={{ color: 'var(--business-text-primary)' }}>
            {project.project_name}
          </h3>
          <p className="text-sm" style={{ color: 'var(--business-text-secondary)' }}>
            {project.project_number}
          </p>
        </div>
        <StatusBadge status={project.status} type="project" />
      </div>

      {project.project_type && (
        <div className="flex items-center gap-2 mb-2">
          <Building2 className="h-4 w-4" style={{ color: 'var(--business-text-secondary)' }} />
          <span className="text-sm" style={{ color: 'var(--business-text-secondary)' }}>
            {project.project_type}
          </span>
        </div>
      )}

      {(project.site_city || project.site_address_line1) && (
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="h-4 w-4" style={{ color: 'var(--business-text-secondary)' }} />
          <span className="text-sm" style={{ color: 'var(--business-text-secondary)' }}>
            {project.site_address_line1 ? `${project.site_address_line1}, ` : ''}
            {project.site_city}
          </span>
        </div>
      )}

      {project.estimated_value_cents > 0 && (
        <div className="flex items-center gap-2 mb-2">
          <DollarSign className="h-4 w-4" style={{ color: 'var(--business-text-secondary)' }} />
          <span className="text-sm" style={{ color: 'var(--business-text-secondary)' }}>
            Est. {formatCurrency(project.estimated_value_cents)}
          </span>
        </div>
      )}

      {project.scheduled_start_date && (
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" style={{ color: 'var(--business-text-secondary)' }} />
          <span className="text-sm" style={{ color: 'var(--business-text-secondary)' }}>
            Start: {new Date(project.scheduled_start_date).toLocaleDateString()}
          </span>
        </div>
      )}
    </div>
  );
};
