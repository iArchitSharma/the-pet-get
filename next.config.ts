import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.thepetnest.com',
        // Optional: port: '', // Only include if you need a specific port
        pathname: '/**', // This allows all paths under the domain
      },
    ],
  },
};

export default nextConfig;
