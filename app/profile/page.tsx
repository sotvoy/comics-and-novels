'use client';

import Link from 'next/link';
import Icons from '@/components/ui/Icons';

export default function ProfilePage() {
  const user = { username: 'Demo User', email: 'demo@cn.com', level: 15, exp: 12500, followers: 1234, following: 567, uploads: 12 };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-4">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 rounded-full bg-gray-300" />
        <div>
          <h1 className="text-xl font-bold">{user.username}</h1>
          <p className="text-sm text-gray-500">Level {user.level} • {user.exp} XP</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6 text-center">
        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"><p className="font-bold">{user.followers}</p><p className="text-xs text-gray-500">Followers</p></div>
        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"><p className="font-bold">{user.following}</p><p className="text-xs text-gray-500">Following</p></div>
        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"><p className="font-bold">{user.uploads}</p><p className="text-xs text-gray-500">Uploads</p></div>
      </div>
      <div className="space-y-2">
        <Link href="/profile/uploads" className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"><span className="font-medium">My Uploads</span><Icons.ArrowRight /></Link>
        <Link href="/profile/liked" className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"><span className="font-medium">Liked Content</span><Icons.ArrowRight /></Link>
        <Link href="/profile/bookmarks" className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"><span className="font-medium">Bookmarks</span><Icons.ArrowRight /></Link>
        <Link href="/profile/history" className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"><span className="font-medium">Reading History</span><Icons.ArrowRight /></Link>
        <Link href="/profile/achievements" className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg"><span className="font-medium">Achievements</span><Icons.ArrowRight /></Link>
      </div>
    </div>
  );
}
