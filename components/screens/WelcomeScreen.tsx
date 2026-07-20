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
    width: 140,
    height: 140,
    className: 'left-0 bottom-4 z-10',
    duration: '3s',
    delay: '0s',
  },
  {
    src: '/images/welcome/beer.png',
    alt: 'Beer',
    width: 130,
    height: 130,
    className: 'right-0 bottom-4 z-10',
    duration: '3.8s',
    delay: '0.4s',
  },
  {
    src: '/images/welcome/pizza.png',
    alt: 'Pizza slice',
    width: 140,
    height: 140,
    className: 'left-1/2 -translate-x-1/2 bottom-10 z-20',
    duration: '3.4s',
    delay: '0.8s',
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
        {/* Soft ambient neon lime backlight */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(191,253,8,0.18) 0%, transparent 60%)',
          }}
        />

        {/* Glassmorphic panel */}
        <div className="relative flex h-72 w-80 items-end justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
          {/* Floating food items — overlapping 3D composition */}
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
                width={food.width}
                height={food.height}
                loading="eager"
                // @ts-expect-error fetchPriority is valid HTML but not in React types yet
                fetchpriority="high"
                draggable={false}
                className="object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.6)]"
                style={{ width: food.width, height: food.height }}
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
