'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, ChevronLeft } from 'lucide-react';

export default function ProjectError({
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
      <div className="fixed top-24 left-6 z-20">
        <Link
          href="/projects"
          className="flex items-center gap-2 text-sm hover:opacity-60 transition-opacity"
        >
          <ChevronLeft size={16} />
          Back to Projects
        </Link>
      </div>

      <div className="px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="text-center max-w-lg">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h1 className="text-3xl font-light mb-4">Unable to Load Project</h1>
              <p className="text-neutral-600 mb-8">
                We encountered an error while trying to load this project. This might be because the project doesn&apos;t exist or there was a technical issue.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={reset}
                  className="px-6 py-2 bg-black text-white text-sm hover:bg-neutral-800 transition-colors rounded-sm"
                >
                  Try Again
                </button>
                <Link
                  href="/projects"
                  className="px-6 py-2 border border-black text-sm hover:bg-neutral-50 transition-colors rounded-sm"
                >
                  View All Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}