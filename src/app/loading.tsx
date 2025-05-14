'use client';

// This file provides a dynamic loading mechanism for the app during server-side rendering.
// It will render while the main content is loading or when a page fails to statically generate.

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Loading() {
  const [dots, setDots] = useState('.');
  const router = useRouter();

  // Animation for loading dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return '.';
        return prev + '.';
      });
    }, 500);

    // After 10 seconds, if still loading, offer a refresh option
    const timeout = setTimeout(() => {
      setShowRefresh(true);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const [showRefresh, setShowRefresh] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black">
      <div className="w-full max-w-md mx-auto p-8 text-center">
        <div className="mb-6">
          <div className="w-12 h-12 mx-auto border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
        
        <h1 className="text-2xl font-light mb-4">Loading{dots}</h1>
        <p className="text-neutral-600 mb-8">
          Please wait while we prepare your content...
        </p>

        {showRefresh && (
          <div className="mt-6">
            <p className="text-neutral-600 mb-4">
              Taking longer than expected? Try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              Refresh Page
            </button>
            <p className="mt-4 text-sm text-neutral-500">
              Or{' '}
              <button
                onClick={() => router.push('/')}
                className="text-blue-500 underline hover:text-blue-700"
              >
                return to the home page
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
