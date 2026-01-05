import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compiler: process.env.NODE_ENV === 'production'
    ? { removeConsole: { exclude: ['error'] } }
    : undefined,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'qvjvvzuclpdfbfqbgyhf.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
