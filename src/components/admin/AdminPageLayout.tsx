import { AdminPageHeader } from './AdminPageHeader';

interface AdminPageLayoutProps {
  title: string;
  description?: string;
  backTo?: string;
  backLabel?: string;
  actions?: React.ReactNode;
  loading?: boolean;
  children: React.ReactNode;
}

export const AdminPageLayout = ({
  title,
  description,
  backTo,
  backLabel,
  actions,
  loading,
  children,
}: AdminPageLayoutProps) => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <AdminPageHeader
        title={title}
        description={description}
        backTo={backTo}
        backLabel={backLabel}
        actions={actions}
        loading={loading}
      />
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
};
