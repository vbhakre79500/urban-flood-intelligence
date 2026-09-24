import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  typescript: {
    // Strict enforcement: fail build on type errors
    ignoreBuildErrors: false,
  },
  eslint: {
    // Strict enforcement: fail build on lint errors
    ignoreDuringBuilds: false,
  },
  experimental: {
    // Optimize server actions and package imports
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
