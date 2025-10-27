import { useState, useRef, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  Building2,
  Award,
  TrendingUp
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useCountUp } from "@/hooks/useCountUp";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(1, "Phone is required").max(20),
  projectType: z.string().optional(),
  message: z.string().trim().max(1000).optional(),
});

const WHY_REQUEST = [
  {
    icon: Clock,
    title: "Fast Response Time",
    description: "Receive your detailed estimate within 24-48 hours, not weeks. Our team conducts thorough on-site assessments across Toronto and the GTA with transparent, itemized pricing and no hidden costs.",
    highlights: [
      "24-48 hour turnaround time",
      "Comprehensive on-site assessments",
      "Transparent, itemized pricing"
    ]
  },
  {
    icon: ShieldCheck,
    title: "Licensed & Insured Professionals",
    description: "Fully licensed Ontario contractor with $5M liability coverage. WSIB compliant with comprehensive safety protocols and 15+ years serving commercial and residential clients throughout the Greater Toronto Area.",
    highlights: [
      "$5M comprehensive liability coverage",
      "WSIB compliant operations",
      "15+ years proven experience"
    ]
  },
  {
    icon: Building2,
    title: "Comprehensive Service Coverage",
    description: "21+ specialized construction services from one trusted partner. From commercial painting and masonry restoration to EIFS installation and metal cladding, serving Toronto, Mississauga, Brampton, Vaughan, and Markham.",
    highlights: [
      "21+ specialized services",
      "All construction trades under one roof",
      "Complete Toronto & GTA coverage"
    ]
  }
];

const SERVICE_BADGES = [
  { label: "500+ Projects in Ontario", icon: CheckCircle2, count: 500 },
  { label: "24/7 Emergency Response", icon: Clock, count: null },
  { label: "98% Client Satisfaction", icon: Award, count: 98 },
  { label: "15+ Years Experience", icon: TrendingUp, count: 15 },
  { label: "Toronto & GTA Coverage", icon: MapPin, count: null }
];

const LOCATIONS = [
  "Toronto", "Mississauga", "Brampton", "Vaughan", 
  "Markham", "Richmond Hill", "Oakville", "Burlington",
  "Etobicoke", "Scarborough", "North York", "Ajax"
];

