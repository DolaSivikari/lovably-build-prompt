# Image Optimization Checklist

## 📊 Performance Target
**Goal:** All images < 200KB, homepage fully loaded in < 3 seconds, Lighthouse Performance score 90+

---

## 🔍 Pre-Upload Checklist

### 1. **Format Selection**
- [ ] **WebP** for photos and complex graphics (85% smaller than JPEG)
- [ ] **SVG** for logos, icons, and simple illustrations (scalable, tiny file size)
- [ ] **AVIF** as fallback for ultra-modern browsers (better compression than WebP)
- [ ] **PNG** only for transparency requirements where WebP isn't supported
- [ ] ❌ **Avoid JPEG** unless legacy support required (use WebP instead)

### 2. **Image Dimensions**
- [ ] Hero images: **1920x1080px** (16:9 landscape)
- [ ] Service thumbnails: **800x600px** (4:3 standard)
- [ ] Project gallery: **1200x900px** (4:3 standard)
- [ ] Testimonial avatars: **150x150px** (1:1 square)
- [ ] Open Graph images: **1200x630px** (Facebook/LinkedIn share)
- [ ] Blog featured images: **1200x675px** (16:9)
- [ ] Mobile hero: **800x1200px** (portrait, if needed)
- [ ] ❌ **Never upload 4000x3000px images directly**

### 3. **Compression Targets**
- [ ] Hero images: **< 150KB** (critical path)
- [ ] Above-the-fold images: **< 100KB** (LCP optimization)
- [ ] Below-the-fold images: **< 80KB** (lazy loaded)
- [ ] Thumbnails: **< 30KB** (fast loading)
- [ ] Background images: **< 120KB** (large but compressed)
- [ ] Icons/logos: **< 10KB** (SVG preferred, PNG fallback)

### 4. **Quality Settings**
- [ ] WebP quality: **80-85%** (sweet spot for file size vs quality)
- [ ] JPEG quality: **75-80%** (if WebP unavailable)
- [ ] PNG: Use **TinyPNG** or **ImageOptim** to reduce file size 50-70%
- [ ] AVIF quality: **75-80%** (newer format, aggressive compression)

---

## 🛠️ Compression Tools

### Recommended Tools
1. **Squoosh.app** (Google, free web tool)
   - URL: https://squoosh.app/
   - Features: WebP/AVIF conversion, side-by-side comparison, quality slider
   - Best for: Individual image optimization

2. **TinyPNG / TinyJPG** (free web tool)
   - URL: https://tinypng.com/
   - Features: Batch compression, smart lossy compression
   - Best for: Bulk PNG/JPEG optimization

3. **ImageOptim** (Mac app, free)
   - Features: Drag-and-drop batch optimization, lossless compression
   - Best for: Mac users processing many images

4. **Sharp.js / vite-plugin-image-optimizer** (automated)
   - Already configured in `vite.config.ts`
   - Automatically optimizes images during build
   - Best for: Production builds (no manual work needed)

### Command Line Tools (Advanced)
```bash
# Convert to WebP with 85% quality
cwebp -q 85 input.jpg -o output.webp

# Optimize PNG losslessly
optipng -o7 input.png

# Batch convert all JPEGs to WebP
for file in *.jpg; do cwebp -q 85 "$file" -o "${file%.jpg}.webp"; done
```

---

## 📝 Implementation Checklist

### 1. **Lazy Loading** (Below-the-Fold Images)
- [ ] Use `loading="lazy"` attribute on all `<img>` tags
- [ ] Use `IntersectionObserver` for custom lazy loading
- [ ] Verify lazy loading works on mobile and desktop
- [ ] Exclude hero images from lazy loading (add `loading="eager"`)

Example:
```tsx
{/* ✅ Lazy load below-the-fold */}
<img src="/project-1.webp" alt="Commercial painting project" loading="lazy" />

{/* ✅ Eager load hero (critical) */}
<img src="/hero-banner.webp" alt="Hero" loading="eager" fetchpriority="high" />
```

