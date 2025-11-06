import { useState, useRef } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().trim().email("Invalid email address").max(255),
});

const NewsletterBackend = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent duplicate submissions
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setIsSubmitting(true);

    try {
      // Validate email
      const validatedData = emailSchema.parse({ email });

      // Insert into newsletter_subscribers table
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({
          email: validatedData.email.toLowerCase(),
          source: "footer",
          subscribed_at: new Date().toISOString(),
        });

      if (error) {
        // Check for duplicate email
        if (error.code === "23505") {
          toast.info("You're already subscribed to our newsletter!");
        } else {
          throw error;
        }
      } else {
        toast.success("Successfully subscribed to our newsletter!");
      }

      setEmail("");
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Failed to subscribe. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
      isSubmittingRef.current = false;
    }
  };

  return (
    <div className="footer-glass-card p-6 mb-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Mail className="h-5 w-5 text-secondary" />
          <h3 className="text-lg font-semibold text-primary-foreground">Stay Updated</h3>
        </div>
        <p className="text-primary-foreground/70 text-sm mb-4">
          Get the latest construction industry insights, project updates, and expert tips delivered to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="footer-newsletter-input flex-1"
            required
            aria-label="Email address for newsletter"
          />
          <Button 
            type="submit" 
            variant="secondary"
            disabled={isSubmitting}
            className="whitespace-nowrap"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterBackend;
