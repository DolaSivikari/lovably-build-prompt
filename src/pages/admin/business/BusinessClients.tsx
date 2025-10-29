import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ClientForm } from '@/components/business/ClientForm';
import { ImportContactsDialog } from '@/components/business/ImportContactsDialog';
import { formatCurrency } from '@/utils/currency';
import { Search, Plus, Upload, Edit, Trash2, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Client {
  id: string;
  contact_name: string;
  email: string;
  phone: string;
  company_name: string | null;
  client_type: string;
  lifetime_value_cents: number | null;
  rating: number;
  created_at: string;
}

export const BusinessClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [editingClient, setEditingClient] = useState<string | null>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    filterClients();
  }, [searchTerm, clients]);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('business_clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast({
        title: 'Error',
        description: 'Failed to load clients',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filterClients = () => {
    if (!searchTerm) {
      setFilteredClients(clients);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = clients.filter(client =>
      client.contact_name.toLowerCase().includes(term) ||
      client.email.toLowerCase().includes(term) ||
      (client.company_name?.toLowerCase() || '').includes(term) ||
      client.phone.includes(term)
    );
    setFilteredClients(filtered);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this client?')) return;

    try {
      const { error } = await supabase
        .from('business_clients')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: 'Success', description: 'Client deleted successfully' });
      fetchClients();
    } catch (error) {
      console.error('Error deleting client:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete client',
        variant: 'destructive',
      });
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingClient(null);
    fetchClients();
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="business-page-title">Clients</h1>
        <p className="business-page-subtitle">Manage your client relationships</p>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-800 border-slate-700"
          />
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setShowImport(true)}
            variant="outline"
            className="border-slate-700 hover:bg-slate-700"
          >
            <Upload className="h-4 w-4 mr-2" />
            Import Contacts
          </Button>
          <Button
            onClick={() => {
              setEditingClient(null);
              setShowForm(true);
            }}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </div>
      </div>

      {/* Clients Table */}
      <div className="business-glass-card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400">
              {searchTerm ? 'No clients found matching your search' : 'No clients yet'}
            </p>
            <Button
              onClick={() => setShowForm(true)}
              variant="outline"
              className="mt-4 border-slate-700 hover:bg-slate-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Client
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700 hover:bg-slate-800/50">
                <TableHead className="text-slate-300">Name</TableHead>
                <TableHead className="text-slate-300">Email</TableHead>
                <TableHead className="text-slate-300">Phone</TableHead>
                <TableHead className="text-slate-300">Type</TableHead>
                <TableHead className="text-slate-300">Rating</TableHead>
                <TableHead className="text-slate-300 text-right">Lifetime Value</TableHead>
                <TableHead className="text-slate-300 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow
                  key={client.id}
                  className="border-slate-700 hover:bg-slate-800/50"
                >
                  <TableCell>
                    <div>
                      <div className="font-medium text-slate-200">{client.contact_name}</div>
                      {client.company_name && (
                        <div className="text-sm text-slate-400">{client.company_name}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-300">{client.email}</TableCell>
                  <TableCell className="text-slate-300">{client.phone}</TableCell>
                  <TableCell>
                    <span className="capitalize text-slate-300">{client.client_type}</span>
                  </TableCell>
                  <TableCell>{renderStars(client.rating)}</TableCell>
                  <TableCell className="text-right text-slate-300">
                    {formatCurrency(client.lifetime_value_cents || 0)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditingClient(client.id);
                          setShowForm(true);
                        }}
                        className="hover:bg-slate-700"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(client.id)}
                        className="hover:bg-red-500/20 hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Client Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="bg-slate-900 border-slate-700 max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-slate-200">
              {editingClient ? 'Edit Client' : 'New Client'}
            </DialogTitle>
          </DialogHeader>
          <ClientForm
            clientId={editingClient}
            onSuccess={handleFormSuccess}
            onCancel={() => {
              setShowForm(false);
              setEditingClient(null);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Import Contacts Dialog */}
      <ImportContactsDialog
        open={showImport}
        onOpenChange={setShowImport}
        onSuccess={fetchClients}
      />
    </div>
  );
};
