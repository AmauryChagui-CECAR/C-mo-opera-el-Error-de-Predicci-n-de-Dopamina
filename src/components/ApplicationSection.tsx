import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Info,
  Link2,
  RotateCcw,
} from 'lucide-react';
import {
  DECISION_SCENARIOS,
  MATCHING_ITEMS,
  QUIZ_QUESTIONS,
} from '../data/workshopData';

interface ApplicationSectionProps {
  matchedPairs: Record<string, string>;
  matchingChecked: boolean;
  scenarioChoices: Record<string, string>;
  quizAnswers: Record<string, string>;
  onPairChange: (situationId: string, mechanismId: string) => void;
  onCheckMatching: () => void;
  onResetMatching: () => void;
  onSelectScenarioOption: (scenarioId: string, optionId: string) => void;
  onSelectQuizOption: (questionId: string, optionId: string) => void;
  onPrev: () => void;
  onNext: () => void;
}

type ActivityTab = 'matching' | 'scenarios' | 'quiz';

// Fixed deterministic non-trivial order for matching mechanisms
const MECHANISM_POOL = [
  MATCHING_ITEMS[2], // desplome-sostenido
  MATCHING_ITEMS[0], // contraste
  MATCHING_ITEMS[3], // bloqueo-d2
  MATCHING_ITEMS[1], // minimo-esfuerzo
];

