// app/api/user/route.ts
// API Route: GET /api/user?username=xxx
// Compatible with Cloudflare Pages Edge Runtime

import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge';

// ─── Types ───────────────────────────────────────────────────────────────────
interface UserProfile {
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  verified: boolean;
  followers: number;
  following: number;
  likes: number;
  videoCount: number;
  region: string;
  language: string;
  accountCreated: string;
  privateAccount: boolean;
  openFavorite: boolean;
  diggCount: number;
}

// ─── Mock Database ────────────────────────────────────────────────────────────
// Edge Runtime safe — không dùng setTimeout, không dùng Node.js APIs
const MOCK_USERS: Record<string, UserProfile> = {
  ducanhnbs: {
    username: "ducanhnbs",
    displayName: "Duc Anh 🌸",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ducanhnbs&backgroundColor=b6e3f4",
    bio: "✨ Just vibing | 🌸 Living my best life | 💙 DM for collab",
    verified: true,
    followers: 128400,
    following: 342,
    likes: 2340000,
    videoCount: 89,
    region: "VN",
    language: "vi",
    accountCreated: "2020-03-15",
    privateAccount: false,
    openFavorite: true,
    diggCount: 45600,
  },
  tiktok: {
    username: "tiktok",
    displayName: "TikTok",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tiktok&backgroundColor=ffdfbf",
    bio: "Make Your Day 🎵 Download TikTok now and join the fun!",
    verified: true,
    followers: 72000000,
    following: 158,
    likes: 340000000,
    videoCount: 1250,
    region: "US",
    language: "en",
    accountCreated: "2017-08-01",
    privateAccount: false,
    openFavorite: false,
    diggCount: 0,
  },
  demo: {
    username: "demo",
    displayName: "Demo User 💫",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo&backgroundColor=c0aede",
    bio: "This is a demo account for testing Check User 🌸",
    verified: false,
    followers: 5200,
    following: 410,
    likes: 87000,
    videoCount: 24,
    region: "VN",
    language: "vi",
    accountCreated: "2022-11-20",
    privateAccount: false,
    openFavorite: true,
    diggCount: 3200,
  },
};

// ─── GET Handler ──────────────────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  try {
    const username = request.nextUrl.searchParams.get("username");

    // Validate: thiếu username
    if (!username || username.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Username is required" },
        { status: 400 }
      );
    }

    const trimmed = username.trim();

    // Validate: sai format
    if (trimmed.length > 30 || !/^[a-zA-Z0-9._]+$/.test(trimmed)) {
      return NextResponse.json(
        { success: false, error: "Invalid username format. Only letters, numbers, dots and underscores allowed." },
        { status: 400 }
      );
    }

    // Lookup user — Edge Runtime safe
    const lower = trimmed.toLowerCase();
    const user = MOCK_USERS[lower];

    if (!user) {
      return NextResponse.json(
        { success: false, error: `User @${trimmed} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: user },
      { status: 200 }
    );

  } catch (err) {
    // Log lỗi rõ ràng để debug trên Cloudflare dashboard
    console.error("[API /api/user] Unexpected error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
