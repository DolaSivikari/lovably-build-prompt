import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.74.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Helper function for safe error responses
function createErrorResponse(error: any) {
  console.error('Function error:', {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString()
  });
  
  const isValidationError = error.message.includes('required') || 
                           error.message.includes('invalid');
  
  const clientMessage = isValidationError 
    ? error.message
    : 'An error occurred processing your request. Please try again later.';
  
  return new Response(
    JSON.stringify({ 
      error: clientMessage,
      timestamp: new Date().toISOString()
    }),
    { 
      status: isValidationError ? 400 : 500, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    }
  );
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Verify caller is authenticated and is an admin
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if user has admin or super_admin role
    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .in('role', ['admin', 'super_admin'])
      .maybeSingle();
      
    if (roleError || !roleData) {
      console.log(`Access denied for user ${user.id}: not an admin`);
      return new Response(
        JSON.stringify({ error: 'Forbidden: Admin access required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Generating sitemap...');

    const baseUrl = new URL(req.url).origin;
    const urls: Array<{ loc: string; lastmod: string; priority: string }> = [];

    // Add static pages
    const staticPages = [
      { path: '/', priority: '1.0' },
      { path: '/about', priority: '0.8' },
      { path: '/services', priority: '0.8' },
      { path: '/projects', priority: '0.8' },
      { path: '/contact', priority: '0.7' },
    ];

    staticPages.forEach(page => {
      urls.push({
        loc: `${baseUrl}${page.path}`,
        lastmod: new Date().toISOString().split('T')[0],
        priority: page.priority,
      });
    });

    // Add published blog posts
    const { data: blogPosts } = await supabase
      .from('blog_posts')
      .select('slug, updated_at')
      .eq('publish_state', 'published');

    if (blogPosts) {
      blogPosts.forEach(post => {
        urls.push({
          loc: `${baseUrl}/blog/${post.slug}`,
          lastmod: new Date(post.updated_at).toISOString().split('T')[0],
          priority: '0.6',
        });
      });
    }

    // Add published projects
    const { data: projects } = await supabase
      .from('projects')
      .select('slug, updated_at')
      .eq('publish_state', 'published');

    if (projects) {
      projects.forEach(project => {
        urls.push({
          loc: `${baseUrl}/projects/${project.slug}`,
          lastmod: new Date(project.updated_at).toISOString().split('T')[0],
          priority: '0.6',
        });
      });
    }

    // Add published services
    const { data: services } = await supabase
      .from('services')
      .select('slug, updated_at')
      .eq('publish_state', 'published');

    if (services) {
      services.forEach(service => {
        urls.push({
          loc: `${baseUrl}/services/${service.slug}`,
          lastmod: new Date(service.updated_at).toISOString().split('T')[0],
          priority: '0.7',
        });
      });
    }

    // Generate XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    console.log(`Sitemap generated with ${urls.length} URLs`);

    return new Response(
      JSON.stringify({ 
        success: true,
        url_count: urls.length,
        sitemap,
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error: any) {
    return createErrorResponse(error);
  }
});
