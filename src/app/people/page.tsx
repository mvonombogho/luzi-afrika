'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/ui/PageHeader';

// Simple placeholder for disabled People page
const PeoplePage = () => {
  const router = useRouter();

  // Redirect to home page since the people section is disabled for now
  useEffect(() => {
    // Optional: Add a small delay to allow the page to render before redirecting
    const redirectTimer = setTimeout(() => {
      router.push('/');
    }, 500);

    return () => clearTimeout(redirectTimer);
  }, [router]);

  return (
    <main className="min-h-screen">
      <PageHeader 
        title="Our Team"
        subtitle="This section is currently under development"
      />
      <section className="py-20 px-6 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-center text-lg text-neutral-600">
            We're currently building our team page. Please check back soon.
          </p>
        </div>
      </section>
    </main>
  );
};

// Make sure we export the component as default
export default PeoplePage;
