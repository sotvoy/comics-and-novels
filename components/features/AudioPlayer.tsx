'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icons from '@/components/ui/Icons';

interface AudioChapter {
  id: string;
  title: string;
  duration: number;
  narrator: string;
}

interface AudioBook {
  id: string;
  title: string;
  cover: string;
  author: string;
  chapters: AudioChapter[];
}

const sampleAudioBook: AudioBook = {
  id: '1',
  title: 'The Beginning After The End',
  cover: 'https://picsum.photos/seed/audio1/300/300',
  author: 'Turtle Feet',
  chapters: [
    { id: '1', title: 'Prologue: The End', duration: 1800, narrator: 'Pro Voice' },
    { id: '2', title: 'Chapter 1: Rebirth', duration: 2400, narrator: 'Pro Voice' },
    { id: '3', title: 'Chapter 2: New Life', duration: 2100, narrator: 'Pro Voice' },
    { id: '4', title: 'Chapter 3: Training Begins', duration: 1950, narrator: 'Pro Voice' },
    { id: '5', title: 'Chapter 4: First Test', duration: 2250, narrator: 'Pro Voice' },
  ]
};

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [showPlayer, setShowPlayer] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  const chapter = sampleAudioBook.chapters[currentChapter];
  const duration = chapter.duration;
  const currentTime = (progress / 100) * duration;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    setProgress(percent * 100);
  };

  const handleChapterChange = (index: number) => {
    setCurrentChapter(index);
    setProgress(0);
    setIsPlaying(true);
  };

  if (!showPlayer) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-20 right-4 z-40 w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-lg flex items-center justify-center"
        onClick={() => setShowPlayer(true)}
      >
        <span className="text-2xl">🎧</span>
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-20 right-4 z-40 w-80 bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="relative h-24 bg-cover" style={{ backgroundImage: `url(${sampleAudioBook.cover})` }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute top-2 right-2 flex gap-2">
          <button onClick={() => setPlaybackSpeed(playbackSpeed === 1 ? 1.5 : playbackSpeed === 1.5 ? 2 : 1)} className="w-8 h-8 bg-white/20 rounded-full text-white text-xs font-bold">
            {playbackSpeed}x
          </button>
          <button onClick={() => setShowPlayer(false)} className="w-8 h-8 bg-white/20 rounded-full text-white">
            <Icons.X className="w-4 h-4 mx-auto" />
          </button>
        </div>
        <div className="absolute bottom-2 left-2 right-2">
          <p className="text-white font-bold text-sm truncate">{sampleAudioBook.title}</p>
          <p className="text-gray-300 text-xs">{sampleAudioBook.author}</p>
        </div>
      </div>

      {/* Player Controls */}
      <div className="p-4">
        <p className="text-white text-sm font-medium mb-2">{chapter.title}</p>
        
        {/* Progress Bar */}
        <div className="mb-4" onClick={handleSeek}>
          <div className="h-1 bg-gray-600 rounded-full cursor-pointer">
            <motion.div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <button onClick={() => currentChapter > 0 && handleChapterChange(currentChapter - 1)} className="text-gray-400 hover:text-white">
            <Icons.SkipBack className="w-6 h-6" />
          </button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handlePlayPause}
            className="w-14 h-14 bg-white rounded-full flex items-center justify-center"
          >
            {isPlaying ? <Icons.Pause className="w-6 h-6 text-gray-900" /> : <Icons.Play className="w-6 h-6 text-gray-900 ml-1" />}
          </motion.button>
          <button onClick={() => currentChapter < sampleAudioBook.chapters.length - 1 && handleChapterChange(currentChapter + 1)} className="text-gray-400 hover:text-white">
            <Icons.SkipForward className="w-6 h-6" />
          </button>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2 mt-4">
          <Icons.Volume2 className="w-4 h-4 text-gray-400" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="flex-1 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Chapter List */}
      <div className="border-t border-gray-700 max-h-40 overflow-y-auto">
        {sampleAudioBook.chapters.map((chap, index) => (
          <button
            key={chap.id}
            onClick={() => handleChapterChange(index)}
            className={`w-full px-4 py-2 flex items-center justify-between text-left ${currentChapter === index ? 'bg-purple-500/20 text-purple-400' : 'text-gray-300 hover:bg-gray-700'}`}
          >
            <span className="text-sm">{index + 1}. {chap.title}</span>
            <span className="text-xs">{formatTime(chap.duration)}</span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
