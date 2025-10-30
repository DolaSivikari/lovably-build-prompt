import { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UnifiedSidebar } from './UnifiedSidebar';
import { BusinessHeader } from '@/components/business/BusinessHeader';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { supabase } from '@/integrations/supabase/client';
import '@/styles/admin-theme.css';

export const UnifiedAdminLayout = () => {
  const { isLoading, isAdmin } = useAdminAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  // Apply body-level dark theme variables for portal-based components (Radix portals)
  useEffect(() => {
    document.body.classList.add('admin-dark-portal');
    return () => {
      document.body.classList.remove('admin-dark-portal');
    };
  }, []);

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#020617',
        color: '#f1f5f9'
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="business-admin-container admin-dark-theme">
      <UnifiedSidebar
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />
      <div className={`business-main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <BusinessHeader 
          user={user} 
          onMenuClick={() => setMobileMenuOpen(true)}
        />
        <div className="business-page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
