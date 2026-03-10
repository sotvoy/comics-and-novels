'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icons from '@/components/ui/Icons';

interface ScheduledContent {
  id: string;
  seriesTitle: string;
  chapterNumber: number;
  scheduledFor: string;
  status: 'scheduled' | 'published' | 'cancelled';
  cover?: string;
}

const demoScheduled: ScheduledContent[] = [
  { id: '1', seriesTitle: 'Solo Leveling', chapterNumber: 181, scheduledFor: '2024-01-20T10:00:00', status: 'scheduled', cover: 'https://picsum.photos/seed/solo/300/450' },
  { id: '2', seriesTitle: 'Solo Leveling', chapterNumber: 182, scheduledFor: '2024-01-27T10:00:00', status: 'scheduled', cover: 'https://picsum.photos/seed/solo/300/450' },
  { id: '3', seriesTitle: 'Tower of God', chapterNumber: 581, scheduledFor: '2024-01-21T12:00:00', status: 'scheduled', cover: 'https://picsum.photos/seed/tower/300/450' },
  { id: '4', seriesTitle: 'Omniscient Reader', chapterNumber: 181, scheduledFor: '2024-01-22T18:00:00', status: 'scheduled', cover: 'https://picsum.photos/seed/omni/300/450' },
];

export default function ContentScheduling() {
  const [scheduledContent, setScheduledContent] = useState<ScheduledContent[]>(demoScheduled);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('10:00');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true
    });
  };

  const getDaysUntil = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (days < 0) return 'Past';
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    return `In ${days} days`;
  };

  const handleCancel = (id: string) => {
    setScheduledContent(prev => prev.filter(c => c.id !== id));
  };

  const handlePublishNow = (id: string) => {
    // In real app, would trigger publish
    setScheduledContent(prev => prev.filter(c => c.id !== id));
    alert('Content published!');
  };

  // Group by date
  const groupedContent = scheduledContent.reduce((acc, content) => {
    const date = content.scheduledFor.split('T')[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(content);
    return acc;
  }, {} as Record<string, ScheduledContent[]>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Content Schedule</h2>
          <p className="text-sm text-gray-500">{scheduledContent.length} chapters scheduled</p>
        </div>
        <button
          onClick={() => setShowScheduleModal(true)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center gap-2"
        >
          <Icons.Plus className="w-4 h-4" />
          Schedule Chapter
        </button>
      </div>

      {/* Calendar View */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
            <Icons.ChevronLeft className="w-5 h-5" />
          </button>
          <h3 className="font-semibold">January 2024</h3>
          <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
            <Icons.ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
          {Array.from({ length: 35 }, (_, i) => {
            const day = i - 3; // Start from Dec 31 to account for offset
            const date = new Date(2024, 0, day);
            const dateStr = date.toISOString().split('T')[0];
            const hasContent = groupedContent[dateStr]?.length > 0;
            const isToday = dateStr === new Date().toISOString().split('T')[0];
            
            return (
              <div
                key={i}
                className={`aspect-square p-1 rounded-lg flex flex-col items-center justify-start text-xs ${
                  day < 1 || day > 31 
                    ? 'text-gray-300 dark:text-gray-600' 
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer'
                } ${isToday ? 'bg-red-500 text-white hover:bg-red-600' : ''}`}
              >
                <span className="font-medium">{day > 0 && day <= 31 ? day : ''}</span>
                {hasContent && (
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-0.5" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Scheduled Content List */}
      <div className="space-y-4">
        {Object.entries(groupedContent).length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Icons.Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No content scheduled</p>
            <button
              onClick={() => setShowScheduleModal(true)}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Schedule Your First Chapter
            </button>
          </div>
        ) : (
          Object.entries(groupedContent).map(([date, contents]) => (
            <div key={date}>
              <h3 className="font-medium text-gray-500 mb-3">{formatDate(date)}</h3>
              <div className="space-y-2">
                {contents.map((content) => (
                  <motion.div
                    key={content.id}
                    layout
                    className="flex items-center gap-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-xl"
                  >
                    {/* Cover */}
                    <div className="w-12 h-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                      {content.cover && (
                        <img src={content.cover} alt="" className="w-full h-full object-cover" />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{content.seriesTitle}</p>
                      <p className="text-sm text-gray-500">Chapter {content.chapterNumber}</p>
                    </div>

                    {/* Time */}
                    <div className="text-right">
                      <p className="text-sm font-medium">{formatTime(content.scheduledFor)}</p>
                      <p className={`text-xs ${
                        getDaysUntil(content.scheduledFor) === 'Today' ? 'text-orange-500' :
                        getDaysUntil(content.scheduledFor) === 'Tomorrow' ? 'text-blue-500' :
                        'text-gray-500'
                      }`}>
                        {getDaysUntil(content.scheduledFor)}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handlePublishNow(content.id)}
                        className="px-3 py-1.5 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600"
                      >
                        Publish Now
                      </button>
                      <button
                        onClick={() => handleCancel(content.id)}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-gray-500"
                      >
                        <Icons.Close className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Schedule Modal */}
      <AnimatePresence>
        {showScheduleModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setShowScheduleModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4">Schedule Chapter</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Series</label>
                  <select className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-900 rounded-lg">
                    <option>Solo Leveling</option>
                    <option>Tower of God</option>
                    <option>Omniscient Reader</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Chapter Number</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-900 rounded-lg"
                    placeholder="e.g., 183"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Publish Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-900 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Publish Time</label>
                  <input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-900 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowScheduleModal(false);
                    alert('Chapter scheduled!');
                  }}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600"
                >
                  Schedule
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
