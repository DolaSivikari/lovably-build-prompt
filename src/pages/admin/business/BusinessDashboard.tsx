import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Card } from "@/components/ui/card";
import { Users, Briefcase, FileText, DollarSign, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/utils/currency";

export default function BusinessDashboard() {
  const { isLoading, isAdmin } = useAdminAuth();
  const [stats, setStats] = useState({
    totalClients: 0,
    activeProjects: 0,
    pendingEstimates: 0,
    outstandingInvoices: 0,
    totalRevenue: 0,
    paidRevenue: 0,
  });

  useEffect(() => {
    if (isAdmin) {
      fetchDashboardStats();
    }
  }, [isAdmin]);

  const fetchDashboardStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch clients count
      const { count: clientsCount } = await supabase
        .from("clients")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("is_active", true);

      // Fetch active projects count
      const { count: projectsCount } = await supabase
        .from("business_projects")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("status", "active");

      // Fetch pending estimates count
      const { count: estimatesCount } = await supabase
        .from("estimates")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .in("status", ["draft", "sent"]);

      // Fetch invoices data
      const { data: invoices } = await supabase
        .from("invoices")
        .select("total_cents, paid_cents, balance_cents")
        .eq("user_id", user.id);

      const totalRevenue = invoices?.reduce((sum, inv) => sum + inv.total_cents, 0) || 0;
      const paidRevenue = invoices?.reduce((sum, inv) => sum + inv.paid_cents, 0) || 0;
      const outstanding = invoices?.reduce((sum, inv) => sum + inv.balance_cents, 0) || 0;

      setStats({
        totalClients: clientsCount || 0,
        activeProjects: projectsCount || 0,
        pendingEstimates: estimatesCount || 0,
        outstandingInvoices: outstanding,
        totalRevenue,
        paidRevenue,
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  const statCards = [
    {
      label: "Total Clients",
      value: stats.totalClients,
      icon: Users,
      color: "text-blue-500",
    },
    {
      label: "Active Projects",
      value: stats.activeProjects,
      icon: Briefcase,
      color: "text-green-500",
    },
    {
      label: "Pending Estimates",
      value: stats.pendingEstimates,
      icon: FileText,
      color: "text-amber-500",
    },
    {
      label: "Outstanding",
      value: formatCurrency(stats.outstandingInvoices),
      icon: DollarSign,
      color: "text-destructive",
      isAmount: true,
    },
    {
      label: "Total Revenue",
      value: formatCurrency(stats.totalRevenue),
      icon: TrendingUp,
      color: "text-primary",
      isAmount: true,
    },
    {
      label: "Paid Revenue",
      value: formatCurrency(stats.paidRevenue),
      icon: DollarSign,
      color: "text-green-500",
      isAmount: true,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Business Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your business operations
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <p className="text-muted-foreground">
          Activity feed coming soon...
        </p>
      </Card>
    </div>
  );
}
