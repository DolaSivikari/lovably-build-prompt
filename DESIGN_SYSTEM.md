# Design System Implementation

## 🎯 Migration Status - Phase 3 Complete

### ✅ Phase 2: Homepage & Core Components (Completed)

- **MetricsDashboard.tsx** - Enhanced gradient, larger icons (w-8 h-8), heading size (text-5xl md:text-6xl tracking-tight)
- **ServicesPreview.tsx** - Migrated to @/ui/Button and @/ui/Card, secondary button variant
- **PageHeader.tsx** - Migrated to @/ui/Button
- **ESLint Configuration** - Added no-restricted-imports rule blocking old @/components/ui paths
- **DESIGN_SYSTEM_EXAMPLES.md** - Created comprehensive visual reference
- **Contact.tsx** - Already using @/ui/Input, @/ui/Textarea, @/ui/Button ✅
- **SubmitRFP.tsx** - Already using @/ui/Input, @/ui/Textarea, @/ui/Button ✅

### ✅ Phase 3: Service Pages Standardization (Completed)

All 12 service pages now use the standardized PageHero pattern with:

- Consistent breadcrumb navigation (Home > Services > [Service Name])
- Unified stats presentation (4 metrics in grid layout)
- Standardized CTAs ("Request Proposal" primary, "View Projects" secondary)
- Proper hero images with gradient overlays

**Service Pages Updated:**

- ✅ GeneralContracting.tsx - Already standardized
- ✅ ConstructionManagement.tsx - Already standardized
- ✅ DesignBuild.tsx - Already standardized
- ✅ BuildingEnvelope.tsx - Already standardized
- ✅ ExteriorEnvelope.tsx - **Just standardized** (migrated to PageHero, @/ui/Button)
- ✅ EIFSStucco.tsx - Already standardized
- ✅ MasonryRestoration.tsx - Already standardized
- ✅ MetalCladding.tsx - Already standardized
- ✅ Waterproofing.tsx - Already standardized
- ✅ ParkingRehabilitation.tsx - Already standardized
- ✅ InteriorBuildouts.tsx - Already standardized
- ✅ ExteriorCladding.tsx - Already standardized

### ✅ Navigation Structure Update (Completed)

- ✅ Added Markets mega menu to desktop navigation (between Services and Projects)
- ✅ Fixed service page links (Building Envelope, Parking Rehabilitation, Masonry Restoration)
- ✅ Added missing market pages (Healthcare, Education, Retail, Hospitality)
- ✅ Updated mobile navigation with Markets accordion section
- ✅ Updated AppLink.tsx route validation with all new routes
- ✅ Updated audit-routes.ts with all service and market routes
- ✅ Removed broken/duplicate links from navigation data

### 🔄 Next Steps (Remaining from Plan)

- **GCTrustStrip.tsx** - Consolidate with CertificationBadges into single trust section
- **WhyChooseUs.tsx** - Already uses @/ui/Card and @/ui/Button ✅
- Service pages (11 total) - Standardize hero sections with PageHero pattern
- Admin pages (28 total) - Bulk migration to @/ui primitives
- Business tools (5 pages) - Migrate to @/ui primitives

### 📊 Current State

- **Forms**: Contact & SubmitRFP already compliant ✅
- **Homepage Components**: MetricsDashboard ✅, ServicesPreview ✅, WhyChooseUs ✅
- **ESLint Enforcement**: Active (errors on old imports) ✅
- **Documentation**: Visual examples complete ✅

## Overview

This document outlines the design system standards implemented to ensure consistency across all 31+ pages of the website.

## Foundation Components

### PageLayout

- **Location**: `src/components/layout/PageLayout.tsx`
- **Purpose**: Standard page wrapper for consistent container width and spacing
- **Usage**: Wrap all page content for automatic spacing and layout

### Section

- **Location**: `src/components/sections/Section.tsx`
- **Purpose**: Standardized section spacing
- **Variants**:
  - `major`: py-20 (main page sections)
  - `subsection`: py-16 (nested content areas)
- **Background**: `default` | `muted`

### PageHeader

- **Location**: `src/components/PageHeader.tsx`
- **Variants**:
  - `standard`: Basic header with title and description
  - `with-cta`: Includes call-to-action button
  - `with-stats`: Displays statistics inline
  - `minimal`: Compact header for simple pages
- **Features**: Auto-generates breadcrumbs, responsive design, semantic tokens

