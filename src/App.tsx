import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import CommercialClients from "./pages/CommercialClients";
import OurProcess from "./pages/OurProcess";
import Sustainability from "./pages/Sustainability";
import SafetyCompliance from "./pages/SafetyCompliance";
import Prequalification from "./pages/Prequalification";
import Capabilities from "./pages/Capabilities";
import Values from "./pages/Values";
import HowWeWork from "./pages/HowWeWork";
import Careers from "./pages/Careers";
import Reviews from "./pages/Reviews";
import ServiceDetail from "./pages/ServiceDetail";
import ExteriorCladding from "./pages/services/ExteriorCladding";
import InteriorBuildouts from "./pages/services/InteriorBuildouts";
import ExteriorEnvelope from "./pages/services/ExteriorEnvelope";
import GeneralContracting from "./pages/services/GeneralContracting";
import BuildingEnvelope from "./pages/services/BuildingEnvelope";
import ConstructionManagement from "./pages/services/ConstructionManagement";
import DesignBuild from "./pages/services/DesignBuild";
import EIFSStucco from "./pages/services/EIFSStucco";
import MasonryRestoration from "./pages/services/MasonryRestoration";
import MetalCladding from "./pages/services/MetalCladding";
import Waterproofing from "./pages/services/Waterproofing";
import ParkingRehabilitation from "./pages/services/ParkingRehabilitation";
import FacadeRemediation from "./pages/services/FacadeRemediation";
import SealantReplacement from "./pages/services/SealantReplacement";
import ParkingGarageRestoration from "./pages/services/ParkingGarageRestoration";
import ProtectiveCoatings from "./pages/services/ProtectiveCoatings";
import Markets from "./pages/Markets";
import MultiFamily from "./pages/markets/MultiFamily";
import Commercial from "./pages/markets/Commercial";
import Institutional from "./pages/markets/Institutional";
import Industrial from "./pages/markets/Industrial";
import Healthcare from "./pages/markets/Healthcare";
import Education from "./pages/markets/Education";
import Retail from "./pages/markets/Retail";
import Hospitality from "./pages/markets/Hospitality";
import FAQ from "./pages/FAQ";
import CertificationsInsurance from "./pages/company/CertificationsInsurance";
import ContractorPortal from "./pages/resources/ContractorPortal";
import ServiceAreas from "./pages/resources/ServiceAreas";
import EquipmentResources from "./pages/company/EquipmentResources";
import Team from "./pages/company/Team";
import Developers from "./pages/company/Developers";
import Warranties from "./pages/resources/Warranties";
import Financing from "./pages/resources/Financing";
import SubmitRFPNew from "./pages/SubmitRFPNew";
import Insights from "./pages/Insights";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Accessibility from "./pages/Accessibility";
import Unsubscribe from "./pages/Unsubscribe";
import CookieBanner from "./components/CookieBanner";
import NewsletterSubscribers from "./pages/admin/NewsletterSubscribers";
import PartnerPermissions from "./pages/admin/PartnerPermissions";
import DynamicSpecialtyPage from "./pages/DynamicSpecialtyPage";
import WhySpecialtyContractor from "./pages/WhySpecialtyContractor";

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
const SiteSettings = lazy(() => import("./pages/admin/SiteSettings").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Site Settings</p></div>
})));
const TestimonialsManager = lazy(() => import("./pages/admin/TestimonialsManager").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Testimonials Manager</p></div>
})));
const StatsManager = lazy(() => import("./pages/admin/StatsManager").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Stats Manager</p></div>
})));
const AwardsManager = lazy(() => import("./pages/admin/AwardsManager").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Awards Manager</p></div>
})));
const LeadershipTeam = lazy(() => import("./pages/admin/LeadershipTeam").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Leadership Team</p></div>
})));
const RFPSubmissions = lazy(() => import("./pages/admin/RFPSubmissions").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load RFP Submissions</p></div>
})));
const DocumentsLibrary = lazy(() => import("./pages/admin/DocumentsLibrary").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Documents Library</p></div>
})));
const HomepageSettings = lazy(() => import("./pages/admin/HomepageSettings").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Homepage Settings</p></div>
})));
const FooterSettings = lazy(() => import("./pages/admin/FooterSettings").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Footer Settings</p></div>
})));
const ContactPageSettings = lazy(() => import("./pages/admin/ContactPageSettings").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Contact Page Settings</p></div>
})));
const AdminBlogPosts = lazy(() => import("./pages/admin/BlogPosts").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Blog Posts</p></div>
})));
const BlogPostEditor = lazy(() => import("./pages/admin/BlogPostEditor").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Blog Post Editor</p></div>
})));
const ResumeSubmissions = lazy(() => import("./pages/admin/ResumeSubmissions").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Resume Submissions</p></div>
})));
const PrequalificationSubmissions = lazy(() => import("./pages/admin/PrequalificationSubmissions").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Prequalification Submissions</p></div>
})));
const MediaLibrary = lazy(() => import("./pages/admin/MediaLibraryEnhanced").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Media Library</p></div>
})));
const Users = lazy(() => import("./pages/admin/Users").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Users</p></div>
})));
const SecuritySettings = lazy(() => import("./pages/admin/SecuritySettings").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Security Settings</p></div>
})));
const PerformanceDashboard = lazy(() => import("./pages/admin/PerformanceDashboard").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Performance Dashboard</p></div>
})));

