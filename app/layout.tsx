import './globals.css';
import QueryProvider from '@/components/providers/QueryProvider';
import { AuthProvider } from '@/context/AuthContext';
import TopBar from '@/components/layout/TopBar';
import BottomBar from '@/components/layout/BottomBar';
import ServiceWorkerRegistration from '@/components/pwa/ServiceWorkerRegistration';
import PlausibleAnalytics from '@/components/analytics/PlausibleAnalytics';
import LoadingOverlay from '@/components/ui/LoadingOverlay';
import ModalManager from '@/components/ui/ModalManager';
import FloatingChatWindow from '@/components/features/FloatingChatWindow';
import OfflineCacheController from '@/components/pwa/OfflineCacheController';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'C&N - Read Comics & Novels Online',
  description: 'Your favorite platform for reading comics and novels online',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#ef4444" />
      </head>
      <body>
        <ServiceWorkerRegistration />
        <QueryProvider>
          <AuthProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
              <TopBar />
              <main className="min-h-screen pb-16 w-full">
                {children}
              </main>
              <BottomBar />
              <FloatingChatWindow />
              <OfflineCacheController />
            </div>
          </AuthProvider>
        </QueryProvider>
        <LoadingOverlay />
        <ModalManager />
        <PlausibleAnalytics />
      </body>
    </html>
  );
}
