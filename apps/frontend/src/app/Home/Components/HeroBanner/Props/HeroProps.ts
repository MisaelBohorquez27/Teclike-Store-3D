"use client";
import { easeInOut, useReducedMotion } from "framer-motion";

// Animation configurations

export const getAnimationProps = (prefersReducedMotion: boolean | null) => {
  const transition = { duration: 0.8, ease: [easeInOut] };

  return {
    text: {
      initial: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: transition,
    },
    fade: (delay: number = 0) => ({
      initial: prefersReducedMotion ? { opacity: 1 } : { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.6, delay, ease: [easeInOut] },
    }),
    image: {
      initial: prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.8, delay: 0.2, ease: [easeInOut] },
    },
  };
};
