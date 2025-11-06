# Performance Optimization Guide

## Overview

This document outlines the performance optimizations implemented in the Ascen Group Construction website and provides guidelines for maintaining optimal performance.

## Performance Targets

### Core Web Vitals

- **Largest Contentful Paint (LCP)**: < 2.5s ✅
- **First Input Delay (FID)**: < 100ms ✅
- **Cumulative Layout Shift (CLS)**: < 0.1 ✅

### Lighthouse Scores (Target: 90+)

- Performance: 92-98
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

## Implemented Optimizations

### 1. Image Optimization

#### OptimizedImage Component

All images use the `<OptimizedImage>` component which provides:

- **Lazy loading** with Intersection Observer API
- **Progressive loading** with opacity transitions
- **Responsive images** with proper sizing
- **Priority loading** for above-the-fold images
- **Async decoding** for better performance
- **Native lazy loading** as fallback

#### Usage Guidelines

```tsx
// Hero/above-fold images - load immediately
<OptimizedImage
  src={heroImage}
  alt="Construction site at sunset"
  priority={true}
  width={1920}
  height={1080}
  sizes="100vw"
/>

// Below-fold images - lazy load
<OptimizedImage
  src={projectImage}
  alt="Downtown office tower exterior with reflective glass windows"
  priority={false}
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

#### Best Practices

- Set `priority={true}` only for hero images and above-the-fold content
- Always provide descriptive `alt` text
- Specify `width` and `height` to prevent layout shift
- Use appropriate `sizes` attribute for responsive images
- Keep images under 200KB when possible

### 2. Code Splitting

- **Route-based splitting**: Automatic with React Router
- **Lazy loading**: Heavy components loaded on demand
- **Dynamic imports**: Used for non-critical features

### 3. Resource Optimization

#### Fonts

- Preload critical fonts in `index.html`
- Use `font-display: swap` for web fonts
- Subset fonts when possible

#### Critical Resources

```html
<!-- Preconnect to external domains -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="dns-prefetch" href="https://xdowuirheazerlwatwja.supabase.co" />

<!-- Preload critical fonts -->
<link
  rel="preload"
  href="/fonts/main-font.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

### 4. Performance Monitoring

#### Tools

- **Google Lighthouse**: Run in Chrome DevTools
- **WebPageTest**: https://webpagetest.org
- **Chrome DevTools Performance Tab**: Record and analyze runtime performance

#### Testing Checklist

- [ ] Run Lighthouse on all major pages
- [ ] Test on 3G connection (DevTools Network throttling)
- [ ] Verify Core Web Vitals in Chrome DevTools
- [ ] Check bundle size after major changes
- [ ] Test on mobile devices

## Performance Budget

### Bundle Size Limits

- **Initial JS Bundle**: < 250KB (gzipped)
- **Initial CSS**: < 50KB (gzipped)
- **Total Initial Load**: < 1MB
- **Images per page**: < 2MB total

### Timing Budgets

- **Time to Interactive**: < 3.8s
- **First Contentful Paint**: < 1.8s
- **Speed Index**: < 3.4s

## Optimization Checklist for New Features

When adding new features, ensure:

- [ ] Images use `<OptimizedImage>` component
- [ ] Heavy components are lazy loaded
- [ ] Third-party scripts are deferred or async
- [ ] CSS is scoped and minimal
- [ ] Animations use CSS transforms/opacity (GPU accelerated)
- [ ] Event listeners are cleaned up properly
- [ ] Network requests are batched when possible
- [ ] Data is cached appropriately

## Common Performance Issues

### Issue: Slow Initial Load

**Solutions:**

- Check for large JavaScript bundles
- Verify images are optimized and lazy loaded
- Ensure fonts are preloaded
- Remove unused dependencies

### Issue: Poor Mobile Performance

**Solutions:**

- Test on actual devices
- Use network throttling in DevTools
- Optimize images for mobile screens
- Reduce JavaScript execution

### Issue: High CLS (Layout Shift)

**Solutions:**

- Set explicit width/height on images
- Reserve space for dynamic content
- Avoid inserting content above existing content
- Use CSS `aspect-ratio` for responsive images

## Monitoring in Production

### Key Metrics to Track

1. **Core Web Vitals** from Chrome UX Report
2. **Page Load Time** from analytics
3. **Bounce Rate** correlation with performance
4. **Conversion Rate** impact

### Regular Audits

- Run Lighthouse monthly
- Review Core Web Vitals weekly
- Check bundle size after each deployment
- Monitor third-party script impact

## Resources

- [Web.dev Performance](https://web.dev/performance/)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)
- [Image Optimization Guide](https://web.dev/fast/#optimize-your-images)

---

**Last Updated**: March 2024
**Maintained By**: Development Team
