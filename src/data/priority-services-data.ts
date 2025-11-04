import { 
  Paintbrush, 
  Building2, 
  Home, 
  Building, 
  Hammer,
  Shield,
  Clock,
  Award,
  DollarSign,
  Users,
  CheckCircle,
  Sparkles,
  TrendingUp,
  Heart,
  Wrench,
  Settings
} from 'lucide-react';
import type { ServicePageTemplateProps } from '@/components/services/ServicePageTemplate';

export const priorityServicesData: Record<string, ServicePageTemplateProps['service']> = {
  'commercial-painting': {
    slug: 'commercial-painting',
    name: 'Commercial Painting',
    category: 'Painting Services',
    tagline: 'Professional painting for offices, retail, and industrial spaces',
    description: 'Transform your commercial space with professional painting services designed to minimize business disruption while delivering exceptional results.',
    longDescription: 'Our commercial painting services are designed to minimize disruption to your business operations. We offer flexible scheduling including after-hours and weekend work to ensure your business continues running smoothly. Our experienced crews are equipped to handle large-scale projects efficiently, from office buildings to retail spaces and industrial facilities. We use low-VOC commercial-grade paints that meet industry standards while providing exceptional durability and aesthetics. Fast turnaround times and professional project management ensure your project is completed on schedule and within budget.',
    heroImage: '/hero-construction.jpg',
    benefits: [
      {
        icon: Clock,
        title: 'Minimal Downtime',
        description: 'Flexible scheduling and efficient execution to keep your business running smoothly during the project'
      },
      {
        icon: Award,
        title: 'Professional Results',
        description: 'Commercial-grade finishes that enhance your brand image and create a welcoming environment'
      },
      {
        icon: Shield,
        title: 'Durability',
        description: 'High-performance coatings designed to withstand heavy traffic and frequent cleaning'
      },
      {
        icon: CheckCircle,
        title: 'Safety Compliance',
        description: 'Full adherence to commercial safety standards and regulations'
      },
      {
        icon: DollarSign,
        title: 'Budget Certainty',
        description: 'Transparent pricing with no hidden costs or surprise charges'
      },
      {
        icon: Shield,
        title: 'Warranty Protection',
        description: 'Comprehensive warranty coverage for materials and workmanship'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Site Assessment & Planning',
        description: 'Comprehensive evaluation of your facility',
        details: 'We conduct a thorough site assessment to understand your specific needs, define the project scope, and create a detailed schedule that minimizes operational impact. Our team coordinates with your facilities manager to ensure seamless integration with your business operations.'
      },
      {
        step: 2,
        title: 'Surface Preparation',
        description: 'Professional cleaning, repairs, and priming',
        details: 'Using commercial-grade materials and equipment, we prepare all surfaces meticulously. This includes cleaning, minor repairs, filling imperfections, and applying appropriate primers to ensure optimal paint adhesion and longevity.'
      },
      {
        step: 3,
        title: 'Premium Application',
        description: 'High-quality paint application with attention to detail',
        details: 'Our skilled professionals apply paint using advanced techniques and commercial-grade products. We maintain strict timelines while ensuring even coverage, clean lines, and a flawless finish that enhances your commercial space.'
      },
      {
        step: 4,
        title: 'Quality Control',
        description: 'Thorough inspection and touch-ups',
        details: 'Before project completion, our quality control team conducts a comprehensive inspection. We address any touch-ups immediately and perform a final walkthrough with you to ensure complete satisfaction and a flawless finish.'
      }
    ],
    quickFacts: {
      projectTypes: [
        'Office buildings and corporate spaces',
        'Retail stores and shopping centers',
        'Warehouses and industrial facilities',
        'Healthcare facilities and medical offices',
        'Educational institutions',
        'Hospitality venues and restaurants'
      ],
      timeline: '3-5 days for most commercial projects',
      serviceArea: 'Greater Toronto Area and surrounding Ontario regions',
      certifications: [
        'WSIB Compliant',
        'Full Liability Insurance',
        'Lead-Safe Certified',
        'Low-VOC Paint Certified'
      ]
    },
    relatedServices: [
      {
        slug: 'residential-painting',
        name: 'Residential Painting',
        image: '/project-commercial.jpg'
      },
      {
        slug: 'condo-multi-unit',
        name: 'Condo & Multi-Unit Painting',
        image: '/project-industrial.jpg'
      },
      {
        slug: 'drywall-finishing',
        name: 'Drywall Finishing',
        image: '/project-institutional.jpg'
      }
    ],
    testimonial: {
      quote: 'Ascent Group completed our 15,000 sq ft office painting over a weekend. Zero disruption to our operations and the quality exceeded expectations. Their team was professional, efficient, and delivered exactly what they promised.',
      author: 'Michael Chen',
      project: 'Office Tower Renovation',
      location: 'Downtown Toronto'
    }
  },

  'residential-painting': {
    slug: 'residential-painting',
    name: 'Residential Painting',
    category: 'Painting Services',
    tagline: 'Transform your home with expert interior and exterior painting',
    description: 'Comprehensive residential painting services that enhance your home\'s beauty and value with professional craftsmanship and attention to detail.',
    longDescription: 'Our residential painting services provide comprehensive interior and exterior solutions that transform your home. We begin with professional color consultation to help you select the perfect palette, followed by meticulous surface preparation to ensure a flawless finish. Using premium paint products and advanced application techniques, we deliver results that enhance your home\'s beauty and value. Our team maintains a clean, organized workspace throughout the project and treats your home with the utmost respect.',
    heroImage: '/hero-construction.jpg',
    benefits: [
      {
        icon: Home,
        title: 'Enhanced Curb Appeal',
        description: 'Fresh paint dramatically improves your home\'s appearance and creates a welcoming first impression'
      },
      {
        icon: TrendingUp,
        title: 'Increased Property Value',
        description: 'Professional painting is one of the best investments for boosting your home\'s market value'
      },
      {
        icon: Sparkles,
        title: 'Personalized Spaces',
        description: 'Transform your living areas to reflect your style and create the atmosphere you desire'
      },
      {
        icon: Shield,
        title: 'Protection',
        description: 'Quality paint protects surfaces from moisture, wear, and environmental damage'
      },
      {
        icon: Award,
        title: 'Expert Craftsmanship',
        description: 'Skilled painters ensure smooth, even coverage with clean lines and flawless finish'
      },
      {
        icon: Heart,
        title: 'Stress-Free Experience',
        description: 'From planning to cleanup, we handle every detail so you can enjoy the transformation'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Color Consultation',
        description: 'Expert guidance on color selection and design',
        details: 'Our professional color consultants help you select the perfect palette for your home. We provide samples, discuss finishes, and ensure your color choices complement your existing décor and achieve your vision.'
      },
      {
        step: 2,
        title: 'Room Preparation',
        description: 'Careful protection and surface preparation',
        details: 'We carefully protect your furniture, floors, and fixtures with professional-grade materials. All surfaces are thoroughly cleaned, repaired, and prepared to ensure optimal paint adhesion and a beautiful, lasting finish.'
      },
      {
        step: 3,
        title: 'Professional Painting',
        description: 'Premium paint application with expert technique',
        details: 'Using premium paints and advanced application techniques, our skilled painters deliver smooth, even coverage with precise edges and clean lines. We maintain a clean, organized workspace and respect your home throughout the project.'
      },
      {
        step: 4,
        title: 'Final Inspection',
        description: 'Quality assurance and project completion',
        details: 'We conduct a thorough final inspection, address any touch-ups, and complete a comprehensive cleanup. You\'ll receive a walkthrough to ensure every detail meets your expectations and our quality standards.'
      }
    ],
    quickFacts: {
      projectTypes: [
        'Interior room painting',
        'Exterior house painting',
        'Cabinet refinishing',
        'Trim and crown molding',
        'Deck and fence staining',
        'Garage floor coating'
      ],
      timeline: '3-7 days for typical residential projects',
      serviceArea: 'Toronto, Mississauga, Brampton, Vaughan, Markham, and surrounding areas',
      certifications: [
        'Lead-Safe Certified',
        'Fully Insured',
        'WSIB Compliant',
        'Premium Paint Partners'
      ]
    },
    relatedServices: [
      {
        slug: 'commercial-painting',
        name: 'Commercial Painting',
        image: '/project-commercial.jpg'
      },
      {
        slug: 'condo-multi-unit',
        name: 'Condo & Multi-Unit Painting',
        image: '/project-industrial.jpg'
      },
      {
        slug: 'cabinet-refinishing',
        name: 'Cabinet Refinishing',
        image: '/project-institutional.jpg'
      }
    ],
    testimonial: {
      quote: 'Our home looks absolutely stunning! The team was incredibly professional, kept everything clean, and the attention to detail was remarkable. We couldn\'t be happier with the transformation.',
      author: 'Sarah Williams',
      project: 'Full Home Interior & Exterior',
      location: 'Oakville'
    }
  },

  'condo-multi-unit': {
    slug: 'condo-multi-unit',
    name: 'Condo & Multi-Unit Painting',
    category: 'Painting Services',
    tagline: 'Specialized painting for condos, apartments, and multi-residential buildings',
    description: 'Expert painting services for multi-unit residential properties with coordinated scheduling, efficient execution, and minimal resident disruption.',
    longDescription: 'We specialize in condo and multi-unit residential painting with extensive experience in coordinating large-scale projects across multiple units. Our team understands the unique challenges of multi-residential properties, including scheduling coordination with property managers, compliance with condo bylaws, and minimizing disruption to residents. We provide comprehensive project management, efficient crew deployment, and consistent quality across all units. Whether it\'s common area refreshes, individual unit turnover, or building-wide exterior painting, we deliver exceptional results on time and within budget.',
    heroImage: '/hero-construction.jpg',
    benefits: [
      {
        icon: Users,
        title: 'Resident-Focused',
        description: 'Minimal disruption with flexible scheduling and proactive communication with residents'
      },
      {
        icon: Building,
        title: 'Multi-Unit Expertise',
        description: 'Specialized experience managing large-scale projects across multiple units simultaneously'
      },
      {
        icon: CheckCircle,
        title: 'Consistent Quality',
        description: 'Uniform finish and color matching across all units for cohesive appearance'
      },
      {
        icon: Settings,
        title: 'Condo Compliance',
        description: 'Full adherence to condo regulations, bylaws, and property management requirements'
      },
      {
        icon: Clock,
        title: 'Efficient Scheduling',
        description: 'Coordinated timelines that work with property management and resident schedules'
      },
      {
        icon: DollarSign,
        title: 'Volume Pricing',
        description: 'Competitive rates for multi-unit projects with transparent pricing structure'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Property Assessment',
        description: 'Comprehensive evaluation and planning',
        details: 'We meet with property managers and condo boards to assess the scope, discuss scheduling requirements, review bylaws and regulations, and create a detailed project plan that minimizes resident disruption.'
      },
      {
        step: 2,
        title: 'Resident Communication',
        description: 'Proactive scheduling and notifications',
        details: 'We coordinate with property management to communicate timelines to residents, schedule unit access, and provide clear expectations. Residents receive advance notice and our team maintains professional, respectful interactions.'
      },
      {
        step: 3,
        title: 'Systematic Execution',
        description: 'Efficient multi-unit painting',
        details: 'Our crews work systematically through units using consistent techniques and materials. We maintain organized workflows, protect common areas, and ensure uniform quality across all spaces while adhering to the project timeline.'
      },
      {
        step: 4,
        title: 'Quality Verification',
        description: 'Unit-by-unit inspection and approval',
        details: 'Each completed unit undergoes thorough inspection before final approval. We coordinate with property management for walkthroughs, address any concerns immediately, and ensure complete satisfaction before moving to the next phase.'
      }
    ],
    quickFacts: {
      projectTypes: [
        'Condo common area painting',
        'Individual unit turnover',
        'Building exterior painting',
        'Hallway and corridor painting',
        'Parking garage coating',
        'Amenity space refreshes'
      ],
      timeline: '1-4 weeks depending on building size and unit count',
      serviceArea: 'GTA including Toronto, Mississauga, Brampton, Vaughan, and surrounding areas',
      certifications: [
        'Multi-Residential Specialists',
        'Condo Board Approved',
        'WSIB Compliant',
        'Fully Insured'
      ]
    },
    relatedServices: [
      {
        slug: 'commercial-painting',
        name: 'Commercial Painting',
        image: '/project-commercial.jpg'
      },
      {
        slug: 'residential-painting',
        name: 'Residential Painting',
        image: '/project-industrial.jpg'
      },
      {
        slug: 'parking-garage-restoration',
        name: 'Parking Garage Restoration',
        image: '/project-institutional.jpg'
      }
    ],
    testimonial: {
      quote: 'Managing a 200-unit condo building painting project seemed overwhelming, but Ascent Group made it seamless. They coordinated everything perfectly, communicated clearly with residents, and delivered consistent quality throughout. Highly recommended for any multi-unit property.',
      author: 'David Thompson',
      project: 'Condo Building Refresh',
      location: 'North York'
    }
  },

  'general-contracting': {
    slug: 'general-contracting',
    name: 'General Contracting',
    category: 'Construction Management',
    tagline: 'Complete project management from concept to completion',
    description: 'Full-service general contracting for commercial, residential, and industrial projects with expert project management and quality craftsmanship.',
    longDescription: 'Our general contracting services provide comprehensive project management and construction services for projects of all sizes and complexities. We handle every aspect of your project from initial planning and permitting through final completion and closeout. With decades of experience across commercial, residential, and industrial sectors, our team delivers projects on time, within budget, and to the highest quality standards. We coordinate all trades, manage timelines and budgets, ensure regulatory compliance, and maintain clear communication throughout the project lifecycle.',
    heroImage: '/hero-construction.jpg',
    benefits: [
      {
        icon: Hammer,
        title: 'Single Point of Contact',
        description: 'Simplified project management with one team coordinating all aspects of your construction'
      },
      {
        icon: CheckCircle,
        title: 'Quality Assurance',
        description: 'Rigorous quality control processes ensure superior workmanship at every stage'
      },
      {
        icon: Clock,
        title: 'On-Time Delivery',
        description: 'Proven project management expertise keeps your project on schedule and within budget'
      },
      {
        icon: Shield,
        title: 'Risk Mitigation',
        description: 'Comprehensive insurance and safety protocols protect your investment'
      },
      {
        icon: Award,
        title: 'Expert Trades',
        description: 'Network of skilled, licensed trades ensures professional execution across all disciplines'
      },
      {
        icon: Users,
        title: 'Clear Communication',
        description: 'Regular updates and transparent reporting keep you informed throughout the project'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Discovery & Planning',
        description: 'Detailed project scoping and planning',
        details: 'We begin with comprehensive discovery to understand your vision, requirements, and constraints. Our team develops detailed plans, coordinates with architects and engineers, prepares budgets, and creates realistic timelines for your approval.'
      },
      {
        step: 2,
        title: 'Permitting & Approvals',
        description: 'Regulatory compliance and documentation',
        details: 'We handle all permit applications, regulatory approvals, and compliance documentation. Our experience with local building codes and processes ensures smooth approval and legal compliance throughout the project.'
      },
      {
        step: 3,
        title: 'Construction Execution',
        description: 'Professional construction and trade coordination',
        details: 'Our project managers coordinate all trades, manage material procurement, enforce safety protocols, and maintain quality control. We provide regular progress updates and promptly address any issues that arise.'
      },
      {
        step: 4,
        title: 'Completion & Handover',
        description: 'Final inspections and project closeout',
        details: 'We conduct thorough final inspections, complete all closeout documentation, obtain final approvals, and provide comprehensive warranty information. Your complete satisfaction is our priority.'
      }
    ],
    quickFacts: {
      projectTypes: [
        'Commercial renovations and fit-outs',
        'Residential additions and renovations',
        'Industrial facility construction',
        'Institutional projects',
        'Tenant improvements',
        'New construction projects'
      ],
      timeline: 'Varies by project scope - typically 2 weeks to 12 months',
      serviceArea: 'Greater Toronto Area and Southern Ontario',
      certifications: [
        'Licensed General Contractor',
        'WSIB Compliant',
        'Full Liability Insurance',
        'Bonding Available'
      ]
    },
    relatedServices: [
      {
        slug: 'commercial-painting',
        name: 'Commercial Painting',
        image: '/project-commercial.jpg'
      },
      {
        slug: 'drywall-finishing',
        name: 'Drywall Finishing',
        image: '/project-industrial.jpg'
      },
      {
        slug: 'masonry-repair',
        name: 'Masonry Repair',
        image: '/project-institutional.jpg'
      }
    ],
    testimonial: {
      quote: 'From initial planning to final walkthrough, Ascent Group demonstrated exceptional professionalism and expertise. They managed our complex renovation project flawlessly, coordinating multiple trades and delivering outstanding results on time and on budget.',
      author: 'Jennifer Rodriguez',
      project: 'Commercial Office Renovation',
      location: 'Mississauga'
    }
  },

  'exterior-siding': {
    slug: 'exterior-siding',
    name: 'Exterior Siding',
    category: 'Exterior Systems',
    tagline: 'Professional siding installation and repair for lasting protection',
    description: 'Expert exterior siding services including installation, repair, and replacement for vinyl, fiber cement, wood, and engineered siding systems.',
    longDescription: 'Our exterior siding services provide comprehensive solutions to protect and beautify your building\'s exterior. We specialize in all types of siding materials including vinyl, fiber cement, wood, and engineered products. Our experienced installers ensure proper installation techniques that maximize durability, energy efficiency, and weather resistance. Whether you need complete siding replacement, repairs, or new installation, we deliver quality workmanship backed by manufacturer warranties and our commitment to excellence. We use advanced installation methods and premium materials to ensure your siding performs beautifully for decades.',
    heroImage: '/hero-construction.jpg',
    benefits: [
      {
        icon: Shield,
        title: 'Weather Protection',
        description: 'Premium siding systems protect your building from moisture, wind, and environmental damage'
      },
      {
        icon: Home,
        title: 'Enhanced Aesthetics',
        description: 'Modern siding options dramatically improve curb appeal and property value'
      },
      {
        icon: DollarSign,
        title: 'Energy Efficiency',
        description: 'Proper siding installation with insulation reduces heating and cooling costs'
      },
      {
        icon: Clock,
        title: 'Low Maintenance',
        description: 'Quality siding materials require minimal maintenance while looking great for years'
      },
      {
        icon: Award,
        title: 'Expert Installation',
        description: 'Professional installation techniques ensure long-term performance and durability'
      },
      {
        icon: CheckCircle,
        title: 'Warranty Protection',
        description: 'Manufacturer warranties plus our workmanship guarantee provide complete peace of mind'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Material Selection',
        description: 'Expert consultation on siding options',
        details: 'We help you select the ideal siding material and style for your building, considering aesthetics, budget, maintenance requirements, and climate considerations. We provide samples and detailed information on all options.'
      },
      {
        step: 2,
        title: 'Surface Preparation',
        description: 'Thorough preparation and repairs',
        details: 'We remove old siding if needed, inspect and repair underlying structure, install proper moisture barriers and insulation, and ensure a solid foundation for your new siding system.'
      },
      {
        step: 3,
        title: 'Professional Installation',
        description: 'Expert siding installation',
        details: 'Our certified installers follow manufacturer specifications and industry best practices. We ensure proper alignment, secure fastening, correct overlaps, and weathertight seals for optimal performance and appearance.'
      },
      {
        step: 4,
        title: 'Finishing & Inspection',
        description: 'Trim installation and quality verification',
        details: 'We install trim, soffits, and fascia for a complete, polished look. Our final inspection verifies proper installation, addresses any details, and ensures you\'re completely satisfied with the result.'
      }
    ],
    quickFacts: {
      projectTypes: [
        'Vinyl siding installation',
        'Fiber cement siding',
        'Wood and cedar siding',
        'Engineered wood siding',
        'Siding repair and replacement',
        'Trim and soffit installation'
      ],
      timeline: '1-3 weeks for typical residential projects',
      serviceArea: 'GTA and Southern Ontario',
      certifications: [
        'Certified Siding Installers',
        'Manufacturer Approved',
        'WSIB Compliant',
        'Fully Insured'
      ]
    },
    relatedServices: [
      {
        slug: 'stucco-installation',
        name: 'Stucco Installation',
        image: '/project-commercial.jpg'
      },
      {
        slug: 'masonry-repair',
        name: 'Masonry Repair',
        image: '/project-industrial.jpg'
      },
      {
        slug: 'metal-cladding',
        name: 'Metal Cladding',
        image: '/project-institutional.jpg'
      }
    ],
    testimonial: {
      quote: 'The transformation is incredible! Our home looks modern and beautiful. The Ascent team was professional, completed the work efficiently, and the quality of installation is outstanding. Best decision we made for our home.',
      author: 'Robert Anderson',
      project: 'Full Home Siding Replacement',
      location: 'Aurora'
    }
  }
};
