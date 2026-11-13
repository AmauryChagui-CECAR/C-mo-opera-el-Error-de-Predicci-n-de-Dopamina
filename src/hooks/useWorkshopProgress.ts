import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  CONCEPT_CARDS,
  DECISION_SCENARIOS,
  MATCHING_ITEMS,
  QUIZ_QUESTIONS,
  SECTIONS,
} from '../data/workshopData';
import { SectionId, WorkshopProgressState } from '../types/workshop';

const STORAGE_KEY = 'epd_taller_neurocognitivo_v1';

const DEFAULT_PROGRESS: WorkshopProgressState = {
  currentSection: SectionId.INICIO,
  visitedSections: [SectionId.INICIO],
  baselineGoal: '',
  exploredCardIds: [],
  simulationAdjusted: false,
  round1Choice: null,
  round1TimeSpent: null,
  round2Choice: null,
  round2TimeSpent: null,
  sensationReflection: null,
  sensationNote: '',
  matchedPairs: {},
  matchingChecked: false,
  scenarioChoices: {},
  quizAnswers: {},
  finalCommitment: '',
  lastUpdated: new Date().toISOString(),
};

function parseHashToSection(): SectionId | null {
  if (typeof window === 'undefined') return null;
  const raw = window.location.hash.replace('#', '').trim() as SectionId;
  const valid = Object.values(SectionId).includes(raw);
  return valid ? raw : null;
}

function loadSavedState(): WorkshopProgressState {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const hashSection = parseHashToSection();
      if (hashSection) {
        return {
          ...DEFAULT_PROGRESS,
          currentSection: hashSection,
          visitedSections: Array.from(new Set([SectionId.INICIO, hashSection])),
        };
      }
      return DEFAULT_PROGRESS;
    }
    const parsed = JSON.parse(raw) as Partial<WorkshopProgressState>;
    const hashSection = parseHashToSection();
    const currentSection =
      hashSection ??
      (parsed.currentSection && Object.values(SectionId).includes(parsed.currentSection)
        ? parsed.currentSection
        : SectionId.INICIO);

    const visited = Array.isArray(parsed.visitedSections)
      ? parsed.visitedSections.filter((s): s is SectionId =>
          Object.values(SectionId).includes(s)
        )
      : [SectionId.INICIO];

    if (!visited.includes(currentSection)) {
      visited.push(currentSection);
    }

    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      currentSection,
      visitedSections: visited,
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function useWorkshopProgress() {
  const [progress, setProgress] = useState<WorkshopProgressState>(loadSavedState);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage quota errors gracefully in restricted environments
    }
  }, [progress]);

  useEffect(() => {
    const onHashChange = () => {
      const target = parseHashToSection();
      if (target) {
        setProgress((prev) => {
          const visited = prev.visitedSections.includes(target)
            ? prev.visitedSections
            : [...prev.visitedSections, target];
          return {
            ...prev,
            currentSection: target,
            visitedSections: visited,
            lastUpdated: new Date().toISOString(),
          };
        });
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigateTo = useCallback((section: SectionId) => {
    if (typeof window !== 'undefined') {
      window.location.hash = section;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setProgress((prev) => {
      const visited = prev.visitedSections.includes(section)
        ? prev.visitedSections
        : [...prev.visitedSections, section];
      return {
        ...prev,
        currentSection: section,
        visitedSections: visited,
        lastUpdated: new Date().toISOString(),
      };
    });
  }, []);

  const updateProgress = useCallback(
    (updater: (prev: WorkshopProgressState) => WorkshopProgressState) => {
      setProgress((prev) => ({
        ...updater(prev),
        lastUpdated: new Date().toISOString(),
      }));
    },
    []
  );

  const resetProgress = useCallback(() => {
    const fresh: WorkshopProgressState = {
      ...DEFAULT_PROGRESS,
      lastUpdated: new Date().toISOString(),
    };
    setProgress(fresh);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        // Ignore
      }
      window.location.hash = SectionId.INICIO;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const completionMetrics = useMemo(() => {
    const milestones = [
      {
        id: 'objetivos-meta',
        label: 'Meta personal definida en Objetivos',
        done: Boolean(progress.baselineGoal),
      },
      {
        id: 'simulador',
        label: 'Simulador de EPD explorado',
        done: progress.simulationAdjusted,
      },
      {
        id: 'tarjetas',
        label: `Tarjetas conceptuales exploradas (${progress.exploredCardIds.length}/${CONCEPT_CARDS.length})`,
        done: progress.exploredCardIds.length >= 2,
      },
      {
        id: 'ronda1',
        label: 'Ronda 1 del taller vivencial completada',
        done: Boolean(progress.round1Choice),
      },
      {
        id: 'ronda2',
        label: 'Ronda 2 del taller vivencial completada',
        done: Boolean(progress.round2Choice),
      },
      {
        id: 'reflexion-epd',
        label: 'Registro metacognitivo de sensaciones EPD',
        done: Boolean(progress.sensationReflection),
      },
      {
        id: 'asociacion',
        label: 'Actividad de asociación validada',
        done:
          progress.matchingChecked &&
          Object.keys(progress.matchedPairs).length === MATCHING_ITEMS.length,
      },
      {
        id: 'escenarios',
        label: `Escenarios de decisión resueltos (${Object.keys(progress.scenarioChoices).length}/${DECISION_SCENARIOS.length})`,
        done: Object.keys(progress.scenarioChoices).length === DECISION_SCENARIOS.length,
      },
      {
        id: 'cuestionario',
        label: `Verificación situacional completada (${Object.keys(progress.quizAnswers).length}/${QUIZ_QUESTIONS.length})`,
        done: Object.keys(progress.quizAnswers).length === QUIZ_QUESTIONS.length,
      },
      {
        id: 'compromiso',
        label: 'Compromiso deontológico redactado',
        done: progress.finalCommitment.trim().length >= 12,
      },
    ];

    const completedCount = milestones.filter((m) => m.done).length;
    const percentage = Math.round((completedCount / milestones.length) * 100);
    const currentIndex = SECTIONS.findIndex((s) => s.id === progress.currentSection);

    return {
      milestones,
      completedCount,
      totalMilestones: milestones.length,
      percentage,
      currentIndex,
      prevSection: currentIndex > 0 ? SECTIONS[currentIndex - 1] : null,
      nextSection: currentIndex < SECTIONS.length - 1 ? SECTIONS[currentIndex + 1] : null,
    };
  }, [progress]);

  return {
    progress,
    navigateTo,
    updateProgress,
    resetProgress,
    completionMetrics,
  };
}
