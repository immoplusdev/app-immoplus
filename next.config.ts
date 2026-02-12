import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api-v2.immoplus.ci',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'immoplus-bucket.ams3.digitaloceanspaces.com',
        pathname: '/**',
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