### 2. **Responsive Images** (srcset for Different Screen Sizes)
- [ ] Provide 3 image sizes: mobile (800px), tablet (1200px), desktop (1920px)
- [ ] Use `srcset` and `sizes` attributes
- [ ] Test on 320px, 768px, 1440px, and 2560px screens
- [ ] Use `<picture>` element for art direction (different crops for mobile/desktop)

Example:
```tsx
<img
  src="/hero-1920.webp"
  srcset="
    /hero-800.webp 800w,
    /hero-1200.webp 1200w,
    /hero-1920.webp 1920w
  "
  sizes="(max-width: 768px) 800px, (max-width: 1440px) 1200px, 1920px"
  alt="Hero banner"
  loading="eager"
/>
```

### 3. **Modern Format Fallbacks**
- [ ] Use `<picture>` element to serve WebP with JPEG fallback
- [ ] Include AVIF for ultra-modern browsers
- [ ] Ensure fallback images are also optimized

Example:
```tsx
<picture>
  <source srcset="/image.avif" type="image/avif" />
  <source srcset="/image.webp" type="image/webp" />
  <img src="/image.jpg" alt="Fallback" loading="lazy" />
</picture>
```

### 4. **Preloading Critical Images**
- [ ] Preload hero image in `<head>` for instant display
- [ ] Preload LCP (Largest Contentful Paint) image
- [ ] Use `fetchpriority="high"` for critical images
- [ ] ❌ Don't preload more than 2-3 images (diminishing returns)

Example (in `index.html`):
```html
<link rel="preload" as="image" href="/hero-poster-1.webp" type="image/webp" fetchpriority="high">
```

### 5. **Blur-Up Placeholder (Progressive Loading)**
- [ ] Use low-quality placeholder (LQIP) for smooth transitions
- [ ] Generate 20px wide blurred thumbnail (< 1KB)
- [ ] Display blurred placeholder while full image loads
- [ ] Use CSS `filter: blur(10px)` on placeholder

Example:
```tsx
const [loaded, setLoaded] = useState(false);

<div style={{ position: 'relative' }}>
  {/* Tiny blurred placeholder */}
  <img
    src="/hero-blur-20px.webp"
    style={{ filter: loaded ? 'blur(0)' : 'blur(10px)', transition: 'filter 0.3s' }}
    alt=""
  />
  
  {/* Full quality image */}
  <img
    src="/hero-1920.webp"
    onLoad={() => setLoaded(true)}
    style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.3s' }}
    alt="Hero"
  />
</div>
```

### 6. **CDN & Caching**
- [ ] Serve images from CDN (Cloudflare, AWS CloudFront, etc.)
- [ ] Set `Cache-Control: public, max-age=31536000` for images (1 year)
- [ ] Use versioned filenames (`hero-v2.webp`) to bust cache on updates
- [ ] Enable Brotli/Gzip compression for SVG files

---

## 📏 Aspect Ratio Preservation (Avoid Layout Shift)

### Prevent CLS (Cumulative Layout Shift)
- [ ] Always specify `width` and `height` attributes on `<img>` tags
- [ ] Use CSS `aspect-ratio` property for modern browsers
- [ ] Reserve space with `min-height` for lazy-loaded images

Example:
```tsx
{/* ✅ Prevents layout shift */}
<img
  src="/project.webp"
  alt="Project"
  width="1200"
  height="900"
  style={{ aspectRatio: '4/3' }}
  loading="lazy"
/>

{/* ❌ Causes layout shift */}
<img src="/project.webp" alt="Project" loading="lazy" />
```

---

## 🧪 Testing & Validation

### Manual Testing
- [ ] Open Chrome DevTools → Network tab
- [ ] Filter by "Img" and check file sizes
- [ ] Verify all images < 200KB (hero < 150KB)
- [ ] Check "Type" column for WebP format
- [ ] Verify lazy loading (images load only when scrolling)

### Lighthouse Audit
1. Open Chrome DevTools → Lighthouse tab
2. Select "Performance" and "Desktop" or "Mobile"
3. Click "Analyze page load"
4. Target scores:
   - [ ] **Performance:** 90+
   - [ ] **LCP (Largest Contentful Paint):** < 2.5s
   - [ ] **CLS (Cumulative Layout Shift):** < 0.1
   - [ ] **FCP (First Contentful Paint):** < 1.8s

