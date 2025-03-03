'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ServerIcon, ShieldCheck, Database, Network, Monitor, HardDrive, Brain, Bot, Cloud, Code, Sparkles } from 'lucide-react';

interface Service {
  _id: string;
  title: string;
  slug: { current: string };
  shortDescription: string;
  icon: string;
  featured: boolean;
  isAIService?: boolean;
  serviceType?: string;
}

// Static data to replace Sanity dependency
const staticServices: Service[] = [
  {
    _id: '1',
    title: 'Hardware Support & Maintenance',
    slug: { current: 'hardware-support' },
    shortDescription: 'Comprehensive computer maintenance, hardware upgrades, and network equipment setup.',
    icon: 'hardDrive',
    featured: true
  },
  {
    _id: '2',
    title: 'Software Solutions',
    slug: { current: 'software-solutions' },
    shortDescription: 'Software installation, system updates, and security solutions for your business needs.',
    icon: 'monitor',
    featured: true
  },
  {
    _id: '3',
    title: 'Custom AI Agents',
    slug: { current: 'custom-ai-agents' },
    shortDescription: 'Tailored AI assistants and agents designed to automate workflows and improve customer experiences.',
    icon: 'bot',
    featured: true,
    isAIService: true,
    serviceType: 'ai-solutions'
  },
  {
    _id: '4',
    title: 'AI-Powered SaaS Products',
    slug: { current: 'ai-saas-products' },
    shortDescription: 'Cloud-based software solutions with AI capabilities to enhance productivity and decision-making.',
    icon: 'sparkles',
    featured: true,
    isAIService: true,
    serviceType: 'saas-products'
  }
];

export default function Services() {
  const [services] = useState<Service[]>(staticServices);
  
  // Icon mapping
  const getIcon = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'server': <ServerIcon className="w-8 h-8 text-blue-600" />,
      'shield': <ShieldCheck className="w-8 h-8 text-blue-600" />,
      'database': <Database className="w-8 h-8 text-blue-600" />,
      'network': <Network className="w-8 h-8 text-blue-600" />,
      'monitor': <Monitor className="w-8 h-8 text-blue-600" />,
      'hardDrive': <HardDrive className="w-8 h-8 text-blue-600" />,
      'brain': <Brain className="w-8 h-8 text-purple-600" />,
      'bot': <Bot className="w-8 h-8 text-purple-600" />,
      'cloud': <Cloud className="w-8 h-8 text-blue-600" />,
      'code': <Code className="w-8 h-8 text-blue-600" />,
      'sparkles': <Sparkles className="w-8 h-8 text-purple-600" />
    };
    
    return iconMap[iconName] || <ServerIcon className="w-8 h-8 text-blue-600" />;
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };
  
  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-neutral-600">
            We provide comprehensive IT support and cutting-edge AI solutions tailored to your business needs.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service) => (
            <motion.div 
              key={service._id}
              className={`${service.isAIService ? 'bg-gradient-to-br from-white to-purple-50 border border-purple-100' : 'bg-white'} p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow`}
              variants={itemVariants}
            >
              <div className={`${service.isAIService ? 'bg-purple-50' : 'bg-blue-50'} p-4 rounded-full inline-block mb-4`}>
                {getIcon(service.icon)}
              </div>
              
              {service.isAIService && (
                <span className="inline-block bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full mb-2">
                  AI-Powered
                </span>
              )}
              
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              
              <p className="text-neutral-600 mb-6">
                {service.shortDescription}
              </p>
              
              <Link 
                href={`/services/${service.slug.current}`}
                className={`inline-flex items-center ${service.isAIService ? 'text-purple-600' : 'text-blue-600'} font-medium hover:underline`}
              >
                Learn More
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-12">
          <Link 
            href="/services"
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}