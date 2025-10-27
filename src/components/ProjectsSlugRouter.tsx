import { useParams, Navigate } from "react-router-dom";
import CaseStudy from "@/pages/CaseStudy";

/**
 * Defensive router for /projects/:slug URLs
 * - If slug contains invalid characters (=, &, ?), redirect to /projects with query params
 * - Otherwise, render the CaseStudy page
 */
const ProjectsSlugRouter = () => {
  const { slug } = useParams<{ slug: string }>();

  // Check if slug contains invalid characters or looks like a query string
  const isInvalidSlug = slug && !/^[a-z0-9-]+$/.test(slug);

  if (isInvalidSlug) {
    // Log for analytics
    if (import.meta.env.DEV) {
      console.warn(`Invalid project slug detected: ${slug}. Redirecting to filters.`);
    }

    // Redirect to projects page with the slug as query params
    return <Navigate to={`/projects?${slug}`} replace />;
  }

  // Valid slug - render the case study page
  return <CaseStudy />;
};

export default ProjectsSlugRouter;
