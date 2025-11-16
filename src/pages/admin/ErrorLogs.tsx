import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/ui/Button";
import { AlertCircle, RefreshCw, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ErrorLog {
  id: string;
  message: string;
  stack: string | null;
  context: any;
  url: string;
  user_agent: string;
  created_at: string;
}

const ErrorLogs = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin, isLoading: authLoading } = useAdminAuth();
  const [logs, setLogs] = useState<ErrorLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [groupedErrors, setGroupedErrors] = useState<Map<string, ErrorLog[]>>(new Map());

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate("/auth");
    } else if (isAdmin) {
      loadLogs();
    }
  }, [isAdmin, authLoading, navigate]);

  const loadLogs = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('error_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load error logs",
        variant: "destructive",
      });
    } else if (data) {
      setLogs(data);
      groupErrors(data);
    }
    setIsLoading(false);
  };

  const groupErrors = (errorLogs: ErrorLog[]) => {
    const grouped = new Map<string, ErrorLog[]>();
    errorLogs.forEach((log) => {
      const key = log.message;
      if (!grouped.has(key)) {
        grouped.set(key, []);
      }
      grouped.get(key)?.push(log);
    });
    setGroupedErrors(grouped);
  };

  const clearOldLogs = async () => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { error } = await supabase
      .from('error_logs')
      .delete()
      .lt('created_at', sevenDaysAgo.toISOString());

    if (error) {
      toast({
        title: "Error",
        description: "Failed to clear old logs",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Old logs cleared successfully",
      });
      loadLogs();
    }
  };

  if (authLoading || isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-6 w-6 text-destructive" />
              <h1 className="text-2xl font-bold">Error Logs</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={loadLogs}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm" onClick={clearOldLogs}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Old Logs
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Total Errors</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{logs.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Unique Errors</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{groupedErrors.size}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Last 24 Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {logs.filter(log => {
                  const logDate = new Date(log.created_at);
                  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
                  return logDate > oneDayAgo;
                }).length}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {Array.from(groupedErrors.entries()).map(([message, errorGroup]) => (
            <Card key={message}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-base font-mono">{message}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {new Date(errorGroup[0].created_at).toLocaleString()}
                    </p>
                  </div>
                  <Badge variant="destructive">{errorGroup.length}x</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <strong>URL:</strong> {errorGroup[0].url}
                  </div>
                  {errorGroup[0].stack && (
                    <details className="text-xs">
                      <summary className="cursor-pointer font-semibold">Stack Trace</summary>
                      <pre className="mt-2 p-2 bg-muted rounded overflow-x-auto">
                        {errorGroup[0].stack}
                      </pre>
                    </details>
                  )}
                  {errorGroup[0].context && (
                    <details className="text-xs">
                      <summary className="cursor-pointer font-semibold">Context</summary>
                      <pre className="mt-2 p-2 bg-muted rounded overflow-x-auto">
                        {JSON.stringify(errorGroup[0].context, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {logs.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg text-muted-foreground">No errors logged</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default ErrorLogs;
