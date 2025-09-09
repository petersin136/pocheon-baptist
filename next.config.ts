import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Increase body size limit for file uploads via Server Actions
      bodySizeLimit: "50mb",
    },
  },
  turbopack: {
    // Ensure the correct project root is used when multiple lockfiles are present
    root: __dirname,
  },
};

export default nextConfig;
