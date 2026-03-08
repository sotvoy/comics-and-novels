# C&N - Read Comics & Novels Online

A production-ready mobile-first web application for reading comics and novels, inspired by YouTube, Comick.io, Wattpad, Webtoon, and gamification elements from popular games.

## Features

### Core Features
- 📱 Mobile-first responsive design
- 📖 Comics & Novels reading platform
- 🔍 Advanced search with genre filters
- 👤 User profiles with achievements
- 💬 Comments system with replies
- ⭐ Ratings & likes
- 🔖 Bookmarks & reading history
- 👥 Following system

### Navigation (YouTube Style)
- Top bar with drawer, dropdowns, search
- Bottom navigation: Home, My List, Create, Following, Profile
- Category pills: All, For You, Top, New, Recent, Popular, Ranking, News, Post, Community

### Pages
- **Home** - Featured carousel, new chapters, popular content
- **Comics/Novels** - Browse by content type
- **Search** - Multi-genre filter, sorting
- **Series** - Detailed info, chapters list, comments
- **Reading** - Full-screen reader with navigation
- **Profile** - User info, uploads, achievements
- **Settings** - Theme, notifications, reading preferences

### Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase (Backend)
- Zustand (State)
- TanStack Query

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/sotvoy/comics-and-novels.git
cd comics-and-novels

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### GitHub Pages
```bash
npm run build
# Deploy .next/static to pages
```

## Project Structure

```
app/                    # Next.js app router pages
├── comics/            # Comics browse page
├── novels/           # Novels browse page
├── search/           # Search page with filters
├── series/[slug]/    # Series detail page
├── read/[slug]/[chapter]/ # Reading page
├── profile/          # User profile
├── settings/         # Settings page
├── following/        # Following page
└── my-list/         # Bookmarks/history

components/
├── layout/          # TopBar, BottomBar
├── providers/       # Supabase, Theme providers
└── ui/              # Icons, UI components

store/               # Zustand state management
types/               # TypeScript types
database/            # SQL schema
```

## License

MIT
