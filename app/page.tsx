"use client";
// app/page.tsx — Main page, quản lý state toàn bộ ứng dụng

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, Star } from "lucide-react";
import { UserProfile, lookupUser } from "@/lib/userLookup";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import UserDashboard from "@/components/UserDashboard";
import SkeletonLoader from "@/components/SkeletonLoader";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import FlowerBackground from "@/components/FlowerBackground";

type AppState = "idle" | "loading" | "success" | "error";

export default function HomePage() {
  const [appState, setAppState] = useState<AppState>("idle");
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [lastUsername, setLastUsername] = useState<string>("");

  // Tra cứu user trực tiếp trên client — không cần API route, hoạt động trên mọi host
  const handleSearch = useCallback(async (username: string) => {
    setLastUsername(username);
    setAppState("loading");
    setUserData(null);
    setErrorMsg("");

    try {
      const user = await lookupUser(username);
      setUserData(user);
      setAppState("success");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setErrorMsg(msg);
      setAppState("error");
    }
  }, []);

  const handleRetry = () => {
    setAppState("idle");
    setUserData(null);
    setErrorMsg("");
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/50">
      {/* Animated flower petals background */}
      <FlowerBackground />

      {/* Decorative blobs */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-violet-200/25 via-pink-100/20 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-200/20 via-purple-100/15 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Fixed Header */}
      <Header />

      {/* Main content */}
      <main className="relative z-10 min-h-screen flex flex-col items-center pt-28 pb-20 px-4">
        {/* ─── Hero Section ─── */}
        <motion.section
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 max-w-2xl w-full"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-1.5 bg-white/80 backdrop-blur border border-violet-100 text-violet-500 text-xs font-semibold px-4 py-2 rounded-full shadow-sm mb-5"
          >
            <Star size={12} fill="currentColor" />
            Public Profile Checker
            <Star size={12} fill="currentColor" />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4"
          >
            <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-pink-400 bg-clip-text text-transparent">
              Check User
            </span>
            <span className="ml-2">🌸</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-base sm:text-lg max-w-sm mx-auto mb-8 leading-relaxed"
          >
            Instantly look up{" "}
            <span className="text-violet-500 font-semibold">public profile</span>{" "}
            info — followers, likes, videos & more.
          </motion.p>

          {/* SearchBar */}
          <SearchBar onSearch={handleSearch} isLoading={appState === "loading"} />
        </motion.section>

        {/* ─── Result Section ─── */}
        <section className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {appState === "idle" && <EmptyState key="empty" />}

            {appState === "loading" && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <SkeletonLoader />
              </motion.div>
            )}

            {appState === "success" && userData && (
              <UserDashboard key={`dash-${userData.username}`} user={userData} />
            )}

            {appState === "error" && (
              <ErrorState
                key="error"
                username={lastUsername}
                message={errorMsg}
                onRetry={handleRetry}
              />
            )}
          </AnimatePresence>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="relative z-10 pb-8 pt-4 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Sparkles size={12} className="text-violet-300" />
            <span>Only public data is accessed. No login required.</span>
            <Sparkles size={12} className="text-pink-300" />
          </div>
          <p className="text-xs text-slate-300 font-medium">
            Made with{" "}
            <span className="text-pink-400">🌸</span>{" "}
            by{" "}
            <span className="text-violet-400 font-semibold">@ducanhnbs</span>
            {" "}— Thank you!
          </p>
        </motion.div>
      </footer>
    </div>
  );
}
