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

---

## CAROUSEL SYSTEM

Each carousel contains these components:

| Component | Description |
|-----------|-------------|
| **ComicCard** | Card display for comic series |
| **NovelCard** | Card display for novel series |
| **SeriesInfoPopup** | Quick info popup on hover/tap |
| **QuickActionsMenu** | Like, bookmark, share, follow buttons |

---

## CARD SYSTEM

Each card contains a link to the **Series Info Page** (`/series/[slug]`)

- Series Cover Image
- Series Title
- Author/Creator Name
- Chapter Count
- Like Count (heart icon)
- Comment Count (comment icon)
- Time Since Update

---

## COMIC SERIES PAGE

Route: `/series/[slug]`

### Components:

| Component | Description |
|-----------|-------------|
| **ComicSeriesPage** | Main series page wrapper |
| **ComicSeriesOverview** | Banner, cover, description, genres, status |
| **ComicSeriesChapters** | Chapter list with numbers, titles, dates |
| **ComicSeriesComments** | User comments and replies |
| **ComicSeriesRatings** | User ratings and reviews |
| **ComicSeriesRecommendations** | Similar series suggestions |
| **ComicSeriesRelated** | Related series recommendations |
| **ComicSeriesDiscussion** | Fan discussion threads |
| **ComicSeriesFanArt** | Fan art gallery |
| **ComicSeriesNews** | Series-related news and updates |

---

## NOVEL SERIES PAGE

Route: `/novels/[slug]`

Similar components as Comic Series Page with novel-specific formatting.

---

## HOME SYSTEM (120+ Pages)

### Main Home Sections

| Page | Route |
|------|-------|
| All | `/` |
| For You | `/for-you` |
| New | `/new` |
| Recent | `/recent` |
| Popular | `/popular` |
| Trending | `/trending` |
| Shorts | `/shorts` |
| Top Ranking | `/ranking` |
| Events | `/events` |
| News | `/news` |
| Community | `/community` |

### Content Type Pages

| Page | Route |
|------|-------|
| Comics | `/comics` |
| Novels | `/novels` |
| Manga | `/manga` |
| Manhwa | `/manhwa` |
| Manhua | `/manhua` |
| Audiobooks | `/audiobooks` |

### Library Pages

| Page | Route |
|------|-------|
| My List | `/my-list` |
| Favorites | `/favorites` |
| History | `/history` |
| Watch Later | `/watch-later` |
| Collections | `/collections` |

### Creator Pages

| Page | Route |
|------|-------|
| Creator Studio | `/creator` |
| Upload Comic | `/upload/comic` |
| Upload Novel | `/upload/novel` |

### Social Pages

| Page | Route |
|------|-------|
| Following | `/following` |
| Profile | `/profile` |
| Messages | `/messages` |
| Notifications | `/notifications` |

---

## CORE APP SHELL

| Component | Description |
|-----------|-------------|
| **TopBar** | Navigation header |
| **BottomBar** | Mobile bottom nav |
| **FloatingChatWindow** | Global chat |
| **NotificationCenter** | Notifications |
| **ThemeManager** | Dark mode |
| **ModalSystem** | Global modals |
| **LoadingSystem** | Page transitions |
| **PWAController** | PWA support |
| **OfflineCacheController** | Offline support |

---

## Deployment

Automatic deployment to Vercel on GitHub push.

## License

MIT
