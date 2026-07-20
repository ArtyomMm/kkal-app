'use client';

import { motion } from 'framer-motion';
import { currentUser } from '@/lib/mock-data';

interface WelcomeScreenProps {
  onStart: () => void;
}

const heroFoods = [
  {
    src: '/images/welcome/steak.png',
    alt: 'Steak',
    className: 'left-4 top-6 h-28 w-28',
    duration: '3.2s',
    delay: '0s',
  },
  {
    src: '/images/welcome/beer.png',
    alt: 'Beer',
    className: 'right-3 top-2 h-24 w-24',
    duration: '4s',
    delay: '0.5s',
  },
  {
    src: '/images/welcome/pizza.png',
    alt: 'Pizza slice',
    className: 'bottom-5 left-1/2 h-32 w-32 -translate-x-1/2',
    duration: '3.6s',
    delay: '0.9s',
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

      {/* Hero glass panel with floating PNG assets */}
      <div className="relative flex flex-1 items-center justify-center">
        <div className="relative h-80 w-80">
          {/* Neon ambient glow behind the glass */}
          <div className="absolute inset-8 rounded-full bg-[#bffd08]/20 blur-[70px]" />

          {/* Frosted glass panel */}
          <div className="absolute inset-0 rounded-[40px] border border-white/10 bg-black/30 shadow-2xl backdrop-blur-md" />

          {/* Floating food items */}
          {heroFoods.map((food) => (
            <div
              key={food.src}
              className={`animate-float absolute ${food.className}`}
              style={{ animationDuration: food.duration, animationDelay: food.delay }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={food.src}
                alt={food.alt}
                draggable={false}
                className="h-full w-full object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Start button */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={onStart}
        className="w-full rounded-full bg-[#bffd08] px-8 py-6 text-2xl font-black text-[#111111] shadow-[0_0_40px_rgba(191,253,8,0.45)] transition-colors hover:bg-[#cdff3a]"
      >
        Старт
      </motion.button>
    </div>
  );
}
