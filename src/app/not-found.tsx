'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="max-w-lg p-4 text-center">
        <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="mb-8">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link href="/">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
            Return to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
