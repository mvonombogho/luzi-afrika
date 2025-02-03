'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 to-white" />
      </motion.div>

      <div className="relative z-10 px-6 pt-[20vh]">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-screen-xl mx-auto"
        >
          <h1 className="text-[clamp(3rem,10vw,8rem)] font-extralight leading-[0.9] tracking-[-0.02em] mb-16">
            Illuminating Africa's<br />
            Digital Future<br />
            Through Technology
          </h1>

          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <p className="text-xl md:text-2xl text-neutral-600 max-w-xl">
              Kenya's leading IT solutions provider, specializing in comprehensive support and innovative consultancy services.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-black text-white text-sm uppercase tracking-widest hover:bg-neutral-900 transition-colors"
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
        className="absolute bottom-8 left-6 z-10"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-px bg-neutral-400" />
          <span className="text-sm text-neutral-400 uppercase tracking-widest">Scroll</span>
        </div>
      </motion.div>
    </div>
  );
}