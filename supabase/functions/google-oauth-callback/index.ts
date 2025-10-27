import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.74.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { code, state } = await req.json();

    if (!code) {
      throw new Error('Authorization code is required');
    }

    // Get OAuth credentials from environment
    const clientId = Deno.env.get('GOOGLE_SEARCH_CONSOLE_CLIENT_ID');
    const clientSecret = Deno.env.get('GOOGLE_SEARCH_CONSOLE_CLIENT_SECRET');
    const redirectUri = Deno.env.get('GOOGLE_SEARCH_CONSOLE_REDIRECT_URI');

    if (!clientId || !clientSecret || !redirectUri) {
      throw new Error('Google OAuth credentials not configured');
    }

    // Exchange authorization code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text();
      console.error('Token exchange failed:', error);
      throw new Error('Failed to exchange authorization code for tokens');
    }

    const tokens = await tokenResponse.json();
    const { access_token, refresh_token, expires_in, scope } = tokens;

    // Calculate token expiry
    const tokenExpiry = new Date(Date.now() + expires_in * 1000);

    // Get user ID from state or auth header
    const authHeader = req.headers.get('Authorization');
    let userId = state;

    if (!userId && authHeader) {
      const jwt = authHeader.replace('Bearer ', '');
      const { data: { user } } = await supabase.auth.getUser(jwt);
      userId = user?.id;
    }

    if (!userId) {
      throw new Error('User authentication required');
    }

    // Store tokens in database
    const { error: dbError } = await supabase
      .from('google_auth_tokens')
      .upsert({
        user_id: userId,
        access_token,
        refresh_token,
        token_expiry: tokenExpiry.toISOString(),
        scope,
      }, {
        onConflict: 'user_id',
      });

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to store authentication tokens');
    }

    console.log('Successfully stored Google OAuth tokens for user:', userId);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Google Search Console connected successfully' 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('OAuth callback error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return new Response(
      JSON.stringify({ 
        error: errorMessage
      }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
