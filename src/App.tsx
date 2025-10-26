import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import FloatingContact from "./components/FloatingContact";
import ScrollToTop from "./components/ScrollToTop";
import { trackPageView } from "@/lib/analytics";

// Eager load public pages (critical path)
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Estimate from "./pages/Estimate";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import PropertyManagers from "./pages/PropertyManagers";
import Homeowners from "./pages/Homeowners";
import CommercialClients from "./pages/CommercialClients";
import OurProcess from "./pages/OurProcess";
import Sustainability from "./pages/Sustainability";
import Safety from "./pages/Safety";
import Values from "./pages/Values";
import HowWeWork from "./pages/HowWeWork";
import Careers from "./pages/Careers";
import ServiceDetail from "./pages/ServiceDetail";
import FAQ from "./pages/FAQ";
import CertificationsInsurance from "./pages/company/CertificationsInsurance";
import ContractorPortal from "./pages/resources/ContractorPortal";
import ServiceAreas from "./pages/resources/ServiceAreas";
import EquipmentResources from "./pages/company/EquipmentResources";
import Team from "./pages/company/Team";
import Developers from "./pages/company/Developers";
import Warranties from "./pages/resources/Warranties";
import Financing from "./pages/resources/Financing";

// Lazy load admin pages (not critical for initial load) with error handling
const Dashboard = lazy(() => import("./pages/admin/Dashboard").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Dashboard</p></div>
})));
const AdminServices = lazy(() => import("./pages/admin/Services").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Services</p></div>
})));
const AdminProjects = lazy(() => import("./pages/admin/Projects").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Projects</p></div>
})));
const ServiceEditor = lazy(() => import("./pages/admin/ServiceEditor").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Service Editor</p></div>
})));
const ProjectEditor = lazy(() => import("./pages/admin/ProjectEditor").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Project Editor</p></div>
})));
const ContactSubmissions = lazy(() => import("./pages/admin/ContactSubmissions").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Contact Submissions</p></div>
})));
const HeroEditor = lazy(() => import("./pages/admin/HeroEditor").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Hero Editor</p></div>
})));
const SiteSettings = lazy(() => import("./pages/admin/SiteSettings").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Site Settings</p></div>
})));
const TestimonialsManager = lazy(() => import("./pages/admin/TestimonialsManager").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Testimonials Manager</p></div>
})));
const StatsManager = lazy(() => import("./pages/admin/StatsManager").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Stats Manager</p></div>
})));
const AdminBlogPosts = lazy(() => import("./pages/admin/BlogPosts").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Blog Posts</p></div>
})));
const BlogPostEditor = lazy(() => import("./pages/admin/BlogPostEditor").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Blog Post Editor</p></div>
})));
const AdminCaseStudies = lazy(() => import("./pages/admin/CaseStudies").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Case Studies</p></div>
})));
const CaseStudyEditor = lazy(() => import("./pages/admin/CaseStudyEditor").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Case Study Editor</p></div>
})));
const ResumeSubmissions = lazy(() => import("./pages/admin/ResumeSubmissions").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Resume Submissions</p></div>
})));
const MediaLibrary = lazy(() => import("./pages/admin/MediaLibrary").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Media Library</p></div>
})));
const Users = lazy(() => import("./pages/admin/Users").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Users</p></div>
})));
const SecurityCenter = lazy(() => import("./pages/admin/SecurityCenter").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Security Center</p></div>
})));
const SecuritySettings = lazy(() => import("./pages/admin/SecuritySettings").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Security Settings</p></div>
})));
const AdminSEODashboard = lazy(() => import("./pages/admin/SEODashboard").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load SEO Dashboard</p></div>
})));
const PerformanceDashboard = lazy(() => import("./pages/admin/PerformanceDashboard").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Performance Dashboard</p></div>
})));
const TemplateManager = lazy(() => import("./pages/admin/TemplateManager").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Template Manager</p></div>
})));

