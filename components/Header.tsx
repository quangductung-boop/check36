"use client";
// components/Header.tsx
// Header cố định ở trên cùng với logo và nav

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div className="flex items-center justify-between backdrop-blur-xl bg-white/60 border border-white/50 rounded-2xl px-6 py-3 shadow-lg shadow-pink-100/30">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center shadow-md">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400 bg-clip-text text-transparent">
              Check User🌸
            </span>
          </div>

          {/* Badge */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 bg-white/70 px-3 py-1.5 rounded-full border border-slate-100 font-medium">
              Public Info Only
            </span>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
