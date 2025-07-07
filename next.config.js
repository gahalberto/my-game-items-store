/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Permite build mesmo com erros de linting
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Permite build mesmo com erros de TypeScript
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['images.habbo.com'],
  },
};

module.exports = nextConfig; 