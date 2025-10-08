import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import EstimatorStep1 from "@/components/estimator/EstimatorStep1";
import EstimatorStep2 from "@/components/estimator/EstimatorStep2";
import EstimatorStep3 from "@/components/estimator/EstimatorStep3";
import EstimatorStep4 from "@/components/estimator/EstimatorStep4";
import EstimatorStep5 from "@/components/estimator/EstimatorStep5";
import { calculateEstimate, EstimateInput } from "@/utils/estimator";
import PaintCalculator from "@/components/PaintCalculator";

const Estimate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = 5;

  const [formData, setFormData] = useState({
    // Step 1
    service: "",
    sqft: "",
    stories: "",
    // Step 2
    prepComplexity: "",
    finishQuality: "",
    region: "",
    // Step 3
    scaffolding: "",
    colorConsultation: false,
    rushScheduling: false,
    warrantyExtension: false,
    siteCleanup: false,
    // Step 5
    name: "",
    email: "",
    phone: "",
    address: "",
    preferredContact: "",
    notes: "",
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const calculateCurrentEstimate = () => {
    if (!formData.service || !formData.sqft) {
      return {
        min: 0,
        max: 0,
        currency: "CAD",
        breakdown: {
          baseMin: 0,
          baseMax: 0,
          prepMultiplier: 1,
          finishMultiplier: 1,
          storiesMultiplier: 1,
          regionalMultiplier: 1,
          addOnsMin: 0,
          addOnsMax: 0,
        },
        explanation: "",
      };
    }

    const estimateInput: EstimateInput = {
      service: formData.service as "residential_painting" | "stucco_eifs",
      sqft: parseInt(formData.sqft) || 0,
      stories: formData.stories as "1" | "2" | "3_plus",
      prepComplexity: formData.prepComplexity as any,
      finishQuality: formData.finishQuality as any,
      region: formData.region as any,
      addOns: {
        scaffolding: formData.scaffolding as any,
        colorConsultation: formData.colorConsultation,
        rushScheduling: formData.rushScheduling,
        warrantyExtension: formData.warrantyExtension,
        siteCleanup: formData.siteCleanup,
      },
    };

    return calculateEstimate(estimateInput);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.service && formData.sqft && formData.stories;
      case 2:
        return formData.prepComplexity && formData.finishQuality && formData.region;
      case 3:
        return true; // Optional step
      case 4:
        return true; // Review step
      case 5:
        return formData.name && formData.email && formData.phone;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (canProceed() && currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    if (!canProceed()) return;

    setIsSubmitting(true);
    const estimate = calculateCurrentEstimate();

    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.address,
        message: `
Estimate Request:
- Service: ${formData.service}
- Square Footage: ${formData.sqft}
- Stories: ${formData.stories}
- Prep Complexity: ${formData.prepComplexity}
- Finish Quality: ${formData.finishQuality}
- Region: ${formData.region}
- Estimated Range: $${estimate.min.toLocaleString()} - $${estimate.max.toLocaleString()} CAD
- Preferred Contact: ${formData.preferredContact}
- Additional Notes: ${formData.notes}

Add-ons:
- Scaffolding: ${formData.scaffolding || "None"}
- Color Consultation: ${formData.colorConsultation ? "Yes" : "No"}
- Rush Scheduling: ${formData.rushScheduling ? "Yes" : "No"}
- Warranty Extension: ${formData.warrantyExtension ? "Yes" : "No"}
- Premium Site Cleanup: ${formData.siteCleanup ? "Yes" : "No"}
        `.trim(),
        submission_type: "estimate",
      });

      if (error) throw error;

      toast({
        title: "Estimate Request Submitted!",
        description: "We'll contact you within 24 hours to schedule a site visit.",
      });

      // Redirect to thank you or home page
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Error submitting estimate:", error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const estimate = calculateCurrentEstimate();

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Get a Free Estimate | Ascen Group Construction"
        description="Get an instant estimate for your painting or stucco project. Fast, accurate pricing with no obligation. Licensed and insured contractors serving the GTA."
        keywords="construction estimate, painting quote, stucco quote, free estimate, GTA contractors"
      />
      <Navigation />

      <main className="flex-1 pt-24 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
                Get Your Free Estimate
              </h1>
              <p className="text-lg text-muted-foreground">
                Answer a few quick questions to receive an instant estimate
              </p>
            </div>

            {/* Paint Calculator Tool */}
            <div className="mb-12">
              <PaintCalculator />
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-muted-foreground">
                  Step {currentStep} of {totalSteps}
                </span>
                <span className="text-sm font-medium text-primary">
                  {Math.round((currentStep / totalSteps) * 100)}% Complete
                </span>
              </div>
              <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
            </div>

            {/* Step Content */}
            <Card className="p-6 md:p-8 mb-6">
              {currentStep === 1 && (
                <EstimatorStep1
                  data={{
                    service: formData.service,
                    sqft: formData.sqft,
                    stories: formData.stories,
                  }}
                  onChange={handleInputChange}
                />
              )}

              {currentStep === 2 && (
                <EstimatorStep2
                  data={{
                    prepComplexity: formData.prepComplexity,
                    finishQuality: formData.finishQuality,
                    region: formData.region,
                  }}
                  onChange={handleInputChange}
                />
              )}

              {currentStep === 3 && (
                <EstimatorStep3
                  data={{
                    scaffolding: formData.scaffolding,
                    colorConsultation: formData.colorConsultation,
                    rushScheduling: formData.rushScheduling,
                    warrantyExtension: formData.warrantyExtension,
                    siteCleanup: formData.siteCleanup,
                  }}
                  sqft={parseInt(formData.sqft) || 0}
                  onChange={handleInputChange}
                />
              )}

              {currentStep === 4 && (
                <EstimatorStep4 estimate={estimate} formData={formData} />
              )}

              {currentStep === 5 && (
                <EstimatorStep5
                  data={{
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    preferredContact: formData.preferredContact,
                    notes: formData.notes,
                  }}
                  onChange={handleInputChange}
                />
              )}
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="min-w-[120px]"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  size="lg"
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="min-w-[120px] bg-secondary hover:bg-secondary/90"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={handleSubmit}
                  disabled={!canProceed() || isSubmitting}
                  className="min-w-[120px] bg-secondary hover:bg-secondary/90"
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      Submit Request
                      <CheckCircle className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Estimate;
