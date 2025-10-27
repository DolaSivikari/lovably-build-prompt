import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
  Building2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
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
    title: "Detailed Project Assessment",
    description: "Thorough on-site evaluation with itemized pricing for all construction requirements across Toronto and the GTA.",
    highlights: [
      "Comprehensive site analysis",
      "Transparent pricing structure",
      "Professional consultation"
    ]
  },
  {
    icon: ShieldCheck,
    title: "Licensed & Insured Professionals",
    description: "Fully licensed Ontario contractor with comprehensive liability coverage and WSIB compliance.",
    highlights: [
      "$5M liability coverage",
      "WSIB compliant operations",
      "15+ years construction experience"
    ]
  },
  {
    icon: Building2,
    title: "Comprehensive Service Coverage",
    description: "Complete construction solutions from a single trusted partner throughout Ontario.",
    highlights: [
      "21+ specialized services",
      "Commercial and residential",
      "Toronto & GTA service area"
    ]
  }
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

  // Email validation helper
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleQuickContact = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent duplicate submissions
    if (isSubmittingRef.current || isSubmitting) {
      return;
    }

    // Clear previous errors
    setErrors({});

    // Validate form data using Zod schema
    try {
      contactSchema.parse(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
        return;
      }
    }

    // Set submitting state
    isSubmittingRef.current = true;
    setIsSubmitting(true);

    try {
      // Insert into contact_submissions table
      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert([{
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          project_type: formData.projectType || null,
          message: formData.message?.trim() || null,
          source: 'homepage_cta'
        }]);

      if (dbError) throw dbError;

      // Trigger notification edge function
      try {
        await supabase.functions.invoke('send-contact-notification', {
          body: {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            projectType: formData.projectType || 'Not specified',
            message: formData.message?.trim() || 'No message provided',
            source: 'Homepage CTA'
          }
        });
      } catch (notificationError) {
        console.error('Notification error:', notificationError);
      }

      // Success toast
      toast({
        title: "Request Received!",
        description: "We'll contact you shortly to discuss your project.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        message: "",
      });

      // Navigate to thank you page after short delay
      setTimeout(() => {
        navigate('/contact?submitted=true');
      }, 1500);

    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission Failed",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="cta-contact"
      aria-labelledby="cta-heading"
      className="relative py-20 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden"
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1.5">
            <MapPin className="h-3 w-3 mr-2" />
            Toronto & GTA's Trusted Contractor
          </Badge>
          
          <h2 id="cta-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Request a Consultation
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

            {/* Trust Paragraph */}
            <div className="bg-muted/30 rounded-xl p-6 border border-border">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Ascent Group Construction has been Ontario's contractor since 2009, specializing in commercial and industrial construction services. Our municipally licensed team serves property managers, facility directors, and homeowners throughout Toronto, Mississauga, Brampton, Vaughan, Markham, Richmond Hill, and the entire Greater Toronto Area. From small maintenance projects to large-scale renovations, we deliver quality craftsmanship backed by comprehensive warranties.
              </p>
            </div>
          </div>

          {/* Right Column - Sticky Contact Form */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-card rounded-2xl shadow-xl p-6 sm:p-8 border-2 border-border">
              <div className="mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                  Request Your Estimate
                </h3>
                <p className="text-sm text-muted-foreground">
                  Detailed consultation for your project. No obligation.
                </p>
              </div>

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
                      Request Estimate
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
      </div>
    </section>
  );
};

export default InteractiveCTA;
