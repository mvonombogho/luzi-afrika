'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

const PageHeader = ({ 
  title, 
  subtitle, 
  backgroundImage 
}: PageHeaderProps) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  
  useEffect(() => {
    const tl = gsap.timeline();
    
    if (titleRef.current) {
      tl.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    }
    
    if (subtitleRef.current) {
      tl.from(subtitleRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.4');
    }
    
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div 
      ref={headerRef}
      className={`w-full relative flex items-center min-h-[40vh] py-24 px-6 bg-neutral-900 ${backgroundImage ? 'bg-cover bg-center' : ''}`}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
    >
      {/* Overlay for background images */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-black opacity-50" />
      )}
      
      <div className="max-w-screen-xl mx-auto w-full relative z-10">
        <motion.h1 
          ref={titleRef}
          className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-[-0.02em] mb-4"
        >
          {title}
        </motion.h1>
        
        {subtitle && (
          <motion.p
            ref={subtitleRef}
            className="text-lg md:text-xl text-neutral-300 max-w-2xl"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;