import { LucideIcon } from "lucide-react";

export interface SubItem {
  name: string;
  link: string;
  description?: string;
}

export interface AccordionCategory {
  title: string;
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
          subItems: [
            { name: "Commercial Painting", link: "/services/commercial-painting" },
            { name: "Residential Painting", link: "/services/residential-painting" },
            { name: "Condo Painting", link: "/services/condo-painting" },
          ],
        },
        {
          title: "Exterior Systems",
          subItems: [
            { name: "Stucco & EIFS", link: "/services/stucco-eifs" },
            { name: "Metal Cladding", link: "/services/metal-cladding" },
            { name: "Masonry & Restoration", link: "/services/masonry" },
          ],
        },
        {
          title: "Specialty Services",
          subItems: [
            { name: "Parking Garage Restoration", link: "/services/parking-garage" },
            { name: "Tile & Flooring", link: "/services/tile-flooring" },
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
            { name: "Residential Services", link: "/homeowners" },
            { name: "Interior Painting", link: "/services/residential-painting" },
            { name: "Exterior Restoration", link: "/services/stucco-eifs" },
          ],
        },
        {
          title: "Property Managers",
          subItems: [
            { name: "Property Management Solutions", link: "/property-managers" },
            { name: "Multi-Unit Painting", link: "/services/condo-painting" },
            { name: "Building Envelope", link: "/services/masonry" },
          ],
        },
        {
          title: "Commercial Clients",
          subItems: [
            { name: "Commercial Services", link: "/commercial-clients" },
            { name: "Office & Retail Painting", link: "/services/commercial-painting" },
            { name: "Parking Structures", link: "/services/parking-garage" },
          ],
        },
      ],
    },
  ],
};
