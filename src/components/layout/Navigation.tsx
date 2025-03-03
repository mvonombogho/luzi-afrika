import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuVars = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.35,
        ease: "easeInOut"
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.35,
        ease: "easeInOut"
      }
    }
  }

  const menuItemVars = {
    initial: {
      opacity: 0,
      x: -20
    },
    animate: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        delay: 0.3 + (i * 0.1)
      }
    }),
    exit: {
      opacity: 0,
      x: -20
    }
  }

  return (
    <>
      <nav className={`fixed w-full z-50 py-6 px-8 flex justify-between items-center transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-sm' : 'bg-transparent'
      }`}>
        <Link href="/" className="text-2xl font-light tracking-tight">
          LUZI AFRIKA
        </Link>
        
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2 hover:opacity-70 transition-opacity"
        >
          <span className="text-sm uppercase tracking-widest">Menu</span>
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-black text-white z-50 flex flex-col"
          >
            <div className="py-6 px-8 flex justify-between items-center">
              <Link href="/" className="text-2xl font-light tracking-tight">
                LUZI AFRIKA
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center space-x-2 hover:opacity-70 transition-opacity"
              >
                <span className="text-sm uppercase tracking-widest">Close</span>
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <nav className="space-y-8">
                {[
                  { href: '/work', label: 'Our Work' },
                  { href: '/about', label: 'About' },
                  { href: '/people', label: 'People' },
                  { href: '/blog', label: 'Insights' },
                  { href: '/contact', label: 'Contact' },
                ].map((item, i) => (
                  <motion.div
                    key={item.href}
                    custom={i}
                    variants={menuItemVars}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <Link
                      href={item.href}
                      className="text-5xl md:text-7xl font-light hover:opacity-70 transition-opacity block"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation