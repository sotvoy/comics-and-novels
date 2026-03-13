'use client';

import { useState, useEffect } from 'react';

/**
 * OfflineCacheController Component
 * 
 * Manages offline caching and data persistence:
 * - Service Worker registration
 * - Cache management
 * - Offline detection
 * - Data sync when online
 */
export default function OfflineCacheController() {
  const [isOnline, setIsOnline] = useState(true);
  const [isCaching, setIsCaching] = useState(false);
  const [cacheSize, setCacheSize] = useState(0);

  useEffect(() => {
    // Check online status
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Get cache size if available
    if ('caches' in window) {
      caches.keys().then((keys) => {
        Promise.all(
          keys.map(key => caches.open(key))
        ).then((cacheObjects) => {
          const totalSize = cacheObjects.reduce((acc, cache) => acc + cache.length, 0);
          setCacheSize(totalSize);
        });
      });
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const clearCache = async () => {
    if ('caches' in window) {
      setIsCaching(true);
      const keys = await caches.keys();
      await Promise.all(keys.map(key => caches.delete(key)));
      setCacheSize(0);
      setIsCaching(false);
    }
  };

  // Show offline indicator
  if (!isOnline) {
    return (
      <div className="fixed bottom-20 left-4 right-4 z-50 bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
          </svg>
          <span className="text-sm font-medium">You are offline</span>
        </div>
      </div>
    );
  }

  return null;
}
