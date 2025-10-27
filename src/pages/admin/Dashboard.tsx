import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  Users, 
  Mail,
  LogOut,
  DollarSign,
  AlertCircle,
  TrendingUp,
  Shield,
  Settings,
  Activity,
  Search,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import MetricCard from "@/components/admin/MetricCard";
import QuickActions from "@/components/admin/QuickActions";
import ActivityFeed from "@/components/admin/ActivityFeed";
import { AdminTopBar } from "@/components/admin/AdminTopBar";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isLoading: authLoading, isAdmin } = useAdminAuth();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    projects: 0,
    services: 0,
    blogPosts: 0,
    caseStudies: 0,
    contactSubmissions: 0,
    newSubmissions: 0,
    resumeSubmissions: 0,
    newResumes: 0,
    draftProjects: 0,
    draftPosts: 0,
  });
  const [recentSubmissions, setRecentSubmissions] = useState<any[]>([]);

  useEffect(() => {
    if (!isAdmin) return;

    loadUser();
    loadStats();
    loadRecentSubmissions();

    // Set up real-time subscription for new submissions (fixed memory leak)
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
  }, []); // Empty dependency array - only run once

  const loadUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setUser(session.user);
    }
  };

  const loadStats = async () => {
    try {
      const { data, error } = await supabase.rpc('get_admin_dashboard_stats' as any);
      
      if (error) throw error;
      
      if (data && typeof data === 'object') {
        const stats = data as any;
        setStats({
          projects: (stats.projects_published || 0) + (stats.projects_draft || 0),
          services: stats.services_total || 0,
          blogPosts: (stats.blog_posts_published || 0) + (stats.blog_posts_draft || 0),
          caseStudies: (stats.projects_published || 0) + (stats.projects_draft || 0),
          contactSubmissions: stats.contact_submissions_total || 0,
          newSubmissions: stats.contact_submissions_new || 0,
          resumeSubmissions: stats.resume_submissions_total || 0,
          newResumes: stats.resume_submissions_new || 0,
          draftProjects: stats.projects_draft || 0,
          draftPosts: stats.blog_posts_draft || 0,
        });
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const loadRecentSubmissions = async () => {
    const { data } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    setRecentSubmissions(data || []);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You've been successfully signed out.",
    });
    navigate("/auth");
  };

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
      <AdminTopBar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}!
          </h2>
          <p className="text-muted-foreground">
            Here's your project overview • {user?.email}
          </p>
        </div>

        {/* KPI Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Published Projects"
            value={stats.projects}
            icon={Briefcase}
            trend={{ value: `${stats.draftProjects} drafts`, isPositive: false }}
            onClick={() => navigate("/admin/projects")}
          />
          <MetricCard
            title="Published Blog Posts"
            value={stats.blogPosts}
            icon={FileText}
            trend={{ value: `${stats.draftPosts} drafts`, isPositive: false }}
            onClick={() => navigate("/admin/blog")}
          />
          <MetricCard
            title="Contact Forms"
            value={stats.contactSubmissions}
            icon={Mail}
            badge={stats.newSubmissions}
            onClick={() => navigate("/admin/contacts")}
          />
          <MetricCard
            title="Resume Inbox"
            value={stats.resumeSubmissions}
            icon={Users}
            badge={stats.newResumes}
            onClick={() => navigate("/admin/resumes")}
          />
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Services"
            value={stats.services}
            icon={TrendingUp}
            onClick={() => navigate("/admin/services")}
          />
        </div>

        {/* Quick Actions & Activity Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <QuickActions />
          <ActivityFeed 
            submissions={recentSubmissions} 
            newCount={stats.newSubmissions}
          />
        </div>

        {/* Settings & Tools Card */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Settings & Tools</CardTitle>
            <CardDescription>Manage content, users, and site configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Button
                variant="outline"
                className="justify-start h-auto py-4"
                onClick={() => navigate("/admin/media")}
                aria-label="Open Media Library"
              >
                <FileText className="h-5 w-5 mr-3 text-primary" />
                <span className="text-sm font-medium">Media Library</span>
              </Button>
              <Button
                variant="outline"
                className="justify-start h-auto py-4"
                onClick={() => navigate("/admin/users")}
                aria-label="Manage Users"
              >
                <Users className="h-5 w-5 mr-3 text-primary" />
                <span className="text-sm font-medium">User Management</span>
              </Button>
              <Button
                variant="outline"
                className="justify-start h-auto py-4"
                onClick={() => navigate("/admin/security-center")}
                aria-label="Open Security Centre"
              >
                <Shield className="h-5 w-5 mr-3 text-primary" />
                <span className="text-sm font-medium">Security Centre</span>
              </Button>
              <Button
                variant="outline"
                className="justify-start h-auto py-4"
                onClick={() => navigate("/admin/seo-dashboard")}
                aria-label="Open SEO Dashboard"
              >
                <Search className="h-5 w-5 mr-3 text-primary" />
                <span className="text-sm font-medium">SEO Dashboard</span>
              </Button>
              <Button
                variant="outline"
                className="justify-start h-auto py-4"
                onClick={() => navigate("/admin/performance-dashboard")}
                aria-label="Open Performance Dashboard"
              >
                <Activity className="h-5 w-5 mr-3 text-primary" />
                <span className="text-sm font-medium">Performance</span>
              </Button>
              <Button
                variant="outline"
                className="justify-start h-auto py-4"
                onClick={() => navigate("/admin/site-settings")}
                aria-label="Open Site Settings"
              >
                <Settings className="h-5 w-5 mr-3 text-primary" />
                <span className="text-sm font-medium">Site Settings</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
