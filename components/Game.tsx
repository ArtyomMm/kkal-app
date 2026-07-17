'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Screen } from '@/types/game';
import { openInvite } from '@/lib/telegram';
import WelcomeScreen from '@/components/screens/WelcomeScreen';
import GameScreen from '@/components/screens/GameScreen';
import ProfileScreen from '@/components/screens/ProfileScreen';
import LeaderboardScreen from '@/components/screens/LeaderboardScreen';
import BottomNav from '@/components/BottomNav';

export default function Game() {
  const [screen, setScreen] = useState<Screen>('welcome');

  return (
    <div className="relative mx-auto h-screen w-full max-w-md overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="h-full"
        >
          {screen === 'welcome' && (
            <WelcomeScreen onStart={() => setScreen('game')} />
          )}
          {screen === 'game' && <GameScreen />}
          {screen === 'profile' && <ProfileScreen />}
          {screen === 'leaderboard' && (
            <LeaderboardScreen
              onBack={() => setScreen('profile')}
              onInvite={openInvite}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <BottomNav current={screen} onNavigate={setScreen} />
    </div>
  );
}
