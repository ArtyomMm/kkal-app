'use client';

import { useState } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  AnimatePresence,
  type PanInfo,
} from 'framer-motion';
import { Settings, Camera } from 'lucide-react';
import { gameCards } from '@/lib/food-data';
import { GameState, RoundResult } from '@/types/game';
import { hapticImpact, hapticNotification } from '@/lib/telegram';
import ResultOverlay from '@/components/ResultOverlay';

const SWIPE_THRESHOLD = 110;

export default function GameScreen() {
  const [state, setState] = useState<GameState>({
    currentCardIndex: 0,
    score: 1400,
    streak: 5,
    lives: 5,
  });
  const [result, setResult] = useState<RoundResult | null>(null);

  const card = gameCards[state.currentCardIndex % gameCards.length];

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-14, 14]);
  const lessOpacity = useTransform(x, [-120, 0], [1, 0]);
  const moreOpacity = useTransform(x, [0, 120], [0, 1]);

  const resolve = (guess: 'less' | 'more') => {
    if (result) return;
    const correct =
      guess === 'less'
        ? card.calories < card.guessCalories
        : card.calories > card.guessCalories;

    if (correct) {
      hapticNotification('success');
    } else {
      hapticNotification('error');
    }

    setResult({
      correct,
      guess,
      actualCalories: card.calories,
      guessedCalories: card.guessCalories,
    });
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > SWIPE_THRESHOLD) {
      hapticImpact('medium');
      animate(x, 400, { duration: 0.3 });
      resolve('more');
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      hapticImpact('medium');
      animate(x, -400, { duration: 0.3 });
      resolve('less');
    } else {
      animate(x, 0, { type: 'spring', stiffness: 300, damping: 25 });
    }
  };

  const nextRound = () => {
    const wasCorrect = result?.correct;
    x.set(0);
    setResult(null);
    setState((prev) => ({
      ...prev,
      currentCardIndex: prev.currentCardIndex + 1,
      score: wasCorrect ? prev.score + 100 : prev.score,
      streak: wasCorrect ? prev.streak + 1 : 0,
      lives: wasCorrect ? prev.lives : Math.max(0, prev.lives - 1),
    }));
  };

  return (
    <div className="flex min-h-screen flex-col px-6 pb-32 pt-14">
      {/* Top panel */}
      <div className="flex items-center justify-between">
        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2a2a2a] bg-[#1a1a1a] text-gray-300">
          <Settings size={18} />
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-white">
            Score: {state.score.toLocaleString('en-US')}
          </span>
          {state.streak > 0 && (
            <span className="rounded-full bg-[#a3ff12]/15 px-3 py-1 text-sm font-bold text-[#a3ff12]">
              Combo x{state.streak}
            </span>
          )}
        </div>

        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2a2a2a] bg-[#1a1a1a] text-gray-300">
          <Camera size={18} />
        </button>
      </div>

      {/* Card */}
      <div className="relative my-auto flex items-center justify-center">
        <motion.div
          key={card.id + state.currentCardIndex}
          style={{ x, rotate }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.6}
          onDragEnd={handleDragEnd}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-sm cursor-grab touch-none rounded-[28px] border border-[#2a2a2a] bg-[#1a1a1a] p-4 shadow-2xl active:cursor-grabbing"
        >
          {/* Swipe labels */}
          <motion.div
            style={{ opacity: lessOpacity }}
            className="pointer-events-none absolute left-8 top-8 z-10 rounded-xl border-2 border-white/80 px-3 py-1 text-lg font-extrabold uppercase text-white -rotate-12"
          >
            Less
          </motion.div>
          <motion.div
            style={{ opacity: moreOpacity }}
            className="pointer-events-none absolute right-8 top-8 z-10 rounded-xl border-2 border-[#a3ff12] px-3 py-1 text-lg font-extrabold uppercase text-[#a3ff12] rotate-12"
          >
            More
          </motion.div>

          <div className="relative aspect-square w-full overflow-hidden rounded-3xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card.image}
              alt={card.name}
              draggable={false}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="px-2 pb-2 pt-5 text-center">
            <h2 className="text-2xl font-bold text-white">
              {card.name} {card.portion}
            </h2>
            <div className="mt-3 inline-flex rounded-full bg-[#2a2a2a] px-4 py-1.5">
              <span className="text-sm font-semibold text-gray-300">
                [ {card.guessCalories} ] kcal?
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action buttons */}
      <div className="flex w-full max-w-sm gap-4 self-center">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            hapticImpact('light');
            animate(x, -400, { duration: 0.3 });
            resolve('less');
          }}
          className="flex-1 rounded-full bg-[#2a2a2a] py-4 text-lg font-bold text-white transition-colors hover:bg-[#333]"
        >
          Less
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            hapticImpact('light');
            animate(x, 400, { duration: 0.3 });
            resolve('more');
          }}
          className="flex-1 rounded-full bg-[#a3ff12] py-4 text-lg font-bold text-black shadow-[0_0_20px_rgba(163,255,18,0.3)] transition-colors hover:bg-[#b4ff3a]"
        >
          More
        </motion.button>
      </div>

      <AnimatePresence>
        {result && <ResultOverlay result={result} onNext={nextRound} />}
      </AnimatePresence>
    </div>
  );
}
