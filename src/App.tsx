import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Estimate from "./pages/Estimate";
import Auth from "./pages/Auth";
import Dashboard from "./pages/admin/Dashboard";
import AdminServices from "./pages/admin/Services";
import AdminProjects from "./pages/admin/Projects";
import ServiceEditor from "./pages/admin/ServiceEditor";
import ProjectEditor from "./pages/admin/ProjectEditor";
import ContactSubmissions from "./pages/admin/ContactSubmissions";
import NotFound from "./pages/NotFound";
import ResidentialPainting from "./pages/services/ResidentialPainting";
import CommercialPainting from "./pages/services/CommercialPainting";
import CondoPainting from "./pages/services/CondoPainting";
import StuccoEIFS from "./pages/services/StuccoEIFS";
import MetalCladding from "./pages/services/MetalCladding";
import Masonry from "./pages/services/Masonry";
import ParkingGarage from "./pages/services/ParkingGarage";
import TileFlooring from "./pages/services/TileFlooring";
import PropertyManagers from "./pages/PropertyManagers";
import Homeowners from "./pages/Homeowners";
import CommercialClients from "./pages/CommercialClients";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import CaseStudy from "./pages/CaseStudy";
import OurProcess from "./pages/OurProcess";
import Sustainability from "./pages/Sustainability";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/painting" element={<ResidentialPainting />} />
          <Route path="/services/commercial" element={<CommercialPainting />} />
          <Route path="/services/condo" element={<CondoPainting />} />
          <Route path="/services/stucco" element={<StuccoEIFS />} />
          <Route path="/services/metal-cladding" element={<MetalCladding />} />
          <Route path="/services/masonry" element={<Masonry />} />
          <Route path="/services/sealants" element={<Contact />} />
          <Route path="/services/parking-garage" element={<ParkingGarage />} />
          <Route path="/services/suite-buildouts" element={<Contact />} />
          <Route path="/services/tile-flooring" element={<TileFlooring />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/estimate" element={<Estimate />} />
          <Route path="/property-managers" element={<PropertyManagers />} />
          <Route path="/homeowners" element={<Homeowners />} />
          <Route path="/commercial-clients" element={<CommercialClients />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/case-study/:id" element={<CaseStudy />} />
          <Route path="/our-process" element={<OurProcess />} />
          <Route path="/sustainability" element={<Sustainability />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/services" element={<AdminServices />} />
          <Route path="/admin/services/:id" element={<ServiceEditor />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/projects/:id" element={<ProjectEditor />} />
          <Route path="/admin/contacts" element={<ContactSubmissions />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
