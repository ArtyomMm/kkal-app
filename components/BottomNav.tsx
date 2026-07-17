'use client';

import { Home, Gamepad2, User, Trophy } from 'lucide-react';
import { Screen } from '@/types/game';

interface BottomNavProps {
  current: Screen;
  onNavigate: (screen: Screen) => void;
}

const items: { screen: Screen; label: string; icon: typeof Home }[] = [
  { screen: 'welcome', label: 'Home', icon: Home },
  { screen: 'game', label: 'Play', icon: Gamepad2 },
  { screen: 'leaderboard', label: 'Ranks', icon: Trophy },
  { screen: 'profile', label: 'Profile', icon: User },
];

export default function BottomNav({ current, onNavigate }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 flex justify-center pb-[env(safe-area-inset-bottom)]">
      <div className="mb-4 flex items-center gap-1 rounded-full border border-[#2a2a2a] bg-[#1a1a1a]/90 px-2 py-2 backdrop-blur-xl shadow-2xl">
        {items.map(({ screen, label, icon: Icon }) => {
          const active = current === screen;
          return (
            <button
              key={screen}
              onClick={() => onNavigate(screen)}
              className={`flex flex-col items-center gap-0.5 rounded-full px-5 py-2 transition-all ${
                active
                  ? 'bg-[#bffd08] text-black shadow-[0_0_18px_rgba(191,253,8,0.45)]'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Icon size={20} strokeWidth={2.4} />
              <span className="text-[10px] font-semibold">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
