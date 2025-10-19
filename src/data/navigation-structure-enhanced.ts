import { LucideIcon } from "lucide-react";

export interface SubItem {
  name: string;
  link: string;
  description?: string;
}

export interface AccordionCategory {
  title: string;
  description?: string;
  subItems: SubItem[];
}

export interface Section {
  sectionTitle: string;
  sectionLink?: string;
  categories: AccordionCategory[];
}

export interface MegaMenuDataEnhanced {
  [key: string]: Section[];
}

export const megaMenuDataEnhanced: MegaMenuDataEnhanced = {
  services: [
    {
      sectionTitle: "Our Services",
      sectionLink: "/services",
      categories: [
        {
          title: "Painting Services",
          description: "Professional interior and exterior painting for all property types",
          subItems: [
            { name: "Commercial Painting", link: "/services/commercial", description: "High-quality commercial painting services" },
            { name: "Residential Painting", link: "/services/painting", description: "Expert residential painting solutions" },
            { name: "Condo Painting", link: "/services/condo", description: "Specialized condo painting services" },
            { name: "Popcorn Ceiling Removal", link: "/services/popcorn-ceiling", description: "Professional ceiling finishing" },
          ],
        },
        {
          title: "Exterior Systems",
          description: "Comprehensive building envelope solutions and restoration",
          subItems: [
            { name: "Stucco & EIFS", link: "/services/stucco", description: "Expert stucco application and repair" },
            { name: "Metal Cladding", link: "/services/metal-cladding", description: "Durable metal cladding installation" },
            { name: "Masonry & Restoration", link: "/services/masonry", description: "Professional masonry services" },
            { name: "Sealants & Caulking", link: "/services/sealants", description: "Weather-resistant sealing solutions" },
          ],
        },
        {
          title: "Specialty Services",
          description: "Specialized construction and restoration services",
          subItems: [
            { name: "Parking Garage Restoration", link: "/services/parking-garage", description: "Complete parking structure restoration" },
            { name: "Tile & Flooring", link: "/services/tile-flooring", description: "Professional flooring installation" },
            { name: "Suite Buildouts", link: "/services/suite-buildouts", description: "Custom suite construction" },
          ],
        },
      ],
    },
  ],
  whoWeServe: [
    {
      sectionTitle: "Who We Serve",
      categories: [
        {
          title: "Homeowners",
          subItems: [
            { name: "View Residential Solutions", link: "/homeowners" },
          ],
        },
        {
          title: "Property Managers",
          subItems: [
            { name: "View Property Management Solutions", link: "/property-managers" },
          ],
        },
        {
          title: "Commercial Clients",
          subItems: [
            { name: "View Commercial Solutions", link: "/commercial-clients" },
          ],
        },
      ],
    },
  ],
  blog: [
    {
      sectionTitle: "Articles & Insights",
      sectionLink: "/blog",
      categories: [
        {
          title: "Articles & Insights",
          subItems: [
            { name: "Blog & Resources", link: "/blog" },
            { name: "View All Articles", link: "/blog" },
            { name: "Case Studies", link: "/case-studies" },
          ],
        },
      ],
    },
    {
      sectionTitle: "Company",
      categories: [
        {
          title: "About Us",
          subItems: [
            { name: "Our Process", link: "/how-we-work" },
            { name: "Our Values", link: "/values" },
            { name: "Safety", link: "/safety" },
            { name: "Sustainability", link: "/sustainability" },
          ],
        },
      ],
    },
  ],
};
