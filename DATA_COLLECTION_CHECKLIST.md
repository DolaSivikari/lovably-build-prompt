# Data Collection Checklist - GC Website Transformation

This checklist identifies all real company data needed to complete the General Contractor website transformation. Please gather this information before launching the updated website.

## ✅ Phase 1 (Foundation) - Already Implemented

**Status:** Database schema updated, homepage components created, navigation restructured.

**Data Needed for Current Components:**

### GC Trust Strip Statistics

Update these values in `src/components/homepage/GCTrustStrip.tsx`:

- [ ] **Total Project Value Delivered**: Currently "$30M+" (line 10)
  - _Actual value: $******\_******_
- [ ] **Buildings Completed**: Currently "500+" (line 17)
  - _Actual count: ******\_******_
- [ ] **Years in Business**: Currently "15+" (line 24)
  - _Actual years: ******\_******_
- [ ] **Bonding Capacity**: Currently "$5M" (line 31)
  - _Actual capacity: $******\_******_
- [ ] **On-Time Completion Rate**: Currently "98%" (line 38)
  - _Actual percentage: ******\_******%_

### Company Certifications

Update certifications row in `GCTrustStrip.tsx` (lines 47-67):

- [ ] **WSIB Certification**: Status and certificate expiry date
- [ ] **Liability Coverage Amount**: Currently "$5M"
  - _Actual coverage: $******\_******_
- [ ] **COR Safety Certification**: Do you have this? If not, remove or replace
- [ ] **OGCA Membership**: Are you a member? If not, replace with another affiliation

---

## 📋 Phase 2-6 Data Requirements

### Pre-Qualification Package Data

For `/prequalification` page (to be created):

- [ ] **Company Legal Name**: **************\_**************
- [ ] **Years in Business**: ****\_\_****
- [ ] **Annual Revenue Range**: $****\_**** - $****\_****
- [ ] **Bonding Capacity**: $******\_******
- [ ] **General Liability Insurance**: $******\_******
- [ ] **WSIB Account Number**: **************\_**************
- [ ] **WSIB Clearance Expiry**: **************\_**************
- [ ] **Geographic Service Area**: **************\_**************
- [ ] **Number of Full-Time Employees**: ****\_\_****
- [ ] **Union Affiliations** (if any): **************\_**************

### Safety & Compliance Statistics

For `/safety` page:

- [ ] **Current EMR Rate**: ****\_\_**** (should be <1.0)
- [ ] **TRIR (Total Recordable Incident Rate)**: ****\_\_****
- [ ] **Lost-Time Incidents**: ****\_\_**** (last 18 months)
- [ ] **Annual Safety Training Hours**: ****\_\_****
- [ ] **OSHA 30-Hour Trained Supervisors**: ****\_\_**** (count)
- [ ] **Safety Certifications Held**:
  - [ ] WSIB Clearance ✓
  - [ ] COR Certification (yes/no): ****\_\_****
  - [ ] OSHA 30-Hour (yes/no): ****\_\_****
  - [ ] Fall Protection (yes/no): ****\_\_****
  - [ ] First Aid & CPR (yes/no): ****\_\_****

### Capabilities Overview

For `/capabilities` page:

- [ ] **Typical Project Size Range**: $****\_**** - $****\_****
- [ ] **Largest Project Completed**: $******\_******
  - Project name: **************\_**************
  - Location: **************\_**************
  - Year: ****\_\_****
- [ ] **Available Bonding**: $******\_******
- [ ] **Number of Specialty Trades Coordinated**: ****\_\_****
- [ ] **Self-Perform Trade List**: (check all that apply)
  - [ ] Exterior Painting
  - [ ] Stucco & EIFS
  - [ ] Metal Cladding
  - [ ] Masonry
  - [ ] Waterproofing
  - [ ] Interior Painting
  - [ ] Drywall
  - [ ] Other: **************\_**************

### Leadership Team

For `/about#team` section:

**For Each Leadership Team Member:**

1. **Name**: **************\_**************
   - **Title**: **************\_**************
   - **Years with Company**: ****\_\_****
   - **Years Industry Experience**: ****\_\_****
   - **Professional Licenses/Certifications**: **************\_**************
   - **Notable Projects Led**: **************\_**************
   - **Education**: **************\_**************
   - **Professional Headshot**: (file path/URL)

2. **Name**: **************\_**************
   - _(Repeat fields above)_

3. **Name**: **************\_**************
   - _(Repeat fields above)_

### Project Portfolio Data

For each major project to showcase, gather:

