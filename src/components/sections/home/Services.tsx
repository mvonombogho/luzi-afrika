// components/sections/home/Services.tsx
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Monitor, Shield, ShoppingBag, Headphones } from 'lucide-react';
import Container from '@/components/ui/Container';

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
    <section ref={ref} className="py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] leading-tight tracking-[-0.02em] max-w-4xl">
            Comprehensive IT Solutions for Modern Businesses
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 1, 
                ease: [0.16, 1, 0.3, 1],
                delay: index * 0.1 
              }}
              className="group relative bg-white p-12 hover:bg-neutral-50 transition-colors duration-500"
            >
              <div className="flex flex-col h-full">
                <div className="mb-8">
                  <service.icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl mb-4 tracking-[-0.02em]">{service.title}</h3>
                <p className="text-neutral-600 mb-8">{service.description}</p>
                <div className="mt-auto flex items-center gap-2 text-sm uppercase tracking-wider">
                  <span>Learn More</span>
                  <span className="w-6 h-px bg-black group-hover:w-12 transition-all duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}