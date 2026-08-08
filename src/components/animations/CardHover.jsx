import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * CardHover Component
 * Wrapper for subtle hover animations on cards, buttons, and interactive elements
 * 
 * Features:
 * - Scale animation (1.02x desktop, 1.01x mobile)
 * - Shadow enhancement on hover
 * - GPU-accelerated transforms
 * - Disabled when prefers-reduced-motion is active
 * 
 * Usage:
 * <CardHover>
 *   <div className="card">...</div>
 * </CardHover>
 */
const CardHover = memo(({ children, className = '' }) => {
  const { reducedMotion } = useReducedMotion();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scaleAmount = isMobile ? 1.01 : 1.02;

  const hoverVariants = {
    rest: {
      scale: 1,
      y: 0,
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    },
    hover: reducedMotion ? { scale: 1 } : {
      scale: scaleAmount,
      y: -2,
      boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      transition: {
        type: 'tween',
        ease: 'easeOut',
        duration: 0.2,
      },
    },
    tap: reducedMotion ? { scale: 1 } : {
      scale: 0.95,
      transition: {
        type: 'tween',
        duration: 0.1,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="rest"
      whileHover={reducedMotion ? 'rest' : 'hover'}
      whileTap={reducedMotion ? 'rest' : 'tap'}
      variants={hoverVariants}
      style={{
        willChange: 'transform, box-shadow',
        cursor: 'pointer',
      }}
    >
      {children}
    </motion.div>
  );
});

CardHover.displayName = 'CardHover';

export default CardHover;
