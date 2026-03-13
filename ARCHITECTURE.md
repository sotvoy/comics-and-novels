# C&N - Comics & Novels Platform Architecture

## Technology Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | Next.js 14 (React) + TypeScript + Tailwind CSS |
| **Hosting** | Vercel |
| **Backend** | Supabase (PostgreSQL + Edge Functions) |
| **Database** | Supabase PostgreSQL |
| **Authentication** | Supabase Auth |
| **Storage** | Cloudinary |
| **Analytics** | Plausible |
| **Error Tracking** | Sentry |

## Total Pages/Components: 150+

## CARD SYSTEM

Each card contains a link to the **Series Info Page** (`/series/[slug]`)

### Card Information Display:
- Series Cover Image
- Series Title
- Author/Creator Name
- Chapter Count
- Like Count (with heart icon)
- Comment Count (with comment icon)
- Time Since Update

Cards are clickable and navigate to the Series Info Page.

---

## HOME SYSTEM (120+ Pages)

### Main Home Sections (Category Pills Navigation)

| Page | Route | Description |
|------|-------|-------------|
| **All** | `/` | Main home - all comics + novels |
| **For You** | `/for-you` | Personalized recommendations |
| **New** | `/new` | Newly added content |
| **Recent** | `/recent` | Recently updated |
| **Popular** | `/popular` | Popular now |
| **Trending** | `/trending` | Trending content |
| **Shorts** | `/shorts` | Short comics/novels |
| **Top Ranking** | `/ranking` | Top ranked content |
| **Events** | `/events` | Special events |
| **News** | `/news` | Latest news |
| **Community** | `/community` | Community posts |

Each section contains **comics + novels** mixed together.

### Content Type Pages

| Page | Route | Description |
|------|-------|-------------|
| Comics | `/comics` | All comics only |
| Novels | `/novels` | All novels only |
| Manga | `/manga` | Japanese comics |
| Manhwa | `/manhwa` | Korean comics |
| Manhua | `/manhua` | Chinese comics |
| Audiobooks | `/audiobooks` | Audio content |

### Library Pages

| Page | Route |
|------|-------|
| My List | `/my-list` |
| Favorites | `/favorites` |
| History | `/history` |
| Watch Later | `/watch-later` |
| Collections | `/collections` |
| Playlists | `/playlists` |

### Creator Pages

| Page | Route |
|------|-------|
| Creator Studio | `/creator` |
| Publish Art | `/publish-art` |
| Write Stories | `/write-stories` |
| Upload Comic | `/upload/comic` |
| Upload Novel | `/upload/novel` |

### Social Pages

| Page | Route |
|------|-------|
| Following | `/following` |
| Profile | `/profile` |
| Messages | `/messages` |
| Notifications | `/notifications` |

### Discovery Pages

| Page | Route |
|------|-------|
| Discover | `/discover` |
| Search | `/search` |
| Leaderboard | `/leaderboard` |
| Achievements | `/achievements` |

### Additional Pages

- `/settings` - App settings
- `/login` - User login
- `/register` - User registration
- `/series/[slug]` - Series detail
- `/read/[slug]/[chapter]` - Chapter reader
- `/quests` - Daily quests
- `/levels` - User levels
- `/activity` - Activity feed
- `/organizations` - Organizations
- `/author/[slug]` - Author profile
- And more...

---

## CORE APP SHELL (Load on Every Page)

| Component | Description |
|-----------|-------------|
| **TopBar** | Navigation header with menu, search, notifications |
| **BottomBar** | Mobile bottom navigation |
| **FloatingChatWindow** | Draggable global chat |
| **NotificationCenter** | Notification dropdown |
| **ThemeManager** | Light/Dark mode provider |
| **ModalSystem** | Global modal manager |
| **LoadingSystem** | Page transition loading overlay |
| **PWAController** | Service worker registration |
| **OfflineCacheController** | Offline detection & caching |

## Components (40+)

- TopBar, BottomBar
- AppShell, LoadingOverlay, ModalManager
- FloatingChatWindow, OfflineCacheController
- CategoryPills, Icons, NotificationDropdown
- SearchAutocomplete, AnimatedButtons
- AIAssistant, WorldChat, AudioPlayer
- SeriesCard, ReadingProgress
- LoginForm, RegisterForm
- BookmarkButton, FollowButton
- CommentsSection, ReportButton
- And more...

## Deployment

Automatic deployment to Vercel on GitHub push.

## License

MIT
