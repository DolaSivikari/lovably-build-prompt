import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals';

// Send Web Vitals metrics to Google Analytics
const sendToAnalytics = (metric: any) => {
  // Check if gtag is available
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Log to console in development
  if (import.meta.env.DEV) {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
    });
  }
};

export const reportWebVitals = () => {
  // Core Web Vitals
  onCLS(sendToAnalytics);  // Cumulative Layout Shift
  onINP(sendToAnalytics);  // Interaction to Next Paint
  onLCP(sendToAnalytics);  // Largest Contentful Paint
  
  // Additional metrics
  onFCP(sendToAnalytics);  // First Contentful Paint
  onTTFB(sendToAnalytics); // Time to First Byte
};
