import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import AIServiceHero from '@/components/sections/ai/AIServiceHero';
import AIAgents from '@/components/sections/ai/AIAgents';
import AISaaSFeatures from '@/components/sections/ai/AISaaSFeatures';
import FAQ from '@/components/ui/FAQ';
import { generateFAQSchema } from '@/lib/schema';
import Breadcrumbs from '@/components/common/Breadcrumbs';

// Set metadata for SEO
export const metadata: Metadata = {
  title: 'AI Solutions for Kenyan Businesses | Luzi Afrika',
  description: 'AI-powered virtual assistants, chatbots, and SaaS solutions designed specifically for Kenyan businesses. Transform your operations with intelligent automation.',
  keywords: 'AI agents Kenya, AI SaaS Kenya, virtual assistants Nairobi, business AI solutions, chatbots Kenya',
  alternates: {
    canonical: 'https://luziafrika.com/ai-solutions',
  },
  openGraph: {
    title: 'AI Solutions for Kenyan Businesses | Luzi Afrika',
    description: 'AI-powered virtual assistants, chatbots, and SaaS solutions designed specifically for Kenyan businesses.',
    url: 'https://luziafrika.com/ai-solutions',
    siteName: 'Luzi Afrika',
    images: [
      {
        url: 'https://luziafrika.com/images/ai-solutions-og.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Solutions for Kenyan Businesses',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

// FAQ items specific to AI solutions
const faqItems = [
  {
    id: 1,
    question: 'What are AI virtual assistants and how can they help my Kenyan business?',
    answer: 'AI virtual assistants are intelligent software programs that can interact with your customers, answer questions, and perform tasks automatically. For Kenyan businesses, they can provide 24/7 customer support in multiple languages, reduce operational costs, handle routine inquiries, and free up your staff to focus on more complex tasks.'
  },
  {
    id: 2,
    question: 'Is AI technology affordable for small businesses in Kenya?',
    answer: 'Yes, our AI solutions are specifically designed to be accessible for businesses of all sizes in Kenya. We offer flexible, subscription-based pricing models that allow you to start small and scale as your business grows. The operational cost savings from implementing AI often outweigh the investment.'
  },
  {
    id: 3,
    question: 'Do your AI solutions work with limited internet connectivity?',
    answer: 'Yes, we understand the connectivity challenges in some parts of Kenya. Our AI solutions are optimized for lower bandwidth environments and can function with intermittent connectivity. We also offer offline capabilities for certain applications.'
  },
  {
    id: 4,
    question: 'Can your AI assistants understand and speak Swahili and other local languages?',
    answer: 'Yes, our AI assistants support multiple languages including English, Swahili, and can be trained to understand other local languages. This ensures your customers can interact with your business in their preferred language.'
  },
  {
    id: 5,
    question: 'How long does it take to implement an AI solution for my business?',
    answer: 'Implementation timelines vary based on the complexity of your needs, but our standard AI assistant can be deployed within 2-4 weeks. Our team in Nairobi provides local support throughout the implementation process to ensure a smooth transition.'
  },
  {
    id: 6,
    question: 'Is my business data secure with your AI solutions?',
    answer: 'Absolutely. We prioritize data security and privacy. All our AI solutions comply with Kenyan data protection regulations. Your data is encrypted, stored securely, and never shared with third parties without your explicit permission.'
  }
];

export default function AIServicesPage() {
  return (
    <main className="min-h-screen">
      <Breadcrumbs className="max-w-screen-xl mx-auto px-6 pt-4" />
      
      <AIServiceHero />
      
      <AIAgents />
      
      <AISaaSFeatures />
      
      <FAQ 
        items={faqItems}
        title="AI Solutions FAQ"
        description="Answers to common questions about implementing AI solutions for Kenyan businesses"
      />
      
      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 text-white">
        <div className="max-w-screen-xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to transform your business with AI?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Join the growing number of Kenyan businesses leveraging AI technology to improve operations, enhance customer experience, and drive growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="bg-white text-indigo-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Schedule a Consultation
            </Link>
            <Link 
              href="/ai-solutions/case-studies"
              className="bg-transparent hover:bg-indigo-700 border border-white text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              View Case Studies
            </Link>
          </div>
        </div>
      </section>
      
      {/* Schema.org FAQ Markup */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(faqItems.map(item => ({
            question: item.question,
            answer: typeof item.answer === 'string' ? item.answer : 'Please visit our website for details.'
          }))))
        }}
      />
    </main>
  );
}