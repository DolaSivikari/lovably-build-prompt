import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { InvoiceStats } from "@/components/business/InvoiceStats";
import { InvoiceList } from "@/components/business/InvoiceList";
import { InvoiceEditor } from "@/components/business/InvoiceEditor";
import { InvoicePDF } from "@/components/business/InvoicePDF";
import { PDFDownloadButton } from "@/components/business/PDFDownloadButton";
import { RecordPaymentModal } from "@/components/business/RecordPaymentModal";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";

export default function BusinessInvoices() {
  const { isLoading, isAdmin } = useAdminAuth();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [showEditor, setShowEditor] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<any>(null);
  const [recordingPaymentFor, setRecordingPaymentFor] = useState<any>(null);
  const [companyInfo, setCompanyInfo] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isAdmin) {
      fetchInvoices();
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

  const fetchInvoices = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("invoices")
        .select(`
          *,
          client:clients(name, company, email, phone),
          project:business_projects(name)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setInvoices(data || []);
    } catch (error) {
      toast({
        title: "Error loading invoices",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  };

  const handleSave = async (formData: any) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      if (editingInvoice) {
        const { error } = await supabase
          .from("invoices")
          .update({ ...formData, user_id: user.id })
          .eq("id", editingInvoice.id);
        if (error) throw error;
        toast({ title: "Invoice updated successfully" });
      } else {
        const { error } = await supabase
          .from("invoices")
          .insert({ ...formData, user_id: user.id, status: "draft" });
        if (error) throw error;
        toast({ title: "Invoice created successfully" });
      }

      setShowEditor(false);
      setEditingInvoice(null);
      fetchInvoices();
    } catch (error) {
      toast({
        title: "Error saving invoice",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  };

  const handleRecordPayment = async (payment: { amount_cents: number; payment_date: string; notes?: string }) => {
    if (!recordingPaymentFor) return;

    try {
      const newPaidCents = recordingPaymentFor.paid_cents + payment.amount_cents;
      const newBalanceCents = recordingPaymentFor.total_cents - newPaidCents;
      const newStatus = newBalanceCents === 0 ? "paid" : "sent";

      const { error } = await supabase
        .from("invoices")
        .update({
          paid_cents: newPaidCents,
          balance_cents: newBalanceCents,
          status: newStatus,
        })
        .eq("id", recordingPaymentFor.id);

      if (error) throw error;
      toast({ title: "Payment recorded successfully" });
      setRecordingPaymentFor(null);
      fetchInvoices();
    } catch (error) {
      toast({
        title: "Error recording payment",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  };

  const handleDeleteClick = (id: string) => {
    setInvoiceToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!invoiceToDelete) return;

    try {
      const { error } = await supabase.from("invoices").delete().eq("id", invoiceToDelete);
      if (error) throw error;
      toast({ title: "Invoice deleted successfully" });
      fetchInvoices();
    } catch (error) {
      toast({
        title: "Error deleting invoice",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
    setInvoiceToDelete(null);
  };

  const stats = {
    total: invoices.length,
    paid: invoices.filter(i => i.status === "paid").length,
    overdue: invoices.filter(i => new Date(i.due_date) < new Date() && i.balance_cents > 0).length,
    outstanding: invoices.reduce((sum, i) => sum + i.balance_cents, 0),
    totalRevenue: invoices.reduce((sum, i) => sum + i.total_cents, 0),
  };

  if (isLoading) return <div className="p-8">Loading...</div>;

  if (showEditor) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{editingInvoice ? "Edit" : "Create"} Invoice</h1>
        </div>
        <Card className="p-6">
          <InvoiceEditor
            invoice={editingInvoice}
            onSave={handleSave}
            onCancel={() => { setShowEditor(false); setEditingInvoice(null); }}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Invoices</h1>
          <p className="text-muted-foreground">Manage invoices and payments</p>
        </div>
        <Button onClick={() => { setEditingInvoice(null); setShowEditor(true); }}>
          <Plus className="h-4 w-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      <InvoiceStats {...stats} />

      <Card>
        <InvoiceList
          invoices={invoices}
          onEdit={(id) => { setEditingInvoice(invoices.find(i => i.id === id)); setShowEditor(true); }}
          onDelete={handleDeleteClick}
          onDownload={(id) => {
            const invoice = invoices.find(i => i.id === id);
            if (invoice && companyInfo) {
              // Trigger PDF download via PDFDownloadButton
              const pdfElement = document.createElement('div');
              document.body.appendChild(pdfElement);
              
              const root = document.createElement('div');
              pdfElement.appendChild(root);
              
              import('react-dom/client').then(({ createRoot }) => {
                const reactRoot = createRoot(root);
                reactRoot.render(
                  <PDFDownloadButton
                    fileName={`invoice-${invoice.invoice_number}.pdf`}
                    pdfDocument={<InvoicePDF invoice={invoice} client={invoice.client} companyInfo={companyInfo} />}
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
          onRecordPayment={(id) => setRecordingPaymentFor(invoices.find(i => i.id === id))}
        />
      </Card>

      {recordingPaymentFor && (
        <RecordPaymentModal
          open={!!recordingPaymentFor}
          onClose={() => setRecordingPaymentFor(null)}
          onSubmit={handleRecordPayment}
          remainingBalance={recordingPaymentFor.balance_cents}
        />
      )}

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Invoice"
        description="Are you sure you want to delete this invoice? This action cannot be undone."
        confirmText="Delete"
        variant="destructive"
      />
    </div>
  );
}
