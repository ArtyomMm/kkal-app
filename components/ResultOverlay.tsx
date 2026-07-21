'use client';

import { motion } from 'framer-motion';
import { HeartCrack, X } from 'lucide-react';
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
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-2xl"
    >
      {/* Mirror the GameScreen layout so the CTA aligns with the Less/More buttons */}
      <div className="mx-auto flex h-full max-w-md flex-col px-6 pb-28 pt-[calc(env(safe-area-inset-top)+1rem)]">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="relative flex flex-1 flex-col items-center justify-center overflow-hidden rounded-[28px] border border-[#2a2a2a] bg-[#1a1a1a] p-8 text-center"
        >
          {/* Bottom glow accent */}
          <div
            className={`pointer-events-none absolute inset-x-0 bottom-0 h-48 blur-2xl ${
              success ? 'bg-[#bffd08]/25' : 'bg-[#ff5722]/20'
            }`}
          />

          {/* 3D emoji icon */}
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
            className="relative mb-4 text-7xl"
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
              <p className="mt-2 flex items-center justify-center gap-2 text-3xl font-black text-white">
                Это {result.actualCalories} ккал
                <X size={26} className="text-red-500" strokeWidth={3} />
              </p>

              {/* Lost try badge */}
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#2a2a2a] px-4 py-1.5">
                <HeartCrack size={18} className="text-gray-500" />
                <span className="font-bold text-gray-300">-1</span>
              </div>
            </>
          )}

          {/* Fact explanation */}
          <p className="relative mt-5 max-w-xs text-sm leading-relaxed text-gray-400">
            {result.fact}
          </p>
        </motion.div>

        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onNext}
          className={`mt-8 w-full rounded-full py-4 text-base font-bold uppercase tracking-wide transition-colors ${
            success
              ? 'bg-[#bffd08] text-black shadow-[0_0_25px_rgba(191,253,8,0.4)] hover:bg-[#cdff3a]'
              : 'bg-[#ff5722] text-white shadow-[0_0_25px_rgba(255,87,34,0.35)] hover:bg-[#ff6f47]'
          }`}
        >
          Далее
        </motion.button>
      </div>
    </motion.div>
  );
}
