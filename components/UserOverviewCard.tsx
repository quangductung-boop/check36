"use client";
// components/UserOverviewCard.tsx
// Card chính hiển thị avatar, tên, bio, badges

import { motion } from "framer-motion";
import Image from "next/image";
import {
  BadgeCheck,
  Lock,
  Globe,
  MapPin,
  Languages,
  Heart,
  Calendar,
} from "lucide-react";
import { UserProfile } from "@/lib/userLookup";

interface UserOverviewCardProps {
  user: UserProfile;
}

export default function UserOverviewCard({ user }: UserOverviewCardProps) {
  // Format ngày tháng đẹp hơn
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative bg-white/75 backdrop-blur-xl border border-white/60 rounded-3xl p-7 shadow-xl shadow-purple-100/20 overflow-hidden"
    >
      {/* Decorative gradient blob */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br from-violet-200/40 to-pink-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-gradient-to-tr from-blue-200/30 to-purple-100/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative flex flex-col sm:flex-row items-start gap-6">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="relative flex-shrink-0"
        >
          <div className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-white shadow-lg shadow-purple-200/40">
            <Image
              src={user.avatar}
              alt={user.displayName}
              width={96}
              height={96}
              className="w-full h-full object-cover"
              unoptimized // dicebear SVG
            />
          </div>
          {/* Verified badge on avatar */}
          {user.verified && (
            <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-gradient-to-br from-blue-500 to-violet-500 rounded-full flex items-center justify-center shadow-md ring-2 ring-white">
              <BadgeCheck size={14} className="text-white" />
            </div>
          )}
          {/* Private lock */}
          {user.privateAccount && (
            <div className="absolute -top-2 -right-2 w-7 h-7 bg-slate-500 rounded-full flex items-center justify-center shadow-md ring-2 ring-white">
              <Lock size={13} className="text-white" />
            </div>
          )}
        </motion.div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          {/* Name + Verified */}
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-xl font-bold text-slate-800 truncate">
              {user.displayName}
            </h2>
            {user.verified && (
              <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-500 border border-blue-100 px-2.5 py-1 rounded-full font-semibold">
                <BadgeCheck size={11} /> Verified
              </span>
            )}
            {user.privateAccount && (
              <span className="inline-flex items-center gap-1 text-xs bg-slate-100 text-slate-500 border border-slate-200 px-2.5 py-1 rounded-full font-semibold">
                <Lock size={11} /> Private
              </span>
            )}
          </div>

          {/* Username */}
          <p className="text-sm text-violet-400 font-medium mt-0.5">
            @{user.username}
          </p>

          {/* Bio */}
          {user.bio && (
            <p className="text-sm text-slate-500 mt-2.5 leading-relaxed">
              {user.bio}
            </p>
          )}

          {/* Meta info chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            {user.region && (
              <span className="inline-flex items-center gap-1.5 text-xs bg-sky-50 text-sky-500 border border-sky-100 px-3 py-1.5 rounded-full font-medium">
                <MapPin size={11} /> {user.region}
              </span>
            )}
            {user.language && (
              <span className="inline-flex items-center gap-1.5 text-xs bg-emerald-50 text-emerald-500 border border-emerald-100 px-3 py-1.5 rounded-full font-medium">
                <Languages size={11} /> {user.language.toUpperCase()}
              </span>
            )}
            {user.openFavorite && (
              <span className="inline-flex items-center gap-1.5 text-xs bg-rose-50 text-rose-400 border border-rose-100 px-3 py-1.5 rounded-full font-medium">
                <Heart size={11} /> Open Favorite
              </span>
            )}
            {!user.privateAccount && (
              <span className="inline-flex items-center gap-1.5 text-xs bg-teal-50 text-teal-500 border border-teal-100 px-3 py-1.5 rounded-full font-medium">
                <Globe size={11} /> Public
              </span>
            )}
            {user.accountCreated && (
              <span className="inline-flex items-center gap-1.5 text-xs bg-amber-50 text-amber-500 border border-amber-100 px-3 py-1.5 rounded-full font-medium">
                <Calendar size={11} /> {formatDate(user.accountCreated)}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
