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

interface EstimateEditorProps {
  estimateId?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const EstimateEditor = ({ estimateId, onSuccess, onCancel }: EstimateEditorProps) => {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: crypto.randomUUID(), description: '', quantity: 1, unit: 'each', unit_price_cents: 0, line_total_cents: 0, category: 'labor' }
  ]);
  const [formData, setFormData] = useState({
    client_id: '',
    project_id: '',
    estimate_title: '',
    status: 'draft',
    valid_until: '',
    discount_amount: 0,
    discount_is_percentage: true,
    tax_rate: 0.13,
    notes: '',
    terms_conditions: 'This estimate is valid for 30 days from the date of issue.',
  });

  useEffect(() => {
    if (estimateId) {
      loadEstimate();
    }
  }, [estimateId]);

  useEffect(() => {
    if (formData.client_id) {
      loadClientProjects();
    }
  }, [formData.client_id]);

  const loadEstimate = async () => {
    const { data, error } = await supabase
      .from('business_estimates')
      .select('*, business_estimate_line_items(*)')
      .eq('id', estimateId)
      .single();

    if (error || !data) {
      toast.error('Failed to load estimate');
      return;
    }

    setFormData({
      client_id: data.client_id,
      project_id: data.project_id || '',
      estimate_title: data.estimate_date || '',
      status: data.status,
      valid_until: data.valid_until || '',
      discount_amount: data.discount_percentage || 0,
      discount_is_percentage: data.discount_type === 'percentage',
      tax_rate: data.tax_rate || 0.13,
      notes: data.notes || '',
      terms_conditions: data.terms_and_conditions || '',
    });

    if (data.business_estimate_line_items?.length > 0) {
      setLineItems(data.business_estimate_line_items.map((item: any) => ({
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

  const loadClientProjects = async () => {
    const { data } = await supabase
      .from('business_projects')
      .select('id, project_number, project_name')
      .eq('client_id', formData.client_id)
      .order('created_at', { ascending: false });

    setProjects(data || []);
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

    const estimateData: any = {
      client_id: formData.client_id,
      project_id: formData.project_id || null,
      estimate_date: formData.estimate_title,
      status: formData.status,
      valid_until: formData.valid_until || null,
      subtotal_cents: totals.subtotal_cents,
      discount_percentage: formData.discount_amount,
      discount_type: formData.discount_is_percentage ? 'percentage' : 'fixed',
      discount_amount_cents: totals.discount_cents,
      tax_rate: formData.tax_rate,
      tax_amount_cents: totals.tax_amount_cents,
      total_cents: totals.total_cents,
      notes: formData.notes,
      terms_and_conditions: formData.terms_conditions,
    };

    if (estimateId) {
      const { error } = await supabase
        .from('business_estimates')
        .update(estimateData)
        .eq('id', estimateId);

      if (error) {
        toast.error('Failed to update estimate');
        setLoading(false);
        return;
      }

      // Delete old line items
      await supabase.from('business_estimate_line_items').delete().eq('estimate_id', estimateId);

      // Insert new line items
      const lineItemsData = lineItems.map((item, index) => ({
        estimate_id: estimateId,
        line_number: index + 1,
        description: item.description,
        quantity: item.quantity,
        unit: item.unit,
        unit_price_cents: item.unit_price_cents,
        line_total_cents: item.line_total_cents,
        category: item.category,
      }));

      await supabase.from('business_estimate_line_items').insert(lineItemsData);

      toast.success('Estimate updated successfully');
    } else {
      const { data: newEstimate, error } = await supabase
        .from('business_estimates')
        .insert([estimateData])
        .select()
        .single();

      if (error || !newEstimate) {
        toast.error('Failed to create estimate');
        setLoading(false);
        return;
      }

      const lineItemsData = lineItems.map((item, index) => ({
        estimate_id: newEstimate.id,
        line_number: index + 1,
        description: item.description,
        quantity: item.quantity,
        unit: item.unit,
        unit_price_cents: item.unit_price_cents,
        line_total_cents: item.line_total_cents,
        category: item.category,
      }));

      await supabase.from('business_estimate_line_items').insert(lineItemsData);

      toast.success('Estimate created successfully');
    }

    setLoading(false);
    onSuccess();
  };

  const totals = calculateInvoiceTotals(
    lineItems,
    formData.tax_rate,
    formData.discount_amount,
    formData.discount_is_percentage
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Client *</Label>
          <ClientSelector
            value={formData.client_id}
            onChange={(clientId) => setFormData({ ...formData, client_id: clientId, project_id: '' })}
            required
          />
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
          <Label htmlFor="estimate_title">Estimate Title *</Label>
          <Input
            id="estimate_title"
            value={formData.estimate_title}
            onChange={(e) => setFormData({ ...formData, estimate_title: e.target.value })}
            required
          />
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
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="valid_until">Valid Until</Label>
          <Input
            id="valid_until"
            type="date"
            value={formData.valid_until}
            onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label>Line Items *</Label>
        <LineItemEditor lineItems={lineItems} onChange={setLineItems} />
      </div>

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
        <Label htmlFor="terms_conditions">Terms & Conditions</Label>
        <Textarea
          id="terms_conditions"
          rows={3}
          value={formData.terms_conditions}
          onChange={(e) => setFormData({ ...formData, terms_conditions: e.target.value })}
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : estimateId ? 'Update Estimate' : 'Create Estimate'}
        </Button>
      </div>
    </form>
  );
};
