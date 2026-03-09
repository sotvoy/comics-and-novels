'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DailyRewards from './DailyRewards';
import BattlePass from './BattlePass';
import AIAssistant from './AIAssistant';
import WorldChat from './WorldChat';

interface FloatingButton {
  id: string;
  icon: string;
  label: string;
  color: string;
}

const buttons: FloatingButton[] = [
  { id: 'chat', icon: '💬', label: 'World Chat', color: 'from-blue-500 to-cyan-500' },
  { id: 'ai', icon: '🤖', label: 'AI Assistant', color: 'from-purple-500 to-pink-500' },
  { id: 'rewards', icon: '🎁', label: 'Daily Rewards', color: 'from-yellow-500 to-orange-500' },
  { id: 'battle', icon: '⚔️', label: 'Battle Pass', color: 'from-red-500 to-purple-500' },
  { id: 'audio', icon: '🎧', label: 'Audiobooks', color: 'from-green-500 to-teal-500' },
];

export default function FloatingControlCenter() {
  const [position, setPosition] = useState({ x: 20, y: 200 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [enabledButtons, setEnabledButtons] = useState<string[]>(['chat', 'ai', 'rewards', 'battle', 'audio']);
  const [showSettings, setShowSettings] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const buttonSize = 56;
  const edgeMargin = 10;

  const snapToEdge = useCallback((x: number, y: number) => {
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 375;
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 812;
    
    let newX = x;
    let newY = y;
    
    if (newX < screenWidth / 2) {
      newX = edgeMargin;
    } else {
      newX = screenWidth - buttonSize - edgeMargin;
    }
    
    newY = Math.max(edgeMargin + 60, Math.min(newY, screenHeight - buttonSize - 100));
    
    return { x: newX, y: newY };
  }, []);

  const handleDragStart = (clientX: number, clientY: number) => {
    setDragStart({ x: clientX - position.x, y: clientY - position.y });
    setIsDragging(true);
  };

  const handleDrag = useCallback((clientX: number, clientY: number) => {
    if (!isDragging) return;
    
    const newX = clientX - dragStart.x;
    const newY = clientY - dragStart.y;
    
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 375;
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 812;
    
    const boundedX = Math.max(0, Math.min(newX, screenWidth - buttonSize));
    const boundedY = Math.max(60, Math.min(newY, screenHeight - buttonSize - 80));
    
    setPosition({ x: boundedX, y: boundedY });
  }, [isDragging, dragStart]);

  const handleDragEnd = () => {
    if (isDragging) {
      const snapped = snapToEdge(position.x, position.y);
      setPosition(snapped);
    }
    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDrag(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleDragStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleDrag(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  const handleClick = () => {
    if (!isDragging) {
      setIsExpanded(!isExpanded);
    }
  };

  const handleLongPress = () => {
    setShowSettings(true);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => handleDragEnd();
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalMouseUp);
    
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, []);

  const toggleButton = (id: string) => {
    if (enabledButtons.includes(id)) {
      setEnabledButtons(enabledButtons.filter(b => b !== id));
    } else {
      setEnabledButtons([...enabledButtons, id]);
    }
  };

  const openModal = (id: string) => {
    setActiveModal(id);
    setIsExpanded(false);
  };

  return (
    <>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed z-[9999] cursor-move select-none"
        style={{
          left: position.x,
          top: position.y,
          touchAction: 'none',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
        onContextMenu={(e) => {
          e.preventDefault();
          handleLongPress();
        }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            scale: isDragging ? 1.2 : 1,
            boxShadow: isDragging 
              ? '0 10px 40px rgba(124, 58, 237, 0.6)' 
              : '0 4px 20px rgba(124, 58, 237, 0.4)'
          }}
          className={`
            w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-2xl
            bg-gradient-to-br from-violet-600 to-purple-600 border-4 border-white
            ${isDragging ? 'opacity-90' : ''}
          `}
        >
          {isExpanded ? '✕' : '🎮'}
        </motion.div>

        {isDragging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs"
          >
            ✋
          </motion.div>
        )}

        {!isExpanded && enabledButtons.length > 0 && (
          <div className="absolute -bottom-1 -right-1 flex -space-x-1">
            {enabledButtons.slice(0, 3).map((id) => {
              const btn = buttons.find(b => b.id === id);
              return btn ? (
                <span key={id} className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-xs shadow border-2 border-white">
                  {btn.icon}
                </span>
              ) : null;
            })}
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed z-[9998] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-4 w-[90vw] max-w-sm"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold dark:text-white">Quick access</h3>
              <button onClick={() => setIsExpanded(false)} className="text-gray-500">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {buttons.filter(b => enabledButtons.includes(b.id)).map((btn) => (
                <motion.button
                  key={btn.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openModal(btn.id)}
                  className={`flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r ${btn.color} text-white`}
                >
                  <span className="text-2xl">{btn.icon}</span>
                  <span className="font-bold">{btn.label}</span>
                </motion.button>
              ))}
            </div>

            <button
              onClick={() => setShowSettings(true)}
              className="w-full mt-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-medium"
            >
              ⚙️ Customize Buttons
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[10000] flex items-center justify-center p-4"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-4 w-full max-w-sm"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold mb-4 dark:text-white">Toggle Buttons</h3>
              <p className="text-sm text-gray-500 mb-4">Long press main button to enter edit mode</p>
              
              <div className="grid grid-cols-3 gap-3">
                {buttons.map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => toggleButton(btn.id)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl ${
                      enabledButtons.includes(btn.id)
                        ? 'bg-violet-100 dark:bg-violet-900'
                        : 'bg-gray-100 dark:bg-gray-800'
                    }`}
                  >
                    <span className="text-2xl">{btn.icon}</span>
                    <span className="text-xs dark:text-white">{btn.label}</span>
                    <div className={`w-8 h-4 rounded-full transition-colors ${
                      enabledButtons.includes(btn.id) ? 'bg-green-500' : 'bg-gray-300'
                    }`}>
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        enabledButtons.includes(btn.id) ? 'translate-x-4' : ''
                      }`} />
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowSettings(false)}
                className="w-full mt-4 py-3 bg-violet-600 text-white rounded-xl font-bold"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeModal === 'rewards' && <DailyRewards onClose={() => setActiveModal(null)} />}
        {activeModal === 'battle' && <BattlePass onClose={() => setActiveModal(null)} />}
        {activeModal === 'ai' && <AIAssistant onClose={() => setActiveModal(null)} />}
        {activeModal === 'chat' && <WorldChat />}
      </AnimatePresence>
    </>
  );
}
