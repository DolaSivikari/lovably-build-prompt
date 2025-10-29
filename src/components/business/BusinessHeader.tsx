import { useState } from 'react';
import { Search, Bell, LogOut, Menu } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface BusinessHeaderProps {
  user: any;
  onMenuClick?: () => void;
}

export const BusinessHeader = ({ user, onMenuClick }: BusinessHeaderProps) => {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <header className="business-header">
      <div className="business-header-content">
        {/* Mobile Hamburger Menu */}
        <button 
          className="business-hamburger-btn"
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>

        {/* Search */}
        <div className="business-header-search">
          <Search size={18} className="business-search-icon" />
          <input
            type="text"
            placeholder="Search clients, projects, invoices..."
            className="business-search-input"
          />
          <kbd className="business-search-kbd">⌘K</kbd>
        </div>

        {/* Actions */}
        <div className="business-header-actions">
          {/* Notifications */}
          <button className="business-action-button">
            <Bell size={20} />
            <span className="business-notification-badge">3</span>
          </button>

          {/* User Menu */}
          <div style={{ position: 'relative' }}>
            <button 
              className="business-user-button"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="business-user-avatar">
                {user?.email?.charAt(0).toUpperCase() || 'A'}
              </div>
              <span className="business-user-name">
                {user?.email?.split('@')[0] || 'Admin'}
              </span>
            </button>

            {showUserMenu && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '0.5rem',
                background: 'var(--business-bg-card)',
                border: '1px solid var(--business-border)',
                borderRadius: '8px',
                minWidth: '200px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                zIndex: 1000
              }}>
                <div style={{ padding: '1rem', borderBottom: '1px solid var(--business-border)' }}>
                  <div style={{ color: 'var(--business-text-primary)', fontWeight: '600' }}>
                    {user?.email || 'admin@ascent.com'}
                  </div>
                  <div style={{ color: 'var(--business-text-muted)', fontSize: '0.75rem' }}>
                    Administrator
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--business-accent-red)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.875rem'
                  }}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
