"use client";
// components/EmptyState.tsx
// Trạng thái khi chưa nhập gì — hướng dẫn người dùng

import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";

export default function EmptyState() {
  const hints = [
    "🌸 Enter any username to check public info",
    "✨ Works with public accounts only",
    "💙 Fast, clean, no login required",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center py-10"
    >
      {/* Icon container */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative mb-6"
      >
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-100 to-pink-100 flex items-center justify-center shadow-lg shadow-purple-100/50">
          <Search size={32} className="text-violet-400" />
        </div>
        <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center shadow-md">
          <Sparkles size={13} className="text-white" />
        </div>
      </motion.div>

      {/* Title */}
      <h3 className="text-xl font-bold text-slate-700 mb-2">
        Ready to Check
      </h3>
      <p className="text-slate-400 text-sm max-w-xs mb-6 leading-relaxed">
        Type a username above and hit{" "}
        <span className="text-violet-500 font-semibold">Check User</span> to see their
        public profile info instantly.
      </p>

      {/* Hint chips */}
      <div className="flex flex-col gap-2 w-full max-w-xs">
        {hints.map((hint, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="bg-white/70 backdrop-blur border border-white/60 rounded-xl px-4 py-2.5 text-xs text-slate-500 text-left shadow-sm"
          >
            {hint}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
