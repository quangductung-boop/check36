// lib/tiktokTypes.ts
// Kiểu dữ liệu cho TikTok public profile
// Các trường nullable = không thể lấy được từ public HTML

export interface UserProfile {
  // ─── Core ─────────────────────────────
  username: string;           // uniqueId
  displayName: string;        // nickname
  avatar: string;             // avatarLarger URL
  bio: string;                // signature

  // ─── Stats (có thể null nếu TikTok không expose) ───
  followers: number | null;
  following: number | null;
  likes: number | null;       // heartCount
  videoCount: number | null;
  diggCount: number | null;   // videos liked by user

  // ─── Profile flags ──────────────────────
  verified: boolean;
  privateAccount: boolean;
  openFavorite: boolean;

  // ─── Metadata (không phải lúc nào cũng có) ───
  region: string | null;
  language: string | null;
  accountCreated: string | null; // TikTok không expose publicly
}

// Format số lớn, an toàn với null
export function formatNumber(num: number | null | undefined): string {
  if (num === null || num === undefined) return "N/A";
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num.toLocaleString();
}
