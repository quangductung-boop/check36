"use client";
// components/ErrorState.tsx
// Hiển thị khi không tìm thấy user hoặc có lỗi

import { motion } from "framer-motion";
import { UserX, RefreshCcw } from "lucide-react";

interface ErrorStateProps {
  username: string;
  message?: string;
  onRetry: () => void;
}

export default function ErrorState({ username, message, onRetry }: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center text-center py-10"
    >
      {/* Icon */}
      <motion.div
        initial={{ rotate: -10 }}
        animate={{ rotate: [-10, 10, -10, 0] }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-20 h-20 rounded-3xl bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center shadow-lg shadow-rose-100/50 mb-6"
      >
        <UserX size={32} className="text-rose-400" />
      </motion.div>

      {/* Title */}
      <h3 className="text-xl font-bold text-slate-700 mb-2">
        User Not Found
      </h3>

      {/* Message */}
      <p className="text-slate-400 text-sm max-w-xs mb-2 leading-relaxed">
        {message || `We couldn't find any public account for`}
      </p>
      <p className="text-violet-500 font-semibold text-base mb-6">
        @{username}
      </p>

      {/* Suggestions */}
      <div className="bg-rose-50/70 border border-rose-100 rounded-2xl px-5 py-4 max-w-xs text-left mb-6">
        <p className="text-xs font-semibold text-rose-400 mb-2 uppercase tracking-wide">
          Possible reasons
        </p>
        <ul className="space-y-1.5 text-xs text-slate-500">
          <li>• Username may be misspelled</li>
          <li>• Account might be private or deleted</li>
          <li>• The account may not exist</li>
        </ul>
      </div>

      {/* Retry button */}
      <motion.button
        onClick={onRetry}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-2 bg-gradient-to-r from-violet-500 to-pink-400 text-white font-semibold px-6 py-3 rounded-xl shadow-md shadow-purple-200 hover:shadow-lg transition-shadow duration-200"
      >
        <RefreshCcw size={15} />
        Try Another Username
      </motion.button>
    </motion.div>
  );
}
