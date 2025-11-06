import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CurrencyInput } from "./CurrencyInput";
import { Plus, X } from "lucide-react";

interface UnitCost {
  description: string;
  unit_price_cents: number;
  unit: string;
}

interface UnitCostsModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (unitCost: UnitCost) => void;
}

export const UnitCostsModal = ({
  open,
  onClose,
  onSelect,
}: UnitCostsModalProps) => {
  // Common unit costs for construction
  const commonCosts: UnitCost[] = [
    { description: "Concrete (per cubic yard)", unit_price_cents: 15000, unit: "cu yd" },
    { description: "Drywall Installation (per sq ft)", unit_price_cents: 200, unit: "sq ft" },
    { description: "Paint (per sq ft)", unit_price_cents: 150, unit: "sq ft" },
    { description: "Flooring (per sq ft)", unit_price_cents: 500, unit: "sq ft" },
    { description: "Labor (per hour)", unit_price_cents: 7500, unit: "hour" },
    { description: "Electrical Outlet", unit_price_cents: 12500, unit: "each" },
    { description: "Plumbing Fixture", unit_price_cents: 25000, unit: "each" },
  ];

  const handleSelect = (cost: UnitCost) => {
    onSelect(cost);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Common Unit Costs</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {commonCosts.map((cost, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent cursor-pointer"
              onClick={() => handleSelect(cost)}
            >
              <div>
                <p className="font-medium">{cost.description}</p>
                <p className="text-sm text-muted-foreground">Unit: {cost.unit}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">
                  ${(cost.unit_price_cents / 100).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
