import { useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Info,
  RotateCcw,
} from 'lucide-react';
import { CONCEPT_CARDS } from '../data/workshopData';
import { SimulationState } from '../types/workshop';

interface FoundationsSectionProps {
  exploredCardIds: string[];
  simulationAdjusted: boolean;
  onToggleCard: (cardId: string) => void;
  onSimulationInteract: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const DEFAULT_SIM: SimulationState = {
  challenge: 65,
  skill: 62,
  screenLoad: 20,
  sleepHours: 7.5,
};

const PRESETS: { id: string; label: string; values: SimulationState }[] = [
  {
    id: 'flow',
    label: 'Reto calibrado (Flow)',
    values: { challenge: 68, skill: 65, screenLoad: 15, sleepHours: 7.5 },
  },
  {
    id: 'impossible',
    label: 'Trampa imposible (R >> H)',
    values: { challenge: 95, skill: 35, screenLoad: 35, sleepHours: 6.5 },
  },
  {
    id: 'screens',
    label: 'Multitarea y scroll',
    values: { challenge: 50, skill: 65, screenLoad: 90, sleepHours: 6.5 },
  },
  {
    id: 'sleep-debt',
    label: 'Trasnocho (4.5 h sueño)',
    values: { challenge: 65, skill: 60, screenLoad: 70, sleepHours: 4.5 },
  },
];

export function FoundationsSection({
  exploredCardIds,
  simulationAdjusted,
  onToggleCard,
  onSimulationInteract,
  onPrev,
  onNext,
}: FoundationsSectionProps) {
  const [sim, setSim] = useState<SimulationState>(DEFAULT_SIM);
  const [activePreset, setActivePreset] = useState<string>('flow');
  const [openCards, setOpenCards] = useState<string[]>(['dopamina-busqueda']);

  const handleSliderChange = (field: keyof SimulationState, value: number) => {
    setActivePreset('custom');
    setSim((prev) => ({ ...prev, [field]: value }));
    onSimulationInteract();
  };

  const applyPreset = (presetId: string, values: SimulationState) => {
    setActivePreset(presetId);
    setSim(values);
    onSimulationInteract();
  };

  const toggleCard = (id: string) => {
    setOpenCards((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    onToggleCard(id);
  };

  const model = useMemo(() => {
    const gap = sim.challenge - sim.skill; // >0 means harder than skill
    const sleepFactor = Math.max(0, Math.min(1, (sim.sleepHours - 4) / 4)); // 0 at 4h, 1 at 8h
    const d2Sensitivity = 0.45 + 0.55 * sleepFactor;
    const screenPenalty = (sim.screenLoad / 100) * 38;

    // Optimal challenge is slightly above skill (+3 to +12)
    const flowFit = 100 - Math.min(100, Math.abs(gap - 6) * 2.1);
    const rawDelta = (flowFit - 52) * d2Sensitivity - screenPenalty;
    const epdDelta = Math.round(Math.max(-60, Math.min(55, rawDelta)));

    const attention = Math.round(
      Math.max(12, Math.min(98, 45 + epdDelta * 0.65 + sleepFactor * 22 - sim.screenLoad * 0.35))
    );
    const metaAlarm = Math.round(
      Math.max(5, Math.min(95, Math.abs(gap) * 1.05 + sim.screenLoad * 0.32 - (epdDelta > 10 ? 15 : 0)))
    );

    let stateLabel = 'Equilibrio atencional moderado';
    let stateTone: 'positive' | 'warning' | 'negative' = 'warning';
    let stateSummary =
      'Existe margen para ajustar el reto o reducir distractores y estabilizar el flujo.';

    if (sim.sleepHours < 5.5) {
      stateLabel = 'Fatiga circadiana y baja sensibilidad D2';
      stateTone = 'negative';
      stateSummary =
        'La deuda de sueño deprime los receptores dopaminérgicos y dificulta sostener la corteza prefrontal activa.';
    } else if (sim.screenLoad >= 70) {
      stateLabel = 'Secuestro por contraste hiper-dopaminérgico';
      stateTone = 'negative';
      stateSummary =
        'Las notificaciones y redes ofrecen recompensa a costo cero; el estudio se percibe lento y pesado.';
    } else if (gap > 28) {
      stateLabel = 'Ansiedad y desplome EPD (Reto >> Habilidad)';
      stateTone = 'negative';
      stateSummary =
        'La brecha supera la capacidad percibida: aparece frustración y tentación de usar atajos pasivos con IA.';
    } else if (gap < -25) {
      stateLabel = 'Aburrimiento por sub-estimulación (Habilidad >> Reto)';
      stateTone = 'warning';
      stateSummary =
        'La tarea no exige esfuerzo significativo; la atención cae por falta de novedad e impredecibilidad.';
    } else if (epdDelta >= 12) {
      stateLabel = 'Canal de Flujo y EPD Positivo (R ≈ H)';
      stateTone = 'positive';
      stateSummary =
        'El reto calibrado dispara señales de progreso (δ > 0) que consolidan memoria y atención sostenida.';
    }

    // Build SVG curve points across 5 cognitive stages (x from 40 to 560, baseline y = 130)
    const baselineY = 135 - Math.round((1 - sleepFactor) * 18);
    const anticipationY = Math.max(
      28,
      Math.min(205, baselineY - Math.round((flowFit * 0.38 - screenPenalty * 0.45)))
    );
    const outcomeY = Math.max(24, Math.min(212, baselineY - Math.round(epdDelta * 1.45)));
    const postEventY = Math.max(
      32,
      Math.min(205, baselineY - Math.round(epdDelta * 0.75))
    );

    const pathD = `M 40 ${baselineY} C 110 ${baselineY}, 145 ${anticipationY}, 210 ${anticipationY} C 280 ${anticipationY}, 315 ${outcomeY}, 385 ${outcomeY} C 455 ${outcomeY}, 490 ${postEventY}, 560 ${postEventY}`;

    return {
      epdDelta,
      attention,
      metaAlarm,
      stateLabel,
      stateTone,
      stateSummary,
      baselineY,
      anticipationY,
      outcomeY,
      postEventY,
      pathD,
    };
  }, [sim]);

  const strokeColor =
    model.stateTone === 'positive'
      ? '#059669'
      : model.stateTone === 'negative'
      ? '#DC2626'
      : '#D97706';

  return (
    <section className="space-y-12">
      <div className="space-y-3 max-w-3xl">
        <p className="text-xs font-medium text-slate-500">
          Tramo 03 <span aria-hidden="true">·</span> Marco neurocognitivo y laboratorio visual
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900">
          Cómo opera el Error de Predicción de Dopamina
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Manipula las variables del simulador para observar en tiempo real cómo el equilibrio entre
          reto y habilidad, la carga de pantallas y las horas de sueño modifican tu señal
          dopaminérgica (δ) y tu atención en el aula virtual.
        </p>
      </div>

      {/* Interactive Two-Zone Simulation Sandbox */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Simulador dinámico: EPD, canal de flujo y carga digital
            </h2>
            <p className="text-sm text-slate-600">
              Selecciona un escenario preconfigurado o ajusta cada parámetro manualmente.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset.id, preset.values)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activePreset === preset.id
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Stage: Interactive SVG & Telemetry */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 sm:p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                  {model.stateTone === 'positive' && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                  {model.stateTone === 'warning' && (
                    <Info className="w-4 h-4 text-amber-600 shrink-0" />
                  )}
                  {model.stateTone === 'negative' && (
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  )}
                  <span>{model.stateLabel}</span>
                </div>
                <span
                  className={`font-mono text-sm font-semibold tabular-nums ${
                    model.epdDelta > 5
                      ? 'text-emerald-700'
                      : model.epdDelta < -5
                      ? 'text-red-700'
                      : 'text-amber-700'
                  }`}
                >
                  δ = {model.epdDelta > 0 ? `+${model.epdDelta}` : model.epdDelta}%
                </span>
              </div>

              <div className="w-full overflow-hidden">
                <svg
                  viewBox="0 0 600 245"
                  role="img"
                  aria-label={`Gráfica del Error de Predicción de Dopamina con valor delta ${model.epdDelta}%`}
                  className="w-full h-auto bg-white border border-slate-200 rounded-md"
                >
                  {/* Grid lines */}
                  <line x1="40" y1="55" x2="565" y2="55" stroke="#E2E8F0" strokeDasharray="4 4" />
                  <line
                    x1="40"
                    y1={model.baselineY}
                    x2="565"
                    y2={model.baselineY}
                    stroke="#94A3B8"
                    strokeWidth="1.5"
                    strokeDasharray="6 4"
                  />
                  <line x1="40" y1="195" x2="565" y2="195" stroke="#E2E8F0" strokeDasharray="4 4" />

                  {/* Zone labels */}
                  <text x="48" y="46" fontSize="11" fill="#059669" fontWeight="600">
                    ▲ Zona de Pico Dopaminérgico (δ &gt; 0 · Consolidación)
                  </text>
                  <text
                    x="48"
                    y={model.baselineY - 6}
                    fontSize="10"
                    fill="#64748B"
                    fontFamily="IBM Plex Mono, monospace"
                  >
                    Tono basal dopaminérgico
                  </text>
                  <text x="48" y="212" fontSize="11" fill="#DC2626" fontWeight="600">
                    ▼ Zona de Desplome (δ &lt; 0 · Escape hacia distractores / IA pasiva)
                  </text>

                  {/* Dynamic curve */}
                  <path
                    d={model.pathD}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Key stage nodes */}
                  <circle cx="40" cy={model.baselineY} r="5" fill="#475569" />
                  <circle cx="210" cy={model.anticipationY} r="5.5" fill={strokeColor} />
                  <circle cx="385" cy={model.outcomeY} r="7" fill={strokeColor} stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="560" cy={model.postEventY} r="5.5" fill={strokeColor} />

                  {/* X-axis phase labels */}
                  <text x="40" y="233" fontSize="10.5" fill="#475569" textAnchor="start">
                    1. Línea base
                  </text>
                  <text x="210" y="233" fontSize="10.5" fill="#475569" textAnchor="middle">
                    2. Anticipación
                  </text>
                  <text x="385" y="233" fontSize="10.5" fill="#0F172A" fontWeight="600" textAnchor="middle">
                    3. Respuesta / Reto
                  </text>
                  <text x="560" y="233" fontSize="10.5" fill="#475569" textAnchor="end">
                    4. Efecto en aula
                  </text>
                </svg>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">{model.stateSummary}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-slate-200 rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Atención sostenida (A)</span>
                  <span className="font-mono font-semibold text-slate-900 tabular-nums">
                    {model.attention}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-700 transition-all duration-200"
                    style={{ width: `${model.attention}%` }}
                  />
                </div>
              </div>

              <div className="border border-slate-200 rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Alarma metacognitiva (M)</span>
                  <span className="font-mono font-semibold text-slate-900 tabular-nums">
                    {model.metaAlarm}%
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-600 transition-all duration-200"
                    style={{ width: `${model.metaAlarm}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Control Deck */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-lg p-5 space-y-5">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Activity className="w-4 h-4 text-blue-700" />
                <span>Variables del entorno virtual</span>
              </div>
              <button
                type="button"
                onClick={() => applyPreset('flow', DEFAULT_SIM)}
                className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restablecer</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <label htmlFor="slider-challenge" className="text-slate-700">
                    Nivel de reto de la tarea (R)
                  </label>
                  <span className="font-mono tabular-nums text-slate-900">{sim.challenge} pts</span>
                </div>
                <input
                  id="slider-challenge"
                  type="range"
                  min={10}
                  max={100}
                  step={1}
                  value={sim.challenge}
                  onChange={(e) => handleSliderChange('challenge', Number(e.target.value))}
                  className="w-full accent-blue-700 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <label htmlFor="slider-skill" className="text-slate-700">
                    Nivel de habilidad actual (H)
                  </label>
                  <span className="font-mono tabular-nums text-slate-900">{sim.skill} pts</span>
                </div>
                <input
                  id="slider-skill"
                  type="range"
                  min={10}
                  max={100}
                  step={1}
                  value={sim.skill}
                  onChange={(e) => handleSliderChange('skill', Number(e.target.value))}
                  className="w-full accent-blue-700 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <label htmlFor="slider-screen" className="text-slate-700">
                    Distractores y contraste de pantallas
                  </label>
                  <span className="font-mono tabular-nums text-slate-900">{sim.screenLoad}%</span>
                </div>
                <input
                  id="slider-screen"
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={sim.screenLoad}
                  onChange={(e) => handleSliderChange('screenLoad', Number(e.target.value))}
                  className="w-full accent-blue-700 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <label htmlFor="slider-sleep" className="text-slate-700">
                    Sueño reparador nocturno
                  </label>
                  <span className="font-mono tabular-nums text-slate-900">
                    {sim.sleepHours.toFixed(1)} h
                  </span>
                </div>
                <input
                  id="slider-sleep"
                  type="range"
                  min={4}
                  max={9}
                  step={0.5}
                  value={sim.sleepHours}
                  onChange={(e) => handleSliderChange('sleepHours', Number(e.target.value))}
                  className="w-full accent-blue-700 cursor-pointer"
                />
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4 text-xs text-slate-600 leading-relaxed">
              {simulationAdjusted ? (
                <span className="text-emerald-700 font-medium">
                  ✓ Interacción con el simulador registrada en tu progreso.
                </span>
              ) : (
                <span>
                  Mueve al menos un control o prueba un escenario para registrar este hito de
                  exploración.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Conceptual Cards */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Tarjetas conceptuales desplegables
            </h2>
            <p className="text-sm text-slate-600">
              Despliega cada tarjeta para contrastar mitos frecuentes con evidencia neuroeducativa.
            </p>
          </div>
          <span className="text-xs font-mono tabular-nums text-slate-500">
            Exploradas: {exploredCardIds.length}/{CONCEPT_CARDS.length}
          </span>
        </div>

        <div className="space-y-3">
          {CONCEPT_CARDS.map((card) => {
            const isOpen = openCards.includes(card.id);
            const isExplored = exploredCardIds.includes(card.id);
            return (
              <div
                key={card.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggleCard(card.id)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>{card.category}</span>
                      {isExplored && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-emerald-700 font-medium">Revisada</span>
                        </>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                      {card.title}
                    </h3>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-4">
                    <p className="text-sm text-slate-700 leading-relaxed">{card.summary}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-1">
                        <p className="text-xs font-semibold text-red-700">Mito frecuente</p>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {card.myth}
                        </p>
                      </div>
                      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-1">
                        <p className="text-xs font-semibold text-blue-800">Evidencia científica</p>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {card.evidence}
                        </p>
                      </div>
                      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-1">
                        <p className="text-xs font-semibold text-emerald-700">
                          Aplicación en aula virtual
                        </p>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                          {card.virtualImplication}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Objetivos</span>
        </button>
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <span>Ir al Taller Vivencial (2 Rondas)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
