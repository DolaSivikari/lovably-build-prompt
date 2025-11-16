import { Link } from "react-router-dom";
import { Building2, Wrench, Phone, Mail, MapPin, Linkedin, Award, Shield, Check, Send, ChevronRight, ArrowRight } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
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
  serviceAreaText,
  linkedinUrl,
  foundedYear = 2009
}: UnifiedFooterProps) {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const topServices = services.slice(0, 6);
  
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thank you for subscribing!",
      description: "You'll receive our latest industry insights and updates.",
    });
    setEmail("");
  };

  const handleCopyContact = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${type} Copied!`,
      description: `${text} has been copied to your clipboard.`,
    });
  };

  return (
    <footer className="relative overflow-hidden">
      {/* Section 1: CTA Banner */}
      <div className="relative bg-gradient-to-r from-primary via-primary/90 to-primary text-white">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="container mx-auto px-6 py-16 lg:py-20 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Ready to Start Your Next Project?
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-xl text-lg px-8 py-6 h-auto"
              >
                <Link to="/contact">Request a Proposal</Link>
              </Button>
              
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-primary transition-all duration-300 text-lg px-8 py-6 h-auto animate-pulse hover:animate-none"
              >
                <Link to="/contact">Emergency Service 24/7</Link>
              </Button>
            </div>
            
            {contactInfo.phone && (
              <div className="flex items-center justify-center gap-3 text-xl">
                <Phone className="h-6 w-6" />
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className="font-semibold hover:underline transition-all"
                >
                  {contactInfo.phone}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Section 2: Main Footer Content */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-6 py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            
            {/* Column 1: Brand & Mission */}
            <div className="lg:col-span-1 space-y-6">
              <Link to="/" className="inline-block group">
                <img 
                  src={ascentLogoLight} 
                  alt="Ascent Group Construction" 
                  className="h-20 w-auto transition-transform duration-300 hover:scale-105 brightness-0 invert"
                />
              </Link>
              
              <p className="text-slate-300 text-sm leading-relaxed">
                Ontario's specialty contractor for building envelope & restoration, delivering excellence in commercial construction since {foundedYear}.
              </p>
              
              {serviceAreaText && (
                <div className="flex items-start gap-2 text-sm text-slate-400">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <p>{serviceAreaText}</p>
                </div>
              )}
              
              {/* Trust Badges */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all">
                  <Award className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium">{new Date().getFullYear() - foundedYear}+ Years in Business</span>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all">
                  <Shield className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium">Licensed & Insured</span>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all">
                  <Check className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium">WSIB Compliant</span>
                </div>
              </div>
              
              {/* Social Media */}
              {linkedinUrl && (
                <div className="pt-4">
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary text-white rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="text-sm font-medium">Follow Us</span>
                  </a>
                </div>
              )}
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Quick Links
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-slate-400 mb-3">Company</h4>
                  <nav className="space-y-2">
                    {companyLinks.map((link, index) => (
                      <Link
                        key={index}
                        to={link.href}
                        className="group flex items-center gap-2 text-sm text-slate-300 hover:text-primary transition-all"
                      >
                        <ChevronRight className="h-4 w-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                        <span>{link.label}</span>
                      </Link>
                    ))}
                  </nav>
                </div>
                
                <div>
                  <h4 className="text-sm font-semibold text-slate-400 mb-3">Markets</h4>
                  <nav className="space-y-2">
                    {marketLinks.map((link, index) => (
                      <Link
                        key={index}
                        to={link.href}
                        className="group flex items-center gap-2 text-sm text-slate-300 hover:text-primary transition-all"
                      >
                        <ChevronRight className="h-4 w-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                        <span>{link.label}</span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            {/* Column 3: Services */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Our Services
              </h3>
              
              <div className="grid grid-cols-1 gap-3">
                {topServices.map((service, index) => (
                  <Link
                    key={index}
                    to={`/services/${service.slug}`}
                    className="group flex items-center gap-3 p-3 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(var(--primary),0.3)] hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="p-2 bg-primary/20 rounded-md group-hover:bg-primary/30 transition-colors">
                      <Wrench className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
                      {service.name}
                    </span>
                  </Link>
                ))}
              </div>
              
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
              >
                View All Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Column 4: Get in Touch */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Get in Touch
              </h3>
              
              <div className="space-y-3">
                {contactInfo.phone && (
                  <button
                    onClick={() => handleCopyContact(contactInfo.phone!, "Phone")}
                    className="w-full group flex items-start gap-3 p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all cursor-pointer"
                  >
                    <div className="p-2 bg-primary/20 rounded-md group-hover:bg-primary/30 transition-colors">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-slate-400 mb-1">Call Us</p>
                      <p className="text-sm font-semibold text-white">{contactInfo.phone}</p>
                    </div>
                  </button>
                )}
                
                {contactInfo.email && (
                  <button
                    onClick={() => handleCopyContact(contactInfo.email!, "Email")}
                    className="w-full group flex items-start gap-3 p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all cursor-pointer"
                  >
                    <div className="p-2 bg-primary/20 rounded-md group-hover:bg-primary/30 transition-colors">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-slate-400 mb-1">Email Us</p>
                      <p className="text-sm font-semibold text-white break-all">{contactInfo.email}</p>
                    </div>
                  </button>
                )}
                
                {contactInfo.address && (
                  <div className="group flex items-start gap-3 p-4 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all">
                    <div className="p-2 bg-primary/20 rounded-md group-hover:bg-primary/30 transition-colors">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-slate-400 mb-1">Visit Us</p>
                      <p className="text-sm font-semibold text-white">{contactInfo.address}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-3 pt-4">
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:scale-105"
                >
                  <Link to="/contact">Submit RFP</Link>
                </Button>
                
                <Link
                  to="/general-contractors"
                  className="block text-center text-sm text-slate-400 hover:text-primary transition-all"
                >
                  For General Contractors →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Newsletter Signup */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary">
              <Send className="h-4 w-4" />
              Stay Connected
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold">
              Stay Updated on Industry Insights
            </h3>
            
            <p className="text-muted-foreground">
              Get the latest construction trends, project updates, and industry news delivered to your inbox.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-12 bg-background border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <Button
                type="submit"
                size="lg"
                className="bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Section 4: Bottom Bar */}
      <div className="bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <p>
                © <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent font-semibold">{new Date().getFullYear()}</span> Ascent Group Construction. All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <span className="text-slate-700">|</span>
              <Link to="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
              {linkedinUrl && (
                <>
                  <span className="text-slate-700">|</span>
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <Linkedin className="h-4 w-4" />
                    Follow
                  </a>
                </>
              )}
            </div>
            
            <p className="hidden lg:block">
              Made with <span className="text-red-500">❤️</span> in Ontario
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
