import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MetricCard from "@/components/admin/MetricCard";
import QuickActions from "@/components/admin/QuickActions";
import ActivityFeed from "@/components/admin/ActivityFeed";

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
    resumeSubmissions: 0,
    newResumes: 0,
    activeBudget: 0,
    overdueTasks: 0,
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
    const [projects, services, blogPosts, caseStudies, contacts, newContacts, resumes, newResumes] = await Promise.all([
      supabase.from("projects").select("id", { count: "exact", head: true }).eq("publish_state", "published"),
      supabase.from("services").select("id", { count: "exact", head: true }),
      supabase.from("blog_posts").select("id", { count: "exact", head: true }),
      supabase.from("projects").select("id", { count: "exact", head: true }),
      supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
      supabase.from("contact_submissions").select("id", { count: "exact", head: true }).eq("status", "new"),
      supabase.from("resume_submissions").select("id", { count: "exact", head: true }),
      supabase.from("resume_submissions").select("id", { count: "exact", head: true }).eq("status", "new"),
    ]);

    setStats({
      projects: projects.count || 0,
      services: services.count || 0,
      blogPosts: blogPosts.count || 0,
      caseStudies: caseStudies.count || 0,
      contactSubmissions: contacts.count || 0,
      newSubmissions: newContacts.count || 0,
      resumeSubmissions: resumes.count || 0,
      newResumes: newResumes.count || 0,
      activeBudget: 2400000, // Placeholder - will come from budget tracking in Phase C
      overdueTasks: 3, // Placeholder - will come from tasks in Phase B
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

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You've been successfully signed out.",
    });
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="border-b bg-background shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <LayoutDashboard className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                Ascent CMS
              </h1>
              <p className="text-xs text-muted-foreground">Construction Management System</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              className="hover:bg-primary hover:text-white transition-colors"
              onClick={() => navigate("/admin/users")}
            >
              <Users className="h-4 w-4 mr-2" />
              Users
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

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
            title="Active Projects"
            value={stats.projects}
            icon={Briefcase}
            trend={{ value: "+2 this month", isPositive: true }}
            onClick={() => navigate("/admin/projects")}
          />
          <MetricCard
            title="Tasks Due This Week"
            value={24}
            icon={FileText}
            trend={{ value: "+5 new", isPositive: true }}
            onClick={() => navigate("/admin/projects")}
          />
          <MetricCard
            title="Budget This Quarter"
            value="$2.4M"
            icon={DollarSign}
            trend={{ value: "+12% growth", isPositive: true }}
            onClick={() => navigate("/admin/projects")}
          />
          <MetricCard
            title="Overdue Items"
            value={stats.overdueTasks}
            icon={AlertCircle}
            badge={stats.overdueTasks}
            onClick={() => navigate("/admin/projects")}
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
          <MetricCard
            title="Blog Posts"
            value={stats.blogPosts}
            icon={FileText}
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

        {/* Quick Actions & Activity Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <QuickActions />
          <ActivityFeed 
            submissions={recentSubmissions} 
            newCount={stats.newSubmissions}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
