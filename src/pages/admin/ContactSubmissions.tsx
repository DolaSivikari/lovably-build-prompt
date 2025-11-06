import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Mail,
  Phone,
  Building2,
  AlertCircle,
  CheckCircle2,
  Clock,
  Trash2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FilterBar } from "@/components/admin/filters/FilterBar";
import { SearchInput } from "@/components/admin/filters/SearchInput";
import { DateRangePicker } from "@/components/admin/filters/DateRangePicker";
import {
  MultiSelectFilter,
  FilterOption,
} from "@/components/admin/filters/MultiSelectFilter";
import { useTableFilters } from "@/hooks/useTableFilters";
import { useUrlFilters } from "@/hooks/useUrlFilters";
import { ExportButton, ExportColumn } from "@/components/admin/ExportButton";
import { FilterPresets } from "@/components/admin/FilterPresets";
import { BulkActionsBar } from "@/components/admin/BulkActionsBar";
import { useBulkSelection } from "@/hooks/useBulkSelection";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";

const ContactSubmissions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isLoading: authLoading, isAdmin } = useAdminAuth();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [submissionToDelete, setSubmissionToDelete] = useState<string | null>(
    null,
  );

  // Advanced filters
  const {
    filters,
    updateFilter,
    clearFilters,
    hasActiveFilters,
    applyFilters,
  } = useTableFilters();
  useUrlFilters(filters, updateFilter);

  useEffect(() => {
    if (isAdmin) {
      loadSubmissions();

      const channel = supabase
        .channel("contact-submissions-list")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "contact_submissions",
          },
          () => {
            loadSubmissions();
          },
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [isAdmin]);

  const loadSubmissions = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load submissions",
        variant: "destructive",
      });
    } else {
      setSubmissions(data || []);
    }
    setIsLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("contact_submissions")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Status updated successfully",
      });
      loadSubmissions();
    }
  };

  const handleDeleteClick = (id: string) => {
    setSubmissionToDelete(id);
    setDeleteDialogOpen(true);
  };

  const deleteSubmission = async () => {
    if (!submissionToDelete) return;

    const { error } = await supabase
      .from("contact_submissions")
      .delete()
      .eq("id", submissionToDelete);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete submission",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Deleted",
        description: "Submission deleted successfully",
      });
      loadSubmissions();
    }

    setDeleteDialogOpen(false);
    setSubmissionToDelete(null);
  };

  const getStatusVariant = (
    status: string,
  ): "new" | "contacted" | "resolved" | "default" => {
    switch (status) {
      case "new":
        return "new";
      case "contacted":
        return "contacted";
      case "resolved":
        return "resolved";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <AlertCircle className="h-4 w-4" />;
      case "contacted":
        return <Clock className="h-4 w-4" />;
      case "resolved":
        return <CheckCircle2 className="h-4 w-4" />;
      default:
        return <Mail className="h-4 w-4" />;
    }
  };

  const getSubmissionTypeLabel = (type: string) => {
    switch (type) {
      case "quote":
        return "Quote Request";
      case "estimate":
        return "Estimate Request";
      case "starter_package":
        return "Starter Package";
      case "contact":
        return "General Contact";
      default:
        return type;
    }
  };

  // Filter options
  const statusOptions: FilterOption[] = useMemo(
    () => [
      {
        label: "New",
        value: "new",
        count: submissions.filter((s) => s.status === "new").length,
      },
      {
        label: "Contacted",
        value: "contacted",
        count: submissions.filter((s) => s.status === "contacted").length,
      },
      {
        label: "Resolved",
        value: "resolved",
        count: submissions.filter((s) => s.status === "resolved").length,
      },
    ],
    [submissions],
  );

  const typeOptions: FilterOption[] = useMemo(
    () => [
      {
        label: "Quote Request",
        value: "quote",
        count: submissions.filter((s) => s.submission_type === "quote").length,
      },
      {
        label: "Estimate Request",
        value: "estimate",
        count: submissions.filter((s) => s.submission_type === "estimate")
          .length,
      },
      {
        label: "Starter Package",
        value: "starter_package",
        count: submissions.filter(
          (s) => s.submission_type === "starter_package",
        ).length,
      },
      {
        label: "General Contact",
        value: "contact",
        count: submissions.filter(
          (s) =>
            s.submission_type === "contact" || s.submission_type === "general",
        ).length,
      },
    ],
    [submissions],
  );

  // Apply filters
  const filteredSubmissions = useMemo(() => {
    let result = submissions;

    // Apply tab filter first
    if (activeTab === "new")
      result = result.filter((sub) => sub.status === "new");
    else if (activeTab === "quotes")
      result = result.filter(
        (sub) =>
          sub.submission_type === "quote" || sub.submission_type === "estimate",
      );
    else if (activeTab === "contact")
      result = result.filter(
        (sub) =>
          sub.submission_type === "contact" ||
          sub.submission_type === "general",
      );

    // Apply advanced filters
    result = applyFilters(
      result,
      ["name", "email", "company", "message"] as any,
      "created_at",
      "status",
    );

    // Apply submission type filter (custom)
    if (filters.customFilters.type && filters.customFilters.type.length > 0) {
      result = result.filter((sub) =>
        filters.customFilters.type.includes(sub.submission_type),
      );
    }

    return result;
  }, [submissions, activeTab, filters, applyFilters]);

  // Bulk selection (must be after filteredSubmissions)
  const {
    selectedIds,
    selectedItems,
    selectedCount,
    toggleItem,
    toggleAll,
    clearSelection,
    isSelected,
    isAllSelected,
    isSomeSelected,
  } = useBulkSelection(filteredSubmissions);

  const newCount = submissions.filter((s) => s.status === "new").length;
  const quotesCount = submissions.filter(
    (s) => s.submission_type === "quote" || s.submission_type === "estimate",
  ).length;

  const exportColumns: ExportColumn[] = [
    { key: "created_at", label: "Date Submitted", enabled: true },
    { key: "name", label: "Name", enabled: true },
    { key: "email", label: "Email", enabled: true },
    { key: "phone", label: "Phone", enabled: true },
    { key: "company", label: "Company", enabled: true },
    { key: "submission_type", label: "Type", enabled: true },
    { key: "message", label: "Message", enabled: true },
    { key: "status", label: "Status", enabled: true },
    { key: "admin_notes", label: "Admin Notes", enabled: false },
  ];

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Verifying admin access...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="business-page-title">Contact Submissions</h1>
          <p className="business-page-subtitle">
            Manage inquiries and messages
          </p>
        </div>
        <ExportButton
          data={filteredSubmissions}
          filename={`contact-submissions-${new Date().toISOString().split("T")[0]}`}
          columns={exportColumns}
        />
      </div>

      {/* Advanced Filters */}
      <FilterBar
        onClearAll={clearFilters}
        hasActiveFilters={hasActiveFilters}
        className="mb-6"
      >
        <SearchInput
          value={filters.search}
          onChange={(value) => updateFilter("search", value)}
          placeholder="Search by name, email, company, or message..."
          className="min-w-[320px]"
        />

        <DateRangePicker
          value={filters.dateRange}
          onChange={(range) => updateFilter("dateRange", range)}
          placeholder="Filter by date"
        />

        <MultiSelectFilter
          options={statusOptions}
          selected={filters.status}
          onChange={(selected) => updateFilter("status", selected)}
          label="Status"
        />

        <MultiSelectFilter
          options={typeOptions}
          selected={filters.customFilters.type || []}
          onChange={(selected) =>
            updateFilter("customFilters", {
              ...filters.customFilters,
              type: selected,
            })
          }
          label="Submission Type"
        />
      </FilterBar>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="all" className="relative">
            All
            {submissions.length > 0 && (
              <Badge
                variant="secondary"
                className="ml-2 h-5 w-5 rounded-full p-0 text-xs"
              >
                {submissions.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="new" className="relative">
            New
            {newCount > 0 && (
              <Badge className="ml-2 h-5 w-5 rounded-full p-0 text-xs bg-secondary">
                {newCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="quotes">
            Quotes
            {quotesCount > 0 && (
              <Badge
                variant="secondary"
                className="ml-2 h-5 w-5 rounded-full p-0 text-xs"
              >
                {quotesCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {isLoading ? (
            <div className="text-center py-12">Loading submissions...</div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="business-glass-card p-12 text-center">
              <p className="text-muted-foreground">
                No submissions in this category.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className={`business-glass-card p-6 ${
                    submission.status === "new"
                      ? "border-secondary border-2"
                      : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {submission.status === "new" && (
                          <AlertCircle className="h-5 w-5 text-secondary" />
                        )}
                        <h3 className="text-lg font-semibold">
                          {submission.name}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {getSubmissionTypeLabel(submission.submission_type)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {format(
                          new Date(submission.created_at),
                          "MMMM d, yyyy • h:mm a",
                        )}
                      </p>
                    </div>
                    <Badge variant={getStatusVariant(submission.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(submission.status)}
                        {submission.status}
                      </span>
                    </Badge>
                  </div>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <a
                          href={`mailto:${submission.email}`}
                          className="text-primary hover:underline"
                        >
                          {submission.email}
                        </a>
                      </div>
                      {submission.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <a
                            href={`tel:${submission.phone}`}
                            className="text-primary hover:underline"
                          >
                            {submission.phone}
                          </a>
                        </div>
                      )}
                      {submission.company && (
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <span>{submission.company}</span>
                        </div>
                      )}
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm whitespace-pre-wrap">
                        {submission.message}
                      </p>
                    </div>
                    <div className="flex gap-2 justify-between">
                      <div className="flex gap-2">
                        {submission.status === "new" && (
                          <Button
                            size="sm"
                            className="business-btn-primary"
                            onClick={() =>
                              updateStatus(submission.id, "contacted")
                            }
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            Mark Contacted
                          </Button>
                        )}
                        {submission.status === "contacted" && (
                          <Button
                            size="sm"
                            className="business-btn-success"
                            onClick={() =>
                              updateStatus(submission.id, "resolved")
                            }
                          >
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Mark Resolved
                          </Button>
                        )}
                        {submission.status === "resolved" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus(submission.id, "new")}
                          >
                            Reopen
                          </Button>
                        )}
                      </div>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteClick(submission.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Submission</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this submission? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteSubmission}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ContactSubmissions;
