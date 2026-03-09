'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Icons from '@/components/ui/Icons';

interface Org {
  id: string;
  name: string;
  description: string;
  cover: string;
  avatar: string;
  members: number;
  type: 'public' | 'unlisted' | 'private';
  role: 'owner' | 'admin' | 'member';
  series: number;
}

const myOrgs: Org[] = [
  {
    id: '1',
    name: 'Solo Leveling Fan Club',
    description: 'Official fan translations and discussions',
    cover: 'https://picsum.photos/seed/org1/800/200',
    avatar: 'https://picsum.photos/seed/avatar1/100/100',
    members: 12500,
    type: 'public',
    role: 'owner',
    series: 5
  },
  {
    id: '2',
    name: 'Webtoon Translators',
    description: 'Professional translation team',
    cover: 'https://picsum.photos/seed/org2/800/200',
    avatar: 'https://picsum.photos/seed/avatar2/100/100',
    members: 3500,
    type: 'public',
    role: 'admin',
    series: 12
  },
];

const recommendedOrgs = [
  { id: '3', name: 'Manhwa Readers', description: 'Best Korean manhwa community', cover: 'https://picsum.photos/seed/org3/800/200', avatar: 'https://picsum.photos/seed/avatar3/100/100', members: 45000, type: 'public' as const },
  { id: '4', name: 'Novel Haven', description: 'Original novels and translations', cover: 'https://picsum.photos/seed/org4/800/200', avatar: 'https://picsum.photos/seed/avatar4/100/100', members: 28000, type: 'public' as const },
  { id: '5', name: 'Comic Artists Hub', description: 'For creators to share and collaborate', cover: 'https://picsum.photos/seed/org5/800/200', avatar: 'https://picsum.photos/seed/avatar5/100/100', members: 15000, type: 'public' as const },
];

export default function OrganizationsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Organizations</h1>
            <p className="text-violet-200 text-sm">Join translation teams & creator groups</p>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowCreateModal(true)} className="bg-white text-violet-600 px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2">
            <Icons.Plus className="w-4 h-4" /> Create
          </motion.button>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-bold mb-3">My Organizations</h2>
        <div className="space-y-4">
          {myOrgs.map((org) => (
            <Link href={`/orgs/${org.id}`} key={org.id}>
              <motion.div whileHover={{ scale: 1.02 }} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
                <div className="h-20 bg-cover bg-center" style={{ backgroundImage: `url(${org.cover})` }} />
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <img src={org.avatar} alt={org.name} className="w-12 h-12 rounded-xl" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{org.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${org.role === 'owner' ? 'bg-yellow-500/20 text-yellow-600' : 'bg-purple-500/20 text-purple-600'}`}>{org.role}</span>
                      </div>
                      <p className="text-gray-500 text-sm">{org.description}</p>
                      <div className="flex gap-4 mt-2 text-xs text-gray-400">
                        <span>👥 {org.members.toLocaleString()}</span>
                        <span>📚 {org.series} series</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-bold mb-3">Recommended Organizations</h2>
        <div className="grid grid-cols-2 gap-4">
          {recommendedOrgs.map((org) => (
            <Link href={`/orgs/${org.id}`} key={org.id}>
              <motion.div whileHover={{ scale: 1.02 }} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
                <div className="h-16 bg-cover bg-center" style={{ backgroundImage: `url(${org.cover})` }} />
                <div className="p-3">
                  <div className="flex items-center gap-2">
                    <img src={org.avatar} alt={org.name} className="w-8 h-8 rounded-lg" />
                    <div>
                      <h3 className="font-bold text-sm">{org.name}</h3>
                      <p className="text-gray-400 text-xs">{org.members.toLocaleString()} members</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
