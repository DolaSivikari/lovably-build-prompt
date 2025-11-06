import { NavLink } from "react-router-dom";
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
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface UnifiedSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
  onRestartOnboarding?: () => void;
}

export const UnifiedSidebar = ({
  collapsed,
  onToggle,
  mobileOpen,
  onMobileClose,
  onRestartOnboarding,
}: UnifiedSidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Close mobile menu on route change
  useEffect(() => {
    if (mobileOpen && onMobileClose) {
      onMobileClose();
    }
  }, [currentPath]);

  // Check if any route in a group is active to keep it open
  const isContentActive = [
    "/admin/projects",
    "/admin/services",
    "/admin/blog",
    "/admin/media",
  ].some((p) => currentPath.startsWith(p));
  const isInboxActive = [
    "/admin/contacts",
    "/admin/resumes",
    "/admin/prequalifications",
  ].some((p) => currentPath.startsWith(p));
  const isSettingsActive = [
    "/admin/site-settings",
    "/admin/users",
    "/admin/security",
    "/admin/seo",
    "/admin/performance",
  ].some((p) => currentPath.startsWith(p));

  const [contentOpen, setContentOpen] = useState(isContentActive);
  const [inboxOpen, setInboxOpen] = useState(isInboxActive);
  const [settingsOpen, setSettingsOpen] = useState(isSettingsActive);

  const isActive = (path: string) =>
    currentPath === path || currentPath.startsWith(path + "/");

  const NavItem = ({
    to,
    icon: Icon,
    label,
  }: {
    to: string;
    icon: any;
    label: string;
  }) => (
    <NavLink
      to={to}
      className={`business-nav-item ${isActive(to) ? "active" : ""}`}
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
      <aside
        className={`business-sidebar ${collapsed ? "collapsed" : ""} ${mobileOpen ? "mobile-open" : ""}`}
      >
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
              <div
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  background:
                    "linear-gradient(135deg, #2563eb 0%, #f97316 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textAlign: "center",
                }}
              >
                A
              </div>
            ) : (
              <>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    background:
                      "linear-gradient(135deg, #2563eb 0%, #f97316 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Ascent
                </div>
                <span
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--business-text-secondary)",
                  }}
                >
                  Admin Panel
                </span>
              </>
            )}
          </div>

          {/* Main Dashboard */}
          <nav style={{ marginBottom: "1.5rem" }}>
            <NavItem to="/admin" icon={LayoutDashboard} label="Dashboard" />
          </nav>

          {/* Business Management Section */}
          <Collapsible defaultOpen={false} data-tour="business">
            <CollapsibleTrigger className="business-nav-group-label">
              {!collapsed && (
                <>
                  <Briefcase size={16} />
                  <span>Business</span>
                </>
              )}
            </CollapsibleTrigger>
            <CollapsibleContent>
              <nav className="business-nav-group">
                <NavItem
                  to="/admin/business"
                  icon={LayoutDashboard}
                  label="Overview"
                />
                <NavItem
                  to="/admin/business/clients"
                  icon={Users}
                  label="Clients"
                />
                <NavItem
                  to="/admin/business/projects"
                  icon={Briefcase}
                  label="Projects"
                />
                <NavItem
                  to="/admin/business/estimates"
                  icon={FileText}
                  label="Estimates"
                />
                <NavItem
                  to="/admin/business/invoices"
                  icon={Receipt}
                  label="Invoices"
                />
              </nav>
            </CollapsibleContent>
          </Collapsible>

          {/* Content Management Section */}
          <Collapsible
            open={contentOpen}
            onOpenChange={setContentOpen}
            data-tour="content"
          >
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
                <NavItem to="/admin/media" icon={Image} label="Media" />
                <NavItem
                  to="/admin/testimonials"
                  icon={MessageSquare}
                  label="Testimonials"
                />
                <NavItem to="/admin/stats" icon={BarChart} label="Stats" />
                <NavItem
                  to="/admin/awards"
                  icon={Award}
                  label="Awards & Certs"
                />
                <NavItem
                  to="/admin/leadership-team"
                  icon={Users}
                  label="Leadership Team"
                />
                <NavItem
                  to="/admin/documents-library"
                  icon={FileText}
                  label="Documents Library"
                />
              </nav>
            </CollapsibleContent>
          </Collapsible>

          {/* Inbox Section */}
          <Collapsible
            open={inboxOpen}
            onOpenChange={setInboxOpen}
            data-tour="inbox"
          >
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
                <NavItem
                  to="/admin/contacts"
                  icon={Mail}
                  label="Contact Forms"
                />
                <NavItem to="/admin/resumes" icon={FileCheck} label="Resumes" />
                <NavItem
                  to="/admin/prequalifications"
                  icon={Package}
                  label="Prequal"
                />
                <NavItem
                  to="/admin/rfp-submissions"
                  icon={FileText}
                  label="RFP Submissions"
                />
              </nav>
            </CollapsibleContent>
          </Collapsible>

          {/* Settings Section */}
          <Collapsible
            open={settingsOpen}
            onOpenChange={setSettingsOpen}
            data-tour="settings"
          >
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
                <div data-tour="hero-management">
                  <NavItem
                    to="/admin/hero-slides"
                    icon={Image}
                    label="Hero Slides"
                  />
                  <NavItem
                    to="/admin/hero-images"
                    icon={Image}
                    label="Hero Images"
                  />
                </div>
                <NavItem
                  to="/admin/homepage-settings"
                  icon={Settings}
                  label="Homepage"
                />
                <NavItem
                  to="/admin/landing-menu"
                  icon={Settings}
                  label="Landing Menu"
                />
                <NavItem
                  to="/admin/about-page"
                  icon={Settings}
                  label="About Page"
                />
                <NavItem
                  to="/admin/footer-settings"
                  icon={Settings}
                  label="Footer"
                />
                <NavItem
                  to="/admin/contact-page-settings"
                  icon={Settings}
                  label="Contact Page"
                />
                <NavItem
                  to="/admin/site-settings"
                  icon={Settings}
                  label="Site"
                />
                <NavItem to="/admin/users" icon={UserCircle} label="Users" />
                <NavItem
                  to="/admin/security-settings"
                  icon={Shield}
                  label="Security Settings"
                />
                <NavItem
                  to="/admin/performance-dashboard"
                  icon={Activity}
                  label="Performance"
                />
                <NavItem
                  to="/admin/settings-health"
                  icon={Activity}
                  label="Health Check"
                />
              </nav>
            </CollapsibleContent>
          </Collapsible>

          {/* Media Library Link */}
          <nav style={{ marginTop: "1.5rem" }} data-tour="media">
            <NavItem to="/admin/media" icon={Image} label="Media Library" />
          </nav>

          {onRestartOnboarding && !collapsed && (
            <button
              onClick={onRestartOnboarding}
              className="business-nav-item"
              style={{ marginTop: "auto", opacity: 0.7 }}
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
