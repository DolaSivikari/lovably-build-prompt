import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FlaskConical, TrendingUp, Users, DollarSign, Percent } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ABTest {
  id: string;
  test_name: string;
  variants: any; // Json type from Supabase
  is_active: boolean;
  created_at: string;
}

interface TestMetrics {
  variant: string;
  total_users: number;
  conversions: number;
  conversion_rate: number;
  total_value: number;
}

const ABTestManager = () => {
  const [tests, setTests] = useState<ABTest[]>([]);
  const [metrics, setMetrics] = useState<Record<string, TestMetrics[]>>({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = async () => {
    try {
      setLoading(true);
      
      // Load active tests
      const { data: testsData, error: testsError } = await supabase
        .from('ab_tests')
        .select('*')
        .order('created_at', { ascending: false });

      if (testsError) throw testsError;
      setTests(testsData || []);

      // Load metrics for each test
      for (const test of testsData || []) {
        await loadTestMetrics(test.test_name);
      }
    } catch (error) {
      console.error('Error loading A/B tests:', error);
      toast({
        title: 'Error',
        description: 'Failed to load A/B tests',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const loadTestMetrics = async (testName: string) => {
    try {
      const { data, error } = await supabase
        .from('ab_test_assignments')
        .select('variant, converted_at, conversion_value')
        .eq('test_name', testName);

      if (error) throw error;

      // Calculate metrics per variant
      const variantMetrics: Record<string, TestMetrics> = {};
      
      (data || []).forEach((assignment) => {
        if (!variantMetrics[assignment.variant]) {
          variantMetrics[assignment.variant] = {
            variant: assignment.variant,
            total_users: 0,
            conversions: 0,
            conversion_rate: 0,
            total_value: 0,
          };
        }
        
        variantMetrics[assignment.variant].total_users++;
        
        if (assignment.converted_at) {
          variantMetrics[assignment.variant].conversions++;
          variantMetrics[assignment.variant].total_value += assignment.conversion_value || 0;
        }
      });

      // Calculate conversion rates
      Object.values(variantMetrics).forEach((metric) => {
        metric.conversion_rate = metric.total_users > 0 
          ? (metric.conversions / metric.total_users) * 100 
          : 0;
      });

      setMetrics((prev) => ({
        ...prev,
        [testName]: Object.values(variantMetrics),
      }));
    } catch (error) {
      console.error(`Error loading metrics for ${testName}:`, error);
    }
  };

  const toggleTestStatus = async (testId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('ab_tests')
        .update({ is_active: !currentStatus })
        .eq('id', testId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: `Test ${!currentStatus ? 'activated' : 'paused'}`,
      });

      loadTests();
    } catch (error) {
      console.error('Error toggling test status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update test status',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">A/B Testing Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Monitor variant performance and optimize conversion rates
          </p>
        </div>
        <FlaskConical className="h-8 w-8 text-primary" />
      </div>

      {tests.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <FlaskConical className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Active Tests</h3>
              <p className="text-muted-foreground mb-4">
                A/B tests will appear here once they're created in the database
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {tests.map((test) => {
            const testMetrics = metrics[test.test_name] || [];
            const totalUsers = testMetrics.reduce((sum, m) => sum + m.total_users, 0);
            const totalConversions = testMetrics.reduce((sum, m) => sum + m.conversions, 0);
            const avgConversionRate = totalUsers > 0 ? (totalConversions / totalUsers) * 100 : 0;

            return (
              <Card key={test.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {test.test_name}
                        <Badge variant={test.is_active ? 'default' : 'secondary'}>
                          {test.is_active ? 'Active' : 'Paused'}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        Testing {Array.isArray(test.variants) ? test.variants.length : 0} variants • {totalUsers} users assigned
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleTestStatus(test.id, test.is_active)}
                    >
                      {test.is_active ? 'Pause' : 'Activate'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Overall Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-2xl font-bold">{totalUsers}</div>
                        <div className="text-sm text-muted-foreground">Total Users</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-2xl font-bold">{totalConversions}</div>
                        <div className="text-sm text-muted-foreground">Conversions</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Percent className="h-5 w-5 text-primary" />
                      <div>
                        <div className="text-2xl font-bold">{avgConversionRate.toFixed(1)}%</div>
                        <div className="text-sm text-muted-foreground">Avg. Conv. Rate</div>
                      </div>
                    </div>
                  </div>

                  {/* Variant Performance */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-muted-foreground">Variant Performance</h4>
                    {testMetrics.length === 0 ? (
                      <p className="text-sm text-muted-foreground py-4 text-center">
                        No data yet. Users will be assigned when they visit the page.
                      </p>
                    ) : (
                      testMetrics.map((metric) => (
                        <div
                          key={metric.variant}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex-1">
                            <div className="font-semibold">{metric.variant}</div>
                            <div className="text-sm text-muted-foreground">
                              {metric.total_users} users • {metric.conversions} conversions
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <div className="text-lg font-bold">
                                {metric.conversion_rate.toFixed(1)}%
                              </div>
                              <div className="text-xs text-muted-foreground">Conv. Rate</div>
                            </div>
                            {metric.total_value > 0 && (
                              <div className="text-right">
                                <div className="text-lg font-bold flex items-center gap-1">
                                  <DollarSign className="h-4 w-4" />
                                  {metric.total_value.toFixed(0)}
                                </div>
                                <div className="text-xs text-muted-foreground">Total Value</div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ABTestManager;
