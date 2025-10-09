import { Star, CheckCircle2 } from "lucide-react";
import { Card } from "./ui/card";
import SEO from "./SEO";
import { calculateISODate, inferServiceFromReview, getConsistentAggregateRating } from "@/utils/review-helpers";

const GoogleReviews = () => {
  const aggregateRating = getConsistentAggregateRating();
  const averageRating = parseFloat(aggregateRating.ratingValue);
  const totalReviews = parseInt(aggregateRating.reviewCount);

  // In production, these would come from Google Places API
  const reviews = [
    {
      author: "Priya Patel",
      rating: 5,
      text: "Marcus and his crew did an amazing job painting our 12-storey condo. Finished in 3 weeks, minimal disruption to residents. Very impressed with the attention to detail.",
      date: "5 days ago",
      avatar: "PP",
      verified: true
    },
    {
      author: "David Kim",
      rating: 5,
      text: "Professional team that knows what they're doing. Our parking garage looks brand new after their restoration work.",
      date: "2 weeks ago",
      avatar: "DK",
      verified: true
    },
    {
      author: "Elena Martinez",
      rating: 4,
      text: "Great quality work on our office space. Project ran 2 days over schedule but they communicated well and the final result was worth it.",
      date: "3 weeks ago",
      avatar: "EM",
      verified: true
    },
    {
      author: "James Thompson",
      rating: 5,
      text: "Best decision we made. They handled our commercial building repaint efficiently and the price was very competitive for the GTA.",
      date: "1 month ago",
      avatar: "JT",
      verified: true
    },
    {
      author: "Aisha Mohammed",
      rating: 5,
      text: "Reliable and trustworthy. Fixed our stucco issues and even spotted other problems we weren't aware of. Highly recommend!",
      date: "1 month ago",
      avatar: "AM",
      verified: true
    },
  ];

  // Generate @graph schema with LocalBusiness + individual Reviews
  const reviewSchemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://ascentgroupconstruction.com/#localbusiness",
        "name": "Ascent Group Construction",
        "url": "https://ascentgroupconstruction.com/",
        "telephone": "+1-416-555-7246",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "123 Construction Way",
          "addressLocality": "Toronto",
          "addressRegion": "ON",
          "postalCode": "M5H 2N2",
          "addressCountry": "CA"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": aggregateRating.ratingValue,
          "reviewCount": aggregateRating.reviewCount,
          "bestRating": aggregateRating.bestRating,
          "worstRating": aggregateRating.worstRating
        }
      },
      ...reviews.map(review => {
        const service = inferServiceFromReview(review.text);
        return {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": review.author
          },
          "datePublished": calculateISODate(review.date),
          "reviewBody": review.text,
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": String(review.rating),
            "bestRating": "5",
            "worstRating": "1"
          },
          "itemReviewed": {
            "@type": "Service",
            "name": service.name,
            "serviceType": service.type,
            "provider": {
              "@type": "LocalBusiness",
              "@id": "https://ascentgroupconstruction.com/#localbusiness"
            }
          },
          "publisher": {
            "@type": "Organization",
            "name": "Google"
          }
        };
      })
    ]
  };

  return (
    <section className="py-12 bg-muted/30">
      <SEO structuredData={reviewSchemaGraph} />
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
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

          {/* Reviews Grid - Show 3 on desktop, scroll on mobile */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {reviews.slice(0, 3).map((review, idx) => (
              <Card key={idx} className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-2 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm flex-shrink-0">
                    {review.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <div className="font-semibold text-foreground text-sm truncate">
                        {review.author}
                      </div>
                      {review.verified && (
                        <CheckCircle2 className="h-3 w-3 text-blue-500 flex-shrink-0" />
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {review.date}
                    </div>
                  </div>
                </div>
                <div className="flex mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-3.5 w-3.5 ${
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

          {/* Google Link */}
          <div className="text-center">
            <a
              href="https://g.page/r/YOUR_GOOGLE_PLACE_ID/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
              </svg>
              See all {totalReviews} reviews
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
