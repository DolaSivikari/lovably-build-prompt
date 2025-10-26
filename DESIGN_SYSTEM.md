# Design System Implementation

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
