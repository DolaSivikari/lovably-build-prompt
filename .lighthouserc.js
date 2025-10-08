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
        // Performance
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],
        'speed-index': ['warn', { maxNumericValue: 3000 }],
        
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
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'errors-in-console': 'error',
        'no-vulnerable-libraries': 'warn',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
