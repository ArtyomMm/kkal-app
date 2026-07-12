'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Crown } from 'lucide-react';
import { leaderboard, Player } from '@/lib/mock-data';

interface LeaderboardScreenProps {
  onBack: () => void;
  onInvite: () => void;
}

const top3 = leaderboard.slice(0, 3);
const rest = leaderboard.slice(3);

// Podium order: 2nd (left), 1st (center), 3rd (right)
const podium = [top3[1], top3[0], top3[2]];
const podiumStyles = [
  { height: 'h-24', ring: 'ring-gray-400', crown: 'text-gray-300', order: 2 },
  { height: 'h-32', ring: 'ring-[#a3ff12]', crown: 'text-yellow-400', order: 1 },
  { height: 'h-20', ring: 'ring-orange-600', crown: 'text-orange-500', order: 3 },
];

export default function LeaderboardScreen({ onBack, onInvite }: LeaderboardScreenProps) {
  return (
    <div className="min-h-screen px-6 pb-32 pt-14">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2a2a2a] bg-[#1a1a1a] text-white"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-white">Рейтинг Лидеров</h1>
      </div>

      {/* Podium */}
      <div className="mb-8 flex items-end justify-center gap-3">
        {podium.map((player: Player, i) => {
          const style = podiumStyles[i];
          return (
            <motion.div
              key={player.rank}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-1 flex-col items-center"
            >
              <Crown size={22} className={`mb-1 ${style.crown}`} fill="currentColor" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={player.avatar}
                alt={player.name}
                className={`mb-2 h-14 w-14 rounded-full object-cover ring-2 ${style.ring}`}
              />
              <div
                className={`flex w-full ${style.height} items-start justify-center rounded-t-2xl border border-b-0 border-[#2a2a2a] bg-[#1a1a1a] pt-2`}
              >
                <span className="text-2xl font-extrabold text-white">
                  {player.rank}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* List */}
      <div className="space-y-2">
        {rest.map((player) => (
          <div
            key={player.rank}
            className="flex items-center gap-3 rounded-2xl border border-[#2a2a2a] bg-[#1a1a1a] p-3"
          >
            <span className="w-5 text-center font-bold text-gray-500">
              {player.rank}
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={player.avatar}
              alt={player.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="flex-1 font-semibold text-white">{player.name}</span>
            <span className="font-bold text-gray-300">{player.score}</span>
          </div>
        ))}
      </div>

      {/* Invite button */}
      <div className="fixed inset-x-0 bottom-24 z-30 flex justify-center px-6">
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onInvite}
          className="w-full max-w-sm rounded-full bg-[#ff5722] py-4 text-base font-bold text-white shadow-[0_0_25px_rgba(255,87,34,0.35)] transition-colors hover:bg-[#ff6f47]"
        >
          Пригласить друзей
        </motion.button>
      </div>
    </div>
  );
}
