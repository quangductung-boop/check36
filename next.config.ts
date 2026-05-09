// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Cloudflare Pages via @cloudflare/next-on-pages
  // This tells Next.js to output in a format compatible with Edge Runtime
  images: {
    unoptimized: true,
    // Cho phép load avatar từ dicebear và các CDN khác
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
      {
        protocol: "https",
        hostname: "p16-sign-va.tiktokcdn.com",
      },
      {
        protocol: "https",
        hostname: "**.tiktokcdn.com",
      },
    ],
  },
};

export default nextConfig;
