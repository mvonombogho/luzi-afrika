'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';

// Safely import motion-related components
let motion;
let AnimatePresence;

// In the browser, we can import framer-motion
if (typeof window !== 'undefined') {
  const framerMotion = require('framer-motion');
  motion = framerMotion.motion;
  AnimatePresence = framerMotion.AnimatePresence;
}

// Menu items for navigation
const menuItems = [
  { title: 'Home', href: '/' },
  { title: 'Services', href: '/services' },
  { title: 'About', href: '/about' },
  { title: 'Blog', href: '/blog' },
  { title: 'Contact', href: '/contact' }
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  // Track when component is mounted
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if current route is active
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  // Determine if we're on a dark page background based on pathname
  const isDarkBackground = pathname.includes('/contact') || 
                          pathname.includes('/about') || 
                          pathname.includes('/blog') || 
                          pathname.includes('/services');

  // Simple versions of components for SSR
  const SimpleHeader = () => (
    <header
      className={`fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-300 ${
        isScrolled ? 'py-4 bg-white/90 backdrop-blur-sm shadow-sm' : 'py-6'
      }`}
    >
      <nav className="max-w-screen-xl mx-auto flex items-center justify-between">
        <Link 
          href="/"
          className="hover:opacity-80 transition-opacity"
        >
          <div className="relative h-10 w-10">
            <Image 
              src="/images/logo.svg" 
              alt="LUZI AFRIKA Logo" 
              width={40} 
              height={40}
              className="object-contain"
            />
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={`text-sm uppercase tracking-[0.2em] transition-all duration-300 relative group
                ${isActive(item.href) 
                  ? isScrolled || !isDarkBackground ? 'opacity-100 text-black' : 'opacity-100 text-white' 
                  : isScrolled || !isDarkBackground ? 'opacity-60 hover:opacity-100 text-black' : 'opacity-80 hover:opacity-100 text-white'}`}
            >
              {item.title}
              <span className={`absolute -bottom-2 left-0 w-full h-px transform origin-left transition-transform duration-300
                ${isActive(item.href) 
                  ? 'scale-x-100' 
                  : 'scale-x-0 group-hover:scale-x-100'}
                ${isScrolled || !isDarkBackground ? 'bg-black' : 'bg-white'}`} 
              />
            </Link>
          ))}
          
          <Link href="/contact">
            <button
              className={`px-6 py-2 text-sm uppercase tracking-[0.2em] transition-colors hover:scale-105
                ${isScrolled || !isDarkBackground 
                  ? 'bg-black text-white hover:bg-neutral-900' 
                  : 'bg-white text-black hover:bg-neutral-100'}`}
            >
              Get Started
            </button>
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className={`md:hidden p-2 hover:opacity-60 transition-opacity 
            ${isScrolled || !isDarkBackground ? 'text-black' : 'text-white'}`}
        >
          <Menu size={24} />
        </button>
      </nav>
    </header>
  );

  // Don't render mobile menu if not mounted (during SSR)
  const MobileMenu = () => {
    if (!isMounted || !isOpen) return null;
    
    return (
      <>
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 md:hidden"
          onClick={() => setIsOpen(false)}
        />

        <div
          className="fixed top-0 right-0 bottom-0 w-[300px] bg-white z-50 md:hidden"
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <div className="relative h-10 w-10">
                <Image 
                  src="/images/logo.svg" 
                  alt="LUZI AFRIKA Logo" 
                  width={40} 
                  height={40}
                  className="object-contain"
                />
              </div>
              
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:opacity-60 transition-opacity"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {menuItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm uppercase tracking-[0.2em] transition-opacity flex items-center justify-between group
                    ${isActive(item.href) ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                >
                  {item.title}
                  <ArrowUpRight 
                    size={16}
                    className="transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              ))}
            </div>

            <div className="mt-12 pt-12 border-t border-neutral-200">
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                <button
                  className="w-full px-6 py-3 bg-black text-white text-sm uppercase tracking-[0.2em] hover:bg-neutral-900 transition-colors"
                >
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };

  // For server rendering or non-mounted state, use simplified components
  if (!isMounted || typeof window === 'undefined' || !motion || !AnimatePresence) {
    return (
      <>
        <SimpleHeader />
        <MobileMenu />
      </>
    );
  }

  // For client-side with framer-motion available
  const MotionHeader = motion.header;
  const MotionDiv = motion.div;
  const MotionButton = motion.button;

  return (
    <>
      <MotionHeader
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 transition-all duration-300 ${
          isScrolled ? 'py-4 bg-white/90 backdrop-blur-sm shadow-sm' : 'py-6'
        }`}
      >
        <nav className="max-w-screen-xl mx-auto flex items-center justify-between">
          <Link 
            href="/"
            className="hover:opacity-80 transition-opacity"
          >
            <div className="relative h-10 w-10">
              <Image 
                src="/images/logo.svg" 
                alt="LUZI AFRIKA Logo" 
                width={40} 
                height={40}
                className="object-contain"
              />
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={`text-sm uppercase tracking-[0.2em] transition-all duration-300 relative group
                  ${isActive(item.href) 
                    ? isScrolled || !isDarkBackground ? 'opacity-100 text-black' : 'opacity-100 text-white' 
                    : isScrolled || !isDarkBackground ? 'opacity-60 hover:opacity-100 text-black' : 'opacity-80 hover:opacity-100 text-white'}`}
              >
                {item.title}
                <span className={`absolute -bottom-2 left-0 w-full h-px transform origin-left transition-transform duration-300
                  ${isActive(item.href) 
                    ? 'scale-x-100' 
                    : 'scale-x-0 group-hover:scale-x-100'}
                  ${isScrolled || !isDarkBackground ? 'bg-black' : 'bg-white'}`} 
                />
              </Link>
            ))}
            
            <Link href="/contact">
              <MotionButton
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-2 text-sm uppercase tracking-[0.2em] transition-colors
                  ${isScrolled || !isDarkBackground 
                    ? 'bg-black text-white hover:bg-neutral-900' 
                    : 'bg-white text-black hover:bg-neutral-100'}`}
              >
                Get Started
              </MotionButton>
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className={`md:hidden p-2 hover:opacity-60 transition-opacity 
              ${isScrolled || !isDarkBackground ? 'text-black' : 'text-white'}`}
          >
            <Menu size={24} />
          </button>
        </nav>
      </MotionHeader>

      {/* Use conditional rendering instead of AnimatePresence */}
      {isOpen && (
        <>
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 md:hidden"
            onClick={() => setIsOpen(false)}
          />

          <MotionDiv
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-[300px] bg-white z-50 md:hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <div className="relative h-10 w-10">
                  <Image 
                    src="/images/logo.svg" 
                    alt="LUZI AFRIKA Logo" 
                    width={40} 
                    height={40}
                    className="object-contain"
                  />
                </div>
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:opacity-60 transition-opacity"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-6">
                {menuItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-sm uppercase tracking-[0.2em] transition-opacity flex items-center justify-between group
                      ${isActive(item.href) ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
                  >
                    {item.title}
                    <ArrowUpRight 
                      size={16}
                      className="transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                ))}
              </div>

              <div className="mt-12 pt-12 border-t border-neutral-200">
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  <MotionButton
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3 bg-black text-white text-sm uppercase tracking-[0.2em] hover:bg-neutral-900 transition-colors"
                  >
                    Get Started
                  </MotionButton>
                </Link>
              </div>
            </div>
          </MotionDiv>
        </>
      )}
    </>
  );
}