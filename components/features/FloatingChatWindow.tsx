'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icons from '@/components/ui/Icons';

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  time: string;
}

/**
 * FloatingChatWindow Component
 * 
 * Global chat window that can be dragged and positioned
 * anywhere on screen. Shows live chat messages.
 */
export default function FloatingChatWindow() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 100 });
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', user: 'Reader123', message: 'This chapter was amazing!', time: '2m ago' },
    { id: '2', user: 'ComicFan', message: 'Cant wait for the next one', time: '1m ago' },
  ]);

  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-24 right-4 z-40 w-14 h-14 bg-red-500 rounded-full shadow-lg flex items-center justify-center hover:bg-red-600 transition-colors"
        onClick={toggleChat}
      >
        <Icons.MessageCircle className="w-6 h-6 text-white" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            style={{ right: position.x, top: position.y }}
            className="fixed z-50 w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-red-500 text-white">
              <h3 className="font-bold">World Chat</h3>
              <div className="flex gap-2">
                <button onClick={() => setIsMinimized(true)} className="p-1 hover:bg-white/20 rounded">
                  <Icons.Minimize className="w-4 h-4" />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded">
                  <Icons.Close className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className="text-sm">
                  <span className="font-bold text-red-500">{msg.user}: </span>
                  <span className="text-gray-600 dark:text-gray-400">{msg.message}</span>
                  <span className="text-xs text-gray-400 ml-2">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-700">
              <input
                type="text"
                placeholder="Send a message..."
                className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
