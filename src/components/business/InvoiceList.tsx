import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatusBadge } from './StatusBadge';
import { formatCurrency } from '@/utils/currency';
import { Edit, DollarSign, Trash2, Search, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { PDFDownloadButton } from './PDFDownloadButton';
import { InvoicePDF } from './InvoicePDF';

interface Invoice {
  id: string;
  invoice_number: string;
  client_id: string;
  status: string;
  invoice_date: string;
  due_date: string | null;
  total_cents: number;
  amount_paid_cents: number;
  business_clients: { company_name: string; contact_name: string } | null;
}

interface InvoiceListProps {
  onEdit: (id: string) => void;
  onRecordPayment: (invoice: Invoice) => void;
  onRefresh: () => void;
}

export const InvoiceList = ({ onEdit, onRecordPayment, onRefresh }: InvoiceListProps) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [pdfData, setPdfData] = useState<Record<string, any>>({});

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('business_invoices')
        .select(`
          *,
          business_clients (
            company_name,
            contact_name
          )
        `)
        .order('invoice_date', { ascending: false });

      if (error) throw error;
      setInvoices(data || []);
    } catch (error) {
      console.error('Error loading invoices:', error);
      toast.error('Failed to load invoices');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this invoice?')) return;

    try {
      const { error } = await supabase
        .from('business_invoices')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Invoice deleted');
      loadInvoices();
      onRefresh();
    } catch (error) {
      console.error('Error deleting invoice:', error);
      toast.error('Failed to delete invoice');
    }
  };

  const isOverdue = (invoice: Invoice) => {
    if (!invoice.due_date || invoice.status === 'paid' || invoice.status === 'cancelled') return false;
    const today = new Date().toISOString().split('T')[0];
    const balance = invoice.total_cents - invoice.amount_paid_cents;
    return invoice.due_date < today && balance > 0;
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = 
      invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.business_clients?.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.business_clients?.contact_name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const loadInvoiceForPDF = async (invoiceId: string) => {
    try {
      const { data: invoice, error: invoiceError } = await supabase
        .from('business_invoices')
        .select('*, business_clients(*)')
        .eq('id', invoiceId)
        .maybeSingle();

      if (invoiceError) throw invoiceError;
      if (!invoice) return null;

      const { data: project } = await supabase
        .from('business_projects')
        .select('*')
        .eq('id', invoice.project_id)
        .maybeSingle();

      const { data: lineItems } = await supabase
        .from('business_invoice_line_items')
        .select('*')
        .eq('invoice_id', invoiceId)
        .order('line_number');

      return {
        invoice,
        client: invoice.business_clients,
        project: project || null,
        lineItems: lineItems || [],
      };
    } catch (error) {
      console.error('Error loading invoice for PDF:', error);
      toast.error('Failed to load invoice data');
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
            placeholder="Search by invoice # or client..."
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
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="partially_paid">Partially Paid</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredInvoices.length === 0 ? (
        <div className="text-center py-12">
          <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-20" />
          <p style={{ color: 'var(--business-text-secondary)' }}>
            {searchTerm || statusFilter !== 'all' ? 'No invoices found' : 'No invoices yet'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Paid</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => {
                const balance = invoice.total_cents - invoice.amount_paid_cents;
                const overdue = isOverdue(invoice);
                
                return (
                  <TableRow key={invoice.id} className={overdue ? 'bg-red-500/5' : ''}>
                    <TableCell className="font-mono">
                      <div className="flex items-center gap-2">
                        {invoice.invoice_number}
                        {overdue && <AlertCircle className="h-4 w-4 text-red-400" />}
                      </div>
                    </TableCell>
                    <TableCell>
                      {invoice.business_clients?.company_name || invoice.business_clients?.contact_name || '-'}
                    </TableCell>
                    <TableCell>{format(new Date(invoice.invoice_date), 'MMM d, yyyy')}</TableCell>
                    <TableCell>
                      {invoice.due_date ? format(new Date(invoice.due_date), 'MMM d, yyyy') : '-'}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(invoice.total_cents)}
                    </TableCell>
                    <TableCell className="text-right text-green-400">
                      {formatCurrency(invoice.amount_paid_cents)}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(balance)}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={invoice.status} type="invoice" />
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(invoice.id)}
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {balance > 0 && invoice.status !== 'cancelled' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRecordPayment(invoice)}
                            title="Record Payment"
                          >
                            <DollarSign className="h-4 w-4" />
                          </Button>
                        )}
                        <PDFDownloadButton
                          document={
                            <InvoicePDF
                              invoice={pdfData[invoice.id]?.invoice || invoice}
                              client={pdfData[invoice.id]?.client || invoice.business_clients}
                              project={pdfData[invoice.id]?.project || null}
                              lineItems={pdfData[invoice.id]?.lineItems || []}
                            />
                          }
                          filename={invoice.invoice_number}
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(invoice.id)}
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
