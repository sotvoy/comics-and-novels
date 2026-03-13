'use client';

import { ReactNode } from 'react';
import TopBar from '@/components/layout/TopBar';
import BottomBar from '@/components/layout/BottomBar';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { AuthProvider } from '@/context/AuthContext';
import { QueryProvider } from '@/components/providers/QueryProvider';
import ServiceWorkerRegistration from '@/components/pwa/ServiceWorkerRegistration';
import PlausibleAnalytics from '@/components/analytics/PlausibleAnalytics';
import LoadingOverlay from '@/components/ui/LoadingOverlay';
import ModalManager from '@/components/ui/ModalManager';

interface AppShellProps {
  children: ReactNode;
}

/**
 * Core App Shell Component
 * 
 * This component wraps all pages and provides:
 * - TopBar: Navigation header
 * - BottomBar: Mobile bottom navigation
 * - ThemeProvider: Light/Dark mode
 * - AuthProvider: User authentication
 * - QueryProvider: React Query
 * - ServiceWorkerRegistration: PWA support
 * - PlausibleAnalytics: Analytics tracking
 * - LoadingOverlay: Global loading state
 * - ModalManager: Global modal system
 */
export default function AppShell({ children }: AppShellProps) {
  return (
    <QueryProvider>
      <AuthProvider>
        <ThemeProvider>
          <ServiceWorkerRegistration />
          <PlausibleAnalytics />
          
          <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <TopBar />
            <main className="min-h-screen pb-16 w-full">
              {children}
            </main>
            <BottomBar />
          </div>
          
          <LoadingOverlay />
          <ModalManager />
        </ThemeProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
