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

interface EstimateEditorProps {
  estimate?: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}

export const EstimateEditor = ({ estimate, onSave, onCancel }: EstimateEditorProps) => {
  const [estimateNumber, setEstimateNumber] = useState(estimate?.estimate_number || `EST-${Date.now()}`);
  const [clientId, setClientId] = useState(estimate?.client_id || "");
  const [lineItems, setLineItems] = useState<LineItem[]>(estimate?.line_items || []);
  const [notes, setNotes] = useState(estimate?.notes || "");
  const [validUntil, setValidUntil] = useState(estimate?.valid_until || "");
  const [hasChanges, setHasChanges] = useState(false);

  const totals = calculateInvoiceTotals(lineItems);

  const { showDialog, confirmNavigation, cancelNavigation, message } = useUnsavedChanges({
    hasUnsavedChanges: hasChanges,
  });

  useEffect(() => {
    const changed = 
      estimateNumber !== (estimate?.estimate_number || `EST-${Date.now()}`) ||
      clientId !== (estimate?.client_id || "") ||
      JSON.stringify(lineItems) !== JSON.stringify(estimate?.line_items || []) ||
      notes !== (estimate?.notes || "") ||
      validUntil !== (estimate?.valid_until || "");
    setHasChanges(changed);
  }, [estimateNumber, clientId, lineItems, notes, validUntil, estimate]);

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
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label className="flex items-center gap-2">
                Estimate Number
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Unique identifier for this estimate</p>
                  </TooltipContent>
                </Tooltip>
              </Label>
              <Input value={estimateNumber} onChange={(e) => setEstimateNumber(e.target.value)} />
            </div>
            <div>
              <Label className="flex items-center gap-2">
                Client
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Select the client for this estimate</p>
                  </TooltipContent>
                </Tooltip>
              </Label>
              <ClientSelector value={clientId} onChange={setClientId} />
            </div>
            <div>
              <Label className="flex items-center gap-2">
                Valid Until
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Expiration date for this estimate</p>
                  </TooltipContent>
                </Tooltip>
              </Label>
              <Input type="date" value={validUntil} onChange={(e) => setValidUntil(e.target.value)} />
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
            <Button onClick={handleSubmit}>Save Estimate</Button>
          </div>
        </div>
      </TooltipProvider>
    </>
  );
};