- [ ] **Project Name**: **************\_**************
- [ ] **Client Name** (if allowed to disclose): **************\_**************
- [ ] **Project Value**: $******\_******
- [ ] **Square Footage**: ******\_****** sq ft
- [ ] **Duration**: ****\_\_**** months
- [ ] **Your Role**: (General Contractor / Construction Manager / Design-Build / Self-Perform)
- [ ] **Delivery Method**: (Lump Sum / CM-at-Risk / Design-Build / etc.)
- [ ] **Client Type**: (Multi-Family / Commercial / Institutional / Industrial)
- [ ] **Number of Trades Coordinated**: ****\_\_****
- [ ] **Peak Workforce**: ****\_\_**** workers
- [ ] **Completed On-Time?**: Yes / No
- [ ] **Completed On-Budget?**: Yes / No
- [ ] **Safety Incidents**: ****\_\_**** (count)
- [ ] **Completion Year**: ****\_\_****
- [ ] **Challenge Statement**: (2-3 sentences)
- [ ] **Solution Narrative**: (2-3 sentences)
- [ ] **Key Scope Items**: (bullet list)
- [ ] **Project Manager Name**: **************\_**************
- [ ] **Superintendent Name**: **************\_**************
- [ ] **Architect/Engineer Partners**: **************\_**************
- [ ] **High-Resolution Photos**:
  - [ ] Aerial/drone shot
  - [ ] Wide exterior (full building)
  - [ ] Construction progress photos (3-5)
  - [ ] Completed building
  - [ ] Detail shots (2-3)

**Repeat for at least 10-15 projects across different sectors.**

---

## 📄 Downloadable Documents Required

These PDFs need to be created and uploaded to the website:

- [ ] **Company Capability Statement** (PDF)
  - 2-4 pages summarizing capabilities, experience, credentials
- [ ] **Current Insurance Certificate** (PDF)
  - General liability insurance certificate
- [ ] **WSIB Clearance Certificate** (PDF)
  - Current clearance certificate
- [ ] **Safety Program Summary** (PDF)
  - 1-2 page overview of safety protocols
- [ ] **Equipment List** (PDF)
  - List of owned/operated equipment and tools
- [ ] **Reference List** (PDF)
  - 5-10 client references with contact information
- [ ] **Sample Project Portfolio** (PDF)
  - 10-15 pages showcasing key projects with photos
- [ ] **Pre-Qualification Package** (PDF)
  - Combined document with all of the above

---

## 🔄 Content Updates Needed

### Language Transformation

Review and update these existing pages to use GC language:

- [ ] `/services/painting` - Update to emphasize commercial/multi-family, not residential
- [ ] `/services/exterior-envelope` - Frame as GC service, not just trade work
- [ ] `/services/exterior-cladding` - Same as above
- [ ] `/services/interior-buildouts` - Same as above
- [ ] All blog posts - Review for painter language vs. GC language

### Call-to-Action Updates

Find and replace across entire site:

- [ ] "Free Estimate" → "Request Proposal" or "Submit RFP"
- [ ] "Get a Quote" → "Request Proposal"
- [ ] "Contact Us" → "Request Proposal" (in service contexts)

---

## 📸 Photography Requirements

### Hero Images (Homepage)

Need high-resolution images (minimum 1920x1080px) of:

- [ ] Multi-storey building construction (aerial or wide shot)
- [ ] Commercial construction site with crew
- [ ] 4+ storey building exterior (your project)
- [ ] Construction workers with safety gear on large project
- [ ] NO residential interiors or single-family homes

### Project Photography Standards

For each project, capture:

- [ ] Aerial/drone shot showing full building and site
- [ ] Wide exterior shot (full building facade)
- [ ] 3-5 construction progress photos
- [ ] Completed building exterior
- [ ] 2-3 detail shots of specialty work
- [ ] Team photo on-site (project manager, superintendent, crew)

---

## 🎯 Priority Order

### Week 1 (Critical)

1. ✅ Complete trust strip statistics
2. ✅ Update certifications list
3. ✅ Gather top 5 project data with photos
4. ✅ Prepare capability statement PDF

### Week 2 (High Priority)

1. ✅ Gather leadership team bios and headshots
2. ✅ Complete safety statistics
3. ✅ Prepare WSIB and insurance certificates
4. ✅ Gather 10+ project portfolio data

### Week 3-4 (Medium Priority)

1. ✅ Create all downloadable PDFs
2. ✅ Update existing service page content
3. ✅ Replace all CTAs site-wide
4. ✅ Capture new hero photography

### Week 5-8 (Ongoing)

1. ✅ Update blog content
2. ✅ Create market sector content
3. ✅ Develop case study narratives
4. ✅ Gather additional project photography

---

## ✅ Validation Checklist

Before launching Phase 2-6:

- [ ] All trust strip metrics verified by accounting/management
- [ ] Insurance and WSIB certificates are current (not expired)
- [ ] Leadership bios reviewed and approved by each person
- [ ] All project data verified with project managers
- [ ] Client permissions obtained for project names/photos
- [ ] All PDFs professionally formatted and proofread
- [ ] Hero photography reviewed for quality and GC positioning
- [ ] All CTA language updated across entire site
- [ ] Legal review of capability claims (bonding, insurance, etc.)
- [ ] SEO review of updated page titles and descriptions

---

## 📞 Questions?

Contact the development team if you need clarification on any data requirements or have additional information to include.

**Last Updated:** [Insert Date]
**Prepared By:** Lovable AI
**Review Status:** Pending Client Data Collection
