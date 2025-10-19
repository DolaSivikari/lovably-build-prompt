/**
 * Generate a simple preview token for draft content
 * Token is not cryptographically secure - just a basic check
 */
export const generatePreviewToken = (): string => {
  return btoa(Date.now().toString()).substring(0, 16);
};

/**
 * Validate a preview token (basic validation)
 */
export const validatePreviewToken = (token: string | null): boolean => {
  return !!token && token.length > 0;
};
