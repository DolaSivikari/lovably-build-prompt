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
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useEffect } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface InvoiceEditorProps {
  invoice?: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export const InvoiceEditor = ({ invoice, onSave, onCancel }: InvoiceEditorProps) => {
  const [invoiceNumber, setInvoiceNumber] = useState(invoice?.invoice_number || `INV-${Date.now()}`);
  const [clientId, setClientId] = useState(invoice?.client_id || "");
  const [lineItems, setLineItems] = useState<LineItem[]>(invoice?.line_items || []);
  const [notes, setNotes] = useState(invoice?.notes || "");
  const [issueDate, setIssueDate] = useState(invoice?.issue_date || new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState(invoice?.due_date || "");
  const [hasChanges, setHasChanges] = useState(false);

  const totals = calculateInvoiceTotals(lineItems);

  const { showDialog, confirmNavigation, cancelNavigation, message } = useUnsavedChanges({
    hasUnsavedChanges: hasChanges,
  });

  useEffect(() => {
    const changed = 
      invoiceNumber !== (invoice?.invoice_number || `INV-${Date.now()}`) ||
      clientId !== (invoice?.client_id || "") ||
      JSON.stringify(lineItems) !== JSON.stringify(invoice?.line_items || []) ||
      notes !== (invoice?.notes || "") ||
      issueDate !== (invoice?.issue_date || new Date().toISOString().split('T')[0]) ||
      dueDate !== (invoice?.due_date || "");
    setHasChanges(changed);
  }, [invoiceNumber, clientId, lineItems, notes, issueDate, dueDate, invoice]);

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
    <>
      <AlertDialog open={showDialog} onOpenChange={() => {}}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              {message}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelNavigation}>
              Stay
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmNavigation}>
              Leave
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <TooltipProvider>
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <Label className="flex items-center gap-2">
                Invoice Number
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Unique identifier for this invoice</p>
                  </TooltipContent>
                </Tooltip>
              </Label>
              <Input value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
            </div>
            <div>
              <Label className="flex items-center gap-2">
                Issue Date
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Date when the invoice was issued</p>
                  </TooltipContent>
                </Tooltip>
              </Label>
              <Input type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} />
            </div>
            <div>
              <Label className="flex items-center gap-2">
                Due Date
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Payment deadline for this invoice</p>
                  </TooltipContent>
                </Tooltip>
              </Label>
              <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
          </div>

          <div>
            <Label className="flex items-center gap-2">
              Client
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Select the client to invoice</p>
                </TooltipContent>
              </Tooltip>
            </Label>
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
              <span className="font-semibold">{formatCurrency(totals.subtotal_cents)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (13%):</span>
              <span className="font-semibold">{formatCurrency(totals.tax_amount_cents)}</span>
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
        <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
      </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onCancel}>Cancel</Button>
            <Button onClick={handleSubmit}>Save Invoice</Button>
          </div>
        </div>
      </TooltipProvider>
    </>
  );
};
