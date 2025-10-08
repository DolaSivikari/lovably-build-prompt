import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone, CheckCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Service {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  long_description: string | null;
  icon_name: string | null;
  featured_image: string | null;
  pricing_range_min: number | null;
  pricing_range_max: number | null;
  estimated_timeline: string | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string[] | null;
}

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    loadService();
  }, [slug]);

  const loadService = async () => {
    if (!slug) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .eq('publish_state', 'published')
      .single();

    if (error || !data) {
      setNotFound(true);
    } else {
      setService(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="container mx-auto px-4 py-32">
          <div className="max-w-4xl mx-auto space-y-8">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-64 w-full" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (notFound || !service) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="min-h-screen">
      <SEO
        title={service.seo_title || service.name}
        description={service.seo_description || service.short_description || ""}
        keywords={service.seo_keywords?.join(", ") || ""}
      />
      <Navigation />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{service.name}</h1>
              {service.short_description && (
                <p className="text-xl opacity-90">{service.short_description}</p>
              )}
            </div>
          </div>
        </section>

        {/* Service Details */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {service.featured_image && (
                <img 
                  src={service.featured_image} 
                  alt={service.name}
                  className="w-full rounded-lg shadow-xl mb-12"
                />
              )}

              {service.long_description && (
                <div className="prose prose-lg max-w-none mb-12">
                  <div dangerouslySetInnerHTML={{ __html: service.long_description }} />
                </div>
              )}

              {/* Pricing & Timeline */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {(service.pricing_range_min || service.pricing_range_max) && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">Pricing Range</h3>
                      <p className="text-3xl font-bold text-primary">
                        ${service.pricing_range_min?.toLocaleString()} - ${service.pricing_range_max?.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        *Final pricing depends on project scope and specifications
                      </p>
                    </CardContent>
                  </Card>
                )}

                {service.estimated_timeline && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">Timeline</h3>
                      <p className="text-3xl font-bold text-primary">
                        {service.estimated_timeline}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Estimated completion time for typical projects
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* What's Included */}
              <Card className="mb-12">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">What's Included</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      "Professional consultation",
                      "Detailed project estimate",
                      "Quality materials",
                      "Expert installation",
                      "Site preparation & cleanup",
                      "Comprehensive warranty"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* CTA */}
              <div className="text-center bg-gradient-to-br from-primary to-primary/80 text-white rounded-lg p-12">
                <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
                <p className="text-xl mb-8 opacity-90">
                  Get a free, no-obligation estimate for your project
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" asChild>
                    <Link to="/estimate">
                      Get Free Estimate
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
                    <Link to="/contact">
                      <Phone className="mr-2 w-5 h-5" />
                      Contact Us
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServiceDetail;
