'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import TopBar from '@/components/layout/TopBar';
import BottomBar from '@/components/layout/BottomBar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <TopBar />
            <div className="max-w-7xl mx-auto">
              <main className="min-h-screen pb-16 md:pb-4">
                {children}
              </main>
            </div>
            <BottomBar />
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
