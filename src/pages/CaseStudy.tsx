import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Clock, Ruler, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ContentPageHeader from "@/components/ContentPageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import OptimizedImage from "@/components/OptimizedImage";
import { InteractiveLightbox } from "@/components/InteractiveLightbox";
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
  const { slug } = useParams<{ slug: string }>();
  const { isPreview } = usePreviewMode();
  const [caseStudy, setCaseStudy] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchCaseStudy = async () => {
      if (!slug) return;
      
      setIsLoading(true);
      const query = supabase
        .from("projects")
        .select("*")
        .eq("slug", slug);
      
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
  }, [slug, isPreview]);

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

  // Build complete gallery for lightbox
  const allGalleryImages = [
    ...(caseStudy?.before_images || []).map((img: any) => ({
      src: resolveAssetPath(img.url) || img.url,
      alt: img.alt,
      caption: img.caption,
    })),
    ...(caseStudy?.content_blocks || [])
      .filter((step: any) => step.image_url)
      .map((step: any) => ({
        src: resolveAssetPath(step.image_url) || step.image_url,
        alt: step.image_alt || step.title,
        caption: step.title,
      })),
    ...(caseStudy?.after_images || []).map((img: any) => ({
      src: resolveAssetPath(img.url) || img.url,
      alt: img.alt,
      caption: img.caption,
    })),
  ];

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  // Get FAQs for this case study
  const faqs = caseStudyFAQs[slug || ''] || [];
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
      { name: caseStudy.title, url: `/case-study/${slug}` },
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
        <ContentPageHeader
          title={caseStudy.title}
          subtitle={`${caseStudy.category} · ${caseStudy.location} · ${caseStudy.duration || "Various timeline"}`}
          imageUrl={resolveAssetPath(caseStudy.featured_image) || caseStudy.featured_image || '/placeholder.svg'}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Projects", href: "/projects" },
            { label: caseStudy.title }
          ]}
        />

        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Project Story */}
              {caseStudy.description && (
                <section>
                  <h2 className="text-3xl font-bold mb-4">Project Story</h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {caseStudy.description}
                    </p>
                  </div>
                </section>
              )}

              {/* Before Images */}
              {caseStudy.before_images && caseStudy.before_images.length > 0 && (
                <section>
                  <h2 className="text-3xl font-bold mb-6">Before Renovation</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {caseStudy.before_images.map((image: any, idx: number) => (
                      <div 
                        key={idx} 
                        className="cursor-pointer group relative overflow-hidden rounded-lg"
                        onClick={() => openLightbox(idx)}
                      >
                        <OptimizedImage
                          src={resolveAssetPath(image.url) || image.url}
                          alt={image.alt}
                          width={800}
                          height={600}
                          className="w-full h-full hover:scale-110 transition-transform duration-500"
                          objectFit="cover"
                        />
                        {image.caption && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                            {image.caption}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Process Steps Timeline */}
              {caseStudy.content_blocks && caseStudy.content_blocks.length > 0 && (
                <section>
                  <h2 className="text-3xl font-bold mb-8">Project Process</h2>
                  <div className="space-y-12">
                    {caseStudy.content_blocks.map((step: any, idx: number) => (
                      <div key={idx} className="relative">
                        {/* Timeline connector */}
                        {idx < caseStudy.content_blocks.length - 1 && (
                          <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-primary/20" />
                        )}

                        <div className="flex gap-6">
                          {/* Step number badge */}
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold z-10 relative shadow-lg">
                              {step.step_number || idx + 1}
                            </div>
                          </div>

                          {/* Step content */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <h3 className="text-2xl font-semibold">{step.title}</h3>
                              {step.duration && (
                                <Badge variant="secondary" className="ml-4">
                                  {step.duration}
                                </Badge>
                              )}
                            </div>
                            <p className="text-muted-foreground mb-4 leading-relaxed whitespace-pre-wrap">
                              {step.description}
                            </p>
                            {step.image_url && (
                              <div 
                                className="rounded-lg overflow-hidden cursor-pointer max-w-2xl group relative"
                                onClick={() => openLightbox(
                                  caseStudy.before_images.length + idx
                                )}
                              >
                                <OptimizedImage
                                  src={resolveAssetPath(step.image_url) || step.image_url}
                                  alt={step.image_alt || step.title}
                                  width={800}
                                  height={600}
                                  className="hover:scale-105 transition-transform duration-500"
                                  objectFit="cover"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* After Images */}
              {caseStudy.after_images && caseStudy.after_images.length > 0 && (
                <section>
                  <h2 className="text-3xl font-bold mb-6">Final Results</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {caseStudy.after_images.map((image: any, idx: number) => (
                      <div 
                        key={idx} 
                        className="cursor-pointer group relative overflow-hidden rounded-lg"
                        onClick={() => openLightbox(
                          caseStudy.before_images.length + 
                          caseStudy.content_blocks.filter((s: any) => s.image_url).length + 
                          idx
                        )}
                      >
                        <OptimizedImage
                          src={resolveAssetPath(image.url) || image.url}
                          alt={image.alt}
                          width={800}
                          height={600}
                          className="w-full h-full hover:scale-110 transition-transform duration-500"
                          objectFit="cover"
                        />
                        {image.caption && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                            {image.caption}
                          </div>
                        )}
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

        {/* Interactive Gallery Lightbox */}
        <InteractiveLightbox
          images={allGalleryImages}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          initialIndex={selectedImageIndex}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default CaseStudy;
