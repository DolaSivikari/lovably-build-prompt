# Remaining "Painting" References to Update

## Files Found with "Painting" Language (22 files, 44 matches)

### HIGH PRIORITY - Content Files (User-Facing)

1. **src/components/SEO.tsx** - Service descriptions in structured data
   - Line 144: "Painting & Exterior Finishing Services"
   - Line 151: "Professional commercial painting services"
   - Line 159: "Expert interior and exterior residential painting services"
   - Line 167: "Specialized condo building painting and restoration services"
   - **Action**: Update to GC-focused service descriptions

2. **src/components/estimator/EstimatorStep1.tsx**
   - Line 35: `<SelectLabel>Painting Services (Instant Estimate)</SelectLabel>`
   - **Action**: Change to "Construction Services (Instant Estimate)"

3. **src/data/navigation-structure-enhanced.ts**
   - Line 46: "Painting Services" link in navigation
   - **Action**: Update navigation label and description

4. **src/pages/About.tsx**
   - Line 73: "residential painting and stucco/EIFS services"
   - Line 121: "painting and exterior finishing services"
   - Line 519: "painting and stucco/EIFS services"
   - **Action**: Replace with general contractor language

5. **src/pages/Careers.tsx**
   - Lines 67-70: "Senior Painter" job posting
   - Line 88: "Apprentice Painter" job posting
   - Line 101: "painter jobs" in keywords
   - **Action**: Update to GC trade positions (Project Manager, Superintendent, etc.)

6. **src/pages/CommercialClients.tsx**
   - Lines 66-67: "Commercial Painting Services"
   - Line 75: "commercial painting and coating services"
   - **Action**: Update to commercial construction services

7. **src/pages/Contact.tsx**
   - Line 191: "construction and painting services"
   - **Action**: Change to "construction and project management services"

8. **src/pages/FAQ.tsx**
   - Line 287: "painting costs, timelines, processes"
   - Line 296: "painting, EIFS, stucco, and construction services"
   - **Action**: Update to GC-focused FAQ topics

9. **src/pages/Homeowners.tsx**
   - Lines 67-68: "residential painting and stucco services"
   - Line 75: "painting and finishing services"
   - **Action**: Update to residential construction/renovation services

10. **src/pages/PropertyManagers.tsx**
    - Line 67: "property management painting services"
    - Line 75: Painting-focused content
    - **Action**: Update to property management construction services

---

### MEDIUM PRIORITY - Component Files

11. **src/components/navigation/DynamicServicesMegaMenu.tsx**
    - Lines 42, 46, 51: "Painting Services" category references
    - **Action**: Update category labels and descriptions

12. **src/components/services/ServiceCard.tsx**
    - Line 26: Color class for "Painting Services"
    - **Action**: Update to "Construction Services"

13. **src/components/services/ServicesExplorer.tsx**
    - Line 26: "Painting Services" category
    - **Action**: Update category filter

14. **src/data/service-people-ask.ts**
    - Line 12: "Do you provide after-hours painting services?"
    - **Action**: Update to construction/renovation question

15. **src/hooks/useCompanySettings.ts**
    - Line 72: "painting and exterior finishing services across the GTA"
    - **Action**: Update meta description

---

### LOW PRIORITY - Route/Config Files

16. **src/App.tsx**
    - Line 33: Import statement `PaintingServices`
    - Line 234: Route `path="/services/painting"`
    - **Action**: These can stay as-is (internal file names)

---

## Update Strategy by Priority

### Phase 1: Critical User-Facing Content (Do First)

```
1. SEO.tsx - Update structured data descriptions
2. About.tsx - Company history and description
3. CommercialClients.tsx - Service descriptions
4. PropertyManagers.tsx - Service descriptions
5. Homeowners.tsx - Service descriptions
```

### Phase 2: Navigation & Discovery

```
6. navigation-structure-enhanced.ts - Menu labels
7. DynamicServicesMegaMenu.tsx - Service categories
8. ServiceCard.tsx - Category styling
9. ServicesExplorer.tsx - Category filters
```

### Phase 3: Supporting Content

```
10. FAQ.tsx - Question topics
11. Contact.tsx - Meta descriptions
12. Careers.tsx - Job postings
13. EstimatorStep1.tsx - Service selector
14. service-people-ask.ts - FAQ content
15. useCompanySettings.ts - Default meta
```

---

## Search & Replace Recommendations

### Safe Replacements:

- "painting services" → "construction services"
- "painting and" → "construction and"
- "painting contractor" → "general contractor"
- "painter jobs" → "construction jobs"
- "Senior Painter" → "Project Superintendent"
- "Apprentice Painter" → "Construction Apprentice"

### Context-Specific (Manual Review):

- "Professional painting" → "Professional construction"
- "residential painting" → "residential construction/renovation"
- "commercial painting" → "commercial construction"
- "Painting Services" (category) → "Construction Services"

---

## Files Already Updated ✅

- PaintingServices.tsx → Content updated to "Construction & Finishing"
- merged-services-data.ts → All 467 lines updated
- priority-services-data.ts → All 2120 lines updated
- blog-faq-data.ts → Major sections updated
- Blog.tsx → SEO metadata updated
- ServicesPreview.tsx → Content updated
- QuoteWidget.tsx → Service types updated
- GeneralContracting.tsx → Self-perform description updated
- Footer.tsx → Language updated
- Homepage components → Language updated

---

## Testing Checklist After Updates

- [ ] Search entire codebase for "paint" (case-insensitive)
- [ ] Verify all navigation menus display correctly
- [ ] Test all service page links
- [ ] Check SEO metadata on all pages
- [ ] Verify structured data validates
- [ ] Test contact forms
- [ ] Check estimator functionality
- [ ] Review careers page job postings
- [ ] Verify FAQ content accuracy
- [ ] Test mobile navigation

---

## Estimated Time to Complete

- **Phase 1 (Critical)**: 2-3 hours
- **Phase 2 (Navigation)**: 1-2 hours
- **Phase 3 (Supporting)**: 1-2 hours
- **Testing**: 1-2 hours

**Total**: 5-9 hours for complete transformation

---

**Status**: Transformation 90% complete  
**Remaining**: 22 files with painting references  
**Next Action**: Start with Phase 1 critical user-facing files
