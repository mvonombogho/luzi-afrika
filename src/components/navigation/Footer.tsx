'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-100 text-neutral-800 relative z-20">
      <div className="max-w-screen-xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <h2 className="text-xl tracking-wider font-light">LUZI AFRIKA</h2>
            </div>
            <p className="text-neutral-600 mb-8 leading-relaxed">
              Illuminating Africa's Digital Future through reliable, cost-effective technology solutions that help businesses optimize their operations.
            </p>
            <div className="flex space-x-5">
              <motion.a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="text-neutral-600 hover:text-black transition-colors"
              >
                <Facebook size={18} />
              </motion.a>
              <motion.a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="text-neutral-600 hover:text-black transition-colors"
              >
                <Twitter size={18} />
              </motion.a>
              <motion.a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="text-neutral-600 hover:text-black transition-colors"
              >
                <Instagram size={18} />
              </motion.a>
              <motion.a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="text-neutral-600 hover:text-black transition-colors"
              >
                <Linkedin size={18} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm uppercase tracking-widest mb-8 font-medium">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { title: 'Home', href: '/' },
                { title: 'Services', href: '/services' },
                { title: 'About Us', href: '/about' },
                { title: 'Blog', href: '/blog' },
                { title: 'Contact', href: '/contact' },
                { title: 'Privacy Policy', href: '/privacy-policy' }
              ].map((link) => (
                <li key={link.title}>
                  <Link 
                    href={link.href}
                    className="text-neutral-600 hover:text-black transition-colors inline-block hover-link"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm uppercase tracking-widest mb-8 font-medium">Our Services</h3>
            <ul className="space-y-4">
              {[
                { title: 'Hardware Support', href: '/services/hardware-support' },
                { title: 'Software Solutions', href: '/services/software-solutions' },
                { title: 'IT Procurement', href: '/services/it-procurement' },
                { title: 'Technical Support', href: '/services/technical-support' },
                { title: 'AI Solutions', href: '/services/custom-ai-agents' }
              ].map((link) => (
                <li key={link.title}>
                  <Link 
                    href={link.href}
                    className="text-neutral-600 hover:text-black transition-colors inline-block hover-link"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm uppercase tracking-widest mb-8 font-medium">Contact Us</h3>
            <ul className="space-y-6">
              <li className="flex items-start">
                <MapPin className="text-neutral-600 mr-3 mt-1 flex-shrink-0" size={16} />
                <span className="text-neutral-600 leading-relaxed">
                  123 Business Park,<br />
                  Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="text-neutral-600 mr-3 flex-shrink-0" size={16} />
                <span className="text-neutral-600">+254 700 000 000</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-neutral-600 mr-3 flex-shrink-0" size={16} />
                <a 
                  href="mailto:info@luziafrika.com" 
                  className="text-neutral-600 hover:text-black transition-colors inline-block hover-link"
                >
                  info@luziafrika.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-200 mt-16 pt-10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Luzi Afrika Limited. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <Link 
              href="/terms" 
              className="text-neutral-500 text-sm hover:text-black transition-colors"
            >
              Terms of Service
            </Link>
            <Link 
              href="/privacy" 
              className="text-neutral-500 text-sm hover:text-black transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/cookies" 
              className="text-neutral-500 text-sm hover:text-black transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;