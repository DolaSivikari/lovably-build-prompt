import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Activity,
  Zap,
  Database,
  Image as ImageIcon,
  Loader2,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
} from 'lucide-react';
import { format } from 'date-fns';

interface PerformanceMetric {
  id: string;
  metric_type: string;
  metric_name: string;
  value: number;
  unit: string;
  recorded_at: string;
}

interface OptimizationRecommendation {
  id: string;
  category: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in_progress' | 'completed' | 'dismissed';
  created_at: string;
}

export default function PerformanceDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [recommendations, setRecommendations] = useState<OptimizationRecommendation[]>([]);

  useEffect(() => {
    checkAuth();
    loadPerformanceData();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate('/auth');
      return;
    }

    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .single();

    if (!roleData || !['admin', 'super_admin'].includes(roleData.role)) {
      navigate('/admin');
      toast({
        variant: 'destructive',
        title: 'Access Denied',
        description: 'You do not have permission to access the Performance Dashboard',
      });
    }
  };

  const loadPerformanceData = async () => {
    try {
      setLoading(true);

      // Load recent metrics
      const { data: metricsData } = await supabase
        .from('performance_metrics')
        .select('*')
        .gte('recorded_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
        .order('recorded_at', { ascending: false })
        .limit(100);

      if (metricsData) setMetrics(metricsData);

      // Load optimization recommendations
      const { data: recsData } = await supabase
        .from('optimization_recommendations')
        .select('*')
        .order('created_at', { ascending: false });

      if (recsData) setRecommendations(recsData as OptimizationRecommendation[]);
    } catch (error: any) {
      console.error('Error loading performance data:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load performance data',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateRecommendationStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('optimization_recommendations')
        .update({ 
          status,
          resolved_by: status === 'completed' ? (await supabase.auth.getUser()).data.user?.id : null,
          resolved_at: status === 'completed' ? new Date().toISOString() : null,
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Recommendation status updated',
      });

      loadPerformanceData();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    }
  };

  const getAverageMetric = (type: string, name: string) => {
    const filtered = metrics.filter((m) => m.metric_type === type && m.metric_name === name);
    if (filtered.length === 0) return 0;
    return filtered.reduce((sum, m) => sum + m.value, 0) / filtered.length;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'images': return ImageIcon;
      case 'database': return Database;
      case 'caching': return Zap;
      default: return Activity;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const avgPageLoad = getAverageMetric('page_load', 'initial_load');
  const avgApiResponse = getAverageMetric('api_response', 'average');
  const avgDbQuery = getAverageMetric('database_query', 'average');

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <Activity className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Performance Dashboard</h1>
          <p className="text-muted-foreground">Monitor and optimize your site's performance</p>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Page Load</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgPageLoad.toFixed(0)}ms</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              {avgPageLoad < 1500 ? (
                <>
                  <TrendingUp className="h-3 w-3 text-primary" />
                  Excellent
                </>
              ) : (
                <>
                  <TrendingDown className="h-3 w-3 text-destructive" />
                  Needs improvement
                </>
              )}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg API Response</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgApiResponse.toFixed(0)}ms</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              {avgApiResponse < 500 ? (
                <>
                  <TrendingUp className="h-3 w-3 text-primary" />
                  Fast
                </>
              ) : (
                <>
                  <TrendingDown className="h-3 w-3 text-destructive" />
                  Slow
                </>
              )}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg DB Query</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgDbQuery.toFixed(0)}ms</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              {avgDbQuery < 100 ? (
                <>
                  <TrendingUp className="h-3 w-3 text-primary" />
                  Optimized
                </>
              ) : (
                <>
                  <TrendingDown className="h-3 w-3 text-destructive" />
                  Needs indexing
                </>
              )}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Optimization Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Optimization Recommendations</CardTitle>
          <CardDescription>Actions to improve your site's performance</CardDescription>
        </CardHeader>
        <CardContent>
          {recommendations.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <p className="text-lg font-medium">All optimizations complete!</p>
              <p className="text-muted-foreground">Your site is performing optimally</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recommendations.map((rec) => {
                const Icon = getCategoryIcon(rec.category);
                return (
                  <div key={rec.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    <Icon className="h-6 w-6 text-muted-foreground mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{rec.title}</h3>
                        <Badge variant={getPriorityColor(rec.priority) as any}>
                          {rec.priority}
                        </Badge>
                        <Badge variant="outline">{rec.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(rec.created_at), 'MMM dd, yyyy HH:mm')}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {rec.status === 'pending' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateRecommendationStatus(rec.id, 'in_progress')}
                        >
                          Start
                        </Button>
                      )}
                      {rec.status === 'in_progress' && (
                        <Button
                          size="sm"
                          onClick={() => updateRecommendationStatus(rec.id, 'completed')}
                        >
                          Complete
                        </Button>
                      )}
                      {rec.status !== 'dismissed' && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => updateRecommendationStatus(rec.id, 'dismissed')}
                        >
                          Dismiss
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Metrics */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent Performance Metrics</CardTitle>
          <CardDescription>Last 100 recorded measurements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {metrics.map((metric) => (
              <div key={metric.id} className="flex items-center justify-between p-2 border rounded text-sm">
                <div>
                  <span className="font-medium">{metric.metric_name}</span>
                  <span className="text-muted-foreground ml-2">({metric.metric_type})</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono">
                    {metric.value.toFixed(2)} {metric.unit}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(metric.recorded_at), 'HH:mm:ss')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
