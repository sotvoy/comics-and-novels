'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icons from '@/components/ui/Icons';

const PLANS = [
  {
    id: 'monthly',
    name: 'Premium Monthly',
    price: 4.99,
    period: 'month',
    features: [
      'Ad-free reading',
      'Early access to new chapters',
      'Exclusive badges',
      '10% discount on purchases',
      'Priority customer support'
    ],
    popular: false
  },
  {
    id: 'yearly',
    name: 'Premium Yearly',
    price: 39.99,
    period: 'year',
    savings: 33,
    features: [
      'All Monthly features',
      'Exclusive yearly content',
      '20% discount on purchases',
      'Free monthly coins',
      'Early access to events'
    ],
    popular: true
  },
  {
    id: 'lifetime',
    name: 'Premium Lifetime',
    price: 99.99,
    period: 'lifetime',
    features: [
      'All Yearly features',
      'Lifetime VIP badge',
      'Exclusive lifetime perks',
      '50% discount on purchases',
      'Free coins every month',
      'Name in credits'
    ],
    popular: false
  }
];

const COIN_PACKAGES = [
  { coins: 100, price: 0.99, bonus: 0 },
  { coins: 500, price: 4.99, bonus: 50 },
  { coins: 1000, price: 9.99, bonus: 150 },
  { coins: 5000, price: 49.99, bonus: 1000 },
  { coins: 10000, price: 99.99, bonus: 2500 },
];

export default function PremiumPage() {
  const [selectedPlan, setSelectedPlan] = useState('yearly');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-4 p-4">
          <Link href="/" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <Icons.ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold dark:text-white">Premium & Coins</h1>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">👑</span>
          <div>
            <h2 className="text-2xl font-bold">Go Premium</h2>
            <p className="text-red-100">Unlock the full experience</p>
          </div>
        </div>
        <div className="flex gap-4 text-sm">
          <span className="flex items-center gap-1">✨ Ad-free</span>
          <span className="flex items-center gap-1">🚀 Early access</span>
          <span className="flex items-center gap-1">💎 Exclusive</span>
        </div>
      </div>

      {/* Plans */}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-4 dark:text-white">Subscription Plans</h3>
        <div className="space-y-3">
          {PLANS.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                selectedPlan === plan.id 
                  ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold dark:text-white">{plan.name}</h4>
                    {plan.popular && (
                      <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">Popular</span>
                    )}
                  </div>
                  <p className="text-2xl font-bold mt-1">
                    ${plan.price}
                    <span className="text-sm font-normal text-gray-500">/{plan.period}</span>
                  </p>
                  {plan.savings && (
                    <p className="text-sm text-green-500">Save {plan.savings}%</p>
                  )}
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedPlan === plan.id ? 'border-red-500 bg-red-500' : 'border-gray-300'
                }`}>
                  {selectedPlan === plan.id && <span className="text-white text-xs">✓</span>}
                </div>
              </div>
              <ul className="mt-3 space-y-1">
                {plan.features.slice(0, 3).map((feature, i) => (
                  <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <span className="text-green-500">✓</span> {feature}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowPaymentModal(true)}
          className="w-full mt-4 py-3 bg-red-500 text-white rounded-xl font-bold"
        >
          Subscribe Now
        </button>
      </div>

      {/* Coins */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-bold mb-4 dark:text-white">Buy Coins</h3>
        <div className="grid grid-cols-2 gap-3">
          {COIN_PACKAGES.map((pkg) => (
            <button
              key={pkg.coins}
              className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-red-500 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🪙</span>
                <span className="font-bold dark:text-white">{pkg.coins + pkg.bonus}</span>
                {pkg.bonus > 0 && (
                  <span className="text-xs text-green-500">+{pkg.bonus} bonus</span>
                )}
              </div>
              <p className="text-gray-500">${pkg.price}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-bold mb-4 dark:text-white">Premium Benefits</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: '🚫', title: 'Ad-Free', desc: 'No interruptions' },
            { icon: '⏰', title: 'Early Access', desc: 'Read first' },
            { icon: '💰', title: 'Discounts', desc: 'Up to 50% off' },
            { icon: '🎁', title: 'Free Coins', desc: 'Monthly rewards' },
            { icon: '⭐', title: 'VIP Badge', desc: 'Show status' },
            { icon: '💁', title: 'Priority Support', desc: 'Fast responses' },
          ].map((benefit, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <span className="text-2xl">{benefit.icon}</span>
              <div>
                <h4 className="font-semibold dark:text-white">{benefit.title}</h4>
                <p className="text-xs text-gray-500">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
