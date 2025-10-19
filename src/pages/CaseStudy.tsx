import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Clock, Ruler, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import OptimizedImage from "@/components/OptimizedImage";
import { projectSchema, breadcrumbSchema, faqSchema } from "@/utils/structured-data";
import { caseStudyFAQs } from "@/data/case-study-faq-data";
import { resolveAssetPath } from "@/utils/assetResolver";
import { usePreviewMode } from "@/hooks/usePreviewMode";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CaseStudy = () => {
  const { id } = useParams<{ id: string }>();
  const { isPreview } = usePreviewMode();
  const [caseStudy, setCaseStudy] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudy = async () => {
      if (!id) return;
      
      setIsLoading(true);
      const query = supabase
        .from("projects")
        .select("*")
        .eq("slug", id);
      
      // Only filter by publish_state if NOT in preview mode
      if (!isPreview) {
        query.eq("publish_state", "published");
      }
      
      const { data, error } = await query.maybeSingle();
      
      if (!error && data) {
        setCaseStudy(data);
      }
      setIsLoading(false);
    };
    
    fetchCaseStudy();
  }, [id, isPreview]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Loading case study...</p>
        </div>
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Case Study Not Found</h1>
          <Link to="/projects">
            <Button>Back to Projects</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get FAQs for this case study
  const faqs = caseStudyFAQs[id || ''] || [];
  const schemas: any[] = [
    {
      "@context": "https://schema.org",
      "@type": "Project",
      name: caseStudy.title,
      description: caseStudy.description || caseStudy.summary,
      category: caseStudy.category,
      location: {
        "@type": "Place",
        name: caseStudy.location,
      },
      startDate: caseStudy.start_date,
      endDate: caseStudy.completion_date,
      image: caseStudy.featured_image,
      contractor: {
        "@type": "Organization",
        name: "Ascent Group Construction",
      },
    },
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Projects", url: "/projects" },
      { name: caseStudy.title, url: `/case-study/${id}` },
    ]),
  ];

  if (faqs.length > 0) {
    schemas.push(faqSchema(faqs));
  }

  return (
    <div className="min-h-screen">
      <SEO
        title={caseStudy.seo_title || caseStudy.title}
        description={caseStudy.seo_description || caseStudy.description || caseStudy.summary}
        keywords={caseStudy.seo_keywords?.join(', ') || `${caseStudy.category}, case study, ${caseStudy.location}, construction project`}
        structuredData={schemas}
      />
      <Navigation />
      
      {isPreview && (
        <div className="bg-yellow-500 text-black text-center py-2 font-semibold">
          🔍 PREVIEW MODE - This is a draft case study
        </div>
      )}
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[500px]">
          <OptimizedImage
            src={resolveAssetPath(caseStudy.featured_image) || caseStudy.featured_image || '/placeholder.svg'}
            alt={`${caseStudy.title} - ${caseStudy.category} project completed in ${caseStudy.location}`}
            priority={true}
            width={1920}
            height={1080}
            className="w-full h-full"
            objectFit="cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 pb-12">
              <Link to="/projects" className="inline-flex items-center gap-2 text-white mb-6 hover:gap-3 transition-all">
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
              </Link>
              <Badge className="mb-4 bg-secondary text-primary">{caseStudy.category}</Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                {caseStudy.title}
              </h1>
              <div className="flex flex-wrap gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{caseStudy.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{caseStudy.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{caseStudy.duration || "Various timeline"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Ruler className="w-5 h-5" />
                  <span>{caseStudy.project_size || "Various scope"}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              {caseStudy.description && (
                <section>
                  <h2 className="text-3xl font-bold mb-4">Project Overview</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {caseStudy.description}
                  </p>
                </section>
              )}

              {/* Process Notes */}
              {caseStudy.process_notes && (
                <section>
                  <h2 className="text-3xl font-bold mb-4">Our Approach</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {caseStudy.process_notes}
                  </p>
                </section>
              )}

              {/* Gallery */}
              {caseStudy.gallery && Array.isArray(caseStudy.gallery) && caseStudy.gallery.length > 0 && (
                <section>
                  <h2 className="text-3xl font-bold mb-6">Project Gallery</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {caseStudy.gallery.map((image: any, index: number) => (
                      <div key={index} className="aspect-video overflow-hidden rounded-lg">
                        <OptimizedImage
                          src={resolveAssetPath(image.url || image) || image.url || image}
                          alt={`${caseStudy.title} project detail ${index + 1}`}
                          width={800}
                          height={600}
                          className="w-full h-full hover:scale-110 transition-transform duration-500"
                          objectFit="cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">Project Information</h3>
                  <div className="space-y-3 text-sm">
                    {caseStudy.location && (
                      <div>
                        <p className="text-muted-foreground">Location</p>
                        <p className="font-semibold">{caseStudy.location}</p>
                      </div>
                    )}
                    {caseStudy.duration && (
                      <div>
                        <p className="text-muted-foreground">Duration</p>
                        <p className="font-semibold">{caseStudy.duration}</p>
                      </div>
                    )}
                    {caseStudy.project_size && (
                      <div>
                        <p className="text-muted-foreground">Project Size</p>
                        <p className="font-semibold">{caseStudy.project_size}</p>
                      </div>
                    )}
                    {caseStudy.budget_range && (
                      <div>
                        <p className="text-muted-foreground">Budget Range</p>
                        <p className="font-semibold">{caseStudy.budget_range}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* CTA */}
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-6 text-center">
                  <h3 className="font-bold text-lg mb-2">Start Your Project</h3>
                  <p className="text-sm mb-4 opacity-90">
                    Ready for similar results? Get your free estimate today.
                  </p>
                  <Link to="/estimate">
                    <Button variant="secondary" className="w-full">
                      Get Free Estimate
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          {faqs.length > 0 && (
            <div className="mt-16 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Project FAQs</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CaseStudy;
