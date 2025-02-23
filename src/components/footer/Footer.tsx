'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' }
];

const services = [
  { name: 'Custom AI Agents', href: '/services/ai-agents' },
  { name: 'AI-Powered SaaS', href: '/services/ai-saas' },
  { name: 'Hardware Support', href: '/services/hardware' },
  { name: 'Software Solutions', href: '/services/software' },
  { name: 'IT Procurement', href: '/services/procurement' },
  { name: 'Technical Support', href: '/services/support' }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-neutral-950 text-white overflow-hidden">
      {/* Main Footer */}
      <div className="w-full border-t border-neutral-800">
        <div className="max-w-screen-xl mx-auto py-24 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
            {/* Company Info */}
            <div className="space-y-8">
              <Link href="/" className="inline-block">
                <h3 className="text-2xl font-light tracking-[-0.02em]">
                  LUZI AFRIKA
                </h3>
              </Link>
              <p className="text-neutral-400 max-w-sm">
                Empowering African businesses with innovative technology solutions that drive growth and success.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm uppercase tracking-[0.2em] mb-6">Quick Links</h4>
              <div className="space-y-4">
                {quickLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-neutral-400 hover:text-white transition-colors group flex items-center gap-2"
                  >
                    <span>{link.name}</span>
                    <span className="w-4 h-px bg-neutral-400 group-hover:w-8 group-hover:bg-white transition-all duration-300" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-sm uppercase tracking-[0.2em] mb-6">Services</h4>
              <div className="space-y-4">
                {services.map((service) => (
                  <Link
                    key={service.name}
                    href={service.href}
                    className="block text-neutral-400 hover:text-white transition-colors group flex items-center gap-2"
                  >
                    <span>{service.name}</span>
                    <span className="w-4 h-px bg-neutral-400 group-hover:w-8 group-hover:bg-white transition-all duration-300" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm uppercase tracking-[0.2em] mb-6">Contact</h4>
              <div className="space-y-4">
                <a 
                  href="mailto:info@luziafrika.com"
                  className="block text-neutral-400 hover:text-white transition-colors"
                >
                  info@luziafrika.com
                </a>
                <a 
                  href="tel:+254700000000"
                  className="block text-neutral-400 hover:text-white transition-colors"
                >
                  +254 700 000 000
                </a>
                <address className="text-neutral-400 not-italic">
                  Luzi Afrika Limited<br />
                  Nairobi, Kenya
                </address>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full border-t border-neutral-800">
        <div className="max-w-screen-xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-neutral-400 text-sm">
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
                  className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-1 group"
                  whileHover={{ x: 5 }}
                >
                  {social.name}
                  <ArrowUpRight 
                    className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_100%_100%,rgba(45,45,45,1)_0%,rgba(0,0,0,0)_50%)]" />
    </footer>
  );
}