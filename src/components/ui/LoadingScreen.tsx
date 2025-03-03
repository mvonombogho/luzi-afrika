'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoading(false);
      }
    });

    tl.to('.progress-bar', {
      width: '100%',
      duration: 1.5,
      ease: 'power2.inOut'
    });

    return () => tl.kill();
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ height: '100vh' }}
          exit={{ height: 0 }}
          transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
          className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-3xl font-light mb-8 tracking-[-0.02em]">LUZI AFRIKA</h1>
            <div className="w-48 h-[2px] bg-neutral-100 overflow-hidden">
              <div className="progress-bar w-0 h-full bg-black" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}