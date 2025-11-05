import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTableFilters } from "@/hooks/useTableFilters";
import { useUrlFilters } from "@/hooks/useUrlFilters";
import { SearchInput } from "@/components/admin/filters/SearchInput";
import { DateRangePicker } from "@/components/admin/filters/DateRangePicker";
import { MultiSelectFilter } from "@/components/admin/filters/MultiSelectFilter";
import { FilterBar } from "@/components/admin/filters/FilterBar";
import { ExportButton, ExportColumn } from "@/components/admin/ExportButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Mail, Phone, ExternalLink, Calendar, User, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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

interface ResumeSubmission {
  id: string;
  applicant_name: string;
  email: string;
  phone: string | null;
  cover_message: string | null;
  portfolio_links: string[] | null;
  status: string;
  created_at: string;
  admin_notes: string | null;
}

const ResumeSubmissions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<ResumeSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<ResumeSubmission | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [submissionToDelete, setSubmissionToDelete] = useState<string | null>(null);
  
  const { filters, updateFilter, clearFilters, hasActiveFilters, applyFilters } = useTableFilters();
  useUrlFilters(filters, updateFilter);

  useEffect(() => {
    checkAuth();
    loadSubmissions();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    }
  };

  const loadSubmissions = async () => {
    const { data, error } = await supabase
      .from("resume_submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load resume submissions",
        variant: "destructive",
      });
    } else {
      setSubmissions(data || []);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: "new" | "reviewed" | "contacted" | "rejected" | "hired") => {
    const { error } = await supabase
      .from("resume_submissions")
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
        title: "Status Updated",
        description: "Application status has been updated successfully",
      });
      loadSubmissions();
      if (selectedSubmission?.id === id) {
        setSelectedSubmission({ ...selectedSubmission, status });
      }
    }
  };

  const updateNotes = async (id: string, notes: string) => {
    const { error } = await supabase
      .from("resume_submissions")
      .update({ admin_notes: notes })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save notes",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Notes Saved",
        description: "Admin notes have been saved successfully",
      });
    }
  };

  const handleDeleteClick = (id: string) => {
    setSubmissionToDelete(id);
    setDeleteDialogOpen(true);
  };

  const deleteSubmission = async () => {
    if (!submissionToDelete) return;

    const { error } = await supabase
      .from("resume_submissions")
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
        description: "Resume submission deleted successfully",
      });
      if (selectedSubmission?.id === submissionToDelete) {
        setSelectedSubmission(null);
      }
      loadSubmissions();
    }
    
    setDeleteDialogOpen(false);
    setSubmissionToDelete(null);
  };

  const getStatusVariant = (status: string): "info" | "warning" | "contacted" | "success" | "destructive" | "default" => {
    switch (status) {
      case "new": return "info";
      case "reviewed": return "warning";
      case "contacted": return "contacted";
      case "hired": return "success";
      case "rejected": return "destructive";
      default: return "default";
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const filteredSubmissions = applyFilters(
    submissions,
    ['applicant_name', 'email', 'phone', 'cover_message'],
    'created_at',
    'status'
  );

  const statusOptions = [
    { label: 'New', value: 'new', count: submissions.filter(s => s.status === 'new').length },
    { label: 'Reviewed', value: 'reviewed', count: submissions.filter(s => s.status === 'reviewed').length },
    { label: 'Contacted', value: 'contacted', count: submissions.filter(s => s.status === 'contacted').length },
    { label: 'Hired', value: 'hired', count: submissions.filter(s => s.status === 'hired').length },
    { label: 'Rejected', value: 'rejected', count: submissions.filter(s => s.status === 'rejected').length },
  ];

  const exportColumns: ExportColumn[] = [
    { key: 'created_at', label: 'Date Applied', enabled: true },
    { key: 'applicant_name', label: 'Name', enabled: true },
    { key: 'email', label: 'Email', enabled: true },
    { key: 'phone', label: 'Phone', enabled: true },
    { key: 'cover_message', label: 'Cover Message', enabled: true },
    { key: 'portfolio_links', label: 'Portfolio Links', enabled: true },
    { key: 'status', label: 'Status', enabled: true },
    { key: 'admin_notes', label: 'Admin Notes', enabled: false },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate("/admin")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Resume Submissions</h1>
                <p className="text-sm text-muted-foreground">
                  Manage job applications and candidate communications
                </p>
              </div>
            </div>
            <ExportButton
              data={filteredSubmissions}
              filename={`resume-submissions-${new Date().toISOString().split('T')[0]}`}
              columns={exportColumns}
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Filters */}
        <FilterBar onClearAll={clearFilters} hasActiveFilters={hasActiveFilters} className="mb-6">
          <SearchInput
            value={filters.search}
            onChange={(value) => updateFilter('search', value)}
            placeholder="Search by name, email, or message..."
            className="w-full md:w-[300px]"
          />
          <DateRangePicker
            value={filters.dateRange}
            onChange={(range) => updateFilter('dateRange', range)}
            placeholder="Filter by date"
          />
          <MultiSelectFilter
            options={statusOptions}
            selected={filters.status}
            onChange={(selected) => updateFilter('status', selected)}
            label="Status"
          />
        </FilterBar>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Submissions List */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Applications ({filteredSubmissions.length})</CardTitle>
                <CardDescription>
                  {hasActiveFilters 
                    ? `Showing ${filteredSubmissions.length} of ${submissions.length} applications` 
                    : 'Click an application to view details'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
                {loading ? (
                  <p className="text-sm text-muted-foreground">Loading...</p>
                ) : filteredSubmissions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    {hasActiveFilters ? 'No applications match your filters' : 'No applications yet'}
                  </p>
                ) : (
                  filteredSubmissions.map((submission) => (
                    <Card
                      key={submission.id}
                      className={`cursor-pointer hover:shadow-md transition-shadow ${
                        selectedSubmission?.id === submission.id ? "border-primary border-2" : ""
                      }`}
                      onClick={() => setSelectedSubmission(submission)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold truncate">{submission.applicant_name}</p>
                            <p className="text-xs text-muted-foreground truncate">{submission.email}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={getStatusVariant(submission.status)} className="text-xs">
                              {getStatusLabel(submission.status)}
                            </Badge>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteClick(submission.id);
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(submission.created_at), 'MMM d, yyyy')}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Submission Details */}
          <div className="lg:col-span-2">
            {selectedSubmission ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <User className="h-5 w-5" />
                          {selectedSubmission.applicant_name}
                        </CardTitle>
                        <CardDescription>
                          Applied on {format(new Date(selectedSubmission.created_at), 'MMMM d, yyyy')} at {format(new Date(selectedSubmission.created_at), 'h:mm a')}
                        </CardDescription>
                      </div>
                      <Select
                        value={selectedSubmission.status}
                        onValueChange={(value) => updateStatus(selectedSubmission.id, value as "new" | "reviewed" | "contacted" | "rejected" | "hired")}
                      >
                        <SelectTrigger className="w-[160px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="reviewed">Reviewed</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="hired">Hired</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Contact Information */}
                    <div>
                      <h3 className="font-semibold mb-3">Contact Information</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <a href={`mailto:${selectedSubmission.email}`} className="text-primary hover:underline">
                            {selectedSubmission.email}
                          </a>
                        </div>
                        {selectedSubmission.phone && (
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <a href={`tel:${selectedSubmission.phone}`} className="text-primary hover:underline">
                              {selectedSubmission.phone}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Cover Message */}
                    {selectedSubmission.cover_message && (
                      <div>
                        <h3 className="font-semibold mb-3">Cover Letter / Message</h3>
                        <div className="bg-muted p-4 rounded-lg text-sm whitespace-pre-wrap">
                          {selectedSubmission.cover_message}
                        </div>
                      </div>
                    )}

                    {/* Portfolio Links */}
                    {selectedSubmission.portfolio_links && selectedSubmission.portfolio_links.length > 0 && (
                      <div>
                        <h3 className="font-semibold mb-3">Portfolio & Documents</h3>
                        <div className="space-y-2">
                          {selectedSubmission.portfolio_links.map((link, index) => (
                            <a
                              key={index}
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-primary hover:underline"
                            >
                              <ExternalLink className="h-4 w-4" />
                              {link}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Admin Notes */}
                <Card>
                  <CardHeader>
                    <CardTitle>Admin Notes</CardTitle>
                    <CardDescription>Private notes about this application</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Add notes about this candidate..."
                      defaultValue={selectedSubmission.admin_notes || ""}
                      onBlur={(e) => updateNotes(selectedSubmission.id, e.target.value)}
                      className="min-h-[120px]"
                    />
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-12">
                  <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-semibold mb-2">No Application Selected</p>
                  <p className="text-sm text-muted-foreground">
                    Select an application from the list to view details
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Resume Submission</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this resume submission? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteSubmission} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ResumeSubmissions;
