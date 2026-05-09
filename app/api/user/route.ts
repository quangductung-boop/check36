// app/api/user/route.ts
// API Route: GET /api/user?username=xxx
// Dễ dàng thay thế mock bằng API thật (RapidAPI, Scraper, v.v.) sau này

import { NextRequest, NextResponse } from "next/server";
import { fetchUserProfile } from "@/lib/mockData";

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  // Validate đầu vào
  if (!username || username.trim().length === 0) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  if (username.length > 30 || !/^[a-zA-Z0-9._]+$/.test(username)) {
    return NextResponse.json(
      { error: "Invalid username format" },
      { status: 400 }
    );
  }

  try {
    const user = await fetchUserProfile(username);
    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 404 }
    );
  }
}
