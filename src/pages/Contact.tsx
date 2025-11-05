import { useState, useRef, useEffect } from "react";
import { z } from "zod";
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
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Phone, Mail, Clock, Loader2 } from "lucide-react";
import { useSettingsData } from "@/hooks/useSettingsData";

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
  const { data: contactSettings, loading } = useSettingsData('contact_page_settings');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    honeypot: "",
  });

  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmittingRef.current) return;

    const now = Date.now();
    if (now - lastSubmitTime < 10000) {
      toast({
        title: "Slow down!",
        description: "Please wait a moment before submitting again.",
        variant: "destructive",
      });
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);

    try {
      const validatedData = contactSchema.parse(formData);

      const { data, error } = await supabase.functions.invoke('submit-form', {
        body: {
          formType: 'contact',
          data: {
            name: validatedData.name,
            email: validatedData.email,
            phone: validatedData.phone,
            company: validatedData.company,
            message: validatedData.message,
            submission_type: 'contact'
          },
          honeypot: formData.honeypot
        }
      });

      if (error) {
        if (error.message?.includes('Rate limit exceeded')) {
          toast({
            title: "Too many submissions",
            description: "Please try again in a few minutes.",
            variant: "destructive",
          });
          return;
        }
        throw error;
      }

      trackConversion('contact_form_submit', {
        form_type: 'contact',
        submission_type: formData.company ? 'business' : 'individual',
      });

      trackFormSubmit('contact_form', {
        has_company: !!formData.company,
        has_phone: !!formData.phone,
      });

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
      }

      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours. Check your email for confirmation.",
      });

      setFormData({ name: "", email: "", phone: "", company: "", message: "", honeypot: "" });
      setLastSubmitTime(now);
    } catch (error) {
      if (error instanceof z.ZodError) {
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

  // Fallback values if database hasn't loaded
  const officeAddress = contactSettings?.office_address || '123 Industrial Parkway\nMississauga, ON L5T 1A1\nCanada';
  const mainPhone = contactSettings?.main_phone || '(416) 555-PAINT';
  const tollFreePhone = contactSettings?.toll_free_phone || '1-800-555-ASCENT';
  const generalEmail = contactSettings?.general_email || 'info@ascentgroupconstruction.com';
  const projectsEmail = contactSettings?.projects_email || 'projects@ascentgroupconstruction.com';
  const careersEmail = contactSettings?.careers_email || 'careers@ascentgroupconstruction.com';
  const weekdayHours = contactSettings?.weekday_hours || 'Monday - Friday: 8:00 AM - 6:00 PM';
  const saturdayHours = contactSettings?.saturday_hours || 'Saturday: 9:00 AM - 2:00 PM';
  const sundayHours = contactSettings?.sunday_hours || 'Sunday: Closed';
  const mapEmbedUrl = contactSettings?.map_embed_url || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d184551.90977289474!2d-79.51814069999999!3d43.7184038!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb90d7c63ba5%3A0x323555502ab4c477!2sToronto%2C%20ON!5e0!3m2!1sen!2sca!4v1234567890123!5m2!1sen!2sca';

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Contact Us - Request Proposal | Ascent Group"
        description="Contact Ascen Group for a free consultation and estimate. Serving the Greater Toronto Area with professional construction and project management services."
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
          {loading && (
            <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading contact information...</span>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              {loading ? (
                <>
                  <Card>
                    <CardHeader>
                      <Skeleton className="h-6 w-32" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-16 w-full" />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <Skeleton className="h-6 w-24" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-10 w-full" />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <Skeleton className="h-6 w-28" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-10 w-full" />
                    </CardContent>
                  </Card>
                </>
              ) : (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        Head Office
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">
                        {officeAddress}
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
                        Main: {mainPhone}<br />
                        Toll Free: {tollFreePhone}
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
                        General: {generalEmail}<br />
                        Projects: {projectsEmail}<br />
                        Careers: {careersEmail}
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
                        {weekdayHours}<br />
                        {saturdayHours}<br />
                        {sundayHours}
                      </p>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Request a Consultation</CardTitle>
                  <CardDescription>
                    Fill out the form below and our team will get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
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
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(416) 555-0123"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Your Company"
                        />
                      </div>
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

                    <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        name="honeypot"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData.honeypot}
                        onChange={handleChange}
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Submit Request"}
                    </Button>
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
              src={mapEmbedUrl}
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
