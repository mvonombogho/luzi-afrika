'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Export runtime configuration to ensure client-side rendering
export const dynamic = 'force-dynamic';

export default function PeoplePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simple loading state to show we're client-side rendering
    const timer = setTimeout(() => {
      setIsLoading(false);
      router.push('/');
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8">
        <h1 className="text-2xl font-light mb-4">Team Page</h1>
        <p className="text-neutral-600 mb-8">
          {isLoading ? 'Loading...' : 'Redirecting to home page...'}
        </p>
        <div className="w-8 h-8 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
}
