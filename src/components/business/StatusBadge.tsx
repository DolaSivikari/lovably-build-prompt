import { formatStatus } from '@/utils/statusHelpers';

interface StatusBadgeProps {
  status: string;
  colorClasses: string;
  className?: string;
}

export const StatusBadge = ({ status, colorClasses, className = '' }: StatusBadgeProps) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClasses} ${className}`}
    >
      {formatStatus(status)}
    </span>
  );
};
