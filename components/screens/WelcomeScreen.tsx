'use client';

import { motion } from 'framer-motion';
import { currentUser } from '@/lib/mock-data';

interface WelcomeScreenProps {
  onStart: () => void;
}

const foods = [
  {
    src: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=400&q=80',
    className: 'top-2 left-2 h-32 w-32',
    delay: 0,
    duration: 4,
  },
  {
    src: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80',
    className: 'top-0 right-4 h-24 w-24',
    delay: 0.6,
    duration: 5,
  },
  {
    src: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=400&q=80',
    className: 'bottom-2 left-1/2 -translate-x-1/2 h-28 w-28',
    delay: 1.1,
    duration: 4.5,
  },
];

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="flex h-full flex-col items-center justify-between px-6 pb-28 pt-[calc(env(safe-area-inset-top)+2.5rem)]">
      {/* Highscore */}
      <h1
        className="text-center text-4xl font-black tracking-tight text-white"
        style={{ textShadow: '0 0 24px rgba(191,253,8,0.55)' }}
      >
        Highscore: {currentUser.highscore.toLocaleString('en-US')}
      </h1>

      {/* Floating food composition — glassmorphism stage */}
      <div className="relative flex flex-1 items-center justify-center">
        <div className="relative h-72 w-72">
          {/* Neon ambient glow */}
          <div className="absolute inset-6 rounded-full bg-[#bffd08]/20 blur-[70px]" />

          {/* Frosted glass stage */}
          <div className="absolute inset-0 rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl" />

          {foods.map((food, i) => (
            <motion.div
              key={i}
              className={`absolute overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-sm ${food.className}`}
              animate={{ y: [0, -16, 0], rotate: [-3, 3, -3] }}
              transition={{
                duration: food.duration,
                delay: food.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={food.src} alt="" className="h-full w-full object-cover" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Start button */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={onStart}
        className="w-full rounded-full bg-[#bffd08] px-8 py-6 text-2xl font-black text-black shadow-[0_0_40px_rgba(191,253,8,0.45)] transition-colors hover:bg-[#cdff3a]"
      >
        Start Game
      </motion.button>
    </div>
  );
}
