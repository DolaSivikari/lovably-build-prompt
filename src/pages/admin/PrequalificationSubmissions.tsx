import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Mail, Phone, Building2, AlertCircle, CheckCircle2, Clock, Package, Trash2 } from "lucide-react";
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

const PrequalificationSubmissions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isLoading: authLoading, isAdmin } = useAdminAuth();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [submissionToDelete, setSubmissionToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (isAdmin) {
      loadSubmissions();

      // Set up real-time subscription
      const channel = supabase
        .channel('prequalification-submissions-list')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'prequalification_downloads'
          },
          () => {
            loadSubmissions();
          }
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
      .from("prequalification_downloads")
      .select("*")
      .order("downloaded_at", { ascending: false });

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
      .from("prequalification_downloads")
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
      .from("prequalification_downloads")
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
        description: "Prequalification request deleted successfully",
      });
      loadSubmissions();
    }
    
    setDeleteDialogOpen(false);
    setSubmissionToDelete(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-secondary text-white";
      case "contacted": return "bg-blue-600 text-white";
      case "completed": return "bg-green-600 text-white";
      default: return "bg-gray-600 text-white";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new": return <AlertCircle className="h-4 w-4" />;
      case "contacted": return <Clock className="h-4 w-4" />;
      case "completed": return <CheckCircle2 className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const filteredSubmissions = submissions.filter(sub => {
    if (activeTab === "all") return true;
    if (activeTab === "new") return sub.status === "new";
    if (activeTab === "contacted") return sub.status === "contacted";
    if (activeTab === "completed") return sub.status === "completed";
    return true;
  });

  const newCount = submissions.filter(s => s.status === "new").length;
  const contactedCount = submissions.filter(s => s.status === "contacted").length;

  if (authLoading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <p>Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/admin")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-3">
              <Package className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                Prequalification Requests
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Requests</CardDescription>
              <CardTitle className="text-3xl">{submissions.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>New Requests</CardDescription>
              <CardTitle className="text-3xl text-secondary">{newCount}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>In Progress</CardDescription>
              <CardTitle className="text-3xl text-blue-600">{contactedCount}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Completed</CardDescription>
              <CardTitle className="text-3xl text-green-600">
                {submissions.filter(s => s.status === "completed").length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="all" className="relative">
              All
              {submissions.length > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
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
            <TabsTrigger value="contacted">
              In Progress
              {contactedCount > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                  {contactedCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {isLoading ? (
              <div className="text-center py-12">Loading submissions...</div>
            ) : filteredSubmissions.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No prequalification requests in this category.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredSubmissions.map((submission) => (
                  <Card 
                    key={submission.id}
                    className={`${
                      submission.status === 'new' 
                        ? 'border-secondary border-2 bg-primary/5'
                        : ''
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            {submission.status === 'new' && (
                              <AlertCircle className="h-5 w-5 text-secondary" />
                            )}
                            <CardTitle className="text-lg">{submission.company_name}</CardTitle>
                            <Badge variant="outline" className="text-xs">
                              {submission.project_type || "Package Request"}
                            </Badge>
                          </div>
                          <CardDescription>
                            Contact: {submission.contact_name} • {format(new Date(submission.downloaded_at), 'MMMM d, yyyy • h:mm a')}
                          </CardDescription>
                        </div>
                        <Badge className={getStatusColor(submission.status)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(submission.status)}
                            {submission.status}
                          </span>
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <a href={`mailto:${submission.email}`} className="text-primary hover:underline">
                            {submission.email}
                          </a>
                        </div>
                        {submission.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <a href={`tel:${submission.phone}`} className="text-primary hover:underline">
                              {submission.phone}
                            </a>
                          </div>
                        )}
                        {submission.project_value_range && (
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            <span>Value: {submission.project_value_range}</span>
                          </div>
                        )}
                      </div>
                      {submission.message && (
                        <div className="bg-muted p-4 rounded-lg">
                          <p className="text-sm whitespace-pre-wrap">{submission.message}</p>
                        </div>
                      )}
                      <div className="flex gap-2 justify-between">
                        <div className="flex gap-2">
                          {submission.status === 'new' && (
                            <Button
                              size="sm"
                              className="bg-primary hover:bg-primary/90"
                              onClick={() => updateStatus(submission.id, "contacted")}
                            >
                              <Mail className="h-4 w-4 mr-2" />
                              Mark Contacted
                            </Button>
                          )}
                          {submission.status === 'contacted' && (
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => updateStatus(submission.id, "completed")}
                            >
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                              Mark Completed
                            </Button>
                          )}
                          {submission.status === 'completed' && (
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Prequalification Request</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this prequalification request? This action cannot be undone.
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

export default PrequalificationSubmissions;
