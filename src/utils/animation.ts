import gsap from 'gsap';

/**
 * Standard configurations for GSAP animations to ensure
 * consistency across components and prevent elements from
 * disappearing during animations.
 */

export const scrollAnimationConfig = {
  // Standard scroll trigger settings
  scrollTrigger: {
    startRatio: 0.8, // 'top 80%'
    endRatio: 0.4,   // 'top 40%'
    scrubAmount: 0.5
  },
  
  // Standard animation values
  animation: {
    yOffset: 30,      // Smaller Y offset to prevent elements from moving too far
    minOpacity: 0.2,  // Minimum opacity to ensure elements don't disappear completely
    staggerAmount: 0.2
  },
  
  // Standard easing
  ease: "power3.out"
};

/**
 * Create a standard fade-up animation with scroll trigger
 * @param element The element or elements to animate
 * @param trigger The trigger element for scroll animation
 * @param config Optional overrides for animation settings
 */
export function createFadeUpAnimation(
  element: gsap.TweenTarget,
  trigger: gsap.DOMTarget,
  config?: {
    start?: string;
    end?: string;
    scrub?: number | boolean;
    y?: number;
    opacity?: number;
    stagger?: number;
    ease?: string;
  }
) {
  return gsap.from(element, {
    scrollTrigger: {
      trigger,
      start: config?.start || `top ${scrollAnimationConfig.scrollTrigger.startRatio * 100}%`,
      end: config?.end || `top ${scrollAnimationConfig.scrollTrigger.endRatio * 100}%`,
      scrub: config?.scrub !== undefined ? config.scrub : scrollAnimationConfig.scrollTrigger.scrubAmount,
    },
    y: config?.y || scrollAnimationConfig.animation.yOffset,
    opacity: config?.opacity || scrollAnimationConfig.animation.minOpacity,
    stagger: config?.stagger || scrollAnimationConfig.animation.staggerAmount,
    ease: config?.ease || scrollAnimationConfig.ease
  });
}

/**
 * Create a standard non-scroll reveal animation
 */
export function createRevealAnimation(
  element: gsap.TweenTarget,
  config?: {
    y?: number;
    opacity?: number;
    stagger?: number;
    duration?: number;
    delay?: number;
    ease?: string;
  }
) {
  return gsap.from(element, {
    y: config?.y || scrollAnimationConfig.animation.yOffset,
    opacity: 0,
    stagger: config?.stagger || scrollAnimationConfig.animation.staggerAmount,
    duration: config?.duration || 0.8,
    delay: config?.delay || 0,
    ease: config?.ease || scrollAnimationConfig.ease
  });
}

/**
 * Framer Motion viewport settings that ensure animations trigger
 * early enough to prevent elements from suddenly appearing
 */
export const frameMotionViewportSettings = {
  once: true,
  margin: "-20%" // Triggers animation before element enters viewport
};

/**
 * Consistent animations for Framer Motion
 */
export const frameMotionAnimations = {
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 }
  },
  scaleUp: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 }
  }
};