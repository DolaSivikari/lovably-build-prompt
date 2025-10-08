import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { 
  Paintbrush,
  Building2,
  Building,
  Home,
  DoorOpen,
  Layers,
  Shield,
  Square
} from "lucide-react";

const iconMap: Record<string, any> = {
  PaintBrush: Paintbrush,
  Building2,
  Building,
  Home,
  DoorOpen,
  Layers,
  Shield,
  Square,
};

interface Service {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  icon_name: string | null;
}

const ServicesPreview = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const { data } = await supabase
      .from('services')
      .select('id, name, slug, short_description, icon_name')
      .eq('publish_state', 'published')
      .order('created_at', { ascending: true })
      .limit(6);

    if (data) {
      setServices(data);
    }
  };

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Construction Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert painting, exterior systems, and specialty construction for residential and commercial properties
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {services.map((service, index) => {
            const Icon = service.icon_name ? iconMap[service.icon_name] : Building2;
            return (
              <Card 
                key={service.id} 
                className="hover:shadow-lg transition-shadow animate-fade-in border-l-4 border-l-primary"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  {Icon && <Icon className="h-10 w-10 text-primary mb-3" />}
                  <CardTitle className="text-xl">{service.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.short_description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button size="lg" asChild>
            <Link to="/services">Explore All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
