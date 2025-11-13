import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CheckCircle2, ArrowRight, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Service {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  icon_name: string;
}

interface QuizResultsProps {
  recommendedServices: Service[];
  answers: Record<string, string>;
  onRestart: () => void;
}

export const QuizResults = ({ recommendedServices, answers, onRestart }: QuizResultsProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSaveResults = async () => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email to save results",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("quiz_submissions").insert({
        answers,
        recommended_services: recommendedServices.map(s => s.name),
        user_email: email,
      });

      if (error) throw error;

      toast({
        title: "Results saved!",
        description: "We'll send you more information about these services.",
      });
    } catch (error) {
      console.error("Error saving quiz results:", error);
      toast({
        title: "Error",
        description: "Failed to save results. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-4xl mx-auto px-6"
    >
      {/* Success Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4"
        >
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </motion.div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Perfect! Here's What You Need
        </h2>
        <p className="text-lg text-muted-foreground">
          Based on your answers, we recommend these services:
        </p>
      </div>

      {/* Recommended Services */}
      <div className="space-y-4 mb-8">
        {recommendedServices.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {service.name}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {service.short_description}
                </p>
                <Link to={`/services/${service.slug}`}>
                  <Button variant="outline" size="sm" className="group">
                    Learn More
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Email Capture */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="p-6 rounded-xl border border-border bg-muted/30"
      >
        <div className="flex items-start gap-3 mb-4">
          <Mail className="w-5 h-5 text-primary mt-1" />
          <div>
            <h3 className="text-lg font-semibold mb-1 text-foreground">
              Get Your Custom Quote
            </h3>
            <p className="text-sm text-muted-foreground">
              Enter your email to receive detailed information and a personalized quote for these services.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
          />
          <Button 
            onClick={handleSaveResults}
            disabled={isSubmitting}
            className="sm:w-auto"
          >
            {isSubmitting ? "Sending..." : "Send Me Quote"}
          </Button>
        </div>
      </motion.div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center">
        <Button variant="outline" onClick={onRestart}>
          Retake Quiz
        </Button>
        <Link to="/contact">
          <Button>
            Contact Us Directly
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};
