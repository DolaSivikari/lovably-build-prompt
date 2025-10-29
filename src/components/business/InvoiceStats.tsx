import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { DollarSign, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { formatCurrency } from '@/utils/currency';

export const InvoiceStats = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    amountPaid: 0,
    amountDue: 0,
    overdueAmount: 0,
    loading: true,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const { data: invoices, error } = await supabase
        .from('business_invoices')
        .select('total_cents, amount_paid_cents, due_date, status');

      if (error) throw error;

      const totalRevenue = invoices?.reduce((sum, inv) => sum + (inv.total_cents || 0), 0) || 0;
      const amountPaid = invoices?.reduce((sum, inv) => sum + (inv.amount_paid_cents || 0), 0) || 0;
      const amountDue = totalRevenue - amountPaid;
      
      const today = new Date().toISOString().split('T')[0];
      const overdueAmount = invoices
        ?.filter(inv => 
          inv.due_date && 
          inv.due_date < today && 
          (inv.total_cents || 0) > (inv.amount_paid_cents || 0) &&
          inv.status !== 'cancelled'
        )
        .reduce((sum, inv) => sum + ((inv.total_cents || 0) - (inv.amount_paid_cents || 0)), 0) || 0;

      setStats({
        totalRevenue,
        amountPaid,
        amountDue,
        overdueAmount,
        loading: false,
      });
    } catch (error) {
      console.error('Error loading invoice stats:', error);
      setStats(prev => ({ ...prev, loading: false }));
    }
  };

  const statCards = [
    {
      label: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue),
      icon: DollarSign,
      color: 'text-blue-400',
    },
    {
      label: 'Amount Paid',
      value: formatCurrency(stats.amountPaid),
      icon: CheckCircle,
      color: 'text-green-400',
    },
    {
      label: 'Amount Due',
      value: formatCurrency(stats.amountDue),
      icon: Clock,
      color: 'text-yellow-400',
    },
    {
      label: 'Overdue',
      value: formatCurrency(stats.overdueAmount),
      icon: AlertTriangle,
      color: 'text-red-400',
    },
  ];

  if (stats.loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map(i => (
          <Card key={i} className="business-glass-card p-6 animate-pulse">
            <div className="h-20" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat) => (
        <Card key={stat.label} className="business-glass-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm" style={{ color: 'var(--business-text-secondary)' }}>
                {stat.label}
              </p>
              <p className="text-2xl font-bold mt-1" style={{ color: 'var(--business-text-primary)' }}>
                {stat.value}
              </p>
            </div>
            <stat.icon className={`h-10 w-10 ${stat.color}`} />
          </div>
        </Card>
      ))}
    </div>
  );
};
