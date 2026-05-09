// lib/userLookup.ts
// Client-side user lookup — runs in browser, no server needed.
// Works 100% on Cloudflare Pages static hosting.

export interface UserProfile {
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

// Mock database
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

// Lookup with simulated delay — runs fully in browser, no fetch needed
export async function lookupUser(username: string): Promise<UserProfile> {
  if (!username || username.trim().length === 0) {
    throw new Error("Username is required");
  }

  const trimmed = username.trim();

  if (trimmed.length > 30 || !/^[a-zA-Z0-9._]+$/.test(trimmed)) {
    throw new Error("Invalid username format");
  }

  // Simulate network delay for UX
  await new Promise((resolve) => setTimeout(resolve, 900));

  const lower = trimmed.toLowerCase();
  const user = MOCK_USERS[lower];

  if (!user) {
    throw new Error(`User @${trimmed} not found`);
  }

  return user;
}

// Format số lớn: 1234567 → 1.2M
export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num.toString();
}
