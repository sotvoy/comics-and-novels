'use client';

import { useEffect, useCallback } from 'react';

interface UseKeyboardNavigationOptions {
  onNextChapter?: () => void;
  onPrevChapter?: () => void;
  onNextPage?: () => void;
  onPrevPage?: () => void;
  onToggleFullscreen?: () => void;
  onToggleSettings?: () => void;
  onToggleChapters?: () => void;
  onToggleAutoScroll?: () => void;
  onScrollUp?: () => void;
  onScrollDown?: () => void;
  onGoHome?: () => void;
  enabled?: boolean;
}

export function useKeyboardNavigation({
  onNextChapter,
  onPrevChapter,
  onNextPage,
  onPrevPage,
  onToggleFullscreen,
  onToggleSettings,
  onToggleChapters,
  onToggleAutoScroll,
  onScrollUp,
  onScrollDown,
  onGoHome,
  enabled = true,
}: UseKeyboardNavigationOptions) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Ignore if user is typing in an input
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement ||
      (e.target instanceof HTMLElement && e.target.isContentEditable)
    ) {
      return;
    }

    // Prevent default for our handled keys
    const handled = [
      'ArrowRight',
      'ArrowLeft',
      'ArrowUp',
      'ArrowDown',
      'Space',
      'Home',
      'End',
      'f',
      'F',
      's',
      'S',
      'c',
      'C',
      'a',
      'A',
      'Escape',
      'n',
      'p',
      'N',
      'P',
    ];

    if (handled.includes(e.key)) {
      e.preventDefault();
    }

    switch (e.key) {
      // Navigation keys
      case 'ArrowRight':
      case 'n':
      case 'N':
        // Next chapter
        onNextChapter?.();
        break;
      case 'ArrowLeft':
      case 'p':
      case 'P':
        // Previous chapter
        onPrevChapter?.();
        break;
      case 'ArrowUp':
      case 'w':
      case 'W':
        // Scroll up
        onScrollUp?.();
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        // Scroll down (but not toggle auto-scroll)
        if (!e.key.match(/^[sS]$/)) {
          onScrollDown?.();
        } else {
          onToggleAutoScroll?.();
        }
        break;
      case ' ':
        // Space - toggle auto-scroll or scroll down
        onToggleAutoScroll?.();
        break;
      case 'Home':
        // Go to top / first page
        window.scrollTo(0, 0);
        break;
      case 'End':
        // Go to bottom / last page
        window.scrollTo(0, document.body.scrollHeight);
        break;
      case 'f':
      case 'F':
        // Toggle fullscreen
        onToggleFullscreen?.();
        break;
      case 'c':
      case 'C':
        // Toggle chapter list
        onToggleChapters?.();
        break;
      case 'a':
      case 'A':
        // Toggle auto-scroll
        onToggleAutoScroll?.();
        break;
      case 'Escape':
        // Close modals or exit fullscreen
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
        break;
    }
  }, [
    onNextChapter,
    onPrevChapter,
    onNextPage,
    onPrevPage,
    onToggleFullscreen,
    onToggleSettings,
    onToggleChapters,
    onToggleAutoScroll,
    onScrollUp,
    onScrollDown,
    onGoHome,
  ]);

  useEffect(() => {
    if (!enabled) return;

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [enabled, handleKeyDown]);
}

// Keyboard shortcuts reference component
export function KeyboardShortcutsHelp() {
  const shortcuts = [
    { key: '← / N', action: 'Next chapter' },
    { key: '→ / P', action: 'Previous chapter' },
    { key: '↑ / W', action: 'Scroll up' },
    { key: '↓ / S', action: 'Scroll down' },
    { key: 'Space / A', action: 'Toggle auto-scroll' },
    { key: 'F', action: 'Toggle fullscreen' },
    { key: 'C', action: 'Toggle chapter list' },
    { key: 'Home', action: 'Go to top' },
    { key: 'End', action: 'Go to bottom' },
    { key: 'Esc', action: 'Exit fullscreen' },
  ];

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h4 className="font-semibold mb-3 text-sm">Keyboard Shortcuts</h4>
      <div className="space-y-2">
        {shortcuts.map((shortcut) => (
          <div key={shortcut.key} className="flex items-center justify-between text-sm">
            <kbd className="px-2 py-1 bg-white dark:bg-gray-700 rounded text-xs font-mono">
              {shortcut.key}
            </kbd>
            <span className="text-gray-600 dark:text-gray-400">{shortcut.action}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default useKeyboardNavigation;
