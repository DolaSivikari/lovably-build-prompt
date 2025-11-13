import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuizQuestion } from "./QuizQuestion";
import { QuizResults } from "./QuizResults";
import { supabase } from "@/integrations/supabase/client";
import { trackConversion } from "@/lib/analytics";

interface Service {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  icon_name: string;
  category: string;
}

interface QuizData {
  question: string;
  options: Array<{
    value: string;
    label: string;
    icon: string;
    description?: string;
  }>;
}

const quizQuestions: QuizData[] = [
  {
    question: "What type of project are you planning?",
    options: [
      { value: "new", label: "New Construction", icon: "Building2", description: "Ground-up building project" },
      { value: "renovation", label: "Renovation", icon: "Hammer", description: "Updating existing space" },
      { value: "restoration", label: "Restoration", icon: "PaintBucket", description: "Restoring heritage building" },
      { value: "addition", label: "Addition", icon: "HardHat", description: "Expanding current structure" },
    ],
  },
  {
    question: "What's the scope of your project?",
    options: [
      { value: "single", label: "Single Service", icon: "CheckCircle2", description: "One specific trade" },
      { value: "multiple", label: "Multiple Services", icon: "Hammer", description: "Several coordinated trades" },
      { value: "turnkey", label: "Turnkey Project", icon: "Building2", description: "Complete start to finish" },
      { value: "consulting", label: "Just Consulting", icon: "HardHat", description: "Expert advice only" },
    ],
  },
  {
    question: "What's your project timeline?",
    options: [
      { value: "immediate", label: "Immediate", icon: "Clock", description: "Ready to start now" },
      { value: "3-6months", label: "3-6 Months", icon: "Clock", description: "Planning phase" },
      { value: "6-12months", label: "6-12 Months", icon: "Clock", description: "Long-term planning" },
      { value: "exploring", label: "Just Exploring", icon: "Clock", description: "Gathering information" },
    ],
  },
  {
    question: "What type of building?",
    options: [
      { value: "commercial", label: "Commercial", icon: "Building2", description: "Office, retail, etc." },
      { value: "residential", label: "Multi-Family", icon: "Building2", description: "Apartments, condos" },
      { value: "industrial", label: "Industrial", icon: "HardHat", description: "Warehouse, factory" },
      { value: "institutional", label: "Institutional", icon: "Building2", description: "Schools, hospitals" },
    ],
  },
  {
    question: "What's your biggest concern?",
    options: [
      { value: "quality", label: "Quality", icon: "CheckCircle2", description: "Top-tier workmanship" },
      { value: "budget", label: "Budget", icon: "DollarSign", description: "Cost-effective solution" },
      { value: "timeline", label: "Timeline", icon: "Clock", description: "On-time completion" },
      { value: "compliance", label: "Compliance", icon: "HardHat", description: "Codes & regulations" },
    ],
  },
];

interface InteractiveQuizProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InteractiveQuiz = ({ isOpen, onClose }: InteractiveQuizProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [recommendedServices, setRecommendedServices] = useState<Service[]>([]);
  const [allServices, setAllServices] = useState<Service[]>([]);

  // Load services
  useEffect(() => {
    const loadServices = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("id, name, slug, short_description, icon_name, category")
        .eq("publish_state", "published")
        .order("name");

      if (!error && data) {
        setAllServices(data);
      }
    };

    if (isOpen) {
      loadServices();
      trackConversion("quiz_started");
    }
  }, [isOpen]);

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentStep]: value };
    setAnswers(newAnswers);

    // Auto-advance after a short delay
    setTimeout(() => {
      if (currentStep < quizQuestions.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // Calculate recommendations
        calculateRecommendations(newAnswers);
      }
    }, 300);
  };

  const calculateRecommendations = (finalAnswers: Record<string, string>) => {
    // Simple recommendation logic based on answers
    const projectType = finalAnswers[0];
    const scope = finalAnswers[1];
    const buildingType = finalAnswers[3];

    let recommended: Service[] = [];

    // Filter services based on answers
    if (scope === "turnkey") {
      // Recommend multiple services for turnkey projects
      recommended = allServices.slice(0, 4);
    } else if (scope === "consulting") {
      // Recommend consulting-type services
      recommended = allServices.filter(s => 
        s.category?.includes("Consulting") || 
        s.category?.includes("Management")
      ).slice(0, 3);
    } else if (projectType === "new") {
      // New construction - structural services
      recommended = allServices.filter(s => 
        s.category?.includes("Structural") || 
        s.category?.includes("Foundation") ||
        s.category?.includes("Framing")
      ).slice(0, 3);
    } else if (projectType === "restoration") {
      // Restoration - specialized services
      recommended = allServices.filter(s => 
        s.category?.includes("Restoration") || 
        s.category?.includes("Masonry")
      ).slice(0, 3);
    } else {
      // Default recommendations
      recommended = allServices.slice(0, 3);
    }

    // Ensure we always have at least 3 recommendations
    if (recommended.length < 3) {
      recommended = [...recommended, ...allServices].slice(0, 3);
    }

    setRecommendedServices(recommended);
    setShowResults(true);
    trackConversion("quiz_completed", { answers: finalAnswers });
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
    trackConversion("quiz_restarted");
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset after animation
    setTimeout(() => {
      setCurrentStep(0);
      setAnswers({});
      setShowResults(false);
    }, 300);
  };

  const progress = ((currentStep + 1) / quizQuestions.length) * 100;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50"
          />

          {/* Quiz Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-5xl bg-background rounded-2xl shadow-2xl border border-border overflow-hidden pointer-events-auto"
            >
              {/* Header */}
              <div className="relative border-b border-border p-6">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClose}
                  className="absolute top-4 right-4"
                >
                  <X className="w-5 h-5" />
                </Button>

                <h1 className="text-2xl font-bold text-foreground mb-2">
                  {showResults ? "Your Recommended Services" : "Find Your Perfect Services"}
                </h1>
                
                {!showResults && (
                  <>
                    <p className="text-muted-foreground">
                      Question {currentStep + 1} of {quizQuestions.length}
                    </p>
                    
                    {/* Progress Bar */}
                    <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                        className="h-full bg-primary"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Content */}
              <div className="p-8 min-h-[500px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {showResults ? (
                    <QuizResults
                      key="results"
                      recommendedServices={recommendedServices}
                      answers={answers}
                      onRestart={handleRestart}
                    />
                  ) : (
                    <QuizQuestion
                      key={currentStep}
                      question={quizQuestions[currentStep].question}
                      options={quizQuestions[currentStep].options}
                      onSelect={handleAnswer}
                      selectedValue={answers[currentStep]}
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              {!showResults && (
                <div className="border-t border-border p-6 flex justify-between">
                  <Button
                    variant="ghost"
                    onClick={handleBack}
                    disabled={currentStep === 0}
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={handleClose}
                  >
                    Skip Quiz
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
