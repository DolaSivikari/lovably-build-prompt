import { useState, useEffect } from "react";
import { Phone, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useCompanySettings } from "@/hooks/useCompanySettings";
import { useContactValidation } from "@/utils/devContactValidation";

const MobileStickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { settings } = useCompanySettings();

  // Development-only validation
  useContactValidation("MobileStickyCTA", [settings]);

  const telLink = settings?.phone ? `tel:${settings.phone}` : "#";

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if mobile menu is open
  useEffect(() => {
    const checkMobileMenu = () => {
      setIsMobileMenuOpen(document.body.dataset.mobileMenuOpen === "true");
    };

    // Initial check
    checkMobileMenu();

    // Observe changes to body data attribute
    const observer = new MutationObserver(checkMobileMenu);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-mobile-menu-open"],
    });

    return () => observer.disconnect();
  }, []);

  // Hide on /estimate route or when mobile menu is open
  const shouldHide = location.pathname === "/estimate" || isMobileMenuOpen;

  return (
    <div
      className={cn(
        "mobile-sticky-cta fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300",
        isVisible && !shouldHide ? "translate-y-0" : "translate-y-full",
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="bg-background/95 backdrop-blur-md border-t border-border shadow-lg px-4 py-3 safe-area-bottom">
        <div className="flex gap-3">
          <Button
            asChild
            size="lg"
            className="flex-1 gap-2 min-h-[48px]"
            variant="default"
          >
            <a href={telLink}>
              <Phone className="h-5 w-5" />
              <span className="text-sm">Call Now</span>
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            className="flex-1 gap-2 min-h-[48px]"
            variant="secondary"
          >
            <Link to="/estimate">
              <MessageSquare className="h-5 w-5" />
              <span className="text-sm">Request Proposal</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileStickyCTA;
