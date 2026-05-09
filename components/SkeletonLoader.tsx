"use client";
// components/SkeletonLoader.tsx
// Skeleton loading state — hiển thị trong khi đang fetch dữ liệu

import { motion } from "framer-motion";

// Shimmer animation wrapper
const Shimmer = ({ className }: { className: string }) => (
  <motion.div
    className={`bg-gradient-to-r from-slate-100 via-white to-slate-100 bg-[length:200%_100%] rounded-xl ${className}`}
    animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
  />
);

export default function SkeletonLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Overview card skeleton */}
      <div className="bg-white/70 backdrop-blur-md border border-white/60 rounded-3xl p-8 shadow-lg mb-6">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          <Shimmer className="w-24 h-24 rounded-2xl flex-shrink-0" />

          <div className="flex-1 space-y-3">
            {/* Name */}
            <Shimmer className="h-6 w-40" />
            {/* Username */}
            <Shimmer className="h-4 w-28" />
            {/* Bio */}
            <Shimmer className="h-4 w-full" />
            <Shimmer className="h-4 w-3/4" />
            {/* Badges */}
            <div className="flex gap-2 pt-1">
              <Shimmer className="h-6 w-16 rounded-full" />
              <Shimmer className="h-6 w-16 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats grid skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl p-5"
          >
            <Shimmer className="w-10 h-10 rounded-xl mb-3" />
            <Shimmer className="h-7 w-20 mb-2" />
            <Shimmer className="h-3 w-16 rounded-full" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
