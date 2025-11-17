import { Link } from "react-router-dom";
import { Building2, Wrench, Phone, Mail, MapPin, Linkedin, Sparkles, ChevronRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LucideIcon } from "lucide-react";

interface UnifiedFooterProps {
  companyLinks: Array<{ label: string; href: string }>;
  services: Array<{ name: string; slug: string; service_tier?: string }>;
  marketLinks: Array<{ label: string; href: string }>;
  projectLinks: Array<{ label: string; href: string }>;
  contactInfo: {
    phone?: string;
    email?: string;
    address?: string;
  };
  certifications: Array<{
    icon: LucideIcon;
    title: string;
    subtitle: string;
  }>;
  displayTrustItems: boolean;
  trustBarItems: Array<{
    label: string;
    value: string;
  }>;
  logoUrl?: string;
  serviceAreaText?: string;
  linkedinUrl?: string;
  foundedYear?: number;
}

export function UnifiedFooter({
  companyLinks,
  services,
  marketLinks,
  projectLinks,
  contactInfo,
  logoUrl,
  serviceAreaText,
  linkedinUrl,
  foundedYear = 2009
}: UnifiedFooterProps) {
  const topServices = services.slice(0, 6);
  const allNavLinks = [
    { label: "Why Specialty Contractor?", href: "/why-specialty-contractor" },
    ...companyLinks.slice(0, 5),
    ...marketLinks,
    ...projectLinks
  ];

  return (
    <div className="space-y-6">
      {/* Mobile: Accordion Layout */}
      <div className="md:hidden space-y-3">
        {/* Logo and Service Area */}
        {logoUrl && (
          <div className="text-center pb-4 border-b border-accent/20">
            <Link to="/" className="inline-block mb-3">
              <img src={logoUrl} alt="Ascent Group Construction" width={112} height={56} className="h-14 w-auto mx-auto" />
            </Link>
            {serviceAreaText && (
              <p className="text-xs text-foreground/80">
                {serviceAreaText}
              </p>
            )}
          </div>
        )}
        
        <Accordion type="single" collapsible className="space-y-3">
          {/* Navigation Section */}
          <AccordionItem 
            value="navigation" 
            className="bg-gradient-to-br from-primary/95 to-primary backdrop-blur-sm rounded-lg border border-accent/20 overflow-hidden shadow-lg shadow-primary/10"
          >
            <AccordionTrigger className="px-4 py-3.5 hover:no-underline hover:bg-primary/90 transition-all [&[data-state=open]]:bg-primary/90 [&[data-state=open]]:border-b [&[data-state=open]]:border-accent/30">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-md bg-accent/20">
                  <Building2 className="h-4 w-4 text-accent" />
                </div>
                <span className="font-semibold text-foreground">Navigation</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2">
              <nav className="space-y-1">
                {allNavLinks.map((link, index) => (
                  <Link 
                    key={index}
                    to={link.href}
                    className="block py-2 text-sm text-foreground/80 hover:text-accent transition-colors active:scale-[0.98]"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </AccordionContent>
          </AccordionItem>
          
          {/* Services Section */}
          <AccordionItem 
            value="services" 
            className="bg-gradient-to-br from-steel-blue/20 to-steel-blue/10 backdrop-blur-sm rounded-lg border border-accent/20 overflow-hidden shadow-lg shadow-steel-blue/10"
          >
            <AccordionTrigger className="px-4 py-3.5 hover:no-underline hover:bg-steel-blue/30 transition-all [&[data-state=open]]:bg-steel-blue/30 [&[data-state=open]]:border-b [&[data-state=open]]:border-accent/30">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-md bg-steel-blue/30">
                  <Wrench className="h-4 w-4 text-steel-blue" />
                </div>
                <span className="font-semibold text-foreground">Services</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4 pt-2">
              <nav className="grid grid-cols-2 gap-2">
                {topServices.map((service, index) => (
                  <Link 
                    key={index}
                    to={`/services/${service.slug}`}
                    className="py-2 text-sm text-muted-foreground hover:text-primary transition-colors line-clamp-2"
                  >
                    {service.name}
                  </Link>
                ))}
              </nav>
              <Link 
                to="/services"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors mt-3"
              >
                View All Services
                <ChevronRight className="h-4 w-4" />
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Contact Info Cards */}
        <div className="space-y-3 pt-4 border-t border-accent/20">
          {contactInfo.phone && (
            <a 
              href={`tel:${contactInfo.phone.replace(/\D/g, '')}`} 
              className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 hover:border-accent/40 transition-all active:scale-[0.98] min-h-[48px]"
            >
              <div className="p-2 rounded-md bg-accent/20">
                <Phone className="h-4 w-4 text-accent flex-shrink-0" />
              </div>
              <span className="text-sm font-medium text-accent">{contactInfo.phone}</span>
            </a>
          )}
          {contactInfo.email && (
            <a 
              href={`mailto:${contactInfo.email}`} 
              className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 hover:border-accent/40 transition-all active:scale-[0.98] min-h-[48px]"
            >
              <div className="p-2 rounded-md bg-accent/20">
                <Mail className="h-4 w-4 text-accent flex-shrink-0" />
              </div>
              <span className="text-sm font-medium text-accent break-all">{contactInfo.email}</span>
            </a>
          )}
          {contactInfo.address && (
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-primary/50 to-primary/40 border border-accent/20">
              <div className="p-2 rounded-md bg-accent/20">
                <MapPin className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
              </div>
              <span className="text-sm text-foreground/80">{contactInfo.address}</span>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center gap-4 pt-4 border-t border-accent/20 text-xs">
          {linkedinUrl && (
            <a 
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-steel-blue/20 to-steel-blue/10 border border-steel-blue/30 hover:border-steel-blue/50 transition-all active:scale-[0.98] min-h-[44px]"
              aria-label="Visit our LinkedIn page"
            >
              <div className="p-1.5 rounded-md bg-steel-blue/30">
                <Linkedin className="h-4 w-4 text-steel-blue" />
              </div>
              <span className="text-sm font-medium text-steel-blue">Follow us on LinkedIn</span>
            </a>
          )}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-foreground/70">
            <span className="font-medium">© {foundedYear}-{new Date().getFullYear()} Ascent Group</span>
            <Link to="/privacy-policy" className="hover:text-accent transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-accent transition-colors">Terms</Link>
          </div>
        </div>
      </div>

      {/* Desktop: Grid Layout */}
      <div className="hidden md:block">
        <div className="grid grid-cols-12 gap-6">
          {/* Column 1: Company */}
          <div className="col-span-3 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="h-5 w-5 text-primary" />
              <h3 className="text-sm font-bold text-foreground">Company</h3>
            </div>
            <nav>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/why-specialty-contractor"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    Why Specialty Contractor?
                  </Link>
                </li>
                {companyLinks.slice(0, 4).map((link, index) => (
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

          {/* Column 2: Services */}
          <div className="col-span-5 space-y-3">
            <div className="flex items-center gap-2 mb-2">
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
            <div className="pt-3 border-t border-border/50">
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
          <div className="col-span-4 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="text-sm font-bold text-foreground">Get Started</h3>
            </div>
            
            <Link 
              to="/estimate"
              className="block w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors px-4 py-3 rounded-md text-center font-semibold"
            >
              Request a Proposal
            </Link>
            
            <Link 
              to="/contact"
              className="block w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors px-4 py-3 rounded-md text-center font-semibold"
            >
              Contact Us
            </Link>
            
            <div className="pt-4 space-y-2">
              {contactInfo.phone && (
                <a 
                  href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  {contactInfo.phone}
                </a>
              )}
              {contactInfo.email && (
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  {contactInfo.email}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-border/50 text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>© {foundedYear}-{new Date().getFullYear()} Ascent Group Construction</span>
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
          {linkedinUrl && (
            <a 
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              aria-label="Visit our LinkedIn page"
            >
              <Linkedin className="h-4 w-4" />
              Follow us on LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
