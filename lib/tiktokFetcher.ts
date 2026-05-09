// lib/tiktokFetcher.ts
// Lấy dữ liệu công khai từ trang profile TikTok bằng cách parse JSON nhúng trong HTML.
// TikTok nhúng toàn bộ state vào <script id="__UNIVERSAL_DATA_FOR_REHYDRATION__"> dưới dạng JSON.
// Đây là dữ liệu PUBLIC — không cần auth, chỉ dùng thông tin user đã công khai.
//
// ⚠️ GIỚI HẠN KỸ THUẬT:
// - TikTok có thể block request từ Cloudflare IPs (bot protection)
// - Nếu bị block → trả lỗi rõ ràng, không crash frontend
// - Để bypass ổn định hơn: dùng proxy/backend riêng, swap adapter tại đây

import type { UserProfile } from "./tiktokTypes";

// ─── Main fetch function ──────────────────────────────────────────────────────

export async function fetchTikTokProfile(username: string): Promise<UserProfile> {
  const profileUrl = `https://www.tiktok.com/@${encodeURIComponent(username)}`;

  let response: Response;
  try {
    response = await fetch(profileUrl, {
      headers: {
        // Giả lập browser request để tránh block cơ bản
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-cache",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
      },
      redirect: "follow",
    });
  } catch {
    throw new Error("Cannot connect to TikTok. Check your network.");
  }

  if (response.status === 404) {
    throw new Error(`User @${username} does not exist on TikTok`);
  }

  if (!response.ok) {
    throw new Error(`TikTok returned HTTP ${response.status}`);
  }

  const html = await response.text();
  return parseProfileFromHtml(html, username);
}

// ─── HTML Parser ─────────────────────────────────────────────────────────────

function parseProfileFromHtml(html: string, username: string): UserProfile {
  // Phát hiện trang captcha / bot check
  if (
    html.includes("tiktok.com/captcha") ||
    html.includes("verifyPage") ||
    (html.includes("robot") && html.length < 5000)
  ) {
    throw new Error(
      "TikTok is blocking automated requests. Try again in a few minutes."
    );
  }

  // Tìm script chứa data nhúng
  const scriptMatch = html.match(
    /<script\s+id="__UNIVERSAL_DATA_FOR_REHYDRATION__"[^>]*>([\s\S]*?)<\/script>/
  );

  if (!scriptMatch?.[1]) {
    // Fallback: thử tìm __NEXT_DATA__
    return parseFromNextData(html, username);
  }

  let data: Record<string, unknown>;
  try {
    data = JSON.parse(scriptMatch[1]);
  } catch {
    throw new Error("Failed to parse TikTok profile data. Page structure may have changed.");
  }

  // Path: data.__DEFAULT_SCOPE__["webapp.user-detail"].userInfo
  const scope = data["__DEFAULT_SCOPE__"] as Record<string, unknown> | undefined;
  const userDetail = scope?.["webapp.user-detail"] as Record<string, unknown> | undefined;
  const userInfo = userDetail?.["userInfo"] as Record<string, unknown> | undefined;

  if (!userInfo) {
    throw new Error(`User @${username} not found or profile is private`);
  }

  return extractUserProfile(userInfo, username);
}

// Fallback: parse từ __NEXT_DATA__ (cấu trúc cũ hơn của TikTok)
function parseFromNextData(html: string, username: string): UserProfile {
  const nextDataMatch = html.match(
    /<script\s+id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/
  );

  if (!nextDataMatch?.[1]) {
    throw new Error(
      "Could not find profile data. TikTok may have changed its page structure."
    );
  }

  let data: Record<string, unknown>;
  try {
    data = JSON.parse(nextDataMatch[1]);
  } catch {
    throw new Error("Failed to parse TikTok page data.");
  }

  // __NEXT_DATA__ path: props.pageProps.userInfo
  const props = data["props"] as Record<string, unknown> | undefined;
  const pageProps = props?.["pageProps"] as Record<string, unknown> | undefined;
  const userInfo = pageProps?.["userInfo"] as Record<string, unknown> | undefined;

  if (!userInfo) {
    throw new Error(`User @${username} not found`);
  }

  return extractUserProfile(userInfo, username);
}

// ─── Data Extraction ──────────────────────────────────────────────────────────

function extractUserProfile(
  userInfo: Record<string, unknown>,
  fallbackUsername: string
): UserProfile {
  const user = userInfo["user"] as Record<string, unknown> | undefined;
  const stats = userInfo["stats"] as Record<string, unknown> | undefined;

  if (!user) {
    throw new Error("Invalid profile data structure from TikTok");
  }

  // Helper để lấy số an toàn
  const safeNum = (val: unknown): number | null => {
    if (typeof val === "number") return val;
    if (typeof val === "string") {
      const parsed = parseInt(val, 10);
      return isNaN(parsed) ? null : parsed;
    }
    return null;
  };

  // Helper để lấy string an toàn
  const safeStr = (val: unknown): string =>
    typeof val === "string" ? val.trim() : "";

  return {
    username: safeStr(user["uniqueId"]) || fallbackUsername,
    displayName: safeStr(user["nickname"]) || fallbackUsername,
    avatar:
      safeStr(user["avatarLarger"]) ||
      safeStr(user["avatarMedium"]) ||
      safeStr(user["avatarThumb"]) ||
      "",
    bio: safeStr(user["signature"]),
    verified: Boolean(user["verified"]),
    privateAccount: Boolean(user["privateAccount"]),
    openFavorite: Boolean(user["openFavorite"]),
    region: safeStr(user["region"]) || null,
    language: safeStr(user["language"]) || null,
    accountCreated: null, // TikTok không expose createTime trên public profile

    // Stats — lấy từ stats object, fallback về null nếu không có
    followers: safeNum(stats?.["followerCount"]),
    following: safeNum(stats?.["followingCount"]),
    likes: safeNum(stats?.["heartCount"]) ?? safeNum(stats?.["heart"]),
    videoCount: safeNum(stats?.["videoCount"]),
    diggCount: safeNum(stats?.["diggCount"]),
  };
}
