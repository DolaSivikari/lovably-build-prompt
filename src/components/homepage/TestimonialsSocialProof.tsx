import { useState, useEffect, useRef } from "react";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import { reviewSchema } from "@/utils/structured-data";
import { supabase } from "@/integrations/supabase/client";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { motion } from "framer-motion";

const TestimonialsSocialProof = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data } = await supabase
        .from('testimonials')
        .select('*')
        .eq('publish_state', 'published')
        .eq('is_featured', true)
        .order('display_order')
        .limit(6);
      
      if (data) {
        const formattedData = data.map(t => ({
          quote: t.quote,
          author: t.author_name,
          position: t.author_position,
          company: t.company_name,
          rating: Number(t.rating),
          date: t.date_published,
          project: t.project_name
        }));
        setTestimonials(formattedData);
      }
    };

    fetchTestimonials();
  }, []);

  const reviewSchemas = testimonials.map(t => 
    reviewSchema({
      author: t.author,
      reviewRating: t.rating,
      reviewBody: t.quote,
      datePublished: t.date,
      itemReviewed: {
        name: t.project,
        type: "Service"
      },
      publisher: {
        name: t.company,
        type: "Organization"
      }
    })
  );

  const averageRating = testimonials.length > 0 
    ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
    : "5.0";

  return (
    <>
      <SEO structuredData={reviewSchemas} />
      <section ref={sectionRef} className="py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-1 bg-primary/10 text-primary">Client Testimonials</Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Trusted by Industry Leaders
            </h2>
            
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-7 w-7 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-3xl font-bold text-foreground">{averageRating}</span>
            </div>
            <p className="text-muted-foreground text-lg">
              Based on {testimonials.length}+ verified project reviews
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {testimonials.map((testimonial, index) => {
              const fullStars = Math.floor(testimonial.rating);
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 group">
                    <CardContent className="p-8">
                      <div className="flex items-start justify-between mb-4">
                        <Quote className="h-8 w-8 text-primary/40 flex-shrink-0" />
                        <div className="flex">
                          {[...Array(fullStars)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-base mb-6 leading-relaxed text-foreground italic">
                        "{testimonial.quote}"
                      </p>
                      
                      <div className="border-t border-border/50 pt-4">
                        <p className="font-bold text-foreground">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                        {testimonial.project && (
                          <p className="text-sm text-primary mt-2 font-medium">{testimonial.project}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Google Reviews Link */}
          <div className="text-center">
            <Button asChild size="lg" variant="outline" className="border-2 hover:border-primary shadow-lg">
              <a
                href="https://g.page/r/CdXlZgT9HqKhEAI/review"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                </svg>
                Read More Reviews on Google
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default TestimonialsSocialProof;
