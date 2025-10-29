import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const Services = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isLoading: authLoading, isAdmin } = useAdminAuth();
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) return;
    loadServices();
  }, [isAdmin]);

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

  if (authLoading) {
    return null;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 className="business-page-title">Services</h1>
          <p className="business-page-subtitle">Manage your service offerings</p>
        </div>
        <button className="business-btn business-btn-primary" onClick={() => navigate("/admin/services/new")}>
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </button>
      </div>

      <div>
        {isLoading ? (
          <div className="text-center py-12" style={{ color: 'var(--business-text-secondary)' }}>Loading services...</div>
        ) : services.length === 0 ? (
          <div className="business-glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--business-text-secondary)', marginBottom: '1rem' }}>
              No services yet. Create your first service to get started.
            </p>
            <button className="business-btn business-btn-primary" onClick={() => navigate("/admin/services/new")}>
              <Plus className="h-4 w-4 mr-2" />
              Create Service
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {services.map((service) => (
              <div key={service.id} className="business-glass-card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                      <h3 style={{ 
                        fontSize: '1.25rem', 
                        fontWeight: '700', 
                        color: 'var(--business-text-primary)'
                      }}>
                        {service.name}
                      </h3>
                      <Badge variant={getStatusColor(service.publish_state)}>
                        {service.publish_state}
                      </Badge>
                    </div>
                    <p style={{ 
                      fontSize: '0.875rem', 
                      color: 'var(--business-text-secondary)',
                      marginBottom: '1rem'
                    }}>
                      {service.short_description}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                      className="business-btn business-btn-ghost"
                      style={{ padding: '0.5rem' }}
                      onClick={() => navigate(`/admin/services/${service.id}`)}
                      aria-label={`Edit ${service.name}`}
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      className="business-btn business-btn-ghost"
                      style={{ padding: '0.5rem' }}
                      onClick={() => handleDelete(service.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div style={{ 
                  display: 'flex', 
                  gap: '1rem', 
                  fontSize: '0.875rem', 
                  color: 'var(--business-text-secondary)'
                }}>
                  {service.pricing_range_min && service.pricing_range_max && (
                    <span>
                      Price: ${service.pricing_range_min} - ${service.pricing_range_max}
                    </span>
                  )}
                  {service.estimated_timeline && (
                    <span>Timeline: {service.estimated_timeline}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
