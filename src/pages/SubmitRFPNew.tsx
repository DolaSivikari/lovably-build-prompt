import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/ui/Button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft, CheckCircle2, Send } from "lucide-react";
import { rfpSubmissionSchema, type RFPSubmission } from "@/schemas/rfp-validation";
import { RFPStep1Company } from "@/components/rfp/RFPStep1Company";
import { RFPStep2Project } from "@/components/rfp/RFPStep2Project";
import { RFPStep3Timeline } from "@/components/rfp/RFPStep3Timeline";
import { RFPStep4Scope } from "@/components/rfp/RFPStep4Scope";

export default function SubmitRFPNew() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<RFPSubmission>({
    resolver: zodResolver(rfpSubmissionSchema),
    defaultValues: {
      company_name: "",
      contact_name: "",
      email: "",
      phone: "",
      title: "",
      project_name: "",
      project_type: undefined,
      project_location: "",
      estimated_value_range: undefined,
      estimated_timeline: "",
      project_start_date: "",
      delivery_method: undefined,
      bonding_required: false,
      prequalification_complete: false,
      scope_of_work: "",
      additional_requirements: "",
      plans_available: false,
      site_visit_required: false,
    },
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    { number: 1, title: "Company Info", component: RFPStep1Company },
    { number: 2, title: "Project Details", component: RFPStep2Project },
    { number: 3, title: "Timeline", component: RFPStep3Timeline },
    { number: 4, title: "Scope of Work", component: RFPStep4Scope },
  ];

  const handleNext = async () => {
    let fieldsToValidate: (keyof RFPSubmission)[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = ["company_name", "contact_name", "email", "phone"];
        break;
      case 2:
        fieldsToValidate = ["project_name", "project_type", "project_location", "estimated_value_range"];
        break;
      case 3:
        fieldsToValidate = ["estimated_timeline", "delivery_method"];
        break;
      case 4:
        fieldsToValidate = ["scope_of_work"];
        break;
    }

    const isValid = await form.trigger(fieldsToValidate);

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      toast.error("Please fill in all required fields correctly");
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (data: RFPSubmission) => {
    setSubmitting(true);

    try {
      // Insert RFP submission with required fields
      const submissionData = {
        company_name: data.company_name,
        contact_name: data.contact_name,
        email: data.email,
        phone: data.phone,
        project_name: data.project_name,
        project_type: data.project_type,
        project_location: data.project_location,
        estimated_value_range: data.estimated_value_range,
        estimated_timeline: data.estimated_timeline,
        project_start_date: data.project_start_date || undefined,
        scope_of_work: data.scope_of_work,
        delivery_method: data.delivery_method,
        bonding_required: data.bonding_required,
        prequalification_complete: data.prequalification_complete,
        additional_requirements: data.additional_requirements || undefined,
      };

      const { data: submission, error: insertError } = await supabase
        .from("rfp_submissions")
        .insert([submissionData])
        .select()
        .single();

      if (insertError) throw insertError;

      // Send notification emails
      try {
        await supabase.functions.invoke("send-rfp-notification", {
          body: {
            company_name: data.company_name,
            contact_name: data.contact_name,
            email: data.email,
            phone: data.phone,
            project_name: data.project_name,
            project_type: data.project_type,
            estimated_value_range: data.estimated_value_range,
            submission_id: submission.id,
          },
        });
      } catch (emailError) {
        console.error("Email notification failed:", emailError);
        // Don't fail submission if email fails
      }

      toast.success("RFP Submitted Successfully", {
        description: "We'll review your request and contact you within 2 business days.",
      });

      navigate("/");
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error("Submission Failed", {
        description: error.message || "Please try again or contact us directly.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <SEO
        title="Submit RFP - Request for Proposal | Ascent Group Construction"
        description="Submit your construction project RFP to Ascent Group Construction. Multi-step form for commercial, multi-family, and institutional projects across Ontario."
        keywords="RFP submission, construction proposal, contractor bid, project quote, GTA construction"
      />
      <Navigation />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Submit Your RFP</h1>
            <p className="text-xl text-muted-foreground">
              Complete our 4-step form to receive a detailed construction proposal
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className={`flex items-center gap-2 ${
                    step.number === currentStep
                      ? "text-primary font-bold"
                      : step.number < currentStep
                      ? "text-accent"
                      : "text-muted-foreground"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      step.number === currentStep
                        ? "bg-primary text-primary-foreground"
                        : step.number < currentStep
                        ? "bg-accent text-white"
                        : "bg-muted"
                    }`}
                  >
                    {step.number < currentStep ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      step.number
                    )}
                  </div>
                  <span className="hidden sm:inline text-sm">{step.title}</span>
                </div>
              ))}
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Form */}
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <CurrentStepComponent form={form} />

            {/* Navigation Buttons */}
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  {currentStep > 1 ? (
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleBack}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                  ) : (
                    <div />
                  )}

                  {currentStep < totalSteps ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                    >
                      Next
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
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
                  )}
                </div>
              </CardContent>
            </Card>
          </form>

          {/* Help Section */}
          <Card className="mt-8 border-accent/20 bg-accent/5">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-3">Need Help?</h3>
              <p className="text-muted-foreground mb-4">
                Have questions about the RFP process or need assistance with your submission?
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold mb-1">📞 Call Us</p>
                  <p className="text-muted-foreground">(416) 647-5286</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">📧 Email</p>
                  <p className="text-muted-foreground">rfp@ascentgroupconstruction.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
