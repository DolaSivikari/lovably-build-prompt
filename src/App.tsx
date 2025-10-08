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
import Auth from "./pages/Auth";
import Dashboard from "./pages/admin/Dashboard";
import AdminServices from "./pages/admin/Services";
import AdminProjects from "./pages/admin/Projects";
import ServiceEditor from "./pages/admin/ServiceEditor";
import ProjectEditor from "./pages/admin/ProjectEditor";
import ContactSubmissions from "./pages/admin/ContactSubmissions";
import NotFound from "./pages/NotFound";

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
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
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
