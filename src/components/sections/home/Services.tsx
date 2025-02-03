'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Monitor, Shield, ShoppingBag, Headphones } from 'lucide-react';

const services = [
  {
    icon: Monitor,
    title: "Hardware Support",
    description: "Comprehensive IT infrastructure maintenance ensuring peak performance.",
  },
  {
    icon: Shield,
    title: "Software Solutions",
    description: "End-to-end software management and security implementations.",
  },
  {
    icon: ShoppingBag,
    title: "IT Procurement",
    description: "Strategic technology sourcing with competitive advantage.",
  },
  {
    icon: Headphones,
    title: "Technical Support",
    description: "Round-the-clock expert assistance for seamless operations.",
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section ref={ref} className="py-32 px-6 bg-white">
      <div className="max-w-screen-xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-[clamp(2.5rem,6vw,4rem)] font-extralight leading-[1.1] tracking-[-0.02em] max-w-4xl mb-24"
        >
          Comprehensive IT Solutions for Modern Businesses
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-neutral-200">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group border-b border-r border-neutral-200 p-12 hover:bg-neutral-50 transition-colors duration-300"
            >
              <div className="flex flex-col h-full">
                <service.icon className="w-10 h-10 mb-8" />
                <h3 className="text-xl font-light mb-4">{service.title}</h3>
                <p className="text-neutral-600 mb-8">{service.description}</p>
                <div className="mt-auto flex items-center gap-2 text-sm uppercase tracking-widest">
                  <span>Learn More</span>
                  <span className="w-6 h-px bg-black group-hover:w-12 transition-all duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}