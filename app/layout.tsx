import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import TopBar from '@/components/layout/TopBar';
import BottomBar from '@/components/layout/BottomBar';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TopBar />
            <main className="min-h-screen pb-16 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
              {children}
            </main>
            <BottomBar />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
