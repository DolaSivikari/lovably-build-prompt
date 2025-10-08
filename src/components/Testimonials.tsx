import { Card, CardContent } from "./ui/card";
import { Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "BuildCraft delivered our office tower project ahead of schedule and under budget. Their professionalism and expertise are unmatched in the industry.",
      author: "Sarah Thompson",
      position: "CEO, Thompson Properties",
      company: "Commercial Real Estate",
    },
    {
      quote: "The team's attention to detail and commitment to safety made all the difference. They turned our vision into reality while maintaining the highest standards.",
      author: "Michael Chen",
      position: "VP Operations",
      company: "Manufacturing Corp",
    },
    {
      quote: "Working with BuildCraft on our healthcare facility was seamless. Their use of BIM technology prevented costly delays and ensured quality outcomes.",
      author: "Dr. Jennifer Martinez",
      position: "Medical Director",
      company: "Regional Health Authority",
    },
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Success Stories</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear what our clients have to say about their experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
    </section>
  );
};

export default Testimonials;
