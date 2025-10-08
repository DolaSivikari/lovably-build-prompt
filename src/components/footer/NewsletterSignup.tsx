import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Successfully subscribed to our newsletter!");
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="footer-glass-card p-8 mb-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Mail className="h-5 w-5 text-secondary" />
          <h3 className="text-xl font-semibold text-primary-foreground">Stay Updated</h3>
        </div>
        <p className="text-primary-foreground/70 text-sm mb-6">
          Get the latest construction industry insights, project updates, and expert tips delivered to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
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

export default NewsletterSignup;
