'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsComplete(true), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 15);

    return () => clearInterval(interval);
  }, []);

  if (isComplete) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white"
      animate={isComplete ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
    >
      <div className="w-full max-w-lg space-y-6 p-4">
        <div className="flex justify-between items-baseline">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl font-light tracking-[-0.02em]"
          >
            LUZI AFRIKA
          </motion.span>
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm font-light"
          >
            {progress}%
          </motion.span>
        </div>
        
        <div className="relative h-[1px] w-full overflow-hidden bg-neutral-800">
          <motion.div
            className="absolute inset-y-0 left-0 bg-white"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeInOut" }}
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: progress > 80 ? 1 : 0 }}
          className="text-sm text-neutral-500"
        >
          Illuminating Africa's Digital Future
        </motion.div>
      </div>
    </motion.div>
  );
}