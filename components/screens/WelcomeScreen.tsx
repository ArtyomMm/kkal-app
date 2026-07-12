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
    <div className="flex min-h-screen flex-col items-center px-6 pb-32 pt-16">
      {/* Highscore */}
      <h1 className="text-2xl font-bold text-white">
        Highscore: {currentUser.highscore.toLocaleString('en-US')}
      </h1>

      {/* Floating food composition */}
      <div className="relative mx-auto my-auto h-72 w-72">
        <div className="absolute inset-0 rounded-full bg-[#a3ff12]/10 blur-3xl" />
        {foods.map((food, i) => (
          <motion.div
            key={i}
            className={`absolute overflow-hidden rounded-3xl border border-[#2a2a2a] shadow-2xl ${food.className}`}
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

      {/* Start button */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={onStart}
        className="w-full max-w-sm rounded-full bg-[#a3ff12] py-5 text-xl font-bold text-black shadow-[0_0_30px_rgba(163,255,18,0.35)] transition-colors hover:bg-[#b4ff3a]"
      >
        Start Game
      </motion.button>
    </div>
  );
}
