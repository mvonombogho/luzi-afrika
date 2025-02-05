// src/components/sections/home/Hero.tsx
'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on scroll
      gsap.to(headingRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        },
        y: 100,
        opacity: 0.5
      });

      // Fade out text on scroll
      gsap.to(textRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'center top',
          scrub: true
        },
        y: 50,
        opacity: 0
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="relative min-h-screen flex items-center px-6 overflow-hidden"
    >
      <div className="w-full max-w-screen-xl mx-auto pt-[15vh]">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-[90%]"
        >
          <h1 
            ref={headingRef}
            className="text-[clamp(3rem,10vw,8rem)] font-light leading-[0.9] tracking-[-0.02em] mb-16"
          >
            Illuminating Africa's<br />
            Digital Future<br />
            Through Technology
          </h1>

          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <p 
              ref={textRef}
              className="text-xl md:text-2xl text-neutral-600 max-w-xl font-light"
            >
              Kenya's leading IT solutions provider, specializing in comprehensive support and innovative consultancy services.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-black text-white text-sm uppercase tracking-[0.2em] hover:bg-neutral-900 transition-colors"
            >
              Start a Project
            </motion.button>
          </div>
        </motion.div>
      </div>

      <motion.div 
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

      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(247,247,247,1)_0%,rgba(255,255,255,1)_100%)]" />
        <div 
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px'
          }}
        />
      </div>
    </section>
  );
}