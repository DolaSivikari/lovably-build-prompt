import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Quote, Star } from "lucide-react";
import SEO from "./SEO";
import { reviewSchema } from "@/utils/structured-data";
import { supabase } from "@/integrations/supabase/client";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data } = await supabase
        .from('testimonials')
        .select('*')
        .eq('publish_state', 'published')
        .eq('is_featured', true)
        .order('display_order')
        .limit(3);
      
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

  // Generate review schemas with service context and publisher
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

  return (
    <>
      <SEO structuredData={reviewSchemas} />
      <section className="py-20 md:py-24 bg-muted/30">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl">
          
          {/* Section Header - Enterprise Style */}
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Client Testimonials
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Trusted partnerships built on exceptional results, reliable execution, and proven expertise across Ontario.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => {
              const fullStars = Math.floor(testimonial.rating);
              
              return (
                <Card 
                  key={testimonial.author} 
                  className="relative border-border hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300"
                >
                  <CardContent className="p-8">
                    
                    {/* Quote Icon with Steel Blue */}
                    <div className="mb-6">
                      <div className="w-12 h-12 rounded-lg bg-steel-blue/10 flex items-center justify-center">
                        <Quote className="h-6 w-6 text-steel-blue" />
                      </div>
                    </div>

                    {/* Star Rating */}
                    <div className="flex mb-6">
                      {[...Array(fullStars)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-steel-blue text-steel-blue" />
                      ))}
                    </div>

                    {/* Quote Text */}
                    <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                      "{testimonial.quote}"
                    </p>

                    {/* Author Info */}
                    <div className="pt-6 border-t border-border">
                      <p className="font-bold text-foreground mb-1">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-muted-foreground mb-2">
                        {testimonial.position}
                      </p>
                      <p className="text-sm font-semibold text-steel-blue">
                        {testimonial.company}
                      </p>
                      {testimonial.project && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Project: {testimonial.project}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
