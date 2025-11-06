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

interface InvoiceEditorProps {
  invoice?: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export const InvoiceEditor = ({
  invoice,
  onSave,
  onCancel,
}: InvoiceEditorProps) => {
  const [invoiceNumber, setInvoiceNumber] = useState(
    invoice?.invoice_number || `INV-${Date.now()}`,
  );
  const [clientId, setClientId] = useState(invoice?.client_id || "");
  const [lineItems, setLineItems] = useState<LineItem[]>(
    invoice?.line_items || [],
  );
  const [notes, setNotes] = useState(invoice?.notes || "");
  const [issueDate, setIssueDate] = useState(
    invoice?.issue_date || new Date().toISOString().split("T")[0],
  );
  const [dueDate, setDueDate] = useState(invoice?.due_date || "");

  const totals = calculateInvoiceTotals(lineItems);

  const handleSubmit = () => {
    onSave({
      invoice_number: invoiceNumber,
      client_id: clientId || null,
      line_items: lineItems,
      notes,
      issue_date: issueDate,
      due_date: dueDate,
      paid_cents: invoice?.paid_cents || 0,
      balance_cents: totals.total_cents - (invoice?.paid_cents || 0),
      ...totals,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <Label>Invoice Number</Label>
          <Input
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
          />
        </div>
        <div>
          <Label>Issue Date</Label>
          <Input
            type="date"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
          />
        </div>
        <div>
          <Label>Due Date</Label>
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label>Client</Label>
        <ClientSelector value={clientId} onChange={setClientId} />
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
        <Button onClick={handleSubmit}>Save Invoice</Button>
      </div>
    </div>
  );
};
