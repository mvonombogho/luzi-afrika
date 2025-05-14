'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/ui/PageHeader';

const PeoplePage = () => {
  const router = useRouter();

  // Redirect to home page since the people section is disabled for now
  useEffect(() => {
    router.push('/');
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

export default PeoplePage;
