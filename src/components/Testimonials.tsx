import { Card, CardContent } from "./ui/card";
import { Quote } from "lucide-react";
import SEO from "./SEO";
import { reviewSchema } from "@/utils/structured-data";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Our 200-space parking garage restoration came out beautifully. Ascent handled everything from concrete repair to waterproofing, and we haven't had a single leak since.",
      author: "Robert Chang",
      position: "Property Manager",
      company: "Skyline Properties",
      rating: 5,
      date: "2024-09-15",
      project: "Parking Garage Restoration"
    },
    {
      quote: "They painted our entire 24-unit condo building in just under 3 weeks. Great crew, fair price, and the exterior looks fantastic. Would definitely hire again.",
      author: "Maria Santos",
      position: "Condo Board President",
      company: "Lakeview Condominiums",
      rating: 5,
      date: "2024-08-22",
      project: "Exterior Condo Painting"
    },
    {
      quote: "Professional team that understood our tight timeline. The warehouse floor coating was done over a weekend with zero disruption to our operations.",
      author: "Jennifer Foster",
      position: "Facility Director",
      company: "Metro Distribution",
      rating: 4.5,
      date: "2024-07-10",
      project: "Warehouse Flooring"
    },
  ];

  // Generate review schemas
  const reviewSchemas = testimonials.map(t => 
    reviewSchema({
      author: t.author,
      reviewRating: t.rating,
      reviewBody: t.quote,
      datePublished: t.date,
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
