import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const NavigationBuilder = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Navigation Builder</h1>
        <p className="text-muted-foreground">Manage site navigation and mega menus</p>
      </div>

      <Card className="p-8 text-center">
        <AlertCircle className="w-12 h-12 text-steel-blue mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Navigation Builder - Coming Soon</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          The navigation builder will allow you to manage all site navigation menus with a drag-and-drop interface. 
          For now, navigation is managed via database records.
        </p>
        <p className="text-sm text-muted-foreground">
          Currently using static navigation structure. Advanced editor coming in Phase 1 completion.
        </p>
      </Card>
    </div>
  );
};

export default NavigationBuilder;
