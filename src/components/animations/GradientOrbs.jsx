import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * GradientOrbs Component
 * Floating blurred gradient orbs that create depth and sophistication
 * Inspired by premium SaaS backgrounds (Vercel, Linear, Stripe)
 * 
 * Features:
 * - 3 orbs with unique animation cycles (20-30s desktop, 25-37.5s tablet)
 * - Transform-only animations (GPU accelerated, no layout impact)
 * - Theme-aware colors with smooth transitions
 * - Disabled when prefers-reduced-motion is active
 * - Responsive sizing and opacity
 */
const GradientOrbs = memo(({ reducedMotion = false, theme = 'dark' }) => {
  // Orb configurations with unique durations and delays
  const orbConfigs = useMemo(() => {
    // Check if on tablet for adjusted timing
    const isTablet = typeof window !== 'undefined' && window.innerWidth < 1024 && window.innerWidth >= 768;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    let baseDuration = 25;
    let maxDuration = 30;
    
    if (isTablet || isMobile) {
      // 25% longer duration on smaller screens
      baseDuration = 25;
      maxDuration = 37.5;
    }

    return [
      {
        id: 'orb-1',
        duration: baseDuration,
        delay: 0,
        startX: -20,
        startY: -30,
        colors: {
          light: 'rgba(59, 130, 246, 0.08)', // Desaturated blue
          dark: 'hsl(217, 91%, 60%)',
        },
      },
      {
        id: 'orb-2',
        duration: baseDuration + 3,
        delay: 2,
        startX: 40,
        startY: 50,
        colors: {
          light: 'rgba(6, 182, 212, 0.06)', // Desaturated cyan
          dark: 'hsl(180, 100%, 50%)',
        },
      },
      {
        id: 'orb-3',
        duration: maxDuration,
        delay: 4,
        startX: 80,
        startY: 90,
        colors: {
          light: 'rgba(59, 130, 246, 0.07)', // Desaturated blue
          dark: 'hsl(217, 91%, 60%)',
        },
      },
    ];
  }, []);

  // Animation variants for floating motion
  const getAnimationVariants = (config) => ({
    animate: {
      y: [0, -60, 0],
      x: [0, 40, 0],
      transition: {
        duration: config.duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: config.delay,
      },
    },
    initial: {
      y: 0,
      x: 0,
      opacity: reducedMotion ? 1 : undefined,
    },
  });

  return (
    <>
      <style>{`
        .gradient-orbs-container {
          position: fixed;
          inset: 0;
          z-index: -20;
          pointer-events: none;
          overflow: hidden;
        }

        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          will-change: transform;
          pointer-events: none;
          mix-blend-mode: screen;
        }

        /* Desktop sizing */
        @media (min-width: 1024px) {
          .gradient-orb {
            width: 350px;
            height: 350px;
          }
        }

        /* Tablet sizing (20% reduction) */
        @media (max-width: 1023px) and (min-width: 768px) {
          .gradient-orb {
            width: 280px;
            height: 280px;
          }
        }

        /* Mobile sizing (20% reduction + higher opacity) */
        @media (max-width: 767px) {
          .gradient-orb {
            width: 280px;
            height: 280px;
            opacity: 0.15 !important;
          }
        }

        /* Respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .gradient-orb {
            animation: none !important;
          }
        }
      `}</style>

      <div className="gradient-orbs-container" aria-hidden="true">
        {orbConfigs.map((config) => (
          <motion.div
            key={config.id}
            className="gradient-orb"
            variants={getAnimationVariants(config)}
            initial="initial"
            animate={reducedMotion ? 'initial' : 'animate'}
            style={{
              left: `${config.startX}%`,
              top: `${config.startY}%`,
              background: `radial-gradient(circle, ${
                theme === 'light' ? config.colors.light : config.colors.dark
              }, transparent)`,
              opacity: theme === 'light' ? 0.08 : 0.12,
              transition: 'background 300ms ease-in-out, opacity 300ms ease-in-out',
            }}
          />
        ))}
      </div>
    </>
  );
});

GradientOrbs.displayName = 'GradientOrbs';

export default GradientOrbs;
