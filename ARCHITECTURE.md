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

## CREATOR STUDIO (150+ Pages)

Creator dashboard like YouTube Studio.

### Creator Pages
| Page |
|------|
| CreatorDashboard |
| CreatorAnalytics |
| CreatorSeriesManager |
| CreatorChapterManager |
| CreatorUploadComic |
| CreatorUploadNovel |
| CreatorDraftManager |
| CreatorScheduledPosts |
| CreatorFollowers |
| CreatorMessages |
| CreatorOrganizations |

### Upload Tools
| Tool |
|------|
| ComicUploadWizard |
| NovelEditorMarkdown |
| NovelEditorWYSIWYG |
| ImageUploader |
| TagManager |
| GenreSelector |

---

## GENRES SYSTEM (120+ Pages)
50 genres × 4 pages each = 200+ pages

### Example Genres
| Genre |
|-------|
| GenreAction |
| GenreRomance |
| GenreFantasy |
| GenreAdventure |
| GenreDrama |
| GenreComedy |
| GenreHorror |
| GenreSciFi |
| GenreMystery |
| GenreHistorical |
| ... (50 total) |

### Each Genre Has 4 Pages
| Page Type |
|-----------|
| GenreTrending |
| GenrePopular |
| GenreNew |
| GenreTopRanking |

---

## SEARCH SYSTEM (80+ Pages)
Similar to YouTube search UI.
| Page |
|------|
| SearchPage |
| SearchComics |
| SearchNovels |
| SearchCreators |
| SearchGenres |
| SearchTags |

### Search Filters
| Component |
|-----------|
| SearchFilterGenres |
| SearchFilterTags |
| SearchFilterStatus |
| SearchFilterLanguage |
| SearchFilterPopularity |
| SearchFilterRating |
| SearchFilterDate |

### Advanced Search
| Component |
|-----------|
| MultiGenreSelector |
| TagSelector |
| ContentTypeSelector |

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
| Component |
|-----------|
| ComicSeriesPage |
| ComicSeriesOverview |
| ComicSeriesChapters |
| ComicSeriesComments |
| ComicSeriesRatings |
| ComicSeriesRecommendations |
| ComicSeriesRelated |
| ComicSeriesDiscussion |
| ComicSeriesFanArt |
| ComicSeriesNews |

### Comic Reader
| Component |
|-----------|
| ComicReaderVertical |
| ComicReaderHorizontal |
| ComicReaderFullscreen |
| ComicReaderOffline |
| ComicReaderNightMode |
| ComicReaderAutoScroll |
| ComicReaderPanelMode |

### Reader Tools
| Component |
|-----------|
| ReaderToolbar |
| ReaderSettings |
| ReaderBookmarks |
| ReaderChapterSelector |
| ReaderDownloadManager |

---

## NOVEL SYSTEM (200+ Pages)

### Novels Home Pages
| Page |
|------|
| NovelsHome |
| NovelsTrending |
| NovelsPopular |
| NovelsNew |
| NovelsCompleted |
| NovelsRanking |

### Novel Series Page
| Component |
|-----------|
| NovelSeriesPage |
| NovelSeriesOverview |
| NovelSeriesChapters |
| NovelSeriesReviews |
| NovelSeriesDiscussion |
| NovelSeriesFanArt |
| NovelSeriesRecommendations |

### Novel Reader
| Component |
|-----------|
| NovelReader |
| NovelReaderFullscreen |
| NovelReaderNightMode |
| NovelReaderOffline |
| NovelReaderAudio |
| NovelReaderBookmark |
| NovelReaderFontSettings |

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
| Page |
|------|
| All |
| For You |
| New |
| Recent |
| Popular |
| Trending |
| Shorts |
| Ranking |
| Events |
| News |
| Community |

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
