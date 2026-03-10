'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icons from '@/components/ui/Icons';

const TRANSACTIONS = [
  { id: 1, type: 'purchase', coins: 500, amount: 4.99, date: '2024-01-15', description: 'Purchased 500 coins' },
  { id: 2, type: 'tip', coins: -50, amount: 0.50, date: '2024-01-14', description: 'Tipped to Solo Leveling' },
  { id: 3, type: 'reward', coins: 100, amount: 0, date: '2024-01-13', description: 'Daily login bonus' },
  { id: 4, type: 'purchase', coins: 1000, amount: 9.99, date: '2024-01-12', description: 'Purchased 1000 coins + bonus' },
  { id: 5, type: 'subscription', coins: 0, amount: 4.99, date: '2024-01-10', description: 'Premium Monthly' },
];

const TIPPING_OPTIONS = [10, 50, 100, 500];

export default function WalletPage() {
  const [balance, setBalance] = useState(1250);
  const [showTipModal, setShowTipModal] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState<string | null>(null);
  const [tipAmount, setTipAmount] = useState(50);

  const creators = [
    { id: 1, name: 'Chugong', avatar: 'https://i.pravatar.cc/150?u=c1', series: 'Solo Leveling', followers: '2.5M' },
    { id: 2, name: 'SIU', avatar: 'https://i.pravatar.cc/150?u=c2', series: 'Tower of God', followers: '1.8M' },
    { id: 3, name: 'Sleepy-C', avatar: 'https://i.pravatar.cc/150?u=c3', series: 'Omniscient Reader', followers: '1.2M' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-4 p-4">
          <Link href="/" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <Icons.ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold dark:text-white">Wallet</h1>
        </div>
      </div>

      {/* Balance Card */}
      <div className="p-4">
        <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl p-6 text-white">
          <p className="text-yellow-100 text-sm">Available Balance</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-4xl font-bold">🪙 {balance.toLocaleString()}</span>
          </div>
          <div className="flex gap-3 mt-4">
            <Link href="/premium" className="flex-1 py-2 bg-white/20 rounded-lg text-center text-sm font-medium">
              Buy Coins
            </Link>
            <button className="flex-1 py-2 bg-white/20 rounded-lg text-center text-sm font-medium">
              Redeem Code
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-4 gap-2">
          {[
            { icon: '🪙', label: 'Buy', href: '/premium' },
            { icon: '🎁', label: 'Rewards', href: '/daily-rewards' },
            { icon: '🎫', label: 'Pass', href: '/battle-pass' },
            { icon: '💎', label: 'Premium', href: '/premium' },
          ].map((action, i) => (
            <Link key={i} href={action.href} className="flex flex-col items-center gap-1 p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
              <span className="text-2xl">{action.icon}</span>
              <span className="text-xs dark:text-gray-400">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Tip Creators */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-bold mb-4 dark:text-white">Tip Your Favorites</h3>
        <div className="space-y-3">
          {creators.map((creator) => (
            <div key={creator.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <Image
                src={creator.avatar}
                alt={creator.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div className="flex-1">
                <h4 className="font-semibold dark:text-white">{creator.name}</h4>
                <p className="text-xs text-gray-500">{creator.series} • {creator.followers} followers</p>
              </div>
              <button
                onClick={() => {
                  setSelectedCreator(creator.name);
                  setShowTipModal(true);
                }}
                className="px-4 py-2 bg-yellow-400 text-black text-sm font-medium rounded-full"
              >
                Tip
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Transactions */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-bold mb-4 dark:text-white">Transaction History</h3>
        <div className="space-y-2">
          {TRANSACTIONS.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  tx.type === 'purchase' ? 'bg-green-100 text-green-600' :
                  tx.type === 'tip' ? 'bg-yellow-100 text-yellow-600' :
                  tx.type === 'reward' ? 'bg-blue-100 text-blue-600' :
                  'bg-purple-100 text-purple-600'
                }`}>
                  {tx.type === 'purchase' ? '💰' : tx.type === 'tip' ? '🎁' : tx.type === 'reward' ? '🎉' : '👑'}
                </div>
                <div>
                  <p className="font-medium dark:text-white">{tx.description}</p>
                  <p className="text-xs text-gray-500">{tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${tx.coins > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {tx.coins > 0 ? '+' : ''}{tx.coins} coins
                </p>
                {tx.amount > 0 && (
                  <p className="text-xs text-gray-500">${tx.amount.toFixed(2)}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
