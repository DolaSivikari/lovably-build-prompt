/**
 * Unified Design System Constants
 * Single source of truth for all design decisions across the site
 */

// Layout Standards
export const LAYOUT = {
  maxWidth: 'max-w-7xl',
  sectionSpacing: {
    major: 'py-16 md:py-20 lg:py-24',
    subsection: 'py-12 md:py-16',
    tight: 'py-8 md:py-12',
  },
  containerPadding: 'px-4 sm:px-6 lg:px-8',
} as const;

// Unified CTA Text
export const CTA_TEXT = {
  primary: 'Request Site Assessment',
  secondary: 'View Services',
  gc: 'For GCs: Request Unit Pricing',
  project: 'Request Project Quote',
  contact: 'Contact Us',
  viewProjects: 'View Projects',
  learnMore: 'Learn More',
} as const;

// Card & Component Styling
export const CARD_STYLES = {
  base: 'rounded-[var(--radius-md)] border border-border bg-card',
  elevated: 'rounded-[var(--radius-md)] border border-border bg-card shadow-[var(--shadow-card-elevated)]',
  hover: 'transition-all duration-300 hover:shadow-[var(--shadow-card-elevated)] hover:-translate-y-1',
} as const;

// Animation Presets
export const ANIMATIONS = {
  fadeIn: 'animate-fade-in',
  slideUp: 'animate-slide-in-right',
  hover: 'transition-all duration-200 hover:scale-[1.02]',
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

// Brand Voice & Positioning
export const BRAND = {
  positioning: "Ontario's specialty contractor for building envelope & restoration",
  tagline: "Ontario's specialty contractor for building envelope & restoration",
  fullName: "Ascent Group Construction",
  colors: {
    primary: "Navy Blue #003366",
    accent: "Construction Orange #F97316", 
    secondary: "Charcoal Gray #36454F"
  }
} as const;
