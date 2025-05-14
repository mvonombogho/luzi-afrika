'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import PageHeader from '@/components/ui/PageHeader';
import ContactForm from '@/components/forms/ContactForm';

export default function ContactPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate info sections
      if (infoRef.current) {
        const infoItems = infoRef.current.querySelectorAll('.info-item');
        gsap.from(infoItems, {
          y: 30,
          opacity: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power2.out'
        });
      }
      
      // Animate map
      if (mapRef.current) {
        gsap.from(mapRef.current, {
          y: 50,
          opacity: 0,
          duration: 1,
          delay: 0.5,
          ease: 'power3.out'
        });
      }
    });
    
    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen">
      <PageHeader 
        title="Contact Us"
        subtitle="Get in touch with our team to discuss your IT support needs"
      />
      
      <section className="py-20 px-6 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-light mb-8">Send us a message</h2>
              <ContactForm />
            </div>
            
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-light mb-8">Get in touch</h2>
              
              <div ref={infoRef} className="space-y-12 mb-12">
                <div className="info-item">
                  <h3 className="text-sm uppercase tracking-[0.2em] mb-4">Contact</h3>
                  <div className="space-y-4">
                    <a 
                      href="mailto:info@luziafrika.com"
                      className="flex items-center gap-3 text-neutral-600 hover:text-black transition-colors group"
                    >
                      <Mail size={18} className="opacity-60 group-hover:opacity-100" />
                      <span>info@luziafrika.com</span>
                    </a>
                    <a 
                      href="tel:+254701868849"
                      className="flex items-center gap-3 text-neutral-600 hover:text-black transition-colors group"
                    >
                      <Phone size={18} className="opacity-60 group-hover:opacity-100" />
                      <span>+254 701 868 849</span>
                    </a>
                  </div>
                </div>
                
                <div className="info-item">
                  <h3 className="text-sm uppercase tracking-[0.2em] mb-4">Office Location</h3>
                  <div className="flex items-start gap-3 text-neutral-600">
                    <MapPin size={18} className="opacity-60 mt-1" />
                    <address className="not-italic">
                      Luzi Afrika Limited<br />
                      Kiserian, Sankale Road<br />
                      Kajiado, Kenya
                    </address>
                  </div>
                </div>
                
                <div className="info-item">
                  <h3 className="text-sm uppercase tracking-[0.2em] mb-4">Business Hours</h3>
                  <div className="space-y-2 text-neutral-600">
                    <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p>Saturday: 9:00 AM - 1:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
                
                <div className="info-item">
                  <h3 className="text-sm uppercase tracking-[0.2em] mb-4">Follow Us</h3>
                  <div className="flex flex-wrap gap-6">
                    {[
                      { name: 'LinkedIn', url: '#' },
                      { name: 'Twitter', url: '#' },
                      { name: 'Instagram', url: '#' }
                    ].map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-600 hover:text-black transition-colors flex items-center gap-2 group"
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
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 px-6 bg-neutral-50">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-3xl font-light mb-8 text-center">Find Us</h2>
          <div 
            ref={mapRef}
            className="h-[400px] rounded-lg overflow-hidden"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15952.334536149787!2d36.6205896!3d-1.4369095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f05ca9c27d7c5%3A0x5f7bfe0aabda8d90!2sKiserian%2C%20Kajiado%20County%2C%20Kenya!5e0!3m2!1sen!2s!4v1715669096740!5m2!1sen!2s"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Luzi Afrika Limited Office Location"
              className="rounded-lg"
            />
          </div>
        </div>
      </section>
    </main>
  );
}