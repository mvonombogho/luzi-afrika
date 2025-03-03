'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';

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
  const pathname = usePathname();

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

  return (
    <>
      <motion.header
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
                  ${isActive(item.href) ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
              >
                {item.title}
                <span className={`absolute -bottom-2 left-0 w-full h-px bg-black transform origin-left transition-transform duration-300
                  ${isActive(item.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} 
                />
              </Link>
            ))}
            
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2 bg-black text-white text-sm uppercase tracking-[0.2em] hover:bg-neutral-900 transition-colors"
              >
                Get Started
              </motion.button>
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2 hover:opacity-60 transition-opacity"
          >
            <Menu size={24} />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
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
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 py-3 bg-black text-white text-sm uppercase tracking-[0.2em] hover:bg-neutral-900 transition-colors"
                    >
                      Get Started
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}