'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Bot, Brain, BarChart } from 'lucide-react';
import { generateServiceSchema } from '@/lib/schema';

export default function AIServiceHero() {
  // Schema for AI services
  const aiServiceSchema = generateServiceSchema({
    name: 'AI Solutions & Virtual Assistants',
    description: 'AI-powered virtual assistants, chatbots, and SaaS solutions for Kenyan businesses, providing intelligent automation and data insights.',
    serviceType: 'AI Technology',
    image: 'https://luziafrika.com/images/ai-services.jpg'
  });

  return (
    <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white py-20 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" 
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
            backgroundSize: '24px 24px'
          }}
        />
      </div>
        
      <div className="max-w-screen-xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Content */}
          <div className="lg:w-7/12">
            <div className="inline-block bg-purple-700 bg-opacity-50 rounded-full px-4 py-1 text-sm mb-6">
              AI Solutions for Kenyan Businesses
            </div>

            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Transform Your Business with <span className="text-purple-300">Intelligent AI Solutions</span>
            </motion.h1>
            
            <motion.p
              className="text-lg md:text-xl text-purple-100 mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Leverage cutting-edge AI technology to automate processes, gain valuable insights, and enhance customer experiences for your Kenyan business.
            </motion.p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <motion.button
                  className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                  <ArrowRight size={18} />
                </motion.button>
              </Link>
              
              <Link href="/ai-solutions#services">
                <motion.button
                  className="bg-transparent hover:bg-purple-800 text-white border border-purple-400 px-6 py-3 rounded-lg font-medium transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore AI Services
                </motion.button>
              </Link>
            </div>
          </div>
          
          {/* Feature cards */}
          <div className="lg:w-5/12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 border border-purple-500 border-opacity-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-purple-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Bot className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Virtual Assistants</h3>
                <p className="text-purple-100">Intelligent chatbots and virtual agents for 24/7 customer support and process automation.</p>
              </motion.div>
              
              <motion.div 
                className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 border border-purple-500 border-opacity-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="bg-purple-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Brain className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Machine Learning</h3>
                <p className="text-purple-100">Custom AI models that learn from your data to deliver accurate predictions and insights.</p>
              </motion.div>
              
              <motion.div 
                className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 border border-purple-500 border-opacity-20 md:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="bg-purple-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <BarChart className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI-Powered Analytics</h3>
                <p className="text-purple-100">Transform raw data into actionable business intelligence with our AI analytics solutions tailored for Kenyan businesses.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* JSON-LD Schema */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aiServiceSchema)
        }}
      />
    </section>
  );
}