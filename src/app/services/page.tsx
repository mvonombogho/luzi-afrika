'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';
import localServices from '@/data/services';
import { getAllServices } from '@/lib/sanity.service';
import { Service } from '@/types/service';

export default function Services() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [services, setServices] = useState<Service[]>(localServices);

  useEffect(() => {
    // Try to fetch services from Sanity, fallback to local data if needed
    const fetchServices = async () => {
      try {
        const sanityServices = await getAllServices();
        // Use Sanity data if available, otherwise fallback to local data
        if (sanityServices && sanityServices.length > 0) {
          setServices(sanityServices);
        }
      } catch (error) {
        console.error('Error fetching services from Sanity:', error);
        // Keep using local data
      } finally {
        setIsLoaded(true);
      }
    };

    fetchServices();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <main className="min-h-screen">
      <PageHeader 
        title="Our Services"
        subtitle="Comprehensive IT solutions tailored to your business needs"
      />

      <section className="py-20 px-6 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-16 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-light mb-6">Empowering businesses through technology</h2>
            <p className="text-lg text-neutral-600">
              At LUZI AFRIKA, we provide end-to-end IT services designed to optimize your operations,
              secure your data, and support your business growth. Our team of certified professionals
              delivers reliable, cost-effective solutions tailored to your specific needs.
            </p>
          </div>

          {isLoaded && (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  className="group bg-neutral-50 rounded-lg p-8 hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-2xl font-light mb-4">{service.title}</h3>
                  <p className="text-neutral-600 mb-6">{service.description}</p>
                  
                  <div className="mb-8">
                    <h4 className="text-sm font-medium text-neutral-500 mb-3">Key Features</h4>
                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-neutral-500">
                          <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href={`/services/${service.slug?.current || service.id}`} className="inline-block">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-2 text-sm font-medium group"
                    >
                      Learn More
                      <ArrowUpRight 
                        size={16}
                        className="transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <section className="py-20 px-6 bg-neutral-900 text-white">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-6">Our Approach</h2>
            <p className="text-lg text-neutral-300 max-w-3xl mx-auto">
              We follow a structured methodology to ensure we deliver the highest quality service
              and maximum value for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Assessment',
                description: 'We thoroughly analyze your current IT infrastructure and business needs'
              },
              {
                step: '02',
                title: 'Planning',
                description: 'Develop customized solutions tailored to your specific requirements'
              },
              {
                step: '03',
                title: 'Implementation',
                description: 'Execute solutions with minimal disruption to your operations'
              },
              {
                step: '04',
                title: 'Optimization',
                description: 'Continuously improve and update systems based on emerging technologies'
              }
            ].map((item) => (
              <div key={item.step} className="relative p-6 border border-neutral-700 rounded-lg">
                <div className="text-4xl font-light text-neutral-700 mb-4">{item.step}</div>
                <h3 className="text-xl font-light mb-3">{item.title}</h3>
                <p className="text-sm text-neutral-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-neutral-50">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-6">Service Packages</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Choose from our flexible service packages designed to meet different business needs and budgets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Basic Care',
                description: 'Essential maintenance and support services for small businesses',
                features: [
                  'Remote technical support',
                  'Basic system monitoring',
                  'Security updates',
                  'Business hours assistance'
                ],
                highlighted: false
              },
              {
                title: 'Professional Care',
                description: 'Comprehensive IT support with priority response for growing businesses',
                features: [
                  'Everything in Basic Care',
                  'Priority response times',
                  'Proactive monitoring',
                  'Regular maintenance visits',
                  'Cloud services management'
                ],
                highlighted: true
              },
              {
                title: 'Enterprise Care',
                description: 'Full-service IT management and strategic planning for larger organizations',
                features: [
                  'Everything in Professional Care',
                  'Dedicated support team',
                  '24/7 emergency support',
                  'IT strategy consulting',
                  'Executive reporting',
                  'Technology roadmapping'
                ],
                highlighted: false
              }
            ].map((pkg) => (
              <div 
                key={pkg.title} 
                className={`p-8 rounded-lg ${pkg.highlighted ? 'bg-white shadow-xl border-t-4 border-blue-500' : 'bg-white'}`}
              >
                <h3 className="text-2xl font-light mb-4">{pkg.title}</h3>
                <p className="text-neutral-600 mb-6">{pkg.description}</p>
                
                <div className="mb-8">
                  <h4 className="text-sm font-medium text-neutral-500 mb-3">What's included</h4>
                  <ul className="space-y-3">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-neutral-500">
                        <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href="/contact" className="inline-block">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-6 py-3 rounded text-sm font-medium ${pkg.highlighted ? 'bg-blue-500 text-white' : 'bg-neutral-100 text-neutral-800'}`}
                  >
                    Get Started
                  </motion.button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-blue-50">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">Ready to optimize your IT infrastructure?</h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto mb-10">
            Contact us today for a free consultation and discover how our services can support your business goals.
          </p>
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-blue-500 text-white rounded-lg text-sm font-medium"
            >
              Book a Consultation
            </motion.button>
          </Link>
        </div>
      </section>
    </main>
  );
}