import { ArrowRight, BookOpen, Brain, Check, Compass, ShieldCheck } from 'lucide-react';
import { BASELINE_OPTIONS } from '../data/workshopData';
import { SectionId } from '../types/workshop';

interface ObjectivesSectionProps {
  baselineGoal: string;
  onSelectGoal: (goalId: string) => void;
  onNext: () => void;
}

const COMPETENCIES = [
  {
    id: 'neuro',
    icon: Brain,
    domain: 'Dimensión neurobiológica',
    title: 'Caracterizar el circuito de anticipación y EPD',
    description:
      'Comprender por qué la dopamina responde a la expectativa y al error de predicción (δ), diferenciándola del placer pasivo inmediato.',
  },
  {
    id: 'meta',
    icon: Compass,
    domain: 'Dimensión metacognitiva',
    title: 'Regular la atención frente a pantallas y fatiga',
    description:
      'Detectar el momento exacto en que la economía cognitiva o la deuda de sueño inducen la distracción en entornos virtuales.',
  },
  {
    id: 'deonto',
    icon: ShieldCheck,
    domain: 'Dimensión deontológica',
    title: 'Transformar la IA en entrenador cognitivo',
    description:
      'Sustituir el uso pasivo de herramientas de inteligencia artificial por estrategias socráticas que consoliden competencias reales.',
  },
];

export function ObjectivesSection({
  baselineGoal,
  onSelectGoal,
  onNext,
}: ObjectivesSectionProps) {
  return (
    <section className="space-y-10">
      <div className="space-y-3 max-w-3xl">
        <p className="text-xs font-medium text-slate-500">
          Tramo 02 <span aria-hidden="true">·</span> Propósito formativo y competencias
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900">
          Objetivos de aprendizaje del taller
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          En la educación superior virtual, la competencia por tu atención es constante. Este
          ejercicio busca que experimentes en primera persona cómo opera el Error de Predicción de
          Dopamina (EPD) para convertirlo en un aliado de tu estudio consciente y ético.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex items-start gap-3">
          <BookOpen className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-slate-900">Resultado de aprendizaje esperado</h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Al finalizar este taller podrás analizar tus propias caídas motivacionales durante el
              estudio virtual, recalibrar la dificultad de tus tareas hacia el canal de flujo (Reto ≈
              Habilidad) y diseñar rutinas de estudio e interacción con la IA libres de atajos
              cognitivos vacíos.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2 border-t border-slate-100">
          {COMPETENCIES.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-xs font-medium text-blue-700">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.domain}</span>
                </div>
                <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900">
            Activación inicial: define tu foco personal
          </h2>
          <p className="text-sm text-slate-600">
            Antes de entrar al simulador y al experimento de dos rondas, selecciona el desafío que
            más se repite en tu rutina universitaria virtual. Esta elección guiará la síntesis de tu
            cierre.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3" role="radiogroup" aria-label="Desafío principal en el estudio virtual">
          {BASELINE_OPTIONS.map((option) => {
            const selected = baselineGoal === option.id;
            return (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => onSelectGoal(option.id)}
                className={`text-left p-4 rounded-lg border transition-colors flex items-start gap-3 cursor-pointer ${
                  selected
                    ? 'border-blue-700 bg-blue-50/70 text-slate-900'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                }`}
              >
                <span
                  className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                    selected
                      ? 'border-blue-700 bg-blue-700 text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {selected && <Check className="w-3.5 h-3.5" />}
                </span>
                <span className="text-sm leading-relaxed font-medium">{option.label}</span>
              </button>
            );
          })}
        </div>

        {baselineGoal && (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm text-slate-700">
            <span className="font-semibold text-slate-900">Foco registrado:</span> Tu objetivo
            quedó guardado para contrastarlo al final del taller con las estrategias de regulación
            dopaminérgica.
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-2">
        <a
          href={`#${SectionId.INICIO}`}
          onClick={(e) => {
            e.preventDefault();
            window.location.hash = SectionId.INICIO;
          }}
          className="text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          ← Volver al inicio
        </a>
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <span>Continuar a Fundamentos y Simulador</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
