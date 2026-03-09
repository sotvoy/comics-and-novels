'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DailyRewards from './DailyRewards';
import BattlePass from './BattlePass';
import AIAssistant from './AIAssistant';

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
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState({ x: 10, y: 180 });
  const [isDragging, setIsDragging] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [enabledButtons, setEnabledButtons] = useState<string[]>(['chat', 'ai', 'rewards', 'battle', 'audio']);
  const dragRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const rect = dragRef.current?.getBoundingClientRect();
    if (rect) {
      dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({ x: e.clientX - dragOffset.current.x, y: e.clientY - dragOffset.current.y });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

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
        ref={dragRef}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed z-50 cursor-move"
        style={{ left: position.x, top: position.y, touchAction: 'none' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Main Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-14 h-14 bg-gradient-to-br from-violet-600 to-purple-600 rounded-full shadow-xl flex items-center justify-center text-2xl border-4 border-white"
        >
          {isExpanded ? '✕' : '🎮'}
        </motion.div>

        {/* Expanded Menu */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="absolute bottom-16 left-0 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-3 min-w-[200px]"
            >
              <p className="text-xs text-gray-500 mb-2 px-2">Quick Access</p>
              <div className="space-y-2">
                {buttons.map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => openModal(btn.id)}
                    className={`w-full flex items-center gap-3 p-2 rounded-xl bg-gradient-to-r ${btn.color} text-white`}
                  >
                    <span className="text-xl">{btn.icon}</span>
                    <span className="font-medium text-sm">{btn.label}</span>
                  </button>
                ))}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 mt-3 pt-3">
                <p className="text-xs text-gray-500 mb-2 px-2">Toggle Buttons</p>
                <div className="flex flex-wrap gap-2 px-2">
                  {buttons.map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => toggleButton(btn.id)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                        enabledButtons.includes(btn.id)
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-300 text-gray-500'
                      }`}
                    >
                      {btn.icon}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Button Indicators */}
        {!isExpanded && enabledButtons.length > 0 && (
          <div className="absolute -bottom-2 -right-2 flex -space-x-1">
            {enabledButtons.slice(0, 3).map((id) => {
              const btn = buttons.find(b => b.id === id);
              return btn ? (
                <span key={id} className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-xs shadow">
                  {btn.icon}
                </span>
              ) : null;
            })}
            {enabledButtons.length > 3 && (
              <span className="w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs">
                +{enabledButtons.length - 3}
              </span>
            )}
          </div>
        )}
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {activeModal === 'rewards' && <DailyRewards onClose={() => setActiveModal(null)} />}
        {activeModal === 'battle' && <BattlePass onClose={() => setActiveModal(null)} />}
        {activeModal === 'ai' && <AIAssistant onClose={() => setActiveModal(null)} />}
      </AnimatePresence>
    </>
  );
}
