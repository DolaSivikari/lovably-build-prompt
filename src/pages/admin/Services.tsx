import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Services = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    loadServices();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    }
  };

  const loadServices = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load services",
        variant: "destructive",
      });
    } else {
      setServices(data || []);
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    const { error } = await supabase
      .from("services")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete service",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Service deleted successfully",
      });
      loadServices();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "default";
      case "draft": return "secondary";
      case "archived": return "outline";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate("/admin")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-2xl font-bold">Services</h1>
            </div>
            <Button onClick={() => navigate("/admin/services/new")}>
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center py-12">Loading services...</div>
        ) : services.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">No services yet. Create your first service to get started.</p>
              <Button onClick={() => navigate("/admin/services/new")}>
                <Plus className="h-4 w-4 mr-2" />
                Create Service
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {services.map((service) => (
              <Card key={service.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl">{service.name}</CardTitle>
                        <Badge variant={getStatusColor(service.publish_state)}>
                          {service.publish_state}
                        </Badge>
                      </div>
                      <CardDescription>{service.short_description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/admin/services/${service.id}`)}
                        aria-label={`Edit ${service.name}`}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(service.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    {service.pricing_range_min && service.pricing_range_max && (
                      <span>
                        Price: ${service.pricing_range_min} - ${service.pricing_range_max}
                      </span>
                    )}
                    {service.estimated_timeline && (
                      <span>Timeline: {service.estimated_timeline}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Services;
