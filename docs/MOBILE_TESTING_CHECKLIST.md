# Mobile Testing Checklist

## Pre-Testing Setup

### Device Preparation
- [ ] Clear browser cache and cookies
- [ ] Ensure devices have stable internet (WiFi and 4G/5G)
- [ ] Update browsers to latest versions
- [ ] Enable developer tools if needed

### Testing Environment
- [ ] Test on staging environment first
- [ ] Note build version/commit hash
- [ ] Document any known issues before testing

## Device Matrix Testing

### iPhone SE (375x667) - Smallest iOS
**Purpose:** Catch minimum width issues

- [ ] Homepage loads correctly
- [ ] All text is readable (no truncation)
- [ ] Images fit within viewport
- [ ] No horizontal scrolling
- [ ] Buttons are tappable (44x44px)
- [ ] Forms are usable
- [ ] Navigation menu works
- [ ] Footer displays properly

### iPhone 12/13/14 (390x844) - Standard Modern iPhone
**Purpose:** Test typical iOS user experience

- [ ] All pages render correctly
- [ ] Hero sections display properly
- [ ] Card grids stack correctly
- [ ] Modals/dialogs are mobile-optimized
- [ ] Touch targets are adequate
- [ ] Animations perform smoothly
- [ ] Safe area insets respected (notch)
- [ ] Landscape orientation works

### iPhone 14 Pro Max (430x932) - Large iPhone
**Purpose:** Test larger screen layout

- [ ] Content scales appropriately
- [ ] White space is balanced
- [ ] Images don't appear pixelated
- [ ] Two-column layouts where appropriate
- [ ] Dynamic Island doesn't interfere

### Android Small (360x640) - Compact Android
**Purpose:** Test Android-specific rendering

- [ ] All features work in Chrome Android
- [ ] Material Design elements render correctly
- [ ] Keyboard doesn't cover inputs
- [ ] Back button behavior is correct
- [ ] System UI doesn't conflict

### Android Medium (412x915) - Standard Android
**Purpose:** Test typical Android experience

- [ ] Samsung Internet browser compatibility
- [ ] Chrome Android compatibility
- [ ] Gesture navigation works
- [ ] PWA features (if enabled)
- [ ] Notifications (if enabled)

### iPad Mini (768x1024) - Tablet Breakpoint
**Purpose:** Test tablet-desktop transition

- [ ] Layout switches to tablet view appropriately
- [ ] Navigation shows desktop or tablet menu
- [ ] Cards display in 2-3 column grids
- [ ] Touch targets remain adequate
- [ ] Landscape and portrait both work

## Browser Testing

### Safari iOS (Primary)
- [ ] All pages load without errors
- [ ] Animations perform smoothly
- [ ] Touch gestures work (tap, swipe, pinch)
- [ ] Forms submit correctly
- [ ] File uploads work (if applicable)
- [ ] Videos play correctly
- [ ] No console errors

### Chrome Android
- [ ] Feature parity with Safari iOS
- [ ] Service worker functions (if applicable)
- [ ] Push notifications work (if applicable)
- [ ] Offline mode works (if applicable)

### Samsung Internet Browser
- [ ] All core features work
- [ ] Rendering matches Chrome Android
- [ ] Dark mode toggle works

### Firefox Mobile
- [ ] Basic functionality works
- [ ] No critical rendering issues

## Feature Testing

### 1. Navigation
- [ ] **Mobile Menu**
  - Opens smoothly
  - All links work
  - Search functions
  - Closes when link tapped
  - Doesn't interfere with page scroll
  - Close X button is tappable
  
- [ ] **Hamburger Icon**
  - Visible and tappable (44x44px)
  - Animates correctly
  - Clear active state
  
- [ ] **Sticky Header**
  - Hides on scroll down (optional)
  - Shows on scroll up
  - Doesn't cover content
  - Z-index correct

### 2. Forms

#### Contact Form
- [ ] All fields are tappable
- [ ] Labels are visible
- [ ] Keyboard doesn't cover inputs
- [ ] Keyboard shows correct type (email, tel, number)
- [ ] Validation messages display clearly
- [ ] Submit button is tappable
- [ ] Success message shows
- [ ] Error handling works

#### Quote Request Form
- [ ] Multi-step navigation works
- [ ] Progress indicator visible
- [ ] Back button functions
- [ ] Data persists between steps
- [ ] File upload works (if applicable)
- [ ] Summary page displays correctly

