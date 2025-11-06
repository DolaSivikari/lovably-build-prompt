import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { EstimateStats } from "@/components/business/EstimateStats";
import { EstimateList } from "@/components/business/EstimateList";
import { EstimateEditor } from "@/components/business/EstimateEditor";
import { EstimatePDF } from "@/components/business/EstimatePDF";
import { PDFDownloadButton } from "@/components/business/PDFDownloadButton";

export default function BusinessEstimates() {
  const { isLoading, isAdmin } = useAdminAuth();
  const [estimates, setEstimates] = useState<any[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [editingEstimate, setEditingEstimate] = useState<any>(null);
  const [companyInfo, setCompanyInfo] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isAdmin) {
      fetchEstimates();
      fetchCompanyInfo();
    }
  }, [isAdmin]);

  const fetchCompanyInfo = async () => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("company_name, phone, email, address")
        .eq("is_active", true)
        .single();
      
      if (error) throw error;
      if (data) {
        setCompanyInfo({
          name: data.company_name,
          phone: data.phone,
          email: data.email,
          address: data.address,
        });
      }
    } catch (error) {
      console.error("Error fetching company info:", error);
    }
  };

  const fetchEstimates = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("estimates")
        .select(`
          *,
          client:clients(name, company, email, phone),
          project:business_projects(name)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setEstimates(data || []);
    } catch (error) {
      toast({
        title: "Error loading estimates",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  };

  const handleSave = async (formData: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      if (editingEstimate) {
        const { error } = await supabase
          .from("estimates")
          .update({ ...formData, user_id: user.id })
          .eq("id", editingEstimate.id);
        if (error) throw error;
        toast({ title: "Estimate updated successfully" });
      } else {
        const { error } = await supabase
          .from("estimates")
          .insert({ ...formData, user_id: user.id, status: "draft" });
        if (error) throw error;
        toast({ title: "Estimate created successfully" });
      }

      setShowEditor(false);
      setEditingEstimate(null);
      fetchEstimates();
    } catch (error) {
      toast({
        title: "Error saving estimate",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this estimate?")) return;

    try {
      const { error } = await supabase.from("estimates").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Estimate deleted successfully" });
      fetchEstimates();
    } catch (error) {
      toast({
        title: "Error deleting estimate",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  };

  const stats = {
    total: estimates.length,
    draft: estimates.filter(e => e.status === "draft").length,
    sent: estimates.filter(e => e.status === "sent").length,
    approved: estimates.filter(e => e.status === "approved").length,
    totalValue: estimates.reduce((sum, e) => sum + e.total_cents, 0),
  };

  if (isLoading) return <div className="p-8">Loading...</div>;

  if (showEditor) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{editingEstimate ? "Edit" : "Create"} Estimate</h1>
        </div>
        <Card className="p-6">
          <EstimateEditor
            estimate={editingEstimate}
            onSave={handleSave}
            onCancel={() => { setShowEditor(false); setEditingEstimate(null); }}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Estimates</h1>
          <p className="text-muted-foreground">Manage project estimates</p>
        </div>
        <Button onClick={() => { setEditingEstimate(null); setShowEditor(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Create Estimate
        </Button>
      </div>

      <EstimateStats {...stats} />

      <Card>
        <EstimateList
          estimates={estimates}
          onEdit={(id) => { setEditingEstimate(estimates.find(e => e.id === id)); setShowEditor(true); }}
          onDelete={handleDelete}
          onDownload={(id) => {
            const estimate = estimates.find(e => e.id === id);
            if (estimate && companyInfo) {
              // Trigger PDF download via PDFDownloadButton
              const pdfElement = document.createElement('div');
              document.body.appendChild(pdfElement);
              
              const root = document.createElement('div');
              pdfElement.appendChild(root);
              
              import('react-dom/client').then(({ createRoot }) => {
                const reactRoot = createRoot(root);
                reactRoot.render(
                  <PDFDownloadButton
                    fileName={`estimate-${estimate.estimate_number}.pdf`}
                    pdfDocument={<EstimatePDF estimate={estimate} client={estimate.client} companyInfo={companyInfo} />}
                  />
                );
                
                setTimeout(() => {
                  const button = root.querySelector('button');
                  if (button) {
                    button.click();
                    setTimeout(() => {
                      reactRoot.unmount();
                      document.body.removeChild(pdfElement);
                    }, 100);
                  }
                }, 100);
              });
            }
          }}
        />
      </Card>
    </div>
  );
}
