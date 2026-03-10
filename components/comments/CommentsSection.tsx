'use client';

import { useState } from 'react';
import Image from 'next/image';
import Icons from '@/components/ui/Icons';

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
    level: number;
    badge?: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  replies: Comment[];
  isLiked?: boolean;
}

interface CommentsSectionProps {
  seriesId?: string;
  chapterId?: string;
}

const demoComments: Comment[] = [
  {
    id: '1',
    user: { name: 'MangaKing99', avatar: 'https://picsum.photos/seed/u1/100/100', level: 45, badge: '🔥' },
    content: 'This chapter was absolutely incredible! The artwork keeps getting better every week. Cannot wait for the next one!',
    timestamp: '2 hours ago',
    likes: 156,
    isLiked: false,
    replies: [
      {
        id: '1-1',
        user: { name: 'ReaderPro', avatar: 'https://picsum.photos/seed/u2/100/100', level: 32 },
        content: 'Totally agree! The author is on fire 🔥',
        timestamp: '1 hour ago',
        likes: 24,
        replies: []
      }
    ]
  },
  {
    id: '2',
    user: { name: 'OtakuMaster', avatar: 'https://picsum.photos/seed/u3/100/100', level: 67, badge: '👑' },
    content: 'The plot twist at the end caught me off guard! This series never disappoints.',
    timestamp: '5 hours ago',
    likes: 89,
    isLiked: true,
    replies: []
  },
  {
    id: '3',
    user: { name: 'AnimeFan2024', avatar: 'https://picsum.photos/seed/u4/100/100', level: 12 },
    content: 'Just started reading this and already hooked! Which chapter should I start from?',
    timestamp: '8 hours ago',
    likes: 15,
    replies: [
      {
        id: '3-1',
        user: { name: 'MangaKing99', avatar: 'https://picsum.photos/seed/u1/100/100', level: 45 },
        content: 'Start from chapter 1, trust me! The world building is amazing.',
        timestamp: '7 hours ago',
        likes: 8,
        replies: []
      }
    ]
  },
];

export default function CommentsSection({ seriesId, chapterId }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>(demoComments);
  const [newComment, setNewComment] = useState('');
  const [sortBy, setSortBy] = useState<'top' | 'newest'>('top');
  const [showReplies, setShowReplies] = useState<Record<string, boolean>>({});

  const handleLike = (commentId: string) => {
    const updateComments = (comments: Comment[]): Comment[] => {
      return comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked
          };
        }
        if (comment.replies.length > 0) {
          return { ...comment, replies: updateComments(comment.replies) };
        }
        return comment;
      });
    };
    setComments(updateComments(comments));
  };

  const toggleReplies = (commentId: string) => {
    setShowReplies(prev => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const submitComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      user: { name: 'You', avatar: 'https://picsum.photos/seed/you/100/100', level: 1 },
      content: newComment,
      timestamp: 'Just now',
      likes: 0,
      isLiked: false,
      replies: []
    };
    
    setComments([comment, ...comments]);
    setNewComment('');
  };

  const totalComments = comments.reduce((acc, c) => acc + 1 + c.replies.length, 0);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 mt-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">
          💬 Comments <span className="text-gray-500">({totalComments})</span>
        </h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'top' | 'newest')}
          className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm"
        >
          <option value="top">Top</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {/* New Comment Input */}
      <div className="flex gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold flex-shrink-0">
          Y
        </div>
        <div className="flex-1">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
            rows={2}
          />
          <div className="flex justify-end gap-2 mt-2">
            <button className="px-4 py-2 text-gray-500 font-medium">Cancel</button>
            <button 
              onClick={submitComment}
              disabled={!newComment.trim()}
              className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium disabled:opacity-50"
            >
              Comment
            </button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-3">
            {/* Main Comment */}
            <div className="flex gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <Image src={comment.user.avatar} alt={comment.user.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-sm">{comment.user.name}</span>
                  <span className="text-xs text-gray-500">Lv.{comment.user.level}</span>
                  {comment.user.badge && <span>{comment.user.badge}</span>}
                  <span className="text-xs text-gray-400">• {comment.timestamp}</span>
                </div>
                <p className="text-sm">{comment.content}</p>
                <div className="flex items-center gap-4 mt-2">
                  <button 
                    onClick={() => handleLike(comment.id)}
                    className={`flex items-center gap-1 text-sm ${comment.isLiked ? 'text-red-500' : 'text-gray-500'}`}
                  >
                    <Icons.Heart className="w-4 h-4" />
                    <span>{comment.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-sm text-gray-500">
                    <Icons.MessageCircle className="w-4 h-4" />
                    <span>Reply</span>
                  </button>
                  <button className="flex items-center gap-1 text-sm text-gray-500">
                    <Icons.Share className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>

                {/* Replies */}
                {comment.replies.length > 0 && (
                  <div className="mt-3 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                    <button 
                      onClick={() => toggleReplies(comment.id)}
                      className="text-sm text-red-500 font-medium mb-2"
                    >
                      {showReplies[comment.id] ? 'Hide' : 'View'} {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
                    </button>
                    
                    {showReplies[comment.id] && comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-3 mt-3">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                          <Image src={reply.user.avatar} alt={reply.user.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-sm">{reply.user.name}</span>
                            <span className="text-xs text-gray-500">Lv.{reply.user.level}</span>
                            <span className="text-xs text-gray-400">• {reply.timestamp}</span>
                          </div>
                          <p className="text-sm">{reply.content}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <button className="flex items-center gap-1 text-sm text-gray-500">
                              <Icons.Heart className="w-4 h-4" />
                              <span>{reply.likes}</span>
                            </button>
                            <button className="flex items-center gap-1 text-sm text-gray-500">
                              <Icons.MessageCircle className="w-4 h-4" />
                              <span>Reply</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <button className="w-full mt-6 py-3 text-center text-red-500 font-medium">
        Load more comments
      </button>
    </div>
  );
}
