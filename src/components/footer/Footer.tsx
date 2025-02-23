'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-neutral-950 text-white py-24 px-6">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-light mb-8">LUZI AFRIKA</h3>
            <p className="text-neutral-400 max-w-sm">
              Illuminating Africa's Digital Future Through Technology
            </p>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] mb-6">Quick Links</h4>
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
                  className="block text-neutral-400 hover:text-white transition-colors group flex items-center gap-2"
                >
                  <span>{link.name}</span>
                  <span className="w-4 h-px bg-neutral-400 group-hover:w-8 group-hover:bg-white transition-all duration-300" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] mb-6">Contact</h4>
            <div className="space-y-4 text-neutral-400">
              <a 
                href="mailto:info@luziafrika.com" 
                className="block hover:text-white transition-colors"
              >
                info@luziafrika.com
              </a>
              <a 
                href="tel:+254700000000" 
                className="block hover:text-white transition-colors"
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

        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-neutral-800"
        >
          <div className="text-neutral-400 text-sm">
            © {currentYear} Luzi Afrika Limited. All rights reserved.
          </div>

          <div className="flex gap-6 md:justify-end">
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
                className="text-sm text-neutral-400 hover:text-white transition-colors flex items-center gap-1 group"
              >
                {social.name}
                <ArrowUpRight 
                  size={14} 
                  className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
      
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_100%_100%,rgba(45,45,45,1)_0%,rgba(0,0,0,0)_50%)]" />
    </footer>
  );
}