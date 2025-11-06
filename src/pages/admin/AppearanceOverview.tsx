import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/ui/Button";
import { Home, Menu, Info, Phone, Layout } from "lucide-react";
import { Link } from "react-router-dom";

const AppearanceOverview = () => {
  const appearanceAreas = [
    {
      title: "Homepage Builder",
      description: "Hero slides, company overview, and landing menu",
      icon: Home,
      link: "/admin/homepage-builder",
      preview: "Manage all homepage visual elements",
    },
    {
      title: "Navigation Menus",
      description: "Main navigation, mega menus, and mobile menu",
      icon: Menu,
      link: "/admin/navigation-builder",
      preview: "Build and organize site navigation",
    },
    {
      title: "Footer Settings",
      description: "Footer links, contact info, and social media",
      icon: Layout,
      link: "/admin/footer-settings",
      preview: "Configure footer content and layout",
    },
    {
      title: "About Page",
      description: "About page hero, stats, and content sections",
      icon: Info,
      link: "/admin/about-page",
      preview: "Edit About page settings",
    },
    {
      title: "Contact Page",
      description: "Contact information, map, and business hours",
      icon: Phone,
      link: "/admin/contact-page-settings",
      preview: "Manage contact page details",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Appearance</h1>
        <p className="text-muted-foreground mt-2">
          Control how your website looks and feels - manage visual elements and page layouts
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {appearanceAreas.map((area) => (
          <Card key={area.title} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <area.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <CardTitle>{area.title}</CardTitle>
              <CardDescription>{area.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground mb-4">{area.preview}</p>
              <Link to={area.link}>
                <Button className="w-full">
                  Edit {area.title}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle>Quick Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>• Use <strong>Homepage Builder</strong> to update the first impression visitors get</p>
          <p>• Keep <strong>Navigation</strong> simple and organized for better user experience</p>
          <p>• Update <strong>Footer</strong> links regularly to match your content structure</p>
          <p>• Ensure <strong>Contact</strong> information is always current and accurate</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppearanceOverview;
