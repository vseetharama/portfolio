import React, { memo, useMemo } from 'react';

/**
 * AnimatedGrid Component
 * Lightweight CSS-based background grid pattern
 * Creates visual depth without JavaScript overhead
 * 
 * Features:
 * - Pure CSS gradients (zero animation JS)
 * - Responsive grid sizing (40px desktop, 30px tablet, 20px mobile)
 * - Theme-aware colors with smooth transitions
 * - Fixed positioning behind all content
 * - GPU accelerated rendering
 */
const AnimatedGrid = memo(({ theme = 'dark' }) => {
  // Grid styles for both themes with theme-specific opacity
  const gridStyles = useMemo(() => {
    const baseStyles = {
      position: 'fixed',
      inset: 0,
      zIndex: -50,
      pointerEvents: 'none',
      willChange: 'background-color',
      transition: 'background-color 300ms ease-in-out',
      backgroundAttachment: 'fixed',
    };

    if (theme === 'light') {
      return {
        ...baseStyles,
        backgroundColor: 'hsl(210, 40%, 98%)',
        backgroundImage: `
          /* Subtle radial glows for depth */
          radial-gradient(ellipse at 10% 10%, hsla(210, 100%, 94%, 0.3), transparent 50%),
          radial-gradient(ellipse at 90% 90%, hsla(240, 100%, 94%, 0.2), transparent 50%),
          /* Main grid pattern with very low opacity */
          linear-gradient(hsl(210, 40%, 93%) 1px, transparent 1px),
          linear-gradient(to right, hsl(210, 40%, 93%) 1px, hsl(210, 40%, 98%) 1px)
        `,
      };
    }

    // Dark theme (default)
    return {
      ...baseStyles,
      backgroundColor: 'hsl(222, 47%, 11%)',
      backgroundImage: `
        /* Subtle radial glows for depth */
        radial-gradient(ellipse at 10% 10%, hsla(212, 96%, 15%, 0.5), transparent 50%),
        radial-gradient(ellipse at 90% 90%, hsla(260, 90%, 20%, 0.3), transparent 50%),
        /* Main grid pattern with very low opacity */
        linear-gradient(hsla(222, 47%, 13%, 0.08) 1px, transparent 1px),
        linear-gradient(to right, hsla(222, 47%, 13%, 0.08) 1px, hsl(222, 47%, 11%) 1px)
      `,
    };
  }, [theme]);

  // Responsive grid sizing
  const containerStyle = useMemo(() => ({
    ...gridStyles,
    backgroundSize: 'auto, auto, 40px 40px, 40px 40px', // Desktop default
  }), [gridStyles]);

  return (
    <>
      <style>{`
        /* Desktop grid (1024px+) */
        @media (min-width: 1024px) {
          .animated-grid {
            background-size: auto, auto, 40px 40px, 40px 40px !important;
          }
        }

        /* Tablet grid (768px - 1023px) */
        @media (max-width: 1023px) and (min-width: 768px) {
          .animated-grid {
            background-size: auto, auto, 30px 30px, 30px 30px !important;
          }
        }

        /* Mobile grid (<768px) */
        @media (max-width: 767px) {
          .animated-grid {
            background-size: auto, auto, 20px 20px, 20px 20px !important;
          }
        }

        /* Respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .animated-grid {
            transition: none !important;
          }
        }
      `}</style>
      
      <div 
        className="animated-grid" 
        style={containerStyle}
        aria-hidden="true"
      />
    </>
  );
});

AnimatedGrid.displayName = 'AnimatedGrid';

export default AnimatedGrid;
