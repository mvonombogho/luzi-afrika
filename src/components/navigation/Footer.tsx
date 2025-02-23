import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">LUZI AFRIKA</h3>
            <p className="text-gray-400">
              Illuminating Africa&apos;s Digital Future through innovative IT solutions.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services/hardware-support" className="text-gray-400 hover:text-white transition-colors">
                  Hardware Support
                </Link>
              </li>
              <li>
                <Link href="/services/software-solutions" className="text-gray-400 hover:text-white transition-colors">
                  Software Solutions
                </Link>
              </li>
              <li>
                <Link href="/services/it-procurement" className="text-gray-400 hover:text-white transition-colors">
                  IT Procurement
                </Link>
              </li>
              <li>
                <Link href="/services/technical-support" className="text-gray-400 hover:text-white transition-colors">
                  Technical Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-400 hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Get in Touch</h4>
            <p className="text-gray-400">Ready to transform your IT infrastructure?</p>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              Contact Us
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Luzi Afrika Limited. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors">
                Twitter
              </Link>
              <Link href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors">
                LinkedIn
              </Link>
              <Link href="https://instagram.com" className="text-gray-400 hover:text-white transition-colors">
                Instagram
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;