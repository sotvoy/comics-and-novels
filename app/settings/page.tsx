'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Icons from '@/components/ui/Icons';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [showProgress, setShowProgress] = useState(true);
  const [publicProfile, setPublicProfile] = useState(true);
  const [dataSaver, setDataSaver] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20 md:pb-4">
      <div className="p-4">
        <h1 className="text-xl font-bold mb-6">Settings</h1>
        
        {/* Appearance */}
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 mb-3">Appearance</h2>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
            <h3 className="font-medium mb-3">Theme</h3>
            <div className="flex gap-2">
              {['light', 'dark', 'system'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`flex-1 py-2 rounded-lg text-sm capitalize flex items-center justify-center gap-2 ${
                    theme === t ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  {t === 'light' && '☀️'}
                  {t === 'dark' && '🌙'}
                  {t === 'system' && '💻'}
                  {t}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 mb-3">Notifications</h2>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <span>Push notifications</span>
              <div className="relative">
                <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-300 peer-checked:bg-red-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </div>
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span>Email notifications</span>
              <div className="relative">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-300 peer-checked:bg-red-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </div>
            </label>
          </div>
        </section>

        {/* Reading */}
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 mb-3">Reading</h2>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <span>Auto-advance chapters</span>
              <div className="relative">
                <input type="checkbox" checked={autoAdvance} onChange={() => setAutoAdvance(!autoAdvance)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-300 peer-checked:bg-red-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </div>
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span>Show reading progress</span>
              <div className="relative">
                <input type="checkbox" checked={showProgress} onChange={() => setShowProgress(!showProgress)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-300 peer-checked:bg-red-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </div>
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span>Remember my choices</span>
              <div className="relative">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-300 peer-checked:bg-red-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </div>
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span>Data saver mode</span>
              <div className="relative">
                <input type="checkbox" checked={dataSaver} onChange={() => setDataSaver(!dataSaver)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-300 peer-checked:bg-red-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </div>
            </label>
          </div>
        </section>

        {/* Privacy */}
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 mb-3">Privacy</h2>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <span>Make profile public</span>
              <div className="relative">
                <input type="checkbox" checked={publicProfile} onChange={() => setPublicProfile(!publicProfile)} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-300 peer-checked:bg-red-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </div>
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span>Show reading history</span>
              <div className="relative">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-300 peer-checked:bg-red-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </div>
            </label>
          </div>
        </section>

        {/* About */}
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 mb-3">About</h2>
          <div className="space-y-2">
            <Link href="/about" className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
              <span>About C&N</span>
              <Icons.ArrowRight />
            </Link>
            <Link href="/terms" className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
              <span>Terms of Service</span>
              <Icons.ArrowRight />
            </Link>
            <Link href="/privacy" className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
              <span>Privacy Policy</span>
              <Icons.ArrowRight />
            </Link>
            <Link href="/help" className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
              <span>Help & Support</span>
              <Icons.ArrowRight />
            </Link>
          </div>
        </section>

        {/* Version */}
        <div className="text-center text-sm text-gray-500">
          <p>C&N v1.0.0</p>
        </div>
      </div>
    </div>
  );
}