const InteractiveCTA = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  // Animated count for projects badge
  const projectCount = useCountUp(500, 2000, isVisible);

  // Calculate form completion progress
  const formProgress = useMemo(() => {
    const fields = [formData.name, formData.email, formData.phone, formData.projectType];
    const filledFields = fields.filter(field => field.trim().length > 0).length;
    return (filledFields / fields.length) * 100;
  }, [formData]);

  // Email validation helper
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleQuickContact = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setErrors({});

    try {
      const validatedData = contactSchema.parse(formData);

      const { error: dbError } = await supabase
        .from("contact_submissions")
        .insert({
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone,
          message: validatedData.message || `Project Type: ${validatedData.projectType || "Not specified"}`,
          submission_type: "quote",
        });

      if (dbError) throw dbError;

      await supabase.functions.invoke("send-contact-notification", {
        body: {
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone,
          message: validatedData.message || `Project Type: ${validatedData.projectType || "Not specified"}`,
        },
      });

      toast({
        title: "Request Sent Successfully!",
        description: "We'll contact you within 24-48 hours with your detailed estimate.",
      });

      setFormData({ name: "", email: "", phone: "", projectType: "", message: "" });
      
      setTimeout(() => {
        navigate("/estimate");
      }, 1500);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        console.error("Form submission error:", error);
        toast({
          title: "Submission Error",
          description: "Failed to submit request. Please try again or call us directly.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
      isSubmittingRef.current = false;
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* Decorative Background - Subtle Blur Circles */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <Badge variant="outline" className="text-sm px-4 py-2">
            <MapPin className="h-4 w-4 mr-2 inline" />
            Toronto & GTA's Trusted Contractor
          </Badge>
          
          <h2 id="cta-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Get Your Free Construction Estimate
          </h2>
          
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Partner with Ontario's trusted construction experts serving Toronto, Mississauga, Brampton, Vaughan, and the Greater Toronto Area. Whether you're planning commercial painting, masonry restoration, EIFS installation, or structural repairs, our licensed and insured team delivers exceptional results on time and within budget. Request your detailed, no-obligation estimate today and discover why 500+ property owners across Ontario choose Ascent Group Construction.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-[1.2fr,1fr] gap-8 lg:gap-12 items-start">
          
          {/* Left Column - Info Cards */}
          <div className="space-y-8">
            
            {/* Why Request Section */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Why Request an Estimate from Ascent Group
              </h3>
              
              <div className="space-y-6">
                {WHY_REQUEST.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <article 
                      key={index}
                      className="relative bg-card rounded-xl p-6 border-2 border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 group"
                    >
                      {/* Icon Container */}
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      
                      {/* Title */}
                      <h3 className="text-xl font-bold mb-3 text-foreground">
                        {item.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                        {item.description}
                      </p>
                      
                      {/* Highlights */}
                      <ul className="space-y-2">
                        {item.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                            <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {/* Hover Gradient Overlay */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-all duration-300 pointer-events-none"></div>
                    </article>
                  );
                })}
              </div>
            </div>

            {/* Service Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {SERVICE_BADGES.map((badge, index) => {
                const Icon = badge.icon;
                const displayCount = badge.count === 500 ? projectCount : badge.count;
                
                return (
                  <div 
                    key={index}
                    className="bg-card rounded-lg p-4 border border-border text-center hover:border-primary/50 transition-colors"
                  >
                    <Icon className="h-5 w-5 text-primary mx-auto mb-2" />
                    <div className="text-xs text-muted-foreground leading-tight">
                      {badge.count !== null ? (
                        <span className="font-bold text-foreground block mb-1">
                          {displayCount}{badge.count === 98 ? '%' : '+'}
                        </span>
                      ) : null}
                      {badge.label.replace(/\d+\+?\s*/, '').replace(/\d+%\s*/, '')}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Trust Paragraph */}
            <div className="bg-muted/30 rounded-xl p-6 border border-border">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Ascent Group Construction has been Ontario's go-to contractor since 2009, specializing in commercial and industrial construction services. Our municipally licensed team serves property managers, facility directors, and homeowners throughout Toronto, Mississauga, Brampton, Vaughan, Markham, Richmond Hill, and the entire Greater Toronto Area. From small maintenance projects to large-scale renovations, we deliver quality craftsmanship backed by comprehensive warranties. Contact us today for your free, no-obligation estimate.
              </p>
            </div>
          </div>

          {/* Right Column - Sticky Contact Form */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-card rounded-2xl shadow-xl p-6 sm:p-8 border-2 border-border">
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                  Request Your Free Estimate
                </h3>
                <p className="text-sm text-muted-foreground">
                  Detailed quote within 24-48 hours. No obligation.
                </p>
              </div>

              {/* Form Progress */}
              {formProgress > 0 && formProgress < 100 && (
                <div className="mb-4">
                  <Progress value={formProgress} className="h-1.5" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {Math.round(formProgress)}% complete
                  </p>
                </div>
              )}

              <form onSubmit={handleQuickContact} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="sr-only">Your Name</Label>
                  <div className="relative">
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your Name *"
                      required
                      className="h-12"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {formData.name.trim().length > 2 && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                    )}
                  </div>
                  {errors.name && (
                    <p id="name-error" role="alert" className="text-destructive text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email" className="sr-only">Email Address</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email Address *"
                      required
                      className="h-12"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {formData.email && isValidEmail(formData.email) && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                    )}
                  </div>
                  {errors.email && (
                    <p id="email-error" role="alert" className="text-destructive text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="sr-only">Phone Number</Label>
                  <div className="relative">
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Phone Number *"
                      required
                      className="h-12"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                    />
                    {formData.phone.trim().length >= 10 && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                    )}
                  </div>
                  {errors.phone && (
                    <p id="phone-error" role="alert" className="text-destructive text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="projectType" className="sr-only">Project Type</Label>
                  <Select 
                    value={formData.projectType} 
                    onValueChange={(value) => setFormData({...formData, projectType: value})}
                  >
                    <SelectTrigger id="projectType" className="h-12">
                      <SelectValue placeholder="Select Project Type (Optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="commercial-painting">Commercial Painting</SelectItem>
                      <SelectItem value="masonry-restoration">Masonry Restoration</SelectItem>
                      <SelectItem value="eifs-installation">EIFS Installation</SelectItem>
                      <SelectItem value="metal-cladding">Metal Cladding</SelectItem>
                      <SelectItem value="parking-garage">Parking Garage Restoration</SelectItem>
                      <SelectItem value="waterproofing">Waterproofing Services</SelectItem>
                      <SelectItem value="other">Other Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message" className="sr-only">Project Details</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project... (Optional)"
                    rows={4}
                    className="resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12 text-base gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending Request..."
                  ) : (
                    <>
                      Request Free Estimate
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </Button>

                <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span>Your information is secure and confidential</span>
                </div>
              </form>

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3 text-center">
                  Prefer to talk directly?
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" asChild className="gap-2 h-11">
                    <a href="tel:+14165551234">
                      <Phone className="h-4 w-4" />
                      Call Now
                    </a>
                  </Button>
                  <Button variant="outline" asChild className="gap-2 h-11">
                    <Link to="/contact">
                      <Mail className="h-4 w-4" />
                      Email Us
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA / Location Banner */}
        <div className="mt-12 bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 rounded-xl p-6 border border-border">
          <div className="text-center mb-4">
            <h3 className="text-lg font-bold text-foreground mb-2">
              Serving Communities Across the Greater Toronto Area
            </h3>
            <p className="text-sm text-muted-foreground">
              Professional construction services available in your area
            </p>
          </div>
          
          {/* Location Marquee */}
          <div className="overflow-hidden relative">
            <div className="flex gap-4 animate-marquee whitespace-nowrap">
              {LOCATIONS.concat(LOCATIONS).map((city, i) => (
                <span 
                  key={i} 
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground px-3 py-1 bg-background/50 rounded-full border border-border"
                >
                  <MapPin className="h-3 w-3 text-primary" />
                  {city}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Button asChild variant="outline" className="gap-2">
              <Link to="/resources/service-areas">
                <MapPin className="h-4 w-4" />
                View All Service Areas
              </Link>
            </Button>
            <Button asChild className="gap-2">
              <a href="tel:+14165551234">
                <Phone className="h-4 w-4" />
                Call: (416) 555-1234
              </a>
            </Button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default InteractiveCTA;
