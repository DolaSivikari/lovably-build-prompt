import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/ui/Button";
import { Search, ArrowRight, Database, AlertTriangle, Gauge, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

const ToolsOverview = () => {
  const tools = [
    {
      title: "SEO Dashboard",
      description: "Meta tags, sitemaps, and search engine optimization",
      icon: Search,
      link: "/admin/seo-dashboard",
      badge: "Essential",
      status: null,
    },
    {
      title: "Redirects Manager",
      description: "Manage URL redirects and prevent broken links",
      icon: ArrowRight,
      link: "/admin/redirects",
      badge: null,
      status: null,
    },
    {
      title: "Structured Data",
      description: "Schema markup for better search results",
      icon: Database,
      link: "/admin/structured-data",
      badge: null,
      status: null,
    },
    {
      title: "Content Health Check",
      description: "Find issues with SEO, images, and content quality",
      icon: AlertTriangle,
      link: "/admin/seo-dashboard?tab=health",
      badge: "Recommended",
      status: null,
    },
    {
      title: "Performance Dashboard",
      description: "Monitor site speed and Core Web Vitals",
      icon: Gauge,
      link: "/admin/performance-dashboard",
      badge: null,
      status: null,
    },
    {
      title: "Search Analytics",
      description: "User search queries and content discovery insights",
      icon: Search,
      link: "/admin/search-analytics",
      badge: "Insights",
      status: null,
    },
    {
      title: "Settings Health Check",
      description: "Scan for hardcoded values and configuration issues",
      icon: Wrench,
      link: "/admin/settings-health",
      badge: "Maintenance",
      status: null,
    },
    {
      title: "Navigation Migration",
      description: "One-time utility to import legacy navigation data",
      icon: Database,
      link: "/admin/navigation-migration",
      badge: "Setup",
      status: null,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tools</h1>
        <p className="text-muted-foreground mt-2">
          SEO optimization, performance monitoring, and site maintenance tools
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Card key={tool.title} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <tool.icon className="h-6 w-6 text-primary" />
                </div>
                {tool.badge && (
                  <span className="text-xs font-medium px-2 py-1 bg-primary/20 text-primary rounded-full">
                    {tool.badge}
                  </span>
                )}
              </div>
              <CardTitle>{tool.title}</CardTitle>
              <CardDescription>{tool.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {tool.status && (
                <p className="text-sm text-muted-foreground">{tool.status}</p>
              )}
              <Link to={tool.link}>
                <Button className="w-full">
                  Open {tool.title}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-primary">Maintenance Checklist</CardTitle>
          <CardDescription>Regular tasks to keep your site healthy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-primary font-bold">✓</span>
            <p>Run Content Health Check monthly to find SEO issues</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-primary font-bold">✓</span>
            <p>Review Performance Dashboard after major updates</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-primary font-bold">✓</span>
            <p>Keep redirects updated when changing URLs</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-primary font-bold">✓</span>
            <p>Update structured data for new content types</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ToolsOverview;
