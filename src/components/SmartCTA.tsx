import { useState, useEffect } from "react";
import { Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useCompanySettings } from "@/hooks/useCompanySettings";
import { cn } from "@/lib/utils";

/**
 * SmartCTA - Unified call-to-action component for mobile and desktop
 * 
 * Mobile: Sticky bottom bar with call and proposal buttons
 * Desktop: Floating action button (FAB) in bottom-right corner
 * 
 * Appears after scrolling 300px and adapts to screen size automatically
 */
export default function SmartCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { settings } = useCompanySettings();

  // Hide CTA on estimate page
  if (location.pathname === '/estimate') {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Watch for mobile menu state via body attribute
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isOpen = document.body.getAttribute('data-mobile-menu-open') === 'true';
      setIsMobileMenuOpen(isOpen);
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-mobile-menu-open']
    });

    return () => observer.disconnect();
  }, []);

  const phoneNumber = settings?.phone || "+1-647-490-6659";

  // Don't show when mobile menu is open
  if (isMobileMenuOpen) {
    return null;
  }

  return (
    <>
      {/* Mobile Sticky Bar */}
      <div 
        className={cn(
          "md:hidden fixed bottom-0 left-0 right-0 z-40",
          "bg-background/95 backdrop-blur-lg border-t border-border/50",
          "shadow-lg transform transition-transform duration-300",
          "safe-bottom",
          isVisible ? "translate-y-0" : "translate-y-full"
        )}
        role="region"
        aria-label="Quick contact actions"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 gap-2"
              asChild
            >
              <a href={`tel:${phoneNumber.replace(/\D/g, '')}`}>
                <Phone className="h-4 w-4" />
                Call Now
              </a>
            </Button>
            <Button
              size="lg"
              className="flex-[1.5] gap-2"
              asChild
            >
              <Link to="/contact">
                Request Site Assessment
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Floating Action Button (FAB) */}
      <div 
        className={cn(
          "hidden md:block fixed bottom-8 right-8 z-40",
          "transform transition-all duration-300",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col gap-3">
          {/* Call Button */}
          <Button
            variant="outline"
            size="icon"
            className="h-14 w-14 rounded-full shadow-xl hover:shadow-2xl bg-background/95 backdrop-blur-lg border-2 hover:border-primary/50 transition-all hover:scale-110 group"
            asChild
          >
            <a 
              href={`tel:${phoneNumber.replace(/\D/g, '')}`}
              aria-label="Call us"
              title="Call us"
            >
              <Phone className="h-5 w-5 group-hover:text-primary transition-colors" />
            </a>
          </Button>

          {/* Proposal Button - Primary Action */}
          <Button
            size="lg"
            className="h-14 px-6 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105 group gap-2"
            asChild
          >
            <Link to="/contact">
              <span className="hidden lg:inline">Request Site Assessment</span>
              <span className="lg:hidden">Get Quote</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