// Phase 1 & 2 Admin Pages
const HomepageWhyChooseUs = lazy(() => import("./pages/admin/HomepageWhyChooseUs").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Homepage Editor</p></div>
})));
const HomepageCompanyOverview = lazy(() => import("./pages/admin/HomepageCompanyOverview").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Homepage Editor</p></div>
})));
const HomepageContent = lazy(() => import("./pages/admin/HomepageContent").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Homepage Content</p></div>
})));
const NavigationBuilder = lazy(() => import("./pages/admin/NavigationBuilder").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Navigation Builder</p></div>
})));
const EditorGuide = lazy(() => import("./pages/admin/EditorGuide").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Editor Guide</p></div>
})));
const RedirectsManager = lazy(() => import("./pages/admin/RedirectsManager").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Redirects Manager</p></div>
})));
const StructuredDataManager = lazy(() => import("./pages/admin/StructuredDataManager").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Structured Data Manager</p></div>
})));
const LandingMenuEditor = lazy(() => import("./pages/admin/LandingMenuEditor").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Landing Menu Editor</p></div>
})));
const AboutPageSettings = lazy(() => import("./pages/admin/AboutPageSettings").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load About Page Settings</p></div>
})));
const SettingsHealthCheck = lazy(() => import("./pages/admin/SettingsHealthCheck").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Settings Health Check</p></div>
})));
const HeroSlidesManager = lazy(() => import("./pages/admin/HeroSlidesManager").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Hero Slides Manager</p></div>
})));
const HeroImagesManager = lazy(() => import("./pages/admin/HeroImagesManager").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Hero Images Manager</p></div>
})));
const SearchAnalytics = lazy(() => import("./pages/admin/SearchAnalytics").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Search Analytics</p></div>
})));
const ErrorLogs = lazy(() => import("./pages/admin/ErrorLogs").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Error Logs</p></div>
})));
const QuoteRequests = lazy(() => import("./pages/admin/QuoteRequests").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Quote Requests</p></div>
})));
const ReviewManager = lazy(() => import("./pages/admin/ReviewManager").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Review Manager</p></div>
})));
const ABTestManager = lazy(() => import("./pages/admin/ABTestManager").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load A/B Test Manager</p></div>
})));

// WordPress-style Admin Pages
const HomepageBuilder = lazy(() => import("./pages/admin/HomepageBuilder").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Homepage Builder</p></div>
})));
const ContentOverview = lazy(() => import("./pages/admin/ContentOverview").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Content Overview</p></div>
})));
const AppearanceOverview = lazy(() => import("./pages/admin/AppearanceOverview").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Appearance Overview</p></div>
})));
const ToolsOverview = lazy(() => import("./pages/admin/ToolsOverview").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Tools Overview</p></div>
})));
const NavigationMigration = lazy(() => import("./pages/admin/NavigationMigration").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Navigation Migration</p></div>
})));

// Business Management Pages
const BusinessDashboard = lazy(() => import("./pages/admin/business/BusinessDashboard").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Business Dashboard</p></div>
})));
const BusinessClients = lazy(() => import("./pages/admin/business/BusinessClients").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Business Clients</p></div>
})));
const BusinessProjects = lazy(() => import("./pages/admin/business/BusinessProjects").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Business Projects</p></div>
})));
const BusinessEstimates = lazy(() => import("./pages/admin/business/BusinessEstimates").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Business Estimates</p></div>
})));
const BusinessInvoices = lazy(() => import("./pages/admin/business/BusinessInvoices").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Business Invoices</p></div>
})));

