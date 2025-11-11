import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Shield, Award, FileCheck, Building2 } from "lucide-react";
import ascentLogo from "@/assets/ascent-logo.png";
import SEO from "@/components/SEO";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { TrustBadgeBar } from "@/components/footer/TrustBadgeBar";
import { MinimalDesktopFooter } from "@/components/footer/MinimalDesktopFooter";
import { MinimalMobileFooter } from "@/components/footer/MinimalMobileFooter";

const Footer = () => {
  const [siteSettings, setSiteSettings] = useState<any>(null);
  const [footerSettings, setFooterSettings] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const [siteData, footerData, servicesData] = await Promise.all([
          supabase.from('site_settings').select('*').eq('is_active', true).single(),
          supabase.from('footer_settings').select('*').eq('is_active', true).single(),
          supabase.from('services').select('name, slug, service_tier').eq('publish_state', 'published').order('service_tier, name')
        ]);
        
        if (siteData.data) setSiteSettings(siteData.data);
        if (footerData.data) setFooterSettings(footerData.data);
        if (servicesData.data) setServices(servicesData.data);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Get data from admin-managed settings
  const quickLinks = (footerSettings?.quick_links as any[]) || [];
  const sectorsLinks = (footerSettings?.sectors_links as any[]) || [];
  const trustBarItems = (footerSettings?.trust_bar_items as any[]) || [];
  
  const contactInfo = footerSettings?.contact_info || {};
  const socialMedia = footerSettings?.social_media || {};
  
  // Primary source: site_settings, fallback to footer_settings
  const address = siteSettings?.address || contactInfo.address || '';
  const phone = siteSettings?.phone || contactInfo.phone || '';
  const email = siteSettings?.email || contactInfo.email || '';
  const linkedinUrl = socialMedia.linkedin || '';

  // Static fallback links if admin hasn't configured them
  const companyLinks = quickLinks.length > 0 ? quickLinks : [
    { label: "About", href: "/about" },
    { label: "Leadership", href: "/company/team" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ];

  const marketLinks = sectorsLinks.length > 0 ? sectorsLinks : [
    { label: "Multi-Family", href: "/markets/multi-family" },
    { label: "Commercial", href: "/markets/commercial" },
    { label: "Institutional", href: "/markets/institutional" },
    { label: "Industrial", href: "/markets/industrial" },
  ];

  const projectLinks = [
    { label: "Featured Projects", href: "/projects" },
    { label: "Commercial", href: "/projects?type=commercial" },
    { label: "Residential", href: "/projects?type=residential" },
  ];

  // Use trust bar items from admin if available, otherwise show default certifications
  const displayTrustItems = trustBarItems.length > 0;
  const certifications = [
    { icon: Shield, title: "COR Certified", subtitle: "Safety Excellence" },
    { icon: FileCheck, title: "WSIB Compliant", subtitle: "Full Coverage" },
    { icon: Award, title: "$5M+ Insured", subtitle: "Liability" },
    { icon: Building2, title: "TCA Member", subtitle: "Since 2009" },
  ];

  const citationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://ascentgroupconstruction.com/#organization",
    name: "Ascent Group Construction",
    image: "https://ascentgroupconstruction.com/og-image.jpg",
    email: "info@ascentgroupconstruction.com",
    areaServed: { "@type": "State", name: "Ontario" },
    address: { "@type": "PostalAddress", addressRegion: "ON", addressCountry: "CA" },
    serviceType: ["General Contracting", "Construction Management", "Design-Build Services"],
    priceRange: "$$-$$$",
  };

  if (loading) {
    return (
      <>
        <SEO structuredData={citationSchema} />
        <footer className="w-full bg-background border-t border-border">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
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
      <footer className="w-full bg-background border-t border-border">
        
        {/* Trust Badge Bar - Above Footer */}
        <TrustBadgeBar
          certifications={certifications}
          displayTrustItems={displayTrustItems}
          trustBarItems={trustBarItems}
        />
        
        {/* Footer Layout */}
        <div className="container mx-auto px-4 py-12 md:py-16">
          
          {/* Mobile: Minimal Footer */}
          <MinimalMobileFooter
            companyLinks={companyLinks}
            services={services}
            marketLinks={marketLinks}
            projectLinks={projectLinks}
            certifications={certifications}
            displayTrustItems={displayTrustItems}
            trustBarItems={trustBarItems}
            contactInfo={{ phone, email, address }}
            logoUrl={ascentLogo}
            serviceAreaText="Serving Toronto, Mississauga, Brampton, Vaughan, Markham & the Greater Toronto Area"
            linkedinUrl={linkedinUrl}
            foundedYear={siteSettings?.founded_year || 2009}
          />

          {/* Desktop: Minimal Footer */}
          <MinimalDesktopFooter
            companyLinks={companyLinks}
            services={services}
            contactInfo={{ phone, email, address }}
            logoUrl={ascentLogo}
            serviceAreaText="Serving Toronto, Mississauga, Brampton, Vaughan, Markham & the Greater Toronto Area"
            linkedinUrl={linkedinUrl}
            foundedYear={siteSettings?.founded_year || 2009}
          />
        </div>
      </footer>
    </>
  );
};

export default Footer;
