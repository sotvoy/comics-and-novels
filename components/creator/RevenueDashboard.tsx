'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Icons from '@/components/ui/Icons';

interface EarningsData {
  date: string;
  amount: number;
}

interface Transaction {
  id: string;
  type: 'earning' | 'withdrawal' | 'bonus';
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  description: string;
  date: string;
}

const demoEarningsData: EarningsData[] = [
  { date: 'Jan 1', amount: 45 },
  { date: 'Jan 2', amount: 62 },
  { date: 'Jan 3', amount: 38 },
  { date: 'Jan 4', amount: 75 },
  { date: 'Jan 5', amount: 52 },
  { date: 'Jan 6', amount: 89 },
  { date: 'Jan 7', amount: 65 },
];

const demoTransactions: Transaction[] = [
  { id: '1', type: 'earning', amount: 125.50, status: 'completed', description: 'Solo Leveling Ch. 180 Premium Views', date: '2024-01-15' },
  { id: '2', type: 'earning', amount: 89.00, status: 'completed', description: 'Tower of God Ch. 580 Premium Views', date: '2024-01-14' },
  { id: '3', type: 'withdrawal', amount: -200.00, status: 'completed', description: 'Withdrawal to Bank ****4532', date: '2024-01-12' },
  { id: '4', type: 'bonus', amount: 50.00, status: 'completed', description: 'Creator Bonus - 100K Views Milestone', date: '2024-01-10' },
  { id: '5', type: 'earning', amount: 67.50, status: 'completed', description: 'Solo Leveling Ch. 179 Premium Views', date: '2024-01-10' },
  { id: '6', type: 'earning', amount: 45.00, status: 'pending', description: 'Tower of God Ch. 579 Premium Views', date: '2024-01-08' },
];

export default function RevenueDashboard() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');
  
  const totalEarnings = demoTransactions
    .filter(t => t.type !== 'withdrawal' && t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const pendingEarnings = demoTransactions
    .filter(t => t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalWithdrawn = demoTransactions
    .filter(t => t.type === 'withdrawal' && t.status === 'completed')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const maxEarning = Math.max(...demoEarningsData.map(d => d.amount));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Revenue</h2>
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors">
          <Icons.Plus className="w-4 h-4 inline mr-2" />
          Request Withdrawal
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <Icons.Wallet className="w-8 h-8 opacity-80" />
            <span className="text-xs bg-white/20 px-2 py-1 rounded">Available</span>
          </div>
          <p className="text-3xl font-bold">${totalEarnings.toFixed(2)}</p>
          <p className="text-sm text-white/80 mt-1">Ready to withdraw</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <Icons.Clock className="w-8 h-8 text-orange-500" />
            <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-500 px-2 py-1 rounded">Pending</span>
          </div>
          <p className="text-3xl font-bold">${pendingEarnings.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-1">Processing (7 days)</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <Icons.ArrowUpRight className="w-8 h-8 text-blue-500" />
            <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-500 px-2 py-1 rounded">Total</span>
          </div>
          <p className="text-3xl font-bold">${totalWithdrawn.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-1">Total withdrawn</p>
        </motion.div>
      </div>

      {/* Earnings Chart */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Earnings Trend</h3>
          <div className="flex gap-1 bg-white dark:bg-gray-900 rounded-lg p-1">
            {(['7d', '30d', '90d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  timeRange === range
                    ? 'bg-red-500 text-white'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
              </button>
            ))}
          </div>
        </div>

        {/* Bar Chart */}
        <div className="h-40 flex items-end gap-2">
          {demoEarningsData.map((data, index) => (
            <div key={data.date} className="flex-1 flex flex-col items-center gap-2">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(data.amount / maxEarning) * 100}%` }}
                transition={{ delay: index * 0.05 }}
                className="w-full bg-gradient-to-t from-green-500 to-emerald-400 rounded-t"
              />
              <span className="text-xs text-gray-500">{data.date}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-4 text-sm text-gray-500">
          <span>Min: ${Math.min(...demoEarningsData.map(d => d.amount))}</span>
          <span>Max: ${Math.max(...demoEarningsData.map(d => d.amount))}</span>
          <span>Avg: ${Math.round(demoEarningsData.reduce((a, b) => a + b.amount, 0) / demoEarningsData.length)}</span>
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* By Series */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
          <h3 className="font-semibold mb-4">Revenue by Series</h3>
          <div className="space-y-3">
            {[
              { name: 'Solo Leveling', amount: 280, percentage: 65 },
              { name: 'Tower of God', amount: 120, percentage: 28 },
              { name: 'Omniscient Reader', amount: 30, percentage: 7 },
            ].map((series) => (
              <div key={series.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{series.name}</span>
                  <span>${series.amount}</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                    style={{ width: `${series.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* By Source */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
          <h3 className="font-semibold mb-4">Revenue by Source</h3>
          <div className="space-y-3">
            {[
              { name: 'Premium Views', amount: 320, percentage: 75 },
              { name: 'Ad Revenue', amount: 80, percentage: 19 },
              { name: 'Creator Bonus', amount: 30, percentage: 6 },
            ].map((source) => (
              <div key={source.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{source.name}</span>
                  <span>${source.amount}</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
        <h3 className="font-semibold mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b border-gray-200 dark:border-gray-700">
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Description</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {demoTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-200 dark:border-gray-700">
                  <td className="py-3 text-sm">{transaction.date}</td>
                  <td className="py-3 text-sm">{transaction.description}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      transaction.type === 'earning' ? 'bg-green-100 dark:bg-green-900/30 text-green-600' :
                      transaction.type === 'withdrawal' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' :
                      'bg-purple-100 dark:bg-purple-900/30 text-purple-600'
                    }`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className={`inline-flex items-center gap-1 text-xs ${
                      transaction.status === 'completed' ? 'text-green-500' :
                      transaction.status === 'pending' ? 'text-orange-500' : 'text-red-500'
                    }`}>
                      {transaction.status === 'completed' ? (
                        <Icons.CheckCircle className="w-3 h-3" />
                      ) : transaction.status === 'pending' ? (
                        <Icons.Clock className="w-3 h-3" />
                      ) : (
                        <Icons.CloseCircle className="w-3 h-3" />
                      )}
                      {transaction.status}
                    </span>
                  </td>
                  <td className={`py-3 text-sm font-medium text-right ${
                    transaction.amount > 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Withdrawal Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
        <div className="flex gap-3">
          <Icons.Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 dark:text-blue-300">Withdrawal Information</h4>
            <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
              Withdrawals are processed within 5-7 business days. Minimum withdrawal amount is $10.
              You can withdraw to your linked bank account or PayPal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
