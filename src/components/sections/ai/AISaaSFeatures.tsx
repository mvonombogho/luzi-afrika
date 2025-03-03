'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, CheckCircle, Zap, Database, ShieldCheck, BarChart3 } from 'lucide-react';

export default function AISaaSFeatures() {
  // Sample AI SaaS features
  const aiSaaSFeatures = [
    {
      id: 1,
      title: 'Predictive Analytics',
      description: 'Forecast business trends, customer behavior, and market demands with machine learning algorithms tailored for the Kenyan market.',
      icon: <BarChart3 className="w-6 h-6 text-purple-600" />
    },
    {
      id: 2,
      title: 'Intelligent Document Processing',
      description: 'Automate document handling with AI that can extract, classify, and process information from various document types.',
      icon: <Database className="w-6 h-6 text-purple-600" />
    },
    {
      id: 3,
      title: 'AI Security & Monitoring',
      description: 'Protect your business with AI-powered security that detects and responds to threats in real-time.',
      icon: <ShieldCheck className="w-6 h-6 text-purple-600" />
    },
    {
      id: 4,
      title: 'Fast Implementation',
      description: 'Get up and running quickly with our streamlined deployment process and local support team in Nairobi.',
      icon: <Zap className="w-6 h-6 text-purple-600" />
    }
  ];

  // Benefits list
  const benefits = [
    'Custom AI models trained on Kenyan business data',
    'Local support and implementation team in Nairobi',
    'Affordable monthly subscription plans',
    'Integration with existing business software',
    'Regular updates and improvements',
    'Compliance with Kenyan data regulations'
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            AI SaaS Solutions for Kenyan Businesses
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Powerful, affordable AI software solutions designed specifically for the needs and challenges of businesses in Kenya and East Africa.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiSaaSFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
          
          {/* Content Side */}
          <div>
            <motion.h3
              className="text-2xl font-semibold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              AI Software Solutions Tailored for Kenya
            </motion.h3>
            
            <motion.p
              className="text-gray-600 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Our AI SaaS solutions are specifically designed for the Kenyan market, taking into account local business practices, data availability, and connectivity challenges. We provide powerful machine learning and analytics capabilities that are accessible and affordable for businesses of all sizes.
            </motion.p>
            
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold mb-4">Benefits for Kenyan Businesses:</h4>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="text-purple-600 mr-2 mt-1 flex-shrink-0" size={18} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-purple-100 p-6 rounded-lg border border-purple-200">
                <h4 className="text-lg font-semibold mb-2">Ready to transform your business with AI?</h4>
                <p className="text-gray-700 mb-4">
                  Schedule a free consultation with our AI specialists in Nairobi to discover the right solutions for your business needs.
                </p>
                <a 
                  href="/contact"
                  className="inline-flex items-center text-purple-700 font-medium hover:text-purple-800"
                >
                  Book a consultation <ArrowRight size={16} className="ml-1" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}