### Tools to Check Images
- [ ] **PageSpeed Insights:** https://pagespeed.web.dev/
- [ ] **GTmetrix:** https://gtmetrix.com/ (detailed waterfall chart)
- [ ] **WebPageTest:** https://www.webpagetest.org/ (advanced metrics)
- [ ] **Squoosh.app:** Compare before/after compression

---

## 📋 Image Inventory Audit

### Current Site Audit (Run This Monthly)
```bash
# Find all images > 200KB
find public/images -type f -size +200k

# Count images by format
find public/images -type f | grep -o '\.[^.]*$' | sort | uniq -c

# Total size of all images
du -sh public/images
```

| Location | Count | Total Size | Avg Size | Action Needed |
|----------|-------|------------|----------|---------------|
| `/public/hero-*.webp` | 3 | 420KB | 140KB | ✅ Optimized |
| `/src/assets/*.jpg` | 12 | 2.4MB | 200KB | ❌ Convert to WebP |
| `/public/projects/*.png` | 8 | 1.6MB | 200KB | ❌ Compress 50% |
| `/src/assets/icons/*.svg` | 24 | 48KB | 2KB | ✅ Optimized |

---

## 🚀 Quick Wins (Do These First)

### Priority 1: Hero Images (Critical Path)
- [ ] Convert to WebP at 85% quality
- [ ] Resize to 1920x1080px
- [ ] Target < 150KB per image
- [ ] Add `loading="eager"` and `fetchpriority="high"`
- [ ] Preload in `<head>`

### Priority 2: Above-the-Fold Images
- [ ] Convert to WebP
- [ ] Target < 100KB per image
- [ ] Add proper `width` and `height` attributes
- [ ] Use `loading="lazy"` (except hero)

### Priority 3: Below-the-Fold Images
- [ ] Convert to WebP
- [ ] Target < 80KB per image
- [ ] Implement lazy loading
- [ ] Use `IntersectionObserver` for progressive reveal

### Priority 4: Thumbnails & Icons
- [ ] Convert thumbnails to WebP
- [ ] Use SVG for all icons (not PNG)
- [ ] Target < 30KB for thumbnails
- [ ] Implement hover effects with CSS (not image swaps)

---

## 🔄 Maintenance Schedule

### Weekly
- [ ] Check new uploaded images meet compression targets
- [ ] Review Lighthouse scores on homepage
- [ ] Verify lazy loading still works on new pages

### Monthly
- [ ] Audit image inventory (see "Image Inventory Audit" above)
- [ ] Re-optimize any images > 200KB
- [ ] Review PageSpeed Insights for regressions
- [ ] Update image optimization tools if new versions available

### Quarterly
- [ ] Evaluate new image formats (JPEG XL, WebP2, etc.)
- [ ] Review CDN performance and caching rules
- [ ] Update documentation based on new findings

---

## 📚 Resources

### Documentation
- [Google Web Vitals Guide](https://web.dev/vitals/)
- [WebP Conversion Guide](https://developers.google.com/speed/webp)
- [Lazy Loading Best Practices](https://web.dev/lazy-loading-images/)
- [Image Optimization Guide by Jake Archibald](https://jakearchibald.com/2020/avif-has-landed/)

### Tools
- [Squoosh.app](https://squoosh.app/) - Image compression
- [TinyPNG](https://tinypng.com/) - Batch compression
- [PageSpeed Insights](https://pagespeed.web.dev/) - Performance audit
- [GTmetrix](https://gtmetrix.com/) - Detailed analysis

---

## ✅ Success Metrics

After implementing this checklist, you should see:
- ✅ Lighthouse Performance score: **90+**
- ✅ LCP (Largest Contentful Paint): **< 2.5s**
- ✅ Total image size per page: **< 1MB**
- ✅ Average image size: **< 100KB**
- ✅ Homepage load time: **< 3 seconds** (desktop), **< 5 seconds** (mobile 3G)
- ✅ Zero layout shifts (CLS < 0.1)

---

**Last Updated:** November 13, 2025  
**Next Review:** December 13, 2025
