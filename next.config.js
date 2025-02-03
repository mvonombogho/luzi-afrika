/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['your-image-domain.com'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig