import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Layout,
  Grid,
  Type,
  Palette,
  Menu as MenuIcon,
  Plus,
  Eye,
  Edit,
  Trash2,
  Loader2,
  CheckCircle,
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  type: string;
  description: string;
  thumbnail: string | null;
  is_active: boolean;
  is_default: boolean;
  created_at: string;
}

interface StylePreset {
  id: string;
  name: string;
  category: string;
  values: any;
  is_active: boolean;
}

interface NavigationMenu {
  id: string;
  name: string;
  location: string;
  items: any;
  is_active: boolean;
}

export default function TemplateManager() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [stylePresets, setStylePresets] = useState<StylePreset[]>([]);
  const [menus, setMenus] = useState<NavigationMenu[]>([]);

  useEffect(() => {
    checkAuth();
    loadTemplateData();
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
        description: 'You do not have permission to access the Template Manager',
      });
    }
  };

  const loadTemplateData = async () => {
    try {
      setLoading(true);

      // Load templates
      const { data: templatesData } = await supabase
        .from('templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (templatesData) setTemplates(templatesData);

      // Load style presets
      const { data: presetsData } = await supabase
        .from('style_presets')
        .select('*')
        .order('created_at', { ascending: false });

      if (presetsData) setStylePresets(presetsData);

      // Load navigation menus
      const { data: menusData } = await supabase
        .from('navigation_menus')
        .select('*')
        .order('created_at', { ascending: false });

      if (menusData) setMenus(menusData);
    } catch (error: any) {
      console.error('Error loading template data:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load template data',
      });
    } finally {
      setLoading(false);
    }
  };

  const activateTemplate = async (templateId: string, type: string) => {
    try {
      // Deactivate all templates of the same type
      await supabase
        .from('templates')
        .update({ is_active: false })
        .eq('type', type);

      // Activate selected template
      const { error } = await supabase
        .from('templates')
        .update({ is_active: true })
        .eq('id', templateId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Template activated successfully',
      });

      loadTemplateData();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    }
  };

  const deleteTemplate = async (templateId: string) => {
    try {
      const { error } = await supabase
        .from('templates')
        .delete()
        .eq('id', templateId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Template deleted successfully',
      });

      loadTemplateData();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    }
  };

  const getTemplateIcon = (type: string) => {
    switch (type) {
      case 'header': return Layout;
      case 'footer': return Layout;
      case 'page_layout': return Grid;
      case 'section': return Grid;
      default: return Layout;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const templatesByType = {
    header: templates.filter((t) => t.type === 'header'),
    footer: templates.filter((t) => t.type === 'footer'),
    page_layout: templates.filter((t) => t.type === 'page_layout'),
    section: templates.filter((t) => t.type === 'section'),
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <Layout className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Template Manager</h1>
          <p className="text-muted-foreground">Customize your site's appearance with templates</p>
        </div>
      </div>

      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="styles">Styles</TabsTrigger>
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
        </TabsList>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          {/* Header Templates */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Layout className="h-5 w-5" />
                    Header Templates
                  </CardTitle>
                  <CardDescription>Customize your site's header design</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Template
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {templatesByType.header.length === 0 ? (
                  <p className="text-muted-foreground col-span-3 text-center py-8">
                    No header templates yet. Create one to get started.
                  </p>
                ) : (
                  templatesByType.header.map((template) => (
                    <div key={template.id} className="border rounded-lg p-4 space-y-3">
                      {template.thumbnail && (
                        <img
                          src={template.thumbnail}
                          alt={template.name}
                          className="w-full h-32 object-cover rounded"
                        />
                      )}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{template.name}</h3>
                          {template.is_active && <Badge>Active</Badge>}
                          {template.is_default && <Badge variant="secondary">Default</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="mr-1 h-3 w-3" />
                          Preview
                        </Button>
                        {!template.is_active && (
                          <Button
                            size="sm"
                            onClick={() => activateTemplate(template.id, template.type)}
                          >
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Activate
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteTemplate(template.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Footer Templates */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Layout className="h-5 w-5" />
                    Footer Templates
                  </CardTitle>
                  <CardDescription>Customize your site's footer design</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Template
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {templatesByType.footer.length === 0 ? (
                  <p className="text-muted-foreground col-span-3 text-center py-8">
                    No footer templates yet. Create one to get started.
                  </p>
                ) : (
                  templatesByType.footer.map((template) => (
                    <div key={template.id} className="border rounded-lg p-4 space-y-3">
                      {template.thumbnail && (
                        <img
                          src={template.thumbnail}
                          alt={template.name}
                          className="w-full h-32 object-cover rounded"
                        />
                      )}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{template.name}</h3>
                          {template.is_active && <Badge>Active</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="mr-1 h-3 w-3" />
                          Preview
                        </Button>
                        {!template.is_active && (
                          <Button
                            size="sm"
                            onClick={() => activateTemplate(template.id, template.type)}
                          >
                            Activate
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Styles Tab */}
        <TabsContent value="styles" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Color Schemes
                  </CardTitle>
                  <CardDescription>Manage your site's color palettes</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Color Scheme
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {stylePresets
                  .filter((p) => p.category === 'colors')
                  .map((preset) => (
                    <div key={preset.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-medium">{preset.name}</h3>
                        {preset.is_active && <Badge>Active</Badge>}
                      </div>
                      <div className="flex gap-2">
                        {/* Color swatches would go here */}
                        <div className="h-8 w-8 rounded bg-primary" />
                        <div className="h-8 w-8 rounded bg-secondary" />
                        <div className="h-8 w-8 rounded bg-accent" />
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Type className="h-5 w-5" />
                    Typography Presets
                  </CardTitle>
                  <CardDescription>Define font styles and sizes</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Typography
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                No typography presets yet
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Navigation Tab */}
        <TabsContent value="navigation" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MenuIcon className="h-5 w-5" />
                    Navigation Menus
                  </CardTitle>
                  <CardDescription>Configure site navigation menus</CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Menu
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {menus.map((menu) => (
                  <div key={menu.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{menu.name}</h3>
                          <Badge variant="outline">{menu.location}</Badge>
                          {menu.is_active && <Badge>Active</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {JSON.parse(menu.items as any).length || 0} menu items
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="mr-1 h-3 w-3" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
