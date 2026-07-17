import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsapUtils';

let lenis = null;

// Initialize Lenis smooth scrolling on the window, synced with GSAP's ticker
// so ScrollTrigger and Lenis share a single animation clock.
export const initSmoothScroll = () => {
  if (lenis) return lenis;

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.5,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenis;
};

export const getLenis = () => lenis;

// Eased scroll to a section (used by nav links / CTAs)
export const scrollToSection = (target, options = {}) => {
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.4, ...options });
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: 'smooth' });
  }
};

export const destroySmoothScroll = () => {
  if (!lenis) return;
  lenis.destroy();
  lenis = null;
};
