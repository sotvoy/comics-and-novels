'use client';

import { useEffect, useState } from 'react';

export default function ServiceWorkerRegistration() {
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration.scope);
          setRegistered(true);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  // This component doesn't render anything
  return null;
}
