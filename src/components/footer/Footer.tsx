'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white text-black py-24 px-6">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2 space-y-8">
            <Link href="/" className="inline-block">
              <h3 className="text-2xl font-light tracking-[-0.02em]">LUZI AFRIKA</h3>
            </Link>
            <p className="text-neutral-600 max-w-sm">
              Transforming businesses through innovative technology solutions and comprehensive IT services tailored for the African market.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm uppercase tracking-[0.2em]">Quick Links</h4>
            <div className="space-y-4">
              {[
                { name: 'Home', href: '/' },
                { name: 'Services', href: '#services' },
                { name: 'About', href: '#about' },
                { name: 'Projects', href: '#projects' },
                { name: 'Contact', href: '#contact' }
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-neutral-600 hover:text-black transition-colors group flex items-center gap-2"
                >
                  <span>{link.name}</span>
                  <span className="w-4 h-px bg-black/50 group-hover:w-8 group-hover:bg-black transition-all duration-300" />
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm uppercase tracking-[0.2em]">Contact</h4>
            <div className="space-y-4 text-neutral-600">
              <a 
                href="mailto:info@luziafrika.com" 
                className="block hover:text-black transition-colors"
              >
                info@luziafrika.com
              </a>
              <a 
                href="tel:+254700000000" 
                className="block hover:text-black transition-colors"
              >
                +254 700 000 000
              </a>
              <address className="not-italic">
                Luzi Afrika Limited<br />
                Nairobi, Kenya
              </address>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-200">
          <div className="flex flex-col sm:flex-row justify-between gap-6">
            <div className="text-neutral-600 text-sm">
              © {currentYear} Luzi Afrika Limited. All rights reserved.
            </div>

            <div className="flex gap-6">
              {[
                { name: 'LinkedIn', url: '#' },
                { name: 'Twitter', url: '#' },
                { name: 'Instagram', url: '#' }
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="text-sm text-neutral-600 hover:text-black transition-colors flex items-center gap-1 group"
                >
                  {social.name}
                  <ArrowUpRight 
                    size={14} 
                    className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}