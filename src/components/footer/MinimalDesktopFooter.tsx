import { Link } from "react-router-dom";
import { Building2, Wrench, Sparkles, ChevronRight, Phone, Mail, MapPin, Linkedin } from "lucide-react";

interface MinimalDesktopFooterProps {
  companyLinks: Array<{ label: string; href: string }>;
  services: Array<{ name: string; slug: string; service_tier?: string }>;
  contactInfo: {
    phone?: string;
    email?: string;
    address?: string;
  };
  logoUrl?: string;
  serviceAreaText?: string;
  linkedinUrl?: string;
  foundedYear?: number;
}

export function MinimalDesktopFooter({
  companyLinks,
  services,
  contactInfo,
  logoUrl,
  serviceAreaText,
  linkedinUrl,
  foundedYear = 2009
}: MinimalDesktopFooterProps) {
  // Get top 6 services for display
  const topServices = services.slice(0, 6);

  return (
    <div className="hidden md:block">
      <div className="grid grid-cols-12 gap-8">
        
        {/* Column 1: Company */}
        <div className="col-span-3 space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="h-5 w-5 text-primary" />
            <h3 className="text-sm font-bold text-foreground">Company</h3>
          </div>
          <nav>
            <ul className="space-y-2">
              {companyLinks.slice(0, 5).map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Column 2: Top Services */}
        <div className="col-span-5 space-y-3">
          <div className="flex items-center gap-2 mb-4">
            <Wrench className="h-5 w-5 text-primary" />
            <h3 className="text-sm font-bold text-foreground">Envelope & Restoration Services</h3>
          </div>
          <nav>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {topServices.map((service, index) => (
                <li key={index}>
                  <Link 
                    to={`/services/${service.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors line-clamp-1"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="pt-4 border-t border-border/50">
            <Link 
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
            >
              View All Services
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Column 3: Get Started */}
        <div className="col-span-4 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-primary" />
            <h3 className="text-sm font-bold text-foreground">Get Started</h3>
          </div>
          
          {/* Primary CTA */}
          <Link 
            to="/estimate"
            className="block w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors px-4 py-3 rounded-md text-center font-semibold"
          >
            Request a Proposal
          </Link>
          
          {/* Secondary CTA */}
          <Link 
            to="/emergency-maintenance"
            className="block w-full border border-border hover:bg-muted/50 transition-colors px-4 py-2 rounded-md text-center text-sm"
          >
            Emergency Services (48-72h)
          </Link>
        </div>
      </div>
      
      {/* Contact Information Bar - Above Legal */}
      <div className="mt-12 pt-6 border-t border-border/50">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
          {contactInfo.address && (
            <>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                <span>{contactInfo.address}</span>
              </div>
              <span>•</span>
            </>
          )}
          {contactInfo.phone && (
            <>
              <a 
                href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                {contactInfo.phone}
              </a>
              <span>•</span>
            </>
          )}
          {contactInfo.email && (
            <>
              <a 
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <Mail className="h-3.5 w-3.5" />
                {contactInfo.email}
              </a>
              <span>•</span>
            </>
          )}
          {linkedinUrl && (
            <>
              <a 
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-3.5 w-3.5" />
                <span>LinkedIn</span>
              </a>
              <span>•</span>
            </>
          )}
          <span>Mon-Fri: 7am-6pm EST</span>
          <span>•</span>
          <span>Emergency: 24/7</span>
        </div>
      </div>
      
      {/* Simplified Legal Section */}
      <div className="mt-6 pt-6 border-t border-border/50">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <div className="text-center md:text-left">
            <p>
              © {new Date().getFullYear()} Ascent Group Construction • Ontario Licensed & Insured • WSIB Compliant
            </p>
          </div>
          <nav className="flex gap-6">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
            <Link to="/accessibility" className="hover:text-primary transition-colors">Accessibility</Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
