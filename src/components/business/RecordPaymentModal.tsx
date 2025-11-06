import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CurrencyInput } from "./CurrencyInput";
import { Textarea } from "@/components/ui/textarea";

interface RecordPaymentModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (payment: { amount_cents: number; payment_date: string; notes?: string }) => void;
  remainingBalance: number;
}

export const RecordPaymentModal = ({
  open,
  onClose,
  onSubmit,
  remainingBalance,
}: RecordPaymentModalProps) => {
  const [amountCents, setAmountCents] = useState(remainingBalance);
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    onSubmit({
      amount_cents: amountCents,
      payment_date: paymentDate,
      notes: notes || undefined,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Record Payment</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Payment Amount</Label>
            <CurrencyInput
              value={amountCents}
              onChange={setAmountCents}
              placeholder="0.00"
            />
          </div>

          <div>
            <Label>Payment Date</Label>
            <Input
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
            />
          </div>

          <div>
            <Label>Notes (Optional)</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Payment method, reference number, etc."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Record Payment
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
