import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CurrencyInput } from './CurrencyInput';
import { calculateLineTotal } from '@/utils/calculations';
import { formatCurrency } from '@/utils/currency';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unit_price_cents: number;
  line_total_cents: number;
  category: string;
}

interface LineItemEditorProps {
  lineItems: LineItem[];
  onChange: (items: LineItem[]) => void;
  onOpenUnitCosts?: () => void;
}

const UNITS = ['each', 'sqft', 'hour', 'gallon', 'linear ft', 'day', 'project'];
const CATEGORIES = ['labor', 'material', 'equipment', 'other'];

export const LineItemEditor = ({ lineItems, onChange, onOpenUnitCosts }: LineItemEditorProps) => {
  const addLineItem = () => {
    const newItem: LineItem = {
      id: `temp-${Date.now()}`,
      description: '',
      quantity: 1,
      unit: 'each',
      unit_price_cents: 0,
      line_total_cents: 0,
      category: 'labor',
    };
    onChange([...lineItems, newItem]);
  };

  const removeLineItem = (id: string) => {
    onChange(lineItems.filter(item => item.id !== id));
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: any) => {
    const updated = lineItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        // Recalculate line total when quantity or price changes
        if (field === 'quantity' || field === 'unit_price_cents') {
          updatedItem.line_total_cents = calculateLineTotal(
            updatedItem.quantity,
            updatedItem.unit_price_cents
          );
        }
        return updatedItem;
      }
      return item;
    });
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-slate-200">Line Items</h3>
        <div className="flex gap-2">
          {onOpenUnitCosts && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onOpenUnitCosts}
              className="border-slate-700 hover:bg-slate-700"
            >
              Quick Add from Unit Costs
            </Button>
          )}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addLineItem}
            className="border-slate-700 hover:bg-slate-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Line
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        {/* Header */}
        <div className="grid grid-cols-12 gap-2 text-xs font-medium text-slate-400 px-2">
          <div className="col-span-4">Description</div>
          <div className="col-span-1 text-center">Qty</div>
          <div className="col-span-2">Unit</div>
          <div className="col-span-2">Unit Price</div>
          <div className="col-span-2 text-right">Line Total</div>
          <div className="col-span-1"></div>
        </div>

        {/* Line Items */}
        {lineItems.map((item, index) => (
          <div
            key={item.id}
            className="grid grid-cols-12 gap-2 items-start bg-slate-800/50 p-2 rounded-lg border border-slate-700"
          >
            <div className="col-span-4">
              <Input
                value={item.description}
                onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                placeholder="Description"
                className="bg-slate-900 border-slate-700"
              />
              <Select
                value={item.category}
                onValueChange={(value) => updateLineItem(item.id, 'category', value)}
              >
                <SelectTrigger className="bg-slate-900 border-slate-700 mt-1 h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  {CATEGORIES.map(cat => (
                    <SelectItem key={cat} value={cat} className="capitalize">
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-1">
              <Input
                type="number"
                min="0"
                step="0.01"
                value={item.quantity}
                onChange={(e) => updateLineItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                className="bg-slate-900 border-slate-700 text-center"
              />
            </div>

            <div className="col-span-2">
              <Select
                value={item.unit}
                onValueChange={(value) => updateLineItem(item.id, 'unit', value)}
              >
                <SelectTrigger className="bg-slate-900 border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  {UNITS.map(unit => (
                    <SelectItem key={unit} value={unit}>
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2">
              <CurrencyInput
                value={item.unit_price_cents}
                onChange={(cents) => updateLineItem(item.id, 'unit_price_cents', cents)}
                className="bg-slate-900 border-slate-700"
              />
            </div>

            <div className="col-span-2 flex items-center justify-end h-10 text-slate-200 font-medium">
              {formatCurrency(item.line_total_cents)}
            </div>

            <div className="col-span-1 flex items-center justify-center">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeLineItem(item.id)}
                className="h-8 w-8 p-0 hover:bg-red-500/20 hover:text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        {lineItems.length === 0 && (
          <div className="text-center py-8 text-slate-400">
            <p>No line items yet. Click "Add Line" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};
