import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, ArrowLeft, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { generatePreviewToken } from "@/utils/previewToken";
import { AdminTopBar } from "@/components/admin/AdminTopBar";

const CaseStudies = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    loadCaseStudies();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    }
  };

  const loadCaseStudies = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load case studies",
        variant: "destructive",
      });
    } else {
      setCaseStudies(data || []);
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this case study?")) return;

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete case study",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Case study deleted successfully",
      });
      loadCaseStudies();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "default";
      case "draft": return "secondary";
      case "archived": return "outline";
      default: return "secondary";
    }
  };

  const handleViewCaseStudy = (study: any) => {
    if (study.publish_state === 'published') {
      window.open(`/case-study/${study.slug}`, '_blank');
    } else {
      // Draft: open with preview mode
      const token = generatePreviewToken();
      window.open(`/case-study/${study.slug}?preview=true&token=${token}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminTopBar />
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate("/admin")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-2xl font-bold">Case Studies</h1>
            </div>
            <Button onClick={() => navigate("/admin/case-studies/new")}>
              <Plus className="h-4 w-4 mr-2" />
              New Case Study
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center py-12">Loading case studies...</div>
        ) : caseStudies.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">No case studies yet. Create your first case study to get started.</p>
              <Button onClick={() => navigate("/admin/case-studies/new")}>
                <Plus className="h-4 w-4 mr-2" />
                Create Case Study
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {caseStudies.map((study) => (
              <Card key={study.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl">{study.title}</CardTitle>
                        <Badge variant={getStatusColor(study.publish_state)}>
                          {study.publish_state}
                        </Badge>
                      </div>
                      <CardDescription>{study.summary || study.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewCaseStudy(study)}
                        title={study.publish_state === 'published' ? 'View published case study' : 'Preview draft'}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/admin/case-studies/${study.id}`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(study.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 text-sm text-muted-foreground flex-wrap">
                    {study.client_name && (
                      <span>Client: {study.client_name}</span>
                    )}
                    {study.location && (
                      <span>Location: {study.location}</span>
                    )}
                    {study.category && (
                      <span>Category: {study.category}</span>
                    )}
                    {study.project_status && (
                      <span>Status: {study.project_status}</span>
                    )}
                    {study.completion_date && (
                      <span>Completed: {format(new Date(study.completion_date), 'MMM yyyy')}</span>
                    )}
                  </div>
                  {study.tags && study.tags.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {study.tags.map((tag: string) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CaseStudies;
