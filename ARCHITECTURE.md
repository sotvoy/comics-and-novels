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

---

# TOTAL UI SCALE

## Approximate Size:

| System | Components |
|--------|------------|
| Core Components | 40 |
| Home System | 150 |
| Comics System | 250 |
| Novels System | 220 |
| Search System | 100 |
| Genres System | 200 |
| Creator Studio | 180 |
| Community System | 120 |
| Profile System | 100 |
| Organizations | 80 |
| Chat System | 60 |
| Settings | 100 |

## Total ≈ 1600+ UI pages/components

---

## SETTINGS SYSTEM (100+ Pages)
| Page |
|------|
| SettingsGeneral |
| SettingsAccount |
| SettingsNotifications |
| SettingsPrivacy |
| SettingsSecurity |
| SettingsAppearance |
| SettingsTheme |
| SettingsReader |
| SettingsDownloads |
| SettingsLanguage |

---

## CHAT SYSTEM (60+ Pages)
| Page |
|------|
| WorldChat |
| SeriesChat |
| ChapterChat |
| PrivateMessages |
| GroupChat |
| ChatSettings |

---

## ORGANIZATION SYSTEM (80+ Pages)
| Page |
|------|
| OrganizationPage |
| OrganizationMembers |
| OrganizationSeries |
| OrganizationAnnouncements |
| OrganizationSettings |
| OrganizationRoles |

---

## PROFILE SYSTEM (100+ Pages)
| Page |
|------|
| ProfilePage |
| ProfileSeries |
| ProfileFavorites |
| ProfileReadingHistory |
| ProfileAchievements |
| ProfileFollowers |
| ProfileFollowing |
| ProfileOrganizations |
| ProfileSettings |

---

## COMMUNITY SYSTEM (120+ Pages)
| Page |
|------|
| CommunityHome |
| CommunityTrending |
| CommunityPosts |
| CommunityNews |
| CommunityEvents |
| CommunityPolls |
| CommunityMemes |
| CommunityFanArt |
| CommunityDiscussions |

---

## CREATOR STUDIO (180+ Pages)
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

---

## GENRES SYSTEM (200+ Pages)
50 genres × 4 pages each

---

## SEARCH SYSTEM (100+ Pages)
| Page |
|------|
| SearchPage |
| SearchComics |
| SearchNovels |
| SearchCreators |
| SearchGenres |
| SearchTags |

---

## COMICS SYSTEM (250+ Pages)
| Page |
|------|
| ComicsHome |
| ComicsTrending |
| ComicsPopular |
| ComicsNew |
| ComicsCompleted |
| ComicsRanking |
| ComicsEvents |

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

---

## NOVELS SYSTEM (220+ Pages)
| Page |
|------|
| NovelsHome |
| NovelsTrending |
| NovelsPopular |
| NovelsNew |
| NovelsCompleted |
| NovelsRanking |

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

## HOME SYSTEM (150+ Pages)
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

## CORE APP SHELL (40 Components)
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
