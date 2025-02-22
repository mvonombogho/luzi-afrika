'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const menuItems = [
  { title: 'Home', href: '/' },
  { title: 'Services', href: '#services' },
  { title: 'About', href: '#about' },
  { title: 'Projects', href: '#projects' },
  { title: 'Contact', href: '#contact' }
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = menuItems.map(item => item.href.replace('#', ''));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      } else if (window.scrollY < 100) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    setIsOpen(false);
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
            onClick={(e) => scrollToSection(e, 'home')}
            className="text-xl font-light tracking-[-0.02em] hover:opacity-60 transition-opacity"
          >
            LUZI AFRIKA
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href.replace('#', ''))}
                className={`text-sm uppercase tracking-[0.2em] transition-all duration-300 relative group
                  ${activeSection === item.href.replace('#', '') ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
              >
                {item.title}
                <span className={`absolute -bottom-2 left-0 w-full h-px bg-black transform origin-left transition-transform duration-300
                  ${activeSection === item.href.replace('#', '') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} 
                />
              </Link>
            ))}
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2 bg-black text-white text-sm uppercase tracking-[0.2em] hover:bg-neutral-900 transition-colors"
            >
              Get Started
            </motion.button>
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
                <div className="flex justify-end mb-8">
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
                      onClick={(e) => scrollToSection(e, item.href.replace('#', ''))}
                      className={`text-sm uppercase tracking-[0.2em] transition-opacity flex items-center justify-between group
                        ${activeSection === item.href.replace('#', '') ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
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
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-3 bg-black text-white text-sm uppercase tracking-[0.2em] hover:bg-neutral-900 transition-colors"
                  >
                    Get Started
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}