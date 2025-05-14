'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  { number: "5+", label: "Projects Delivered" },
  { number: "95%", label: "Client Satisfaction" },
  { number: "24/7", label: "Support & Service" },
  { number: "100%", label: "Client Retention" }
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text animation - FIXED to prevent disappearing
      gsap.from(textRef.current?.children || [], {
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1
        },
        y: 30, // Reduced from 50
        opacity: 0.2, // Changed from 0 to keep text more visible when animation starts
        stagger: 0.2
      });

      // Stats animation - no changes needed as this isn't a scroll-dependent animation
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
      className="relative w-full py-32 px-6 bg-neutral-950 text-white overflow-hidden"
    >
      <div className="max-w-screen-xl mx-auto">
        <div ref={textRef} className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 mb-24">
          <div className="space-y-8">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }} // Added margin to trigger earlier
              className="text-3xl sm:text-4xl md:text-5xl font-light leading-tight"
            >
              Transforming businesses through innovative technology solutions in Africa
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }} // Added margin to trigger earlier
              transition={{ delay: 0.2 }}
              className="text-neutral-400"
            >
              Our mission is to empower African businesses with cutting-edge technology solutions that drive growth and innovation.
            </motion.p>
          </div>

          <div className="space-y-8">
            <p className="text-neutral-400">
              Founded in 2025, LUZI AFRIKA combines local expertise with global technology standards to deliver solutions that truly matter. We specialize in custom AI solutions, IT infrastructure, and digital transformation services tailored for the African market.
            </p>
            <motion.a
              href="/about"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] hover:text-neutral-400 transition-colors group"
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Learn More About Us
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.a>
          </div>
        </div>

        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.label}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 bg-neutral-900 rounded-sm"
            >
              <h3 className="text-3xl sm:text-4xl font-light mb-2">
                {achievement.number}
              </h3>
              <p className="text-sm text-neutral-400 uppercase tracking-[0.2em]">
                {achievement.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_100%_100%,rgba(45,45,45,1)_0%,rgba(0,0,0,0)_50%)]" />
    </section>
  );
};

export default About;