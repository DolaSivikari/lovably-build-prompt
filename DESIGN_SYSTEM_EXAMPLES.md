# Design System Visual Examples

## Button Variants

### Primary Button

```tsx
import { Button } from "@/ui/Button";

<Button variant="primary" size="lg">
  Request Proposal
  <ArrowRight className="w-4 h-4 ml-2" />
</Button>;
```

**Usage:** Main CTAs, form submissions, primary actions
**Colors:** Orange accent background (#F97316), white text
**Min Height:** 48px (lg), 44px (md), 40px (sm)

### Secondary Button

```tsx
<Button variant="secondary" size="lg">
  Learn More
</Button>
```

**Usage:** Secondary actions, navigation
**Colors:** Navy border (#003366), navy text, transparent background
**Hover:** Soft background (#F8FAFC)

### Navy Button

```tsx
<Button variant="navy" size="lg">
  View Projects
</Button>
```

**Usage:** Alternative primary action
**Colors:** Navy background (#003366), white text

### Ghost Button

```tsx
<Button variant="ghost">Cancel</Button>
```

**Usage:** Tertiary actions, dismissals
**Colors:** Navy text, transparent, hover soft background

## Card Variants

### Elevated Card

```tsx
import { Card } from "@/ui/Card";

<Card variant="elevated">
  <div className="p-6">{/* Content */}</div>
</Card>;
```

**Shadow:** 0 6px 20px rgba(0, 0, 0, 0.08)
**Background:** White
**Radius:** 16px

### Outlined Card

```tsx
<Card variant="outlined">
  <div className="p-6">{/* Content */}</div>
</Card>
```

**Border:** 1px solid #E5E7EB
**Background:** White
**Radius:** 16px

## Form Inputs

### Text Input

```tsx
import { Input } from "@/ui/Input";

<Input placeholder="Enter your name" required />;
```

**Min Height:** 44px (accessibility)
**Border:** 1px solid #E5E7EB
**Focus Ring:** 2px navy (#003366)
**Radius:** 12px

### Textarea

```tsx
import { Textarea } from "@/ui/Textarea";

<Textarea placeholder="Project details..." rows={6} required />;
```

**Min Height:** 120px
**Same styling as Input**

### Select

```tsx
import { Select } from "@/ui/Select";

<Select>
  <option>Choose one</option>
  <option value="commercial">Commercial</option>
</Select>;
```

**Same styling as Input**

## Color Tokens

### Primary Colors

```css
--brand-primary: 210 100% 20%; /* Navy #003366 */
--brand-accent: 25 95% 53%; /* Orange #F97316 */
```

### Text Colors

```css
--ink: 215 25% 15%; /* Main text */
--muted: 215 16% 47%; /* Secondary text */
```

### Background Colors

```css
--bg: 0 0% 100%; /* White */
--bg-soft: 210 40% 98%; /* Soft background #F8FAFC */
```

### Feedback Colors

```css
--success: 142 76% 36%; /* Green */
--warning: 38 92% 50%; /* Yellow */
--danger: 0 84% 60%; /* Red */
--info: 217 91% 60%; /* Blue */
```

## Typography Scale

### H1 - Page Titles

```tsx
<h1 className="text-5xl md:text-6xl font-bold tracking-tight">
  General Contracting
</h1>
```

**Desktop:** 56px / 800 weight / -0.015em tracking
**Mobile:** 48px / 800 weight

### H2 - Section Headers

```tsx
<h2 className="text-4xl md:text-5xl font-bold">Why Choose Ascent</h2>
```

**Desktop:** 44px / 800 weight
**Mobile:** 36px / 800 weight

### H3 - Subsection Titles

```tsx
<h3 className="text-3xl font-bold">Our Services</h3>
```

**Size:** 28px / 700 weight

### H4 - Card Titles

```tsx
<h4 className="text-xl font-semibold">Licensed Excellence</h4>
```

**Size:** 22px / 600 weight

### Body Text

```tsx
<p className="text-base leading-relaxed text-muted-foreground">
  Description text here...
</p>
```

**Size:** 16px / 400 weight / 28px line height

## Spacing Standards

### Section Spacing

```tsx
// Major sections
<section className="py-20">

// Subsections
<section className="py-16">

// Tight sections
<section className="py-12">
```

### Grid Gaps

```tsx
// Card grids
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

// Stat grids
<div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
```

### Internal Padding

```tsx
// Cards
<div className="p-6">

// Large containers
<div className="p-8">

// Tight spacing
<div className="p-4">
```

## Icon Standards

### Icon Sizes

```tsx
import { Shield } from "lucide-react";

// Small (inline)
<Shield className="w-4 h-4" />

// Medium (card headers)
<Shield className="w-6 h-6" />

// Large (feature icons)
<Shield className="w-8 h-8" />

// Extra large (hero)
<Shield className="w-12 h-12" />
```

### Icon Colors

```tsx
// Primary
<Shield className="w-6 h-6 text-primary" />

// Accent
<Award className="w-6 h-6 text-accent" />

// Muted
<Info className="w-4 h-4 text-muted-foreground" />
```

## Mobile Breakpoints

### Tailwind Breakpoints

```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Responsive Patterns

```tsx
// Stack on mobile, 2-col on tablet, 3-col on desktop
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

// Responsive text sizing
<h1 className="text-4xl md:text-5xl lg:text-6xl">

// Responsive padding
<section className="py-12 md:py-16 lg:py-20">

// Hide on mobile, show on desktop
<div className="hidden lg:block">
```

## Accessibility Requirements

### Touch Targets

**Minimum:** 44px × 44px for all interactive elements

```tsx
<Button size="md" /> // 44px min height
<Input /> // 44px min height
```

### Focus States

All interactive elements must have visible focus rings:

```tsx
// Automatic via design system
focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
```

### ARIA Labels

```tsx
// Icon-only buttons
<button aria-label="Close menu">
  <X className="w-5 h-5" />
</button>

// Form inputs (always use labels)
<Label htmlFor="email">Email Address</Label>
<Input id="email" type="email" />
```

### Color Contrast

All text must meet WCAG AA standards (4.5:1 minimum):

- ✅ Navy text on white: 12.6:1
- ✅ Muted text on white: 4.8:1
- ✅ White text on navy: 12.6:1
- ✅ White text on orange: 3.4:1 (large text only)

## Common Patterns

### Section Header

```tsx
<div className="text-center mb-16 max-w-4xl mx-auto">
  <h2 className="text-4xl md:text-5xl font-bold mb-6">Section Title</h2>
  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
    Section description here...
  </p>
</div>
```

### Card with Icon

```tsx
<Card variant="elevated" className="h-full">
  <div className="p-6">
    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent flex items-center justify-center mb-6">
      <Shield className="w-8 h-8 text-primary" />
    </div>
    <h3 className="text-xl font-bold mb-3">Card Title</h3>
    <p className="text-sm text-muted-foreground leading-relaxed">
      Card description...
    </p>
  </div>
</Card>
```

### Stat Counter

```tsx
<div className="text-center">
  <div className="text-5xl md:text-6xl font-bold text-primary mb-2 tracking-tight">
    500+
  </div>
  <div className="text-sm md:text-base text-muted-foreground font-medium">
    Projects Completed
  </div>
</div>
```

### CTA Section

```tsx
<div className="bg-card/80 backdrop-blur-sm rounded-2xl border-2 border-primary/20 p-8 shadow-xl">
  <h3 className="text-2xl font-bold mb-4">Ready to Start?</h3>
  <p className="text-muted-foreground mb-6">
    Get a detailed estimate for your project
  </p>
  <div className="flex flex-col sm:flex-row gap-4 justify-center">
    <Button asChild size="lg" variant="primary">
      <Link to="/contact">Request Proposal</Link>
    </Button>
    <Button asChild size="lg" variant="secondary">
      <Link to="/projects">View Projects</Link>
    </Button>
  </div>
</div>
```
