import './globals.css';
import QueryProvider from '@/components/providers/QueryProvider';
import TopBar from '@/components/layout/TopBar';
import BottomBar from '@/components/layout/BottomBar';
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
      <body>
        <QueryProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <TopBar />
            <div className="max-w-7xl mx-auto">
              <main className="min-h-screen pb-16 md:pb-4">
                {children}
              </main>
            </div>
            <BottomBar />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