// Lazy load heavy content pages with error handling
const Blog = lazy(() => import("./pages/Blog").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Blog</p></div>
})));
const BlogPost = lazy(() => import("./pages/BlogPost").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Blog Post</p></div>
})));
const CaseStudy = lazy(() => import("./pages/CaseStudy").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Case Study</p></div>
})));
const CaseStudies = lazy(() => import("./pages/CaseStudies").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Case Studies</p></div>
})));
const SEODashboard = lazy(() => import("./pages/SEODashboard").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load SEO Dashboard</p></div>
})));

const queryClient = new QueryClient();

// Loading component for lazy loaded routes
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

// Route tracking wrapper
const RouteTracker = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname + location.search, document.title);
  }, [location]);

  return <>{children}</>;
};

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
            <ScrollToTop />
            <RouteTracker>
              <FloatingContact />
              {/* Skip to main content link for accessibility - Enhanced PCL style */}
              <a
                href="#main-content"
                className="fixed top-0 left-0 -translate-y-full focus:translate-y-0 z-[100] bg-primary text-primary-foreground px-6 py-3 font-semibold transition-transform focus:outline-none focus:ring-4 focus:ring-primary/50"
                aria-label="Skip to main content"
              >
                Skip to main content
              </a>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  {/* Public pages - eagerly loaded */}
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/values" element={<Values />} />
                  <Route path="/safety" element={<Safety />} />
                  <Route path="/how-we-work" element={<HowWeWork />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/:slug" element={<ServiceDetail />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/estimate" element={<Estimate />} />
                  <Route path="/property-managers" element={<PropertyManagers />} />
                  <Route path="/homeowners" element={<Homeowners />} />
                  <Route path="/commercial-clients" element={<CommercialClients />} />
                  <Route path="/our-process" element={<OurProcess />} />
                  <Route path="/sustainability" element={<Sustainability />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/company/certifications-insurance" element={<CertificationsInsurance />} />
                  <Route path="/company/equipment-resources" element={<EquipmentResources />} />
                  <Route path="/company/team" element={<Team />} />
                  <Route path="/company/developers" element={<Developers />} />
                  <Route path="/resources/contractor-portal" element={<ContractorPortal />} />
                  <Route path="/resources/service-areas" element={<ServiceAreas />} />
                  <Route path="/resources/warranties" element={<Warranties />} />
                  <Route path="/resources/financing" element={<Financing />} />
                  
                  {/* Heavy content pages - lazy loaded */}
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/case-studies" element={<CaseStudies />} />
                  <Route path="/case-study/:slug" element={<CaseStudy />} />
                  <Route path="/seo-dashboard" element={<SEODashboard />} />
                  
                  {/* Admin pages - lazy loaded */}
                  <Route path="/admin" element={<Dashboard />} />
                  <Route path="/admin/services" element={<AdminServices />} />
                  <Route path="/admin/services/:id" element={<ServiceEditor />} />
                  <Route path="/admin/projects" element={<AdminProjects />} />
                  <Route path="/admin/projects/:id" element={<ProjectEditor />} />
                  <Route path="/admin/contacts" element={<ContactSubmissions />} />
                  <Route path="/admin/blog" element={<AdminBlogPosts />} />
                  <Route path="/admin/blog/:id" element={<BlogPostEditor />} />
                  <Route path="/admin/case-studies" element={<AdminCaseStudies />} />
                  <Route path="/admin/case-studies/:id" element={<CaseStudyEditor />} />
                  <Route path="/admin/resumes" element={<ResumeSubmissions />} />
                  <Route path="/admin/media" element={<MediaLibrary />} />
                  <Route path="/admin/users" element={<Users />} />
                  <Route path="/admin/security-center" element={<SecurityCenter />} />
                  <Route path="/admin/security-settings" element={<SecuritySettings />} />
                  <Route path="/admin/seo-dashboard" element={<AdminSEODashboard />} />
                  <Route path="/admin/performance-dashboard" element={<PerformanceDashboard />} />
                  <Route path="/admin/template-manager" element={<TemplateManager />} />
                  <Route path="/admin/hero" element={<HeroEditor />} />
                  <Route path="/admin/site-settings" element={<SiteSettings />} />
                  <Route path="/admin/testimonials" element={<TestimonialsManager />} />
                  <Route path="/admin/stats" element={<StatsManager />} />
                  
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </RouteTracker>
          </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
