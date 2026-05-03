import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // reactCompiler: true, // Devre dışı bırakıldı (Build kararlılığı için)
  output: 'standalone',
  experimental: {
    serverActions: {
      bodySizeLimit: '500mb',
    },
  },
};

export default nextConfig;