#### Resume Submission Form
- [ ] File picker works
- [ ] File size validation
- [ ] Upload progress shows
- [ ] Form data submits correctly

### 3. Content Pages

#### Blog Posts
- [ ] Title displays without overflow
- [ ] Hero image loads and scales
- [ ] Reading progress indicator works
- [ ] Text is readable (proper line-height)
- [ ] Code blocks scroll horizontally if needed
- [ ] Share buttons work
- [ ] Comments section (if enabled)
- [ ] Related posts display
- [ ] No layout shift during load

#### Case Studies
- [ ] Before/after slider works on touch
- [ ] Image galleries swipe correctly
- [ ] Lightbox opens and closes
- [ ] Zoom gestures work
- [ ] Project details are readable
- [ ] CTA buttons are tappable

#### Service Pages
- [ ] Service cards display in grid
- [ ] Filtering works (if applicable)
- [ ] Search functions (if applicable)
- [ ] Individual service pages load
- [ ] FAQ accordions expand/collapse
- [ ] Quote CTAs work

### 4. Interactive Elements

#### Modals/Dialogs
- [ ] Open smoothly
- [ ] Content fits within viewport
- [ ] Scrollable if content is long
- [ ] Close button is tappable (44x44px)
- [ ] Background overlay prevents interaction
- [ ] ESC key closes (if keyboard present)
- [ ] Backdrop tap closes

#### Accordions
- [ ] Expand/collapse smoothly
- [ ] Content doesn't overflow
- [ ] Icons rotate correctly
- [ ] Multiple can be open (if designed)

#### Carousels/Sliders
- [ ] Swipe gestures work
- [ ] Navigation arrows tappable
- [ ] Indicators show active slide
- [ ] Auto-play pauses on interaction
- [ ] Performance is smooth

#### Floating Contact Button
- [ ] Visible on scroll
- [ ] Opens menu on tap
- [ ] Menu items are tappable
- [ ] Phone/WhatsApp links work
- [ ] Doesn't block important content
- [ ] Safe area padding applied

#### Sticky CTA Bar
- [ ] Shows after scroll threshold
- [ ] Hides when mobile menu open
- [ ] Buttons are tappable (48px)
- [ ] Safe area padding applied
- [ ] Doesn't hide on /estimate page

### 5. Images & Media

#### Hero Images
- [ ] Load quickly (< 2s)
- [ ] Properly cropped for mobile
- [ ] No layout shift during load
- [ ] Parallax disabled on mobile (performance)

#### Gallery Images
- [ ] Lazy load correctly
- [ ] Tap to enlarge works
- [ ] Lightbox navigation works
- [ ] Pinch to zoom works
- [ ] Close gesture works

#### Video Content
- [ ] Plays inline (iOS Safari)
- [ ] Controls are accessible
- [ ] Doesn't autoplay (unless intended)
- [ ] Fullscreen works
- [ ] Captions visible (if enabled)

### 6. Performance Testing

#### Page Load Speed
- [ ] Homepage loads in < 3s on 4G
- [ ] Service pages load in < 2s
- [ ] Blog posts load in < 2.5s
- [ ] Images progressively load

#### Interaction Performance
- [ ] Tap response < 100ms
- [ ] Smooth 60fps scrolling
- [ ] Animations don't cause jank
- [ ] No layout thrashing

#### Network Conditions
- [ ] Test on 3G (slow connection)
- [ ] Test on 4G (typical mobile)
- [ ] Test on WiFi (fast connection)
- [ ] Offline mode (if PWA)

### 7. Accessibility Testing

#### Screen Reader Support
- [ ] VoiceOver (iOS) reads all content
- [ ] TalkBack (Android) reads all content
- [ ] Landmark regions announced
- [ ] Button purposes clear
- [ ] Form labels read correctly

#### Keyboard Navigation
- [ ] Tab order is logical
- [ ] Focus indicators visible
- [ ] No keyboard traps
- [ ] Skip links work

#### Visual Accessibility
- [ ] Text contrast meets WCAG AA (4.5:1)
- [ ] Focus indicators meet contrast (3:1)
- [ ] Touch targets meet 44x44px
- [ ] Text can be zoomed to 200%
- [ ] Dark mode works (if enabled)

### 8. Edge Cases

#### Orientation Changes
- [ ] Portrait to landscape works
- [ ] Landscape to portrait works
- [ ] No content loss
- [ ] Layout reflows correctly

