// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      // DiceBear (avatar placeholder)
      { protocol: "https", hostname: "api.dicebear.com" },
      // TikTok CDN — avatar images từ real profile
      { protocol: "https", hostname: "**.tiktokcdn.com" },
      { protocol: "https", hostname: "**.tiktokcdn-us.com" },
      { protocol: "https", hostname: "p16-sign-va.tiktokcdn.com" },
      { protocol: "https", hostname: "p16-sign.tiktokcdn-us.com" },
      { protocol: "https", hostname: "p77-sign-va.tiktokcdn.com" },
      { protocol: "https", hostname: "p19-sign-va.tiktokcdn.com" },
    ],
  },
};

export default nextConfig;

