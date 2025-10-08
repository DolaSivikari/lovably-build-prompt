import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  Users, 
  Mail,
  LogOut,
  Settings,
  Bell,
  Clock,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    projects: 0,
    services: 0,
    blogPosts: 0,
    caseStudies: 0,
    contactSubmissions: 0,
    newSubmissions: 0,
  });
  const [recentSubmissions, setRecentSubmissions] = useState<any[]>([]);

  useEffect(() => {
    checkAuth();
    loadStats();
    loadRecentSubmissions();

    // Set up real-time subscription for new submissions
    const channel = supabase
      .channel('contact-submissions-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'contact_submissions'
        },
        (payload) => {
          toast({
            title: "New Submission! 🔔",
            description: `${payload.new.name} sent a ${payload.new.submission_type} request`,
          });
          loadStats();
          loadRecentSubmissions();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }
    setUser(session.user);
  };

  const loadStats = async () => {
    const [projects, services, blogPosts, caseStudies, contacts, newContacts] = await Promise.all([
      supabase.from("projects").select("id", { count: "exact", head: true }).eq("publish_state", "published"),
      supabase.from("services").select("id", { count: "exact", head: true }),
      supabase.from("blog_posts").select("id", { count: "exact", head: true }),
      supabase.from("projects").select("id", { count: "exact", head: true }),
      supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
      supabase.from("contact_submissions").select("id", { count: "exact", head: true }).eq("status", "new"),
    ]);

    setStats({
      projects: projects.count || 0,
      services: services.count || 0,
      blogPosts: blogPosts.count || 0,
      caseStudies: caseStudies.count || 0,
      contactSubmissions: contacts.count || 0,
      newSubmissions: newContacts.count || 0,
    });
  };

  const loadRecentSubmissions = async () => {
    const { data } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    setRecentSubmissions(data || []);
  };

  const getSubmissionTypeColor = (type: string) => {
    switch (type) {
      case "quote": return "default";
      case "estimate": return "secondary";
      case "starter_package": return "default";
      default: return "outline";
    }
  };

  const getSubmissionTypeLabel = (type: string) => {
    switch (type) {
      case "quote": return "Quote Request";
      case "estimate": return "Estimate Request";
      case "starter_package": return "Starter Package";
      default: return "General Contact";
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You've been successfully signed out.",
    });
    navigate("/auth");
  };

  const statCards = [
    { title: "Published Projects", value: stats.projects, icon: Briefcase, href: "/admin/projects" },
    { title: "Services", value: stats.services, icon: FileText, href: "/admin/services" },
    { title: "Blog Posts", value: stats.blogPosts, icon: FileText, href: "/admin/blog" },
    { title: "Case Studies", value: stats.caseStudies, icon: Briefcase, href: "/admin/case-studies" },
    { title: "Contact Forms", value: stats.contactSubmissions, icon: Mail, href: "/admin/contacts" },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold">BuildCraft CMS</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/admin/settings")}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
          <p className="text-muted-foreground">
            {user?.email}
          </p>
        </div>

        {/* Alert Banner for New Submissions */}
        {stats.newSubmissions > 0 && (
          <Card className="mb-6 border-primary bg-primary/5">
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-primary rounded-full p-2">
                    <Bell className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">
                      {stats.newSubmissions} New {stats.newSubmissions === 1 ? 'Submission' : 'Submissions'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      You have unread quote/estimate requests
                    </p>
                  </div>
                </div>
                <Button onClick={() => navigate("/admin/contacts")}>
                  View All
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {statCards.map((stat) => (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(stat.href)}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline" onClick={() => navigate("/admin/projects/new")}>
                <Briefcase className="h-4 w-4 mr-2" />
                Create New Project
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => navigate("/admin/services/new")}>
                <FileText className="h-4 w-4 mr-2" />
                Add New Service
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => navigate("/admin/blog/new")}>
                <FileText className="h-4 w-4 mr-2" />
                Write Blog Post
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => navigate("/admin/case-studies/new")}>
                <Briefcase className="h-4 w-4 mr-2" />
                Create Case Study
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Submissions</CardTitle>
                  <CardDescription>Latest quote and contact requests</CardDescription>
                </div>
                {stats.newSubmissions > 0 && (
                  <Badge className="bg-primary text-primary-foreground">
                    {stats.newSubmissions} New
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {recentSubmissions.length === 0 ? (
                <p className="text-sm text-muted-foreground">No submissions yet.</p>
              ) : (
                <div className="space-y-4">
                  {recentSubmissions.map((submission) => (
                    <div 
                      key={submission.id} 
                      className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors ${
                        submission.status === 'new' ? 'bg-primary/5 border-primary/20' : 'bg-background'
                      }`}
                      onClick={() => navigate("/admin/contacts")}
                    >
                      <div className={`mt-1 p-1.5 rounded-full ${
                        submission.status === 'new' ? 'bg-primary/20' : 'bg-muted'
                      }`}>
                        {submission.status === 'new' ? (
                          <AlertCircle className="h-4 w-4 text-primary" />
                        ) : (
                          <Mail className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <p className="font-medium text-sm truncate">{submission.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{submission.email}</p>
                          </div>
                          <Badge variant={getSubmissionTypeColor(submission.submission_type)} className="text-xs shrink-0">
                            {getSubmissionTypeLabel(submission.submission_type)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {format(new Date(submission.created_at), 'MMM d, h:mm a')}
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => navigate("/admin/contacts")}
                  >
                    View All Submissions
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
