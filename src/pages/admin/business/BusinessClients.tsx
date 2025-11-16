import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Button } from "@/ui/Button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ClientForm, ClientFormData } from "@/components/business/ClientForm";
import { ImportContactsDialog } from "@/components/business/ImportContactsDialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useTableSort } from "@/hooks/useTableSort";
import { useTablePagination } from "@/hooks/useTablePagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";

export default function BusinessClients() {
  const { isLoading, isAdmin } = useAdminAuth();
  const [clients, setClients] = useState<any[]>([]);
  const [filteredClients, setFilteredClients] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [editingClient, setEditingClient] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<string | null>(null);
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const { toast } = useToast();
  
  const { sortConfig, requestSort, sortData } = useTableSort<any>();
  
  const {
    currentPage,
    itemsPerPage,
    totalPages,
    paginatedData,
    goToPage,
    nextPage,
    previousPage,
    changeItemsPerPage,
    totalItems,
    startIndex,
    endIndex,
  } = useTablePagination(sortData(filteredClients));

  useEffect(() => {
    if (isAdmin) {
      fetchClients();
    }
  }, [isAdmin]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredClients(filtered);
    } else {
      setFilteredClients(clients);
    }
  }, [searchTerm, clients]);

  const fetchClients = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("user_id", user.id)
        .eq("is_active", true)
        .order("name");

      if (error) throw error;
      setClients(data || []);
      setFilteredClients(data || []);
    } catch (error) {
      toast({
        title: "Error loading clients",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (formData: ClientFormData) => {
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const clientData = {
        name: formData.name,
        email: formData.email || null,
        phone: formData.phone || null,
        company: formData.company || null,
        address: formData.address || null,
        notes: formData.notes || null,
        user_id: user.id,
      };

      if (editingClient) {
        const { error } = await supabase
          .from("clients")
          .update(clientData)
          .eq("id", editingClient.id);
        if (error) throw error;
        toast({ title: "Client updated successfully" });
      } else {
        const { error } = await supabase
          .from("clients")
          .insert(clientData);
        if (error) throw error;
        toast({ title: "Client created successfully" });
      }

      setShowForm(false);
      setEditingClient(null);
      fetchClients();
    } catch (error) {
      toast({
        title: "Error saving client",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImport = async (contacts: any[]) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const clientsToInsert = contacts.map(c => ({ 
        name: c.name,
        email: c.email || null,
        company: c.company || null,
        phone: c.phone || null,
        user_id: user.id 
      }));
      const { error } = await supabase.from("clients").insert(clientsToInsert);
      if (error) throw error;

      toast({ title: `Successfully imported ${contacts.length} clients` });
      fetchClients();
    } catch (error) {
      toast({
        title: "Error importing clients",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  };
  
  const handleDeleteClick = (id: string) => {
    setClientToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!clientToDelete) return;

    try {
      const { error } = await supabase
        .from("clients")
        .update({ is_active: false })
        .eq("id", clientToDelete);
      if (error) throw error;
      toast({ title: "Client deleted successfully" });
      setSelectedClients(prev => prev.filter(id => id !== clientToDelete));
      fetchClients();
    } catch (error) {
      toast({
        title: "Error deleting client",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
    setClientToDelete(null);
  };
  
  const handleBulkDelete = async () => {
    if (selectedClients.length === 0) return;
    if (!confirm(`Delete ${selectedClients.length} clients?`)) return;

    try {
      const { error } = await supabase
        .from("clients")
        .update({ is_active: false })
        .in("id", selectedClients);
      if (error) throw error;
      toast({ title: `${selectedClients.length} clients deleted` });
      setSelectedClients([]);
      fetchClients();
    } catch (error) {
      toast({
        title: "Error deleting clients",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  };
  
  const toggleClientSelection = (id: string) => {
    setSelectedClients(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };
  
  const toggleAllClients = () => {
    if (selectedClients.length === paginatedData.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(paginatedData.map(c => c.id));
    }
  };
  
  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) return <ArrowUpDown className="h-4 w-4 ml-2 opacity-50" />;
    return <ArrowUpDown className="h-4 w-4 ml-2" />;
  };

  if (isLoading) return <div className="p-8">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Clients</h1>
          <p className="text-muted-foreground">Manage your client database</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowImport(true)}>
            Import
          </Button>
          <Button onClick={() => { setEditingClient(null); setShowForm(true); }}>
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </div>
      </div>

      <Card className="p-4">
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          {selectedClients.length > 0 && (
            <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
              Delete ({selectedClients.length})
            </Button>
          )}
        </div>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedClients.length === paginatedData.length && paginatedData.length > 0}
                  onCheckedChange={toggleAllClients}
                />
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => requestSort('name')}>
                  Name {getSortIcon('name')}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => requestSort('company')}>
                  Company {getSortIcon('company')}
                </Button>
              </TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((client) => (
              <TableRow key={client.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedClients.includes(client.id)}
                    onCheckedChange={() => toggleClientSelection(client.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.company || "-"}</TableCell>
                <TableCell>{client.email || "-"}</TableCell>
                <TableCell>{client.phone || "-"}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => { setEditingClient(client); setShowForm(true); }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteClick(client.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex}-{endIndex} of {totalItems} clients
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={previousPage}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={nextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
              <Select value={itemsPerPage.toString()} onValueChange={(v) => changeItemsPerPage(Number(v))}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25">25 / page</SelectItem>
                  <SelectItem value="50">50 / page</SelectItem>
                  <SelectItem value="100">100 / page</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </Card>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingClient ? "Edit Client" : "Add Client"}</DialogTitle>
          </DialogHeader>
          <ClientForm
            defaultValues={editingClient}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>

      <ImportContactsDialog
        open={showImport}
        onClose={() => setShowImport(false)}
        onImport={handleImport}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Client"
        description="Are you sure you want to delete this client? This will mark them as inactive."
        confirmText="Delete"
        variant="destructive"
      />
    </div>
  );
}
