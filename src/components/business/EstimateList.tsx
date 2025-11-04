import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatusBadge } from './StatusBadge';
import { formatCurrency } from '@/utils/currency';
import { Edit, FileDown, Copy, FileText, Trash2, Search } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { PDFDownloadButton } from './PDFDownloadButton';
import { EstimatePDF } from './EstimatePDF';
import { useCompanySettings } from '@/hooks/useCompanySettings';

interface Estimate {
  id: string;
  estimate_number: string;
  client_id: string;
  project_id: string | null;
  status: string;
  estimate_date: string;
  valid_until: string;
  total_cents: number;
  business_clients: { company_name: string; contact_name: string } | null;
}

interface EstimateListProps {
  onEdit: (id: string) => void;
  onConvertToInvoice: (estimate: Estimate) => void;
  onRefresh: () => void;
}

export const EstimateList = ({ onEdit, onConvertToInvoice, onRefresh }: EstimateListProps) => {
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [pdfData, setPdfData] = useState<Record<string, any>>({});
  const { settings } = useCompanySettings();

  const companyInfo = settings ? {
    name: settings.companyName,
    address: settings.address,
    phone: settings.phone,
    email: settings.email,
  } : undefined;

  useEffect(() => {
    loadEstimates();
  }, []);

  const loadEstimates = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('business_estimates')
        .select(`
          *,
          business_clients (
            company_name,
            contact_name
          )
        `)
        .order('estimate_date', { ascending: false });

      if (error) throw error;
      setEstimates(data || []);
    } catch (error) {
      console.error('Error loading estimates:', error);
      toast.error('Failed to load estimates');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this estimate?')) return;

    try {
      const { error } = await supabase
        .from('business_estimates')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Estimate deleted');
      loadEstimates();
      onRefresh();
    } catch (error) {
      console.error('Error deleting estimate:', error);
      toast.error('Failed to delete estimate');
    }
  };

  const handleDuplicate = async (id: string) => {
    try {
      const { data: original, error: fetchError } = await supabase
        .from('business_estimates')
        .select('*, business_estimate_line_items(*)')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      const lineItems = original.business_estimate_line_items || [];
      
      const { data: newEstimate, error: insertError } = await supabase
        .from('business_estimates')
        .insert([{
          client_id: original.client_id,
          project_id: original.project_id,
          estimate_date: format(new Date(), 'yyyy-MM-dd'),
          valid_until: original.valid_until,
          subtotal_cents: original.subtotal_cents,
          discount_type: original.discount_type,
          discount_amount_cents: original.discount_amount_cents,
          discount_percentage: original.discount_percentage,
          tax_rate: original.tax_rate,
          tax_amount_cents: original.tax_amount_cents,
          total_cents: original.total_cents,
          notes: original.notes,
        }] as any)
        .select()
        .single();

      if (insertError) throw insertError;

      if (lineItems.length) {
        const newLineItems = lineItems.map(({ id: _, estimate_id: __, ...item }: any) => ({
          ...item,
          estimate_id: newEstimate.id,
        }));

        const { error: lineItemsError } = await supabase
          .from('business_estimate_line_items')
          .insert(newLineItems);

        if (lineItemsError) throw lineItemsError;
      }

      toast.success('Estimate duplicated');
      loadEstimates();
      onRefresh();
    } catch (error) {
      console.error('Error duplicating estimate:', error);
      toast.error('Failed to duplicate estimate');
    }
  };

  const filteredEstimates = estimates.filter(estimate => {
    const matchesSearch = 
      estimate.estimate_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estimate.business_clients?.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estimate.business_clients?.contact_name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || estimate.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const loadEstimateForPDF = async (estimateId: string) => {
    try {
      const { data: estimate, error: estimateError } = await supabase
        .from('business_estimates')
        .select('*, business_clients(*)')
        .eq('id', estimateId)
        .maybeSingle();

      if (estimateError) throw estimateError;
      if (!estimate) return null;

      const { data: project } = await supabase
        .from('business_projects')
        .select('*')
        .eq('id', estimate.project_id)
        .maybeSingle();

      const { data: lineItems } = await supabase
        .from('business_estimate_line_items')
        .select('*')
        .eq('estimate_id', estimateId)
        .order('line_number');

      return {
        estimate,
        client: estimate.business_clients,
        project: project || null,
        lineItems: lineItems || [],
      };
    } catch (error) {
      console.error('Error loading estimate for PDF:', error);
      toast.error('Failed to load estimate data');
      return null;
    }
  };

  if (loading) {
    return (
      <div className="business-glass-card p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="h-16 bg-white/5 rounded" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="business-glass-card p-6">
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by estimate # or client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="sent">Sent</SelectItem>
            <SelectItem value="viewed">Viewed</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredEstimates.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
          <p style={{ color: 'var(--business-text-secondary)' }}>
            {searchTerm || statusFilter !== 'all' ? 'No estimates found' : 'No estimates yet'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Estimate #</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Valid Until</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEstimates.map((estimate) => (
                <TableRow key={estimate.id}>
                  <TableCell className="font-mono">{estimate.estimate_number}</TableCell>
                  <TableCell>
                    {estimate.business_clients?.company_name || estimate.business_clients?.contact_name || '-'}
                  </TableCell>
                  <TableCell>{format(new Date(estimate.estimate_date), 'MMM d, yyyy')}</TableCell>
                  <TableCell>{format(new Date(estimate.valid_until), 'MMM d, yyyy')}</TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatCurrency(estimate.total_cents)}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={estimate.status} type="estimate" />
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(estimate.id)}
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDuplicate(estimate.id)}
                        title="Duplicate"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <PDFDownloadButton
                        document={
                          <EstimatePDF
                            estimate={pdfData[estimate.id]?.estimate || estimate}
                            client={pdfData[estimate.id]?.client || estimate.business_clients}
                            project={pdfData[estimate.id]?.project || null}
                            lineItems={pdfData[estimate.id]?.lineItems || []}
                            companyInfo={companyInfo}
                          />
                        }
                        filename={estimate.estimate_number}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                      />
                      {estimate.status === 'accepted' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onConvertToInvoice(estimate)}
                          title="Convert to Invoice"
                        >
                          <FileText className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(estimate.id)}
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
