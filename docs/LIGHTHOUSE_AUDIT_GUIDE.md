# Lighthouse Performance Audit Guide

## 🎯 Performance Targets

| Metric | Target | Current Status | Priority |
|--------|--------|----------------|----------|
| **Performance Score** | 90+ | - | 🔴 Critical |
| **Accessibility Score** | 95+ | - | 🟡 High |
| **Best Practices Score** | 100 | - | 🟢 Medium |
| **SEO Score** | 100 | - | 🟢 Medium |

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint):** < 2.5 seconds ⚡
- **FID (First Input Delay):** < 100 ms 👆
- **CLS (Cumulative Layout Shift):** < 0.1 📐
- **FCP (First Contentful Paint):** < 1.8 seconds 🎨
- **TTI (Time to Interactive):** < 3.8 seconds 🖱️
- **TBT (Total Blocking Time):** < 200 ms ⏱️

---

## 🔧 How to Run Lighthouse Audit

### Method 1: Chrome DevTools (Desktop)
1. Open your site in Google Chrome
2. Press `F12` or `Cmd+Option+I` (Mac) to open DevTools
3. Click the **Lighthouse** tab (or **⚡ icon**)
4. Select:
   - ✅ **Performance** (required)
   - ✅ **Accessibility** (recommended)
   - ✅ **Best Practices** (recommended)
   - ✅ **SEO** (recommended)
5. Choose device:
   - **Desktop** (default, good for development)
   - **Mobile** (slower, simulates 3G, more realistic)
6. Click **"Analyze page load"**
7. Wait 30-60 seconds for results
8. Review the report and save as HTML for tracking

### Method 2: PageSpeed Insights (Online, Free)
1. Go to https://pagespeed.web.dev/
2. Enter your site URL: `https://ascentgroupconstruction.com`
3. Click **"Analyze"**
4. Wait 30-60 seconds
5. View **both Mobile and Desktop** results
6. **Advantages:**
   - Real Google data (field data from actual users)
   - No need to deploy locally
   - Shareable reports

### Method 3: Lighthouse CI (Automated, Production)
```bash
# Install Lighthouse CI globally
npm install -g @lhci/cli

# Run Lighthouse on local server
lhci autorun --collect.url=http://localhost:8080

# Run on production URL
lhci autorun --collect.url=https://ascentgroupconstruction.com
```

Configuration already exists in `.lighthouserc.json`:
```json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "url": ["http://localhost:8080"]
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["warn", {"minScore": 0.95}]
      }
    }
  }
}
```

---

## 📊 Understanding the Lighthouse Report

### Performance Score Breakdown (0-100)
The score is weighted across these metrics:

| Metric | Weight | Target | What It Measures |
|--------|--------|--------|------------------|
| **First Contentful Paint (FCP)** | 10% | < 1.8s | When first text/image appears |
| **Speed Index** | 10% | < 3.4s | How quickly content visually loads |
| **Largest Contentful Paint (LCP)** | 25% | < 2.5s | When main content is visible |
| **Time to Interactive (TTI)** | 10% | < 3.8s | When page becomes fully interactive |
| **Total Blocking Time (TBT)** | 30% | < 200ms | Time browser is blocked from responding |
| **Cumulative Layout Shift (CLS)** | 15% | < 0.1 | Visual stability (no jumping elements) |

### Score Ranges
- **90-100:** ✅ **Good** (green)
- **50-89:** 🟡 **Needs Improvement** (orange)
- **0-49:** 🔴 **Poor** (red)

---

## 🚨 Common Issues & Fixes

### 1. **Slow Largest Contentful Paint (LCP) [25% weight]**

**Issue:** Hero image or main content takes > 2.5s to load

**Fixes:**
- [ ] Compress hero image to < 150KB (use WebP at 85% quality)
- [ ] Preload hero image in `<head>`:
  ```html
  <link rel="preload" as="image" href="/hero-banner.webp" type="image/webp">
  ```
- [ ] Use `fetchpriority="high"` on hero image:
  ```tsx
  <img src="/hero.webp" fetchpriority="high" loading="eager" />
  ```
- [ ] Reduce server response time (TTFB < 600ms)
- [ ] Use a CDN for images

