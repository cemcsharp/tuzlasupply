
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'standalone' kaldırıldı, Vercel varsayılanı kullanılacak
  experimental: {
    serverActions: {
      bodySizeLimit: '500mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/insights',
        destination: '/company/insights',
        permanent: true,
      },
      {
        source: '/services/:slug',
        destination: '/solutions/:slug',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/company/services',
        permanent: true,
      },
      {
        source: '/privacy',
        destination: '/legal/privacy',
        permanent: true,
      },
      {
        source: '/terms',
        destination: '/legal/terms',
        permanent: true,
      }
    ]
  }
};

export default nextConfig;
