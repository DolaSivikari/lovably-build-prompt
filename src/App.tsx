import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { lazy, Suspense, useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import FloatingContact from "./components/FloatingContact";
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
import ResidentialPainting from "./pages/services/ResidentialPainting";
import CommercialPainting from "./pages/services/CommercialPainting";
import CondoPainting from "./pages/services/CondoPainting";
import PopcornCeilingRemoval from "./pages/services/PopcornCeilingRemoval";
import StuccoEIFS from "./pages/services/StuccoEIFS";
import MetalCladding from "./pages/services/MetalCladding";
import Masonry from "./pages/services/Masonry";
import ParkingGarage from "./pages/services/ParkingGarage";
import TileFlooring from "./pages/services/TileFlooring";
import Sealants from "./pages/services/Sealants";
import SuiteBuildouts from "./pages/services/SuiteBuildouts";
import PropertyManagers from "./pages/PropertyManagers";
import Homeowners from "./pages/Homeowners";
import CommercialClients from "./pages/CommercialClients";
import OurProcess from "./pages/OurProcess";
import Sustainability from "./pages/Sustainability";
import Safety from "./pages/Safety";
import Values from "./pages/Values";
import Careers from "./pages/Careers";
import ServiceDetail from "./pages/ServiceDetail";
import FAQ from "./pages/FAQ";

// Lazy load admin pages (not critical for initial load)
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminServices = lazy(() => import("./pages/admin/Services"));
const AdminProjects = lazy(() => import("./pages/admin/Projects"));
const ServiceEditor = lazy(() => import("./pages/admin/ServiceEditor"));
const ProjectEditor = lazy(() => import("./pages/admin/ProjectEditor"));
const ContactSubmissions = lazy(() => import("./pages/admin/ContactSubmissions"));
const AdminBlogPosts = lazy(() => import("./pages/admin/BlogPosts"));
const BlogPostEditor = lazy(() => import("./pages/admin/BlogPostEditor"));
const AdminCaseStudies = lazy(() => import("./pages/admin/CaseStudies"));
const CaseStudyEditor = lazy(() => import("./pages/admin/CaseStudyEditor"));
const ResumeSubmissions = lazy(() => import("./pages/admin/ResumeSubmissions"));
const MediaLibrary = lazy(() => import("./pages/admin/MediaLibrary"));
const Users = lazy(() => import("./pages/admin/Users"));
const SecurityCenter = lazy(() => import("./pages/admin/SecurityCenter"));
const SecuritySettings = lazy(() => import("./pages/admin/SecuritySettings"));
const AdminSEODashboard = lazy(() => import("./pages/admin/SEODashboard"));
const PerformanceDashboard = lazy(() => import("./pages/admin/PerformanceDashboard"));
const TemplateManager = lazy(() => import("./pages/admin/TemplateManager"));

// Lazy load heavy content pages
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const SEODashboard = lazy(() => import("./pages/SEODashboard"));

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
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <RouteTracker>
              <FloatingContact />
              {/* Skip to main content link for accessibility */}
              <a
                href="#main-content"
                className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:bg-secondary focus:text-primary focus:px-4 focus:py-2 focus:rounded-br"
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
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/:slug" element={<ServiceDetail />} />
                  <Route path="/services/painting" element={<ResidentialPainting />} />
                  <Route path="/services/commercial" element={<CommercialPainting />} />
                  <Route path="/services/condo" element={<CondoPainting />} />
                  <Route path="/services/popcorn-ceiling" element={<PopcornCeilingRemoval />} />
                  <Route path="/services/stucco" element={<StuccoEIFS />} />
                  <Route path="/services/metal-cladding" element={<MetalCladding />} />
                  <Route path="/services/masonry" element={<Masonry />} />
                  <Route path="/services/sealants" element={<Sealants />} />
                  <Route path="/services/parking-garage" element={<ParkingGarage />} />
                  <Route path="/services/suite-buildouts" element={<SuiteBuildouts />} />
                  <Route path="/services/tile-flooring" element={<TileFlooring />} />
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
                  
                  {/* Heavy content pages - lazy loaded */}
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/case-studies" element={<CaseStudies />} />
                  <Route path="/case-study/:id" element={<CaseStudy />} />
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
                  
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </RouteTracker>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
