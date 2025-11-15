import { useState, useEffect } from "react";
import { X, Phone, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/ui/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export const ExitIntentPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if already shown in this session
    const shownInSession = sessionStorage.getItem("exitIntentShown");
    if (shownInSession) {
      setHasShown(true);
      return;
    }

    let mouseLeaveTimeout: NodeJS.Timeout;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse is leaving from top of page
      if (e.clientY <= 50 && !hasShown) {
        mouseLeaveTimeout = setTimeout(() => {
          setIsOpen(true);
          setHasShown(true);
          sessionStorage.setItem("exitIntentShown", "true");
        }, 300);
      }
    };

    const handleMouseEnter = () => {
      clearTimeout(mouseLeaveTimeout);
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      clearTimeout(mouseLeaveTimeout);
    };
  }, [hasShown]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        <div className="relative">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-construction-orange/10 via-background to-construction-orange/5" />
          
          {/* Content */}
          <div className="relative p-8">
            <DialogHeader className="space-y-4">
              <DialogTitle className="text-3xl font-bold text-foreground">
                Wait! Before You Go...
              </DialogTitle>
              <p className="text-lg text-muted-foreground">
                Get a <span className="text-construction-orange font-semibold">FREE consultation</span> and see how we can help protect your building investment.
              </p>
            </DialogHeader>

            {/* Value Props */}
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-construction-orange/10 mt-1">
                  <ArrowRight className="w-4 h-4 text-construction-orange" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">No-Obligation Quote</div>
                  <div className="text-sm text-muted-foreground">Free assessment of your project needs</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-construction-orange/10 mt-1">
                  <ArrowRight className="w-4 h-4 text-construction-orange" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">24-Hour Response</div>
                  <div className="text-sm text-muted-foreground">We'll get back to you within one business day</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-construction-orange/10 mt-1">
                  <ArrowRight className="w-4 h-4 text-construction-orange" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Expert Guidance</div>
                  <div className="text-sm text-muted-foreground">15+ years of building envelope expertise</div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="flex-1"
              >
                <Link to="/estimate">
                  <Mail className="w-4 h-4 mr-2" />
                  Get Free Quote
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="flex-1"
              >
                <a href="tel:6475286804">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now: (647) 528-6804
                </a>
              </Button>
            </div>

            {/* Social Proof */}
            <div className="mt-6 pt-6 border-t border-border">
              <div className="text-center text-sm text-muted-foreground">
                Join <span className="font-semibold text-foreground">500+ satisfied clients</span> who trusted us with their projects
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
