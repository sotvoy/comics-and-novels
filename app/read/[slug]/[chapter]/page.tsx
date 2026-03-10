'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Icons from '@/components/ui/Icons';

const demoPages = Array.from({ length: 15 }, (_, i) => `https://picsum.photos/seed/page${i + 1}/800/1200`);

export default function ReadPage() {
  const params = useParams();
  const { slug, chapter } = params;
  const [showSettings, setShowSettings] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showChapters, setShowChapters] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [background, setBackground] = useState('black');
  const [readingMode, setReadingMode] = useState('vertical');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoScroll, setAutoScroll] = useState(false);
  const [autoScrollSpeed, setAutoScrollSpeed] = useState(3);
  const [showControls, setShowControls] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle escape key to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowSettings(false);
        setShowShare(false);
        setShowChapters(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      autoScrollInterval.current = setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop += autoScrollSpeed;
        }
      }, 50);
    } else if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
    }

    return () => {
      if (autoScrollInterval.current) {
        clearInterval(autoScrollInterval.current);
      }
    };
  }, [autoScroll, autoScrollSpeed]);

  // Toggle fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Hide controls after 3 seconds of inactivity
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleActivity = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (!showSettings && !showShare && !showChapters) {
          setShowControls(false);
        }
      }, 3000);
    };

    document.addEventListener('mousemove', handleActivity);
    document.addEventListener('touchstart', handleActivity);
    
    return () => {
      document.removeEventListener('mousemove', handleActivity);
      document.removeEventListener('touchstart', handleActivity);
      clearTimeout(timeout);
    };
  }, [showSettings, showShare, showChapters]);

  // Close on backdrop click
  const handleBackdropClick = () => {
    setShowSettings(false);
    setShowShare(false);
    setShowChapters(false);
  };

  const chapterList = Array.from({ length: 15 }, (_, i) => ({
    number: i + 1,
    title: `Chapter ${i + 1}`
  }));

  return (
    <div 
      className="min-h-screen" 
      style={{ 
        backgroundColor: background,
        paddingTop: isMobile && isFullscreen ? '0' : 'env(safe-area-inset-top)',
        paddingBottom: isMobile ? 'calc(5rem + env(safe-area-inset-bottom))' : '5rem',
      }}
    >
      {/* Reader Controls - Hidden in mobile fullscreen */}
      <div className={`fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-black/80 to-transparent py-2 px-4 transition-opacity ${showControls && (!isMobile || !isFullscreen) ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex items-center justify-between">
          <Link href={`/series/${slug}`} className="text-white flex items-center gap-2">
            <Icons.Back /> <span className="text-sm">Back</span>
          </Link>
          <span className="text-white text-sm">Chapter {chapter}</span>
          <div className="flex gap-2">
            <button onClick={() => setShowChapters(true)} className="text-white" title="Chapters"><Icons.List /></button>
            <button onClick={toggleFullscreen} className="text-white" title="Fullscreen">
              {isFullscreen ? <Icons.FullscreenExit /> : <Icons.Fullscreen />}
            </button>
            <button onClick={() => setShowSettings(true)} className="text-white"><Icons.Settings /></button>
            <button onClick={() => setShowShare(true)} className="text-white"><Icons.Share /></button>
          </div>
        </div>
      </div>

      {/* Auto-scroll Control */}
      <div className={`fixed right-4 top-1/2 -translate-y-1/2 z-40 transition-opacity ${showControls && (!isMobile || !isFullscreen) ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="bg-black/50 backdrop-blur rounded-lg p-2 flex flex-col gap-2">
          <button 
            onClick={() => setAutoScroll(!autoScroll)}
            className={`p-2 rounded ${autoScroll ? 'bg-red-500 text-white' : 'text-white'}`}
            title="Auto-scroll"
          >
            <Icons.Play className="w-5 h-5" />
          </button>
          {autoScroll && (
            <div className="flex flex-col items-center gap-1">
              <button onClick={() => setAutoScrollSpeed(s => Math.max(1, s - 1))} className="text-white text-xs">-</button>
              <span className="text-white text-xs">{autoScrollSpeed}x</span>
              <button onClick={() => setAutoScrollSpeed(s => Math.min(10, s + 1))} className="text-white text-xs">+</button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div 
        ref={scrollRef}
        className={`reading-content pt-16 pb-24 ${isMobile ? 'scroll-snap-y' : ''}`} 
        style={{ 
          filter: `brightness(${brightness}%)`,
          scrollSnapType: isMobile ? 'y mandatory' : 'none'
        }}
      >
        {demoPages.map((page, index) => (
          <div key={index} className={isMobile ? 'scroll-snap-align-start' : ''}>
            <Image 
              src={page} 
              alt={`Page ${index + 1}`} 
              width={800} 
              height={1200} 
              className="w-full h-auto mx-auto max-w-3xl"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        ))}
      </div>

      {/* Bottom Navigation - Hidden in mobile fullscreen */}
      <div className={`fixed bottom-20 left-0 right-0 z-40 bg-gradient-to-t from-black/80 to-transparent py-4 px-4 transition-opacity pb-16 md:pb-4 ${showControls && (!isMobile || !isFullscreen) ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <Link href={`/read/${slug}/${Number(chapter) - 1}`} className="text-white px-4 py-2 bg-white/20 rounded-lg">Prev</Link>
          <Link href={`/series/${slug}`} className="text-white"><Icons.List /></Link>
          <Link href={`/read/${slug}/${Number(chapter) + 1}`} className="text-white px-4 py-2 bg-white/20 rounded-lg">Next</Link>
        </div>
      </div>

      {/* Action Bar - Hidden on reader pages when BottomBar is present */}
      <div 
        className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur p-3 z-50 pb-16 md:pb-3"
        style={{
          paddingBottom: isMobile ? 'calc(4rem + env(safe-area-inset-bottom))' : '0.75rem'
        }}
      >
        <div className="flex items-center justify-around max-w-lg mx-auto">
          <button className="flex flex-col items-center gap-1 text-white">
            <Icons.Heart className="w-5 h-5" />
            <span className="text-xs">Like</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-white">
            <Icons.Comment className="w-5 h-5" />
            <span className="text-xs">Comments</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-white">
            <Icons.Bookmark className="w-5 h-5" />
            <span className="text-xs">Save</span>
          </button>
          <button onClick={() => setShowShare(true)} className="flex flex-col items-center gap-1 text-white">
            <Icons.Share className="w-5 h-5" />
            <span className="text-xs">Share</span>
          </button>
          <button onClick={() => setShowSettings(true)} className="flex flex-col items-center gap-1 text-white">
            <Icons.Settings className="w-5 h-5" />
            <span className="text-xs">Settings</span>
          </button>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-end safe-area-bottom" onClick={handleBackdropClick}>
          <div className="bg-gray-900 rounded-t-2xl w-full p-6 max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6 sticky top-0 bg-gray-900 pt-2 -mx-2 px-2">
              <h2 className="text-white text-lg font-bold">Reader Settings</h2>
              <button onClick={() => setShowSettings(false)} className="text-white p-2"><Icons.Close /></button>
            </div>
            
            {/* Brightness */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-sm">Brightness</span>
                <span className="text-white/60 text-xs">{brightness}%</span>
              </div>
              <input 
                type="range" 
                min="30" 
                max="100" 
                value={brightness} 
                onChange={(e) => setBrightness(Number(e.target.value))} 
                className="w-full accent-red-500" 
              />
            </div>

            {/* Background */}
            <div className="mb-6">
              <span className="text-white text-sm block mb-3">Background</span>
              <div className="flex gap-3">
                {['black', '#1a1a2e', '#2d3436', '#636e72'].map((bg) => (
                  <button 
                    key={bg} 
                    onClick={() => setBackground(bg)} 
                    className={`w-10 h-10 rounded-full ${background === bg ? 'ring-2 ring-white' : ''}`} 
                    style={{ backgroundColor: bg }} 
                  />
                ))}
              </div>
            </div>

            {/* Reading Mode */}
            <div>
              <span className="text-white text-sm block mb-3">Reading Mode</span>
              <div className="flex gap-2">
                {['vertical', 'horizontal', 'webtoon'].map((mode) => (
                  <button 
                    key={mode} 
                    onClick={() => setReadingMode(mode)} 
                    className={`flex-1 py-2 rounded-lg text-sm capitalize ${readingMode === mode ? 'bg-red-500 text-white' : 'bg-gray-800 text-white/60'}`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShare && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-end safe-area-bottom" onClick={handleBackdropClick}>
          <div className="bg-gray-900 rounded-t-2xl w-full p-6 max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6 sticky top-0 bg-gray-900 pt-2 -mx-2 px-2">
              <h2 className="text-white text-lg font-bold">Share</h2>
              <button onClick={() => setShowShare(false)} className="text-white p-2"><Icons.Close /></button>
            </div>
            <div className="flex justify-around">
              <button className="flex flex-col items-center gap-2 text-white">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <Icons.Share className="w-6 h-6" />
                </div>
                <span className="text-xs">Facebook</span>
              </button>
              <button className="flex flex-col items-center gap-2 text-white">
                <div className="w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center">
                  <Icons.Share className="w-6 h-6" />
                </div>
                <span className="text-xs">Twitter</span>
              </button>
              <button className="flex flex-col items-center gap-2 text-white">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <Icons.Share className="w-6 h-6" />
                </div>
                <span className="text-xs">WhatsApp</span>
              </button>
              <button className="flex flex-col items-center gap-2 text-white" onClick={() => navigator.clipboard.writeText(window.location.href)}>
                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                  <Icons.Copy className="w-6 h-6" />
                </div>
                <span className="text-xs">Copy</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chapters Modal */}
      {showChapters && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-end safe-area-bottom" onClick={handleBackdropClick}>
          <div className="bg-gray-900 rounded-t-2xl w-full p-6 max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6 sticky top-0 bg-gray-900 pt-2 -mx-2 px-2">
              <h2 className="text-white text-lg font-bold">Chapters</h2>
              <button onClick={() => setShowChapters(false)} className="text-white p-2"><Icons.Close /></button>
            </div>
            <div className="space-y-2">
              {chapterList.map((ch) => (
                <Link 
                  key={ch.number} 
                  href={`/read/${slug}/${ch.number}`}
                  className={`block py-3 px-4 rounded-lg ${Number(chapter) === ch.number ? 'bg-red-500 text-white' : 'bg-gray-800 text-white/70'}`}
                >
                  {ch.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
