import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  FileText,
  Briefcase,
  Image,
  Settings,
  Users,
  MessageSquare,
  Search,
  LayoutGrid,
  Navigation as NavigationIcon,
  Link as LinkIcon,
  CheckCircle2,
  AlertCircle,
  Info
} from 'lucide-react';

const EditorGuide = () => {
  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3">Editor Guide</h1>
        <p className="text-lg text-muted-foreground">
          Complete guide to managing content on your website
        </p>
      </div>

      <Tabs defaultValue="getting-started" className="space-y-6">
        <TabsList className="grid grid-cols-2 lg:grid-cols-5 w-full">
          <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="tips">Tips & Tricks</TabsTrigger>
        </TabsList>

        <TabsContent value="getting-started" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
                Welcome to the CMS
              </CardTitle>
              <CardDescription>
                Your content management system for the Ascent Group Construction website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Quick Start Checklist</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                    <div>
                      <p className="font-medium">Dashboard Overview</p>
                      <p className="text-sm text-muted-foreground">
                        Familiarize yourself with the dashboard - your hub for all content management
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                    <div>
                      <p className="font-medium">Global Search (⌘K)</p>
                      <p className="text-sm text-muted-foreground">
                        Press Cmd+K (Mac) or Ctrl+K (Windows) to search across all content
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                    <div>
                      <p className="font-medium">Content Workflow</p>
                      <p className="text-sm text-muted-foreground">
                        Draft → Review → Publish - Track content status through each stage
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">User Roles</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Badge variant="glass">Super Admin</Badge>
                    <span className="text-sm">Full access to all features including user management</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">Admin</Badge>
                    <span className="text-sm">Manage all content, cannot manage users</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">Editor</Badge>
                    <span className="text-sm">Create and edit content, cannot publish</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">Contributor</Badge>
                    <span className="text-sm">Create drafts only, cannot edit others' content</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Managing Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Services
                </h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Location:</strong> Admin → Services</p>
                  <p><strong>What it does:</strong> Manage service pages like "Concrete Services", "Excavation", etc.</p>
                  <div className="bg-muted p-3 rounded-lg space-y-1">
                    <p className="font-medium">Best Practices:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Use clear, descriptive service names</li>
                      <li>Include at least 3-5 key benefits</li>
                      <li>Add high-quality featured images</li>
                      <li>Fill out all SEO fields (title, description, keywords)</li>
                      <li>Link related services together</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <LayoutGrid className="h-4 w-4" />
                  Projects
                </h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Location:</strong> Admin → Projects</p>
                  <p><strong>What it does:</strong> Showcase completed work and case studies</p>
                  <div className="bg-muted p-3 rounded-lg space-y-1">
                    <p className="font-medium">Best Practices:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Upload before/after images for visual impact</li>
                      <li>Include specific metrics (timeline, budget, sq ft)</li>
                      <li>Document challenges and solutions</li>
                      <li>Tag with relevant services for cross-linking</li>
                      <li>Add client testimonials when available</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Blog Posts
                </h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Location:</strong> Admin → Blog</p>
                  <p><strong>What it does:</strong> Publish articles, news, and educational content</p>
                  <div className="bg-muted p-3 rounded-lg space-y-1">
                    <p className="font-medium">Best Practices:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Write compelling headlines (50-60 characters)</li>
                      <li>Use subheadings (H2, H3) to break up content</li>
                      <li>Include relevant images every 2-3 paragraphs</li>
                      <li>Add internal links to services/projects</li>
                      <li>Set a featured image (1200x630 for social sharing)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-medium text-blue-900 dark:text-blue-100">Bulk Operations</p>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      Select multiple items using checkboxes, then use the bulk actions bar to:
                    </p>
                    <ul className="text-sm text-blue-800 dark:text-blue-200 list-disc list-inside ml-2">
                      <li>Publish or unpublish multiple items</li>
                      <li>Change status for multiple items</li>
                      <li>Delete multiple items</li>
                      <li>Export selected items</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Media Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Uploading Images</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Location:</strong> Admin → Media Library</p>
                  <div className="bg-muted p-3 rounded-lg space-y-1">
                    <p className="font-medium">Image Guidelines:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li><strong>File Size:</strong> Under 500KB for web (compress large images)</li>
                      <li><strong>Formats:</strong> JPG for photos, PNG for graphics/logos</li>
                      <li><strong>Dimensions:</strong> Minimum 1200px wide for featured images</li>
                      <li><strong>Alt Text:</strong> Always add descriptive alt text for SEO</li>
                      <li><strong>Naming:</strong> Use descriptive filenames (e.g., "concrete-driveway-project.jpg")</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Focal Point & Cropping</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Click on any image in the media library to set a focal point. This ensures important subjects stay visible when images are cropped for different layouts.
                </p>
                <div className="bg-amber-50 dark:bg-amber-950/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800">
                  <p className="text-sm text-amber-900 dark:text-amber-100">
                    <strong>Pro Tip:</strong> Set the focal point on faces or important details to ensure they're never cropped out on mobile devices.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Organizing Media</h3>
                <div className="space-y-2 text-sm">
                  <p>Use categories to keep your media organized:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li><strong>Projects:</strong> Before/after photos, progress shots</li>
                    <li><strong>Services:</strong> Service-related imagery</li>
                    <li><strong>Blog:</strong> Article featured images and inline photos</li>
                    <li><strong>Team:</strong> Staff photos and headshots</li>
                    <li><strong>Logos:</strong> Company and partner logos</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                SEO Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Page Titles</h3>
                <div className="space-y-2 text-sm">
                  <p>Every page should have a unique, descriptive title (50-60 characters):</p>
                  <div className="bg-green-50 dark:bg-green-950/20 p-3 rounded-lg border border-green-200 dark:border-green-800 space-y-2">
                    <div>
                      <p className="font-medium text-green-900 dark:text-green-100">✅ Good Example:</p>
                      <code className="text-xs text-green-800 dark:text-green-200">
                        "Commercial Concrete Services in Ontario | Ascent Group"
                      </code>
                    </div>
                  </div>
                  <div className="bg-red-50 dark:bg-red-950/20 p-3 rounded-lg border border-red-200 dark:border-red-800 space-y-2">
                    <div>
                      <p className="font-medium text-red-900 dark:text-red-100">❌ Bad Example:</p>
                      <code className="text-xs text-red-800 dark:text-red-200">
                        "Concrete - Ascent Group Construction Services Page"
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Meta Descriptions</h3>
                <div className="space-y-2 text-sm">
                  <p>Write compelling 150-160 character summaries that include your target keyword:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                    <li>Include your main keyword naturally</li>
                    <li>Add a call-to-action</li>
                    <li>Mention location if relevant</li>
                    <li>Make it enticing to click</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Keywords</h3>
                <div className="space-y-2 text-sm">
                  <p>Add 3-5 relevant keywords per page:</p>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="font-medium mb-2">Example for Concrete Services:</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">commercial concrete</Badge>
                      <Badge variant="secondary">concrete contractor Ontario</Badge>
                      <Badge variant="secondary">concrete foundation</Badge>
                      <Badge variant="secondary">concrete flatwork</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Structured Data</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Use the Structured Data Manager (Admin → Structured Data) to add rich snippets for:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                  <li><strong>Organization:</strong> Company info, logo, contact</li>
                  <li><strong>Service:</strong> Service types and descriptions</li>
                  <li><strong>FAQ:</strong> Common questions and answers</li>
                  <li><strong>Review:</strong> Customer testimonials</li>
                </ul>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-medium text-blue-900 dark:text-blue-100">SEO Dashboard</p>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      Check Admin → SEO Dashboard to see your SEO completion status and identify pages that need optimization.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tips & Tricks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Keyboard Shortcuts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center justify-between p-2 bg-muted rounded">
                    <span className="text-sm">Global Search</span>
                    <kbd className="px-2 py-1 text-xs bg-background border rounded">⌘K</kbd>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted rounded">
                    <span className="text-sm">Save Draft</span>
                    <kbd className="px-2 py-1 text-xs bg-background border rounded">⌘S</kbd>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted rounded">
                    <span className="text-sm">Preview</span>
                    <kbd className="px-2 py-1 text-xs bg-background border rounded">⌘P</kbd>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted rounded">
                    <span className="text-sm">View History</span>
                    <kbd className="px-2 py-1 text-xs bg-background border rounded">⌘H</kbd>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Content Strategy</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                    <div>
                      <p className="font-medium">Consistency is Key</p>
                      <p className="text-sm text-muted-foreground">
                        Maintain consistent tone, style, and formatting across all content
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                    <div>
                      <p className="font-medium">Update Regularly</p>
                      <p className="text-sm text-muted-foreground">
                        Fresh content helps with SEO - aim to add new blog posts or project case studies monthly
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                    <div>
                      <p className="font-medium">Internal Linking</p>
                      <p className="text-sm text-muted-foreground">
                        Link related services, projects, and blog posts together to improve navigation and SEO
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Revision History</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Every time you save, a version is automatically created. You can:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                  <li>View all previous versions of any content</li>
                  <li>See what changed between versions</li>
                  <li>Restore any previous version with one click</li>
                  <li>Track who made changes and when</li>
                </ul>
                <div className="mt-3 bg-muted p-3 rounded-lg">
                  <p className="text-sm">
                    <strong>Location:</strong> Click "View History" button at the top of any editor
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EditorGuide;
