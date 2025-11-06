import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/ui/Button";
import { Plus, FileText, Briefcase, Newspaper, Star, Trophy, Users, FileImage } from "lucide-react";
import { Link } from "react-router-dom";

const ContentOverview = () => {
  const { data: servicesCount } = useQuery({
    queryKey: ["services-count"],
    queryFn: async () => {
      const { count } = await supabase
        .from("services")
        .select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: projectsCount } = useQuery({
    queryKey: ["projects-count"],
    queryFn: async () => {
      const { count } = await supabase
        .from("projects")
        .select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: blogCount } = useQuery({
    queryKey: ["blog-count"],
    queryFn: async () => {
      const { count } = await supabase
        .from("blog_posts")
        .select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: testimonialsCount } = useQuery({
    queryKey: ["testimonials-count"],
    queryFn: async () => {
      const { count } = await supabase
        .from("testimonials")
        .select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const contentTypes = [
    {
      title: "Services",
      description: "Manage your service offerings",
      icon: FileText,
      count: servicesCount,
      createLink: "/admin/services",
      viewLink: "/admin/services",
    },
    {
      title: "Projects",
      description: "Portfolio projects and case studies",
      icon: Briefcase,
      count: projectsCount,
      createLink: "/admin/projects",
      viewLink: "/admin/projects",
    },
    {
      title: "Blog Posts",
      description: "Articles and company news",
      icon: Newspaper,
      count: blogCount,
      createLink: "/admin/blog/new",
      viewLink: "/admin/blog",
    },
    {
      title: "Testimonials",
      description: "Client reviews and feedback",
      icon: Star,
      count: testimonialsCount,
      createLink: "/admin/testimonials",
      viewLink: "/admin/testimonials",
    },
    {
      title: "Awards",
      description: "Company awards and recognition",
      icon: Trophy,
      count: null,
      createLink: "/admin/awards",
      viewLink: "/admin/awards",
    },
    {
      title: "Leadership",
      description: "Team members and leadership",
      icon: Users,
      count: null,
      createLink: "/admin/leadership-team",
      viewLink: "/admin/leadership-team",
    },
    {
      title: "Media Library",
      description: "Images and documents",
      icon: FileImage,
      count: null,
      createLink: "/admin/media",
      viewLink: "/admin/media",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Content Management</h1>
        <p className="text-muted-foreground mt-2">
          Create and manage all your website content from one central hub
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {contentTypes.map((type) => (
          <Card key={type.title} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <type.icon className="h-8 w-8 text-primary" />
                {type.count !== null && (
                  <span className="text-2xl font-bold text-muted-foreground">
                    {type.count}
                  </span>
                )}
              </div>
              <CardTitle className="mt-4">{type.title}</CardTitle>
              <CardDescription>{type.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link to={type.viewLink}>
                <Button variant="outline" className="w-full">
                  View All
                </Button>
              </Link>
              <Link to={type.createLink}>
                <Button className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContentOverview;
