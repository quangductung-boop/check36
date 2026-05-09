// lib/userLookup.ts
// Re-export từ tiktokTypes để backward compatibility với các component cũ
// Đây là adapter layer — nếu muốn đổi nguồn dữ liệu sau này, chỉ cần sửa file này

export type { UserProfile } from "./tiktokTypes";
export { formatNumber } from "./tiktokTypes";
