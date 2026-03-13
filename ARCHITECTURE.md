# C&N - Comics & Novels Platform Architecture

## Technology Stack
| Component | Technology |
|-----------|------------|
| Frontend | Next.js 14 (React) + TypeScript + Tailwind CSS |
| Hosting | Vercel |
| Backend | Supabase (PostgreSQL + Edge Functions) |
| Database | Supabase PostgreSQL |
| Authentication | Supabase Auth |
| Storage | Cloudinary |
| Analytics | Plausible |
| Error Tracking | Sentry |

## Total UI Components: 250+

---

## COMICS SYSTEM (200+ Pages)

### Comics Home Pages
| Page | Route |
|------|-------|
| ComicsHome | /comics |
| ComicsTrending | /comics/trending |
| ComicsPopular | /comics/popular |
| ComicsNew | /comics/new |
| ComicsCompleted | /comics/completed |
| ComicsRanking | /comics/ranking |
| ComicsEvents | /comics/events |

### Comic Series Page
Route: /series/[slug]
| Component | Description |
|-----------|-------------|
| ComicSeriesPage | Main series page wrapper |
| ComicSeriesOverview | Banner, cover, description |
| ComicSeriesChapters | Chapter list |
| ComicSeriesComments | User comments |
| ComicSeriesRatings | User ratings |
| ComicSeriesRecommendations | Similar series |
| ComicSeriesRelated | Related series |
| ComicSeriesDiscussion | Fan discussion |
| ComicSeriesFanArt | Fan art gallery |
| ComicSeriesNews | Series news |

### Comic Reader Modes
| Component | Description |
|-----------|-------------|
| ComicReaderVertical | Vertical scroll (webtoon) |
| ComicReaderHorizontal | Horizontal page flip |
| ComicReaderFullscreen | Fullscreen immersive |
| ComicReaderOffline | Offline reading |
| ComicReaderNightMode | Dark theme |
| ComicReaderAutoScroll | Auto-scroll |
| ComicReaderPanelMode | Grid panel view |

### Reader Tools
| Component | Description |
|-----------|-------------|
| ReaderToolbar | Top toolbar |
| ReaderSettings | Settings panel |
| ReaderBookmarks | Save positions |
| ReaderChapterSelector | Chapter nav |
| ReaderDownloadManager | Download manager |

---

## NOVELS SYSTEM (Similar Structure)

---

## CAROUSEL SYSTEM
| Component |
|-----------|
| ComicCard |
| NovelCard |
| SeriesInfoPopup |
| QuickActionsMenu |

---

## CARD SYSTEM
Each card links to Series Info Page

---

## HOME SYSTEM (120+ Pages)
| Page | Route |
|------|-------|
| All | / |
| For You | /for-you |
| New | /new |
| Recent | /recent |
| Popular | /popular |
| Trending | /trending |
| Shorts | /shorts |
| Ranking | /ranking |
| Events | /events |
| News | /news |
| Community | /community |

---

## CORE APP SHELL
| Component |
|-----------|
| TopBar |
| BottomBar |
| FloatingChatWindow |
| NotificationCenter |
| ThemeManager |
| ModalSystem |
| LoadingSystem |
| PWAController |
| OfflineCacheController |

---

## Deployment
Auto-deploy to Vercel on GitHub push.

## License
MIT
