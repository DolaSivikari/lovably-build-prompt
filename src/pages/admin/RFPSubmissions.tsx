import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { UnifiedSidebar } from "@/components/admin/UnifiedSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, DollarSign, Calendar, MapPin, FileText, Building2, Search } from "lucide-react";
import { format } from "date-fns";

interface RFPSubmission {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string | null;
  project_name: string;
  project_type: string;
  project_location: string | null;
  estimated_value_range: string;
  estimated_timeline: string | null;
  project_start_date: string | null;
  scope_of_work: string;
  delivery_method: string | null;
  bonding_required: boolean;
  prequalification_complete: boolean;
  additional_requirements: string | null;
  status: string;
  admin_notes: string | null;
  created_at: string;
}

const statusVariants: Record<string, "info" | "warning" | "contacted" | "success" | "inactive"> = {
  new: "info",
  reviewing: "warning",
  quoted: "contacted",
  awarded: "success",
  declined: "inactive"
};

const valueRangeLabels: Record<string, string> = {
  "under-500k": "Under $500K",
  "500k-1m": "$500K - $1M",
  "1m-5m": "$1M - $5M",
  "5m-10m": "$5M - $10M",
  "10m-plus": "$10M+"
};

export default function RFPSubmissions() {
  const { isLoading, isAdmin } = useAdminAuth();
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<RFPSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<RFPSubmission | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    if (!isLoading && isAdmin) {
      fetchSubmissions();
    }
  }, [isLoading, isAdmin]);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('rfp_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('rfp_submissions')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Success", description: "Status updated successfully" });
      fetchSubmissions();
      if (selectedSubmission?.id === id) {
        setSelectedSubmission({ ...selectedSubmission, status: newStatus });
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const saveNotes = async (id: string, notes: string) => {
    try {
      const { error } = await supabase
        .from('rfp_submissions')
        .update({ admin_notes: notes })
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Success", description: "Notes saved successfully" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const filteredSubmissions = submissions.filter(sub => {
    const matchesSearch = sub.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          sub.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          sub.contact_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (isLoading || loading) {
    return (
      <div className="flex h-screen">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <UnifiedSidebar collapsed={false} onToggle={() => {}} />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">RFP Submissions</h1>
            <p className="text-muted-foreground">Manage incoming request for proposals</p>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by company, project, or contact..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="reviewing">Reviewing</SelectItem>
                <SelectItem value="quoted">Quoted</SelectItem>
                <SelectItem value="awarded">Awarded</SelectItem>
                <SelectItem value="declined">Declined</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Submissions ({filteredSubmissions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Value Range</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No RFP submissions found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredSubmissions.map((sub) => (
                      <TableRow key={sub.id}>
                        <TableCell className="whitespace-nowrap">
                          {format(new Date(sub.created_at), 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell className="font-medium">{sub.company_name}</TableCell>
                        <TableCell>{sub.project_name}</TableCell>
                        <TableCell className="capitalize">{sub.project_type.replace('-', ' ')}</TableCell>
                        <TableCell>{valueRangeLabels[sub.estimated_value_range]}</TableCell>
                        <TableCell>
                          <Badge variant={statusVariants[sub.status]}>
                            {sub.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedSubmission(sub);
                              setDetailsOpen(true);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>RFP Details</DialogTitle>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-semibold">Status</Label>
                  <Select
                    value={selectedSubmission.status}
                    onValueChange={(value) => updateStatus(selectedSubmission.id, value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="reviewing">Reviewing</SelectItem>
                      <SelectItem value="quoted">Quoted</SelectItem>
                      <SelectItem value="awarded">Awarded</SelectItem>
                      <SelectItem value="declined">Declined</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-semibold">Submitted</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {format(new Date(selectedSubmission.created_at), 'PPP p')}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Company Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Company Name</Label>
                    <p className="text-sm">{selectedSubmission.company_name}</p>
                  </div>
                  <div>
                    <Label className="text-sm">Contact Name</Label>
                    <p className="text-sm">{selectedSubmission.contact_name}</p>
                  </div>
                  <div>
                    <Label className="text-sm">Email</Label>
                    <p className="text-sm">{selectedSubmission.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm">Phone</Label>
                    <p className="text-sm">{selectedSubmission.phone || 'N/A'}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Project Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-semibold">Project Name</Label>
                    <p>{selectedSubmission.project_name}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm">Type</Label>
                      <p className="capitalize">{selectedSubmission.project_type.replace('-', ' ')}</p>
                    </div>
                    <div>
                      <Label className="text-sm">Delivery Method</Label>
                      <p className="capitalize">{selectedSubmission.delivery_method?.replace('-', ' ') || 'N/A'}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      Location
                    </Label>
                    <p>{selectedSubmission.project_location || 'N/A'}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm flex items-center gap-2">
                        <DollarSign className="w-3 h-3" />
                        Estimated Value
                      </Label>
                      <p>{valueRangeLabels[selectedSubmission.estimated_value_range]}</p>
                    </div>
                    <div>
                      <Label className="text-sm flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        Timeline
                      </Label>
                      <p className="capitalize">{selectedSubmission.estimated_timeline?.replace('-', ' ') || 'N/A'}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm">Scope of Work</Label>
                    <p className="whitespace-pre-wrap text-sm bg-muted p-3 rounded">{selectedSubmission.scope_of_work}</p>
                  </div>
                  {selectedSubmission.additional_requirements && (
                    <div>
                      <Label className="text-sm">Additional Requirements</Label>
                      <p className="whitespace-pre-wrap text-sm">{selectedSubmission.additional_requirements}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm">Bonding Required</Label>
                      <p>{selectedSubmission.bonding_required ? 'Yes' : 'No'}</p>
                    </div>
                    <div>
                      <Label className="text-sm">Prequalification Complete</Label>
                      <p>{selectedSubmission.prequalification_complete ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <Label className="text-sm font-semibold">Admin Notes</Label>
                <Textarea
                  value={selectedSubmission.admin_notes || ''}
                  onChange={(e) => setSelectedSubmission({ ...selectedSubmission, admin_notes: e.target.value })}
                  rows={4}
                  className="mt-2"
                  placeholder="Add internal notes about this RFP..."
                />
                <Button
                  onClick={() => saveNotes(selectedSubmission.id, selectedSubmission.admin_notes || '')}
                  className="mt-2"
                >
                  Save Notes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
