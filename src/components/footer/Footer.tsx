'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const navigation = {
  main: [
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
  social: [
    { name: 'LinkedIn', href: '#' },
    { name: 'Twitter', href: '#' },
    { name: 'Instagram', href: '#' },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-white overflow-hidden">
      <div className="mx-auto max-w-screen-xl">
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-8 px-6 py-12 md:py-24 lg:grid-cols-4">
          {/* Brand section */}
          <div className="lg:col-span-2 space-y-8">
            <Link 
              href="/"
              className="inline-block text-2xl font-light tracking-[-0.02em]"
            >
              LUZI AFRIKA
            </Link>
            <p className="text-neutral-600 max-w-md">
              Transforming businesses through innovative technology solutions and comprehensive IT services tailored for the African market.
            </p>
            <motion.a
              href="/contact"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] hover:text-neutral-500 transition-colors group"
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Start a Project
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.a>
          </div>

          {/* Navigation */}
          <div className="space-y-8">
            <p className="text-sm uppercase tracking-[0.2em]">Quick Links</p>
            <ul className="space-y-4">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-neutral-600 hover:text-black transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Secondary navigation */}
          <div className="space-y-8">
            <p className="text-sm uppercase tracking-[0.2em]">Company</p>
            <ul className="space-y-4">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-neutral-600 hover:text-black transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-neutral-200">
          <div className="px-6 py-8 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              {navigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm text-neutral-600 hover:text-black transition-colors flex items-center gap-1 group"
                >
                  {item.name}
                  <ArrowUpRight 
                    className="w-3 h-3 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" 
                  />
                </a>
              ))}
            </div>
            <p className="mt-4 text-sm text-neutral-600 md:mt-0 md:order-1">
              &copy; {currentYear} Luzi Afrika Limited. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_0%_0%,rgba(247,247,247,1)_0%,rgba(255,255,255,0)_50%)]" />
    </footer>
  );
}