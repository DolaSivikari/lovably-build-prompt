import { FileText, Download, CheckCircle, ArrowRight, Shield, Award, TrendingUp, Users, Building2, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/ui/Button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { useCompanyStats } from "@/hooks/useCompanyStats";

const packageItems = [
  { icon: Shield, label: "Insurance & Bonding Certificates", desc: "$5M liability, $5M bonding capacity" },
  { icon: Award, label: "Safety Certifications", desc: "COR certified, zero lost-time incidents" },
  { icon: TrendingUp, label: "Financial Statements", desc: "Audited financials & credit references" },
  { icon: Users, label: "Crew & Equipment Details", desc: "Full-time crews & modern equipment fleet" },
  { icon: Building2, label: "Project References", desc: "Recent projects with contact details" },
  { icon: CheckCircle, label: "Quality Systems", desc: "ISO-compliant processes & documentation" },
];

const PrequalPackage = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { yearsInBusinessFormatted, totalProjectsFormatted, satisfactionRateFormatted } = useCompanyStats();

  const stats = [
    { value: yearsInBusinessFormatted, label: "Years Experience" },
    { value: "$5M", label: "Bonding Capacity" },
    { value: totalProjectsFormatted, label: "Projects Completed" },
    { value: satisfactionRateFormatted, label: "Client Satisfaction" },
  ];
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    projectType: "",
    projectValueRange: "",
    message: "",
    honeypot: "" // Honeypot for bot detection
  });

  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side rate limiting
    const now = Date.now();
    if (now - lastSubmitTime < 10000) {
      toast({
        title: "Slow down!",
        description: "Please wait a moment before submitting again.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Submit via edge function with bot protection
      const { error } = await supabase.functions.invoke('submit-form', {
        body: {
          formType: 'prequalification',
          data: {
            companyName: formData.companyName,
            contactName: formData.contactName,
            email: formData.email,
            phone: formData.phone,
            projectType: formData.projectType,
            projectValueRange: formData.projectValueRange,
            message: formData.message
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

      toast({
        title: "Request Submitted",
        description: "We'll send the prequalification package to your email within 24 hours.",
      });

      setOpen(false);
      setFormData({
        companyName: "",
        contactName: "",
        email: "",
        phone: "",
        projectType: "",
        projectValueRange: "",
        message: "",
        honeypot: ""
      });
      setLastSubmitTime(now);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="prequalification" className="py-24 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <FileText className="w-4 h-4" />
            <span>Contractor Prequalification</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Ready to Evaluate Us?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access our complete prequalification package with all the documentation you need to make an informed decision
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <Card key={index} className="border-primary/20 bg-card/50 backdrop-blur">
              <CardContent className="p-6 text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Card */}
        <Card className="max-w-5xl mx-auto border-2 border-primary/20 shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Side - Package Contents */}
            <div className="p-8 md:p-10 bg-gradient-to-br from-primary/5 to-transparent">
              <h3 className="text-2xl font-bold mb-6 text-foreground">Package Includes</h3>
              <div className="space-y-4">
                {packageItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-start gap-3 group">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground mb-0.5">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Side - CTA */}
            <div className="p-8 md:p-10 flex flex-col justify-between bg-card">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Download className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Instant Access</p>
                    <p className="text-sm text-muted-foreground">Delivered within 24 hours</p>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-2 mb-2">
                    <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm text-foreground mb-1">Quick Response Guarantee</p>
                      <p className="text-sm text-muted-foreground">
                        Request your package now and receive it via email within 24 hours. All documentation is current and ready for your review.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">All certificates current & verified</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Financial statements included</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Reference list with contact info</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="w-full">
                      Request Full Package
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Request Prequalification Package</DialogTitle>
                      <DialogDescription>
                        Fill out the form below and we'll send the complete package to your email within 24 hours.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="companyName">Company Name *</Label>
                        <Input
                          id="companyName"
                          required
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="contactName">Contact Name *</Label>
                        <Input
                          id="contactName"
                          required
                          value={formData.contactName}
                          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="projectType">Project Type</Label>
                        <Select value={formData.projectType} onValueChange={(value) => setFormData({ ...formData, projectType: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select project type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="commercial">Commercial</SelectItem>
                            <SelectItem value="residential">Residential</SelectItem>
                            <SelectItem value="industrial">Industrial</SelectItem>
                            <SelectItem value="institutional">Institutional</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="projectValueRange">Estimated Project Value</Label>
                        <Select value={formData.projectValueRange} onValueChange={(value) => setFormData({ ...formData, projectValueRange: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select value range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-50k">Under $50,000</SelectItem>
                            <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                            <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                            <SelectItem value="250k-500k">$250,000 - $500,000</SelectItem>
                            <SelectItem value="over-500k">Over $500,000</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="message">Additional Information</Label>
                        <Textarea
                          id="message"
                          rows={3}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                      </div>

                      {/* Honeypot field - hidden from users */}
                      <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                        <Input
                          type="text"
                          name="website"
                          tabIndex={-1}
                          autoComplete="off"
                          value={formData.honeypot}
                          onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                        />
                      </div>

                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Submitting..." : "Request Package"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>

                <Button size="lg" variant="outline" asChild className="w-full">
                  <Link to="/prequalification">
                    View Detailed Information
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Links */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-3">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/company/certifications-insurance">View Certifications</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/safety">Safety Record</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/projects">Recent Projects</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/submit-rfp">Submit RFP</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrequalPackage;
