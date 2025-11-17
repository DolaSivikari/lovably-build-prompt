-- Create review_requests table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.review_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  client_name TEXT NOT NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  responded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on review_requests
ALTER TABLE public.review_requests ENABLE ROW LEVEL SECURITY;

-- Create policy for admins to view all review requests
CREATE POLICY "Admins can view all review requests"
  ON public.review_requests
  FOR SELECT
  USING (is_admin(auth.uid()));

-- Create policy for admins to insert review requests
CREATE POLICY "Admins can insert review requests"
  ON public.review_requests
  FOR INSERT
  WITH CHECK (is_admin(auth.uid()));

-- Create policy for admins to update review requests
CREATE POLICY "Admins can update review requests"
  ON public.review_requests
  FOR UPDATE
  USING (is_admin(auth.uid()));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_review_requests_updated_at
  BEFORE UPDATE ON public.review_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default review request email template
INSERT INTO public.email_templates (name, subject, body_html, body_text, category, is_active)
VALUES (
  'review_request_day_0',
  'We Value Your Feedback - Share Your Experience with Ascent Group Construction',
  '<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #1a5490; color: white; padding: 20px; text-align: center; }
    .content { padding: 30px 20px; }
    .button { display: inline-block; padding: 12px 30px; background-color: #1a5490; color: white; text-decoration: none; border-radius: 5px; margin: 10px 5px; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You, {{client_name}}!</h1>
    </div>
    <div class="content">
      <p>Dear {{client_name}},</p>
      <p>Thank you for choosing Ascent Group Construction for your project. We hope you''re satisfied with the results!</p>
      <p>Your feedback is incredibly valuable to us and helps us continue to provide excellent service. Would you mind taking a moment to share your experience?</p>
      <p style="text-align: center; margin: 30px 0;">
        <a href="{{review_landing_page}}" class="button">Share Your Review</a>
      </p>
      <p>You can also leave a review on these platforms:</p>
      <p style="text-align: center;">
        <a href="{{google_review_link}}" class="button">Google Review</a>
        <a href="{{homestars_review_link}}" class="button">HomeStars</a>
        <a href="{{trustedpros_review_link}}" class="button">TrustedPros</a>
      </p>
      <p>We truly appreciate your business and look forward to serving you again in the future.</p>
      <p>Best regards,<br>The Ascent Group Construction Team</p>
    </div>
    <div class="footer">
      <p>Ascent Group Construction | Professional Construction Services</p>
      <p>If you have any questions, please don''t hesitate to contact us.</p>
    </div>
  </div>
</body>
</html>',
  'Dear {{client_name}},

Thank you for choosing Ascent Group Construction for your project. We hope you''re satisfied with the results!

Your feedback is incredibly valuable to us and helps us continue to provide excellent service. Would you mind taking a moment to share your experience?

Visit our review page: {{review_landing_page}}

We truly appreciate your business and look forward to serving you again in the future.

Best regards,
The Ascent Group Construction Team',
  'customer_engagement',
  true
)
ON CONFLICT (name) DO UPDATE
SET 
  subject = EXCLUDED.subject,
  body_html = EXCLUDED.body_html,
  body_text = EXCLUDED.body_text,
  category = EXCLUDED.category,
  is_active = EXCLUDED.is_active,
  updated_at = now();