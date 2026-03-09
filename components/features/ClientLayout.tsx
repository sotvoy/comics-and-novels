'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9999] bg-gradient-to-br from-red-600 via-red-500 to-pink-500 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Logo */}
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-24 h-24 mx-auto mb-6 bg-white rounded-2xl flex items-center justify-center shadow-2xl"
              >
                <span className="text-4xl font-black text-red-600">C&N</span>
              </motion.div>
              
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-white mb-2"
              >
                C&N
              </motion.h1>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-white/80 text-sm"
              >
                Read Comics & Novels Online
              </motion.p>

              {/* Loading bar */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '60%' }}
                transition={{ duration: 2, ease: 'linear' }}
                className="h-1 bg-white/50 mx-auto mt-8 rounded-full"
              />
            </motion.div>
            
            {/* Skip button */}
            <button
              onClick={() => setShowIntro(false)}
              className="absolute bottom-8 right-8 text-white/70 hover:text-white text-sm"
            >
              Skip →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
