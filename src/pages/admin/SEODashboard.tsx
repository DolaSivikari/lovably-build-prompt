import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Search,
  TrendingUp,
  FileText,
  Link as LinkIcon,
  RefreshCw,
  Loader2,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Settings,
  ArrowLeft,
} from 'lucide-react';

interface SEOSettings {
  id: string;
  entity_type: string;
  entity_id: string;
  permalink: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string[];
  focus_keyword: string;
  seo_score: number;
}

interface AnalyticsSnapshot {
  page_path: string;
  page_views: number;
  unique_visitors: number;
  avg_time_on_page: number;
  bounce_rate: number;
}

export default function SEODashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [seoSettings, setSeoSettings] = useState<SEOSettings[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsSnapshot[]>([]);
  const [robotsTxt, setRobotsTxt] = useState('');
  const [generatingKeywords, setGeneratingKeywords] = useState(false);
  const [selectedContent, setSelectedContent] = useState('');

  useEffect(() => {
    checkAuth();
    loadSEOData();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate('/auth');
      return;
    }

    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id)
      .single();

    if (!roleData || !['admin', 'super_admin', 'editor'].includes(roleData.role)) {
      navigate('/admin');
      toast({
        variant: 'destructive',
        title: 'Access Denied',
        description: 'You do not have permission to access the SEO Dashboard',
      });
    }
  };

  const loadSEOData = async () => {
    try {
      setLoading(true);

      // Load SEO settings
      const { data: seoData } = await supabase
        .from('seo_settings')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(20);

      if (seoData) setSeoSettings(seoData);

      // Load analytics snapshots
      const { data: analyticsData } = await supabase
        .from('analytics_snapshots')
        .select('*')
        .gte('snapshot_date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
        .order('page_views', { ascending: false })
        .limit(10);

      if (analyticsData) setAnalytics(analyticsData);

      // Load robots.txt (you would typically fetch this from your public folder)
      setRobotsTxt(`User-agent: *
Allow: /
Sitemap: ${window.location.origin}/sitemap.xml`);
    } catch (error: any) {
      console.error('Error loading SEO data:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load SEO data',
      });
    } finally {
      setLoading(false);
    }
  };

  const generateKeywordSuggestions = async () => {
    if (!selectedContent) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please enter content to analyze',
      });
      return;
    }

    try {
      setGeneratingKeywords(true);

      const { data, error } = await supabase.functions.invoke('generate-keywords', {
        body: { content: selectedContent },
      });

      if (error) throw error;

      toast({
        title: 'Keywords Generated',
        description: `Found ${data.keywords?.length || 0} relevant keywords`,
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to generate keywords',
      });
    } finally {
      setGeneratingKeywords(false);
    }
  };

  const regenerateSitemap = async () => {
    try {
      toast({
        title: 'Generating Sitemap',
        description: 'Please wait while we regenerate your sitemap...',
      });

      const { data, error } = await supabase.functions.invoke('generate-sitemap');

      if (error) throw error;

      await supabase.from('sitemap_logs').insert({
        url_count: data.url_count,
        status: 'success',
      });

      toast({
        title: 'Success',
        description: `Sitemap generated with ${data.url_count} URLs`,
      });
    } catch (error: any) {
      await supabase.from('sitemap_logs').insert({
        url_count: 0,
        status: 'error',
        error_message: error.message,
      });

      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to generate sitemap',
      });
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-primary';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={() => navigate('/admin')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <Search className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">SEO Dashboard</h1>
          <p className="text-muted-foreground">Optimize your content for search engines</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content SEO</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {seoSettings.length === 0 && analytics.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-3 py-8">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="text-lg font-medium">No SEO data available yet</p>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Create blog posts, projects, and services to start tracking SEO performance.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{seoSettings.length}</div>
                    <p className="text-xs text-muted-foreground">Pages optimized</p>
                  </CardContent>
                </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg SEO Score</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {seoSettings.length > 0
                    ? Math.round(
                        seoSettings.reduce((sum, s) => sum + s.seo_score, 0) / seoSettings.length
                      )
                    : 0}
                </div>
                <p className="text-xs text-muted-foreground">Out of 100</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analytics.reduce((sum, a) => sum + a.page_views, 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Indexed Pages</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{seoSettings.length}</div>
                <p className="text-xs text-muted-foreground">In sitemap</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent SEO Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Content SEO Status</CardTitle>
              <CardDescription>Recent pages and their SEO scores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {seoSettings.slice(0, 5).map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{setting.meta_title || 'Untitled'}</p>
                      <p className="text-sm text-muted-foreground">
                        {setting.entity_type} • {setting.focus_keyword || 'No focus keyword'}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={setting.seo_score >= 80 ? 'default' : 'secondary'}>
                        {setting.seo_score}/100
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              </CardContent>
            </Card>
          </>
          )}
        </TabsContent>

        {/* Content SEO Tab */}
        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Keyword Suggestions</CardTitle>
              <CardDescription>Generate SEO keywords using AI analysis</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="content">Content to Analyze</Label>
                <Textarea
                  id="content"
                  value={selectedContent}
                  onChange={(e) => setSelectedContent(e.target.value)}
                  placeholder="Paste your content here to generate keyword suggestions..."
                  rows={6}
                />
              </div>
              <Button onClick={generateKeywordSuggestions} disabled={generatingKeywords}>
                {generatingKeywords && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate Keywords
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sitemap Management</CardTitle>
              <CardDescription>Manage your XML sitemap for search engines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">XML Sitemap</p>
                  <p className="text-sm text-muted-foreground">/sitemap.xml</p>
                </div>
                <Button onClick={regenerateSitemap} variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Regenerate
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Pages</CardTitle>
              <CardDescription>Pages with highest traffic (last 30 days)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analytics.map((page, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{page.page_path}</p>
                      <p className="text-sm text-muted-foreground">
                        {page.unique_visitors} unique visitors • {page.bounce_rate?.toFixed(1)}% bounce rate
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{page.page_views.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">views</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Robots.txt Configuration</CardTitle>
              <CardDescription>Control how search engines crawl your site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={robotsTxt}
                onChange={(e) => setRobotsTxt(e.target.value)}
                rows={8}
                className="font-mono text-sm"
              />
              <Button>Save Robots.txt</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Search Console Integration</CardTitle>
              <CardDescription>Connect Google Search Console for enhanced analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline">
                <LinkIcon className="mr-2 h-4 w-4" />
                Connect Google Search Console
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
