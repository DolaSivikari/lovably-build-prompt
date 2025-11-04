# Data Flow Diagrams

> Visual representations of key feature workflows in the AscentGroup platform

---

## 1. Authentication & Authorization Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Supabase Auth
    participant Database
    participant Admin Panel

    User->>Frontend: Navigate to /admin
    Frontend->>Supabase Auth: Check session
    
    alt No Session
        Frontend->>User: Redirect to /auth
        User->>Frontend: Enter credentials
        Frontend->>Supabase Auth: signIn(email, password)
        Supabase Auth->>Database: Check auth_failed_attempts
        
        alt Too Many Failures
            Database->>Supabase Auth: Account locked
            Supabase Auth->>Frontend: Error: Account locked
            Frontend->>User: Show lockout message
        else Valid Credentials
            Supabase Auth->>Database: Create user_sessions
            Supabase Auth->>Frontend: Return session token
            Frontend->>Database: Query user_roles
            Database->>Frontend: Return role
            Frontend->>User: Redirect to admin dashboard
        end
    else Session Exists
        Frontend->>Database: Verify user_roles
        Database->>Frontend: Return permissions
        
        alt Is Admin
            Frontend->>Admin Panel: Load dashboard
        else Not Admin
            Frontend->>User: 403 Forbidden
        end
    end
```

**Key Security Points:**
- Failed login attempts tracked in `auth_failed_attempts`
- Account lockout after 5 failures (stored in `auth_account_lockouts`)
- Roles stored separately in `user_roles` table (not on profile)
- Session tokens stored in httpOnly cookies
- RLS policies check `is_admin(auth.uid())` for protected resources

---

## 2. Content Publishing Workflow

```mermaid
flowchart TD
    A[Editor Creates Draft] --> B{Content Type?}
    
    B -->|Service| C[Create in services table]
    B -->|Project| D[Create in projects table]
    B -->|Blog Post| E[Create in blog_posts table]
    
    C --> F[Set publish_state = draft]
    D --> F
    E --> F
    
    F --> G[Upload Media]
    G --> H[Generate Preview Token]
    H --> I[Send Preview Link]
    
    I --> J{Approval Required?}
    
    J -->|Yes| K[Create approval_workflow record]
    K --> L[Notify Reviewer]
    L --> M{Reviewer Decision}
    M -->|Approve| N[Set publish_state = published]
    M -->|Reject| O[Add feedback]
    O --> A
    
    J -->|No| N
    
    N --> P[Create content_versions record]
    P --> Q[Update SEO settings]
    Q --> R[Trigger sitemap regeneration]
    R --> S[Invalidate CDN cache]
    S --> T[Content Live]
    
    T --> U{Analytics Tracking}
    U --> V[Record in analytics_snapshots]
```

**Key Tables Involved:**
- Primary: `services`, `projects`, `blog_posts`
- Supporting: `media`, `content_versions`, `approval_workflows`, `seo_settings`
- Triggers: `auto_save_version()`, `notify_admins_*()`

**RLS Policies:**
- Draft content: Only visible to authenticated users
- Published content: Public access
- Preview tokens: Allow unauthenticated access if valid token

---

## 3. Business Management Flow (Estimate to Invoice to Payment)

```mermaid
flowchart TD
    A[Client Inquiry] --> B[Create contact_submission]
    B --> C[Admin Reviews Lead]
    C --> D[Create business_clients record]
    D --> E[Create business_projects record]
    
    E --> F[Generate Project Number<br/>generate_project_number]
    
    F --> G[Create Estimate]
    G --> H[Generate Estimate Number<br/>generate_estimate_number]
    H --> I[Add Line Items<br/>business_estimate_line_items]
    I --> J[Calculate Totals<br/>subtotal, tax, total]
    
    J --> K{Estimate Approved?}
    K -->|No| L[Mark as Declined]
    K -->|Yes| M[Convert to Invoice]
    
    M --> N[Generate Invoice Number<br/>generate_invoice_number]
    N --> O[Copy Line Items<br/>business_invoice_line_items]
    O --> P[Set Due Date]
    
    P --> Q[Send Invoice to Client]
    Q --> R{Payment Received?}
    
    R -->|Yes| S[Record Payment<br/>business_payments]
    S --> T[Update Invoice Balance]
    T --> U{Balance = 0?}
    U -->|Yes| V[Mark Invoice as Paid]
    U -->|No| W[Mark as Partially Paid]
    
    R -->|No| X{Past Due?}
    X -->|Yes| Y[Send Reminder]
    X -->|No| Q
    
    V --> Z[Log Activity<br/>business_activity_log]
    W --> Z
    L --> Z
