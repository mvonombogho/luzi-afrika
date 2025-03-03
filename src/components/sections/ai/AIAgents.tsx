'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, Clock, Globe, Bot } from 'lucide-react';

export default function AIAgents() {
  // AI agents use cases
  const useCases = [
    {
      id: 1,
      title: '24/7 Customer Support',
      description: 'AI agents that handle customer inquiries around the clock in multiple languages including Swahili and English.',
      icon: <MessageCircle className="w-6 h-6 text-indigo-600" />
    },
    {
      id: 2,
      title: 'Always Available',
      description: 'Never miss a customer inquiry, even outside business hours, with our always-on AI assistant technology.',
      icon: <Clock className="w-6 h-6 text-indigo-600" />
    },
    {
      id: 3,
      title: 'Multilingual Support',
      description: 'Support customers in English, Swahili, and other local languages with our advanced natural language AI.',
      icon: <Globe className="w-6 h-6 text-indigo-600" />
    },
    {
      id: 4,
      title: 'Custom AI Agents',
      description: 'Tailored virtual assistants designed specifically for your business processes and customer needs.',
      icon: <Bot className="w-6 h-6 text-indigo-600" />
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image/Illustration Side */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 right-12 bottom-4 bg-indigo-100 rounded-lg z-0"></div>
              <div className="relative z-10 bg-white p-4 shadow-lg rounded-lg">
                <Image
                  src="/images/ai-agents-illustration.jpg"
                  alt="AI Virtual Assistant for Kenyan Businesses"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-indigo-500 text-white p-4 rounded-lg shadow-lg z-20">
                <p className="text-sm font-medium">Used by 50+ businesses across Kenya</p>
              </div>
            </div>
          </motion.div>
          
          {/* Content Side */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">AI Virtual Assistants for Kenyan Businesses</h2>
              <p className="text-lg text-gray-600 mb-8">
                Transform your customer experience with intelligent AI agents that provide 24/7 support, automate routine tasks, and deliver personalized interactions for your Kenyan business.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={useCase.id}
                  className="border border-gray-200 rounded-lg p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="mb-4 text-indigo-600">
                    {useCase.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{useCase.title}</h3>
                  <p className="text-gray-600">{useCase.description}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="/contact" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg inline-block font-medium transition-colors">
                Request AI Agent Demo
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}