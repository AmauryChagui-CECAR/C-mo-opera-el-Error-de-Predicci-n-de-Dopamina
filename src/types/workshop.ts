export enum SectionId {
  INICIO = 'inicio',
  OBJETIVOS = 'objetivos',
  FUNDAMENTOS = 'fundamentos',
  TALLER = 'taller',
  APLICACION = 'aplicacion',
  CIERRE = 'cierre',
}

export interface SectionMeta {
  id: SectionId;
  order: string;
  shortLabel: string;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
}

export interface ExpandableCardItem {
  id: string;
  category: string;
  title: string;
  summary: string;
  myth: string;
  evidence: string;
  virtualImplication: string;
}

export interface RoundChallenge {
  id: 'round1' | 'round2';
  numberLabel: string;
  title: string;
  epdType: 'positive' | 'negative';
  durationSeconds: number;
  prompt: string;
  contextNote: string;
  options: {
    id: string;
    label: string;
    isCorrect: boolean;
    isCognitiveTrap?: boolean;
    feedback: string;
  }[];
  revealTitle: string;
  revealExplanation: string;
  neuroTakeaway: string;
}

export interface MatchingItem {
  id: string;
  situation: string;
  mechanismId: string;
  mechanismLabel: string;
  strategy: string;
}

export interface DecisionOption {
  id: string;
  label: string;
  description: string;
  quality: 'optimal' | 'partial' | 'counterproductive';
  epdDelta: string;
  attentionImpact: string;
  feedback: string;
  deontologicalNote: string;
}

export interface DecisionScenario {
  id: string;
  contextLabel: string;
  title: string;
  narrative: string;
  question: string;
  options: DecisionOption[];
}

export interface QuizQuestion {
  id: string;
  competency: string;
  stem: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export interface ReferenceItem {
  id: string;
  topic: string;
  apaCitation: string;
  summary: string;
  url: string;
  urlLabel: string;
}

export interface SimulationState {
  challenge: number; // 10 - 100
  skill: number; // 10 - 100
  screenLoad: number; // 0 - 100
  sleepHours: number; // 4 - 9
}

export interface WorkshopProgressState {
  currentSection: SectionId;
  visitedSections: SectionId[];
  baselineGoal: string;
  exploredCardIds: string[];
  simulationAdjusted: boolean;
  round1Choice: string | null;
  round1TimeSpent: number | null;
  round2Choice: string | null;
  round2TimeSpent: number | null;
  sensationReflection: string | null;
  sensationNote: string;
  matchedPairs: Record<string, string>;
  matchingChecked: boolean;
  scenarioChoices: Record<string, string>;
  quizAnswers: Record<string, string>;
  finalCommitment: string;
  lastUpdated: string;
}
