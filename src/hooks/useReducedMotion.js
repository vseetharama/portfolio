import { useState, useEffect } from 'react';

/**
 * useReducedMotion Hook
 * Detects user's prefers-reduced-motion preference and provides real-time updates
 * Respects WCAG 2.1 AA accessibility standards
 */
export const useReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Initial detection
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    setIsReady(true);

    // Real-time listener for OS setting changes
    const handleChange = (e) => {
      setReducedMotion(e.matches);
    };

    // Modern browsers use addEventListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  return { reducedMotion, isReady };
};

export default useReducedMotion;
