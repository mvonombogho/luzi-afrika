'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';

export default function Hero() {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col justify-center relative"
    >
      <Container>
        <div className="max-w-[90%] mx-auto pt-20">
          <motion.h1 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.9] tracking-[-0.02em] mb-8 font-medium"
          >
            Illuminating Africa's<br />
            Digital Future Through<br />
            Technology
          </motion.h1>
          
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col gap-6 md:flex-row md:items-center"
          >
            <p className="text-xl max-w-xl text-neutral-600">
              Kenya's leading IT solutions provider, specializing in comprehensive support and innovative consultancy services.
            </p>
            
            <button className="px-8 py-4 bg-black text-white hover:bg-neutral-900 transition-all text-sm uppercase tracking-wider">
              Start a Project
            </button>
          </motion.div>
        </div>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-12 left-6"
      >
        <div className="flex items-center gap-2 text-sm text-neutral-500">
          <span className="w-12 h-px bg-neutral-300"></span>
          <span className="uppercase tracking-wider">Scroll</span>
        </div>
      </motion.div>
    </motion.section>
  );
}