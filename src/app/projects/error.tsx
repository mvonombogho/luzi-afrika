'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home } from 'lucide-react';

export default function ProjectsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="pt-32 pb-24">
      <div className="px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="text-center max-w-lg">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h1 className="text-3xl font-light mb-4">Unable to Load Projects</h1>
              <p className="text-neutral-600 mb-8">
                We encountered an error while trying to load our projects. Please try again or return to the homepage.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={reset}
                  className="px-6 py-2 bg-black text-white text-sm hover:bg-neutral-800 transition-colors rounded-sm"
                >
                  Try Again
                </button>
                <Link
                  href="/"
                  className="px-6 py-2 border border-black text-sm hover:bg-neutral-50 transition-colors rounded-sm flex items-center justify-center gap-2"
                >
                  <Home size={16} />
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}