import { FileText, Download, CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const packageItems = [
  "Insurance certificates (liability, workers comp, bonding)",
  "Safety certifications and track record",
  "Financial statements and bonding capacity",
  "Equipment and crew capacity details",
  "References from similar projects",
  "Quality management systems",
  "Environmental compliance documentation",
];

const PrequalPackage = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    projectType: "",
    projectValueRange: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('prequalification_downloads')
        .insert({
          company_name: formData.companyName,
          contact_name: formData.contactName,
          email: formData.email,
          phone: formData.phone,
          project_type: formData.projectType,
          project_value_range: formData.projectValueRange,
          message: formData.message,
        });

      if (error) throw error;

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
      });
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
    <section id="prequalification" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto border-2 border-primary/20 shadow-lg">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileText className="w-10 h-10 text-primary" />
              </div>

              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
                  Contractor Prequalification Package
                </h2>
                <p className="text-muted-foreground mb-6">
                  Everything you need to evaluate us as a subcontractor for your project
                </p>

                <div className="grid md:grid-cols-2 gap-3 mb-8">
                  {packageItems.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="w-full sm:w-auto">
                        <Download className="mr-2 w-5 h-5" />
                        Request Package
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
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Submitting..." : "Request Package"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                  <a href="/resources/contractor-portal">
                    View All Documents
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>
              </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PrequalPackage;
