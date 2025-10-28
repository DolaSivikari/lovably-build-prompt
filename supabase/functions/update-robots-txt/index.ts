import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        auth: {
          persistSession: false,
        },
      }
    );

    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    // Check if user is admin
    const { data: userRole } = await supabaseClient
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .in('role', ['admin', 'super_admin'])
      .single();

    if (!userRole) {
      throw new Error('Insufficient permissions');
    }

    const { robots_txt } = await req.json();

    if (!robots_txt || typeof robots_txt !== 'string') {
      throw new Error('Invalid robots.txt content');
    }

    // Validate robots.txt content
    if (!robots_txt.includes('User-agent:')) {
      throw new Error('robots.txt must contain at least one User-agent directive');
    }

    // Update site_settings with new robots.txt
    const { error: updateError } = await supabaseClient
      .from('site_settings')
      .update({ 
        robots_txt,
        updated_at: new Date().toISOString(),
        updated_by: user.id
      })
      .eq('is_active', true);

    if (updateError) {
      throw updateError;
    }

    console.log(`Robots.txt updated by user ${user.email}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Robots.txt updated successfully. Changes will be live after next deployment.',
        content: robots_txt
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error updating robots.txt:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: errorMessage === 'Unauthorized' || errorMessage === 'Insufficient permissions' ? 403 : 400
      }
    );
  }
});
