import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Circle,
  Copy,
  ExternalLink,
  RotateCcw,
} from 'lucide-react';
import {
  APA_REFERENCES,
  BASELINE_OPTIONS,
  DECISION_SCENARIOS,
  MATCHING_ITEMS,
  QUIZ_QUESTIONS,
  SENSATION_CHOICES,
  TWO_ROUNDS,
} from '../data/workshopData';
import { SectionId, WorkshopProgressState } from '../types/workshop';

interface ClosingSectionProps {
  progress: WorkshopProgressState;
  milestones: { id: string; label: string; done: boolean }[];
  percentage: number;
  onSaveCommitment: (text: string) => void;
  onNavigate: (section: SectionId) => void;
  onReset: () => void;
}

export function ClosingSection({
  progress,
  milestones,
  percentage,
  onSaveCommitment,
  onNavigate,
  onReset,
}: ClosingSectionProps) {
  const [copied, setCopied] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const baselineLabel =
    BASELINE_OPTIONS.find((b) => b.id === progress.baselineGoal)?.label ??
    'Aún no seleccionado en el tramo de Objetivos.';

  const sensationLabel =
    SENSATION_CHOICES.find((s) => s.id === progress.sensationReflection)?.label ??
    'Pendiente de registro en el Taller vivencial.';

  const matchingScore = useMemo(
    () =>
      MATCHING_ITEMS.filter(
        (m) => progress.matchedPairs[m.id] === m.mechanismId
      ).length,
    [progress.matchedPairs]
  );

  const quizScore = useMemo(
    () =>
      QUIZ_QUESTIONS.filter((q) => {
        const ans = progress.quizAnswers[q.id];
        return q.options.some((o) => o.id === ans && o.isCorrect);
      }).length,
    [progress.quizAnswers]
  );

  const optimalScenarios = useMemo(
    () =>
      DECISION_SCENARIOS.filter((s) => {
        const chosen = progress.scenarioChoices[s.id];
        return s.options.some((o) => o.id === chosen && o.quality === 'optimal');
      }).length,
    [progress.scenarioChoices]
  );

  const round1Result = TWO_ROUNDS[0].options.find(
    (o) => o.id === progress.round1Choice
  );
  const round2Result = TWO_ROUNDS[1].options.find(
    (o) => o.id === progress.round2Choice
  );

  const handleCopySummary = async () => {
    const summaryText = [
      'SÍNTESIS — TALLER VIVENCIAL DEL ERROR DE PREDICCIÓN DE DOPAMINA (EPD)',
      `Progreso completado: ${percentage}%`,
      `Foco inicial: ${baselineLabel}`,
      `Ronda 1 (30 s): ${round1Result ? round1Result.label : 'Sin responder'}`,
      `Ronda 2 (10 s): ${round2Result ? round2Result.label : 'Sin responder'}`,
      `Reflexión metacognitiva: ${sensationLabel}`,
      `Asociación: ${matchingScore}/${MATCHING_ITEMS.length} · Escenarios óptimos: ${optimalScenarios}/${DECISION_SCENARIOS.length} · Juicio situacional: ${quizScore}/${QUIZ_QUESTIONS.length}`,
      `Compromiso ético-neurodidáctico: ${progress.finalCommitment || 'Sin redactar'}`,
    ].join('\n');

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="space-y-10">
      <div className="space-y-3 max-w-3xl">
        <p className="text-xs font-medium text-slate-500">
          Tramo 06 <span aria-hidden="true">·</span> Cierre y transferencia
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900">
          Síntesis de aprendizajes alcanzados
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Revisa el balance de tu recorrido vivencial, consolida tu compromiso deontológico frente
          al uso de pantallas e inteligencia artificial y consulta las fuentes científicas abiertas.
        </p>
      </div>

      {/* Key Learned Takeaways */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Cuatro aprendizajes clave del taller
            </h2>
            <p className="text-sm text-slate-600">
              Principios neurodidácticos verificados en las actividades del módulo.
            </p>
          </div>
          <span className="font-mono text-sm font-semibold text-blue-800 tabular-nums">
            Avance global: {percentage}%
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 space-y-2">
            <p className="text-xs font-semibold text-blue-800">01. Anticipación y δ</p>
            <h3 className="text-base font-semibold text-slate-900">
              La dopamina regula la búsqueda, no la pasividad
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Los retos calibrados (δ &gt; 0) sostienen la atención y el canal de flujo (R ≈ H); las
              trampas ambiguas o presiones desmedidas (δ &lt; 0) provocan frustración y huida.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 space-y-2">
            <p className="text-xs font-semibold text-blue-800">02. Arquitectura de entorno</p>
            <h3 className="text-base font-semibold text-slate-900">
              Competir contra la economía cognitiva ciega
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Un ayuno dopaminérgico de 5–10 minutos antes de estudiar y la fragmentación en
              micro-retos reducen el atractivo inmediato de redes sociales y notificaciones.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 space-y-2">
            <p className="text-xs font-semibold text-blue-800">03. Deontología con IA</p>
            <h3 className="text-base font-semibold text-slate-900">
              La IA como andamio socrático, nunca sustituto
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Delegar la escritura bloquea la autofagia neurocognitiva. Usarla para debatir tesis
              propias o detectar contradicciones fortalece competencias profesionales reales.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 space-y-2">
            <p className="text-xs font-semibold text-blue-800">04. Cronobiología y sueño</p>
            <h3 className="text-base font-semibold text-slate-900">
              El descanso nocturno protege los receptores D2
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              Limitar la luz azul nocturna y resguardar ciclos No-REM y REM garantiza la limpieza
              glinfática, la consolidación sináptica y la motivación al día siguiente.
            </p>
          </div>
        </div>
      </div>

      {/* Personal Journey Snapshot & Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-5">
          <h2 className="text-xl font-semibold text-slate-900">
            Registro de tu desempeño en este taller
          </h2>

          <dl className="divide-y divide-slate-100 text-sm">
            <div className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
              <dt className="font-medium text-slate-600">Desafío prioritario elegido</dt>
              <dd className="text-slate-900 sm:text-right max-w-md">{baselineLabel}</dd>
            </div>
            <div className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
              <dt className="font-medium text-slate-600">Ronda 1 · Reto equilibrado</dt>
              <dd className="text-slate-900 font-mono tabular-nums">
                {round1Result
                  ? `${round1Result.isCorrect ? 'Acertado' : 'Revisado'} (${progress.round1TimeSpent ?? 0}s)`
                  : 'Pendiente'}
              </dd>
            </div>
            <div className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
              <dt className="font-medium text-slate-600">Ronda 2 · Presión y atajo</dt>
              <dd className="text-slate-900 font-mono tabular-nums">
                {round2Result
                  ? `${round2Result.isCorrect ? 'Inhibición exitosa' : 'Atajo detectado'} (${progress.round2TimeSpent ?? 0}s)`
                  : 'Pendiente'}
              </dd>
            </div>
            <div className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
              <dt className="font-medium text-slate-600">Asociación neurocognitiva</dt>
              <dd className="text-slate-900 font-mono tabular-nums">
                {progress.matchingChecked
                  ? `${matchingScore}/${MATCHING_ITEMS.length} aciertos`
                  : 'Sin verificar'}
              </dd>
            </div>
            <div className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
              <dt className="font-medium text-slate-600">Escenarios de decisión</dt>
              <dd className="text-slate-900 font-mono tabular-nums">
                {optimalScenarios}/{DECISION_SCENARIOS.length} decisiones óptimas
              </dd>
            </div>
            <div className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
              <dt className="font-medium text-slate-600">Juicio situacional</dt>
              <dd className="text-slate-900 font-mono tabular-nums">
                {quizScore}/{QUIZ_QUESTIONS.length} respuestas correctas
              </dd>
            </div>
          </dl>

          <div className="border-t border-slate-100 pt-5 space-y-3">
            <label
              htmlFor="final-commitment"
              className="block text-sm font-semibold text-slate-900"
            >
              Tu compromiso práctico y deontológico para tu próxima semana de estudio virtual
            </label>
            <textarea
              id="final-commitment"
              rows={3}
              value={progress.finalCommitment}
              onChange={(e) => onSaveCommitment(e.target.value)}
              placeholder="Ej.: Haré un ayuno de pantallas de 10 minutos antes de estudiar, dividiré mis lecturas en bloques de 25 minutos y usaré la IA únicamente para cuestionar mis propios borradores..."
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400"
            />

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <button
                type="button"
                onClick={handleCopySummary}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Síntesis copiada al portapapeles' : 'Copiar síntesis personal'}</span>
              </button>

              {!confirmReset ? (
                <button
                  type="button"
                  onClick={() => setConfirmReset(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-red-700 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reiniciar todo el progreso</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-red-700 font-medium">¿Borrar respuestas guardadas?</span>
                  <button
                    type="button"
                    onClick={() => {
                      setConfirmReset(false);
                      onReset();
                    }}
                    className="px-2.5 py-1 rounded bg-red-600 text-white font-semibold hover:bg-red-700 cursor-pointer"
                  >
                    Sí, reiniciar
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmReset(false)}
                    className="px-2.5 py-1 rounded border border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Milestones Checklist */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Lista de verificación del taller</h2>
          <p className="text-xs text-slate-600">
            Cada hito se marca automáticamente conforme completas las actividades.
          </p>
          <ul className="space-y-2.5">
            {milestones.map((m) => (
              <li key={m.id} className="flex items-start gap-2.5 text-sm">
                {m.done ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                )}
                <span className={m.done ? 'text-slate-800' : 'text-slate-500'}>{m.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Open-Access APA References */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-5">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-slate-900">
            Referencias bibliográficas de acceso abierto (APA 7.ª ed.)
          </h2>
          <p className="text-sm text-slate-600">
            Fuentes científicas de respaldo del módulo “Del Cerebro al Aula”.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {APA_REFERENCES.map((ref) => (
            <article key={ref.id} className="py-4 first:pt-0 last:pb-0 space-y-1.5">
              <p className="text-xs font-medium text-slate-500">{ref.topic}</p>
              <p className="text-sm font-medium text-slate-900 leading-relaxed">
                {ref.apaCitation}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">{ref.summary}</p>
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:underline pt-0.5"
              >
                <span>{ref.urlLabel}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </article>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => onNavigate(SectionId.APLICACION)}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a Aplicación</span>
        </button>
        <button
          type="button"
          onClick={() => onNavigate(SectionId.INICIO)}
          className="px-4 py-2 rounded-lg border border-slate-300 bg-white text-sm font-medium text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          Volver a la portada
        </button>
      </div>
    </section>
  );
}
