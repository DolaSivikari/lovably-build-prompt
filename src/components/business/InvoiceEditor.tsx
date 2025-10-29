import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ClientSelector } from './ClientSelector';
import { LineItemEditor, LineItem } from './LineItemEditor';
import { CurrencyInput } from './CurrencyInput';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { calculateInvoiceTotals } from '@/utils/calculations';
import { formatCurrency } from '@/utils/currency';
import { toast } from 'sonner';
import { UnitCostsModal } from './UnitCostsModal';

interface InvoiceEditorProps {
  invoiceId?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const InvoiceEditor = ({ invoiceId, onSuccess, onCancel }: InvoiceEditorProps) => {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [estimates, setEstimates] = useState<any[]>([]);
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: crypto.randomUUID(), description: '', quantity: 1, unit: 'each', unit_price_cents: 0, line_total_cents: 0, category: 'labor' }
  ]);
  const [showUnitCosts, setShowUnitCosts] = useState(false);
  const [formData, setFormData] = useState({
    client_id: '',
    project_id: '',
    estimate_id: '',
    invoice_type: 'standard',
    status: 'draft',
    issue_date: new Date().toISOString().split('T')[0],
    due_date: '',
    discount_amount: 0,
    discount_is_percentage: true,
    tax_rate: 0.13,
    amount_paid_cents: 0,
    notes: '',
    payment_instructions: 'Payment due within 30 days. Please make checks payable to Ascent Group.',
  });

  useEffect(() => {
    if (invoiceId) {
      loadInvoice();
    }
  }, [invoiceId]);

  useEffect(() => {
    if (formData.client_id) {
      loadClientData();
    }
  }, [formData.client_id]);

  const loadInvoice = async () => {
    const { data, error } = await supabase
      .from('business_invoices')
      .select('*, business_invoice_line_items(*)')
      .eq('id', invoiceId)
      .single();

    if (error || !data) {
      toast.error('Failed to load invoice');
      return;
    }

    setFormData({
      client_id: data.client_id,
      project_id: data.project_id || '',
      estimate_id: data.estimate_id || '',
      invoice_type: data.invoice_type,
      status: data.status,
      issue_date: data.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
      due_date: data.due_date || '',
      discount_amount: data.discount_percentage || 0,
      discount_is_percentage: data.discount_type === 'percentage',
      tax_rate: data.tax_rate || 0.13,
      amount_paid_cents: data.amount_paid_cents || 0,
      notes: data.notes || '',
      payment_instructions: data.payment_instructions || '',
    });

    if (data.business_invoice_line_items?.length > 0) {
      setLineItems(data.business_invoice_line_items.map((item: any) => ({
        id: item.id,
        description: item.description,
        quantity: item.quantity,
        unit: item.unit,
        unit_price_cents: item.unit_price_cents,
        line_total_cents: item.line_total_cents,
        category: item.category,
      })));
    }
  };

  const loadClientData = async () => {
    const [projectsRes, estimatesRes] = await Promise.all([
      supabase
        .from('business_projects')
        .select('id, project_number, project_name')
        .eq('client_id', formData.client_id)
        .order('created_at', { ascending: false }),
      supabase
        .from('business_estimates')
        .select('id, estimate_number, estimate_title, status')
        .eq('client_id', formData.client_id)
        .eq('status', 'accepted')
        .order('created_at', { ascending: false })
    ]);

    setProjects(projectsRes.data || []);
    setEstimates(estimatesRes.data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const totals = calculateInvoiceTotals(
      lineItems,
      formData.tax_rate,
      formData.discount_amount,
      formData.discount_is_percentage
    );

    const invoiceData: any = {
      client_id: formData.client_id,
      project_id: formData.project_id || null,
      estimate_id: formData.estimate_id || null,
      invoice_type: formData.invoice_type,
      status: formData.status,
      due_date: formData.due_date || null,
      subtotal_cents: totals.subtotal_cents,
      discount_percentage: formData.discount_amount,
      discount_type: formData.discount_is_percentage ? 'percentage' : 'fixed',
      discount_amount_cents: totals.discount_cents,
      tax_rate: formData.tax_rate,
      tax_amount_cents: totals.tax_amount_cents,
      total_cents: totals.total_cents,
      amount_paid_cents: formData.amount_paid_cents,
      amount_due_cents: totals.total_cents - formData.amount_paid_cents,
      notes: formData.notes,
      payment_instructions: formData.payment_instructions,
    };

    if (invoiceId) {
      const { error } = await supabase
        .from('business_invoices')
        .update(invoiceData)
        .eq('id', invoiceId);

      if (error) {
        toast.error('Failed to update invoice');
        setLoading(false);
        return;
      }

      await supabase.from('business_invoice_line_items').delete().eq('invoice_id', invoiceId);

      const lineItemsData = lineItems.map((item, index) => ({
        invoice_id: invoiceId,
        line_number: index + 1,
        description: item.description,
        quantity: item.quantity,
        unit: item.unit,
        unit_price_cents: item.unit_price_cents,
        line_total_cents: item.line_total_cents,
        category: item.category,
      }));

      await supabase.from('business_invoice_line_items').insert(lineItemsData);

      toast.success('Invoice updated successfully');
    } else {
      const { data: newInvoice, error } = await supabase
        .from('business_invoices')
        .insert([invoiceData])
        .select()
        .single();

      if (error || !newInvoice) {
        toast.error('Failed to create invoice');
        setLoading(false);
        return;
      }

      const lineItemsData = lineItems.map((item, index) => ({
        invoice_id: newInvoice.id,
        line_number: index + 1,
        description: item.description,
        quantity: item.quantity,
        unit: item.unit,
        unit_price_cents: item.unit_price_cents,
        line_total_cents: item.line_total_cents,
        category: item.category,
      }));

      await supabase.from('business_invoice_line_items').insert(lineItemsData);

      toast.success('Invoice created successfully');
    }

    setLoading(false);
    onSuccess();
  };

  const handleUnitCostSelect = (unitCost: any) => {
    const newItem = {
      id: crypto.randomUUID(),
      description: unitCost.name + (unitCost.description ? ` - ${unitCost.description}` : ''),
      quantity: 1,
      unit: unitCost.unit,
      unit_price_cents: unitCost.cost_cents,
      line_total_cents: unitCost.cost_cents,
      category: unitCost.category,
    };
    setLineItems([...lineItems, newItem]);
  };

  const totals = calculateInvoiceTotals(
    lineItems,
    formData.tax_rate,
    formData.discount_amount,
    formData.discount_is_percentage
  );

  const balanceDue = totals.total_cents - formData.amount_paid_cents;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Client *</Label>
          <ClientSelector
            value={formData.client_id}
            onChange={(clientId) => setFormData({ ...formData, client_id: clientId || '', project_id: '', estimate_id: '' })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="invoice_type">Invoice Type</Label>
          <Select value={formData.invoice_type} onValueChange={(value) => setFormData({ ...formData, invoice_type: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="progress">Progress</SelectItem>
              <SelectItem value="final">Final</SelectItem>
              <SelectItem value="deposit">Deposit</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="project_id">Project (Optional)</Label>
          <Select value={formData.project_id} onValueChange={(value) => setFormData({ ...formData, project_id: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((project) => (
                <SelectItem key={project.id} value={project.id}>
                  {project.project_number} - {project.project_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="estimate_id">Estimate (Optional)</Label>
          <Select value={formData.estimate_id} onValueChange={(value) => setFormData({ ...formData, estimate_id: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select estimate" />
            </SelectTrigger>
            <SelectContent>
              {estimates.map((estimate) => (
                <SelectItem key={estimate.id} value={estimate.id}>
                  {estimate.estimate_number} - {estimate.estimate_title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="sent">Sent</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="partially_paid">Partially Paid</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="issue_date">Issue Date *</Label>
          <Input
            id="issue_date"
            type="date"
            value={formData.issue_date}
            onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="due_date">Due Date</Label>
          <Input
            id="due_date"
            type="date"
            value={formData.due_date}
            onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label>Line Items *</Label>
        <LineItemEditor
          lineItems={lineItems}
          onChange={setLineItems}
          onOpenUnitCosts={() => setShowUnitCosts(true)}
        />
      </div>

      <UnitCostsModal
        open={showUnitCosts}
        onClose={() => setShowUnitCosts(false)}
        onSelect={handleUnitCostSelect}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Discount</Label>
          <div className="flex gap-2">
            <CurrencyInput
              value={formData.discount_is_percentage ? formData.discount_amount * 100 : formData.discount_amount}
              onChange={(value) => setFormData({ ...formData, discount_amount: formData.discount_is_percentage ? value / 100 : value })}
            />
            <Select
              value={formData.discount_is_percentage ? 'percentage' : 'fixed'}
              onValueChange={(value) => setFormData({ ...formData, discount_is_percentage: value === 'percentage' })}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">%</SelectItem>
                <SelectItem value="fixed">$</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Tax Rate (%)</Label>
          <Input
            type="number"
            step="0.01"
            value={formData.tax_rate * 100}
            onChange={(e) => setFormData({ ...formData, tax_rate: parseFloat(e.target.value) / 100 })}
          />
        </div>

        <div className="space-y-2">
          <Label>Amount Paid</Label>
          <CurrencyInput
            value={formData.amount_paid_cents}
            onChange={(cents) => setFormData({ ...formData, amount_paid_cents: cents })}
          />
        </div>
      </div>

      <div className="business-glass-card p-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span className="font-medium">{formatCurrency(totals.subtotal_cents)}</span>
          </div>
          {totals.discount_cents > 0 && (
            <div className="flex justify-between text-red-400">
              <span>Discount:</span>
              <span>-{formatCurrency(totals.discount_cents)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Tax ({(formData.tax_rate * 100).toFixed(2)}%):</span>
            <span>{formatCurrency(totals.tax_amount_cents)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold pt-2 border-t border-white/10">
            <span>Total:</span>
            <span>{formatCurrency(totals.total_cents)}</span>
          </div>
          {formData.amount_paid_cents > 0 && (
            <>
              <div className="flex justify-between text-green-400">
                <span>Amount Paid:</span>
                <span>-{formatCurrency(formData.amount_paid_cents)}</span>
              </div>
              <div className="flex justify-between text-2xl font-bold pt-2 border-t border-white/10">
                <span>Balance Due:</span>
                <span style={{ color: balanceDue > 0 ? 'var(--business-warning)' : 'var(--business-success)' }}>
                  {formatCurrency(Math.max(0, balanceDue))}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          rows={3}
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="payment_instructions">Payment Instructions</Label>
        <Textarea
          id="payment_instructions"
          rows={3}
          value={formData.payment_instructions}
          onChange={(e) => setFormData({ ...formData, payment_instructions: e.target.value })}
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : invoiceId ? 'Update Invoice' : 'Create Invoice'}
        </Button>
      </div>
    </form>
  );
};
