import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { InvoiceStats } from '@/components/business/InvoiceStats';
import { InvoiceList } from '@/components/business/InvoiceList';
import { InvoiceEditor } from '@/components/business/InvoiceEditor';
import { RecordPaymentModal } from '@/components/business/RecordPaymentModal';

interface Invoice {
  id: string;
  invoice_number: string;
  total_cents: number;
  amount_paid_cents: number;
}

export const BusinessInvoices = () => {
  const [showEditor, setShowEditor] = useState(false);
  const [editingId, setEditingId] = useState<string | undefined>();
  const [paymentInvoice, setPaymentInvoice] = useState<Invoice | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEdit = (id: string) => {
    setEditingId(id);
    setShowEditor(true);
  };

  const handleNewInvoice = () => {
    setEditingId(undefined);
    setShowEditor(true);
  };

  const handleSuccess = () => {
    setShowEditor(false);
    setEditingId(undefined);
    setRefreshKey(prev => prev + 1);
  };

  const handleRecordPayment = (invoice: Invoice) => {
    setPaymentInvoice(invoice);
  };

  const handlePaymentSuccess = () => {
    setPaymentInvoice(null);
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="business-page-title">Invoices</h1>
          <p className="business-page-subtitle">Manage invoices and payments</p>
        </div>
        <Button onClick={handleNewInvoice} className="gap-2">
          <Plus className="h-4 w-4" />
          New Invoice
        </Button>
      </div>

      <InvoiceStats key={`stats-${refreshKey}`} />
      
      <InvoiceList
        key={`list-${refreshKey}`}
        onEdit={handleEdit}
        onRecordPayment={handleRecordPayment}
        onRefresh={() => setRefreshKey(prev => prev + 1)}
      />

      <Dialog open={showEditor} onOpenChange={setShowEditor}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editingId ? 'Edit Invoice' : 'New Invoice'}
            </DialogTitle>
          </DialogHeader>
          <InvoiceEditor
            invoiceId={editingId}
            onSuccess={handleSuccess}
            onCancel={() => setShowEditor(false)}
          />
        </DialogContent>
      </Dialog>

      <RecordPaymentModal
        invoice={paymentInvoice}
        open={!!paymentInvoice}
        onClose={() => setPaymentInvoice(null)}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};
