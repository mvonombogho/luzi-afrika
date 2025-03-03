'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animations
      gsap.from(headingRef.current?.children || [], {
        duration: 1.2,
        y: 100,
        opacity: 0,
        stagger: 0.2,
        ease: "power4.out"
      });

      gsap.from(textRef.current, {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: "power3.out",
        delay: 0.8
      });

      gsap.from(buttonRef.current, {
        duration: 0.6,
        y: 20,
        opacity: 0,
        ease: "power3.out",
        delay: 1
      });

      gsap.from(scrollIndicatorRef.current, {
        duration: 0.6,
        y: 20,
        opacity: 0,
        ease: "power3.out",
        delay: 1.2
      });

      // Scroll animations
      gsap.to(headingRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        },
        y: 50,
        opacity: 0.8
      });

      gsap.to(textRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        },
        y: 30,
        opacity: 0.9
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen flex items-center px-6 overflow-hidden"
      id="home"
    >
      <div className="gradient-bg" />
      <div className="bg-noise" />

      <div className="w-full max-w-screen-xl mx-auto pt-[15vh]">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-[90%]"
        >
          <h1 
            ref={headingRef}
            className="text-[clamp(2.5rem,8vw,7rem)] font-light leading-[0.9] tracking-[-0.02em] mb-12"
          >
            <span className="block">Transforming</span>
            <span className="block">businesses through</span>
            <span className="block">innovative AI</span>
            <span className="block">solutions and</span>
            <span className="block">comprehensive IT</span>
            <span className="block">services tailored for</span>
            <span className="block">the African market.</span>
          </h1>

          <div 
            ref={buttonRef}
            className="inline-block mt-8"
          >
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-black text-white text-sm uppercase tracking-[0.2em] hover:bg-neutral-900 transition-colors"
              >
                Get Started
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div 
        ref={scrollIndicatorRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 left-6"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-px bg-neutral-400" />
          <span className="text-sm text-neutral-400 uppercase tracking-[0.2em]">Scroll</span>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;