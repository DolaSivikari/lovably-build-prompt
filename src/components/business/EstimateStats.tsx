import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { FileText, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { formatCurrency } from '@/utils/currency';

export const EstimateStats = () => {
  const [stats, setStats] = useState({
    total: 0,
    acceptedValue: 0,
    pending: 0,
    conversionRate: 0,
    loading: true,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const { data: estimates, error } = await supabase
        .from('business_estimates')
        .select('status, total_cents');

      if (error) throw error;

      const total = estimates?.length || 0;
      const accepted = estimates?.filter(e => e.status === 'accepted') || [];
      const acceptedValue = accepted.reduce((sum, e) => sum + (e.total_cents || 0), 0);
      const pending = estimates?.filter(e => ['sent', 'viewed'].includes(e.status)).length || 0;
      const sent = estimates?.filter(e => ['sent', 'viewed', 'accepted', 'rejected'].includes(e.status)).length || 0;
      const conversionRate = sent > 0 ? (accepted.length / sent) * 100 : 0;

      setStats({
        total,
        acceptedValue,
        pending,
        conversionRate,
        loading: false,
      });
    } catch (error) {
      console.error('Error loading estimate stats:', error);
      setStats(prev => ({ ...prev, loading: false }));
    }
  };

  const statCards = [
    {
      label: 'Total Estimates',
      value: stats.total,
      icon: FileText,
      color: 'text-blue-400',
    },
    {
      label: 'Accepted Value',
      value: formatCurrency(stats.acceptedValue),
      icon: CheckCircle,
      color: 'text-green-400',
    },
    {
      label: 'Pending',
      value: stats.pending,
      icon: Clock,
      color: 'text-yellow-400',
    },
    {
      label: 'Conversion Rate',
      value: `${stats.conversionRate.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'text-purple-400',
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
