'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icons from '@/components/ui/Icons';

const events = [
  { id: 1, type: 'ongoing', title: 'Solo Leveling Marathon', desc: 'Read all chapters and win exclusive badges!', image: 'https://picsum.photos/seed/event1/800/400', participants: 12500, daysLeft: 5 },
  { id: 2, type: 'upcoming', title: 'Creator Contest 2024', desc: 'Submit your original story and win $10,000!', image: 'https://picsum.photos/seed/event2/800/400', participants: 0, daysLeft: 14 },
  { id: 3, type: 'ended', title: 'Summer Reading Challenge', desc: 'Read 100 chapters this summer', image: 'https://picsum.photos/seed/event3/800/400', participants: 45000, daysLeft: 0 },
];

const news = [
  { id: 1, title: 'Tower of God Season 3 Announced', date: '2 hours ago', image: 'https://picsum.photos/seed/news1/400/200' },
  { id: 2, title: 'New Series: The Reincarnated Assassin', date: '5 hours ago', image: 'https://picsum.photos/seed/news2/400/200' },
  { id: 3, title: 'Server Maintenance Notice', date: '1 day ago', image: null },
];

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState('events');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20 md:pb-4">
      <div className="sticky top-14 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="flex overflow-x-auto hide-scrollbar">
          <button
            onClick={() => setActiveTab('events')}
            className={`flex-1 min-w-[100px] py-3 text-sm font-medium border-b-2 ${
              activeTab === 'events' ? 'border-red-500 text-red-500' : 'border-transparent text-gray-500'
            }`}
          >
            Events
          </button>
          <button
            onClick={() => setActiveTab('news')}
            className={`flex-1 min-w-[100px] py-3 text-sm font-medium border-b-2 ${
              activeTab === 'news' ? 'border-red-500 text-red-500' : 'border-transparent text-gray-500'
            }`}
          >
            News
          </button>
        </div>
      </div>

      <div className="p-4">
        {activeTab === 'events' && (
          <div className="space-y-4">
            {/* Active Events */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Active Events</h2>
              {events.filter(e => e.type === 'ongoing').map((event) => (
                <div key={event.id} className="relative rounded-2xl overflow-hidden mb-4">
                  <Image src={event.image} alt={event.title} width={800} height={400} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="inline-block px-2 py-0.5 bg-green-500 text-white text-xs rounded mb-2">ONGOING</span>
                    <h3 className="text-white font-bold text-lg">{event.title}</h3>
                    <p className="text-white/80 text-sm">{event.desc}</p>
                    <div className="flex items-center gap-4 mt-2 text-white/60 text-xs">
                      <span>{event.participants.toLocaleString()} participants</span>
                      <span>{event.daysLeft} days left</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Upcoming Events */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Upcoming Events</h2>
              {events.filter(e => e.type === 'upcoming').map((event) => (
                <div key={event.id} className="relative rounded-2xl overflow-hidden mb-4">
                  <Image src={event.image} alt={event.title} width={800} height={400} className="w-full h-48 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="inline-block px-2 py-0.5 bg-blue-500 text-white text-xs rounded mb-2">UPCOMING</span>
                    <h3 className="text-white font-bold text-lg">{event.title}</h3>
                    <p className="text-white/80 text-sm">{event.desc}</p>
                    <div className="mt-2 text-white/60 text-xs">Starts in {event.daysLeft} days</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Past Events */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Past Events</h2>
              {events.filter(e => e.type === 'ended').map((event) => (
                <div key={event.id} className="relative rounded-2xl overflow-hidden mb-4 opacity-75">
                  <Image src={event.image} alt={event.title} width={800} height={400} className="w-full h-40 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="inline-block px-2 py-0.5 bg-gray-500 text-white text-xs rounded mb-2">ENDED</span>
                    <h3 className="text-white font-bold">{event.title}</h3>
                    <p className="text-white/60 text-xs">{event.participants.toLocaleString()} participants</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'news' && (
          <div className="space-y-4">
            {news.map((item) => (
              <Link key={item.id} href={`/news/${item.id}`} className="flex gap-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                {item.image && (
                  <Image src={item.image} alt={item.title} width={100} height={60} className="w-20 h-14 object-cover rounded-lg flex-shrink-0" />
                )}
                <div className="flex-1">
                  <h3 className="font-medium text-sm line-clamp-2">{item.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