#### Long Content
- [ ] Long titles don't break layout
- [ ] Long form inputs scroll
- [ ] Long lists paginate or virtual scroll
- [ ] Long comments/text wrap correctly

#### Empty States
- [ ] No results message shows
- [ ] Empty form validation
- [ ] Missing images show placeholder
- [ ] Offline state (if PWA)

#### Error States
- [ ] 404 page renders on mobile
- [ ] 500 error page renders
- [ ] Network error messages
- [ ] Form validation errors clear

#### Slow Network
- [ ] Loading states show
- [ ] Skeleton screens display
- [ ] Progress indicators work
- [ ] Timeouts handled gracefully

## Specific Route Testing

### Homepage (/)
- [ ] Hero section displays correctly
- [ ] White background on mobile ✓
- [ ] CTA buttons tappable
- [ ] Services preview section
- [ ] Testimonials carousel
- [ ] Stats/metrics display
- [ ] Footer renders

### Services (/services)
- [ ] Service explorer loads
- [ ] Category tabs work
- [ ] Search functions
- [ ] Service cards grid correctly
- [ ] Individual service pages link

### Projects (/projects)
- [ ] Project filters work
- [ ] Project cards display
- [ ] View details opens project
- [ ] Image galleries work
- [ ] Back navigation works

### Blog (/blog)
- [ ] Blog post cards display
- [ ] Category filters work
- [ ] Search functions
- [ ] Individual post pages load
- [ ] Reading progress works

### Contact (/contact)
- [ ] Form fields tappable
- [ ] Map displays (if enabled)
- [ ] Contact info readable
- [ ] Submit works
- [ ] Success message shows

### Estimate (/estimate)
- [ ] Multi-step form works
- [ ] Progress indicator shows
- [ ] Field validation works
- [ ] File uploads work (if applicable)
- [ ] Final submission works
- [ ] Sticky CTA hidden on this page ✓

### About (/about)
- [ ] Team section displays
- [ ] Company info readable
- [ ] Timeline works (if present)
- [ ] Values/mission section

## Bug Reporting Template

When issues are found, document with:

```markdown
**Device:** iPhone 14, iOS 17.2, Safari
**Page:** /services/commercial-painting
**Issue:** Button text overflows on 375px width
**Severity:** Medium
**Steps to Reproduce:**
1. Navigate to service page
2. Scroll to CTA section
3. Observe button text overflow

**Expected:** Button text should wrap or truncate
**Actual:** Text extends beyond button bounds
**Screenshot:** [attached]
**Console Errors:** [if any]
```

## Sign-Off Checklist

Before approving mobile implementation:

- [ ] All critical devices tested (iPhone, Android)
- [ ] All browsers tested (Safari iOS, Chrome Android)
- [ ] All major features tested
- [ ] Performance meets standards (LCP < 2.5s)
- [ ] Accessibility meets WCAG AA
- [ ] No critical or high-severity bugs
- [ ] Medium bugs documented for next sprint
- [ ] Test results documented
- [ ] Screenshots/videos captured for reference

## Testing Tools

### Manual Testing
- **BrowserStack**: Cross-browser/device testing
- **Real Devices**: Physical iPhone/Android devices
- **Chrome DevTools**: Device emulation, performance profiling
- **Safari Web Inspector**: iOS debugging

### Automated Testing
- **Lighthouse Mobile**: Performance, accessibility, SEO scores
- **WebPageTest**: Mobile network simulation
- **Pa11y**: Automated accessibility testing
- **Cypress Mobile**: E2E testing on mobile viewports

### Performance Monitoring
- **Google Analytics**: Mobile vs desktop metrics
- **Google Search Console**: Mobile usability issues
- **Web Vitals Chrome Extension**: Real-time CWV monitoring

## Post-Launch Monitoring

After deployment, monitor for 1 week:

- [ ] Google Analytics mobile metrics
- [ ] Mobile conversion rates
- [ ] Mobile bounce rates
- [ ] Mobile page speed insights
- [ ] User feedback/support tickets
- [ ] Console error rates
- [ ] Crash analytics (if applicable)

**Sign-off:**
- Tester Name: ________________
- Date: ________________
- Build Version: ________________
- Issues Found: ______ (Critical: ___ High: ___ Medium: ___ Low: ___)
- Approved: ☐ Yes  ☐ No (reason: _________________)
