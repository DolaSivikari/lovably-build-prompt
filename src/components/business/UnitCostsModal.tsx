import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { formatCurrency } from '@/utils/currency';
import { Search, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface UnitCost {
  id: string;
  name: string;
  description: string | null;
  category: string;
  unit: string;
  cost_cents: number;
}

interface UnitCostsModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (unitCost: UnitCost) => void;
}

export const UnitCostsModal = ({ open, onClose, onSelect }: UnitCostsModalProps) => {
  const [unitCosts, setUnitCosts] = useState<UnitCost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    if (open) {
      loadUnitCosts();
    }
  }, [open]);

  const loadUnitCosts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('business_unit_costs')
        .select('*')
        .eq('is_active', true)
        .order('category')
        .order('name');

      if (error) throw error;
      setUnitCosts(data || []);
    } catch (error) {
      console.error('Error loading unit costs:', error);
      toast.error('Failed to load unit costs');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (unitCost: UnitCost) => {
    onSelect(unitCost);
    toast.success(`Added ${unitCost.name}`);
  };

  const filteredUnitCosts = unitCosts.filter(uc => {
    const matchesSearch = 
      uc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uc.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || uc.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(unitCosts.map(uc => uc.category)))];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Quick Add from Unit Costs</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Select pre-configured services to quickly add to your estimate
          </p>
        </DialogHeader>

        <div className="flex gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search unit costs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat} className="capitalize">
                  {cat === 'all' ? 'All Categories' : cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading...</p>
            </div>
          ) : filteredUnitCosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No unit costs found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead className="text-right">Unit Price</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUnitCosts.map((unitCost) => (
                  <TableRow key={unitCost.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{unitCost.name}</p>
                        {unitCost.description && (
                          <p className="text-xs text-muted-foreground">{unitCost.description}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="capitalize">{unitCost.category}</TableCell>
                    <TableCell>{unitCost.unit}</TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(unitCost.cost_cents)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        onClick={() => handleSelect(unitCost)}
                        className="gap-1"
                      >
                        <Plus className="h-3 w-3" />
                        Add
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
