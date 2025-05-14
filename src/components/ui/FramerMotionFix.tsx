'use client';

// This file provides a way to ensure framer-motion only runs on the client-side
// It injects a global script to fix useContext issues during static generation

import { useEffect } from 'react';

export default function FramerMotionFix() {
  useEffect(() => {
    // Fix Framer Motion React Context issues during SSR
    window.__FRAMER_MOTION_REACT_CONTEXT_FALLBACK__ = true;
    
    // Additional fixes for framer-motion
    window.__FRAMER_MOTION_SSR_FALLBACK__ = true;
    
    // Fix for React hooks errors  
    window.__NEXT_STRICT_MODE_WARNINGS__ = false;
  }, []);
  
  return null;
}
