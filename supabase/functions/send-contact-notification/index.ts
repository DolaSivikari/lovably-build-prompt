import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactNotificationRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  submissionType: string;
}

// Rate limiting: 50 requests per minute
const RATE_LIMIT = 50;
const RATE_WINDOW = 60 * 1000; // 1 minute in milliseconds

const checkRateLimit = async (supabaseClient: any, identifier: string, endpoint: string): Promise<boolean> => {
  const now = new Date();
  const windowStart = new Date(now.getTime() - RATE_WINDOW);

  // Get or create rate limit entry
  const { data: existingLimit, error: fetchError } = await supabaseClient
    .from('rate_limits')
    .select('*')
    .eq('user_identifier', identifier)
    .eq('endpoint', endpoint)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error('Rate limit fetch error:', fetchError);
    return true; // Allow on error to prevent blocking legitimate requests
  }

  if (!existingLimit) {
    // Create new rate limit entry
    await supabaseClient
      .from('rate_limits')
      .insert({
        user_identifier: identifier,
        endpoint: endpoint,
        request_count: 1,
        window_start: now.toISOString()
      });
    return true;
  }

  const limitWindowStart = new Date(existingLimit.window_start);
  
  // Check if we're still in the same window
  if (limitWindowStart > windowStart) {
    // Same window - check count
    if (existingLimit.request_count >= RATE_LIMIT) {
      return false; // Rate limit exceeded
    }
    
    // Increment count
    await supabaseClient
      .from('rate_limits')
      .update({ 
        request_count: existingLimit.request_count + 1 
      })
      .eq('user_identifier', identifier)
      .eq('endpoint', endpoint);
    
    return true;
  } else {
    // New window - reset count
    await supabaseClient
      .from('rate_limits')
      .update({ 
        request_count: 1,
        window_start: now.toISOString()
      })
      .eq('user_identifier', identifier)
      .eq('endpoint', endpoint);
    
    return true;
  }
};

// Input validation function
const validateInput = (data: ContactNotificationRequest): { valid: boolean; error?: string } => {
  // Name validation
  if (!data.name || data.name.trim().length < 2 || data.name.trim().length > 100) {
    return { valid: false, error: "Invalid name length" };
  }
  if (!/^[a-zA-Z\s'-]+$/.test(data.name)) {
    return { valid: false, error: "Invalid name characters" };
  }

  // Email validation
  if (!data.email || data.email.trim().length > 255) {
    return { valid: false, error: "Invalid email length" };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { valid: false, error: "Invalid email format" };
  }

  // Phone validation (if provided)
  if (data.phone && (data.phone.length > 20 || !/^[0-9\s\-\(\)\+]*$/.test(data.phone))) {
    return { valid: false, error: "Invalid phone format" };
  }

  // Company validation (if provided)
  if (data.company && data.company.length > 100) {
    return { valid: false, error: "Invalid company name length" };
  }

  // Message validation
  if (!data.message || data.message.trim().length < 10 || data.message.trim().length > 2000) {
    return { valid: false, error: "Invalid message length" };
  }

  return { valid: true };
};

// Sanitize input to prevent XSS
const sanitize = (str: string): string => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Get client identifier for rate limiting (IP or user ID)
    const clientIP = req.headers.get('x-forwarded-for') || 'unknown';
    const identifier = `contact-${clientIP}`;

    // Check rate limit
    const rateLimitOk = await checkRateLimit(supabaseClient, identifier, 'send-contact-notification');
    if (!rateLimitOk) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const requestData: ContactNotificationRequest = await req.json();

    // Validate input
    const validation = validateInput(requestData);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Sanitize all inputs
    const { name, email, phone, company, message, submissionType } = {
      name: sanitize(requestData.name.trim()),
      email: sanitize(requestData.email.trim()),
      phone: requestData.phone ? sanitize(requestData.phone.trim()) : undefined,
      company: requestData.company ? sanitize(requestData.company.trim()) : undefined,
      message: sanitize(requestData.message.trim()),
      submissionType: sanitize(requestData.submissionType),
    };

    // Send notification to admin
    const adminEmail = await resend.emails.send({
      from: "Ascent Group <onboarding@resend.dev>",
      to: ["info@ascentgroupconstruction.com"],
      subject: `New ${submissionType} Submission from ${name}`,
      html: `
        <h2>New Contact Submission</h2>
        <p><strong>Type:</strong> ${submissionType}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><small>Submitted from Ascent Group Construction website</small></p>
      `,
    });

    // Send confirmation to user
    const userEmail = await resend.emails.send({
      from: "Ascent Group Construction <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for contacting Ascent Group Construction",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1a1a1a;">Thank you for reaching out!</h1>
          <p>Dear ${name},</p>
          <p>We have received your message and appreciate you contacting Ascent Group Construction. Our team will review your inquiry and get back to you within 24-48 hours.</p>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Your Message:</h3>
            <p>${message}</p>
          </div>
          <p>If you need immediate assistance, please call us at <strong>(416) 555-PAINT</strong></p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          <p style="color: #666; font-size: 14px;">
            <strong>Ascent Group Construction</strong><br>
            123 Industrial Parkway, Mississauga, ON L5T 1A1<br>
            Phone: (416) 555-PAINT | Email: info@ascentgroupconstruction.com
          </p>
        </div>
      `,
    });

    return new Response(JSON.stringify({ adminEmail, userEmail }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-notification function:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
