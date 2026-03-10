'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Icons from '@/components/ui/Icons';

interface Comment {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  seriesTitle: string;
  chapterNumber?: number;
  likes: number;
  replies: number;
  status: 'pending' | 'approved' | 'reported' | 'deleted';
  createdAt: string;
}

const demoComments: Comment[] = [
  {
    id: '1',
    userId: 'user1',
    username: 'MangaFan2024',
    avatar: 'https://picsum.photos/seed/u1/100/100',
    content: 'This chapter was amazing! The art is getting better and better. Cant wait for the next one!',
    seriesTitle: 'Solo Leveling',
    chapterNumber: 180,
    likes: 156,
    replies: 12,
    status: 'approved',
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    userId: 'user2',
    username: 'WebtoonLover',
    avatar: 'https://picsum.photos/seed/u2/100/100',
    content: 'Why does the MC always have to be so op? Its getting boring...',
    seriesTitle: 'Solo Leveling',
    chapterNumber: 180,
    likes: 23,
    replies: 45,
    status: 'approved',
    createdAt: '2024-01-15T11:00:00Z',
  },
  {
    id: '3',
    userId: 'user3',
    username: 'NewbieReader',
    avatar: 'https://picsum.photos/seed/u3/100/100',
    content: 'First time reading this series and im loving it! Started from chapter 1.',
    seriesTitle: 'Tower of God',
    chapterNumber: 580,
    likes: 89,
    replies: 5,
    status: 'pending',
    createdAt: '2024-01-15T12:00:00Z',
  },
  {
    id: '4',
    userId: 'user4',
    username: 'Spammer123',
    avatar: 'https://picsum.photos/seed/u4/100/100',
    content: 'Check out my profile for free diamonds! DM me now!!!',
    seriesTitle: 'Solo Leveling',
    chapterNumber: 179,
    likes: 0,
    replies: 0,
    status: 'reported',
    createdAt: '2024-01-14T15:00:00Z',
  },
  {
    id: '5',
    userId: 'user5',
    username: 'NovelEnthusiast',
    avatar: 'https://picsum.photos/seed/u5/100/100',
    content: 'The character development in this arc is phenomenal. Jinwoo really shines here.',
    seriesTitle: 'Solo Leveling',
    chapterNumber: 178,
    likes: 234,
    replies: 18,
    status: 'approved',
    createdAt: '2024-01-14T10:00:00Z',
  },
];

export default function CommentModeration() {
  const [comments, setComments] = useState<Comment[]>(demoComments);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'reported'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);

  const filteredComments = comments.filter(comment => {
    if (filter !== 'all' && filter !== 'reported' && comment.status !== filter) return false;
    if (filter === 'reported' && comment.status !== 'reported') return false;
    if (searchQuery && !comment.content.toLowerCase().includes(searchQuery.toLowerCase()) 
        && !comment.username.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const pendingCount = comments.filter(c => c.status === 'pending').length;

  const handleApprove = (id: string) => {
    setComments(prev => prev.map(c => c.id === id ? { ...c, status: 'approved' as const } : c));
  };

  const handleReject = (id: string) => {
    setComments(prev => prev.map(c => c.id === id ? { ...c, status: 'deleted' as const } : c));
  };

  const handleReport = (id: string) => {
    setComments(prev => prev.map(c => c.id === id ? { ...c, status: 'reported' as const } : c));
  };

  const handleRestore = (id: string) => {
    setComments(prev => prev.map(c => c.id === id ? { ...c, status: 'approved' as const } : c));
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Comments</h2>
          {pendingCount > 0 && (
            <p className="text-sm text-orange-500">{pendingCount} pending approval</p>
          )}
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search comments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as typeof filter)}
          className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg focus:outline-none"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="reported">Reported</option>
        </select>
      </div>

      {/* Comment Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'Total', count: comments.length, color: 'bg-gray-100 dark:bg-gray-800' },
          { label: 'Pending', count: pendingCount, color: 'bg-orange-100 dark:bg-orange-900/30' },
          { label: 'Approved', count: comments.filter(c => c.status === 'approved').length, color: 'bg-green-100 dark:bg-green-900/30' },
          { label: 'Reported', count: comments.filter(c => c.status === 'reported').length, color: 'bg-red-100 dark:bg-red-900/30' },
        ].map((stat) => (
          <div key={stat.label} className={`${stat.color} rounded-lg p-3 text-center`}>
            <p className="text-2xl font-bold">{stat.count}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Comment List */}
      <div className="space-y-3">
        {filteredComments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Icons.Chat className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No comments found</p>
          </div>
        ) : (
          filteredComments.map((comment) => (
            <motion.div
              key={comment.id}
              layout
              className={`p-4 bg-gray-100 dark:bg-gray-800 rounded-xl ${
                comment.status === 'pending' ? 'border-l-4 border-orange-500' : ''
              } ${comment.status === 'reported' ? 'border-l-4 border-red-500' : ''}`}
            >
              <div className="flex gap-3">
                {/* Avatar */}
                <img
                  src={comment.avatar}
                  alt={comment.username}
                  className="w-10 h-10 rounded-full object-cover"
                />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{comment.username}</span>
                    <span className="text-xs text-gray-500">{formatTime(comment.createdAt)}</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      comment.status === 'approved' ? 'bg-green-500/20 text-green-500' :
                      comment.status === 'pending' ? 'bg-orange-500/20 text-orange-500' :
                      comment.status === 'reported' ? 'bg-red-500/20 text-red-500' :
                      'bg-gray-500/20 text-gray-500'
                    }`}>
                      {comment.status}
                    </span>
                  </div>
                  
                  <Link
                    href={`/series/${comment.seriesTitle.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-xs text-red-500 hover:underline"
                  >
                    {comment.seriesTitle} {comment.chapterNumber && `Ch. ${comment.chapterNumber}`}
                  </Link>

                  <p className="mt-2 text-sm">{comment.content}</p>

                  {/* Actions */}
                  <div className="flex items-center gap-4 mt-3">
                    <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500">
                      <Icons.Heart className="w-4 h-4" />
                      {comment.likes}
                    </button>
                    <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500">
                      <Icons.MessageCircle className="w-4 h-4" />
                      {comment.replies}
                    </button>
                    
                    {comment.status === 'pending' && (
                      <div className="flex gap-2 ml-auto">
                        <button
                          onClick={() => handleApprove(comment.id)}
                          className="px-3 py-1 bg-green-500 text-white rounded text-xs font-medium hover:bg-green-600"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(comment.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded text-xs font-medium hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </div>
                    )}

                    {comment.status === 'approved' && (
                      <button
                        onClick={() => handleReport(comment.id)}
                        className="ml-auto px-3 py-1 text-xs text-gray-500 hover:text-red-500"
                      >
                        Report
                      </button>
                    )}

                    {comment.status === 'reported' && (
                      <div className="flex gap-2 ml-auto">
                        <button
                          onClick={() => handleRestore(comment.id)}
                          className="px-3 py-1 bg-green-500 text-white rounded text-xs font-medium hover:bg-green-600"
                        >
                          Restore
                        </button>
                        <button
                          onClick={() => handleReject(comment.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded text-xs font-medium hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
