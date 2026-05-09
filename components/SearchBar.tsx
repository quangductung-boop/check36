"use client";
// components/SearchBar.tsx
// Ô nhập username và nút tìm kiếm — UI nổi bật, animation mượt

import { useState, FormEvent, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, AtSign } from "lucide-react";

interface SearchBarProps {
  onSearch: (username: string) => void;
  isLoading: boolean;
}

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim().replace(/^@/, ""); // Bỏ @ nếu người dùng nhập @
    if (trimmed && !isLoading) onSearch(trimmed);
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit(e as unknown as FormEvent);
  };

  // Suggestions nhanh để người dùng thử
  const quickTry = ["ducanhnbs", "tiktok", "demo"];

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Input row */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative"
      >
        <motion.div
          animate={{
            boxShadow: isFocused
              ? "0 0 0 3px rgba(139,92,246,0.2), 0 8px 32px rgba(139,92,246,0.15)"
              : "0 4px 24px rgba(0,0,0,0.07)",
          }}
          transition={{ duration: 0.25 }}
          className="flex items-center bg-white/80 backdrop-blur-xl border border-white/60 rounded-2xl overflow-hidden"
        >
          {/* Icon @ */}
          <div className="pl-5 pr-2 text-slate-300">
            <AtSign size={18} />
          </div>

          {/* Input */}
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKey}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Enter username..."
            className="flex-1 bg-transparent py-4 text-slate-700 placeholder-slate-300 text-base outline-none font-medium"
            autoComplete="off"
            spellCheck={false}
            maxLength={30}
            disabled={isLoading}
          />

          {/* Nút search */}
          <div className="pr-2">
            <motion.button
              type="submit"
              disabled={!value.trim() || isLoading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-400 text-white font-semibold px-6 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md shadow-purple-200"
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <Loader2 size={16} className="animate-spin" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="search"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <Search size={16} />
                  </motion.span>
                )}
              </AnimatePresence>
              <span className="hidden sm:inline">
                {isLoading ? "Checking..." : "Check User"}
              </span>
            </motion.button>
          </div>
        </motion.div>
      </motion.form>

      {/* Quick try chips */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="flex items-center gap-2 mt-4 justify-center flex-wrap"
      >
        <span className="text-xs text-slate-400">Try:</span>
        {quickTry.map((name) => (
          <button
            key={name}
            onClick={() => {
              setValue(name);
              onSearch(name);
            }}
            disabled={isLoading}
            className="text-xs text-violet-500 bg-violet-50 hover:bg-violet-100 border border-violet-100 px-3 py-1.5 rounded-full transition-colors duration-150 font-medium cursor-pointer disabled:opacity-50"
          >
            @{name}
          </button>
        ))}
      </motion.div>
    </div>
  );
}