```

**Auto-Generated Numbers:**
- Project: `PRJ-2025-001` (format: `PRJ-{year}-{sequence}`)
- Estimate: `EST-2025-001`
- Invoice: `INV-2025-001`

**Business Logic Functions:**
- `generate_project_number()` - Atomic sequence generation
- `generate_estimate_number()` - Atomic sequence generation
- `generate_invoice_number()` - Atomic sequence generation
- Triggers: `set_project_number()`, `set_estimate_number()`, `set_invoice_number()`

**Key Calculations:**
```sql
-- Line total
line_total_cents = quantity * unit_price_cents

-- Estimate/Invoice totals
subtotal_cents = SUM(line_total_cents)
tax_cents = subtotal_cents * tax_rate
total_cents = subtotal_cents + tax_cents

-- Invoice balance
balance_cents = total_cents - SUM(payments.amount_cents)
```

---

## 4. Lead Capture & Notification Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Edge Function
    participant Database
    participant Email Service
    participant Admin

    User->>Frontend: Submit Contact Form
    Frontend->>Frontend: Client-side validation
    Frontend->>Edge Function: POST /submit-form
    
    Edge Function->>Edge Function: Rate limit check
    Edge Function->>Database: Insert contact_submissions
    
    Database->>Database: Trigger: notify_admins_for_contact
    
    loop For Each Admin
        Database->>Database: Insert into notifications table
    end
    
    Database->>Edge Function: Submission ID
    Edge Function->>Email Service: Send notification email
    Email Service->>Admin: Email notification
    Edge Function->>Frontend: Success response
    Frontend->>User: Show success message
    
    Admin->>Frontend: Login to admin panel
    Frontend->>Database: Query notifications
    Database->>Frontend: Unread count + list
    Frontend->>Admin: Show notification bell
    Admin->>Frontend: Click on notification
    Frontend->>Admin: Navigate to /admin/contact-submissions
```

**Rate Limiting:**
- Function: `check_and_update_rate_limit(identifier, endpoint, limit, window)`
- Default: 50 requests per hour per IP
- Stored in `rate_limits` table

**Email Templates:**
- Contact submission → Admin notification
- Resume submission → HR notification
- Prequalification request → Sales notification

**Notification Types:**
```typescript
type NotificationType = 
  | 'contact_submission'
  | 'resume_submission'
  | 'prequal_submission'
  | 'project_updated'
  | 'security_alert';
```

---

## 5. File Upload & Media Management Flow

```mermaid
flowchart TD
    A[User Selects File] --> B{File Type?}
    
    B -->|Image| C[Validate: JPEG, PNG, WebP]
    B -->|Document| D[Validate: PDF, DOCX]
    B -->|Video| E[Validate: MP4, WebM]
    
    C --> F{Size Check}
    D --> F
    E --> F
    
    F -->|> 50MB| G[Show error]
    F -->|<= 50MB| H[Generate unique filename]
    
    H --> I[Request signed upload URL<br/>Edge Function]
    I --> J[Upload to Storage Bucket]
    
    J --> K{Upload Type?}
    
    K -->|Project Image| L[bucket: project-images<br/>public: true]
    K -->|Resume| M[bucket: documents<br/>public: false]
    K -->|Drawing| N[bucket: drawings<br/>public: false]
    
    L --> O[Create media record]
    M --> O
    N --> O
    
    O --> P[Extract metadata<br/>width, height, mime]
    P --> Q[Generate thumbnails<br/>if image]
    Q --> R[Update database record]
    
    R --> S{Attach to Entity?}
    S -->|Yes| T[Link to project/post/etc]
    S -->|No| U[Store in media library]
    
    T --> V[Trigger: update_updated_at_column]
    U --> V
    V --> W[Upload Complete]
```

**Storage Buckets:**
- `project-images` - Public, used for portfolio galleries
- `documents` - Private, used for resumes and contracts
- `drawings` - Private, used for architectural drawings

**RLS Policies on Storage:**
```sql
-- project-images: public read
CREATE POLICY "Public can view project images"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-images');

-- documents: admin only
CREATE POLICY "Only admins can view documents"
ON storage.objects FOR SELECT
USING (bucket_id = 'documents' AND is_admin(auth.uid()));
```

**Image Processing Pipeline:**
1. Original uploaded to storage
2. Background worker generates variants:
   - Thumbnail: 300x300
   - Small: 640x480
   - Medium: 1280x720
   - Large: 1920x1080
