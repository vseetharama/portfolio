import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * ScrollReveal Component
 * Wrapper that applies fade-in and slide-up animation when element enters viewport
 * 
 * Usage:
 * <ScrollReveal>
 *   <About />
 * </ScrollReveal>
 */
const ScrollReveal = memo(({ children, delay = 0 }) => {
  const { reducedMotion } = useReducedMotion();
  const { ref, inView, variants, initial, animate } = useScrollReveal({ reducedMotion });

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      variants={{
        hidden: {
          opacity: 0,
          y: 20,
        },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: reducedMotion ? 0 : (typeof window !== 'undefined' && window.innerWidth < 768 ? 0.35 : 0.55),
            ease: [0.4, 2.08, 0.55, 0.44],
            delay: delay * 0.05, // Stagger delay if provided
          },
        },
      }}
      style={{
        width: '100%',
      }}
    >
      {children}
    </motion.div>
  );
});

ScrollReveal.displayName = 'ScrollReveal';

export default ScrollReveal;
