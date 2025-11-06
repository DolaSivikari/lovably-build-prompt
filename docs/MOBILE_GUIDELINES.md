# Mobile Design Guidelines

## Overview

This document outlines the mobile design standards and best practices for the Ascent Group Construction website to ensure optimal user experience across all mobile devices.

## Core Principles

### 1. Touch Target Standards

**Minimum Size: 44x44 pixels (WCAG Level AAA)**

All interactive elements must meet or exceed this standard:

#### Buttons

- **Default**: 44px height minimum (`h-11 min-h-[44px]`)
- **Small**: 40px height minimum (`h-10 min-h-[40px]`)
- **Large**: 48px height minimum (`h-12 min-h-[48px]`)
- **Icon**: 44x44px minimum (`h-11 w-11 min-h-[44px] min-w-[44px]`)

#### Form Inputs

- **All inputs**: 44px height minimum (`h-11 min-h-[44px]`)
- **Text areas**: 100px minimum height on mobile
- **Select dropdowns**: 44px height minimum

#### Links & Interactive Elements

- Minimum spacing between tappable elements: 8px
- Card links: Full card area tappable
- Navigation links: 44px tap area with padding

### 2. Typography Standards

#### Font Sizes

```css
/* Body Text */
text-base (16px) /* Prevents iOS zoom on focus */
md:text-sm (14px on desktop)

/* Headings */
Mobile:
- H1: text-3xl (30px) - text-4xl (36px)
- H2: text-2xl (24px) - text-3xl (30px)
- H3: text-xl (20px) - text-2xl (24px)
- H4: text-lg (18px)
- H5: text-base (16px)
- H6: text-sm (14px)

Desktop (md:):
- H1: text-5xl (48px) - text-6xl (60px)
- H2: text-4xl (36px)
- H3: text-3xl (30px)
- H4: text-2xl (24px)
- H5: text-xl (20px)
- H6: text-lg (18px)
```

#### Line Height

- Body text: `leading-relaxed` (1.625) or `leading-7` (1.75)
- Headings: `leading-tight` (1.25)
- UI text: `leading-normal` (1.5)

#### Text Wrapping

- Use `break-words` on all headings to prevent overflow
- Use `line-clamp-2` or `line-clamp-3` for truncation
- Avoid `whitespace-nowrap` on mobile

### 3. Spacing Standards

#### Container Padding

```tsx
className = "px-4 sm:px-6 md:px-8";
```

- Mobile (< 640px): 16px (px-4)
- Small tablets (640px+): 24px (px-6)
- Desktop (768px+): 32px (px-8)

#### Section Spacing

```tsx
className = "py-12 md:py-16 lg:py-20";
```

- Mobile: 48px vertical
- Desktop: 64-80px vertical

#### Component Gaps

- Between elements: `gap-3` (12px) on mobile, `gap-4` (16px) on desktop
- Between sections: `gap-6` (24px) on mobile, `gap-8` (32px) on desktop

### 4. Layout Guidelines

#### Grid Layouts

```tsx
/* Default pattern for responsive grids */
className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6";
```

- Mobile: Single column
- Tablet: 2 columns
- Desktop: 3-4 columns

#### Navigation

- **Mobile Menu**: Full-screen sheet (left-side)
- **Hamburger Icon**: 44x44px minimum
- **Menu Items**: 44px tap height minimum
- **Sticky CTA**: Fixed bottom with safe-area padding

#### Hero Sections

- **Height**: 50vh on mobile, 60vh on desktop
- **Min height**: 400px mobile, 500px desktop
- **Background**: Simplified or white on mobile
- **Text**: Reduced size, increased line height

### 5. Component-Specific Standards

#### Cards

```tsx
/* Project/Service Cards */
- Image height: h-48 (192px) on mobile, h-64 (256px) on desktop
- Padding: p-4 on mobile, p-6 on desktop
- Hover effects: Disabled on touch devices
- Full card tappable area
```

#### Modals/Dialogs

