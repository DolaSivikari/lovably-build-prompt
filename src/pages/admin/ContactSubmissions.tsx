import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Mail, Phone, Building2, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { format } from "date-fns";

const ContactSubmissions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isLoading: authLoading, isAdmin } = useAdminAuth();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    if (isAdmin) {
      loadSubmissions();

    // Set up real-time subscription
    const channel = supabase
      .channel('contact-submissions-list')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'contact_submissions'
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-secondary text-white";
      case "contacted": return "bg-blue-600 text-white";
      case "resolved": return "bg-green-600 text-white";
      default: return "bg-gray-600 text-white";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new": return <AlertCircle className="h-4 w-4" />;
      case "contacted": return <Clock className="h-4 w-4" />;
      case "resolved": return <CheckCircle2 className="h-4 w-4" />;
      default: return <Mail className="h-4 w-4" />;
    }
  };

  const getSubmissionTypeLabel = (type: string) => {
    switch (type) {
      case "quote": return "Quote Request";
      case "estimate": return "Estimate Request";
      case "starter_package": return "Starter Package";
      case "contact": return "General Contact";
      default: return type;
    }
  };

  const filteredSubmissions = submissions.filter(sub => {
    if (activeTab === "all") return true;
    if (activeTab === "new") return sub.status === "new";
    if (activeTab === "quotes") return sub.submission_type === "quote" || sub.submission_type === "estimate";
    if (activeTab === "contact") return sub.submission_type === "contact" || sub.submission_type === "general";
    return true;
  });

  const newCount = submissions.filter(s => s.status === "new").length;
  const quotesCount = submissions.filter(s => s.submission_type === "quote" || s.submission_type === "estimate").length;

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
            <h1 className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
              Forms Inbox
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
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
            <TabsTrigger value="quotes">
              Quotes
              {quotesCount > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
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
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No submissions in this category.</p>
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
                            <CardTitle className="text-lg">{submission.name}</CardTitle>
                            <Badge variant="outline" className="text-xs">
                              {getSubmissionTypeLabel(submission.submission_type)}
                            </Badge>
                          </div>
                          <CardDescription>
                            {format(new Date(submission.created_at), 'MMMM d, yyyy • h:mm a')}
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
                        {submission.company && (
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            <span>{submission.company}</span>
                          </div>
                        )}
                      </div>
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="text-sm whitespace-pre-wrap">{submission.message}</p>
                      </div>
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
                            onClick={() => updateStatus(submission.id, "resolved")}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Mark Resolved
                          </Button>
                        )}
                        {submission.status === 'resolved' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus(submission.id, "new")}
                          >
                            Reopen
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ContactSubmissions;
