import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Shield,
  AlertTriangle,
  Users,
  Lock,
  Unlock,
  XCircle,
  CheckCircle,
} from 'lucide-react';
import { format } from 'date-fns';
import { AdminPageLayout } from '@/components/admin/AdminPageLayout';

interface SecurityAlert {
  id: string;
  alert_type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  resolved: boolean;
  created_at: string;
}

interface FailedAttempt {
  id: string;
  user_identifier: string;
  ip_address: string;
  attempt_time: string;
}

interface AccountLockout {
  id: string;
  user_identifier: string;
  locked_at: string;
  locked_until: string;
  reason: string;
  unlocked_at: string | null;
}

interface UserSession {
  id: string;
  user_id: string;
  ip_address: string;
  user_agent: string;
  last_activity: string;
  created_at: string;
}

export default function SecurityCenter() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [failedAttempts, setFailedAttempts] = useState<FailedAttempt[]>([]);
  const [lockouts, setLockouts] = useState<AccountLockout[]>([]);
  const [sessions, setSessions] = useState<UserSession[]>([]);

  useEffect(() => {
    loadSecurityData();
  }, []);

  const loadSecurityData = async () => {
    try {
      setLoading(true);

      const { data: alertsData } = await supabase
        .from('security_alerts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (alertsData) setAlerts(alertsData as SecurityAlert[]);

      const { data: attemptsData } = await supabase
        .from('auth_failed_attempts')
        .select('*')
        .order('attempt_time', { ascending: false })
        .limit(50);

      if (attemptsData) setFailedAttempts(attemptsData);

      const { data: lockoutsData } = await supabase
        .from('auth_account_lockouts')
        .select('*')
        .order('locked_at', { ascending: false })
        .limit(20);

      if (lockoutsData) setLockouts(lockoutsData);

      const { data: sessionsData } = await supabase
        .from('user_sessions')
        .select('*')
        .gte('expires_at', new Date().toISOString())
        .order('last_activity', { ascending: false });

      if (sessionsData) setSessions(sessionsData);
    } catch (error: any) {
      console.error('Error loading security data:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load security data',
      });
    } finally {
      setLoading(false);
    }
  };

  const unlockAccount = async (lockoutId: string, userIdentifier: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('auth_account_lockouts')
        .update({
          unlocked_by: user?.id,
          unlocked_at: new Date().toISOString(),
        })
        .eq('id', lockoutId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: `Account ${userIdentifier} has been unlocked`,
      });

      loadSecurityData();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    }
  };

  const resolveAlert = async (alertId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('security_alerts')
        .update({
          resolved: true,
          resolved_by: user?.id,
          resolved_at: new Date().toISOString(),
        })
        .eq('id', alertId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Alert has been resolved',
      });

      loadSecurityData();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const unresolvedAlerts = alerts.filter(a => !a.resolved);
  const activeLockouts = lockouts.filter(l => !l.unlocked_at && new Date(l.locked_until) > new Date());

  return (
    <AdminPageLayout
      title="Security Center"
      description="Monitor and manage authentication security"
      loading={loading}
    >
      {/* Security Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unresolvedAlerts.length}</div>
            <p className="text-xs text-muted-foreground">Unresolved security alerts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Attempts</CardTitle>
            <XCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{failedAttempts.length}</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account Lockouts</CardTitle>
            <Lock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeLockouts.length}</div>
            <p className="text-xs text-muted-foreground">Currently locked accounts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sessions.length}</div>
            <p className="text-xs text-muted-foreground">Current active users</p>
          </CardContent>
        </Card>
      </div>

      {/* Security Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Security Alerts
          </CardTitle>
          <CardDescription>Recent security events requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          {alerts.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No security alerts</p>
          ) : (
            <div className="space-y-3">
              {alerts.slice(0, 10).map((alert) => (
                <div key={alert.id} className="flex items-start justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={getSeverityColor(alert.severity) as any}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                      <span className="text-sm font-medium">{alert.alert_type}</span>
                      {alert.resolved && <CheckCircle className="h-4 w-4 text-primary" />}
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {format(new Date(alert.created_at), 'MMM dd, yyyy HH:mm:ss')}
                    </p>
                  </div>
                  {!alert.resolved && (
                    <Button size="sm" variant="outline" onClick={() => resolveAlert(alert.id)}>
                      Resolve
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Account Lockouts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Account Lockouts
            </CardTitle>
            <CardDescription>Locked accounts due to failed login attempts</CardDescription>
          </CardHeader>
          <CardContent>
            {lockouts.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No account lockouts</p>
            ) : (
              <div className="space-y-3">
                {lockouts.map((lockout) => {
                  const isActive = !lockout.unlocked_at && new Date(lockout.locked_until) > new Date();
                  return (
                    <div key={lockout.id} className="flex items-start justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{lockout.user_identifier}</p>
                        <p className="text-sm text-muted-foreground">{lockout.reason}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {isActive ? (
                            <>Until: {format(new Date(lockout.locked_until), 'MMM dd, yyyy HH:mm')}</>
                          ) : lockout.unlocked_at ? (
                            <>Unlocked: {format(new Date(lockout.unlocked_at), 'MMM dd, yyyy HH:mm')}</>
                          ) : (
                            <>Expired: {format(new Date(lockout.locked_until), 'MMM dd, yyyy HH:mm')}</>
                          )}
                        </p>
                      </div>
                      {isActive && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => unlockAccount(lockout.id, lockout.user_identifier)}
                        >
                          <Unlock className="h-4 w-4 mr-1" />
                          Unlock
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Failed Login Attempts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <XCircle className="h-5 w-5" />
              Failed Login Attempts
            </CardTitle>
            <CardDescription>Recent unsuccessful authentication attempts</CardDescription>
          </CardHeader>
          <CardContent>
            {failedAttempts.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No failed attempts</p>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {failedAttempts.map((attempt) => (
                  <div key={attempt.id} className="p-3 border rounded-lg">
                    <p className="font-medium">{attempt.user_identifier}</p>
                    <p className="text-sm text-muted-foreground">IP: {attempt.ip_address}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {format(new Date(attempt.attempt_time), 'MMM dd, yyyy HH:mm:ss')}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminPageLayout>
  );
}
