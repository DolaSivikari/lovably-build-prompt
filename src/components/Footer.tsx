import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, Shield, Award, FileCheck, Building2 } from "lucide-react";
import ascentLogo from "@/assets/ascent-logo.png";
import SEO from "@/components/SEO";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";

const Footer = () => {
  const [siteSettings, setSiteSettings] = useState<any>(null);
  const [footerSettings, setFooterSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const [siteData, footerData] = await Promise.all([
          supabase.from('site_settings').select('*').eq('is_active', true).single(),
          supabase.from('footer_settings').select('*').eq('is_active', true).single()
        ]);
        
        if (siteData.data) setSiteSettings(siteData.data);
        if (footerData.data) setFooterSettings(footerData.data);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Use database settings with fallbacks
  const quickLinks = (footerSettings?.quick_links as any[]) || [
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "About Us", href: "/about" },
    { label: "Our Process", href: "/our-process" },
    { label: "Certifications", href: "/company/certifications-insurance" },
    { label: "Equipment", href: "/company/equipment-resources" },
    { label: "Blog", href: "/blog" },
  ];

  const sectorsLinks = (footerSettings?.sectors_links as any[]) || [
    { label: "Homeowners", href: "/homeowners" },
    { label: "Property Managers", href: "/property-managers" },
    { label: "Commercial Clients", href: "/commercial-clients" },
    { label: "Service Areas", href: "/resources/service-areas" },
    { label: "Contractor Portal", href: "/resources/contractor-portal" },
    { label: "Careers", href: "/careers" },
  ];

  const contactInfo = footerSettings?.contact_info || {};
  const socialMedia = footerSettings?.social_media || {};
  const trustBarData = (footerSettings?.trust_bar_items as any[]) || [
    { label: "$5M Liability Insurance" },
    { label: "WSIB Compliant" },
    { label: "Licensed & Bonded" },
    { label: "15+ Years Experience" }
  ];

  const address = siteSettings?.address || contactInfo.address || 'Greater Toronto Area, Ontario';
  const phone = siteSettings?.phone || contactInfo.phone || '(416) 555-1234';
  const email = siteSettings?.email || contactInfo.email || 'info@ascentgroupconstruction.com';
  const linkedinUrl = socialMedia.linkedin || 'https://www.linkedin.com/company/ascent-group-construction';
  const facebookUrl = socialMedia.facebook || 'https://www.facebook.com/ascentgroupconstruction';
  const twitterUrl = socialMedia.twitter || 'https://twitter.com/ascentgroupca';
  const instagramUrl = socialMedia.instagram || 'https://www.instagram.com/ascentgroupconstruction';

  // Enhanced ProfessionalService schema
  const citationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://ascentgroupconstruction.com/#organization",
    name: "Ascent Group Construction",
    image: "https://ascentgroupconstruction.com/og-image.jpg",
    email: "info@ascentgroupconstruction.com",
    areaServed: {
      "@type": "State",
      name: "Ontario",
      "@id": "https://en.wikipedia.org/wiki/Ontario"
    },
    address: {
      "@type": "PostalAddress",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "16:00",
      },
    ],
    serviceType: [
      "General Contracting",
      "Construction Management",
      "Design-Build Services",
      "Commercial Construction",
      "Multi-Family Construction",
      "Institutional Projects",
      "Exterior Restoration",
      "Building Envelope Systems"
    ],
    priceRange: "$$-$$$",
  };

  // Show loading skeleton
  if (loading) {
    return (
      <>
        <SEO structuredData={citationSchema} />
        <footer className="w-full bg-white border-t border-border relative" role="contentinfo">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </div>
          </div>
        </footer>
      </>
    );
  }

  return (
    <>
      <SEO structuredData={citationSchema} />
      <footer className="w-full bg-white border-t border-border relative" role="contentinfo">
        
        {/* Enhanced Trust Bar with Certifications */}
        <div className="border-b border-border bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-6">
              {trustBarData.map((item: any, index: number) => (
                <div key={index} className="flex flex-col items-center text-center gap-2 p-3 rounded-lg bg-card/50 border border-border/50 hover:border-accent/30 hover:shadow-sm transition-all">
                  <Shield className="h-5 w-5 text-accent" />
                  <span className="font-semibold text-foreground text-xs">{item.label || item.value}</span>
                </div>
              ))}
            </div>
            
            {/* Certification Badges Row */}
            <div className="pt-6 border-t border-border/50">
              <div className="flex flex-wrap justify-center gap-6 items-center">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Shield className="w-6 h-6 text-accent" />
                  <div className="text-left">
                    <div className="font-bold text-foreground text-sm">COR Certified</div>
                    <div className="text-xs">Safety Excellence</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <FileCheck className="w-6 h-6 text-accent" />
                  <div className="text-left">
                    <div className="font-bold text-foreground text-sm">WSIB Compliant</div>
                    <div className="text-xs">Full Coverage</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Award className="w-6 h-6 text-accent" />
                  <div className="text-left">
                    <div className="font-bold text-foreground text-sm">$5M+ Insured</div>
                    <div className="text-xs">Liability Coverage</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="w-6 h-6 text-accent" />
                  <div className="text-left">
                    <div className="font-bold text-foreground text-sm">TCA Member</div>
                    <div className="text-xs">Since 2009</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* PCL-style 4-column footer layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Column 1: Logo & Tagline */}
            <div>
              <Link to="/" className="inline-block mb-4">
                <img 
                  src={ascentLogo} 
                  alt="Ascent Group Construction" 
                  className="h-24 w-auto"
                />
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Professional construction services delivering excellence across the Greater Toronto Area since 2009.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
                Quick Links
              </h3>
              <nav aria-label="Quick links">
                <ul className="space-y-2">
                  {quickLinks.map((link: any, index: number) => (
                    <li key={index}>
                      <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Column 3: Sectors */}
            <div>
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
                Sectors
              </h3>
              <nav aria-label="Client sectors">
                <ul className="space-y-2">
                  {sectorsLinks.map((link: any, index: number) => (
                    <li key={index}>
                      <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Column 4: Contact & Social */}
            <div>
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">
                Contact
              </h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span>{address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="hover:text-primary transition-colors">
                    {phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  <a href={`mailto:${email}`} className="hover:text-primary transition-colors break-all">
                    {email}
                  </a>
                </div>
                
                {/* Social Icons */}
                <div className="flex gap-3 pt-2">
                  <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                    <Instagram className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="pt-6 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
              <p className="text-muted-foreground">
                &copy; {new Date().getFullYear()} Ascent Group Construction. All rights reserved.
              </p>
              <nav aria-label="Legal navigation" className="flex gap-6 text-muted-foreground">
                <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                <Link to="/accessibility" className="hover:text-primary transition-colors">Accessibility</Link>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
