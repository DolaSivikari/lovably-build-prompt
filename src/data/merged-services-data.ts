import { Building2, Home, Building, Layers, Hammer } from 'lucide-react';

// Painting Services Variants
export const paintingVariants = [
  {
    id: 'commercial',
    title: 'Commercial',
    tagline: 'Professional Commercial Painting Solutions',
    description: 'Expert painting services for offices, retail spaces, warehouses, and commercial facilities. Minimize disruption with flexible scheduling and efficient project management.',
    benefits: [
      'Minimal business disruption with flexible scheduling',
      'High-performance coatings for heavy traffic areas',
      'Compliance with commercial building codes',
      'Large-scale project management expertise',
      'Quick turnaround times',
      'Warranty protection for commercial applications'
    ],
    process: [
      {
        step: 1,
        title: 'Site Assessment & Planning',
        description: 'Evaluate space and plan logistics',
        details: 'Our team conducts a thorough site assessment, evaluates traffic patterns, and develops a detailed work schedule that minimizes impact on your business operations.'
      },
      {
        step: 2,
        title: 'Surface Preparation',
        description: 'Professional prep work for optimal results',
        details: 'We prepare all surfaces through cleaning, repairs, priming, and protection of fixtures and equipment to ensure a flawless finish.'
      },
      {
        step: 3,
        title: 'Application',
        description: 'Premium paint application',
        details: 'Using commercial-grade materials and proven techniques, we apply paint systematically to deliver consistent, professional results throughout your facility.'
      },
      {
        step: 4,
        title: 'Quality Inspection & Handover',
        description: 'Final inspection and cleanup',
        details: 'We conduct a detailed quality inspection, address any touch-ups, and ensure complete cleanup before handing over your refreshed space.'
      }
    ],
    quickFacts: {
      projectTypes: ['Office Buildings', 'Retail Spaces', 'Warehouses', 'Medical Facilities', 'Educational Institutions'],
      timeline: '2-6 weeks depending on scope',
      certifications: ['WSIB Certified', 'OSHA Compliant', 'Commercial Insurance']
    }
  },
  {
    id: 'residential',
    title: 'Residential',
    tagline: 'Transform Your Home with Expert Painting',
    description: 'Premium residential painting services for interiors and exteriors. From single rooms to whole-home transformations, we deliver beautiful, lasting results.',
    benefits: [
      'Personalized color consultation',
      'Meticulous attention to detail',
      'Premium paint products for durability',
      'Respectful of your home and schedule',
      'Clean, organized worksite daily',
      'Satisfaction guaranteed'
    ],
    process: [
      {
        step: 1,
        title: 'Consultation & Color Selection',
        description: 'Plan your perfect palette',
        details: 'We meet with you to understand your vision, provide color recommendations, and create a detailed project plan that aligns with your timeline and budget.'
      },
      {
        step: 2,
        title: 'Preparation',
        description: 'Thorough prep for perfect results',
        details: 'Our team carefully prepares all surfaces through cleaning, patching, sanding, and priming while protecting your furniture and flooring.'
      },
      {
        step: 3,
        title: 'Painting',
        description: 'Expert application',
        details: 'We apply premium paints using professional techniques to achieve smooth, even coverage with clean lines and beautiful finishes.'
      },
      {
        step: 4,
        title: 'Final Walkthrough',
        description: 'Ensure your complete satisfaction',
        details: 'We conduct a final walkthrough with you, address any concerns, and ensure you\'re delighted with your newly painted home.'
      }
    ],
    quickFacts: {
      projectTypes: ['Single Rooms', 'Whole Home Interior', 'Exterior Painting', 'Trim & Cabinets', 'Deck Staining'],
      timeline: '3-10 days for most projects',
      certifications: ['Licensed & Insured', 'Lead-Safe Certified', 'Warranty Backed']
    }
  },
  {
    id: 'multi-unit',
    title: 'Condo & Multi-Unit',
    tagline: 'Specialized Painting for Multi-Residential Properties',
    description: 'Comprehensive painting solutions for condominiums, apartment complexes, and multi-unit residential buildings. Expert coordination and tenant-friendly scheduling.',
    benefits: [
      'Experience with condo board requirements',
      'Tenant-friendly scheduling options',
      'Common area specialists',
      'Balcony and exterior expertise',
      'Unit turnover painting services',
      'Volume pricing for multiple units'
    ],
    process: [
      {
        step: 1,
        title: 'Building Assessment & Coordination',
        description: 'Plan with property management',
        details: 'We coordinate with property managers and condo boards to assess the scope, schedule work around tenant occupancy, and plan logistics for multi-unit access.'
      },
      {
        step: 2,
        title: 'Unit & Common Area Prep',
        description: 'Systematic preparation',
        details: 'Our teams work unit by unit, preparing surfaces while coordinating with tenants and protecting common areas during the painting process.'
      },
      {
        step: 3,
        title: 'Efficient Application',
        description: 'Coordinated painting execution',
        details: 'We paint multiple units simultaneously when possible, maintaining consistent quality while maximizing efficiency and minimizing overall project duration.'
      },
      {
        step: 4,
        title: 'Unit Sign-Off & Documentation',
        description: 'Detailed completion process',
        details: 'Each unit is inspected and signed off individually, with photo documentation provided to property management for records.'
      }
    ],
    quickFacts: {
      projectTypes: ['Condo Suites', 'Common Areas', 'Hallways & Stairwells', 'Balconies', 'Parkades', 'Amenity Spaces'],
      timeline: '2-8 weeks for buildings',
      certifications: ['Property Management Preferred', 'High-Rise Certified', 'Tenant Insurance']
    }
  }
];

