import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Testimonial {
  name: string;
  company: string;
  role: string;
  rating: number;
  text: string;
  image?: string;
  date?: string;
}

interface TestimonialRatingsProps {
  testimonials?: Testimonial[];
  className?: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "Michael Chen",
    company: "Brookfield Properties",
    role: "Senior Project Manager",
    rating: 5,
    text: "Outstanding workmanship and professionalism. Ascent Group completed our 50-unit restoration project ahead of schedule and under budget. Their attention to detail and safety record is unmatched.",
    date: "3 months ago"
  },
  {
    name: "Sarah Johnson",
    company: "Oxford Properties",
    role: "Director of Operations",
    rating: 5,
    text: "We've worked with Ascent on multiple commercial projects. Their team's expertise in building envelope systems is exceptional. Highly recommend for any large-scale construction work.",
    date: "6 months ago"
  },
  {
    name: "David Thompson",
    company: "RioCan REIT",
    role: "Property Manager",
    rating: 5,
    text: "Reliability is key in our industry, and Ascent delivers every time. From initial consultation to project completion, their communication and execution are flawless.",
    date: "2 months ago"
  }
];

export const TestimonialRatings = ({
  testimonials = defaultTestimonials,
  className
}: TestimonialRatingsProps) => {
  const averageRating = testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length;

  return (
    <div className={cn("space-y-8", className)}>
      {/* Rating Summary */}
      <div className="text-center space-y-4">
        <div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-5xl font-bold">{averageRating.toFixed(1)}</span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-6 h-6",
                    i < Math.floor(averageRating)
                      ? "fill-yellow-500 text-yellow-500"
                      : "text-muted"
                  )}
                />
              ))}
            </div>
          </div>
          <p className="text-muted-foreground">
            Based on {testimonials.length} verified reviews
          </p>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card
            key={index}
            className="animate-fade-in hover:shadow-xl transition-all border-2 hover:border-primary/30"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6 space-y-4">
              {/* Quote Icon */}
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Quote className="w-5 h-5 text-primary" />
              </div>

              {/* Rating Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-4 h-4",
                      i < testimonial.rating
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-muted"
                    )}
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-sm text-foreground leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div className="pt-4 border-t">
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                <p className="text-sm text-primary font-medium">{testimonial.company}</p>
                {testimonial.date && (
                  <p className="text-xs text-muted-foreground mt-1">{testimonial.date}</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
