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
import { gameCards } from '@/lib/food-data';
import { GameState, RoundResult } from '@/types/game';
import { hapticImpact, hapticNotification } from '@/lib/telegram';
import ResultOverlay from '@/components/ResultOverlay';

const SWIPE_THRESHOLD = 110;

export default function GameScreen() {
  const TOTAL_LIVES = 3;
  const [state, setState] = useState<GameState>({
    currentCardIndex: 0,
    score: 0,
    streak: 0,
    lives: TOTAL_LIVES,
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

    const combo = correct ? state.streak + 1 : 0;
    const xp = correct ? 10 * combo : 0;

    setResult({
      correct,
      guess,
      actualCalories: card.calories,
      guessedCalories: card.guessCalories,
      combo,
      xp,
      fact: correct ? card.factSuccess : card.factFail,
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
    const gainedXp = result?.xp ?? 0;
    x.set(0);
    setResult(null);
    setState((prev) => ({
      ...prev,
      currentCardIndex: prev.currentCardIndex + 1,
      score: wasCorrect ? prev.score + gainedXp : prev.score,
      streak: wasCorrect ? prev.streak + 1 : 0,
      lives: wasCorrect ? prev.lives : Math.max(0, prev.lives - 1),
    }));
  };

  return (
    <div className="flex h-full flex-col px-6 pb-28 pt-[calc(env(safe-area-inset-top)+1rem)]">
      {/* Top panel */}
      <div className="relative flex items-center justify-between">
        <span className="text-xl font-black text-white">
          {state.score.toLocaleString('en-US')} XP
        </span>

        {/* Lives / tries indicator */}
        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2">
          {Array.from({ length: TOTAL_LIVES }).map((_, i) => (
            <span
              key={i}
              className={`h-3 w-3 rounded-full transition-all ${
                i < state.lives
                  ? 'bg-[#bffd08] shadow-[0_0_10px_rgba(191,253,8,0.7)]'
                  : 'bg-[#3a3a3a] opacity-25'
              }`}
            />
          ))}
        </div>

        {state.streak > 0 && (
          <span className="rounded-full bg-[#bffd08]/15 px-3 py-1 text-sm font-bold text-[#bffd08]">
            Combo x{state.streak}
          </span>
        )}
      </div>

      {/* Single isolated card — lowered slightly for balanced breathing room */}
      <div className="flex flex-1 items-center justify-center pt-6">
        <motion.div
          key={card.id + state.currentCardIndex}
          style={{ x, rotate }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.6}
          onDragEnd={handleDragEnd}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-full cursor-grab touch-none rounded-[28px] border border-[#2a2a2a] bg-[#1a1a1a] p-4 shadow-2xl active:cursor-grabbing"
        >
          {/* Swipe labels */}
          <motion.div
            style={{ opacity: lessOpacity }}
            className="pointer-events-none absolute left-8 top-8 z-10 -rotate-12 rounded-xl border-2 border-white/80 px-3 py-1 text-lg font-extrabold uppercase text-white"
          >
            Less
          </motion.div>
          <motion.div
            style={{ opacity: moreOpacity }}
            className="pointer-events-none absolute right-8 top-8 z-10 rotate-12 rounded-xl border-2 border-[#bffd08] px-3 py-1 text-lg font-extrabold uppercase text-[#bffd08]"
          >
            More
          </motion.div>

          <div
            className="relative aspect-square w-full overflow-hidden rounded-3xl"
            style={{
              background:
                'radial-gradient(circle at 50% 45%, rgba(191,253,8,0.12) 0%, #111111 65%)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={card.image}
              alt={card.name}
              draggable={false}
              loading="eager"
              className="h-full w-full object-contain p-2 drop-shadow-[0_12px_30px_rgba(0,0,0,0.55)]"
            />
          </div>

          <div className="px-2 pb-1 pt-4 text-center">
            <h2 className="text-base font-bold leading-snug text-white">
              {card.name}
            </h2>
            <p className="mt-0.5 text-sm font-medium text-gray-400">
              {card.portion}
            </p>
            <p className="mt-2 text-3xl font-black text-[#bffd08]">
              {card.guessCalories} ккал?
            </p>
          </div>
        </motion.div>
      </div>

      {/* Action buttons — breathing gap from the card */}
      <div className="mt-8 flex w-full gap-4">
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
          className="flex-1 rounded-full bg-[#bffd08] py-4 text-lg font-bold text-black shadow-[0_0_20px_rgba(191,253,8,0.35)] transition-colors hover:bg-[#cdff3a]"
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
