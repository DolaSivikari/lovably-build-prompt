import { useState } from "react";
import { Button } from "@/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, Database, Trash2, Upload } from "lucide-react";
import { migrateNavigationData, clearNavigationData } from "@/utils/migrateNavigationData";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const NavigationMigration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message?: string; error?: string; itemsCreated?: number } | null>(null);

  const handleMigrate = async () => {
    setIsLoading(true);
    setResult(null);
    
    const migrationResult = await migrateNavigationData();
    setResult(migrationResult);
    setIsLoading(false);

    if (migrationResult.success) {
      toast({
        title: "Migration Complete",
        description: migrationResult.message,
      });
    } else {
      toast({
        title: "Migration Failed",
        description: migrationResult.error,
        variant: "destructive",
      });
    }
  };

  const handleClear = async () => {
    if (!confirm("⚠️ This will DELETE ALL navigation items from the database. Are you sure?")) {
      return;
    }

    setIsLoading(true);
    const clearResult = await clearNavigationData();
    setIsLoading(false);

    if (clearResult.success) {
      toast({
        title: "Data Cleared",
        description: "All navigation items have been deleted",
      });
      setResult(null);
    } else {
      toast({
        title: "Error",
        description: clearResult.error,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate("/admin/navigation")}>
            ← Back to Navigation Builder
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Navigation Data Migration</h1>
            <p className="text-muted-foreground">
              Import hardcoded navigation structure into the database for CMS management
            </p>
          </div>

          <Alert>
            <Database className="h-4 w-4" />
            <AlertTitle>One-Time Setup</AlertTitle>
            <AlertDescription>
              This tool migrates your hardcoded navigation data from <code>navigation-structure-enhanced.ts</code> into 
              the database. Run this once to enable full CMS control over your site's navigation menu.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Migration Actions</CardTitle>
              <CardDescription>
                Import navigation data or clear existing items
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <Button 
                  onClick={handleMigrate} 
                  disabled={isLoading}
                  className="flex-1"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {isLoading ? "Migrating..." : "Import Navigation Data"}
                </Button>
                <Button 
                  onClick={handleClear} 
                  disabled={isLoading}
                  variant="destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Database
                </Button>
              </div>

              {result && (
                <Alert variant={result.success ? "default" : "destructive"}>
                  {result.success ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <AlertTitle>{result.success ? "Success" : "Error"}</AlertTitle>
                  <AlertDescription>
                    {result.success ? result.message : result.error}
                    {result.itemsCreated && (
                      <div className="mt-2">
                        <strong>{result.itemsCreated}</strong> navigation items created
                      </div>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              <div className="text-sm text-muted-foreground space-y-2 pt-4 border-t">
                <p><strong>What this does:</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Reads navigation structure from TypeScript file</li>
                  <li>Converts it to database records</li>
                  <li>Preserves hierarchy (sections → categories → links)</li>
                  <li>Enables drag-drop editing in Navigation Builder</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>After Migration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>Once migration is complete:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Go to <Button variant="link" className="p-0 h-auto" onClick={() => navigate("/admin/navigation")}>Navigation Builder</Button></li>
                <li>Edit menu items using drag-drop interface</li>
                <li>Update <code>Navigation.tsx</code> component to fetch from database</li>
                <li>Remove references to hardcoded navigation file</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default NavigationMigration;
