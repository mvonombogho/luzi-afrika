'use client';

import React from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="max-w-lg p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Something went wrong!</h1>
        <p className="mb-8">
          Sorry, we encountered an unexpected error while loading this page.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={reset}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            Try again
          </button>
          <Link href="/">
            <button className="px-6 py-3 bg-black text-white rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors">
              Return to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
