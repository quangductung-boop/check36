// lib/mockData.ts
// Mock data for demo purposes — replace with real API later

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
  diggCount: number; // số lượt thích người dùng đã bấm
}

// Mock database — giả lập nhiều user khác nhau
const MOCK_USERS: Record<string, UserProfile> = {
  ducanhnbs: {
    username: "ducanhnbs",
    displayName: "Duc Anh 🌸",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ducanhnbs&backgroundColor=b6e3f4",
    bio: "✨ Just vibing | 🌸 Living my best life | 💙 DM for collab",
    verified: true,
    followers: 128400,
    following: 342,
    likes: 2_340_000,
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
    followers: 72_000_000,
    following: 158,
    likes: 340_000_000,
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
    followers: 5_200,
    following: 410,
    likes: 87_000,
    videoCount: 24,
    region: "VN",
    language: "vi",
    accountCreated: "2022-11-20",
    privateAccount: false,
    openFavorite: true,
    diggCount: 3200,
  },
};

// Hàm giả lập gọi API — dễ thay thế bằng API thật sau này
export async function fetchUserProfile(username: string): Promise<UserProfile> {
  // Giả lập độ trễ mạng
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const lower = username.toLowerCase().trim();
  const user = MOCK_USERS[lower];

  if (!user) {
    // Tạo user ngẫu nhiên nếu không có trong mock DB (giả lập tìm thấy)
    // Trong thực tế: throw error nếu API trả về 404
    throw new Error(`User @${username} not found`);
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
