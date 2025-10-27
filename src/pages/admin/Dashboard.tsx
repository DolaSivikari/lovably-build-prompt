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
import { Skeleton } from "@/components/ui/skeleton";
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
  const [statsLoaded, setStatsLoaded] = useState(false);
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
  }, [isAdmin]); // Re-run when isAdmin changes

  const loadUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      setUser(session.user);
    }
  };

  const loadStats = async (attempt = 0): Promise<void> => {
    try {
      const { data, error } = await supabase.rpc('get_admin_dashboard_stats' as any);
      
      if (error || !data) {
        // Retry up to 2 times with backoff
        if (attempt < 2) {
          await new Promise(resolve => setTimeout(resolve, 300 * (attempt + 1)));
          return loadStats(attempt + 1);
        }
        
        console.error('RPC Error:', error);
        
        // Show specific error messages
        if (error?.message?.includes('does not exist')) {
          toast({
            variant: "destructive",
            title: "Database Setup Incomplete",
            description: "Dashboard statistics function not found. Please contact support.",
          });
        } else if (error?.message?.includes('Access denied')) {
          toast({
            variant: "destructive",
            title: "Access Denied",
            description: "You don't have permission to view dashboard statistics.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Failed to load dashboard stats",
            description: error?.message || "Please refresh the page to try again.",
          });
        }
        return;
      }
      
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
      toast({
        variant: "destructive",
        title: "Error loading dashboard",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setStatsLoaded(true);
    }
  };

  const loadRecentSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) {
        console.error('Error loading recent submissions:', error);
      }
      
      setRecentSubmissions(data || []);
    } catch (error) {
      console.error('Error loading recent submissions:', error);
      setRecentSubmissions([]);
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
        {!statsLoaded ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-5 rounded" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-3 w-20" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : statsLoaded && stats.projects === 0 && stats.blogPosts === 0 && stats.services === 0 ? (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="text-center space-y-4 py-8">
                <Briefcase className="h-16 w-16 mx-auto text-muted-foreground" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">No content yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Get started by creating your first project, blog post, or service
                  </p>
                  <div className="flex gap-3 justify-center flex-wrap">
                    <Button onClick={() => navigate("/admin/projects")}>
                      Create Project
                    </Button>
                    <Button variant="outline" onClick={() => navigate("/admin/blog")}>
                      Write Blog Post
                    </Button>
                    <Button variant="outline" onClick={() => navigate("/admin/services")}>
                      Add Service
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
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
        )}

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
              <Button
                variant="outline"
                className="justify-start h-auto py-4"
                onClick={() => navigate("/admin/homepage-settings")}
                aria-label="Edit Homepage Content"
              >
                <LayoutDashboard className="h-5 w-5 mr-3 text-primary" />
                <span className="text-sm font-medium">Homepage Content</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