**Expected Impact:** +15-20 points

---

### 2. **High Total Blocking Time (TBT) [30% weight]**

**Issue:** JavaScript blocks the main thread for > 200ms

**Fixes:**
- [ ] Code split large JavaScript bundles (already configured in `vite.config.ts`)
- [ ] Defer non-critical third-party scripts:
  ```html
  <script src="https://example.com/script.js" defer></script>
  ```
- [ ] Delay Google Analytics load by 3 seconds (already implemented in `index.html`)
- [ ] Use `dynamic import()` for heavy components:
  ```tsx
  const HeavyComponent = lazy(() => import('./HeavyComponent'));
  ```
- [ ] Remove unused JavaScript (check coverage in DevTools)

**Expected Impact:** +10-15 points

---

### 3. **Cumulative Layout Shift (CLS) [15% weight]**

**Issue:** Elements jump around during page load (poor user experience)

**Fixes:**
- [ ] Add `width` and `height` attributes to all `<img>` tags:
  ```tsx
  <img src="/image.webp" width="1200" height="800" alt="..." />
  ```
- [ ] Use CSS `aspect-ratio` to reserve space:
  ```css
  img {
    aspect-ratio: 16 / 9;
    width: 100%;
    height: auto;
  }
  ```
- [ ] Avoid inserting content above existing content (ads, banners)
- [ ] Preload fonts to avoid FOUT (Flash of Unstyled Text):
  ```html
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap">
  ```
- [ ] Use `font-display: swap` (already implemented)

**Expected Impact:** +5-10 points

---

### 4. **Render-Blocking Resources**

**Issue:** CSS/JS files block initial page render

**Fixes:**
- [ ] Inline critical CSS (first 14KB) in `<head>`
- [ ] Defer non-critical CSS:
  ```html
  <link rel="preload" as="style" href="/styles.css" onload="this.rel='stylesheet'">
  ```
- [ ] Use `async` or `defer` on `<script>` tags
- [ ] Remove unused CSS (PurgeCSS, already configured in Tailwind)

**Expected Impact:** +5-10 points

---

### 5. **Large JavaScript Bundles**

**Issue:** Main bundle > 200KB, slows down TTI and TBT

**Fixes:**
- [ ] Verify code splitting is working (check `vite.config.ts`)
- [ ] Lazy load admin routes (already implemented):
  ```tsx
  const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
  ```
- [ ] Remove unused dependencies:
  ```bash
  npm uninstall unused-package
  ```
- [ ] Analyze bundle size:
  ```bash
  npm run build
  # Check dist/ folder sizes
  ```
- [ ] Target: Main bundle < 150KB, total initial load < 500KB

**Expected Impact:** +10-15 points

---

### 6. **Unoptimized Images**

**Issue:** Images too large, wrong format, not lazy loaded

**Fixes:**
- [ ] Convert all images to WebP (see `docs/IMAGE_OPTIMIZATION_CHECKLIST.md`)
- [ ] Compress images to < 100KB average
- [ ] Use `loading="lazy"` on below-the-fold images
- [ ] Use responsive images with `srcset`:
  ```tsx
  <img
    src="/image-1920.webp"
    srcset="/image-800.webp 800w, /image-1200.webp 1200w, /image-1920.webp 1920w"
    sizes="(max-width: 768px) 800px, 1920px"
  />
  ```
- [ ] Enable image optimization in `vite.config.ts` (already configured)

**Expected Impact:** +15-25 points

---

### 7. **Slow Server Response Time (TTFB)**

**Issue:** Server takes > 600ms to send first byte

**Fixes:**
- [ ] Use a CDN (Cloudflare, Vercel Edge)
- [ ] Enable HTTP/2 or HTTP/3
- [ ] Optimize database queries (add indexes)
- [ ] Use Redis for caching
- [ ] Reduce edge function cold start time (Supabase)

**Expected Impact:** +5-10 points

---

## 📈 Optimization Priority Matrix

