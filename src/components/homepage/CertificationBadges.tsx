import { useEffect, useState } from "react";
import { Shield, Award, CheckCircle2, FileCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap: Record<string, any> = {
  Shield,
  Award,
  CheckCircle2,
  FileCheck,
};

const categoryIconFallback: Record<string, any> = {
  certification: Shield,
  award: Award,
  membership: CheckCircle2,
  accreditation: FileCheck,
};

const CertificationBadges = () => {
  const [certifications, setCertifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const { data, error } = await supabase
          .from("awards_certifications")
          .select("*")
          .eq("is_active", true)
          .eq("show_on_homepage", true)
          .or("expiry_date.is.null,expiry_date.gt." + new Date().toISOString())
          .order("display_order", { ascending: true });

        if (error) throw error;

        const formattedCerts = (data || []).map((cert: any) => {
          const Icon =
            iconMap[cert.icon_name] ||
            categoryIconFallback[cert.category] ||
            Shield;
          return {
            icon: Icon,
            title: cert.title,
            description: cert.issuing_organization,
            color: "text-accent",
            badgeImage: cert.badge_image_url,
          };
        });

        setCertifications(formattedCerts);
      } catch (error) {
        console.error("Error fetching certifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Skeleton className="h-8 w-48 mx-auto mb-2" />
            <Skeleton className="h-5 w-64 mx-auto" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center p-6">
                <Skeleton className="w-20 h-20 rounded-full mb-4" />
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-40" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (certifications.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Certified & Trusted
          </h2>
          <p className="text-muted-foreground">
            Industry-leading credentials and memberships
          </p>
        </div>

        <div
          className={`grid grid-cols-2 ${certifications.length > 4 ? "lg:grid-cols-4" : "lg:grid-cols-" + certifications.length} gap-6 max-w-5xl mx-auto`}
        >
          {certifications.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-lg bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <div className="p-4 rounded-full bg-accent/10 border border-accent/20 mb-4">
                  {cert.badgeImage ? (
                    <img
                      src={cert.badgeImage}
                      alt={cert.title}
                      className="w-8 h-8 object-contain"
                    />
                  ) : (
                    <Icon className={`w-8 h-8 ${cert.color}`} />
                  )}
                </div>
                <h3 className="font-bold text-foreground mb-1">{cert.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {cert.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CertificationBadges;
