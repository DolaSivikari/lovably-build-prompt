import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";
import { LineItem } from "@/utils/calculations";
import { CurrencyInput } from "./CurrencyInput";
import { formatCurrency, centsToDollars } from "@/utils/currency";

interface LineItemEditorProps {
  items: LineItem[];
  onChange: (items: LineItem[]) => void;
}

export const LineItemEditor = ({ items, onChange }: LineItemEditorProps) => {
  const addItem = () => {
    onChange([
      ...items,
      {
        description: "",
        quantity: 1,
        unit_price_cents: 0,
        line_total_cents: 0,
        unit: "unit",
      },
    ]);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof LineItem, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    
    // Recalculate line total
    if (field === 'quantity' || field === 'unit_price_cents') {
      newItems[index].line_total_cents = 
        newItems[index].quantity * newItems[index].unit_price_cents;
    }
    
    onChange(newItems);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-12 gap-2 text-sm font-medium text-muted-foreground">
        <div className="col-span-5">Description</div>
        <div className="col-span-2">Quantity</div>
        <div className="col-span-2">Unit Price</div>
        <div className="col-span-2">Total</div>
        <div className="col-span-1"></div>
      </div>

      {items.map((item, index) => (
        <div key={index} className="grid grid-cols-12 gap-2 items-start">
          <div className="col-span-5">
            <Input
              value={item.description}
              onChange={(e) => updateItem(index, "description", e.target.value)}
              placeholder="Item description"
            />
          </div>
          <div className="col-span-2">
            <Input
              type="number"
              min="0"
              step="0.01"
              value={item.quantity}
              onChange={(e) => updateItem(index, "quantity", parseFloat(e.target.value) || 0)}
            />
          </div>
          <div className="col-span-2">
            <CurrencyInput
              value={item.unit_price_cents}
              onChange={(cents) => updateItem(index, "unit_price_cents", cents)}
            />
          </div>
          <div className="col-span-2 flex items-center h-10 px-3 text-sm text-muted-foreground">
            {formatCurrency(item.line_total_cents || 0)}
          </div>
          <div className="col-span-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeItem(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addItem}
        className="w-full"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Line Item
      </Button>
    </div>
  );
};
