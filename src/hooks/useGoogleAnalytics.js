// src/components/GoogleAnalytics.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize Google Analytics
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-HETVWN60X2';
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', 'G-HETVWN60X2');

    // Track page views on route change
    const trackPageView = () => {
      gtag('config', 'G-HETVWN60X2', {
        page_path: location.pathname + location.search + location.hash,
      });
    };

    trackPageView(); // Track initial page view

    return () => {
      // Optional: Clean up any listeners if needed
    };
  }, [location]); // Re-run the effect when the location changes

  return null; // This component doesn't render anything
};

export default GoogleAnalytics;