| Issue | Impact | Effort | Priority | Expected Gain |
|-------|--------|--------|----------|---------------|
| Compress hero image | High | Low | 🔴 **Critical** | +15-20 points |
| Add image dimensions | High | Low | 🔴 **Critical** | +5-10 points |
| Defer Google Analytics | High | Low | 🔴 **Critical** | +10-15 points |
| Lazy load images | High | Low | 🔴 **Critical** | +10-15 points |
| Code splitting | Medium | Low | 🟡 **High** | +10-15 points |
| Preload hero image | Medium | Low | 🟡 **High** | +5-10 points |
| CDN for images | Medium | Medium | 🟡 **High** | +5-10 points |
| Inline critical CSS | Medium | High | 🟢 **Medium** | +5-10 points |
| Remove unused JS | Low | Medium | 🟢 **Medium** | +3-5 points |

---

## 🧪 Testing Protocol

### Step 1: Baseline Audit (Before Optimization)
1. Run Lighthouse on **homepage** (desktop and mobile)
2. Run Lighthouse on **3 key landing pages** (services, projects, contact)
3. Save reports as HTML:
   - `lighthouse-homepage-before-desktop.html`
   - `lighthouse-homepage-before-mobile.html`
4. Document current scores in a spreadsheet

### Step 2: Implement Optimizations
Follow the priority matrix above, starting with critical items.

### Step 3: Re-Audit (After Each Optimization)
1. Re-run Lighthouse after **each major change**
2. Compare before/after scores
3. Document which optimization had the biggest impact

### Step 4: Production Audit (Final Validation)
1. Deploy to production
2. Wait 24 hours for CDN/cache to warm up
3. Run Lighthouse on production URL
4. Run PageSpeed Insights for real user data
5. Target: Performance 90+, all other scores 95+

---

## 📝 Audit Tracking Template

| Date | Page | Device | Perf | Access | BP | SEO | LCP | FID | CLS | Notes |
|------|------|--------|------|--------|----|----|-----|-----|-----|-------|
| 2025-11-13 | Homepage | Desktop | 68 | 92 | 100 | 98 | 3.2s | 45ms | 0.05 | Baseline |
| 2025-11-14 | Homepage | Desktop | 85 | 92 | 100 | 98 | 2.1s | 45ms | 0.02 | Hero image compressed |
| 2025-11-15 | Homepage | Desktop | 92 | 92 | 100 | 98 | 1.8s | 30ms | 0.01 | Lazy loading + dimensions |

---

## 🚀 Quick Wins (15 Minutes or Less)

These changes can be implemented immediately for instant gains:

1. **Add `width` and `height` to all images** (5 min)
   ```tsx
   <img src="/hero.webp" width="1920" height="1080" alt="..." />
   ```

2. **Compress hero image to < 150KB** (5 min)
   - Go to https://squoosh.app/
   - Upload hero image
   - Select WebP, quality 85%
   - Download and replace

3. **Add `loading="lazy"` to below-fold images** (3 min)
   ```tsx
   <img src="/project.webp" loading="lazy" alt="..." />
   ```

4. **Preload hero image** (2 min)
   Add to `index.html` `<head>`:
   ```html
   <link rel="preload" as="image" href="/hero-banner.webp" type="image/webp">
   ```

**Expected Total Gain:** +25-35 points 🎉

---

## 🔗 Resources

### Official Documentation
- [Google Lighthouse Docs](https://developers.google.com/web/tools/lighthouse)
- [Web Vitals Guide](https://web.dev/vitals/)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)

### Tools
- [PageSpeed Insights](https://pagespeed.web.dev/) - Google's official tool
- [GTmetrix](https://gtmetrix.com/) - Detailed waterfall chart
- [WebPageTest](https://www.webpagetest.org/) - Advanced testing
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) - Automated testing

### Further Reading
- [Optimize LCP](https://web.dev/optimize-lcp/)
- [Optimize FID](https://web.dev/optimize-fid/)
- [Optimize CLS](https://web.dev/optimize-cls/)
- [Image Optimization](https://web.dev/fast/#optimize-your-images)

---

**Next Steps:**
1. ✅ Run baseline Lighthouse audit
2. ✅ Review `docs/IMAGE_OPTIMIZATION_CHECKLIST.md`
3. ✅ Implement quick wins (15 minutes)
4. ✅ Re-audit to measure impact
5. ✅ Continue with high-priority optimizations

**Last Updated:** November 13, 2025  
**Next Audit:** November 20, 2025