3. Store URLs in `media` table JSONB field

---

## 6. Search Console Integration Flow

```mermaid
sequenceDiagram
    participant Admin
    participant Frontend
    participant Auth Edge Function
    participant Google OAuth
    participant Database
    participant Scheduled Function
    participant Search Console API

    Admin->>Frontend: Click "Connect Google Search Console"
    Frontend->>Auth Edge Function: POST /google-search-console-auth
    Auth Edge Function->>Google OAuth: Redirect to OAuth consent
    Google OAuth->>Admin: Show permission screen
    Admin->>Google OAuth: Grant permission
    Google OAuth->>Auth Edge Function: POST /google-oauth-callback
    Auth Edge Function->>Database: Store tokens in google_auth_tokens
    Auth Edge Function->>Frontend: Redirect to admin dashboard
    
    Note over Scheduled Function: Runs daily via cron
    Scheduled Function->>Database: Fetch google_auth_tokens
    Scheduled Function->>Google OAuth: Refresh access token if expired
    Google OAuth->>Scheduled Function: New access token
    Scheduled Function->>Search Console API: Fetch search analytics
    Search Console API->>Scheduled Function: Return metrics
    Scheduled Function->>Database: Store in analytics_snapshots
    
    Admin->>Frontend: View SEO Dashboard
    Frontend->>Database: Query analytics_snapshots
    Database->>Frontend: Return aggregated data
    Frontend->>Admin: Display charts and metrics
```

**Edge Functions Involved:**
- `google-search-console-auth` - Initiate OAuth flow
- `google-oauth-callback` - Handle OAuth callback
- `scheduled-fetch-search-console` - Daily data sync
- `fetch-search-console-data` - Manual data fetch

**Token Management:**
- Access tokens expire after 1 hour
- Refresh tokens used to get new access tokens
- Tokens encrypted at rest in `google_auth_tokens` table

---

## 7. Security Monitoring & Incident Response Flow

```mermaid
flowchart TD
    A[Event Occurs] --> B{Event Type?}
    
    B -->|Failed Login| C[Increment auth_failed_attempts]
    B -->|Suspicious Activity| D[Create security_alerts]
    B -->|Data Access| E[Log to audit_log]
    B -->|Application Error| F[Log to error_logs]
    
    C --> G{Failure Count >= 5?}
    G -->|Yes| H[Create auth_account_lockouts]
    G -->|No| I[Continue]
    
    H --> J[Notify Admins<br/>security_alerts]
    D --> J
    
    J --> K[Admin Reviews Alert]
    K --> L{Action Required?}
    
    L -->|Unlock Account| M[Set unlocked_at<br/>unlocked_by = admin_id]
    L -->|Block IP| N[Add to rate_limits<br/>permanent block]
    L -->|False Positive| O[Mark alert as resolved]
    
    M --> P[Log to audit_log]
    N --> P
    O --> P
    
    P --> Q[Update security_alerts<br/>resolved = true]
    
    E --> R[Trigger: log_sensitive_access]
    R --> S{Accessing Sensitive Table?}
    S -->|Yes| T[Full audit trail<br/>before/after state]
    S -->|No| U[Basic audit trail]
```

**Monitored Events:**
- Failed login attempts
- Account lockouts
- Password resets
- Admin privilege escalation
- Bulk data exports
- Settings changes
- User role modifications

**Alerting Thresholds:**
- 5 failed logins → Account lockout
- 3 lockouts in 24h → Security alert to super_admin
- 100+ errors/hour → System alert
- Data export > 1000 records → Audit log

**Cleanup Jobs:**
- `cleanup_old_failed_attempts()` - Remove > 24h old
- `cleanup_expired_lockouts()` - Remove past lockouts
- `cleanup_expired_sessions()` - Remove expired sessions
- `cleanup_rate_limits()` - Remove > 1h old
- `cleanup_old_error_logs()` - Remove > 30 days old

---

## 8. Admin Dashboard Real-Time Updates Flow

```mermaid
flowchart LR
    A[Admin Opens Dashboard] --> B[Subscribe to Realtime]
    
    B --> C[Supabase Realtime Channel]
    
    C --> D{Event Type?}
    
    D -->|INSERT contact_submissions| E[Show new lead notification]
    D -->|UPDATE business_invoices| F[Update invoice status]
    D -->|INSERT notifications| G[Show notification bell]
    D -->|UPDATE projects| H[Refresh project list]
    
    E --> I[Play notification sound]
    F --> I
    G --> I
    H --> I
    
    I --> J[Update UI without refresh]
    
    K[Background Process] --> L[Modify Database]
    L --> C
    
    M[Another Admin] --> N[Makes Change]
    N --> C
```

