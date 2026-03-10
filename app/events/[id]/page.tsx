'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Icons from '@/components/ui/Icons';

const eventsData: Record<string, any> = {
  '1': {
    id: '1',
    title: 'Solo Leveling Marathon',
    description: 'Read all chapters and win exclusive badges! Join thousands of readers in this exciting marathon event. Complete all chapters to unlock special rewards.',
    image: 'https://picsum.photos/seed/eventdetail1/1200/600',
    type: 'ongoing',
    participants: 12500,
    daysLeft: 5,
    prizes: ['Exclusive Badge', '500 Coins', 'Premium Trial'],
    rules: [
      'Read at least 50 chapters of Solo Leveling',
      'Leave a review on the series',
      'Share your progress on social media',
    ],
    startDate: '2024-01-01',
    endDate: '2024-01-31',
  },
  '2': {
    id: '2',
    title: 'Creator Contest 2024',
    description: 'Showcase your creativity in our annual contest! Submit your original story and win amazing prizes. Open to all creators.',
    image: 'https://picsum.photos/seed/eventdetail2/1200/600',
    type: 'upcoming',
    participants: 0,
    daysLeft: 14,
    prizes: ['$10,000', 'Featured Series', 'Merchandise Pack'],
    rules: [
      'Original content only',
      'Minimum 10,000 words',
      'Submit before deadline',
    ],
    startDate: '2024-02-01',
    endDate: '2024-03-01',
  },
};

export default function EventDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const event = eventsData[id] || eventsData['1'];
  const [isJoined, setIsJoined] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20 md:pb-4">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-4 p-4">
          <Link href="/events" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <Icons.ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold">Event</h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Cover Image */}
        <div className="relative h-64 -mx-4 mb-4">
          <Image src={event.image} alt={event.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              event.type === 'ongoing' ? 'bg-green-500' : 
              event.type === 'upcoming' ? 'bg-blue-500' : 'bg-gray-500'
            } text-white`}>
              {event.type === 'ongoing' ? '🎮 Ongoing' : 
               event.type === 'upcoming' ? '📅 Upcoming' : '✅ Ended'}
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-2">{event.title}</h1>

        {/* Stats */}
        <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <Icons.Users className="w-4 h-4" /> {event.participants.toLocaleString()} participants
          </span>
          <span className="flex items-center gap-1">
            <Icons.Calendar className="w-4 h-4" /> {event.daysLeft} days left
          </span>
        </div>

        {/* Join Button */}
        <button 
          onClick={() => setIsJoined(!isJoined)}
          className={`w-full py-3 rounded-lg font-medium mb-6 ${
            isJoined 
              ? 'bg-gray-200 dark:bg-gray-700' 
              : 'bg-red-500 text-white'
          }`}
        >
          {isJoined ? '✓ Joined' : 'Join Event'}
        </button>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{event.description}</p>

        {/* Prizes */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">🏆 Prizes</h3>
          <div className="space-y-2">
            {event.prizes.map((prize: string, index: number) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <span className="text-xl">{index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}</span>
                <span className="font-medium">{prize}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rules */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">📋 Rules</h3>
          <ul className="space-y-2">
            {event.rules.map((rule: string, index: number) => (
              <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                <span className="text-red-500 mt-1">•</span>
                {rule}
              </li>
            ))}
          </ul>
        </div>

        {/* Timeline */}
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">📅 Timeline</h3>
          <div className="flex justify-between text-sm">
            <div>
              <p className="text-gray-500">Start Date</p>
              <p className="font-medium">{new Date(event.startDate).toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-500">End Date</p>
              <p className="font-medium">{new Date(event.endDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
