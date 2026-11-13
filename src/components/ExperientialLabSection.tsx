import { useEffect, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Play,
  RotateCcw,
} from 'lucide-react';
import { SENSATION_CHOICES, TWO_ROUNDS } from '../data/workshopData';
import { RoundChallenge } from '../types/workshop';

interface ExperientialLabSectionProps {
  round1Choice: string | null;
  round1TimeSpent: number | null;
  round2Choice: string | null;
  round2TimeSpent: number | null;
  sensationReflection: string | null;
  sensationNote: string;
  onCompleteRound: (roundId: 'round1' | 'round2', optionId: string, timeSpent: number) => void;
  onResetRound: (roundId: 'round1' | 'round2') => void;
  onSaveSensation: (choiceId: string, note: string) => void;
  onPrev: () => void;
  onNext: () => void;
}

interface RoundCardProps {
  round: RoundChallenge;
  selectedOptionId: string | null;
  timeSpent: number | null;
  locked?: boolean;
  onComplete: (optionId: string, secondsSpent: number) => void;
  onReset: () => void;
}

function RoundCard({
  round,
  selectedOptionId,
  timeSpent,
  locked = false,
  onComplete,
  onReset,
}: RoundCardProps) {
  const [started, setStarted] = useState(Boolean(selectedOptionId));
  const [secondsLeft, setSecondsLeft] = useState(round.durationSeconds);

  const isAnswered = Boolean(selectedOptionId);
  const timerExpired = started && !isAnswered && secondsLeft <= 0;

  useEffect(() => {
    if (!started || isAnswered || secondsLeft <= 0) return;
    const interval = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [started, isAnswered, secondsLeft]);

  const handleStart = () => {
    setSecondsLeft(round.durationSeconds);
    setStarted(true);
  };

  const handleSelectOption = (optionId: string) => {
    if (isAnswered) return;
    const elapsed = Math.max(1, round.durationSeconds - secondsLeft);
    onComplete(optionId, elapsed);
  };

  const handleRetry = () => {
    setSecondsLeft(round.durationSeconds);
    setStarted(false);
    onReset();
  };

  const selectedOption = round.options.find((o) => o.id === selectedOptionId);
  const progressRatio = Math.max(0, Math.min(100, (secondsLeft / round.durationSeconds) * 100));

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <p className="text-xs font-medium text-slate-500">
            {round.numberLabel} <span aria-hidden="true">·</span> Límite:{' '}
            <span className="font-mono tabular-nums">{round.durationSeconds} s</span>
          </p>
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">{round.title}</h2>
        </div>

        {started && !isAnswered && (
          <div className="flex items-center gap-2 font-mono text-sm font-semibold tabular-nums">
            <Clock
              className={`w-4 h-4 ${secondsLeft <= 5 ? 'text-red-600' : 'text-blue-700'}`}
            />
            <span className={secondsLeft <= 5 ? 'text-red-700' : 'text-slate-900'}>
              {secondsLeft}s restantes
            </span>
          </div>
        )}

        {isAnswered && (
          <button
            type="button"
            onClick={handleRetry}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Repetir ronda</span>
          </button>
        )}
      </div>

      {locked ? (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-600">
          Completa primero la <span className="font-semibold text-slate-900">Ronda 01</span> para
          experimentar el contraste temporal y dopaminérgico de esta segunda ronda.
        </div>
      ) : !started ? (
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-4">
          <p className="text-sm text-slate-700 leading-relaxed">{round.contextNote}</p>
          <button
            type="button"
            onClick={handleStart}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 transition-colors cursor-pointer"
          >
            <Play className="w-4 h-4" />
            <span>Iniciar {round.numberLabel} ({round.durationSeconds} s)</span>
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {!isAnswered && (
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  secondsLeft <= 5 ? 'bg-red-600' : 'bg-blue-700'
                }`}
                style={{ width: `${progressRatio}%` }}
              />
            </div>
          )}

          <p className="text-base sm:text-lg text-slate-900 font-medium leading-relaxed">
            {round.prompt}
          </p>

          {timerExpired && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 text-sm text-red-900">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Tiempo agotado:</span> Así se siente la presión
                temporal cuando bloquea la deliberación. Selecciona igualmente tu primera intuición
                para analizar el efecto neurocognitivo.
              </div>
            </div>
          )}

          <div className="space-y-2.5">
            {round.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              let cardStyle =
                'border-slate-200 bg-white hover:border-blue-600 text-slate-800';
              if (isAnswered) {
                if (isSelected && opt.isCorrect) {
                  cardStyle = 'border-emerald-600 bg-emerald-50/70 text-slate-900';
                } else if (isSelected && !opt.isCorrect) {
                  cardStyle = 'border-red-600 bg-red-50/70 text-slate-900';
                } else if (opt.isCorrect) {
                  cardStyle = 'border-emerald-300 bg-emerald-50/30 text-slate-800';
                } else {
                  cardStyle = 'border-slate-200 bg-slate-50/60 text-slate-500';
                }
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full text-left p-4 rounded-lg border transition-colors text-sm leading-relaxed flex items-start justify-between gap-3 ${
                    isAnswered ? 'cursor-default' : 'cursor-pointer'
                  } ${cardStyle}`}
                >
                  <span>{opt.label}</span>
                  {isAnswered && opt.isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  )}
                  {isAnswered && isSelected && !opt.isCorrect && (
                    <AlertTriangle className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {isAnswered && selectedOption && (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span
                  className={`font-semibold inline-flex items-center gap-1.5 ${
                    selectedOption.isCorrect ? 'text-emerald-700' : 'text-red-700'
                  }`}
                >
                  {selectedOption.isCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Respuesta acertada</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4" />
                      <span>
                        {selectedOption.isCognitiveTrap
                          ? 'Atajo por economía cognitiva'
                          : 'Error por presión temporal'}
                      </span>
                    </>
                  )}
                </span>
                {timeSpent !== null && (
                  <span className="font-mono tabular-nums text-slate-500">
                    Tiempo empleado: {timeSpent}s de {round.durationSeconds}s
                  </span>
                )}
              </div>

              <p className="text-sm text-slate-800 leading-relaxed">{selectedOption.feedback}</p>

              <div className="border-t border-slate-200 pt-3 space-y-1.5">
                <p className="text-xs font-semibold text-blue-800">{round.revealTitle}</p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {round.revealExplanation}
                </p>
                <p className="text-xs font-medium text-slate-600 pt-1">
                  Clave de transferencia: {round.neuroTakeaway}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function ExperientialLabSection({
  round1Choice,
  round1TimeSpent,
  round2Choice,
  round2TimeSpent,
  sensationReflection,
  sensationNote,
  onCompleteRound,
  onResetRound,
  onSaveSensation,
  onPrev,
  onNext,
}: ExperientialLabSectionProps) {
  const [noteDraft, setNoteDraft] = useState(sensationNote);
  const round1 = TWO_ROUNDS[0];
  const round2 = TWO_ROUNDS[1];

  const round1Opt = round1.options.find((o) => o.id === round1Choice);
  const round2Opt = round2.options.find((o) => o.id === round2Choice);
  const bothCompleted = Boolean(round1Choice && round2Choice);
  const selectedSensation = SENSATION_CHOICES.find((c) => c.id === sensationReflection);

  return (
    <section className="space-y-10">
      <div className="space-y-3 max-w-3xl">
        <p className="text-xs font-medium text-slate-500">
          Tramo 04 <span aria-hidden="true">·</span> Experimento vivencial de dos rondas
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900">
          Taller vivencial: el choque dopaminérgico
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          No basta con leer qué es el Error de Predicción de Dopamina: vas a experimentar la
          diferencia entre un reto calibrado de pensamiento lateral y una trampa diseñada para
          activar la economía cognitiva bajo presión temporal.
        </p>
      </div>

      <div className="space-y-6">
        <RoundCard
          round={round1}
          selectedOptionId={round1Choice}
          timeSpent={round1TimeSpent}
          onComplete={(optId, sec) => onCompleteRound('round1', optId, sec)}
          onReset={() => onResetRound('round1')}
        />

        <RoundCard
          round={round2}
          selectedOptionId={round2Choice}
          timeSpent={round2TimeSpent}
          locked={!round1Choice}
          onComplete={(optId, sec) => onCompleteRound('round2', optId, sec)}
          onReset={() => onResetRound('round2')}
        />
      </div>

      {/* Metacognitive Debriefing */}
      {bothCompleted && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-slate-900">
              Espejo metacognitivo: ¿qué ocurrió en tu cerebro?
            </h2>
            <p className="text-sm text-slate-600">
              Compara tu vivencia física y mental entre la Ronda 1 y la Ronda 2.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 border border-slate-200 rounded-lg p-4">
            <div className="space-y-1">
              <p className="text-xs text-slate-500 font-mono tabular-nums">
                Ronda 01 · Tiempo: {round1TimeSpent ?? 0}s
              </p>
              <p className="text-sm font-semibold text-slate-900">
                {round1Opt?.isCorrect
                  ? '▲ Logro equilibrado (δ > 0)'
                  : '● Ajuste de expectativa'}
              </p>
              <p className="text-xs text-slate-600">
                Reto con margen de análisis lateral que favorece la activación dopaminérgica.
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-slate-500 font-mono tabular-nums">
                Ronda 02 · Tiempo: {round2TimeSpent ?? 0}s
              </p>
              <p className="text-sm font-semibold text-slate-900">
                {round2Opt?.isCorrect
                  ? '▲ Inhibición prefrontal exitosa'
                  : '▼ Captura por economía cognitiva (δ < 0)'}
              </p>
              <p className="text-xs text-slate-600">
                La urgencia de 10 s favorece la respuesta automática y el desplome por sorpresa.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-slate-900">
              1. ¿Cuál sensación describe mejor tu transición de la Ronda 1 a la Ronda 2?
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SENSATION_CHOICES.map((choice) => {
                const active = sensationReflection === choice.id;
                return (
                  <button
                    key={choice.id}
                    type="button"
                    onClick={() => onSaveSensation(choice.id, noteDraft)}
                    className={`text-left p-4 rounded-lg border text-sm leading-relaxed transition-colors cursor-pointer ${
                      active
                        ? 'border-blue-700 bg-blue-50/70 text-slate-900 font-medium'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    {choice.label}
                  </button>
                );
              })}
            </div>
          </div>

          {selectedSensation && (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm text-slate-700 leading-relaxed">
              <span className="font-semibold text-slate-900">Lectura neurocognitiva: </span>
              {selectedSensation.interpretation}
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="sensation-note"
              className="block text-sm font-semibold text-slate-900"
            >
              2. Nota breve de autoobservación (opcional)
            </label>
            <textarea
              id="sensation-note"
              rows={2}
              value={noteDraft}
              onChange={(e) => {
                setNoteDraft(e.target.value);
                if (sensationReflection) {
                  onSaveSensation(sensationReflection, e.target.value);
                }
              }}
              placeholder="Ej.: En la segunda ronda sentí el impulso de contestar rápido sin leer bien; me pasa igual cuando tengo poco tiempo en plataforma..."
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Fundamentos</span>
        </button>
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <span>Continuar a Aplicación y Deontología</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
