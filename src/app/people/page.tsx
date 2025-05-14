'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import PageHeader from '@/components/ui/PageHeader';

// Simple placeholder page for the disabled team/people section
const PeoplePage = () => {
  return (
    <main className="min-h-screen">
      <PageHeader 
        title="Our Team"
        subtitle="This section is coming soon"
      />
      <section className="py-20 px-6 bg-white">
        <div className="max-w-screen-xl mx-auto text-center">
          <p className="text-lg text-neutral-600 mb-10">
            We're currently building our team page with information about our IT experts and specialists.
            Please check back soon to meet the talented professionals behind LUZI AFRIKA LIMITED.
          </p>
          
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-blue-500 text-white rounded-lg text-sm font-medium"
            >
              Return to Home
            </motion.button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default PeoplePage;
