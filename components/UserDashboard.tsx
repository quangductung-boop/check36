"use client";
// components/UserDashboard.tsx
// Tổng hợp toàn bộ kết quả sau khi tìm thấy user — gọi overview + stats grid

import { motion } from "framer-motion";
import {
  Users,
  UserCheck,
  Heart,
  Play,
  ThumbsUp,
  TrendingUp,
} from "lucide-react";
import { UserProfile, formatNumber } from "@/lib/mockData";
import UserOverviewCard from "./UserOverviewCard";
import StatsCard from "./StatsCard";

interface UserDashboardProps {
  user: UserProfile;
}

// Tỉ lệ engagement đơn giản: likes / (followers * videos) * 100
const calcEngagement = (user: UserProfile): string => {
  if (!user.followers || !user.videoCount) return "N/A";
  const rate = (user.likes / (user.followers * user.videoCount)) * 100;
  return rate.toFixed(2) + "%";
};

// Trung bình lượt thích mỗi video
const avgLikesPerVideo = (user: UserProfile): string => {
  if (!user.videoCount) return "0";
  return formatNumber(Math.round(user.likes / user.videoCount));
};

// Định nghĩa các stats card cần hiển thị
const getStatsConfig = (user: UserProfile) => [
  {
    icon: Users,
    label: "Followers",
    value: formatNumber(user.followers),
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-50",
  },
  {
    icon: UserCheck,
    label: "Following",
    value: formatNumber(user.following),
    color: "from-sky-500 to-blue-600",
    bgColor: "bg-sky-50",
  },
  {
    icon: Heart,
    label: "Total Likes",
    value: formatNumber(user.likes),
    color: "from-rose-400 to-pink-500",
    bgColor: "bg-rose-50",
  },
  {
    icon: Play,
    label: "Videos",
    value: formatNumber(user.videoCount),
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50",
  },
  {
    icon: TrendingUp,
    label: "Engagement",
    value: calcEngagement(user),
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50",
  },
  {
    icon: ThumbsUp,
    label: "Avg Likes/Video",
    value: avgLikesPerVideo(user),
    color: "from-fuchsia-500 to-violet-500",
    bgColor: "bg-fuchsia-50",
  },
];

export default function UserDashboard({ user }: UserDashboardProps) {
  const stats = getStatsConfig(user);

  return (
    <motion.div
      key={user.username}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-2xl mx-auto space-y-5"
    >
      {/* Overview card */}
      <UserOverviewCard user={user} />

      {/* Section label */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xs font-semibold text-slate-400 uppercase tracking-widest text-center pt-1"
      >
        Account Statistics
      </motion.p>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <StatsCard key={s.label} {...s} delay={0.1 + i * 0.07} />
        ))}
      </div>

      {/* Digg count if available */}
      {user.diggCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-100/60 rounded-2xl p-5 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-pink-100 flex items-center justify-center">
              <Heart size={16} className="text-pink-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700">Videos Liked by User</p>
              <p className="text-xs text-slate-400">Total diggs on other content</p>
            </div>
          </div>
          <p className="text-xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
            {formatNumber(user.diggCount)}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
