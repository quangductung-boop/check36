"use client";
// components/StatsCard.tsx
// Card nhỏ hiển thị từng chỉ số (followers, likes, videos, ...)

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;        // Tailwind gradient class
  bgColor: string;      // Light background
  delay?: number;
}

export default function StatsCard({
  icon: Icon,
  label,
  value,
  color,
  bgColor,
  delay = 0,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      whileHover={{ y: -4, scale: 1.03 }}
      className="group relative bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:shadow-purple-100/40 transition-all duration-300 cursor-default"
    >
      {/* Gradient glow khi hover */}
      <div
        className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${color}`}
      />

      {/* Icon */}
      <div className={`w-10 h-10 rounded-xl ${bgColor} flex items-center justify-center mb-3`}>
        <Icon size={18} className={`bg-gradient-to-br ${color} bg-clip-text`} style={{ color: "transparent" }} />
      </div>

      {/* Value */}
      <p className={`text-2xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent leading-none`}>
        {value}
      </p>

      {/* Label */}
      <p className="text-xs text-slate-400 mt-1.5 font-medium tracking-wide uppercase">
        {label}
      </p>
    </motion.div>
  );
}
