'use client';

import { useState, useEffect, useCallback } from 'react';

// Achievement types
interface Achievement {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  exp_reward: number;
  badge_url?: string;
}

interface UserAchievement extends Achievement {
  unlocked_at: string;
}

interface UserStats {
  level: number;
  exp: number;
  expToNext: number;
  streak: number;
  totalClaims: number;
}

// XP thresholds for each level
const XP_PER_LEVEL = 1000;

export function useGameFeatures(userId?: string) {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([]);
  const [stats, setStats] = useState<UserStats>({
    level: 1,
    exp: 0,
    expToNext: XP_PER_LEVEL,
    streak: 0,
    totalClaims: 0
  });
  const [canClaimDaily, setCanClaimDaily] = useState(false);
  const [loading, setLoading] = useState(true);

  // Calculate level from XP
  const calculateLevel = useCallback((exp: number) => {
    const level = Math.floor(exp / XP_PER_LEVEL) + 1;
    const expForCurrentLevel = exp % XP_PER_LEVEL;
    return {
      level,
      exp: expForCurrentLevel,
      expToNext: XP_PER_LEVEL
    };
  }, []);

  // Claim daily reward
  const claimDailyReward = useCallback(async () => {
    if (!canClaimDaily || !userId) return;
    
    // Simulated reward - in production this would call API
    const reward = 50 + Math.floor(Math.random() * 50); // 50-100 XP
    setStats(prev => {
      const newExp = prev.exp + reward;
      const levelInfo = calculateLevel(newExp);
      return {
        ...prev,
        ...levelInfo,
        streak: prev.streak + 1,
        totalClaims: prev.totalClaims + 1
      };
    });
    setCanClaimDaily(false);
  }, [canClaimDaily, userId, calculateLevel]);

  // Check daily reward availability
  useEffect(() => {
    if (!userId) {
      setCanClaimDaily(false);
      setLoading(false);
      return;
    }

    // In production, check last claim time from API
    const lastClaim = localStorage.getItem('last_daily_claim');
    if (lastClaim) {
      const lastClaimDate = new Date(lastClaim);
      const now = new Date();
      const hoursDiff = (now.getTime() - lastClaimDate.getTime()) / (1000 * 60 * 60);
      setCanClaimDaily(hoursDiff >= 24);
    } else {
      setCanClaimDaily(true);
    }

    // Load achievements
    setAchievements([
      { id: '1', name: 'First Read', slug: 'first-read', description: 'Read your first chapter', icon: '📖', exp_reward: 10 },
      { id: '2', name: 'Bookworm', slug: 'bookworm', description: 'Read 10 chapters', icon: '📚', exp_reward: 50 },
      { id: '3', name: 'Social Butterfly', slug: 'social-butterfly', description: 'Like 50 series', icon: '🦋', exp_reward: 100 },
      { id: '4', name: 'Chatty', slug: 'chatty', description: 'Leave 25 comments', icon: '💬', exp_reward: 75 },
      { id: '5', name: 'Daily Reader', slug: 'daily-reader', description: 'Login 7 days in a row', icon: '🔥', exp_reward: 100 },
      { id: '6', name: 'Weekly Reader', slug: 'weekly-reader', description: 'Login 30 days in a row', icon: '⚡', exp_reward: 300 },
    ]);

    // Load user data from localStorage (simulated)
    const savedExp = localStorage.getItem('user_exp');
    const savedStreak = localStorage.getItem('user_streak');
    const savedClaims = localStorage.getItem('user_total_claims');
    
    const exp = savedExp ? parseInt(savedExp) : 0;
    const levelInfo = calculateLevel(exp);
    
    setStats(prev => ({
      ...prev,
      ...levelInfo,
      streak: savedStreak ? parseInt(savedStreak) : 0,
      totalClaims: savedClaims ? parseInt(savedClaims) : 0
    }));

    // Load unlocked achievements
    const savedAchievements = localStorage.getItem('user_achievements');
    if (savedAchievements) {
      setUserAchievements(JSON.parse(savedAchievements));
    }

    setLoading(false);
  }, [userId, calculateLevel]);

  // Unlock achievement
  const unlockAchievement = useCallback(async (achievementId: string) => {
    const achievement = achievements.find(a => a.id === achievementId);
    if (!achievement || userAchievements.some(ua => ua.id === achievementId)) return;

    const newUserAchievement = {
      ...achievement,
      unlocked_at: new Date().toISOString()
    };

    setUserAchievements(prev => {
      const updated = [...prev, newUserAchievement];
      localStorage.setItem('user_achievements', JSON.stringify(updated));
      return updated;
    });

    // Add XP reward
    setStats(prev => {
      const newExp = prev.exp + achievement.exp_reward;
      const levelInfo = calculateLevel(newExp);
      localStorage.setItem('user_exp', String(newExp));
      return { ...prev, ...levelInfo };
    });
  }, [achievements, userAchievements, calculateLevel]);

  // Award XP
  const addXP = useCallback((amount: number) => {
    setStats(prev => {
      const newExp = prev.exp + amount;
      const levelInfo = calculateLevel(newExp);
      localStorage.setItem('user_exp', String(newExp));
      return { ...prev, ...levelInfo };
    });
  }, [calculateLevel]);

  return {
    achievements,
    userAchievements,
    stats,
    canClaimDaily,
    claimDailyReward,
    unlockAchievement,
    addXP,
    loading
  };
}

export default useGameFeatures;
