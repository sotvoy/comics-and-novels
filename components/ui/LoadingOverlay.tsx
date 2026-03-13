'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingState {
  isLoading: boolean;
  message?: string;
}

/**
 * LoadingOverlay Component
 * 
 * Global loading system that shows on page transitions
 * and during async operations.
 */
export default function LoadingOverlay() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Show loading on route change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 flex flex-col items-center gap-4"
          >
            <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {message || 'Loading...'}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Loading state manager hook
export function useLoading() {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: false,
    message: ''
  });

  const showLoading = (msg?: string) => setLoadingState({ isLoading: true, message: msg });
  const hideLoading = () => setLoadingState({ isLoading: false, message: '' });

  return { loadingState, showLoading, hideLoading };
}
