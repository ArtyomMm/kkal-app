export type Screen = 'welcome' | 'game' | 'profile' | 'leaderboard';

export interface GameState {
  currentCardIndex: number;
  score: number;
  streak: number;
  lives: number;
}

export interface RoundResult {
  correct: boolean;
  guess: 'less' | 'more';
  actualCalories: number;
  guessedCalories: number;
  combo: number;
  xp: number;
}
