import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import SEO from "./SEO";
import { reviewSchema } from "@/utils/structured-data";
import { calculateISODate, inferServiceFromReview, getConsistentAggregateRating } from "@/utils/review-helpers";
import { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const SocialProof = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  const aggregateRating = getConsistentAggregateRating();
  const averageRating = parseFloat(aggregateRating.ratingValue);
  const totalReviews = parseInt(aggregateRating.reviewCount);

  // Generate aggregate rating schema
  const aggregateRatingSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Ascent Group Construction",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: aggregateRating.ratingValue,
      reviewCount: aggregateRating.reviewCount,
      bestRating: aggregateRating.bestRating,
      worstRating: aggregateRating.worstRating
    }
  };

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

  // Client Testimonials
  const testimonials = [
    {
      quote: "Ascent Group Construction delivered our office tower project ahead of schedule and under budget. Their professionalism and expertise are unmatched in the industry.",
      author: "Sarah Thompson",
      position: "CEO, Thompson Properties",
      company: "Commercial Real Estate",
      rating: 5,
      date: "2024-09-15",
      project: "Office Tower Renovation"
    },
    {
      quote: "The team's attention to detail and commitment to safety made all the difference. They turned our vision into reality while maintaining the highest standards.",
      author: "Michael Chen",
      position: "VP Operations",
      company: "Manufacturing Corp",
      rating: 5,
      date: "2024-08-22",
      project: "Industrial Facility"
    },
    {
      quote: "Working with Ascent Group Construction on our healthcare facility was seamless. Their use of BIM technology prevented costly delays and ensured quality outcomes.",
      author: "Dr. Jennifer Martinez",
      position: "Medical Director",
      company: "Regional Health Authority",
      rating: 5,
      date: "2024-07-10",
      project: "Healthcare Facility Construction"
    },
  ];

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

  // Generate review schemas for testimonials with service context
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
      <SEO structuredData={[aggregateRatingSchema, ...testimonialSchemas]} />
      <section ref={sectionRef} className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Client Outcomes
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Construction partnerships delivering measurable results
              </p>
            </div>

            {/* Client Testimonials */}
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.author} className="border-2 hover:border-primary/50 hover:shadow-lg transition-all">
                  <CardContent className="p-8">
                    <Quote className="h-8 w-8 text-primary mb-4" />
                    <p className="text-base mb-6 leading-relaxed">"{testimonial.quote}"</p>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-foreground">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SocialProof;
