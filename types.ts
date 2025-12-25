
export enum ModuleView {
  DASHBOARD = 'DASHBOARD',
  REAL_VS_FAKE = 'REAL_VS_FAKE',
  CULTURE_GUARD = 'CULTURE_GUARD',
  AI_ACADEMY = 'AI_ACADEMY',
  ETHICAL_CREATOR = 'ETHICAL_CREATOR',
  PROMPT_LAB = 'PROMPT_LAB',
  LIBRARY = 'LIBRARY',
  DIGITAL_CITIZEN = 'DIGITAL_CITIZEN',
  LEVEL_1 = 'LEVEL_1',
  LEVEL_2 = 'LEVEL_2',
  LEVEL_3 = 'LEVEL_3',
  LEVEL_4 = 'LEVEL_4',
  LEVEL_5 = 'LEVEL_5',
  LEVEL_6 = 'LEVEL_6',
  LEVEL_7 = 'LEVEL_7',
  LEVEL_8 = 'LEVEL_8',
  LEVEL_9 = 'LEVEL_9',
  LEVEL_10 = 'LEVEL_10',
  FINAL_GAME = 'FINAL_GAME',
  HERO_SELECTION = 'HERO_SELECTION'
}

export interface Hero {
  id: string;
  name: string;
  icon: string;
  power: string;
  color: string;
}

export enum AnalysisColor {
  GREEN = 'GREEN',
  YELLOW = 'YELLOW',
  RED = 'RED'
}

export interface AnalysisResult {
  color: AnalysisColor;
  title: string;
  explanation: string;
}

export interface QuizQuestion {
  id: number;
  image?: string;
  text: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  explanation: string;
}

export interface Lesson {
  id: number;
  title: string;
  content: string;
  interactiveQuestion: string;
  interactiveAnswer: boolean;
  explanation: string;
  icon: string;
  color: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  coverColor: string;
  summary: string;
  aiConnection: string;
  category: 'VOCABULARY' | 'HISTORY' | 'FUTURE';
}

export interface LeaderboardEntry {
  username: string;
  total_score: number;
  ethics_avg: number;
  trust_avg: number;
  humanity_avg: number;
}
