# Animation System Guide

Complete guide to the specialized animation utilities available in the design system.

## Table of Contents

1. [Overview](#overview)
2. [Parallax Effects](#parallax-effects)
3. [Stagger Animations](#stagger-animations)
4. [Page Transitions](#page-transitions)
5. [Scroll Reveal](#scroll-reveal)
6. [Advanced Effects](#advanced-effects)
7. [Accessibility](#accessibility)

---

## Overview

The animation system provides a comprehensive set of utilities for creating smooth, performant animations:

- **Parallax scrolling** - Multi-layer depth effects
- **Stagger animations** - Sequential reveal of list items
- **Page transitions** - Smooth navigation between routes
- **Scroll reveals** - Content animations on scroll
- **Pulse & glow effects** - Attention-grabbing animations
- **Text reveals** - Typographic animations

All animations respect `prefers-reduced-motion` for accessibility.

---

## Parallax Effects

### Basic Parallax

Use the `ParallaxSection` component for automatic parallax scrolling:

```tsx
import { ParallaxSection } from "@/components/animations";

<ParallaxSection speed="slow">
  <img src="background.jpg" alt="Background" />
</ParallaxSection>;
```

### Speed Options

- `slow` - Moves at 30% of scroll speed (background layers)
- `medium` - Moves at 50% of scroll speed (mid-ground)
- `fast` - Moves at 80% of scroll speed (foreground)
- Custom number - Any value between 0 and 1

```tsx
<ParallaxSection speed={0.25}>
  <div>Custom speed parallax</div>
</ParallaxSection>
```

### CSS-Only Parallax

For simple effects, use CSS classes directly:

```tsx
<div className="parallax-section">
  <div className="parallax-layer parallax-layer-slow">Background content</div>
  <div className="parallax-layer parallax-layer-fast">Foreground content</div>
</div>
```

### Floating Animation

```tsx
<div className="parallax-float">This element floats gently up and down</div>
```

---

## Stagger Animations

### Using StaggerContainer

Automatically staggers animations of direct children:

```tsx
import { StaggerContainer } from "@/components/animations";

<StaggerContainer type="fade">
  <Card>Item 1 - Animates first</Card>
  <Card>Item 2 - Animates second</Card>
  <Card>Item 3 - Animates third</Card>
</StaggerContainer>;
```

**Types:**

- `fade` - Fade in and slide up (600ms intervals)
- `scale` - Scale in effect (150ms intervals)

### CSS-Only Stagger

```tsx
<div className="stagger-fade-in">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<div className="stagger-scale">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

Supports up to 10 children automatically. For more items, use the hook:

### useStaggerAnimation Hook

For dynamic lists with custom delays:

```tsx
import { useStaggerAnimation } from "@/hooks/useStaggerAnimation";

const delays = useStaggerAnimation({
  itemCount: items.length,
  staggerDelay: 100,
  initialDelay: 200,
});

return (
  <div>
    {items.map((item, index) => (
      <div
        key={item.id}
        className="animate-fade-in"
        style={{ animationDelay: `${delays[index]}ms` }}
      >
        {item.content}
      </div>
    ))}
  </div>
);
```

---

## Page Transitions

### Using PageTransition Component

Wrap page content for automatic route transitions:

```tsx
import { PageTransition } from "@/components/animations";

export const MyPage = () => (
  <PageTransition type="fade" duration={400}>
    <h1>Page Content</h1>
    <p>Automatically animates on navigation</p>
  </PageTransition>
);
```

**Transition Types:**

1. **Fade** - Smooth opacity transition with slight scale

```tsx
<PageTransition type="fade">
  <YourContent />
</PageTransition>
```

2. **Slide** - Slide in from right, out to left

```tsx
<PageTransition type="slide">
  <YourContent />
</PageTransition>
```

3. **Zoom** - Zoom in/out effect

```tsx
<PageTransition type="zoom" duration={500}>
  <YourContent />
</PageTransition>
```

### CSS-Only Page Transitions

```tsx
<div className="page-transition-enter">
  Content fades in
</div>

<div className="page-slide-enter">
  Content slides in from right
</div>

<div className="page-zoom-enter">
  Content zooms in
</div>
```

---

## Scroll Reveal

### Using ScrollReveal Component

Easiest way to reveal content on scroll:

```tsx
import { ScrollReveal } from "@/components/animations";

<ScrollReveal direction="up" delay={200}>
  <h2>This fades in when scrolled into view</h2>
</ScrollReveal>

<ScrollReveal direction="left" threshold={0.3}>
  <Card>Slides in from left</Card>
</ScrollReveal>

<ScrollReveal direction="right" triggerOnce={false}>
  <img src="photo.jpg" alt="Animates every time" />
</ScrollReveal>
```

**Props:**

- `direction` - "up" | "left" | "right"
- `threshold` - 0 to 1 (how much visible before triggering)
- `triggerOnce` - boolean (default: true)
- `delay` - number in milliseconds

### useScrollReveal Hook

For custom implementations:

```tsx
import { useScrollReveal } from "@/hooks/useScrollReveal";

const MyComponent = () => {
  const { ref, isVisible } = useScrollReveal({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className={`scroll-reveal ${isVisible ? "is-visible" : ""}`}>
      Content
    </div>
  );
};
```

### CSS-Only Scroll Reveal

```tsx
<div className="scroll-reveal">
  Fades up when scrolled into view
</div>

<div className="scroll-reveal-left">
  Slides in from left
</div>

<div className="scroll-reveal-right">
  Slides in from right
</div>
```

Requires JavaScript to add `is-visible` class when in viewport.

---

## Advanced Effects

### Pulse Glow

Pulsing glow effect for attention:

```tsx
<Button className="pulse-glow">
  Important Action
</Button>

<div className="pulse-glow bg-primary/10 p-4 rounded-md">
  Highlighted content
</div>
```

### Text Reveal

Letter-by-letter text reveal:

```tsx
<div className="text-reveal">
  <span>Animated</span>
  <span> Text</span>
  <span> Reveal</span>
</div>
```

### Spotlight Effect

Rotating spotlight effect:

```tsx
<div className="relative spotlight-effect p-8">
  Content with animated spotlight
</div>
```

---

## Accessibility

### Reduced Motion Support

All animations automatically respect user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  /* All animations are disabled or reduced */
}
```

When users enable "reduce motion" in their OS:

- Animations play instantly or are removed
- Transitions become immediate
- Parallax effects are disabled
- Scroll reveals show immediately

### Best Practices

1. **Never rely on animations for critical information**
   - Content should be readable without animations

2. **Keep animations short**
   - Most animations: 200-600ms
   - Page transitions: 300-500ms

3. **Use appropriate triggers**
   - Scroll reveals: 10-30% threshold
   - User interactions: immediate response

4. **Test with reduced motion**
   - Enable in OS settings
   - Verify content is still accessible

---

## Performance Tips

1. **Use `will-change` sparingly**

   ```css
   .parallax-layer {
     will-change: transform;
   }
   ```

2. **Prefer transforms over position changes**

   ```css
   /* Good */
   transform: translateY(20px);

   /* Avoid */
   top: 20px;
   ```

3. **Use `requestAnimationFrame` for scroll**
   - All hooks use RAF for smooth 60fps

4. **Lazy load animations**
   - Only initialize when in viewport
   - Clean up observers when done

---

## Examples

### Homepage Hero with Parallax

```tsx
<ParallaxSection speed="slow" className="relative h-screen">
  <img
    src="background.jpg"
    className="absolute inset-0 w-full h-full object-cover"
  />
  <div className="relative z-10 container mx-auto">
    <ScrollReveal direction="up">
      <h1>Welcome to Our Site</h1>
    </ScrollReveal>
  </div>
</ParallaxSection>
```

### Feature Grid with Stagger

```tsx
<StaggerContainer type="scale" className="grid grid-cols-3 gap-6">
  {features.map((feature) => (
    <Card key={feature.id}>
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
    </Card>
  ))}
</StaggerContainer>
```

### Page with Transitions

```tsx
import { PageTransition } from "@/components/animations";
import { ScrollReveal } from "@/components/animations";

export const AboutPage = () => (
  <PageTransition type="fade">
    <PageHeader title="About Us" />

    <ScrollReveal direction="up">
      <section className="py-20">
        <h2>Our Story</h2>
        <p>Content here...</p>
      </section>
    </ScrollReveal>

    <ScrollReveal direction="left" delay={200}>
      <section className="py-20">
        <h2>Our Team</h2>
        <StaggerContainer type="fade" className="grid grid-cols-3 gap-8">
          {team.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </StaggerContainer>
      </section>
    </ScrollReveal>
  </PageTransition>
);
```

---

## Migration from Old Code

Replace manual animations with design system utilities:

**Before:**

```tsx
<div
  className="opacity-0 transition-all duration-500"
  style={{ animationDelay: "200ms" }}
>
  Content
</div>
```

**After:**

```tsx
<ScrollReveal delay={200}>Content</ScrollReveal>
```

**Before:**

```tsx
{
  items.map((item, index) => (
    <div
      key={item.id}
      style={{
        animationDelay: `${index * 100}ms`,
        animation: "fadeIn 0.5s ease-out forwards",
      }}
    >
      {item.name}
    </div>
  ));
}
```

**After:**

```tsx
<StaggerContainer type="fade">
  {items.map((item) => (
    <div key={item.id}>{item.name}</div>
  ))}
</StaggerContainer>
```

---

## Support

For questions or issues with animations:

1. Check this guide first
2. Review `src/styles/animations.css` for available utilities
3. See component examples in `src/components/animations/`
4. Check hooks in `src/hooks/` for custom implementations
