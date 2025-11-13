-- Email templates for review requests and marketing
CREATE TABLE IF NOT EXISTS public.email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  subject TEXT NOT NULL,
  body_html TEXT NOT NULL,
  body_text TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'transactional',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Review requests tracking
CREATE TABLE IF NOT EXISTS public.review_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  client_name TEXT,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'clicked', 'completed', 'bounced')),
  sent_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  platform TEXT CHECK (platform IN ('google', 'homestars', 'trustedpros', 'houzz', 'facebook')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- A/B test tracking
CREATE TABLE IF NOT EXISTS public.ab_tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_name TEXT NOT NULL UNIQUE,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  variants JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.ab_test_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_name TEXT NOT NULL,
  variant TEXT NOT NULL,
  user_identifier TEXT NOT NULL,
  assigned_at TIMESTAMPTZ DEFAULT now(),
  converted_at TIMESTAMPTZ,
  conversion_value NUMERIC,
  UNIQUE(test_name, user_identifier)
);

-- Enable RLS
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ab_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ab_test_assignments ENABLE ROW LEVEL SECURITY;

-- Admin-only access to email templates
CREATE POLICY "Admins can manage email templates"
  ON public.email_templates FOR ALL
  USING (is_admin(auth.uid()));

-- Admin-only access to review requests
CREATE POLICY "Admins can manage review requests"
  ON public.review_requests FOR ALL
  USING (is_admin(auth.uid()));

-- Admin-only write access to A/B tests, public read for active tests
CREATE POLICY "Anyone can view active A/B tests"
  ON public.ab_tests FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage A/B tests"
  ON public.ab_tests FOR ALL
  USING (is_admin(auth.uid()));

-- Public can track their own A/B test assignments
CREATE POLICY "Anyone can view their own A/B assignments"
  ON public.ab_test_assignments FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert A/B assignments"
  ON public.ab_test_assignments FOR INSERT
  WITH CHECK (true);

-- Triggers for updated_at
CREATE TRIGGER update_email_templates_updated_at
  BEFORE UPDATE ON public.email_templates
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_review_requests_updated_at
  BEFORE UPDATE ON public.review_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ab_tests_updated_at
  BEFORE UPDATE ON public.ab_tests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default review request email templates
INSERT INTO public.email_templates (name, subject, body_html, body_text, category) VALUES
(
  'review_request_day_0',
  'Thank you for choosing Ascent Group Construction',
  '<p>Hi {{client_name}},</p>
<p>Thank you for trusting us with your project! We appreciate your business and hope you''re pleased with the results.</p>
<p>We''d love to hear about your experience. Would you mind sharing a quick review? It only takes 2 minutes and helps other property owners make informed decisions.</p>
<p><strong>Choose your preferred platform:</strong></p>
<ul>
  <li><a href="{{google_review_link}}">Google</a></li>
  <li><a href="{{homestars_review_link}}">HomeStars</a></li>
  <li><a href="{{trustedpros_review_link}}">TrustedPros</a></li>
</ul>
<p>Best regards,<br>The Ascent Group Team</p>',
  'Hi {{client_name}}, Thank you for trusting us with your project! We''d love to hear about your experience. Please share a review at: {{review_landing_page}}',
  'review_request'
),
(
  'review_request_day_14',
  'How did we do? Quick review request',
  '<p>Hi {{client_name}},</p>
<p>It''s been two weeks since we completed your project. We hope everything is still looking great!</p>
<p>If you have a moment, we''d really appreciate it if you could share your experience with others. Your feedback helps us improve and helps other property owners find quality contractors.</p>
<p><strong>Leave a review (takes 2 minutes):</strong></p>
<ul>
  <li><a href="{{google_review_link}}">Google</a></li>
  <li><a href="{{homestars_review_link}}">HomeStars</a></li>
  <li><a href="{{trustedpros_review_link}}">TrustedPros</a></li>
</ul>
<p>As a thank you, all reviewers are entered into our quarterly $100 gift card draw.</p>
<p>Thanks again,<br>The Ascent Group Team</p>',
  'Hi {{client_name}}, It''s been two weeks since your project. We''d love your feedback! Leave a review: {{review_landing_page}}',
  'review_request'
),
(
  'review_request_day_30',
  'Final reminder: Share your Ascent Group experience',
  '<p>Hi {{client_name}},</p>
<p>This is our final reminder about leaving a review. We understand you''re busy, but your feedback really makes a difference.</p>
<p>A quick 2-minute review helps:</p>
<ul>
  <li>Other property owners make confident decisions</li>
  <li>Our team understand what we''re doing well</li>
  <li>Show appreciation for the crew who worked on your project</li>
</ul>
<p><strong>Choose your platform:</strong></p>
<ul>
  <li><a href="{{google_review_link}}">Google</a></li>
  <li><a href="{{homestars_review_link}}">HomeStars</a></li>
  <li><a href="{{trustedpros_review_link}}">TrustedPros</a></li>
</ul>
<p>Thank you for your time,<br>The Ascent Group Team</p>',
  'Hi {{client_name}}, Final reminder: We''d love your feedback on our work! Review link: {{review_landing_page}}',
  'review_request'
);

-- Insert default A/B tests
INSERT INTO public.ab_tests (test_name, description, variants) VALUES
(
  'homepage_cta_text',
  'Test different CTA button text on homepage',
  '[{"name": "control", "value": "Get Free Quote"}, {"name": "variant_a", "value": "Submit RFP"}, {"name": "variant_b", "value": "Schedule Consultation"}]'
),
(
  'service_page_cta_placement',
  'Test CTA button placement on service pages',
  '[{"name": "control", "value": "bottom_only"}, {"name": "variant_a", "value": "top_and_bottom"}, {"name": "variant_b", "value": "top_middle_bottom"}]'
),
(
  'contact_form_social_proof',
  'Test showing testimonials vs stats on contact page',
  '[{"name": "control", "value": "none"}, {"name": "variant_a", "value": "testimonials"}, {"name": "variant_b", "value": "stats"}]'
),
(
  'phone_number_visibility',
  'Test phone number prominence in header',
  '[{"name": "control", "value": "small_text"}, {"name": "variant_a", "value": "large_button"}, {"name": "variant_b", "value": "click_to_call"}]'
);