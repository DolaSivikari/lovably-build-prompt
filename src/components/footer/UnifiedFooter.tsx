import { Link } from "react-router-dom";
import { Building2, Wrench, Phone, Mail, MapPin, Linkedin, Sparkles, ChevronRight, ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LucideIcon } from "lucide-react";
import ascentLogoLight from "@/assets/ascent-logo-horizontal-light.png";

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
    <div className="relative">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10 -z-10" />
      
      <div className="space-y-8">
      {/* Logo and Service Area Header - Visible on all screens */}
      <div className="text-center md:text-left pb-6 border-b border-border/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Link to="/" className="inline-block group">
              <img 
                src={ascentLogoLight} 
                alt="Ascent Group Construction" 
                className="h-16 md:h-20 w-auto mx-auto md:mx-0 hover-scale transition-transform duration-300 brightness-0 dark:brightness-100"
              />
            </Link>
            {serviceAreaText && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <p>{serviceAreaText}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile: Accordion Layout */}
      <div className="md:hidden space-y-3 px-6">
        <Accordion type="single" collapsible className="space-y-3">
          {/* Navigation Section */}
          <AccordionItem value="navigation" className="bg-gradient-to-br from-muted/40 to-muted/20 rounded-xl border border-border/30 overflow-hidden shadow-sm">
            <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/40 transition-all [&[data-state=open]]:bg-muted/40">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <span className="font-bold text-foreground">Navigation</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-4 pt-2 bg-gradient-to-b from-muted/10 to-transparent">
              <nav className="space-y-0.5">
                {allNavLinks.map((link, index) => (
                  <Link 
                    key={index}
                    to={link.href}
                    className="group flex items-center gap-2 py-2.5 px-3 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
                  >
                    <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -ml-1 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                ))}
              </nav>
            </AccordionContent>
          </AccordionItem>
          
          {/* Services Section */}
          <AccordionItem value="services" className="bg-gradient-to-br from-muted/40 to-muted/20 rounded-xl border border-border/30 overflow-hidden shadow-sm">
            <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/40 transition-all [&[data-state=open]]:bg-muted/40">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Wrench className="h-5 w-5 text-primary" />
                </div>
                <span className="font-bold text-foreground">Services</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-4 pt-2 bg-gradient-to-b from-muted/10 to-transparent">
              <nav className="grid grid-cols-2 gap-2">
                {topServices.map((service, index) => (
                  <Link 
                    key={index}
                    to={`/services/${service.slug}`}
                    className="group py-2.5 px-3 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all line-clamp-2"
                  >
                    {service.name}
                  </Link>
                ))}
              </nav>
              <Link 
                to="/services"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors mt-4 pt-4 border-t border-border/30"
              >
                View All Services
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Contact Info */}
        <div className="space-y-2 pt-4 border-t border-border/20">
          {contactInfo.phone && (
            <a 
              href={`tel:${contactInfo.phone.replace(/\D/g, '')}`} 
              className="group flex items-center gap-3 p-3 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
            >
              <Phone className="h-4 w-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span className="font-medium">{contactInfo.phone}</span>
            </a>
          )}
          {contactInfo.email && (
            <a 
              href={`mailto:${contactInfo.email}`} 
              className="group flex items-center gap-3 p-3 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
            >
              <Mail className="h-4 w-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span className="break-all font-medium">{contactInfo.email}</span>
            </a>
          )}
          {contactInfo.address && (
            <div className="flex items-start gap-3 p-3 rounded-lg text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5 text-primary" />
              <span className="leading-relaxed">{contactInfo.address}</span>
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center gap-4 pt-6 mt-6 border-t border-border/20 text-xs text-muted-foreground">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <span className="font-medium">© {foundedYear}-{new Date().getFullYear()} Ascent Group</span>
            <Link to="/privacy-policy" className="hover:text-primary transition-colors font-medium">Privacy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors font-medium">Terms</Link>
          </div>
          {linkedinUrl && (
            <a 
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
              aria-label="Visit our LinkedIn page"
            >
              <Linkedin className="h-4 w-4 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">Follow us</span>
            </a>
          )}
        </div>
      </div>
      </div>

      {/* Desktop: Grid Layout */}
      <div className="hidden md:block px-6">
        <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          {/* Column 1: Company */}
          <div className="col-span-12 md:col-span-3 space-y-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-base font-bold text-foreground">Company</h3>
            </div>
            <nav>
              <ul className="space-y-1">
                <li>
                  <Link 
                    to="/why-specialty-contractor"
                    className="group flex items-center gap-2 py-2 px-3 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
                  >
                    <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -ml-1 group-hover:ml-0 transition-all" />
                    Why Specialty Contractor?
                  </Link>
                </li>
                {companyLinks.slice(0, 4).map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.href}
                      className="group flex items-center gap-2 py-2 px-3 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all"
                    >
                      <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -ml-1 group-hover:ml-0 transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 2: Services */}
          <div className="col-span-12 md:col-span-5 space-y-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Wrench className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-base font-bold text-foreground">Envelope & Restoration Services</h3>
            </div>
            <nav>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                {topServices.map((service, index) => (
                  <li key={index}>
                    <Link 
                      to={`/services/${service.slug}`}
                      className="group flex items-center gap-2 py-2 px-3 rounded-lg text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all line-clamp-1"
                    >
                      <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 flex-shrink-0 -ml-1 group-hover:ml-0 transition-all" />
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="pt-4 border-t border-border/20">
              <Link 
                to="/services"
                className="group inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
              >
                View All Services
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Column 3: Get Started */}
          <div className="col-span-12 md:col-span-4 space-y-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-base font-bold text-foreground">Get Started</h3>
            </div>
            
            <Link 
              to="/estimate"
              className="group block w-full bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary transition-all px-6 py-4 rounded-xl text-center font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="flex items-center justify-center gap-2">
                Request a Proposal
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link 
              to="/emergency-maintenance"
              className="group block w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all px-6 py-4 rounded-xl text-center font-bold hover:scale-[1.02] active:scale-[0.98]"
            >
              Emergency Service
            </Link>
            
            <div className="pt-4 space-y-2 bg-gradient-to-br from-muted/30 to-muted/10 rounded-xl p-4 border border-border/20">
              {contactInfo.phone && (
                <a 
                  href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}
                  className="group flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">{contactInfo.phone}</span>
                </a>
              )}
              {contactInfo.email && (
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="group flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold">{contactInfo.email}</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 mt-8 border-t border-border/20 text-sm text-muted-foreground">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2">
            <span className="font-medium">© {foundedYear}-{new Date().getFullYear()} Ascent Group Construction</span>
            <Link to="/privacy-policy" className="hover:text-primary transition-colors font-medium">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors font-medium">Terms of Service</Link>
          </div>
          {linkedinUrl && (
            <a 
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all font-semibold"
              aria-label="Visit our LinkedIn page"
            >
              <Linkedin className="h-4 w-4 group-hover:scale-110 transition-transform" />
              Follow us on LinkedIn
            </a>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
