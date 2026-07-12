'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { initTelegram } from '@/lib/telegram';

const Game = dynamic(() => import('@/components/Game'), { ssr: false });

export default function Home() {
  useEffect(() => {
    initTelegram();
  }, []);

  return <Game />;
}
