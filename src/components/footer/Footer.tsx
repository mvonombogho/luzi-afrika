'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' }
];

const services = [
  { label: 'AI Solutions', href: '/services/ai' },
  { label: 'IT Support', href: '/services/it-support' },
  { label: 'Cloud Services', href: '/services/cloud' },
  { label: 'Digital Transformation', href: '/services/digital' }
];

const contactInfo = {
  email: 'info@luziafrika.com',
  phone: '+254 700 000 000',
  address: 'Nairobi, Kenya'
};

const socialLinks = [
  { name: 'LinkedIn', url: '#' },
  { name: 'Twitter', url: '#' },
  { name: 'Instagram', url: '#' }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white py-24 px-6 overflow-hidden">
      <div className="max-w-screen-xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[clamp(2rem,5vw,3rem)] font-light leading-[1.1] tracking-[-0.02em]"
            >
              Let's create something<br />
              extraordinary together
            </motion.h2>
          </div>
          <div className="flex items-end justify-start md:justify-end">
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] hover:text-neutral-500 transition-colors group"
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Start a Project
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.a>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-12 border-t border-neutral-200">
          <div>
            <Link href="/" className="inline-block mb-8">
              <h3 className="text-xl font-light tracking-[-0.02em]">LUZI AFRIKA</h3>
            </Link>
            <p className="text-neutral-600 text-sm max-w-xs">
              Transforming businesses through innovative technology solutions in Africa.
            </p>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] mb-6">Navigation</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-neutral-600 hover:text-black transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] mb-6">Services</h4>
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className="text-neutral-600 hover:text-black transition-colors"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm uppercase tracking-[0.2em] mb-6">Contact</h4>
            <div className="space-y-4 text-neutral-600">
              <p>{contactInfo.address}</p>
              <p>
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="hover:text-black transition-colors"
                >
                  {contactInfo.email}
                </a>
              </p>
              <p>
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className="hover:text-black transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pt-12 mt-12 border-t border-neutral-200">
          <p className="text-sm text-neutral-600">
            © {currentYear} Luzi Afrika Limited. All rights reserved.
          </p>
          <div className="flex gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-neutral-600 hover:text-black transition-colors flex items-center gap-2 group"
              >
                {social.name}
                <ArrowUpRight 
                  size={14}
                  className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}