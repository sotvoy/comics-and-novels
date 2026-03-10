'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Icons from '@/components/ui/Icons';

interface Chapter {
  id: string;
  number: number;
  title: string;
  status: 'published' | 'draft' | 'scheduled';
  publishedAt: string;
  views?: number;
  likes?: number;
}

interface Series {
  id: string;
  slug: string;
  title: string;
  cover: string;
  type: 'comic' | 'novel';
  status: 'ongoing' | 'completed' | 'hiatus';
  chapters: Chapter[];
}

interface SeriesManagementProps {
  userId?: string;
}

// Demo data
const demoSeries: Series[] = [
  {
    id: '1',
    slug: 'solo-leveling',
    title: 'Solo Leveling',
    cover: 'https://picsum.photos/seed/solo/300/450',
    type: 'comic',
    status: 'ongoing',
    chapters: [
      { id: '1', number: 180, title: 'Chapter 180', status: 'published', publishedAt: '2024-01-15', views: 50000, likes: 5000 },
      { id: '2', number: 179, title: 'Chapter 179', status: 'published', publishedAt: '2024-01-10', views: 48000, likes: 4800 },
      { id: '3', number: 178, title: 'Chapter 178', status: 'draft', publishedAt: '' },
      { id: '4', number: 177, title: 'Chapter 177', status: 'scheduled', publishedAt: '2024-01-20' },
    ],
  },
  {
    id: '2',
    slug: 'tower-of-god',
    title: 'Tower of God',
    cover: 'https://picsum.photos/seed/tower/300/450',
    type: 'comic',
    status: 'ongoing',
    chapters: [
      { id: '5', number: 580, title: 'Chapter 580', status: 'published', publishedAt: '2024-01-14', views: 45000, likes: 4200 },
      { id: '6', number: 579, title: 'Chapter 579', status: 'published', publishedAt: '2024-01-07', views: 42000, likes: 4000 },
    ],
  },
];

export default function SeriesManagement({ userId }: SeriesManagementProps) {
  const [selectedSeries, setSelectedSeries] = useState<Series | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'ongoing' | 'completed' | 'hiatus'>('all');

  const filteredSeries = filter === 'all' 
    ? demoSeries 
    : demoSeries.filter(s => s.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500';
      case 'draft': return 'bg-gray-500';
      case 'scheduled': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const handleDeleteChapter = (chapterId: string) => {
    if (!selectedSeries) return;
    // In real app, would call API
    setSelectedSeries(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        chapters: prev.chapters.filter(c => c.id !== chapterId)
      };
    });
    setShowDeleteModal(null);
  };

  const handleReorderChapters = (startIndex: number, endIndex: number) => {
    if (!selectedSeries) return;
    
    const chapters = [...selectedSeries.chapters];
    const [removed] = chapters.splice(startIndex, 1);
    chapters.splice(endIndex, 0, removed);
    
    // Renumber chapters
    chapters.forEach((ch, i) => {
      ch.number = chapters.length - i;
    });
    
    setSelectedSeries({ ...selectedSeries, chapters });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Your Series</h2>
        <Link
          href="/creator/create"
          className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center gap-2"
        >
          <Icons.Plus className="w-4 h-4" />
          New Series
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {(['all', 'ongoing', 'completed', 'hiatus'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === status
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Series Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSeries.map((series) => (
          <motion.div
            key={series.id}
            layout
            className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Series Cover */}
            <div className="relative aspect-[2/3]">
              <img
                src={series.cover}
                alt={series.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  series.status === 'ongoing' ? 'bg-green-500' :
                  series.status === 'completed' ? 'bg-blue-500' : 'bg-gray-500'
                } text-white`}>
                  {series.status}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                <h3 className="font-semibold text-white">{series.title}</h3>
                <p className="text-xs text-white/70">{series.chapters.length} chapters</p>
              </div>
            </div>

            {/* Actions */}
            <div className="p-3 flex gap-2">
              <button
                onClick={() => setSelectedSeries(series)}
                className="flex-1 px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Manage Chapters
              </button>
              <Link
                href={`/series/${series.slug}/upload`}
                className="px-3 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
              >
                <Icons.Plus className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chapter Management Modal */}
      <AnimatePresence>
        {selectedSeries && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setSelectedSeries(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="font-semibold text-lg">{selectedSeries.title}</h3>
                  <p className="text-sm text-gray-500">{selectedSeries.chapters.length} chapters</p>
                </div>
                <button
                  onClick={() => setSelectedSeries(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <Icons.Close className="w-5 h-5" />
                </button>
              </div>

              {/* Chapter List */}
              <div className="overflow-y-auto max-h-96">
                {selectedSeries.chapters.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <Icons.Folder className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No chapters yet</p>
                    <Link
                      href={`/series/${selectedSeries.slug}/upload`}
                      className="mt-4 inline-block px-4 py-2 bg-red-500 text-white rounded-lg text-sm"
                    >
                      Upload First Chapter
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {selectedSeries.chapters.map((chapter, index) => (
                      <div
                        key={chapter.id}
                        className="flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      >
                        {/* Drag Handle */}
                        <div className="cursor-move text-gray-400 hover:text-gray-600">
                          <Icons.Menu className="w-4 h-4" />
                        </div>

                        {/* Chapter Number */}
                        <span className="w-12 text-sm font-medium text-gray-500">
                          #{chapter.number}
                        </span>

                        {/* Chapter Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{chapter.title}</p>
                          {chapter.views && (
                            <p className="text-xs text-gray-500">
                              {chapter.views.toLocaleString()} views • {chapter.likes?.toLocaleString()} likes
                            </p>
                          )}
                        </div>

                        {/* Status Badge */}
                        <span className={`px-2 py-1 rounded text-xs text-white ${getStatusColor(chapter.status)}`}>
                          {chapter.status}
                        </span>

                        {/* Date */}
                        {chapter.publishedAt && (
                          <span className="text-xs text-gray-500 w-20 text-right">
                            {new Date(chapter.publishedAt).toLocaleDateString()}
                          </span>
                        )}

                        {/* Actions */}
                        <div className="flex gap-1">
                          <button
                            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                            title="Edit"
                          >
                            <Icons.Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setShowDeleteModal(chapter.id)}
                            className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-500"
                            title="Delete"
                          >
                            <Icons.Close className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                <Link
                  href={`/series/${selectedSeries.slug}/upload`}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                >
                  <Icons.Plus className="w-4 h-4 inline mr-2" />
                  Add Chapter
                </Link>
                <button
                  onClick={() => setSelectedSeries(null)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setShowDeleteModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Icons.Info className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-center mb-2">Delete Chapter?</h3>
              <p className="text-gray-500 text-center mb-6">
                This action cannot be undone. The chapter will be permanently deleted.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(null)}
                  className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteChapter(showDeleteModal)}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
