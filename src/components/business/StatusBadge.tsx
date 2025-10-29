import { formatStatus } from '@/utils/statusHelpers';

interface StatusBadgeProps {
  status: string;
  type?: 'project' | 'invoice' | 'estimate' | 'client';
  colorClasses?: string;
  className?: string;
}

const getStatusColors = (status: string, type?: string): string => {
  const lowerStatus = status.toLowerCase();
  
  // Project statuses
  if (type === 'project') {
    if (lowerStatus === 'active') return 'bg-green-500/10 text-green-400 border-green-500/20';
    if (lowerStatus === 'planning') return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    if (lowerStatus === 'on_hold') return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
    if (lowerStatus === 'completed') return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  }
  
  // Invoice statuses
  if (type === 'invoice') {
    if (lowerStatus === 'paid') return 'bg-green-500/10 text-green-400 border-green-500/20';
    if (lowerStatus === 'partially_paid') return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    if (lowerStatus === 'pending') return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
    if (lowerStatus === 'overdue') return 'bg-red-500/10 text-red-400 border-red-500/20';
    if (lowerStatus === 'draft') return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  }
  
  // Estimate statuses
  if (type === 'estimate') {
    if (lowerStatus === 'accepted') return 'bg-green-500/10 text-green-400 border-green-500/20';
    if (lowerStatus === 'sent') return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    if (lowerStatus === 'rejected') return 'bg-red-500/10 text-red-400 border-red-500/20';
    if (lowerStatus === 'draft') return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  }
  
  // Default colors
  return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
};

export const StatusBadge = ({ status, type, colorClasses, className = '' }: StatusBadgeProps) => {
  const colors = colorClasses || getStatusColors(status, type);
  
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors} ${className}`}
    >
      {formatStatus(status)}
    </span>
  );
};