```tsx
/* Mobile-optimized dialog */
className =
  "w-[calc(100%-2rem)] max-w-lg p-4 sm:p-6 rounded-lg max-h-[90vh] overflow-y-auto";
```

- Width: Full width minus 32px margin
- Padding: 16px mobile, 24px desktop
- Max height: 90vh with scroll
- Close button: 44x44px top-right

#### Forms

```tsx
/* Contact/Quote Forms */
- Field spacing: space-y-4
- Grid on desktop: grid md:grid-cols-2 gap-4
- Full width buttons on mobile
- Submit button: h-12 (48px minimum)
- Labels: text-sm font-medium
```

#### Navigation

```tsx
/* Mobile Navigation */
- Sheet width: w-full sm:max-w-md
- Search input: h-11 (44px)
- Menu items: py-3 (12px vertical padding = 44px+ total)
- Accordion triggers: py-3 px-4
- Sticky CTA: min-h-[48px] buttons
```

### 6. Image Optimization

#### Responsive Images

```tsx
/* Always use OptimizedImage component */
<OptimizedImage
  src={imageSrc}
  alt="Descriptive alt text"
  width={1920}
  height={1080}
  className="w-full h-auto"
  priority={true} // for above-fold images
/>
```

#### Image Sizes

- Hero images: 1920x1080 (16:9)
- Card images: 800x600 (4:3)
- Thumbnails: 400x300
- Use `srcset` and `sizes` attributes
- Lazy load below-the-fold images

### 7. Performance Standards

#### Core Web Vitals Targets (Mobile)

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID/INP** (First Input Delay/Interaction to Next Paint): < 200ms
- **CLS** (Cumulative Layout Shift): < 0.1

#### Optimization Techniques

- Minimize JavaScript execution
- Use `prefersReducedMotion` for animations
- Implement virtual scrolling for long lists
- Use `loading="lazy"` on images
- Defer non-critical CSS/JS

### 8. Accessibility Standards

#### WCAG 2.2 Level AA Compliance

**Contrast Ratios:**

- Body text: 4.5:1 minimum
- Large text (18px+): 3:1 minimum
- UI components: 3:1 minimum

**Keyboard Navigation:**

- All interactive elements focusable
- Logical tab order
- Visible focus indicators (2px ring)
- Skip links for main content

**Screen Reader Support:**

- Semantic HTML (`<nav>`, `<main>`, `<section>`, `<article>`)
- ARIA labels on icon buttons
- Alt text on all images
- Form labels properly associated

### 9. Safe Area Support (Notched Devices)

```css
/* CSS for safe areas */
.safe-area-top {
  padding-top: env(safe-area-inset-top);
}

.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}
```

Use on:

- Fixed headers
- Fixed footers
- Sticky CTAs
- Full-screen modals

### 10. Testing Checklist

#### Device Matrix

- [ ] iPhone SE (375x667) - Smallest iOS
- [ ] iPhone 12/13/14 (390x844) - Standard
- [ ] iPhone 14 Pro Max (430x932) - Large
- [ ] Android Small (360x640)
- [ ] Android Medium (412x915)
- [ ] iPad Mini (768x1024)

#### Browser Testing

- [ ] Safari iOS (primary)
- [ ] Chrome Android
- [ ] Samsung Internet
- [ ] Firefox Mobile

#### Test Scenarios

1. **Navigation**
   - [ ] Open/close mobile menu
   - [ ] Tap all menu items
   - [ ] Search functionality
   - [ ] Breadcrumb navigation
2. **Forms**
   - [ ] Fill out contact form
   - [ ] Submit quote request
   - [ ] Validation messages display
   - [ ] iOS keyboard doesn't cover inputs
3. **Content**
   - [ ] Read blog post (full scroll)
   - [ ] View case study
   - [ ] Open image lightbox
   - [ ] Watch video
4. **Interactions**
   - [ ] Tap all buttons
   - [ ] Accordion expand/collapse
   - [ ] Modal open/close
   - [ ] Floating contact menu
