/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ApplicationSection } from './components/ApplicationSection';
import { ClosingSection } from './components/ClosingSection';
import { ExperientialLabSection } from './components/ExperientialLabSection';
import { FoundationsSection } from './components/FoundationsSection';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ObjectivesSection } from './components/ObjectivesSection';
import { useWorkshopProgress } from './hooks/useWorkshopProgress';
import { SectionId } from './types/workshop';

export default function App() {
  const { progress, navigateTo, updateProgress, resetProgress, completionMetrics } =
    useWorkshopProgress();

  const handleSelectGoal = (goalId: string) => {
    updateProgress((prev) => ({ ...prev, baselineGoal: goalId }));
  };

  const handleToggleCard = (cardId: string) => {
    updateProgress((prev) => {
      if (prev.exploredCardIds.includes(cardId)) return prev;
      return {
        ...prev,
        exploredCardIds: [...prev.exploredCardIds, cardId],
      };
    });
  };

  const handleSimulationInteract = () => {
    updateProgress((prev) =>
      prev.simulationAdjusted ? prev : { ...prev, simulationAdjusted: true }
    );
  };

  const handleCompleteRound = (
    roundId: 'round1' | 'round2',
    optionId: string,
    timeSpent: number
  ) => {
    updateProgress((prev) =>
      roundId === 'round1'
        ? { ...prev, round1Choice: optionId, round1TimeSpent: timeSpent }
        : { ...prev, round2Choice: optionId, round2TimeSpent: timeSpent }
    );
  };

  const handleResetRound = (roundId: 'round1' | 'round2') => {
    updateProgress((prev) =>
      roundId === 'round1'
        ? { ...prev, round1Choice: null, round1TimeSpent: null }
        : { ...prev, round2Choice: null, round2TimeSpent: null }
    );
  };

  const handleSaveSensation = (choiceId: string, note: string) => {
    updateProgress((prev) => ({
      ...prev,
      sensationReflection: choiceId,
      sensationNote: note,
    }));
  };

  const handlePairChange = (situationId: string, mechanismId: string) => {
    updateProgress((prev) => {
      const cleaned: Record<string, string> = {};
      for (const [k, v] of Object.entries(prev.matchedPairs)) {
        if (v !== mechanismId && k !== situationId) {
          cleaned[k] = v;
        }
      }
      cleaned[situationId] = mechanismId;
      return { ...prev, matchedPairs: cleaned, matchingChecked: false };
    });
  };

  const handleCheckMatching = () => {
    updateProgress((prev) => ({ ...prev, matchingChecked: true }));
  };

  const handleResetMatching = () => {
    updateProgress((prev) => ({
      ...prev,
      matchedPairs: {},
      matchingChecked: false,
    }));
  };

  const handleSelectScenarioOption = (scenarioId: string, optionId: string) => {
    updateProgress((prev) => ({
      ...prev,
      scenarioChoices: { ...prev.scenarioChoices, [scenarioId]: optionId },
    }));
  };

  const handleSelectQuizOption = (questionId: string, optionId: string) => {
    updateProgress((prev) => ({
      ...prev,
      quizAnswers: { ...prev.quizAnswers, [questionId]: optionId },
    }));
  };

  const handleSaveCommitment = (text: string) => {
    updateProgress((prev) => ({ ...prev, finalCommitment: text }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header
        currentSection={progress.currentSection}
        visitedSections={progress.visitedSections}
        progressPercentage={completionMetrics.percentage}
        onNavigate={navigateTo}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {progress.currentSection === SectionId.INICIO && (
          <HeroSection
            visitedSections={progress.visitedSections}
            progressPercentage={completionMetrics.percentage}
            completedCount={completionMetrics.completedCount}
            totalMilestones={completionMetrics.totalMilestones}
            onNavigate={navigateTo}
            onReset={resetProgress}
          />
        )}

        {progress.currentSection === SectionId.OBJETIVOS && (
          <ObjectivesSection
            baselineGoal={progress.baselineGoal}
            onSelectGoal={handleSelectGoal}
            onNext={() => navigateTo(SectionId.FUNDAMENTOS)}
          />
        )}

        {progress.currentSection === SectionId.FUNDAMENTOS && (
          <FoundationsSection
            exploredCardIds={progress.exploredCardIds}
            simulationAdjusted={progress.simulationAdjusted}
            onToggleCard={handleToggleCard}
            onSimulationInteract={handleSimulationInteract}
            onPrev={() => navigateTo(SectionId.OBJETIVOS)}
            onNext={() => navigateTo(SectionId.TALLER)}
          />
        )}

        {progress.currentSection === SectionId.TALLER && (
          <ExperientialLabSection
            round1Choice={progress.round1Choice}
            round1TimeSpent={progress.round1TimeSpent}
            round2Choice={progress.round2Choice}
            round2TimeSpent={progress.round2TimeSpent}
            sensationReflection={progress.sensationReflection}
            sensationNote={progress.sensationNote}
            onCompleteRound={handleCompleteRound}
            onResetRound={handleResetRound}
            onSaveSensation={handleSaveSensation}
            onPrev={() => navigateTo(SectionId.FUNDAMENTOS)}
            onNext={() => navigateTo(SectionId.APLICACION)}
          />
        )}

        {progress.currentSection === SectionId.APLICACION && (
          <ApplicationSection
            matchedPairs={progress.matchedPairs}
            matchingChecked={progress.matchingChecked}
            scenarioChoices={progress.scenarioChoices}
            quizAnswers={progress.quizAnswers}
            onPairChange={handlePairChange}
            onCheckMatching={handleCheckMatching}
            onResetMatching={handleResetMatching}
            onSelectScenarioOption={handleSelectScenarioOption}
            onSelectQuizOption={handleSelectQuizOption}
            onPrev={() => navigateTo(SectionId.TALLER)}
            onNext={() => navigateTo(SectionId.CIERRE)}
          />
        )}

        {progress.currentSection === SectionId.CIERRE && (
          <ClosingSection
            progress={progress}
            milestones={completionMetrics.milestones}
            percentage={completionMetrics.percentage}
            onSaveCommitment={handleSaveCommitment}
            onNavigate={navigateTo}
            onReset={resetProgress}
          />
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-500">
          <p>
            Módulo “Del Cerebro al Aula” · Ejercicio Neurocognitivo Integrado 1 · Tutor: Mg. Amaury
            Chagui Hernández
          </p>
          <p>Progreso almacenado localmente en este navegador.</p>
        </div>
      </footer>
    </div>
  );
}
