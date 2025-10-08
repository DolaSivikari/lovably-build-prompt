import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Wrench, Home as HomeIcon, Paintbrush, Info, CheckCircle2 } from "lucide-react";

const StarterPackages = () => {
  const packages = [
    {
      icon: Wrench,
      title: "Starter — Quick Fix",
      timeframe: "Ideal: same-day / under 4 hrs",
      price: "$199",
      guarantee: "30-day workmanship guarantee",
      guaranteeYears: "30-day",
      what: "1–2 small repairs (faucet, drywall patch, door adjustment).",
      outcome: "Fast, neat repair.",
      included: [
        "Up to 2 small repairs",
        "Materials included",
        "Same-day availability",
        "Clean-up included"
      ],
      ctaText: "Request Starter Quote",
      popular: false
    },
    {
      icon: Paintbrush,
      title: "Home Refresh — One-Room Makeover",
      timeframe: "Ideal: next-day",
      price: "$799",
      guarantee: "30-day workmanship guarantee",
      guaranteeYears: "30-day",
      what: "One-room paint, trim, or tile repair; minor carpentry.",
      outcome: "Room looks refreshed.",
      included: [
        "Full room preparation",
        "Premium paint & materials",
        "Trim & detail work",
        "Complete clean-up"
      ],
      ctaText: "Book a Refresh",
      popular: true
    },
    {
      icon: HomeIcon,
      title: "Weekend Makeover — Mini Project",
      timeframe: "Ideal: 1–3 days",
      price: "$1,999",
      guarantee: "1-year workmanship guarantee",
      guaranteeYears: "1-year",
      what: "Small patio, small kitchen update, full room repaint, or interlock repair.",
      outcome: "Noticeable, lasting improvement.",
      included: [
        "Project planning included",
        "Multi-day completion",
        "Quality materials",
        "Extended warranty"
      ],
      ctaText: "Start Weekend Makeover",
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-4">
            <h2 className="text-4xl font-bold text-primary mb-3">Starter Packages</h2>
            <p className="text-lg text-muted-foreground">
              Transparent, affordable packages for homeowners. No hidden fees.
            </p>
            <p className="text-sm text-muted-foreground/70 mt-2">
              *Sample pricing — actual quote provided within 24–48 hours based on your specific needs
            </p>
          </div>

          {/* Packages Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {packages.map((pkg, index) => (
              <Card 
                key={pkg.title}
                className={`relative overflow-hidden transition-all duration-300 ${
                  pkg.popular 
                    ? 'border-secondary border-2 shadow-lg scale-105' 
                    : 'border-border hover:shadow-md'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {pkg.popular && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="bg-secondary text-primary hover:bg-secondary/90 px-3 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardContent className="p-6 pt-8">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <pkg.icon className="w-8 h-8 text-primary" />
                  </div>

                  {/* Title & Timeframe */}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-foreground mb-1">{pkg.title}</h3>
                    <p className="text-sm text-muted-foreground">{pkg.timeframe}</p>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-3xl font-bold text-foreground">from {pkg.price}*</span>
                      <Info className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>

                  {/* Guarantee Badge */}
                  <div className="mb-4 flex justify-center">
                    <Badge variant="outline" className="text-xs">
                      {pkg.guaranteeYears} workmanship guarantee
                    </Badge>
                  </div>

                  {/* What & Outcome */}
                  <div className="mb-4 space-y-2">
                    <div>
                      <p className="text-sm font-semibold text-foreground">What:</p>
                      <p className="text-sm text-muted-foreground">{pkg.what}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Outcome:</p>
                      <p className="text-sm text-muted-foreground">{pkg.outcome}</p>
                    </div>
                  </div>

                  {/* What's Included */}
                  <div className="mb-6">
                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                      WHAT'S INCLUDED:
                    </p>
                    <ul className="space-y-2">
                      {pkg.included.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-2">
                    <Link to="/contact" className="block">
                      <Button 
                        className={`w-full ${
                          pkg.popular 
                            ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                            : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                        }`}
                      >
                        {pkg.ctaText}
                      </Button>
                    </Link>
                    <Link to="/contact" className="block">
                      <Button variant="ghost" className="w-full text-sm text-muted-foreground hover:text-foreground">
                        Upload Photo for Ballpark
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Custom Quote CTA */}
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Need something custom? We handle projects of all sizes.
            </p>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="border-2">
                Get Custom Quote
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StarterPackages;
