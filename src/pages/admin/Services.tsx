import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/ui/Button";
import { Plus, Edit, Trash2, Eye, ArrowUpDown, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { generatePreviewToken } from '@/utils/previewToken';
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { PreviewModal } from '@/components/admin/PreviewModal';
import { BulkActionsBar } from '@/components/admin/BulkActionsBar';
import { useBulkSelection } from '@/hooks/useBulkSelection';
import { useTableFilters } from '@/hooks/useTableFilters';
import { useTableSort } from '@/hooks/useTableSort';
import { useTablePagination } from '@/hooks/useTablePagination';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const Services = () => {
  const navigate = useNavigate();
  const { isLoading: authLoading, isAdmin } = useAdminAuth();
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewService, setPreviewService] = useState<any>(null);
  
  // Filtering, sorting, pagination
  const { filters, updateFilter, clearFilters, hasActiveFilters, applyFilters } = useTableFilters();
  const { sortConfig, requestSort, sortData } = useTableSort<any>();
  
  // Apply filters and sort
  const filteredServices = applyFilters(services, ['title', 'category'], 'created_at', 'publish_state');
  const sortedServices = sortData(filteredServices);
  
  // Pagination
  const { 
    paginatedData, 
    currentPage, 
    totalPages, 
    itemsPerPage,
    changeItemsPerPage,
    goToPage,
    totalItems,
    startIndex,
    endIndex
  } = useTablePagination(sortedServices, [25, 50, 100]);
  
  // Bulk selection
  const {
    selectedIds,
    selectedCount,
    toggleItem,
    toggleAll,
    clearSelection,
    isSelected,
    isAllSelected,
    isSomeSelected,
  } = useBulkSelection(paginatedData);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdmin) return;
    loadServices();
  }, [isAdmin]);

  const loadServices = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load services");
    } else {
      setServices(data || []);
    }
    setIsLoading(false);
  };

  const handleDeleteClick = (id: string) => {
    setServiceToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!serviceToDelete) return;

    const { error } = await supabase
      .from("services")
      .delete()
      .eq("id", serviceToDelete);

    if (error) {
      toast.error("Failed to delete service");
    } else {
      toast.success("Service deleted successfully");
      loadServices();
    }
    setServiceToDelete(null);
    setDeleteDialogOpen(false);
  };

  const handleViewService = (service: any) => {
    setPreviewService(service);
    setPreviewModalOpen(true);
  };

  const handleBulkDelete = async () => {
    const ids = Array.from(selectedIds);
    const { error } = await supabase
      .from("services")
      .delete()
      .in("id", ids);

    if (error) {
      toast.error("Failed to delete services");
      throw error;
    } else {
      toast.success(`${ids.length} services deleted`);
      clearSelection();
      loadServices();
    }
  };

  const handleBulkStatusChange = async (status: string) => {
    const ids = Array.from(selectedIds);
    const { error} = await supabase
      .from("services")
      .update({ publish_state: status })
      .in("id", ids);

    if (error) {
      toast.error("Failed to update services");
      throw error;
    } else {
      toast.success(`${ids.length} services updated to ${status}`);
      clearSelection();
      loadServices();
    }
  };

  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) return <ArrowUpDown className="h-4 w-4 ml-2 opacity-50" />;
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "default";
      case "draft": return "secondary";
      case "archived": return "outline";
      default: return "secondary";
    }
  };

  if (authLoading) {
    return null;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="business-page-title">Services</h1>
          <p className="business-page-subtitle">
            {totalItems} service{totalItems !== 1 ? 's' : ''} total
            {hasActiveFilters && ` (${filteredServices.length} filtered)`}
          </p>
        </div>
        <Button className="business-btn-primary" onClick={() => navigate("/admin/services/new")}>
          <Plus className="h-4 w-4 mr-2" />
          New Service
        </Button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={filters.status[0] || 'all'}
          onValueChange={(value: string) => updateFilter('status', value === 'all' ? [] : [value as any])}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
        {hasActiveFilters && (
          <Button variant="ghost" onClick={clearFilters}>
            Clear Filters
          </Button>
        )}
      </div>

      {isLoading ? (
        <div className="text-center py-12">Loading services...</div>
      ) : services.length === 0 ? (
        <div className="business-glass-card p-12 text-center">
          <p className="text-muted-foreground mb-4">No services yet. Create your first service to get started.</p>
          <Button className="business-btn-primary" onClick={() => navigate("/admin/services/new")}>
            <Plus className="h-4 w-4 mr-2" />
            Create Service
          </Button>
        </div>
      ) : (
        <>
          {/* Table header with sorting */}
          <div className="business-glass-card p-4 mb-2">
            <div className="flex items-center gap-4">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={toggleAll}
                aria-label="Select all"
              />
              <button
                onClick={() => requestSort('title')}
                className="flex-1 text-left font-medium flex items-center hover:text-primary"
              >
                Service {getSortIcon('title')}
              </button>
              <button
                onClick={() => requestSort('publish_state')}
                className="w-32 text-left font-medium flex items-center hover:text-primary"
              >
                Status {getSortIcon('publish_state')}
              </button>
              <button
                onClick={() => requestSort('created_at')}
                className="w-32 text-left font-medium flex items-center hover:text-primary"
              >
                Created {getSortIcon('created_at')}
              </button>
              <div className="w-32 text-right font-medium">Actions</div>
            </div>
          </div>

          {/* Service rows */}
          <div className="grid gap-2">
            {paginatedData.map((service) => (
              <div key={service.id} className="business-glass-card p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <Checkbox
                    checked={isSelected(service.id)}
                    onCheckedChange={() => toggleItem(service.id)}
                    aria-label={`Select ${service.title || service.name}`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg font-semibold">{service.title || service.name}</h2>
                      {service.category && (
                        <Badge variant="outline" className="text-xs">
                          {service.category}
                        </Badge>
                      )}
                    </div>
                    {(service.tagline || service.short_description) && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {service.tagline || service.short_description}
                      </p>
                    )}
                  </div>
                  <div className="w-32">
                    <Badge variant={getStatusColor(service.publish_state)}>
                      {service.publish_state}
                    </Badge>
                  </div>
                  <div className="w-32 text-sm text-muted-foreground">
                    {service.created_at ? new Date(service.created_at).toLocaleDateString() : '-'}
                  </div>
                  <div className="w-32 flex gap-2 justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewService(service)}
                      title="Preview"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/admin/services/${service.id}`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteClick(service.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <p className="text-sm text-muted-foreground">
                Showing {startIndex} to {endIndex} of {totalItems} services
              </p>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => changeItemsPerPage(Number(value))}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25">25 per page</SelectItem>
                  <SelectItem value="50">50 per page</SelectItem>
                  <SelectItem value="100">100 per page</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => goToPage(currentPage - 1)}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          onClick={() => goToPage(pageNum)}
                          isActive={currentPage === pageNum}
                          className="cursor-pointer"
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => goToPage(currentPage + 1)}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </>
      )}

      <BulkActionsBar
        selectedCount={selectedCount}
        onClearSelection={clearSelection}
        onDelete={handleBulkDelete}
        onStatusChange={handleBulkStatusChange}
        statusOptions={[
          { label: 'Published', value: 'published' },
          { label: 'Draft', value: 'draft' },
          { label: 'Archived', value: 'archived' },
        ]}
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title="Delete Service"
        description="Are you sure you want to delete this service? This action cannot be undone."
        confirmText="Delete"
        variant="destructive"
      />

      {previewService && (
        <PreviewModal
          open={previewModalOpen}
          onOpenChange={setPreviewModalOpen}
          previewUrl={
            previewService.publish_state === 'published'
              ? `/services/${previewService.slug}`
              : `/services/${previewService.slug}?preview=true&token=${generatePreviewToken()}`
          }
          title={previewService.title}
        />
      )}
    </div>
  );
};

export default Services;
