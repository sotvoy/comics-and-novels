'use client';

import { useState, useCallback, createContext, useContext, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icons from './Icons';

interface Modal {
  id: string;
  title?: string;
  content: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

interface ModalContextType {
  openModal: (modal: Omit<Modal, 'id'>) => void;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within ModalProvider');
  }
  return context;
}

/**
 * ModalManager Component
 * 
 * Global modal system that handles:
 * - Opening/closing modals
 * - Multiple modals stack
 * - Different modal sizes
 * - Backdrop click to close
 * - ESC key to close
 */
export default function ModalManager() {
  const [modals, setModals] = useState<Modal[]>([]);

  const openModal = useCallback((modal: Omit<Modal, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setModals(prev => [...prev, { ...modal, id }]);
  }, []);

  const closeModal = useCallback((id: string) => {
    setModals(prev => prev.filter(m => m.id !== id));
  }, []);

  const closeAllModals = useCallback(() => {
    setModals([]);
  }, []);

  const getSizeClasses = (size: Modal['size'] = 'md') => {
    switch (size) {
      case 'sm': return 'max-w-sm';
      case 'md': return 'max-w-md';
      case 'lg': return 'max-w-lg';
      case 'xl': return 'max-w-xl';
      case 'full': return 'max-w-4xl';
      default: return 'max-w-md';
    }
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, closeAllModals }}>
      <AnimatePresence>
        {modals.map((modal) => (
          <motion.div
            key={modal.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            onClick={() => closeModal(modal.id)}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full ${getSizeClasses(modal.size)} max-h-[90vh] overflow-y-auto`}
              onClick={(e) => e.stopPropagation()}
            >
              {modal.title && (
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-bold dark:text-white">{modal.title}</h3>
                  <button
                    onClick={() => closeModal(modal.id)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Icons.Close className="w-5 h-5" />
                  </button>
                </div>
              )}
              <div className="p-4">
                {modal.content}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </ModalContext.Provider>
  );
}
