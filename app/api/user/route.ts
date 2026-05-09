// app/api/user/route.ts
// API Route: GET /api/user?username=xxx
// Edge Runtime — compatible với Cloudflare Pages (cần build bằng @cloudflare/next-on-pages)
//
// ⚙️ CLOUDFLARE PAGES BUILD CONFIG (quan trọng!):
//   Build command : npx @cloudflare/next-on-pages@1
//   Output dir    : .vercel/output/static
//   Nếu config sai → route này trả 500 → dùng `npm run pages:build` để kiểm tra local

import { NextRequest, NextResponse } from "next/server";
import { fetchTikTokProfile } from "@/lib/tiktokFetcher";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username");

  // ─── Validate input ───────────────────────────────────────────────────────
  if (!username || username.trim().length === 0) {
    return NextResponse.json(
      { success: false, error: "Username is required" },
      { status: 400 }
    );
  }

  const trimmed = username.trim().replace(/^@/, ""); // chấp nhận cả "@username"

  if (trimmed.length > 50 || !/^[a-zA-Z0-9._]+$/.test(trimmed)) {
    return NextResponse.json(
      { success: false, error: "Invalid username format" },
      { status: 400 }
    );
  }

  // ─── Fetch real data from TikTok ─────────────────────────────────────────
  try {
    const profile = await fetchTikTokProfile(trimmed);
    return NextResponse.json({ success: true, data: profile }, { status: 200 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to fetch profile";

    // Log để debug trên Cloudflare dashboard
    console.error(`[API /api/user] username=${trimmed} →`, message);

    // Phân loại lỗi để trả status phù hợp
    const isNotFound =
      message.toLowerCase().includes("not found") ||
      message.toLowerCase().includes("does not exist");
    const isBlocked =
      message.toLowerCase().includes("blocking") ||
      message.toLowerCase().includes("captcha") ||
      message.toLowerCase().includes("verification");

    const status = isNotFound ? 404 : isBlocked ? 503 : 500;

    return NextResponse.json(
      { success: false, error: message },
      { status }
    );
  }
}
