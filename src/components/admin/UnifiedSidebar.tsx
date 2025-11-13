import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  Users, 
  DollarSign,
  Receipt,
  Package,
  Mail,
  Image,
  Settings,
  Shield,
  Search,
  Activity,
  ChevronLeft,
  ChevronRight,
  Folder,
  UserCircle,
  FileCheck,
  X,
  MessageSquare,
  BarChart,
  Award,
  BookOpen,
  Layout,
  Navigation,
  Wrench,
  AlertTriangle,
  ArrowRightLeft,
  Database
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { GlobalSearch } from './GlobalSearch';

interface UnifiedSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
  onRestartOnboarding?: () => void;
}

export const UnifiedSidebar = ({ collapsed, onToggle, mobileOpen, onMobileClose, onRestartOnboarding }: UnifiedSidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Close mobile menu on route change
  useEffect(() => {
    if (mobileOpen && onMobileClose) {
      onMobileClose();
    }
  }, [currentPath]);

  // Check if any route in a group is active to keep it open
  const isContentActive = ['/admin/projects', '/admin/services', '/admin/blog', '/admin/media', '/admin/testimonials', '/admin/stats', '/admin/awards', '/admin/leadership', '/admin/documents'].some(p => currentPath.startsWith(p));
  const isAppearanceActive = ['/admin/homepage-builder', '/admin/navigation-builder', '/admin/footer-settings', '/admin/about-page', '/admin/contact-page'].some(p => currentPath.startsWith(p));
  const isInboxActive = ['/admin/contacts', '/admin/resumes', '/admin/prequalifications', '/admin/rfp', '/admin/newsletter-subscribers', '/admin/partner-permissions'].some(p => currentPath.startsWith(p));
  const isBusinessActive = ['/admin/business'].some(p => currentPath.startsWith(p));
  const isToolsActive = ['/admin/seo-dashboard', '/admin/redirects', '/admin/structured-data', '/admin/performance-dashboard', '/admin/search-analytics', '/admin/settings-health'].some(p => currentPath.startsWith(p));
  const isSettingsActive = ['/admin/site-settings', '/admin/users', '/admin/security-settings', '/admin/editor-guide', '/admin/error-logs'].some(p => currentPath.startsWith(p));

  const [contentOpen, setContentOpen] = useState(isContentActive);
  const [appearanceOpen, setAppearanceOpen] = useState(isAppearanceActive);
  const [inboxOpen, setInboxOpen] = useState(isInboxActive);
  const [businessOpen, setBusinessOpen] = useState(isBusinessActive);
  const [toolsOpen, setToolsOpen] = useState(isToolsActive);
  const [settingsOpen, setSettingsOpen] = useState(isSettingsActive);

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path + '/');

  const NavItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => (
    <NavLink
      to={to}
      className={`business-nav-item ${isActive(to) ? 'active' : ''}`}
    >
      <Icon className="business-nav-icon" />
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="business-sidebar-backdrop"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside className={`business-sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* Mobile Close Button */}
        <button 
          className="business-sidebar-mobile-close"
          onClick={onMobileClose}
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

        <div className="business-sidebar-content">
        {/* Logo */}
        <div className="business-logo">
          {collapsed ? (
            <div style={{ 
              fontSize: '1.5rem', 
              fontWeight: '700', 
              background: 'linear-gradient(135deg, #2563eb 0%, #f97316 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center'
            }}>
              A
            </div>
          ) : (
            <>
              <div style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                background: 'linear-gradient(135deg, #2563eb 0%, #f97316 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Ascent
              </div>
              <span style={{ fontSize: '0.875rem', color: 'var(--business-text-secondary)' }}>
                Admin Panel
              </span>
            </>
          )}
        </div>

        {/* Search */}
        {!collapsed && (
          <div style={{ padding: '0 1rem', marginBottom: '1rem' }}>
            <GlobalSearch />
          </div>
        )}

        {/* Main Dashboard */}
        <nav style={{ marginBottom: '1.5rem' }}>
          <NavItem to="/admin" icon={LayoutDashboard} label="Dashboard" />
        </nav>

        {/* Content Management Section */}
        <Collapsible open={contentOpen} onOpenChange={setContentOpen} data-tour="content">
          <CollapsibleTrigger className="business-nav-group-label">
            {!collapsed && (
              <>
                <FileText size={16} />
                <span>Content</span>
              </>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <nav className="business-nav-group">
              <NavItem to="/admin/projects" icon={Folder} label="Projects" />
              <NavItem to="/admin/services" icon={Package} label="Services" />
              <NavItem to="/admin/blog" icon={FileText} label="Blog Posts" />
              <NavItem to="/admin/testimonials" icon={MessageSquare} label="Testimonials" />
              <NavItem to="/admin/stats" icon={BarChart} label="Stats" />
              <NavItem to="/admin/awards" icon={Award} label="Awards" />
              <NavItem to="/admin/leadership-team" icon={Users} label="Leadership" />
              <NavItem to="/admin/documents-library" icon={FileCheck} label="Documents" />
              <NavItem to="/admin/media" icon={Image} label="Media Library" />
            </nav>
          </CollapsibleContent>
        </Collapsible>

        {/* Appearance Section (NEW) */}
        <Collapsible open={appearanceOpen} onOpenChange={setAppearanceOpen} data-tour="appearance">
          <CollapsibleTrigger className="business-nav-group-label">
            {!collapsed && (
              <>
                <Layout size={16} />
                <span>Appearance</span>
              </>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <nav className="business-nav-group">
              <NavItem to="/admin/navigation-builder" icon={Navigation} label="Navigation" />
              <NavItem to="/admin/homepage-builder" icon={Layout} label="Homepage" />
              <NavItem to="/admin/footer-settings" icon={Layout} label="Footer" />
              <NavItem to="/admin/about-page" icon={FileText} label="About Page" />
              <NavItem to="/admin/contact-page-settings" icon={Mail} label="Contact Page" />
            </nav>
          </CollapsibleContent>
        </Collapsible>

        {/* Inbox Section */}
        <Collapsible open={inboxOpen} onOpenChange={setInboxOpen} data-tour="inbox">
          <CollapsibleTrigger className="business-nav-group-label">
            {!collapsed && (
              <>
                <Mail size={16} />
                <span>Inbox</span>
              </>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <nav className="business-nav-group">
              <NavItem to="/admin/contacts" icon={Mail} label="Contact Forms" />
              <NavItem to="/admin/resumes" icon={FileCheck} label="Resumes" />
              <NavItem to="/admin/prequalifications" icon={Package} label="Prequal" />
              <NavItem to="/admin/rfp-submissions" icon={FileText} label="RFP Submissions" />
              <NavItem to="/admin/reviews" icon={Award} label="Reviews" />
              <NavItem to="/admin/newsletter-subscribers" icon={Mail} label="Newsletter" />
              <NavItem to="/admin/partner-permissions" icon={Shield} label="Partner Logos" />
            </nav>
          </CollapsibleContent>
        </Collapsible>

        {/* Business Tools Section */}
        <Collapsible open={businessOpen} onOpenChange={setBusinessOpen} data-tour="business">
          <CollapsibleTrigger className="business-nav-group-label">
            {!collapsed && (
              <>
                <Briefcase size={16} />
                <span>Business Tools</span>
              </>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <nav className="business-nav-group">
              <NavItem to="/admin/business" icon={LayoutDashboard} label="Dashboard" />
              <NavItem to="/admin/business/clients" icon={Users} label="Clients" />
              <NavItem to="/admin/business/projects" icon={Briefcase} label="Projects" />
              <NavItem to="/admin/business/estimates" icon={FileText} label="Estimates" />
              <NavItem to="/admin/business/invoices" icon={Receipt} label="Invoices" />
            </nav>
          </CollapsibleContent>
        </Collapsible>

        {/* Tools Section (NEW) */}
        <Collapsible open={toolsOpen} onOpenChange={setToolsOpen} data-tour="tools">
          <CollapsibleTrigger className="business-nav-group-label">
            {!collapsed && (
              <>
                <Search size={16} />
                <span>Tools</span>
              </>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <nav className="business-nav-group">
              <NavItem to="/admin/seo-dashboard" icon={Search} label="SEO Dashboard" />
              <NavItem to="/admin/redirects" icon={ArrowRightLeft} label="Redirects" />
              <NavItem to="/admin/structured-data" icon={Database} label="Structured Data" />
              <NavItem to="/admin/performance-dashboard" icon={Activity} label="Performance" />
              <NavItem to="/admin/search-analytics" icon={Search} label="Search Analytics" />
              <NavItem to="/admin/settings-health" icon={Wrench} label="Settings Health" />
            </nav>
          </CollapsibleContent>
        </Collapsible>

        {/* Settings Section */}
        <Collapsible open={settingsOpen} onOpenChange={setSettingsOpen} data-tour="settings">
          <CollapsibleTrigger className="business-nav-group-label">
            {!collapsed && (
              <>
                <Settings size={16} />
                <span>Settings</span>
              </>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <nav className="business-nav-group">
              <NavItem to="/admin/site-settings" icon={Settings} label="Site Settings" />
              <NavItem to="/admin/users" icon={UserCircle} label="Users & Roles" />
              <NavItem to="/admin/security-settings" icon={Shield} label="Security" />
              <NavItem to="/admin/editor-guide" icon={BookOpen} label="Editor Guide" />
              <NavItem to="/admin/error-logs" icon={AlertTriangle} label="Error Logs" />
            </nav>
          </CollapsibleContent>
        </Collapsible>

        {onRestartOnboarding && !collapsed && (
          <button 
            onClick={onRestartOnboarding}
            className="business-nav-item"
            style={{ marginTop: 'auto', opacity: 0.7 }}
          >
            <Activity className="business-nav-icon" />
            <span>Restart Tour</span>
          </button>
        )}
      </div>

        {/* Toggle Button */}
        <button className="business-sidebar-toggle" onClick={onToggle}>
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </aside>
    </>
  );
};

