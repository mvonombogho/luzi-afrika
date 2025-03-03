'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const links = {
  company: [
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ],
  services: [
    { name: 'Custom AI Agents', href: '/services/ai-agents' },
    { name: 'AI-Powered SaaS', href: '/services/ai-saas' },
    { name: 'Hardware Support', href: '/services/hardware' },
    { name: 'Software Solutions', href: '/services/software' },
    { name: 'IT Procurement', href: '/services/procurement' },
    { name: 'Technical Support', href: '/services/support' },
  ],
  social: [
    { name: 'LinkedIn', href: '#' },
    { name: 'Twitter', href: '#' },
    { name: 'Instagram', href: '#' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ]
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full px-6 pt-24 pb-12 bg-neutral-950 text-white overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 mb-24">
          {/* Left Column */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-[clamp(2rem,5vw,3rem)] font-light leading-[1.1] tracking-[-0.02em]">
                Let's Build Something<br />
                Extraordinary Together
              </h2>
              <p className="text-neutral-400 max-w-lg">
                Ready to transform your business with innovative technology solutions? Get in touch with us today.
              </p>
            </div>

            <motion.a
              href="mailto:info@luziafrika.com"
              className="inline-flex items-center gap-2 text-2xl hover:text-neutral-400 transition-colors group"
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              info@luziafrika.com
              <ArrowUpRight className="w-6 h-6 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.a>
          </div>

          {/* Right Column */}
          <div className="grid grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] mb-4">Company</p>
                <ul className="space-y-3">
                  {links.company.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href}
                        className="text-neutral-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.2em] mb-4">Legal</p>
                <ul className="space-y-3">
                  {links.legal.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href}
                        className="text-neutral-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] mb-4">Services</p>
                <ul className="space-y-3">
                  {links.services.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href}
                        className="text-neutral-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-12 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-neutral-400">
              <p>© {currentYear} Luzi Afrika Limited</p>
              <p>All rights reserved</p>
            </div>

            <div className="flex gap-6">
              {links.social.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-2 group"
                  whileHover={{ y: -2 }}
                >
                  {link.name}
                  <ArrowUpRight 
                    className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_0%_0%,rgba(45,45,45,1)_0%,rgba(0,0,0,0)_50%)]" />
    </footer>
  );
}