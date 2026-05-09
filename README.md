# Check User 🌸

> Instantly look up public profile information — followers, likes, videos and more.

## ✨ Features

- 🔍 Search any public username
- 📊 Beautiful stats dashboard (followers, likes, videos, engagement)
- 🌸 Animated falling petals background
- 💎 Glassmorphism UI with smooth Framer Motion animations
- ⚡ Skeleton loading, error & empty states
- 📱 Fully responsive on mobile & desktop
- 🚀 Ready to deploy on Vercel

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 (App Router) | Framework |
| Tailwind CSS v4 | Styling |
| Framer Motion | Animations |
| lucide-react | Icons |
| Plus Jakarta Sans | Typography |

## 📁 Project Structure

```
check-user-app/
├── app/
│   ├── api/
│   │   └── user/
│   │       └── route.ts        # API endpoint GET /api/user?username=
│   ├── globals.css             # Global styles + Tailwind
│   ├── layout.tsx              # Root layout + metadata
│   └── page.tsx                # Main page (state manager)
├── components/
│   ├── FlowerBackground.tsx    # Canvas falling petals animation
│   ├── Header.tsx              # Fixed glassmorphism header
│   ├── SearchBar.tsx           # Username input + quick try chips
│   ├── UserOverviewCard.tsx    # Avatar, name, bio, badges
│   ├── UserDashboard.tsx       # Full result dashboard
│   ├── StatsCard.tsx           # Reusable metric card
│   ├── SkeletonLoader.tsx      # Loading skeleton with shimmer
│   ├── EmptyState.tsx          # Initial state UI
│   └── ErrorState.tsx          # Not found / error UI
├── lib/
│   └── mockData.ts             # Types + mock users + helpers
├── public/
├── vercel.json                 # Vercel deployment config
└── next.config.ts              # Next.js config (image domains)
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000)

## 🌐 Deploy to Vercel

### Option 1 — Vercel CLI
```bash
npm i -g vercel
vercel --prod
```

### Option 2 — GitHub Import
1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your repo → Deploy (zero config needed!)

## 🔌 Replacing Mock Data with a Real API

In `lib/mockData.ts`, replace the `fetchUserProfile` function body with your real API call:

```typescript
export async function fetchUserProfile(username: string): Promise<UserProfile> {
  const res = await fetch(`https://your-api.com/user/${username}`);
  if (!res.ok) throw new Error("User not found");
  return res.json();
}
```

The UI will work automatically with no other changes needed.

## 🎮 Demo Usernames

Try these built-in demo accounts:
- `ducanhnbs` — Verified account with large following
- `tiktok` — Official TikTok account
- `demo` — Simple demo user

---

Made with 🌸 by **@ducanhnbs** — Thank you!