// Exterior Cladding Variants
export const claddingVariants = [
  {
    id: 'siding',
    title: 'Siding Systems',
    tagline: 'Traditional & Modern Siding Solutions',
    description: 'Expert installation of vinyl, fiber cement, wood, and composite siding systems. Enhance your building\'s curb appeal while protecting your investment.',
    benefits: [
      'Wide range of siding materials and styles',
      'Improved energy efficiency',
      'Weather and moisture protection',
      'Low maintenance solutions',
      'Manufacturer warranties',
      'Professional installation expertise'
    ],
    process: [
      {
        step: 1,
        title: 'Material Selection & Planning',
        description: 'Choose the right siding',
        details: 'We help you select the ideal siding material based on your building style, budget, and performance requirements, then plan the installation logistics.'
      },
      {
        step: 2,
        title: 'Existing Siding Removal',
        description: 'Safe removal and disposal',
        details: 'If replacing existing siding, we carefully remove old materials, inspect the building envelope, and address any underlying issues before installation.'
      },
      {
        step: 3,
        title: 'Installation',
        description: 'Professional siding application',
        details: 'Our certified installers apply your new siding using manufacturer-approved methods, ensuring proper weatherproofing and long-term performance.'
      },
      {
        step: 4,
        title: 'Finishing & Inspection',
        description: 'Complete the transformation',
        details: 'We install trim, seal joints, conduct a final inspection, and ensure your new siding is ready to protect and beautify your building for years to come.'
      }
    ],
    quickFacts: {
      projectTypes: ['Residential Homes', 'Multi-Unit Buildings', 'Commercial Facilities', 'Heritage Restoration'],
      timeline: '2-6 weeks depending on size',
      certifications: ['Manufacturer Certified', 'Building Envelope Specialist', 'WSIB & Insured']
    }
  },
  {
    id: 'metal-cladding',
    title: 'Metal Cladding & Panels',
    tagline: 'Modern Metal Cladding Systems',
    description: 'Contemporary metal panel systems including standing seam, corrugated metal, and architectural panel installations for modern buildings.',
    benefits: [
      'Contemporary aesthetic appeal',
      'Exceptional durability and longevity',
      'Fire-resistant properties',
      'Recyclable and sustainable',
      'Low maintenance requirements',
      'Wide range of colors and finishes'
    ],
    process: [
      {
        step: 1,
        title: 'Design & Engineering',
        description: 'Plan your metal cladding system',
        details: 'We work with architects and engineers to design a metal cladding system that meets structural, aesthetic, and performance requirements.'
      },
      {
        step: 2,
        title: 'Substrate Preparation',
        description: 'Prepare the building envelope',
        details: 'We ensure the substrate is properly prepared with appropriate moisture barriers, insulation, and structural support for the metal panel system.'
      },
      {
        step: 3,
        title: 'Panel Installation',
        description: 'Precision metal fabrication',
        details: 'Our skilled teams install metal panels using specialized tools and techniques, ensuring proper alignment, weatherproofing, and fastening.'
      },
      {
        step: 4,
        title: 'Sealing & Quality Control',
        description: 'Final sealing and inspection',
        details: 'We seal all joints, install flashings, and conduct thorough quality inspections to ensure your metal cladding system performs flawlessly.'
      }
    ],
    quickFacts: {
      projectTypes: ['Commercial Buildings', 'Industrial Facilities', 'Modern Residential', 'Institutional Buildings'],
      timeline: '4-12 weeks for large projects',
      certifications: ['Metal Construction Certified', 'Welding Certified', 'Engineered Systems']
    }
  }
];

