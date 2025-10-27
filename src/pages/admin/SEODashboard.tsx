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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  Search,
  TrendingUp,
  TrendingDown,
  FileText,
  Link as LinkIcon,
  RefreshCw,
  Loader2,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Settings,
  ArrowLeft,
  MousePointerClick,
  Eye,
  XCircle,
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

interface SearchConsoleData {
  page_path: string;
  query: string;
  date: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface DailyMetrics {
  date: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface PageMetrics {
  page_path: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface QueryMetrics {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
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
  const [siteUrl, setSiteUrl] = useState('');
  const [fetchingData, setFetchingData] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [checkingConnection, setCheckingConnection] = useState(true);
  const [searchConsoleData, setSearchConsoleData] = useState<SearchConsoleData[]>([]);
  const [dateRange, setDateRange] = useState<'7' | '30' | '90'>('30');
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
    loadSEOData();
    checkGoogleConnection();
    
    // Check URL params for OAuth callback status
    const params = new URLSearchParams(window.location.search);
    const connected = params.get('gsc_connected');
    const error = params.get('gsc_error');
    
    if (connected === 'true') {
      toast({
        title: 'Success',
        description: 'Google Search Console connected successfully!',
      });
      // Clear URL params
      window.history.replaceState({}, '', '/admin/seo-dashboard');
      checkGoogleConnection();
    } else if (error) {
      toast({
        variant: 'destructive',
        title: 'Connection Failed',
        description: decodeURIComponent(error),
      });
      // Clear URL params
      window.history.replaceState({}, '', '/admin/seo-dashboard');
    }
  }, []);

  useEffect(() => {
    if (currentUserId) {
      loadSearchConsoleData();
    }
  }, [dateRange, currentUserId]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate('/auth');
      return;
    }

    setCurrentUserId(session.user.id);

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

  const loadSearchConsoleData = async () => {
    if (!currentUserId) return;

    try {
      const daysAgo = parseInt(dateRange);
      const startDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
      
      const { data, error } = await supabase
        .from('search_console_data')
        .select('*')
        .eq('user_id', currentUserId)
        .gte('date', startDate.toISOString().split('T')[0])
        .order('date', { ascending: true });

      if (error) throw error;

      setSearchConsoleData(data || []);
      
      // Get last sync time
      if (data && data.length > 0) {
        const latestDate = data[data.length - 1].date;
        setLastSyncTime(new Date(latestDate).toLocaleDateString());
      }
    } catch (error) {
      console.error('Error loading Search Console data:', error);
    }
  };

  const checkGoogleConnection = async () => {
    try {
      setCheckingConnection(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user?.id) return;

      const { data, error } = await supabase
        .from('google_auth_tokens')
        .select('access_token')
        .eq('user_id', session.user.id)
        .single();

      setIsConnected(!!data && !error);
    } catch (error) {
      console.error('Error checking Google connection:', error);
      setIsConnected(false);
    } finally {
      setCheckingConnection(false);
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

      // Load robots.txt
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

  const connectGoogleSearchConsole = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('google-search-console-auth');
      
      if (error) {
        console.error('Error getting auth URL:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to initiate Google Search Console connection',
        });
        return;
      }
      
      if (data?.authUrl) {
        window.location.href = data.authUrl;
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to get authorization URL',
        });
      }
    } catch (error: any) {
      console.error('Error connecting to Google Search Console:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to connect to Google Search Console',
      });
    }
  };

  const fetchSearchConsoleData = async () => {
    if (!siteUrl) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please enter a website URL',
      });
      return;
    }

    try {
      setFetchingData(true);
      toast({
        title: 'Fetching Data',
        description: 'Retrieving Search Console data...',
      });

      // Format the site URL correctly for domain properties
      let formattedSiteUrl = siteUrl.trim();
      
      // If it doesn't have a protocol and isn't already prefixed with sc-domain:
      if (!formattedSiteUrl.startsWith('http') && !formattedSiteUrl.startsWith('sc-domain:')) {
        formattedSiteUrl = `sc-domain:${formattedSiteUrl}`;
      }

      const { data, error } = await supabase.functions.invoke('fetch-search-console-data', {
        body: { 
          siteUrl: formattedSiteUrl,
          startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          endDate: new Date().toISOString().split('T')[0],
        },
      });

      if (error) throw error;

      toast({
        title: 'Success',
        description: `Fetched ${data.rowCount || 0} rows of Search Console data`,
      });

      await loadSearchConsoleData();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to fetch Search Console data',
      });
    } finally {
      setFetchingData(false);
    }
  };

  // Calculate aggregated metrics
  const calculateMetrics = () => {
    if (!searchConsoleData.length) {
      return {
        totalClicks: 0,
        totalImpressions: 0,
        avgCTR: 0,
        avgPosition: 0,
        previousClicks: 0,
        previousImpressions: 0,
      };
    }

    const halfwayPoint = Math.floor(searchConsoleData.length / 2);
    const recentData = searchConsoleData.slice(halfwayPoint);
    const previousData = searchConsoleData.slice(0, halfwayPoint);

    const totalClicks = recentData.reduce((sum, row) => sum + row.clicks, 0);
    const totalImpressions = recentData.reduce((sum, row) => sum + row.impressions, 0);
    const avgCTR = recentData.reduce((sum, row) => sum + row.ctr, 0) / recentData.length;
    const avgPosition = recentData.reduce((sum, row) => sum + row.position, 0) / recentData.length;

    const previousClicks = previousData.reduce((sum, row) => sum + row.clicks, 0);
    const previousImpressions = previousData.reduce((sum, row) => sum + row.impressions, 0);

    return {
      totalClicks,
      totalImpressions,
      avgCTR: avgCTR * 100,
      avgPosition,
      previousClicks,
      previousImpressions,
    };
  };

  // Aggregate data by date for charts
  const getDailyMetrics = (): DailyMetrics[] => {
    const dailyMap = new Map<string, DailyMetrics>();

    searchConsoleData.forEach(row => {
      const existing = dailyMap.get(row.date);
      if (existing) {
        existing.clicks += row.clicks;
        existing.impressions += row.impressions;
      } else {
        dailyMap.set(row.date, {
          date: new Date(row.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          clicks: row.clicks,
          impressions: row.impressions,
          ctr: row.ctr * 100,
          position: row.position,
        });
      }
    });

    return Array.from(dailyMap.values());
  };

  // Get top pages by clicks
  const getTopPages = (): PageMetrics[] => {
    const pageMap = new Map<string, PageMetrics>();

    searchConsoleData.forEach(row => {
      const existing = pageMap.get(row.page_path);
      if (existing) {
        existing.clicks += row.clicks;
        existing.impressions += row.impressions;
      } else {
        pageMap.set(row.page_path, {
          page_path: row.page_path,
          clicks: row.clicks,
          impressions: row.impressions,
          ctr: row.ctr,
          position: row.position,
        });
      }
    });

    return Array.from(pageMap.values())
      .sort((a, b) => b.clicks - a.clicks)
      .slice(0, 10);
  };

  // Get top queries by impressions
  const getTopQueries = (): QueryMetrics[] => {
    const queryMap = new Map<string, QueryMetrics>();

    searchConsoleData.forEach(row => {
      const existing = queryMap.get(row.query);
      if (existing) {
        existing.clicks += row.clicks;
        existing.impressions += row.impressions;
      } else {
        queryMap.set(row.query, {
          query: row.query,
          clicks: row.clicks,
          impressions: row.impressions,
          ctr: row.ctr,
          position: row.position,
        });
      }
    });

    return Array.from(queryMap.values())
      .sort((a, b) => b.impressions - a.impressions)
      .slice(0, 10);
  };

  const metrics = calculateMetrics();
  const dailyMetrics = getDailyMetrics();
  const topPages = getTopPages();
  const topQueries = getTopQueries();

  const clicksChange = metrics.previousClicks > 0 
    ? ((metrics.totalClicks - metrics.previousClicks) / metrics.previousClicks) * 100 
    : 0;
  const impressionsChange = metrics.previousImpressions > 0
    ? ((metrics.totalImpressions - metrics.previousImpressions) / metrics.previousImpressions) * 100
    : 0;

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
          <TabsTrigger value="analytics">Search Analytics</TabsTrigger>
          <TabsTrigger value="content">Content SEO</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
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
              {seoSettings.length === 0 ? (
                <div className="text-center space-y-3 py-8">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="text-lg font-medium">No SEO data available yet</p>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Create blog posts, projects, and services to start tracking SEO performance.
                  </p>
                </div>
              ) : (
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
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Search Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          {/* Connection Status & Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Google Search Console
                {checkingConnection ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : isConnected ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
              </CardTitle>
              <CardDescription>
                {isConnected ? (
                  <div className="flex items-center gap-2">
                    <span>Connected</span>
                    {lastSyncTime && <span className="text-xs">• Last synced: {lastSyncTime}</span>}
                  </div>
                ) : (
                  'Connect your Google Search Console account to view analytics'
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isConnected ? (
                <Button onClick={connectGoogleSearchConsole}>
                  Connect Google Search Console
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="flex gap-4 items-end">
                    <div className="flex-1">
                      <Label htmlFor="siteUrl">Website URL or Domain</Label>
                      <Input
                        id="siteUrl"
                        value={siteUrl}
                        onChange={(e) => setSiteUrl(e.target.value)}
                        placeholder="ascentgroupconstruction.com or https://example.com/"
                        className="max-w-md"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Enter your domain (e.g., ascentgroupconstruction.com) or full URL with protocol
                      </p>
                    </div>
                    <div>
                      <Label>Date Range</Label>
                      <Select value={dateRange} onValueChange={(value: '7' | '30' | '90') => setDateRange(value)}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">Last 7 days</SelectItem>
                          <SelectItem value="30">Last 30 days</SelectItem>
                          <SelectItem value="90">Last 90 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={fetchSearchConsoleData} disabled={fetchingData}>
                      {fetchingData ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Fetching...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Fetch Data
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {searchConsoleData.length > 0 && (
            <>
              {/* Summary Cards */}
              <div className="grid gap-4 md:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                    <MousePointerClick className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metrics.totalClicks.toLocaleString()}</div>
                    <p className="text-xs flex items-center gap-1">
                      {clicksChange > 0 ? (
                        <>
                          <TrendingUp className="h-3 w-3 text-green-500" />
                          <span className="text-green-500">+{clicksChange.toFixed(1)}%</span>
                        </>
                      ) : (
                        <>
                          <TrendingDown className="h-3 w-3 text-red-500" />
                          <span className="text-red-500">{clicksChange.toFixed(1)}%</span>
                        </>
                      )}
                      <span className="text-muted-foreground">vs previous period</span>
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Impressions</CardTitle>
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metrics.totalImpressions.toLocaleString()}</div>
                    <p className="text-xs flex items-center gap-1">
                      {impressionsChange > 0 ? (
                        <>
                          <TrendingUp className="h-3 w-3 text-green-500" />
                          <span className="text-green-500">+{impressionsChange.toFixed(1)}%</span>
                        </>
                      ) : (
                        <>
                          <TrendingDown className="h-3 w-3 text-red-500" />
                          <span className="text-red-500">{impressionsChange.toFixed(1)}%</span>
                        </>
                      )}
                      <span className="text-muted-foreground">vs previous period</span>
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg CTR</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metrics.avgCTR.toFixed(2)}%</div>
                    <p className="text-xs text-muted-foreground">Click-through rate</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Position</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metrics.avgPosition.toFixed(1)}</div>
                    <p className="text-xs text-muted-foreground">Search ranking</p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Clicks & Impressions Over Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={dailyMetrics}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="clicks" stroke="hsl(var(--primary))" strokeWidth={2} />
                        <Line type="monotone" dataKey="impressions" stroke="hsl(var(--secondary))" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top 10 Pages by Clicks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={topPages} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="page_path" type="category" width={150} tickFormatter={(value) => {
                          return value.length > 20 ? value.substring(0, 20) + '...' : value;
                        }} />
                        <Tooltip />
                        <Bar dataKey="clicks" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Top Queries Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Search Queries</CardTitle>
                  <CardDescription>Most viewed search queries for your site</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {topQueries.map((query, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{query.query}</p>
                          <p className="text-sm text-muted-foreground">
                            Position {query.position.toFixed(1)} • CTR {(query.ctr * 100).toFixed(2)}%
                          </p>
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                          <div className="text-center">
                            <p className="font-bold">{query.clicks}</p>
                            <p className="text-muted-foreground">Clicks</p>
                          </div>
                          <div className="text-center">
                            <p className="font-bold">{query.impressions.toLocaleString()}</p>
                            <p className="text-muted-foreground">Impressions</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {searchConsoleData.length === 0 && isConnected && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-3 py-8">
                  <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="text-lg font-medium">No Search Console data available</p>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Enter your site URL above and click "Fetch Data" to load analytics from Google Search Console.
                  </p>
                </div>
              </CardContent>
            </Card>
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
                {generatingKeywords ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Generate Keywords'
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sitemap Generator</CardTitle>
              <CardDescription>Regenerate your XML sitemap with the latest content</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={regenerateSitemap}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Regenerate Sitemap
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Robots.txt</CardTitle>
              <CardDescription>Configure search engine crawler behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="robots">Robots.txt Content</Label>
                <Textarea
                  id="robots"
                  value={robotsTxt}
                  onChange={(e) => setRobotsTxt(e.target.value)}
                  rows={8}
                  className="font-mono text-sm"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Make sure to update the actual robots.txt file in your public folder to match these settings.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}