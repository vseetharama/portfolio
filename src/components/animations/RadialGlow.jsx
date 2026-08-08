import React, { useState, useEffect, useCallback, memo, useMemo, useRef } from 'react';

/**
 * RadialGlow Component
 * Mouse-following soft glow effect inspired by Linear and Stripe
 * 
 * Features:
 * - Real-time cursor position tracking (60 FPS target)
 * - GPU-accelerated transform (translate3d)
 * - Smooth fade-out when cursor leaves viewport
 * - Disabled on touch devices (<768px) for performance
 * - Disabled when prefers-reduced-motion is active
 * - Theme-aware colors (desaturated in light mode)
 */
const RadialGlow = memo(({ reducedMotion = false, theme = 'dark' }) => {
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const rafId = useRef(null);
  const containerRef = useRef(null);

  // Glow colors based on theme
  const glowColors = useMemo(() => {
    if (theme === 'light') {
      return {
        primary: 'rgba(217, 91%, 60%, 0.1)', // Desaturated blue
        secondary: 'rgba(180, 85%, 50%, 0.08)', // Desaturated cyan
      };
    }
    // Dark theme
    return {
      primary: 'hsl(217, 91%, 60%)', // Bright blue
      secondary: 'hsl(180, 100%, 50%)', // Bright cyan
    };
  }, [theme]);

  // Check if device is mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mouse move handler with requestAnimationFrame throttling
  const handleMouseMove = useCallback((e) => {
    if (reducedMotion || isMobile) return;

    setIsVisible(true);

    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
      const { clientX, clientY } = e;
      setGlowPosition({ x: clientX, y: clientY });
      rafId.current = null;
    });
  }, [reducedMotion, isMobile]);

  // Mouse leave handler
  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleMouseMove, handleMouseLeave]);

  // Don't render if reduced motion or mobile
  if (reducedMotion || isMobile) {
    return null;
  }

  return (
    <>
      <style>{`
        .radial-glow-container {
          position: fixed;
          inset: 0;
          z-index: -20;
          pointer-events: none;
          will-change: opacity;
          transition: opacity 200ms ease-out;
          opacity: ${isVisible ? 1 : 0};
        }

        .radial-glow {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.15;
          pointer-events: none;
          will-change: transform;
          transform-origin: center;
        }

        .radial-glow-primary {
          background: radial-gradient(circle, hsl(217, 91%, 60%), transparent);
        }

        .radial-glow-secondary {
          background: radial-gradient(circle, hsl(180, 100%, 50%), transparent);
        }

        @media (prefers-reduced-motion: reduce) {
          .radial-glow-container {
            display: none !important;
          }
        }

        @media (max-width: 767px) {
          .radial-glow-container {
            display: none !important;
          }
        }
      `}</style>

      <div 
        ref={containerRef}
        className="radial-glow-container"
        aria-hidden="true"
      >
        {/* Primary glow (blue) */}
        <div
          className="radial-glow radial-glow-primary"
          style={{
            transform: `translate3d(${glowPosition.x - 150}px, ${glowPosition.y - 150}px, 0)`,
          }}
        />

        {/* Secondary glow (cyan) offset slightly */}
        <div
          className="radial-glow radial-glow-secondary"
          style={{
            transform: `translate3d(${glowPosition.x - 100}px, ${glowPosition.y - 100}px, 0)`,
          }}
        />
      </div>
    </>
  );
});

RadialGlow.displayName = 'RadialGlow';

export default RadialGlow;
