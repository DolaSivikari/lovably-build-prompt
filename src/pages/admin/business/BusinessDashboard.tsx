import { useState, useEffect } from 'react';
import { 
  DollarSign, 
  FileText, 
  Users, 
  Briefcase, 
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Calendar,
  Clock
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Stats {
  totalRevenue: number;
  pendingInvoices: number;
  activeProjects: number;
  totalClients: number;
}

export const BusinessDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalRevenue: 0,
    pendingInvoices: 0,
    activeProjects: 0,
    totalClients: 0
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Fetch real data from database
      const [clientsRes, projectsRes, invoicesRes] = await Promise.all([
        supabase.from('business_clients').select('*', { count: 'exact', head: true }),
        supabase.from('business_projects').select('*', { count: 'exact' }).eq('status', 'in_progress'),
        supabase.from('business_invoices').select('total_cents, status')
      ]);

      const totalRevenue = invoicesRes.data?.reduce((sum, inv) => {
        if (inv.status === 'paid') return sum + (inv.total_cents || 0);
        return sum;
      }, 0) || 0;

      const pendingInvoices = invoicesRes.data?.filter(inv => 
        inv.status === 'sent' || inv.status === 'overdue'
      ).length || 0;

      setStats({
        totalRevenue,
        pendingInvoices,
        activeProjects: projectsRes.count || 0,
        totalClients: clientsRes.count || 0
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD'
    }).format(cents / 100);
  };

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    gradient 
  }: { 
    title: string; 
    value: string | number; 
    icon: any; 
    gradient: string;
  }) => (
    <div className="business-glass-card" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ 
            fontSize: '0.875rem', 
            fontWeight: '600', 
            color: 'var(--business-text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.5rem'
          }}>
            {title}
          </div>
          <div style={{ 
            fontSize: '2rem', 
            fontWeight: '700', 
            color: 'var(--business-text-primary)',
            lineHeight: '1'
          }}>
            {value}
          </div>
        </div>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white'
        }}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="business-page-title">Dashboard</h1>
        <p className="business-page-subtitle">
          Welcome back! Here's what's happening with your business.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="business-stats-grid">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon={DollarSign}
          gradient="linear-gradient(135deg, #10b981 0%, #059669 100%)"
        />
        <StatCard
          title="Pending Invoices"
          value={stats.pendingInvoices}
          icon={FileText}
          gradient="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
        />
        <StatCard
          title="Active Projects"
          value={stats.activeProjects}
          icon={Briefcase}
          gradient="linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)"
        />
        <StatCard
          title="Total Clients"
          value={stats.totalClients}
          icon={Users}
          gradient="linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
        />
      </div>

      {/* Quick Actions */}
      <div className="business-glass-card" style={{ padding: '1.5rem', marginTop: '2rem' }}>
        <h2 style={{ 
          fontSize: '1.25rem', 
          fontWeight: '700', 
          color: 'var(--business-text-primary)',
          marginBottom: '1rem'
        }}>
          Quick Actions
        </h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="business-btn business-btn-primary">
            <FileText size={18} />
            New Estimate
          </button>
          <button className="business-btn business-btn-success">
            <DollarSign size={18} />
            Create Invoice
          </button>
          <button className="business-btn business-btn-ghost">
            <Users size={18} />
            Add Client
          </button>
          <button className="business-btn business-btn-ghost">
            <Briefcase size={18} />
            New Project
          </button>
        </div>
      </div>
    </div>
  );
};
