'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const Tagline = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px 0px" });
  
  return (
    <section 
      ref={sectionRef}
      className="py-20 px-6 bg-neutral-100"
    >
      <div className="max-w-screen-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-between gap-10"
        >
          <h2 className="text-2xl md:text-3xl font-light leading-relaxed text-neutral-800 max-w-xl">
            Transforming businesses through innovative AI solutions and comprehensive IT services tailored for the African market.
          </h2>
          
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-black text-white text-sm uppercase tracking-[0.2em] whitespace-nowrap hover:bg-neutral-900 transition-colors"
            >
              Get Started
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Tagline;