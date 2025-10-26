import { useState, useRef, useEffect } from "react";
import { z } from "zod";
import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PageHeader from "@/components/PageHeader";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { trackFormSubmit, trackConversion } from "@/lib/analytics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

// Input validation schema to prevent XSS/injection attacks
const contactSchema = z.object({
  name: z.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name contains invalid characters"),
  email: z.string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  phone: z.string()
    .trim()
    .max(20, "Phone must be less than 20 characters")
    .regex(/^[0-9\s\-\(\)\+]*$/, "Phone contains invalid characters")
    .optional()
    .or(z.literal("")),
  company: z.string()
    .trim()
    .max(100, "Company name must be less than 100 characters")
    .optional()
    .or(z.literal("")),
  message: z.string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
});

const Contact = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);
  const [projectType, setProjectType] = useState<string>("residential");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    title: "",
    projectValue: "",
    timeline: "",
    serviceNeeded: "",
    message: "",
  });

  useEffect(() => {
    const type = searchParams.get("type");
    if (type && ["residential", "commercial", "multi-unit", "emergency"].includes(type)) {
      setProjectType(type);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent duplicate submissions
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setIsSubmitting(true);

    try {
      // Validate input to prevent XSS/injection attacks
      const validatedData = contactSchema.parse(formData);

      const { error } = await supabase
        .from("contact_submissions")
        .insert([{
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone || null,
          company: validatedData.company || null,
          message: validatedData.message,
          submission_type: projectType,
        }]);

      if (error) throw error;

      // Track conversion
      trackConversion('contact_form_submit', {
        form_type: 'contact',
        submission_type: formData.company ? 'business' : 'individual',
      });

      trackFormSubmit('contact_form', {
        has_company: !!formData.company,
        has_phone: !!formData.phone,
      });

      // Send email notifications with timeout
      try {
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Email notification timeout')), 10000)
        );

        await Promise.race([
          supabase.functions.invoke('send-contact-notification', {
            body: {
              name: validatedData.name,
              email: validatedData.email,
              phone: validatedData.phone,
              company: validatedData.company,
              message: validatedData.message,
              submissionType: "Contact Form"
            }
          }),
          timeoutPromise
        ]);
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
        // Don't fail the submission if email fails
      }

      const responseTime = projectType === "emergency" ? "4 hours" : projectType === "commercial" || projectType === "multi-unit" ? "48 hours" : "24 hours";
      
      toast({
        title: "Message sent!",
        description: `We'll get back to you within ${responseTime}. Check your email for confirmation.`,
      });

      setFormData({ name: "", email: "", phone: "", company: "", title: "", projectValue: "", timeline: "", serviceNeeded: "", message: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Display validation errors
        const firstError = error.errors[0];
        toast({
          title: "Validation Error",
          description: firstError.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
      isSubmittingRef.current = false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Contact Us - Get Free Estimate | Ascen Group"
        description="Contact Ascen Group for a free consultation and estimate. Serving the Greater Toronto Area with professional construction and painting services."
        canonical="https://ascentgroupconstruction.com/contact"
      />
      <Navigation />

      <PageHeader
        title="Get In Touch"
        description="Ready to start your project? We're here to help bring your vision to life."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" }
        ]}
        variant="minimal"
      />

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Head Office
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    123 Industrial Parkway<br />
                    Mississauga, ON L5T 1A1<br />
                    Canada
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-primary" />
                    Phone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Main: (416) 555-PAINT<br />
                    Toll Free: 1-800-555-ASCENT
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    General: info@ascentgroupconstruction.com<br />
                    Projects: projects@ascentgroupconstruction.com<br />
                    Careers: careers@ascentgroupconstruction.com
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Monday - Friday: 8:00 AM - 6:00 PM<br />
                    Saturday: 9:00 AM - 2:00 PM<br />
                    Sunday: Closed
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Request a Consultation</CardTitle>
                  <CardDescription>
                    Fill out the form below and our team will get back to you.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Project Type Selector */}
                  <div className="mb-6">
                    <Label className="text-base font-semibold mb-3 block">Project Type</Label>
                    <RadioGroup value={projectType} onValueChange={setProjectType} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <RadioGroupItem value="residential" id="residential" className="peer sr-only" />
                        <Label htmlFor="residential" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                          <span className="text-sm font-medium">Residential</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="commercial" id="commercial" className="peer sr-only" />
                        <Label htmlFor="commercial" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                          <span className="text-sm font-medium">Commercial</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="multi-unit" id="multi-unit" className="peer sr-only" />
                        <Label htmlFor="multi-unit" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                          <span className="text-sm font-medium">Multi-Unit</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="emergency" id="emergency" className="peer sr-only" />
                        <Label htmlFor="emergency" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                          <span className="text-sm font-medium text-destructive">Emergency</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="John Smith"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone {projectType === "emergency" && "*"}</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          required={projectType === "emergency"}
                          placeholder="(416) 555-0123"
                        />
                      </div>
                      {(projectType === "commercial" || projectType === "multi-unit") && (
                        <div className="space-y-2">
                          <Label htmlFor="company">Company *</Label>
                          <Input
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            required
                            placeholder="Your Company"
                          />
                        </div>
                      )}
                    </div>

                    {projectType === "multi-unit" && (
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Project Manager"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="projectValue">Estimated Project Value</Label>
                          <Select value={formData.projectValue} onValueChange={(value) => handleSelectChange("projectValue", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="100k-500k">$100K - $500K</SelectItem>
                              <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                              <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                              <SelectItem value="5m+">$5M+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

                    {projectType === "residential" && (
                      <div className="space-y-2">
                        <Label htmlFor="serviceNeeded">Service Needed</Label>
                        <Select value={formData.serviceNeeded} onValueChange={(value) => handleSelectChange("serviceNeeded", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="interior-painting">Interior Painting</SelectItem>
                            <SelectItem value="exterior-painting">Exterior Painting</SelectItem>
                            <SelectItem value="stucco">Stucco Repair</SelectItem>
                            <SelectItem value="renovation">Full Renovation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="timeline">Timeline</Label>
                      <Select value={formData.timeline} onValueChange={(value) => handleSelectChange("timeline", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asap">ASAP</SelectItem>
                          <SelectItem value="1-2-weeks">1-2 Weeks</SelectItem>
                          <SelectItem value="1-3-months">1-3 Months</SelectItem>
                          <SelectItem value="3+-months">3+ Months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Project Details *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell us about your project requirements, timeline, and budget..."
                        className="min-h-[150px]"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full" 
                      disabled={isSubmitting}
                      variant={projectType === "emergency" ? "destructive" : "default"}
                    >
                      {isSubmitting ? "Sending..." : projectType === "emergency" ? "Request Emergency Service" : projectType === "multi-unit" ? "Request Proposal" : "Get Your Free Quote"}
                    </Button>
                    
                    {projectType !== "emergency" && (
                      <p className="text-sm text-muted-foreground text-center">
                        We'll respond within {projectType === "commercial" || projectType === "multi-unit" ? "48 hours" : "24 hours"}
                      </p>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Visit Our Office</h2>
            <p className="text-muted-foreground">
              We're located in Mississauga, serving the Greater Toronto Area
            </p>
          </div>
          <div className="aspect-video bg-card rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d184551.90977289474!2d-79.51814069999999!3d43.7184038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb90d7c63ba5%3A0x323555502ab4c477!2sToronto%2C%20ON!5e0!3m2!1sen!2sca!4v1234567890123!5m2!1sen!2sca"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ascent Group Construction Service Area - Greater Toronto Area"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
