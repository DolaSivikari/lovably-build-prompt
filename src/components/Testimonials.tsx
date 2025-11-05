import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { Quote, Star } from "lucide-react";
import SEO from "./SEO";
import { reviewSchema } from "@/utils/structured-data";
import { supabase } from "@/integrations/supabase/client";
import { calculateISODate, inferServiceFromReview, getConsistentAggregateRating } from "@/utils/review-helpers";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  const aggregateRating = getConsistentAggregateRating();
  const averageRating = parseFloat(aggregateRating.ratingValue);
  const totalReviews = parseInt(aggregateRating.reviewCount);

  // Google Reviews
  const googleReviews = [
    {
      author: "John Mitchell",
      rating: 5,
      text: "Exceptional work on our office renovation. The team was professional, punctual, and delivered beyond expectations. Highly recommend!",
      date: "2 weeks ago",
      avatar: "JM"
    },
    {
      author: "Sarah Chen",
      rating: 5,
      text: "Outstanding service from start to finish. They transformed our condo building's exterior. Great communication throughout the project.",
      date: "1 month ago",
      avatar: "SC"
    },
    {
      author: "Michael Rodriguez",
      rating: 5,
      text: "Best construction company in the GTA. Quality workmanship, fair pricing, and they completed the project on time. Will use again!",
      date: "1 month ago",
      avatar: "MR"
    },
  ];

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

  // Generate review schemas for Google reviews
  const googleReviewSchemas = googleReviews.map(review => {
    const service = inferServiceFromReview(review.text);
    return reviewSchema({
      author: review.author,
      reviewRating: review.rating,
      reviewBody: review.text,
      datePublished: calculateISODate(review.date),
      itemReviewed: {
        name: service.name,
        type: service.type
      },
      publisher: {
        name: "Google",
        type: "Organization"
      }
    });
  });

  // Generate review schemas for testimonials
  const testimonialSchemas = testimonials.map(t => 
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
      <SEO structuredData={[...googleReviewSchemas, ...testimonialSchemas]} />
      <section ref={sectionRef} className="py-20 md:py-24 bg-muted/30">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl">
          
          {/* Section Header with Google Rating */}
          <div className="max-w-3xl mb-16 text-center mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              What Our Clients Say
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-6 w-6 ${
                      star <= Math.floor(averageRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-2xl font-bold text-foreground">
                {averageRating}
              </span>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Based on {totalReviews} Google reviews — Trusted partnerships built on exceptional results, reliable execution, and proven expertise across Ontario.
            </p>
          </div>

          {/* Google Reviews Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {googleReviews.map((review, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                      {review.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">
                        {review.author}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {review.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {review.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Featured Client Stories */}
          {testimonials.length > 0 && (
            <div className="border-t border-border pt-16">
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
                Featured Client Stories
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => {
                  const fullStars = Math.floor(testimonial.rating);
                  
                  return (
                    <Card 
                      key={testimonial.author} 
                      className="relative border-border hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300"
                    >
                      <CardContent className="p-8">
                        
                        {/* Quote Icon */}
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
          )}

          {/* Google Link */}
          <div className="text-center mt-12">
            <a
              href="https://g.page/r/CdXlZgT9HqKhEAI/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
              </svg>
              Read more reviews on Google
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
