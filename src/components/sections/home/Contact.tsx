'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-content > *", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    try {
      setIsSubmitting(true);
      // Add form submission logic here
      setSubmitStatus('success');
      formRef.current.reset();
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full py-32 px-6 bg-white overflow-hidden"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          <div className="contact-content space-y-12">
            <div className="space-y-6">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[clamp(2.5rem,6vw,4rem)] font-light leading-[1.1] tracking-[-0.02em]"
              >
                Let's Work<br />Together
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-neutral-600 text-lg max-w-lg"
              >
                Ready to transform your business with innovative technology solutions? Get in touch with us today.
              </motion.p>
            </div>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <p className="text-sm uppercase tracking-[0.2em]">Contact</p>
                <div className="space-y-4">
                  <a 
                    href="mailto:info@luziafrika.com"
                    className="flex items-center gap-3 text-neutral-600 hover:text-black transition-colors group"
                  >
                    <Mail size={16} className="opacity-60 group-hover:opacity-100" />
                    <span>info@luziafrika.com</span>
                  </a>
                  <a 
                    href="tel:+254700000000"
                    className="flex items-center gap-3 text-neutral-600 hover:text-black transition-colors group"
                  >
                    <Phone size={16} className="opacity-60 group-hover:opacity-100" />
                    <span>+254 700 000 000</span>
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <p className="text-sm uppercase tracking-[0.2em]">Office</p>
                <div className="flex items-start gap-3 text-neutral-600">
                  <MapPin size={16} className="opacity-60 mt-1" />
                  <address className="not-italic">
                    Luzi Afrika Limited<br />
                    Nairobi, Kenya
                  </address>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <p className="text-sm uppercase tracking-[0.2em]">Social</p>
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
              </motion.div>
            </div>
          </div>

          <div className="contact-content">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label htmlFor="name" className="text-sm uppercase tracking-[0.2em] mb-2 block">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  disabled={isSubmitting}
                  className="w-full bg-transparent border-b border-neutral-200 py-2 focus:outline-none focus:border-black transition-colors disabled:opacity-50 text-base sm:text-lg"
                />
              </div>

              <div>
                <label htmlFor="email" className="text-sm uppercase tracking-[0.2em] mb-2 block">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  disabled={isSubmitting}
                  className="w-full bg-transparent border-b border-neutral-200 py-2 focus:outline-none focus:border-black transition-colors disabled:opacity-50 text-base sm:text-lg"
                />
              </div>

              <div>
                <label htmlFor="company" className="text-sm uppercase tracking-[0.2em] mb-2 block">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  id="company"
                  disabled={isSubmitting}
                  className="w-full bg-transparent border-b border-neutral-200 py-2 focus:outline-none focus:border-black transition-colors disabled:opacity-50 text-base sm:text-lg"
                />
              </div>

              <div>
                <label htmlFor="message" className="text-sm uppercase tracking-[0.2em] mb-2 block">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  disabled={isSubmitting}
                  rows={4}
                  className="w-full bg-transparent border-b border-neutral-200 py-2 focus:outline-none focus:border-black transition-colors resize-none disabled:opacity-50 text-base sm:text-lg"
                />
              </div>

              {submitStatus === 'success' && (
                <div className="px-4 py-3 bg-green-50 text-green-600 text-sm rounded-sm">
                  Message sent successfully!
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="px-4 py-3 bg-red-50 text-red-600 text-sm rounded-sm">
                  Failed to send message. Please try again.
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-4 bg-black text-white text-sm uppercase tracking-[0.2em] hover:bg-neutral-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_100%_0%,rgba(247,247,247,1)_0%,rgba(255,255,255,0)_50%)]" />
    </section>
  );
}