import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LineItemEditor } from "./LineItemEditor";
import { ClientSelector } from "./ClientSelector";
import { calculateInvoiceTotals } from "@/utils/calculations";
import { formatCurrency } from "@/utils/currency";
import { LineItem } from "@/utils/calculations";

interface EstimateEditorProps {
  estimate?: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export const EstimateEditor = ({
  estimate,
  onSave,
  onCancel,
}: EstimateEditorProps) => {
  const [estimateNumber, setEstimateNumber] = useState(
    estimate?.estimate_number || `EST-${Date.now()}`,
  );
  const [clientId, setClientId] = useState(estimate?.client_id || "");
  const [lineItems, setLineItems] = useState<LineItem[]>(
    estimate?.line_items || [],
  );
  const [notes, setNotes] = useState(estimate?.notes || "");
  const [validUntil, setValidUntil] = useState(estimate?.valid_until || "");

  const totals = calculateInvoiceTotals(lineItems);

  const handleSubmit = () => {
    onSave({
      estimate_number: estimateNumber,
      client_id: clientId || null,
      line_items: lineItems,
      notes,
      valid_until: validUntil || null,
      ...totals,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label>Estimate Number</Label>
          <Input
            value={estimateNumber}
            onChange={(e) => setEstimateNumber(e.target.value)}
          />
        </div>
        <div>
          <Label>Client</Label>
          <ClientSelector value={clientId} onChange={setClientId} />
        </div>
        <div>
          <Label>Valid Until</Label>
          <Input
            type="date"
            value={validUntil}
            onChange={(e) => setValidUntil(e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label className="mb-2 block">Line Items</Label>
        <LineItemEditor items={lineItems} onChange={setLineItems} />
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-end">
          <div className="w-64 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold">
                {formatCurrency(totals.subtotal_cents)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tax (13%):</span>
              <span className="font-semibold">
                {formatCurrency(totals.tax_amount_cents)}
              </span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>Total:</span>
              <span>{formatCurrency(totals.total_cents)}</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Label>Notes</Label>
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Save Estimate</Button>
      </div>
    </div>
  );
};
