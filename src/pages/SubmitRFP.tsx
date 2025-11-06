import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/Input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/ui/Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  FileText,
  Building2,
  DollarSign,
  Calendar,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function SubmitRFP() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    company_name: "",
    contact_name: "",
    email: "",
    phone: "",
    project_name: "",
    project_type: "",
    project_location: "",
    estimated_value_range: "",
    estimated_timeline: "",
    project_start_date: "",
    scope_of_work: "",
    delivery_method: "",
    bonding_required: false,
    prequalification_complete: false,
    additional_requirements: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const { error } = await supabase
        .from("rfp_submissions")
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "RFP Submitted Successfully",
        description:
          "We'll review your request and get back to you within 2 business days.",
      });

      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Submit RFP - Request for Proposal"
        description="Submit your request for proposal to Ascent Group Construction. Get a detailed quote for your commercial, multi-family, or institutional construction project."
        keywords="RFP submission, construction quote, project proposal, contractor bid, construction estimate"
      />
      <Navigation />

      <div className="pt-24 pb-16 bg-gradient-to-b from-muted to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-4">Submit RFP</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Tell us about your project and we'll provide a detailed proposal
                tailored to your needs
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Request for Proposal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Company Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Building2 className="w-5 h-5" />
                      Company Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Company Name *</Label>
                        <Input
                          required
                          value={formData.company_name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              company_name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label>Contact Name *</Label>
                        <Input
                          required
                          value={formData.contact_name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              contact_name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label>Email *</Label>
                        <Input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label>Phone</Label>
                        <Input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Project Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label>Project Name *</Label>
                        <Input
                          required
                          value={formData.project_name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              project_name: e.target.value,
                            })
                          }
                          placeholder="e.g., Downtown Office Tower Renovation"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>Project Type *</Label>
                          <Select
                            required
                            value={formData.project_type}
                            onValueChange={(value) =>
                              setFormData({ ...formData, project_type: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="commercial">
                                Commercial
                              </SelectItem>
                              <SelectItem value="multi-family">
                                Multi-Family Residential
                              </SelectItem>
                              <SelectItem value="institutional">
                                Institutional
                              </SelectItem>
                              <SelectItem value="industrial">
                                Industrial
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Delivery Method</Label>
                          <Select
                            value={formData.delivery_method}
                            onValueChange={(value) =>
                              setFormData({
                                ...formData,
                                delivery_method: value,
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general-contracting">
                                General Contracting
                              </SelectItem>
                              <SelectItem value="construction-management">
                                Construction Management
                              </SelectItem>
                              <SelectItem value="design-build">
                                Design-Build
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label>Project Location</Label>
                        <Input
                          value={formData.project_location}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              project_location: e.target.value,
                            })
                          }
                          placeholder="City, Province"
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            Estimated Project Value *
                          </Label>
                          <Select
                            required
                            value={formData.estimated_value_range}
                            onValueChange={(value) =>
                              setFormData({
                                ...formData,
                                estimated_value_range: value,
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="under-500k">
                                Under $500K
                              </SelectItem>
                              <SelectItem value="500k-1m">
                                $500K - $1M
                              </SelectItem>
                              <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                              <SelectItem value="5m-10m">$5M - $10M</SelectItem>
                              <SelectItem value="10m-plus">$10M+</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Estimated Timeline
                          </Label>
                          <Select
                            value={formData.estimated_timeline}
                            onValueChange={(value) =>
                              setFormData({
                                ...formData,
                                estimated_timeline: value,
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select timeline" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="3-6-months">
                                3-6 Months
                              </SelectItem>
                              <SelectItem value="6-12-months">
                                6-12 Months
                              </SelectItem>
                              <SelectItem value="12-18-months">
                                12-18 Months
                              </SelectItem>
                              <SelectItem value="18-plus-months">
                                18+ Months
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label>Desired Start Date</Label>
                        <Input
                          type="date"
                          value={formData.project_start_date}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              project_start_date: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label>Scope of Work *</Label>
                        <Textarea
                          required
                          rows={6}
                          value={formData.scope_of_work}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              scope_of_work: e.target.value,
                            })
                          }
                          placeholder="Provide a detailed description of the work required, including specific trades, materials, and any special requirements..."
                        />
                      </div>
                      <div>
                        <Label>Additional Requirements</Label>
                        <Textarea
                          rows={4}
                          value={formData.additional_requirements}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              additional_requirements: e.target.value,
                            })
                          }
                          placeholder="Any other information we should know (e.g., special certifications needed, sustainability requirements, accessibility standards)..."
                        />
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={formData.bonding_required}
                            onCheckedChange={(checked) =>
                              setFormData({
                                ...formData,
                                bonding_required: checked as boolean,
                              })
                            }
                          />
                          <Label className="font-normal">
                            Bonding Required
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={formData.prequalification_complete}
                            onCheckedChange={(checked) =>
                              setFormData({
                                ...formData,
                                prequalification_complete: checked as boolean,
                              })
                            }
                          />
                          <Label className="font-normal">
                            I have completed the pre-qualification process
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <div className="bg-muted p-4 rounded-lg mb-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1">
                            What Happens Next?
                          </h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            <li>
                              • We'll review your RFP within 2 business days
                            </li>
                            <li>
                              • Our team will contact you to discuss project
                              details
                            </li>
                            <li>
                              • You'll receive a detailed proposal within 5-7
                              business days
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={submitting}
                    >
                      {submitting ? (
                        "Submitting..."
                      ) : (
                        <>
                          Submit RFP
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
