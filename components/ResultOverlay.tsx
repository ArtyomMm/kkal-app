'use client';

import { motion } from 'framer-motion';
import { Heart, X } from 'lucide-react';
import { RoundResult } from '@/types/game';

interface ResultOverlayProps {
  result: RoundResult;
  onNext: () => void;
}

export default function ResultOverlay({ result, onNext }: ResultOverlayProps) {
  const success = result.correct;
  const showCombo = result.combo > 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-6 backdrop-blur-2xl"
    >
      <motion.div
        initial={{ scale: 0.85, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="relative w-full max-w-sm overflow-hidden rounded-[28px] border border-[#2a2a2a] bg-[#1a1a1a] p-8 text-center"
      >
        {/* Bottom glow accent */}
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-40 blur-2xl ${
            success ? 'bg-[#bffd08]/25' : 'bg-[#ff5722]/25'
          }`}
        />

        {/* 3D emoji icon */}
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
          className="relative mx-auto mb-4 text-7xl"
        >
          {success ? '🎉' : '😔'}
        </motion.div>

        {success ? (
          <>
            <p className="text-2xl font-extrabold uppercase tracking-wide text-[#bffd08]">
              Верно!
            </p>
            <p className="mt-2 text-5xl font-black text-white">
              {result.actualCalories} ккал
            </p>

            {/* Dynamic killstreak XP */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 14, delay: 0.25 }}
              className="mt-4 inline-flex items-center rounded-full bg-[#bffd08]/15 px-5 py-2"
            >
              <span
                className="text-xl font-black text-[#bffd08]"
                style={{ textShadow: '0 0 16px rgba(191,253,8,0.6)' }}
              >
                +{result.xp} XP{showCombo ? ` (x${result.combo} 🔥)` : ''}
              </span>
            </motion.div>
          </>
        ) : (
          <>
            <p className="text-2xl font-extrabold uppercase tracking-wide text-[#ff5722]">
              Не совсем так
            </p>
            <p className="mt-2 flex items-center justify-center gap-2 text-2xl font-bold text-white">
              Это {result.actualCalories} ккал
              <X size={24} className="text-red-500" strokeWidth={3} />
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#2a2a2a] px-3 py-1">
              <Heart size={18} className="fill-red-500 text-red-500" />
              <span className="font-semibold text-white">-1</span>
            </div>
          </>
        )}

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onNext}
          className={`relative mt-8 w-full rounded-full py-4 text-base font-bold uppercase tracking-wide transition-colors ${
            success
              ? 'bg-[#bffd08] text-black shadow-[0_0_25px_rgba(191,253,8,0.4)] hover:bg-[#cdff3a]'
              : 'bg-[#ff5722] text-white shadow-[0_0_25px_rgba(255,87,34,0.35)] hover:bg-[#ff6f47]'
          }`}
        >
          Далее
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