export function ApplicationSection({
  matchedPairs,
  matchingChecked,
  scenarioChoices,
  quizAnswers,
  onPairChange,
  onCheckMatching,
  onResetMatching,
  onSelectScenarioOption,
  onSelectQuizOption,
  onPrev,
  onNext,
}: ApplicationSectionProps) {
  const [activeTab, setActiveTab] = useState<ActivityTab>('matching');
  const [selectedSituationId, setSelectedSituationId] = useState<string | null>(
    MATCHING_ITEMS[0].id
  );

  const matchingScore = useMemo(() => {
    return MATCHING_ITEMS.filter(
      (item) => matchedPairs[item.id] === item.mechanismId
    ).length;
  }, [matchedPairs]);

  const quizScore = useMemo(() => {
    return QUIZ_QUESTIONS.filter((q) => {
      const chosen = quizAnswers[q.id];
      return q.options.some((opt) => opt.id === chosen && opt.isCorrect);
    }).length;
  }, [quizAnswers]);

  const handleSelectMechanism = (mechanismId: string) => {
    if (matchingChecked) return;
    const targetSituation =
      selectedSituationId ??
      MATCHING_ITEMS.find((item) => !matchedPairs[item.id])?.id ??
      null;
    if (!targetSituation) return;

    onPairChange(targetSituation, mechanismId);

    // Advance selection automatically to the next unpaired situation
    const nextUnpaired = MATCHING_ITEMS.find(
      (item) => item.id !== targetSituation && !matchedPairs[item.id]
    );
    setSelectedSituationId(nextUnpaired ? nextUnpaired.id : null);
  };

  const allPaired = Object.keys(matchedPairs).length === MATCHING_ITEMS.length;

  return (
    <section className="space-y-10">
      <div className="space-y-3 max-w-3xl">
        <p className="text-xs font-medium text-slate-500">
          Tramo 05 <span aria-hidden="true">·</span> Transferencia práctica y deontología
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900">
          Ejercicios de aplicación y toma de decisiones
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Transfiere lo experimentado a situaciones reales de la vida universitaria virtual.
          Completa las tres actividades interactivas para consolidar criterios neurodidácticos y
          éticos.
        </p>
      </div>

      {/* Segmented Navigation Bar */}
      <div
        role="tablist"
        aria-label="Actividades de aplicación"
        className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 rounded-lg"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'matching'}
          onClick={() => setActiveTab('matching')}
          className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'matching'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          1. Asociación ({Object.keys(matchedPairs).length}/{MATCHING_ITEMS.length})
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'scenarios'}
          onClick={() => setActiveTab('scenarios')}
          className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'scenarios'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          2. Escenarios ({Object.keys(scenarioChoices).length}/{DECISION_SCENARIOS.length})
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'quiz'}
          onClick={() => setActiveTab('quiz')}
          className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
            activeTab === 'quiz'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          3. Juicio Situacional ({Object.keys(quizAnswers).length}/{QUIZ_QUESTIONS.length})
        </button>
      </div>

      {/* Tab 1: Interactive Association */}
      {activeTab === 'matching' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-slate-900">
                Actividad de asociación: situación ↔ mecanismo neurocognitivo
              </h2>
              <p className="text-sm text-slate-600">
                Paso 1: selecciona una situación de la izquierda. Paso 2: haz clic en el mecanismo
                que la explica en la derecha.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                onResetMatching();
                setSelectedSituationId(MATCHING_ITEMS[0].id);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar emparejamiento</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Situations column */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-slate-500">Situaciones del aula virtual</p>
              {MATCHING_ITEMS.map((item, idx) => {
                const isSelected = selectedSituationId === item.id;
                const pairedMechId = matchedPairs[item.id];
                const pairedMech = MATCHING_ITEMS.find(
                  (m) => m.mechanismId === pairedMechId
                );
                const isCorrect =
                  matchingChecked && pairedMechId === item.mechanismId;
                const isWrong =
                  matchingChecked && pairedMechId !== item.mechanismId;

                return (
                  <button
                    key={item.id}
                    type="button"
                    disabled={matchingChecked}
                    onClick={() => setSelectedSituationId(item.id)}
                    className={`w-full text-left p-4 rounded-lg border transition-colors space-y-2 ${
                      matchingChecked ? 'cursor-default' : 'cursor-pointer'
                    } ${
                      isCorrect
                        ? 'border-emerald-600 bg-emerald-50/70'
                        : isWrong
                        ? 'border-red-600 bg-red-50/70'
                        : isSelected
                        ? 'border-blue-700 bg-blue-50/60'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-mono tabular-nums">Situación 0{idx + 1}</span>
                      {pairedMech && (
                        <span className="inline-flex items-center gap-1 font-medium text-blue-800">
                          <Link2 className="w-3.5 h-3.5" />
                          <span>{pairedMech.mechanismLabel}</span>
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-800 leading-relaxed">{item.situation}</p>
                    {matchingChecked && (
                      <p
                        className={`text-xs font-medium pt-1 ${
                          isCorrect ? 'text-emerald-700' : 'text-red-700'
                        }`}
                      >
                        {isCorrect
                          ? `✓ Correcto. Estrategia: ${item.strategy}`
                          : `✕ Correspondía a: «${item.mechanismLabel}». Estrategia: ${item.strategy}`}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mechanisms column */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-slate-500">
                Mecanismos neurocognitivos disponibles
              </p>
              {MECHANISM_POOL.map((mech) => {
                const assignedTo = Object.entries(matchedPairs).find(
                  ([, val]) => val === mech.mechanismId
                )?.[0];
                const assignedIdx = assignedTo
                  ? MATCHING_ITEMS.findIndex((m) => m.id === assignedTo) + 1
                  : null;

                return (
                  <button
                    key={mech.mechanismId}
                    type="button"
                    disabled={matchingChecked}
                    onClick={() => handleSelectMechanism(mech.mechanismId)}
                    className={`w-full text-left p-4 rounded-lg border transition-colors space-y-1.5 ${
                      matchingChecked ? 'cursor-default' : 'cursor-pointer'
                    } ${
                      assignedIdx
                        ? 'border-slate-400 bg-slate-50 text-slate-900'
                        : selectedSituationId
                        ? 'border-slate-200 bg-white hover:border-blue-600 text-slate-800'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-slate-900">
                        {mech.mechanismLabel}
                      </span>
                      {assignedIdx && (
                        <span className="text-xs font-mono tabular-nums text-blue-700 shrink-0">
                          Asociado a 0{assignedIdx}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Rediseño sugerido: {mech.strategy}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4">
            <div className="text-sm text-slate-700">
              {matchingChecked ? (
                <span className="font-semibold text-slate-900 tabular-nums">
                  Resultado: {matchingScore} de {MATCHING_ITEMS.length} asociaciones correctas.
                </span>
              ) : (
                <span>
                  Empareja las {MATCHING_ITEMS.length} situaciones para validar tus respuestas.
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {!matchingChecked ? (
                <button
                  type="button"
                  disabled={!allPaired}
                  onClick={onCheckMatching}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    allPaired
                      ? 'bg-blue-700 text-white hover:bg-blue-800 cursor-pointer'
                      : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Verificar asociaciones
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setActiveTab('scenarios')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Ir a Escenarios de Decisión</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Contextualized Decision Scenarios */}
      {activeTab === 'scenarios' && (
        <div className="space-y-6">
          {DECISION_SCENARIOS.map((scenario) => {
            const chosenId = scenarioChoices[scenario.id];
            const chosenOption = scenario.options.find((o) => o.id === chosenId);

            return (
              <div
                key={scenario.id}
                className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-5"
              >
                <div className="space-y-2">
                  <p className="text-xs font-medium text-slate-500">{scenario.contextLabel}</p>
                  <h2 className="text-xl font-semibold text-slate-900">{scenario.title}</h2>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {scenario.narrative}
                  </p>
                </div>

                <p className="text-sm font-semibold text-slate-900">{scenario.question}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {scenario.options.map((opt) => {
                    const selected = chosenId === opt.id;
                    let borderClass = 'border-slate-200 bg-white hover:border-blue-600';
                    if (selected) {
                      borderClass =
                        opt.quality === 'optimal'
                          ? 'border-emerald-600 bg-emerald-50/70'
                          : opt.quality === 'partial'
                          ? 'border-amber-600 bg-amber-50/70'
                          : 'border-red-600 bg-red-50/70';
                    }

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => onSelectScenarioOption(scenario.id, opt.id)}
                        className={`text-left p-4 rounded-lg border transition-colors flex flex-col justify-between gap-2 cursor-pointer ${borderClass}`}
                      >
                        <span className="text-sm font-semibold text-slate-900 leading-snug">
                          {opt.label}
                        </span>
                        <span className="text-xs text-slate-600 leading-relaxed">
                          {opt.description}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {chosenOption && (
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                          chosenOption.quality === 'optimal'
                            ? 'text-emerald-700'
                            : chosenOption.quality === 'partial'
                            ? 'text-amber-700'
                            : 'text-red-700'
                        }`}
                      >
                        {chosenOption.quality === 'optimal' && (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Decisión neurodidáctica óptima</span>
                          </>
                        )}
                        {chosenOption.quality === 'partial' && (
                          <>
                            <Info className="w-4 h-4" />
                            <span>Solución parcial de bajo rendimiento</span>
                          </>
                        )}
                        {chosenOption.quality === 'counterproductive' && (
                          <>
                            <AlertTriangle className="w-4 h-4" />
                            <span>Riesgo de atajo cognitivo / desplome EPD</span>
                          </>
                        )}
                      </span>
                      <span className="font-mono text-xs text-slate-600">
                        {chosenOption.epdDelta}
                      </span>
                    </div>

                    <p className="text-sm text-slate-800 leading-relaxed">
                      {chosenOption.feedback}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200 text-xs text-slate-600">
                      <div>
                        <span className="font-semibold text-slate-800">Impacto atencional: </span>
                        {chosenOption.attentionImpact}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-800">Criterio deontológico: </span>
                        {chosenOption.deontologicalNote}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setActiveTab('quiz')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <span>Continuar a Verificación de Juicio Situacional</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Situational Judgment Check */}
      {activeTab === 'quiz' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Verificación de juicio situacional
              </h2>
              <p className="text-sm text-slate-600">
                Responde cada ítem para recibir retroalimentación inmediata sobre tu criterio
                neurocognitivo.
              </p>
            </div>
            <div className="font-mono text-sm font-semibold text-slate-900 tabular-nums">
              Aciertos: {quizScore}/{QUIZ_QUESTIONS.length}
            </div>
          </div>

          {QUIZ_QUESTIONS.map((q, qIndex) => {
            const chosenId = quizAnswers[q.id];
            const chosenOpt = q.options.find((o) => o.id === chosenId);

            return (
              <div
                key={q.id}
                className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-4"
              >
                <div className="space-y-1">
                  <p className="text-xs text-slate-500">
                    Pregunta 0{qIndex + 1} <span aria-hidden="true">·</span> {q.competency}
                  </p>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
                    {q.stem}
                  </h3>
                </div>

                <div className="space-y-2.5">
                  {q.options.map((opt) => {
                    const isSelected = chosenId === opt.id;
                    let cls =
                      'border-slate-200 bg-white hover:border-blue-600 text-slate-800';
                    if (isSelected) {
                      cls = opt.isCorrect
                        ? 'border-emerald-600 bg-emerald-50/70 text-slate-900 font-medium'
                        : 'border-red-600 bg-red-50/70 text-slate-900';
                    }

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => onSelectQuizOption(q.id, opt.id)}
                        className={`w-full text-left p-4 rounded-lg border text-sm leading-relaxed transition-colors flex items-start justify-between gap-3 cursor-pointer ${cls}`}
                      >
                        <span>{opt.text}</span>
                        {isSelected && opt.isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        )}
                        {isSelected && !opt.isCorrect && (
                          <AlertTriangle className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {chosenOpt && (
                  <div
                    className={`rounded-lg border p-4 text-sm leading-relaxed ${
                      chosenOpt.isCorrect
                        ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                        : 'bg-red-50/60 border-red-200 text-red-950'
                    }`}
                  >
                    {chosenOpt.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Taller EPD</span>
        </button>
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <span>Ir al Cierre y Aprendizajes</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