// Interior Buildouts Variants
export const interiorbuildoutsVariants = [
  {
    id: 'buildouts',
    title: 'Suite Buildouts',
    tagline: 'Complete Tenant Improvement Solutions',
    description: 'Ground-up interior construction for commercial and residential spaces. From framing to finishes, we deliver turnkey suite buildouts.',
    benefits: [
      'Complete project management',
      'Design-build capabilities',
      'Coordination with trades',
      'On-time, on-budget delivery',
      'Code compliance expertise',
      'Quality craftsmanship'
    ],
    process: [
      {
        step: 1,
        title: 'Planning & Permitting',
        description: 'Design and approval phase',
        details: 'We work with your architect and engineers to finalize plans, obtain permits, and establish a detailed construction schedule.'
      },
      {
        step: 2,
        title: 'Framing & Rough-Ins',
        description: 'Structure and systems',
        details: 'Our teams frame walls, coordinate mechanical/electrical/plumbing rough-ins, and prepare the space for drywall and finishes.'
      },
      {
        step: 3,
        title: 'Drywall & Finishing',
        description: 'Interior surface completion',
        details: 'We install and finish drywall to smooth perfection, preparing surfaces for paint and creating the canvas for your final finishes.'
      },
      {
        step: 4,
        title: 'Final Finishes & Handover',
        description: 'Complete the space',
        details: 'We install final finishes including flooring, paint, trim, and fixtures, then conduct final inspections before handing over your completed space.'
      }
    ],
    quickFacts: {
      projectTypes: ['Office Fit-Outs', 'Retail Spaces', 'Medical Suites', 'Restaurant Build-Outs', 'Residential Units'],
      timeline: '6-16 weeks typical',
      certifications: ['General Contractor License', 'All Trades Coordinated', 'Fully Insured']
    }
  },
  {
    id: 'drywall',
    title: 'Drywall & Finishing',
    tagline: 'Expert Drywall Installation & Finishing',
    description: 'Professional drywall hanging, taping, mudding, and finishing services for new construction, renovations, and repairs.',
    benefits: [
      'Smooth, flawless finishes',
      'Fast, efficient installation',
      'Expert repair capabilities',
      'Multiple finish levels available',
      'Dust control measures',
      'Experienced finishing crews'
    ],
    process: [
      {
        step: 1,
        title: 'Measurement & Material Prep',
        description: 'Plan the drywall installation',
        details: 'We measure spaces precisely, calculate materials, and prepare the site for efficient drywall installation.'
      },
      {
        step: 2,
        title: 'Hanging',
        description: 'Professional drywall installation',
        details: 'Our skilled crews hang drywall sheets using proper techniques for structural integrity and minimal seams.'
      },
      {
        step: 3,
        title: 'Taping & Mudding',
        description: 'Multiple coat application',
        details: 'We apply tape and multiple coats of joint compound, sanding between coats to achieve your desired finish level.'
      },
      {
        step: 4,
        title: 'Final Sanding & Inspection',
        description: 'Smooth finish ready for paint',
        details: 'We sand surfaces to perfection, clean thoroughly, and inspect to ensure walls and ceilings are ready for primer and paint.'
      }
    ],
    quickFacts: {
      projectTypes: ['New Construction', 'Renovations', 'Repairs', 'Ceiling Installation', 'Soundproofing'],
      timeline: '1-3 weeks for most projects',
      certifications: ['Journeyman Certified', 'Level 5 Finish Capable', 'WSIB Certified']
    }
  }
];
