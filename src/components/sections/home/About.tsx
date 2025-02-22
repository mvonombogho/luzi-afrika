'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: "100+", label: "Happy Clients" },
  { number: "95%", label: "Client Retention" },
  { number: "24/7", label: "Support Available" },
  { number: "10+", label: "Partner Network" }
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1
        },
        x: -100,
        opacity: 0
      });

      // Text animation
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: 1
        },
        y: 50,
        opacity: 0
      });

      // Stats animation
      gsap.from(statsRef.current?.children || [], {
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="relative w-full py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-neutral-50/50"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-24">
          <div className="space-y-6 sm:space-y-8">
            <h2 
              ref={headingRef}
              className="text-[clamp(2rem,5vw,4rem)] font-light leading-[1.1] tracking-[-0.02em]"
            >
              Empowering African<br className="hidden sm:block" />
              Businesses Through<br className="hidden sm:block" />
              Technology
            </h2>

            <p 
              ref={textRef}
              className="text-base sm:text-lg md:text-xl text-neutral-600 font-light"
            >
              Founded in 2025, LUZI AFRIKA has been at the forefront of digital transformation 
              in Kenya. We specialize in delivering reliable, cost-effective technology solutions 
              that help businesses optimize their operations and maintain peak performance of 
              their IT infrastructure.
            </p>
          </div>

          <div 
            ref={statsRef}
            className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 mt-8 md:mt-0"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="p-4 sm:p-6 md:p-8 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-light mb-2 md:mb-3">
                  {stat.number}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 uppercase tracking-[0.2em]">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_100%_100%,rgba(247,247,247,1)_0%,rgba(255,255,255,0)_50%)]" />
    </section>
  );
}