**Realtime Configuration:**
```sql
-- Enable realtime for key tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.contact_submissions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.business_projects;
```

**Frontend Subscription:**
```typescript
const channel = supabase
  .channel('admin-updates')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'contact_submissions' },
    (payload) => {
      // Handle new lead
      showNotification('New lead received');
      refetchLeads();
    }
  )
  .subscribe();
```

---

## 9. SEO Automation & Sitemap Generation Flow

```mermaid
flowchart TD
    A[Content Published] --> B[Trigger: update_updated_at_column]
    B --> C[Update seo_settings]
    
    C --> D{SEO Score Check}
    D -->|< 70| E[Flag for SEO review]
    D -->|>= 70| F[Mark as optimized]
    
    E --> G[Notify editor]
    F --> H[Queue sitemap regeneration]
    
    H --> I[Edge Function:<br/>generate-sitemap]
    
    I --> J[Query published content<br/>services, projects, blog_posts]
    J --> K[Generate XML]
    K --> L[Upload to /sitemap.xml]
    L --> M[Log to sitemap_logs]
    
    M --> N[Ping Google Search Console]
    N --> O[Update search appearance]
    
    P[Scheduled Job<br/>Daily 2 AM] --> I
```

**Sitemap Structure:**
```xml
<urlset>
  <url>
    <loc>https://example.com/services/commercial-construction</loc>
    <lastmod>2025-01-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- More URLs -->
</urlset>
```

**SEO Scoring Factors:**
- Meta title present and optimal length (10 points)
- Meta description present (10 points)
- Focus keyword in title (20 points)
- Focus keyword in description (15 points)
- Alt tags on images (15 points)
- Internal links present (10 points)
- Content length > 300 words (20 points)

---

## 10. Performance Monitoring & Web Vitals Tracking Flow

```mermaid
sequenceDiagram
    participant Browser
    participant Web Vitals API
    participant Analytics Script
    participant Edge Function
    participant Database
    participant Admin Dashboard

    Browser->>Web Vitals API: Page Load
    Web Vitals API->>Analytics Script: Report LCP
    Web Vitals API->>Analytics Script: Report FID
    Web Vitals API->>Analytics Script: Report CLS
    
    Analytics Script->>Analytics Script: Aggregate metrics
    Analytics Script->>Edge Function: POST /api/performance
    
    Edge Function->>Database: Insert performance_metrics
    
    Note over Database: Triggered aggregate job
    Database->>Database: Calculate p75, p95 percentiles
    
    Admin->>Admin Dashboard: View performance tab
    Admin Dashboard->>Database: Query performance_metrics
    Database->>Admin Dashboard: Return aggregated data
    Admin Dashboard->>Admin: Display charts
    
    Admin Dashboard->>Admin Dashboard: Check thresholds
    Note over Admin Dashboard: LCP > 2.5s = Warning
    Admin Dashboard->>Admin: Show performance alerts
```

**Tracked Metrics:**
- **Core Web Vitals:**
  - Largest Contentful Paint (LCP) - Target: < 2.5s
  - First Input Delay (FID) - Target: < 100ms
  - Cumulative Layout Shift (CLS) - Target: < 0.1

- **Custom Metrics:**
  - Time to First Byte (TTFB)
  - Time to Interactive (TTI)
  - Total Blocking Time (TBT)
  - Page load time by route

**Alert Conditions:**
```typescript
const alerts = {
  lcp: { warning: 2500, critical: 4000 },
  fid: { warning: 100, critical: 300 },
  cls: { warning: 0.1, critical: 0.25 },
  error_rate: { warning: 0.01, critical: 0.05 }
};
```

---

## Key Takeaways

1. **Security First:** All flows implement RLS, rate limiting, and audit logging
2. **Real-Time Updates:** Admin dashboard uses Supabase Realtime for live updates
3. **Automated Workflows:** Business logic handled by database functions and triggers
4. **Comprehensive Tracking:** Every action logged for compliance and debugging
5. **Performance Monitoring:** Continuous Web Vitals tracking with alerting
6. **Scalable Architecture:** Async processing for heavy operations (image processing, email sending)

---

## Related Documentation

- [Database ERD](./DATABASE_ERD.md)
- [Developer Onboarding Guide](./DEVELOPER_ONBOARDING.md)
- [API Specification](./API_SPECIFICATION.md)
- [Security Documentation](./SECURITY_PHASE1.md)
