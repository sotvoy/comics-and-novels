'use client';

import { useTheme } from 'next-themes';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-4">
      <h1 className="text-xl font-bold mb-6">Settings</h1>
      <div className="space-y-4">
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h3 className="font-medium mb-3">Appearance</h3>
          <div className="flex gap-2">
            {['light', 'dark', 'system'].map((t) => (
              <button key={t} onClick={() => setTheme(t)} className={`px-4 py-2 rounded-lg text-sm capitalize ${theme === t ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h3 className="font-medium mb-3">Notifications</h3>
          <label className="flex items-center justify-between"><span>Push notifications</span><input type="checkbox" className="toggle" defaultChecked /></label>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h3 className="font-medium mb-3">Reading</h3>
          <label className="flex items-center justify-between"><span>Auto-advance chapters</span><input type="checkbox" className="toggle" defaultChecked /></label>
          <label className="flex items-center justify-between mt-2"><span>Show reading progress</span><input type="checkbox" className="toggle" defaultChecked /></label>
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h3 className="font-medium mb-3">Privacy</h3>
          <label className="flex items-center justify-between"><span>Make profile public</span><input type="checkbox" className="toggle" defaultChecked /></label>
        </div>
      </div>
    </div>
  );
}
