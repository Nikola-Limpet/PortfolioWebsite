import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Helper to create parallax effect on elements
export const createParallax = (element, speed = 0.5, options = {}) => {
  return gsap.to(element, {
    y: () => window.innerHeight * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: options.trigger || element,
      start: options.start || 'top bottom',
      end: options.end || 'bottom top',
      scrub: options.scrub ?? 1,
      ...options.scrollTriggerOptions,
    },
  });
};

// Helper to create scroll-triggered animations
export const createScrollAnimation = (element, animation, options = {}) => {
  return gsap.to(element, {
    ...animation,
    scrollTrigger: {
      trigger: options.trigger || element,
      start: options.start || 'top 80%',
      end: options.end || 'bottom 20%',
      toggleActions: options.toggleActions || 'play none none reverse',
      ...options.scrollTriggerOptions,
    },
  });
};

// Helper for staggered reveal animations
export const createStaggerReveal = (elements, options = {}) => {
  return gsap.from(elements, {
    y: options.y ?? 60,
    opacity: 0,
    stagger: options.stagger ?? 0.1,
    duration: options.duration ?? 0.8,
    ease: options.ease || 'power2.out',
    scrollTrigger: {
      trigger: options.trigger || elements,
      start: options.start || 'top 80%',
      toggleActions: options.toggleActions || 'play none none reverse',
    },
  });
};

export { gsap, ScrollTrigger };
