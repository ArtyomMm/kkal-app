'use client';

import { motion } from 'framer-motion';
import { Bell, Trophy } from 'lucide-react';
import {
  currentUser,
  weeklyActivity,
  dailyQuests,
  trophies,
} from '@/lib/mock-data';

export default function ProfileScreen() {
  const maxActivity = Math.max(...weeklyActivity.map((d) => d.value));

  return (
    <div className="no-scrollbar h-full overflow-y-auto px-6 pb-32 pt-[calc(env(safe-area-inset-top)+1rem)]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-full p-[3px] shadow-[0_0_20px_rgba(191,253,8,0.5)] [background:linear-gradient(135deg,#bffd08,#4d7a00)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-16 w-16 rounded-full border-2 border-[#0a0a0a] object-cover"
            />
          </div>
          <div>
            <p className="text-lg font-bold text-white">{currentUser.name}</p>
            <p className="text-sm text-gray-400">@kcal_player</p>
          </div>
        </div>
        <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#2a2a2a] bg-[#1a1a1a] text-gray-300">
          <Bell size={18} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>
      </div>

      {/* Level */}
      <div className="mt-6 rounded-3xl border border-[#2a2a2a] bg-[#1a1a1a] p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-bold text-white">Level</span>
          <span className="text-sm font-semibold text-gray-400">
            Level {currentUser.level}
          </span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-[#2a2a2a]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${currentUser.levelProgress * 100}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full rounded-full bg-[#bffd08] shadow-[0_0_12px_rgba(191,253,8,0.6)]"
          />
        </div>
      </div>

      {/* Activity */}
      <div className="mt-4 rounded-3xl border border-[#2a2a2a] bg-[#1a1a1a] p-5">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-bold text-white">Activity</span>
          <span className="rounded-full bg-[#2a2a2a] px-3 py-1 text-xs font-semibold text-[#bffd08]">
            [ 420 ] kcal
          </span>
        </div>
        <div className="flex h-40 items-end gap-2">
          {weeklyActivity.map((d, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-2">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(d.value / maxActivity) * 100}%` }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: 'easeOut' }}
                className="w-full rounded-full bg-gradient-to-t from-[#4d7a00] to-[#bffd08]"
              />
              <span className="text-[10px] font-medium text-gray-500">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Quests */}
      <div className="mt-6">
        <h3 className="mb-3 font-bold text-white">Daily Quests</h3>
        <div className="space-y-3">
          {dailyQuests.map((q) => (
            <div
              key={q.id}
              className="flex items-center gap-3 rounded-2xl border border-[#2a2a2a] bg-[#1a1a1a] p-4"
            >
              <span className="h-5 w-5 shrink-0 rounded-full border-2 border-gray-600" />
              <div className="flex-1">
                <p className="font-semibold text-white">{q.title}</p>
                <p className="text-xs text-gray-500">{q.subtitle}</p>
              </div>
              <button className="rounded-full bg-[#ff5722] px-5 py-1.5 text-sm font-bold text-white transition-colors hover:bg-[#ff6f47]">
                Claim
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Block - trophies */}
      <div className="mt-6">
        <h3 className="mb-3 font-bold text-white">Interactive Block</h3>
        <div className="grid grid-cols-4 gap-3">
          {trophies.map((t) => (
            <div
              key={t.id}
              className="flex aspect-square items-center justify-center rounded-2xl border border-[#2a2a2a] bg-[#1a1a1a]"
            >
              <Trophy
                size={28}
                className={t.tier === 'gold' ? 'text-yellow-400' : 'text-orange-700'}
                fill="currentColor"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
