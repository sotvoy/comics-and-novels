'use client';

import Script from 'next/script';

interface AnalyticsProps {
  domain?: string;
}

export default function PlausibleAnalytics({ domain }: AnalyticsProps) {
  const plausibleDomain = domain || 'comics-and-novels.vercel.app';
  
  // Only load in production
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <Script
      defer
      data-domain={plausibleDomain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
