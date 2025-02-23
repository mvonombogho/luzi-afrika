'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';

const services = [
  {
    title: 'Hardware Support & Maintenance',
    description: 'Comprehensive computer and network equipment maintenance, upgrades, and repairs to keep your infrastructure running at peak performance.',
    features: [
      'System health checks',
      'Hardware upgrades',
      'Network equipment setup',
      'Preventive maintenance'
    ]
  },
  {
    title: 'Software Solutions',
    description: 'End-to-end software support including installation, updates, security solutions, and data backup to protect your digital assets.',
    features: [
      'Software licensing',
      'System updates',
      'Security solutions',
      'Data backup'
    ]
  },
  {
    title: 'IT Procurement',
    description: 'Strategic IT equipment sourcing with competitive pricing through our established supplier networks.',
    features: [
      'Equipment sourcing',
      'Vendor management',
      'Bulk purchasing',
      'Warranty handling'
    ]
  },
  {
    title: 'Technical Support',
    description: 'Reliable on-site and remote support with quick response times to minimize business disruptions.',
    features: [
      'Remote support',
      'Network troubleshooting',
      'User training',
      'Email configuration'
    ]
  }
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top bottom',
          end: 'bottom center',
          scrub: 1
        },
        y: 100,
        opacity: 0
      });

      // Cards animation
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.from(cards, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top bottom',
            end: 'center center',
            scrub: 1
          },
          y: 100,
          opacity: 0,
          stagger: 0.2
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 bg-neutral-50"
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-16 md:mb-24">
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.02em]"
          >
            Our Services
          </h2>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white p-8 rounded-lg hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-2xl font-light mb-4">{service.title}</h3>
              <p className="text-neutral-600 mb-6">{service.description}</p>
              
              <ul className="space-y-3 mb-8">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-neutral-500">
                    <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 text-sm font-medium group"
              >
                Learn More
                <ArrowUpRight 
                  size={16}
                  className="transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;