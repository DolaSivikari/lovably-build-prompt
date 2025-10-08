export interface LandingMenuItem {
  number: string;
  title: string;
  link: string;
  subtext: string;
}

export const landingMenuItems: LandingMenuItem[] = [
  {
    number: "01",
    title: "OUR SERVICES",
    link: "/services",
    subtext: "Painting, Exterior Systems & Specialty Work"
  },
  {
    number: "02",
    title: "WHO WE SERVE",
    link: "/homeowners",
    subtext: "Homeowners, Property Managers & Commercial Clients"
  },
  {
    number: "03",
    title: "ABOUT US",
    link: "/about",
    subtext: "15+ Years of Craftsmanship & Excellence"
  },
  {
    number: "04",
    title: "OUR PROJECTS",
    link: "/projects",
    subtext: "500+ Completed Projects Across the GTA"
  },
  {
    number: "05",
    title: "CONTACT US",
    link: "/contact",
    subtext: "Let's Build Something Exceptional Together"
  }
];
