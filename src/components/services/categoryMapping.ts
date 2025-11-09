import { Building2, Home, Cpu, Sparkles } from "lucide-react";

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: typeof Building2;
  color: string;
  serviceNames: string[];
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "building-envelope",
    name: "Building Envelope Systems",
    description: "Comprehensive exterior envelope solutions from cladding to waterproofing",
    icon: Building2,
    color: "primary",
    serviceNames: [
      "Building Envelope Solutions",
      "Exterior Envelope Systems",
      "Exterior Cladding Systems",
      "Exterior Siding & Cladding",
      "Metal Cladding & Panels",
      "Stucco & EIFS",
      "Roofing Services",
      "Waterproofing & Restoration",
      "Masonry",
      "Window & Door Installation"
    ]
  },
  {
    id: "interior-construction",
    name: "Interior Construction",
    description: "Complete interior buildouts, finishing, and painting services",
    icon: Home,
    color: "terracotta",
    serviceNames: [
      "Interior Buildouts & Finishing",
      "Suite Buildouts",
      "Drywall & Interior Finishing",
      "Tile & Flooring",
      "Painting Services",
      "Commercial Painting",
      "Residential Painting",
      "Condo & Multi-Unit Painting"
    ]
  },
  {
    id: "planning-technology",
    name: "Planning & Technology",
    description: "Advanced preconstruction planning and BIM coordination",
    icon: Cpu,
    color: "sage",
    serviceNames: [
      "Preconstruction & Advisory",
      "Virtual Design & BIM"
    ]
  },
  {
    id: "specialized-services",
    name: "Specialized Services",
    description: "Expert solutions for parking structures and sustainable building",
    icon: Sparkles,
    color: "primary",
    serviceNames: [
      "Parking Structure Rehabilitation",
      "Sustainable Building"
    ]
  }
];

export const getCategoryForService = (serviceName: string): ServiceCategory | undefined => {
  return SERVICE_CATEGORIES.find(cat => 
    cat.serviceNames.some(name => 
      name.toLowerCase() === serviceName.toLowerCase()
    )
  );
};

export const getServicesInCategory = (categoryId: string, allServices: any[]) => {
  const category = SERVICE_CATEGORIES.find(cat => cat.id === categoryId);
  if (!category) return [];
  
  return allServices.filter(service => 
    category.serviceNames.some(name => 
      name.toLowerCase() === service.name.toLowerCase()
    )
  );
};