### AppLink

- **Location**: `src/components/navigation/AppLink.tsx`
- **Purpose**: Safe link wrapper with route validation
- **Benefits**: Warns about unknown routes in development mode

## Spacing Standards

### Deprecated (DO NOT USE)

- `py-12` → Use `py-16` or `py-20`
- `py-14` → Use `py-16` or `py-20`
- `py-18` → Use `py-16` or `py-20`

### Approved Spacing

- **Major sections**: `py-20`
- **Subsections**: `py-16`
- **Container**: `container mx-auto px-4`

## Color Standards

### Semantic Tokens (ALWAYS USE)

- `text-primary-foreground` - Primary text on primary background
- `text-secondary-foreground` - Secondary text on secondary background
- `text-foreground` - Standard text color
- `text-muted-foreground` - Muted/subtle text
- `bg-primary` - Primary background color
- `bg-secondary` - Secondary background color
- `bg-background` - Standard background
- `bg-muted` - Muted background
- `border-primary` - Primary border color
- `border-border` - Standard border color

### Forbidden Classes (NEVER USE)

- ❌ `text-white` → Use `text-primary-foreground` or `text-foreground`
- ❌ `bg-black` → Use semantic background tokens
- ❌ `border-white` → Use semantic border tokens
- ❌ Direct color values (e.g., `text-[#ffffff]`)

## Typography Scale

### Headings

- **H1**: `text-4xl md:text-5xl font-bold` (line-height 1.2-1.3)
- **H2**: `text-3xl md:text-4xl font-bold`
- **H3**: `text-2xl font-bold`
- **H4**: `text-xl font-bold`

### Body Text

- **Large**: `text-lg`
- **Base**: `text-base md:text-lg`
- **Small**: `text-sm`

### Muted Text

Always use `text-muted-foreground` for secondary information

## Button Variants

### Available Variants

- `default`: Primary button with bg-primary
- `secondary`: Secondary button with bg-secondary
- `outline`: Border button with transparent background
- `ghost`: Minimal button with hover effect
- `link`: Text link styled as button

### Sizes

- `sm`: Small button (h-9)
- `default`: Standard button (h-10)
- `lg`: Large button (h-11)
- `icon`: Icon-only button (h-10 w-10)

## Database Standards

### Slug Constraints

- All slugs are automatically normalized (lowercase, trimmed)
- Unique indexes enforce slug uniqueness across:
  - `services`
  - `blog_posts`
  - `projects`

### Required Fields

- All `featured_image` fields have placeholder fallback
- Timestamps (`created_at`, `updated_at`) are automatically maintained

## Automation & Guardrails

### Design Linter

- **Script**: `scripts/design-lint.js`
- **Run**: `npm run check:design`
- **Purpose**: Scans for forbidden CSS classes
- **Violations**:
  - Errors: `text-white`, `bg-black`, `border-white`
  - Warnings: `py-12`, `py-14`, `py-18`

### Route Auditor

- **Script**: `scripts/audit-routes.ts`
- **Run**: `npm run check:links`
- **Purpose**: Validates internal links against known routes

### Combined Check

- **Run**: `npm run check`
- **Includes**: Design lint + route audit

## Migration Checklist

When creating new pages or components:

- [ ] Use `PageLayout` wrapper for pages
- [ ] Use `Section` component for consistent spacing
- [ ] Use `PageHeader` for page headers
- [ ] Use semantic color tokens (no `text-white`, `bg-black`, etc.)
- [ ] Use approved spacing (py-16 or py-20)
- [ ] Use `AppLink` for internal navigation
- [ ] Use `Button` component with proper variants
- [ ] Follow typography scale for headings
- [ ] Run `npm run check` before committing

## Pages Updated

The following pages have been standardized:

- ✅ Blog (`/blog`)
- ✅ CaseStudies (`/case-studies`)
- ✅ Projects (`/projects`)
- ✅ Services (`/services`)
- ✅ FAQ (`/faq`)
- ✅ CTASection component

## Security Notes

Database migrations include:

- Unique slug indexes with lowercase normalization
- Automatic slug sanitization triggers
- Automatic timestamp triggers
- Missing image fallback updates

Two pre-existing security warnings remain (not created by this migration):

1. Function search path mutable - requires SET search_path
2. Leaked password protection disabled - auth configuration

These should be addressed separately as they affect the entire application, not just this design system update.
