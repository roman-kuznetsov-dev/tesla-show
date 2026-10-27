import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    viewTransition: true,
  },
  serverExternalPackages: ['@prisma/client', 'prisma-adapter-sqlite'],
  images: {
    loader: 'custom',
    loaderFile: './src/lib/image-loader.ts',
    deviceSizes: [640, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
