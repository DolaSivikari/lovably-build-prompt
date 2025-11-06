import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CurrencyInput } from './CurrencyInput';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { formatCurrency, dollarsToCents } from '@/utils/currency';
import { format } from 'date-fns';

interface Invoice {
  id: string;
  invoice_number: string;
  total_cents: number;
  amount_paid_cents: number;
}

interface RecordPaymentModalProps {
  invoice: Invoice | null;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const RecordPaymentModal = ({ invoice, open, onClose, onSuccess }: RecordPaymentModalProps) => {
  const [formData, setFormData] = useState({
    amount_cents: 0,
    payment_method: 'cash' as 'cash' | 'check' | 'credit_card' | 'wire_transfer' | 'e_transfer' | 'other',
    payment_date: format(new Date(), 'yyyy-MM-dd'),
    reference_number: '',
    notes: '',
  });
  const [saving, setSaving] = useState(false);

  if (!invoice) return null;

  const balanceDue = invoice.total_cents - invoice.amount_paid_cents;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.amount_cents <= 0) {
      toast.error('Payment amount must be greater than $0');
      return;
    }
    
    if (formData.amount_cents > balanceDue) {
      toast.error('Payment amount cannot exceed balance due');
      return;
    }

    setSaving(true);

    try {
      // Insert payment record
      const { error: paymentError } = await supabase
        .from('business_payments')
        .insert({
          invoice_id: invoice.id,
          amount_cents: formData.amount_cents,
          payment_method: formData.payment_method,
          payment_date: formData.payment_date,
          reference_number: formData.reference_number || null,
          notes: formData.notes || null,
        });

      if (paymentError) throw paymentError;

      // Update invoice amount_paid_cents
      const newAmountPaid = invoice.amount_paid_cents + formData.amount_cents;
      let newStatus: 'paid' | 'partially_paid' = 'partially_paid';
      
      if (newAmountPaid >= invoice.total_cents) {
        newStatus = 'paid';
      }

      const { error: invoiceError } = await supabase
        .from('business_invoices')
        .update({
          amount_paid_cents: newAmountPaid,
          status: newStatus,
        })
        .eq('id', invoice.id);

      if (invoiceError) throw invoiceError;

      toast.success('Payment recorded successfully');
      onSuccess();
      onClose();
      
      // Reset form
      setFormData({
        amount_cents: 0,
        payment_method: 'cash',
        payment_date: format(new Date(), 'yyyy-MM-dd'),
        reference_number: '',
        notes: '',
      });
    } catch (error) {
      console.error('Error recording payment:', error);
      toast.error('Failed to record payment');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Record Payment</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Invoice: {invoice.invoice_number}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span>Total:</span>
              <span className="font-semibold">{formatCurrency(invoice.total_cents)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Paid:</span>
              <span className="text-green-600">{formatCurrency(invoice.amount_paid_cents)}</span>
            </div>
            <div className="flex justify-between text-sm border-t pt-2">
              <span className="font-semibold">Balance Due:</span>
              <span className="font-bold">{formatCurrency(balanceDue)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Payment Amount *</Label>
            <CurrencyInput
              value={formData.amount_cents}
              onChange={(amount_cents) => setFormData({ ...formData, amount_cents })}
              placeholder="0.00"
            />
          </div>

          <div className="space-y-2">
            <Label>Payment Method *</Label>
            <Select
              value={formData.payment_method}
              onValueChange={(value: any) => setFormData({ ...formData, payment_method: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="check">Check</SelectItem>
                <SelectItem value="credit_card">Credit Card</SelectItem>
                <SelectItem value="wire_transfer">Wire Transfer</SelectItem>
                <SelectItem value="e_transfer">E-Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Payment Date *</Label>
            <Input
              type="date"
              value={formData.payment_date}
              onChange={(e) => setFormData({ ...formData, payment_date: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Reference Number</Label>
            <Input
              value={formData.reference_number}
              onChange={(e) => setFormData({ ...formData, reference_number: e.target.value })}
              placeholder="Check #, Transaction ID, etc."
            />
          </div>

          <div className="space-y-2">
            <Label>Notes</Label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional notes..."
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={saving} className="flex-1">
              {saving ? 'Recording...' : 'Record Payment'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
