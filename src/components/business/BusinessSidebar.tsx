import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  DollarSign,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface BusinessSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const BusinessSidebar = ({ collapsed, onToggle }: BusinessSidebarProps) => {
  const menuItems = [
    {
      path: '/admin/business/dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard',
      badge: null
    },
    {
      path: '/admin/business/clients',
      icon: Users,
      label: 'Clients',
      badge: null
    },
    {
      path: '/admin/business/projects',
      icon: Briefcase,
      label: 'Projects',
      badge: null
    },
    {
      path: '/admin/business/estimates',
      icon: FileText,
      label: 'Estimates',
      badge: null
    },
    {
      path: '/admin/business/invoices',
      icon: DollarSign,
      label: 'Invoices',
      badge: null
    }
  ];

  return (
    <aside className={`business-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="business-sidebar-content">
        {/* Logo */}
        <div className="business-logo">
          {!collapsed && (
            <div className="business-logo-content">
              <div className="business-logo-icon">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 2L28 9V23L16 30L4 23V9L16 2Z" fill="url(#logo-gradient)" />
                  <path d="M16 8L22 11.5V20.5L16 24L10 20.5V11.5L16 8Z" fill="white" fillOpacity="0.3" />
                  <defs>
                    <linearGradient id="logo-gradient" x1="4" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#2563eb" />
                      <stop offset="1" stopColor="#1d4ed8" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="business-logo-text">
                <div className="business-logo-title">ASCENT</div>
                <div className="business-logo-subtitle">Business Manager</div>
              </div>
            </div>
          )}
          {collapsed && (
            <div style={{ 
              width: '32px', 
              height: '32px', 
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: '700',
              fontSize: '1.25rem'
            }}>
              A
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="business-nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `business-nav-item ${isActive ? 'active' : ''}`
              }
              title={collapsed ? item.label : ''}
            >
              <item.icon size={20} className="business-nav-icon" />
              {!collapsed && (
                <>
                  <span className="business-nav-label">{item.label}</span>
                  {item.badge && (
                    <span className="business-nav-badge">{item.badge}</span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Toggle Button */}
      <button className="business-sidebar-toggle" onClick={onToggle}>
        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
    </aside>
  );
};
