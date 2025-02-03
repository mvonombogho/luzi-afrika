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
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section 
      ref={ref} 
      className="relative min-h-screen w-full py-32 px-6"
    >
      <div className="max-w-screen-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h2 className="text-[clamp(2.5rem,6vw,4rem)] font-light leading-[1.1] tracking-[-0.02em]">
            Comprehensive IT Solutions<br />
            for Modern Businesses
          </h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 border-t border-neutral-200"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              className="group relative border-b border-neutral-200 md:even:border-l p-12 hover:bg-neutral-50/80 transition-colors duration-500"
            >
              <div className="flex flex-col h-full">
                <div className="mb-8">
                  <service.icon className="w-10 h-10" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-light tracking-[-0.01em] mb-4">
                  {service.title}
                </h3>
                <p className="text-neutral-600 font-light mb-12">
                  {service.description}
                </p>
                <div className="mt-auto flex items-center gap-2">
                  <span className="text-sm uppercase tracking-[0.2em]">Learn More</span>
                  <span className="w-6 h-px bg-black group-hover:w-12 transition-all duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-neutral-50/50 to-neutral-50/80" />
    </section>
  );
}