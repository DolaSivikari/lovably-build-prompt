import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Briefcase, Users, ClipboardList, DollarSign, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    { label: "New Project", icon: Briefcase, path: "/admin/projects/new", color: "text-[hsl(var(--sage))]" },
    { label: "Daily Report", icon: ClipboardList, path: "/admin/projects", color: "text-[hsl(var(--terracotta))]" },
    { label: "Add Expense", icon: DollarSign, path: "/admin/projects", color: "text-blue-600" },
    { label: "Assign Task", icon: Users, path: "/admin/projects", color: "text-purple-600" },
    { label: "Blog Post", icon: FileText, path: "/admin/blog/new", color: "text-green-600" },
    { label: "Schedule", icon: Calendar, path: "/admin/projects", color: "text-orange-600" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              className="justify-start h-auto py-4 hover:bg-[hsl(var(--cream))] hover:border-[hsl(var(--sage))] transition-all"
              onClick={() => navigate(action.path)}
            >
              <action.icon className={`h-5 w-5 mr-3 ${action.color}`} />
              <span className="text-sm font-medium">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
