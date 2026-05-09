// app/layout.tsx — Root layout: font, metadata, global styles

import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

// Font hiện đại, sạch, đọc tốt
const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Check User 🌸 — Public Profile Lookup",
  description:
    "Instantly look up public profile information — followers, likes, videos and more. Fast, clean, no login required.",
  keywords: ["check user", "profile lookup", "public info", "tiktok checker"],
  authors: [{ name: "ducanhnbs" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Check User 🌸",
    description: "Instantly look up public profile info — followers, likes, videos.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={font.variable}>
      <body className="font-jakarta antialiased">{children}</body>
    </html>
  );
}
