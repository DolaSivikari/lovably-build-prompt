// Google Analytics & GTM Helper Functions

interface GTMEvent {
  event: string;
  [key: string]: any;
}

// Push events to GTM dataLayer
export const pushToDataLayer = (event: GTMEvent) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push(event);
  }
};

// Page view tracking
export const trackPageView = (url: string, title: string) => {
  pushToDataLayer({
    event: "pageview",
    page_path: url,
    page_title: title,
  });
};

// Conversion tracking
export const trackConversion = (
  eventName: string,
  data?: Record<string, any>,
) => {
  pushToDataLayer({
    event: eventName,
    ...data,
  });
};

// Form submission tracking
export const trackFormSubmit = (
  formName: string,
  formData?: Record<string, any>,
) => {
  pushToDataLayer({
    event: "form_submit",
    form_name: formName,
    ...formData,
  });
};

// CTA click tracking
export const trackCTAClick = (ctaName: string, ctaLocation: string) => {
  pushToDataLayer({
    event: "cta_click",
    cta_name: ctaName,
    cta_location: ctaLocation,
  });
};

// Phone click tracking
export const trackPhoneClick = () => {
  pushToDataLayer({
    event: "phone_click",
    conversion_label: "phone_call",
  });
};

// File download tracking
export const trackFileDownload = (fileName: string, fileType: string) => {
  pushToDataLayer({
    event: "file_download",
    file_name: fileName,
    file_type: fileType,
  });
};

// Outbound link tracking
export const trackOutboundLink = (url: string, linkText: string) => {
  pushToDataLayer({
    event: "outbound_click",
    outbound_url: url,
    link_text: linkText,
  });
};

// Scroll depth tracking
export const trackScrollDepth = (depth: number) => {
  pushToDataLayer({
    event: "scroll_depth",
    scroll_percentage: depth,
  });
};

// TypeScript declaration for window.dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}
