import { useRef, useMemo } from 'react';
import { useInView } from 'framer-motion';

/**
 * useScrollReveal Hook
 * Provides scroll-triggered entrance animations for page sections
 * 
 * Features:
 * - Detects when element enters viewport (threshold 10%)
 * - Returns Framer Motion ref and variants for animation
 * - One-time animation (does not reset on scroll back)
 * - Adapts timing based on device (500-600ms desktop, 300-400ms mobile)
 * - Disabled when prefers-reduced-motion is active
 */
export const useScrollReveal = ({ reducedMotion = false } = {}) => {
  const ref = useRef(null);
  const inView = useInView(ref, {
    threshold: 0.1,
    amount: 'some',
    once: true, // Only trigger animation once
  });

  // Get animation duration based on viewport width
  const getDuration = useMemo(() => {
    if (typeof window === 'undefined') return 600; // SSR safe default
    return window.innerWidth < 768 ? 350 : 550; // Mobile: 300-400ms, Desktop: 500-600ms
  }, []);

  // Animation variants
  const variants = useMemo(() => ({
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: getDuration / 1000, // Convert to seconds for Framer Motion
        ease: [0.4, 2.08, 0.55, 0.44], // cubic-bezier(0.4, 2.08, 0.55, 0.44) - ease-out
      },
    },
  }), [getDuration]);

  return {
    ref,
    inView,
    variants,
    initial: reducedMotion ? 'visible' : 'hidden',
    animate: reducedMotion ? 'visible' : (inView ? 'visible' : 'hidden'),
  };
};

export default useScrollReveal;
