import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import SEO from "./SEO";
import { reviewSchema } from "@/utils/structured-data";

const SocialProof = () => {
  const averageRating = 4.9;
  const totalReviews = 127;

  // Generate aggregate rating schema
  const aggregateRatingSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Ascent Group Construction",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: averageRating.toString(),
      reviewCount: totalReviews.toString(),
      bestRating: "5",
      worstRating: "1"
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
    },
    {
      quote: "The team's attention to detail and commitment to safety made all the difference. They turned our vision into reality while maintaining the highest standards.",
      author: "Michael Chen",
      position: "VP Operations",
      company: "Manufacturing Corp",
      rating: 5,
      date: "2024-08-22",
    },
    {
      quote: "Working with Ascent Group Construction on our healthcare facility was seamless. Their use of BIM technology prevented costly delays and ensured quality outcomes.",
      author: "Dr. Jennifer Martinez",
      position: "Medical Director",
      company: "Regional Health Authority",
      rating: 5,
      date: "2024-07-10",
    },
  ];

  // Generate review schemas for testimonials
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
      <SEO structuredData={[aggregateRatingSchema, ...reviewSchemas]} />
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header with Google Rating */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                What Our Clients Say
              </h2>
              <div className="flex items-center justify-center gap-2 mb-2">
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
              <p className="text-muted-foreground">
                Based on {totalReviews} Google reviews
              </p>
            </div>

            {/* Google Reviews Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {googleReviews.map((review, idx) => (
                <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
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
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {review.text}
                  </p>
                </Card>
              ))}
            </div>

            {/* Featured Testimonials */}
            <div className="border-t border-border pt-12">
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
                Featured Client Stories
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <Card 
                    key={testimonial.author} 
                    className="relative animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="pt-6">
                      <Quote className="h-8 w-8 text-primary mb-4" />
                      <p className="text-base mb-6 italic">"{testimonial.quote}"</p>
                      <div className="border-t pt-4">
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Google Link */}
            <div className="text-center mt-8">
              <a
                href="https://g.page/r/YOUR_GOOGLE_PLACE_ID/review"
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
        </div>
      </section>
    </>
  );
};

export default SocialProof;
