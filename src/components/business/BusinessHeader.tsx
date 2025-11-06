import { useState, useRef, useEffect } from 'react';
import { Search, LogOut, Menu } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { NotificationBell } from '@/components/admin/NotificationBell';
import { useBusinessSearch } from '@/hooks/useBusinessSearch';

interface BusinessHeaderProps {
  user: any;
  onMenuClick?: () => void;
}

export const BusinessHeader = ({ user, onMenuClick }: BusinessHeaderProps) => {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { results } = useBusinessSearch(searchQuery);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        <div ref={searchRef} style={{ position: 'relative', flex: 1, maxWidth: '600px' }}>
          <div className="business-header-search">
            <Search size={18} className="business-search-icon" />
            <input
              type="text"
              placeholder="Search clients, projects, invoices..."
              className="business-search-input"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => searchQuery && setShowSearchResults(true)}
            />
            <kbd className="business-search-kbd">⌘K</kbd>
          </div>

          {/* Search Results Dropdown */}
          {showSearchResults && searchQuery && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 0.5rem)',
              left: 0,
              right: 0,
              background: 'var(--business-bg-card)',
              border: '1px solid var(--business-border)',
              borderRadius: '8px',
              maxHeight: '400px',
              overflowY: 'auto',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
              zIndex: 1000
            }}>
              {results.length === 0 ? (
                <div style={{ padding: '1rem', color: 'var(--business-text-muted)', textAlign: 'center' }}>
                  No results found
                </div>
              ) : (
                <div>
                  {['client', 'project', 'estimate', 'invoice'].map((type) => {
                    const typeResults = results.filter((r) => r.type === type);
                    if (typeResults.length === 0) return null;

                    return (
                      <div key={type}>
                        <div style={{
                          padding: '0.5rem 1rem',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          color: 'var(--business-text-muted)',
                          textTransform: 'uppercase',
                          borderBottom: '1px solid var(--business-border)'
                        }}>
                          {type}s
                        </div>
                        {typeResults.map((result) => (
                          <button
                            key={result.id}
                            onClick={() => {
                              navigate(result.link);
                              setSearchQuery('');
                              setShowSearchResults(false);
                            }}
                            style={{
                              width: '100%',
                              padding: '0.75rem 1rem',
                              background: 'transparent',
                              border: 'none',
                              textAlign: 'left',
                              cursor: 'pointer',
                              borderBottom: '1px solid var(--business-border)',
                              transition: 'background 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--business-bg-hover)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                          >
                            <div style={{ color: 'var(--business-text-primary)', fontWeight: '500', marginBottom: '0.25rem' }}>
                              {result.title}
                            </div>
                            {result.subtitle && (
                              <div style={{ color: 'var(--business-text-muted)', fontSize: '0.875rem' }}>
                                {result.subtitle}
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="business-header-actions">
          {/* Notifications */}
          <NotificationBell />

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
