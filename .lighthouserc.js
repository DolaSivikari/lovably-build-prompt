module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run build && npm run preview',
      url: ['http://localhost:4173/'],
      numberOfRuns: 3,
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        // Performance - Stricter thresholds for optimization
        'first-contentful-paint': ['error', { maxNumericValue: 1800 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2200 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.08 }],
        'total-blocking-time': ['warn', { maxNumericValue: 250 }],
        'speed-index': ['warn', { maxNumericValue: 2800 }],
        'interactive': ['warn', { maxNumericValue: 3500 }],
        
        // Accessibility - WCAG 2.1 AA Compliance
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'color-contrast': 'error',
        'aria-allowed-attr': 'error',
        'aria-required-attr': 'error',
        'aria-valid-attr': 'error',
        'aria-valid-attr-value': 'error',
        'button-name': 'error',
        'link-name': 'error',
        'image-alt': 'error',
        'label': 'error',
        'document-title': 'error',
        'html-has-lang': 'error',
        'meta-viewport': 'error',
        'tap-targets': 'warn', // Touch target size
        
        // SEO
        'categories:seo': ['warn', { minScore: 0.9 }],
        'meta-description': 'error',
        'canonical': 'warn',
        
        // Best Practices
        'categories:best-practices': ['error', { minScore: 0.92 }],
        'errors-in-console': 'error',
        'no-vulnerable-libraries': 'error',
        'uses-http2': 'warn',
        'uses-optimized-images': 'warn',
        'modern-image-formats': 'warn',
        'uses-text-compression': 'error',
        'uses-responsive-images': 'warn',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
