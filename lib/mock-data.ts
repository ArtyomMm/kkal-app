const avatar = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=200&q=80`;

export interface Player {
  rank: number;
  name: string;
  score: number;
  avatar: string;
}

export const currentUser = {
  name: 'Artem N.',
  level: 15,
  levelProgress: 0.68,
  avatar: avatar('1500648767791-00dcc994a43e'),
  highscore: 0,
};

export const leaderboard: Player[] = [
  { rank: 1, name: 'Низаров', score: 395, avatar: avatar('1507003211169-0a1dd7228f2d') },
  { rank: 2, name: 'Ликана', score: 365, avatar: avatar('1494790108377-be9c29b29330') },
  { rank: 3, name: 'Афлия', score: 330, avatar: avatar('1544005313-94ddf0286df2') },
  { rank: 4, name: 'Сеголья', score: 315, avatar: avatar('1438761681033-6461ffad8d80') },
  { rank: 5, name: 'Дамир', score: 300, avatar: avatar('1500648767791-00dcc994a43e') },
  { rank: 6, name: 'Карина', score: 285, avatar: avatar('1534528741775-53994a69daeb') },
  { rank: 7, name: 'Тимур', score: 270, avatar: avatar('1506794778202-cad84cf45f1d') },
  { rank: 8, name: 'Алина', score: 255, avatar: avatar('1517841905240-472988babdf9') },
];

export interface ActivityDay {
  day: string;
  value: number;
}

export const weeklyActivity: ActivityDay[] = [
  { day: 'Th', value: 120 },
  { day: 'Fr', value: 180 },
  { day: 'Tu', value: 90 },
  { day: 'We', value: 260 },
  { day: 'Th', value: 200 },
  { day: 'Fr', value: 300 },
  { day: 'Sa', value: 150 },
  { day: 'Su', value: 80 },
];

export interface Quest {
  id: string;
  title: string;
  subtitle: string;
  claimed: boolean;
}

export const dailyQuests: Quest[] = [
  { id: 'q1', title: 'Daily Streak', subtitle: '1 hour ago', claimed: false },
  { id: 'q2', title: 'Tomorrow Calories', subtitle: '3 mins ago', claimed: false },
];

export interface Trophy {
  id: string;
  tier: 'gold' | 'bronze';
}

export const trophies: Trophy[] = [
  { id: 't1', tier: 'gold' },
  { id: 't2', tier: 'gold' },
  { id: 't3', tier: 'gold' },
  { id: 't4', tier: 'bronze' },
  { id: 't5', tier: 'bronze' },
  { id: 't6', tier: 'bronze' },
  { id: 't7', tier: 'bronze' },
  { id: 't8', tier: 'bronze' },
];