// Unified Admin Layout
const UnifiedAdminLayout = lazy(() => import("./components/admin/UnifiedAdminLayout").then(m => ({ default: m.UnifiedAdminLayout })).catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Admin Layout</p></div>
})));

// Lazy load heavy content pages with error handling
const Blog = lazy(() => import("./pages/Blog").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Blog</p></div>
})));
const BlogPost = lazy(() => import("./pages/BlogPost").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Blog Post</p></div>
})));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail").catch(() => ({
  default: () => <div className="min-h-screen flex items-center justify-center"><p>Failed to load Project Detail</p></div>
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
              <CookieBanner />
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
                  <Route path="/why-specialty-contractor" element={<WhySpecialtyContractor />} />
                  <Route path="/safety" element={<SafetyCompliance />} />
                  <Route path="/company/safety-and-compliance" element={<Navigate to="/safety" replace />} />
                  <Route path="/prequalification" element={<Prequalification />} />
                  <Route path="/capabilities" element={<Capabilities />} />
                  <Route path="/how-we-work" element={<HowWeWork />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/reviews" element={<Reviews />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/general-contracting" element={<GeneralContracting />} />
            <Route path="/services/building-envelope" element={<BuildingEnvelope />} />
            <Route path="/services/construction-management" element={<ConstructionManagement />} />
            <Route path="/services/design-build" element={<DesignBuild />} />
            <Route path="/services/painting" element={<Navigate to="/services/exterior-envelope" replace />} />
            <Route path="/services/exterior-cladding" element={<ExteriorCladding />} />
            <Route path="/services/interior-buildouts" element={<InteriorBuildouts />} />
            <Route path="/services/exterior-envelope" element={<ExteriorEnvelope />} />
          <Route path="/services/eifs-stucco" element={<EIFSStucco />} />
          <Route path="/services/stucco-eifs" element={<Navigate to="/services/eifs-stucco" replace />} />
          <Route path="/services/masonry-restoration" element={<MasonryRestoration />} />
            <Route path="/services/metal-cladding" element={<MetalCladding />} />
            <Route path="/services/waterproofing" element={<Waterproofing />} />
            <Route path="/services/parking-rehabilitation" element={<ParkingRehabilitation />} />
            <Route path="/services/facade-remediation" element={<FacadeRemediation />} />
            <Route path="/services/sealant-replacement" element={<SealantReplacement />} />
            <Route path="/services/parking-garage-restoration" element={<ParkingGarageRestoration />} />
            <Route path="/services/protective-coatings" element={<ProtectiveCoatings />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/markets/multi-family" element={<MultiFamily />} />
            <Route path="/markets/commercial" element={<Commercial />} />
            <Route path="/markets/institutional" element={<Institutional />} />
            <Route path="/markets/industrial" element={<Industrial />} />
            <Route path="/markets/healthcare" element={<Healthcare />} />
            <Route path="/markets/education" element={<Education />} />
            <Route path="/markets/retail" element={<Retail />} />
            <Route path="/markets/hospitality" element={<Hospitality />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/estimate" element={<Estimate />} />
                  <Route path="/submit-rfp" element={<SubmitRFPNew />} />
                  
                  {/* Specialty Landing Pages - Dynamic routing */}
                  <Route path="/for-general-contractors" element={<DynamicSpecialtyPage />} />
                  <Route path="/emergency-maintenance" element={<DynamicSpecialtyPage />} />
                  <Route path="/vendor-packet" element={<DynamicSpecialtyPage />} />
                  <Route path="/insights" element={<Insights />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/accessibility" element={<Accessibility />} />
                  <Route path="/unsubscribe" element={<Unsubscribe />} />
                  <Route path="/property-managers" element={<PropertyManagers />} />
                  <Route path="/homeowners" element={<Navigate to="/markets/multi-family" replace />} />
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
                  {/* Redirect old case study routes to blog */}
                  <Route path="/case-studies" element={<Blog />} />
                  <Route path="/case-study/:slug" element={<BlogPost />} />
                  {/* Dedicated projects detail page */}
                  <Route path="/projects/:slug" element={<ProjectDetail />} />
                  
                  {/* Admin pages - unified layout */}
                  <Route path="/admin" element={<UnifiedAdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="services" element={<AdminServices />} />
                    <Route path="services/:id" element={<ServiceEditor />} />
                    <Route path="projects" element={<AdminProjects />} />
                    <Route path="projects/:id" element={<ProjectEditor />} />
                    <Route path="contacts" element={<ContactSubmissions />} />
                    <Route path="blog" element={<AdminBlogPosts />} />
                    <Route path="blog/:id" element={<BlogPostEditor />} />
                    <Route path="resumes" element={<ResumeSubmissions />} />
                    <Route path="prequalifications" element={<PrequalificationSubmissions />} />
                    <Route path="media" element={<MediaLibrary />} />
                    <Route path="users" element={<Users />} />
                    <Route path="stats" element={<StatsManager />} />
                    <Route path="awards" element={<AwardsManager />} />
                    <Route path="testimonials" element={<TestimonialsManager />} />
                    <Route path="leadership-team" element={<LeadershipTeam />} />
                    <Route path="rfp-submissions" element={<RFPSubmissions />} />
                    <Route path="documents-library" element={<DocumentsLibrary />} />
                    <Route path="homepage-settings" element={<HomepageSettings />} />
                    <Route path="security-settings" element={<SecuritySettings />} />
                    <Route path="performance-dashboard" element={<PerformanceDashboard />} />
                    <Route path="site-settings" element={<SiteSettings />} />
                    <Route path="landing-menu" element={<LandingMenuEditor />} />
                    <Route path="about-page" element={<AboutPageSettings />} />
                    <Route path="testimonials" element={<TestimonialsManager />} />
                    <Route path="stats" element={<StatsManager />} />
                    <Route path="footer-settings" element={<FooterSettings />} />
                    <Route path="contact-page-settings" element={<ContactPageSettings />} />
                    <Route path="settings-health" element={<SettingsHealthCheck />} />
                    <Route path="search-analytics" element={<SearchAnalytics />} />
                    <Route path="error-logs" element={<ErrorLogs />} />
                    <Route path="quote-requests" element={<QuoteRequests />} />
                    <Route path="reviews" element={<ReviewManager />} />
                    <Route path="ab-tests" element={<ABTestManager />} />
                    <Route path="hero-slides" element={<HeroSlidesManager />} />
                    <Route path="hero-images" element={<HeroImagesManager />} />
                    <Route path="newsletter-subscribers" element={<Suspense fallback={<PageLoader />}><NewsletterSubscribers /></Suspense>} />
                    <Route path="partner-permissions" element={<Suspense fallback={<PageLoader />}><PartnerPermissions /></Suspense>} />
                    
                    {/* Phase 1 & 2: Homepage & Navigation Management */}
                    <Route path="homepage-content" element={<HomepageContent />} />
                    <Route path="homepage-why-choose-us" element={<HomepageWhyChooseUs />} />
                    <Route path="homepage-company-overview" element={<HomepageCompanyOverview />} />
                    <Route path="navigation-builder" element={<NavigationBuilder />} />
                    <Route path="redirects" element={<RedirectsManager />} />
                    <Route path="structured-data" element={<StructuredDataManager />} />
                    <Route path="editor-guide" element={<EditorGuide />} />
                    
                    {/* WordPress-style reorganization - NEW */}
                    <Route path="homepage-builder" element={<HomepageBuilder />} />
                    <Route path="content-overview" element={<ContentOverview />} />
                    <Route path="appearance" element={<AppearanceOverview />} />
                    <Route path="tools-overview" element={<ToolsOverview />} />
                    <Route path="navigation-migration" element={<NavigationMigration />} />
                    
                    {/* Redirects for backward compatibility */}
                    <Route path="hero-slides" element={<Navigate to="/admin/homepage-builder?tab=hero" replace />} />
                    <Route path="hero-images" element={<HeroImagesManager />} />
                    <Route path="homepage-settings" element={<Navigate to="/admin/homepage-builder?tab=why-choose" replace />} />
                    <Route path="landing-menu" element={<Navigate to="/admin/homepage-builder?tab=landing-menu" replace />} />
                    
                    {/* Business Management Routes */}
                    <Route path="business" element={<BusinessDashboard />} />
                    <Route path="business/clients" element={<BusinessClients />} />
                    <Route path="business/projects" element={<BusinessProjects />} />
                    <Route path="business/estimates" element={<BusinessEstimates />} />
                    <Route path="business/invoices" element={<BusinessInvoices />} />
                  </Route>
                  
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
