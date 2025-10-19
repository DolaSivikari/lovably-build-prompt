/**
 * Route mapping helpers for consistent admin and public navigation
 * Prevents 404s by providing canonical route resolution
 */

export const ADMIN_ROUTES = {
  dashboard: '/admin',
  services: '/admin/services',
  projects: '/admin/projects',
  blog: '/admin/blog',
  caseStudies: '/admin/case-studies',
  media: '/admin/media',
  users: '/admin/users',
  securityCenter: '/admin/security-center',
  seoDashboard: '/admin/seo-dashboard',
  performanceDashboard: '/admin/performance-dashboard',
  contacts: '/admin/contacts',
  resumes: '/admin/resumes',
  hero: '/admin/hero',
  siteSettings: '/admin/site-settings',
  testimonials: '/admin/testimonials',
  stats: '/admin/stats',
} as const;

/**
 * Get admin edit route for a content type and ID
 */
export const getAdminEditRoute = (type: string, id: string): string => {
  const routes: Record<string, string> = {
    service: `/admin/services/${id}`,
    project: `/admin/projects/${id}`,
    blog: `/admin/blog/${id}`,
    'case-study': `/admin/case-studies/${id}`,
  };
  return routes[type] || `/admin/${type}/${id}`;
};

/**
 * Get public route for a content type and slug
 */
export const getPublicRoute = (type: string, slug: string): string => {
  const routes: Record<string, string> = {
    service: `/services/${slug}`,
    project: `/projects/${slug}`,
    blog: `/blog/${slug}`,
    'case-study': `/case-study/${slug}`,
    home: '/',
  };
  return routes[type] || `/${slug}`;
};

/**
 * Validate if a route exists (basic check)
 */
export const isValidAdminRoute = (path: string): boolean => {
  return Object.values(ADMIN_ROUTES).some(route => path.startsWith(route));
};
