import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ResumeNotificationRequest {
  applicantName: string;
  email: string;
  phone?: string;
  coverMessage?: string;
  jobTitle?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { applicantName, email, phone, coverMessage, jobTitle }: ResumeNotificationRequest = await req.json();

    // Send notification to admin
    const adminEmail = await resend.emails.send({
      from: "Ascent Group Careers <onboarding@resend.dev>",
      to: ["hr@ascentgroupconstruction.com"], // Replace with actual HR email
      subject: `New Resume Submission${jobTitle ? ` for ${jobTitle}` : ''} - ${applicantName}`,
      html: `
        <h2>New Resume Submission</h2>
        ${jobTitle ? `<p><strong>Position:</strong> ${jobTitle}</p>` : ''}
        <p><strong>Applicant Name:</strong> ${applicantName}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${coverMessage ? `
          <p><strong>Cover Message:</strong></p>
          <p>${coverMessage}</p>
        ` : ''}
        <hr>
        <p><small>View full application in admin panel</small></p>
      `,
    });

    // Send confirmation to applicant
    const userEmail = await resend.emails.send({
      from: "Ascent Group Careers <onboarding@resend.dev>",
      to: [email],
      subject: "Application Received - Ascent Group Construction",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1a1a1a;">Thank you for your application!</h1>
          <p>Dear ${applicantName},</p>
          <p>We have successfully received your application${jobTitle ? ` for the ${jobTitle} position` : ''} at Ascent Group Construction.</p>
          <p>Our hiring team will carefully review your resume and qualifications. If your experience matches our requirements, we will contact you within 1-2 weeks to discuss next steps.</p>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">What happens next?</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li>Our team reviews your application</li>
              <li>Qualified candidates will be contacted for an interview</li>
              <li>We'll keep your information on file for future opportunities</li>
            </ul>
          </div>
          <p>Thank you for your interest in joining our team!</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          <p style="color: #666; font-size: 14px;">
            <strong>Ascent Group Construction</strong><br>
            123 Industrial Parkway, Mississauga, ON L5T 1A1<br>
            careers@ascentgroupconstruction.com
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
    console.error("Error in send-resume-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
