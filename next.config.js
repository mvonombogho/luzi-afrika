/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: '*.sanity.io',
      },
    ],
  },
  // For production builds - ignore TypeScript errors
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // Also ignore ESLint errors
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Experimental features to help with build
  experimental: {
    serverComponentsExternalPackages: ['framer-motion'],
    esmExternals: 'loose',
  },
  // Output as standalone for easier deployment
  output: 'standalone',
}

module.exports = nextConfig