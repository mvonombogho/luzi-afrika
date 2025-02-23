'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const navigationLinks = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Projects', href: '/projects' },
      { label: 'Contact', href: '/contact' }
    ]
  },
  {
    title: 'Solutions',
    links: [
      { label: 'AI Agents', href: '/services/ai-agents' },
      { label: 'IT Infrastructure', href: '/services/it-infrastructure' },
      { label: 'Software Development', href: '/services/software-development' },
      { label: 'Technical Support', href: '/services/technical-support' }
    ]
  },
  {
    title: 'Connect',
    links: [
      { label: 'LinkedIn', href: '#', external: true },
      { label: 'Twitter', href: '#', external: true },
      { label: 'Instagram', href: '#', external: true }
    ]
  }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-neutral-950 text-white">
      <div className="w-full max-w-screen-xl mx-auto px-6">
        {/* Main footer content */}
        <div className="py-24 border-b border-neutral-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <div className="space-y-8">
              <Link href="/" className="inline-block">
                <h3 className="text-2xl font-light tracking-[-0.02em]">LUZI AFRIKA</h3>
              </Link>
              <div className="space-y-6 text-neutral-400">
                <p className="max-w-md">
                  Transforming businesses through innovative technology solutions tailored for the African market.
                </p>
                <div>
                  <p>info@luziafrika.com</p>
                  <p>+254 700 000 000</p>
                </div>
                <address className="not-italic">
                  Luzi Afrika Limited<br />
                  Nairobi, Kenya
                </address>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
              {navigationLinks.map((group) => (
                <div key={group.title} className="space-y-6">
                  <p className="text-sm uppercase tracking-[0.2em]">{group.title}</p>
                  <ul className="space-y-4">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        {link.external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1 group"
                          >
                            {link.label}
                            <ArrowUpRight 
                              size={14}
                              className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                            />
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="text-neutral-400 hover:text-white transition-colors"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright and back to top */}
        <div className="py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-neutral-400">
            © {currentYear} Luzi Afrika Limited. All rights reserved.
          </p>
          
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ y: -2 }}
            className="text-sm uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors flex items-center gap-2"
          >
            Back to Top
            <ArrowUpRight size={14} />
          </motion.button>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_0%_0%,rgba(45,45,45,1)_0%,rgba(0,0,0,0)_50%)]" />
    </footer>
  );
}