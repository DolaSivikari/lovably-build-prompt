import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { EstimateStats } from '@/components/business/EstimateStats';
import { EstimateList } from '@/components/business/EstimateList';
import { EstimateEditor } from '@/components/business/EstimateEditor';
import { InvoiceEditor } from '@/components/business/InvoiceEditor';
import { toast } from 'sonner';

interface Estimate {
  id: string;
  estimate_number: string;
  client_id: string;
  project_id: string | null;
  status: string;
  estimate_date: string;
  valid_until: string;
  total_cents: number;
}

export const BusinessEstimates = () => {
  const [showEditor, setShowEditor] = useState(false);
  const [editingId, setEditingId] = useState<string | undefined>();
  const [convertingEstimate, setConvertingEstimate] = useState<Estimate | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEdit = (id: string) => {
    setEditingId(id);
    setShowEditor(true);
  };

  const handleNewEstimate = () => {
    setEditingId(undefined);
    setShowEditor(true);
  };

  const handleSuccess = () => {
    setShowEditor(false);
    setEditingId(undefined);
    setConvertingEstimate(null);
    setRefreshKey(prev => prev + 1);
  };

  const handleConvertToInvoice = (estimate: Estimate) => {
    if (estimate.status !== 'accepted') {
      toast.error('Only accepted estimates can be converted to invoices');
      return;
    }
    setConvertingEstimate(estimate);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="business-page-title">Estimates</h1>
          <p className="business-page-subtitle">Create and manage project quotes</p>
        </div>
        <Button onClick={handleNewEstimate} className="gap-2">
          <Plus className="h-4 w-4" />
          New Estimate
        </Button>
      </div>

      <EstimateStats key={`stats-${refreshKey}`} />
      
      <EstimateList
        key={`list-${refreshKey}`}
        onEdit={handleEdit}
        onConvertToInvoice={handleConvertToInvoice}
        onRefresh={() => setRefreshKey(prev => prev + 1)}
      />

      <Dialog open={showEditor} onOpenChange={setShowEditor}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingId ? 'Edit Estimate' : 'New Estimate'}
            </DialogTitle>
          </DialogHeader>
          <EstimateEditor
            estimateId={editingId}
            onSuccess={handleSuccess}
            onCancel={() => setShowEditor(false)}
          />
        </DialogContent>
      </Dialog>

      {convertingEstimate && (
        <Dialog open={true} onOpenChange={() => setConvertingEstimate(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Convert to Invoice</DialogTitle>
              <DialogDescription>
                Converting estimate {convertingEstimate.estimate_number} to invoice...
              </DialogDescription>
            </DialogHeader>
            <InvoiceEditor
              onSuccess={handleSuccess}
              onCancel={() => setConvertingEstimate(null)}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
