'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface TipButtonProps {
  creatorId: string;
  creatorName: string;
  seriesId?: string;
  size?: 'sm' | 'md' | 'lg';
}

const TIP_AMOUNTS = [
  { amount: 100, label: '$1' },
  { amount: 500, label: '$5' },
  { amount: 1000, label: '$10' },
  { amount: 2500, label: '$25' },
];

export default function TipButton({ creatorId, creatorName, seriesId, size = 'md' }: TipButtonProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(500);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTip = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'tip',
          amount: selectedAmount,
          creatorId,
          seriesId
        })
      });

      const data = await response.json();

      if (data.url) {
        if (data.mock) {
          // For demo/development, show success message
          alert(`💝 Thanks for the $${selectedAmount / 100} tip to ${creatorName}! (Demo mode - no actual payment)`);
          setIsOpen(false);
        } else {
          window.location.href = data.url;
        }
      } else if (data.error) {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to process tip');
    } finally {
      setLoading(false);
    }
  };

  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3'
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white rounded-full font-medium transition-colors ${sizeClasses[size]}`}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
        </svg>
        Tip
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-50">
          <h3 className="font-semibold mb-3">Support {creatorName}</h3>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            {TIP_AMOUNTS.map(({ amount, label }) => (
              <button
                key={amount}
                onClick={() => setSelectedAmount(amount)}
                className={`py-2 px-3 rounded-lg font-medium transition-colors ${
                  selectedAmount === amount
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-3">{error}</p>
          )}

          <button
            onClick={handleTip}
            disabled={loading}
            className="w-full py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
          >
            {loading ? 'Processing...' : `Send $${selectedAmount / 100} Tip`}
          </button>

          <p className="text-xs text-gray-500 mt-3 text-center">
            Secure payment via Stripe
          </p>
        </div>
      )}
    </div>
  );
}
