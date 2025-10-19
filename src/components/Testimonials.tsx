import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Quote } from "lucide-react";
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
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold mb-2">Featured Client Stories</h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Real projects, real results from property managers and building owners across the GTA
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((testimonial, index) => {
            const fullStars = Math.floor(testimonial.rating);
            const hasHalfStar = testimonial.rating % 1 !== 0;
            
            return (
              <Card 
                key={testimonial.author} 
                className="relative animate-fade-in hover:shadow-lg transition-shadow"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <Quote className="h-5 w-5 text-primary flex-shrink-0" />
                    <div className="flex">
                      {[...Array(fullStars)].map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                      {hasHalfStar && <span className="text-yellow-400">⯨</span>}
                    </div>
                  </div>
                  <p className="text-sm mb-4 leading-relaxed">"{testimonial.quote}"</p>
                  <div className="border-t pt-3">
                    <p className="font-semibold text-sm">{testimonial.author}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.position}, {testimonial.company}</p>
                    <p className="text-xs text-primary mt-1">{testimonial.project}</p>
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