5. **Performance**
   - [ ] Page load < 3s on 3G
   - [ ] Smooth scrolling
   - [ ] No jank on animations
   - [ ] Images load progressively

### 11. Common Issues & Fixes

#### Issue: iOS Zoom on Input Focus

**Fix:**

```tsx
/* Ensure 16px minimum font size */
className = "text-base"; // 16px, not text-sm (14px)
```

#### Issue: Buttons Too Small

**Fix:**

```tsx
/* Add minimum height */
className = "min-h-[44px]";
```

#### Issue: Text Overflow

**Fix:**

```tsx
/* Add break-words on headings */
className = "break-words";
/* Or truncate with ellipsis */
className = "line-clamp-2";
```

#### Issue: Modal Too Large on Mobile

**Fix:**

```tsx
/* Use calc() for width with margin */
className = "w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto";
```

#### Issue: Horizontal Scroll

**Fix:**

```tsx
/* Add overflow-x-hidden to container */
className = "overflow-x-hidden";
/* Or constrain child widths */
className = "max-w-full";
```

#### Issue: Sticky Elements Covering Content

**Fix:**

```tsx
/* Add safe-area padding */
style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
/* Or use z-index properly */
className="z-10" // below modals (z-50)
```

### 12. Component Patterns

#### Responsive Card

```tsx
<Card className="overflow-hidden hover:shadow-lg transition-all">
  <div className="relative h-48 md:h-64">
    <OptimizedImage
      src={image}
      alt={title}
      className="w-full h-full object-cover"
    />
  </div>
  <CardContent className="p-4 md:p-6">
    <h3 className="text-lg md:text-xl font-bold mb-2 break-words line-clamp-2">
      {title}
    </h3>
    <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
  </CardContent>
</Card>
```

#### Responsive Form

```tsx
<form className="space-y-4">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="space-y-2">
      <Label htmlFor="name">Name *</Label>
      <Input id="name" required className="h-11" placeholder="John Smith" />
    </div>
    <div className="space-y-2">
      <Label htmlFor="email">Email *</Label>
      <Input
        id="email"
        type="email"
        required
        className="h-11"
        placeholder="john@example.com"
      />
    </div>
  </div>
  <Button type="submit" className="w-full h-12">
    Submit
  </Button>
</form>
```

#### Responsive Navigation

```tsx
<nav className="fixed top-0 left-0 right-0 z-50">
  <div className="container mx-auto px-4">
    <div className="flex items-center justify-between h-16 md:h-20">
      <Logo />

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-6">
        <NavLinks />
      </div>

      {/* Mobile Toggle */}
      <button
        className="md:hidden min-h-[44px] min-w-[44px]"
        onClick={toggleMenu}
      >
        <MenuIcon />
      </button>
    </div>
  </div>
</nav>
```

## Implementation Checklist

When building or updating components:

- [ ] Touch targets meet 44x44px minimum
- [ ] Text size is 16px+ on mobile (prevents iOS zoom)
- [ ] Spacing follows mobile-first standards (px-4 sm:px-6 md:px-8)
- [ ] Grids collapse to single column on mobile
- [ ] Images use OptimizedImage component with responsive sizing
- [ ] Buttons have proper mobile sizing (h-11 minimum)
- [ ] Forms stack vertically on mobile
- [ ] Modals are mobile-responsive with proper width constraints
- [ ] Navigation has mobile-specific implementation
- [ ] Safe area insets handled on fixed elements
- [ ] All text has proper line-height and wrapping
- [ ] Hover effects disabled on touch devices
- [ ] Performance optimized (lazy loading, code splitting)
- [ ] Accessibility standards met (ARIA, keyboard nav, contrast)
- [ ] Tested on real devices (iOS and Android)

## Maintenance

Review this document quarterly and update based on:

- User feedback and analytics
- New device form factors
- WCAG guideline updates
- Performance metric trends
- Browser/OS updates

Last Updated: 2025-01-XX
