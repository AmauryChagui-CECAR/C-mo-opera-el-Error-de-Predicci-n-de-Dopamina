import { ArrowRight, CheckCircle2, Circle, RotateCcw } from 'lucide-react';
import { SECTIONS } from '../data/workshopData';
import { SectionId } from '../types/workshop';

interface HeroSectionProps {
  visitedSections: SectionId[];
  progressPercentage: number;
  completedCount: number;
  totalMilestones: number;
  onNavigate: (section: SectionId) => void;
  onReset: () => void;
}

export function HeroSection({
  visitedSections,
  progressPercentage,
  completedCount,
  totalMilestones,
  onNavigate,
  onReset,
}: HeroSectionProps) {
  const hasStarted = progressPercentage > 0 || visitedSections.length > 1;

  return (
    <section className="space-y-12">
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-10 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <p className="text-xs sm:text-sm font-medium text-slate-500">
                Ejercicio Neurocognitivo Integrado 1 <span aria-hidden="true">·</span> Modalidad
                Virtual Universitaria <span aria-hidden="true">·</span> Módulo Del Cerebro al Aula
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 leading-[1.12]">
                Taller Vivencial del Error de Predicción de Dopamina
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Experimenta cómo el cerebro universitario anticipa recompensas, reacciona ante la
                frustración o el reto calibrado y decide entre el pensamiento profundo o los atajos
                de la economía cognitiva frente a las pantallas y la inteligencia artificial.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() =>
                  onNavigate(hasStarted ? SectionId.FUNDAMENTOS : SectionId.OBJETIVOS)
                }
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>{hasStarted ? 'Continuar recorrido' : 'Comenzar el taller'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate(SectionId.TALLER)}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-800 text-sm font-medium hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Ir directo al experimento de 2 rondas
              </button>

              {hasStarted && (
                <button
                  type="button"
                  onClick={onReset}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reiniciar progreso</span>
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-lg p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                <span>Resumen de progreso guardado</span>
                <span className="font-mono tabular-nums text-slate-800">
                  {completedCount}/{totalMilestones} hitos
                </span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-700 transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tus respuestas en las rondas cronometradas, el simulador, los escenarios y tus
                reflexiones se conservan automáticamente en este navegador.
              </p>
            </div>

            <div className="border-t border-slate-200 pt-5 space-y-3">
              <p className="text-xs font-semibold text-slate-800">
                Ecuación central del taller
              </p>
              <div className="bg-white border border-slate-200 rounded-md p-4 font-mono text-sm text-slate-900 tabular-nums">
                δ = R<sub>real</sub> − R<sub>esperada</sub>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li>
                  <span className="font-semibold text-emerald-700">δ &gt; 0 (Pico):</span> Reto
                  alcanzable; consolida la atención y el canal de flujo.
                </li>
                <li>
                  <span className="font-semibold text-red-700">δ &lt; 0 (Desplome):</span>{' '}
                  Frustración; empuja hacia redes sociales o uso pasivo de IA.
                </li>
              </ul>
            </div>

            <p className="text-xs text-slate-500 border-t border-slate-200 pt-4">
              Tutor del módulo: Mg. Amaury Chagui Hernández · Duración estimada: 45 min
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Ruta de aprendizaje en seis tramos
            </h2>
            <p className="text-sm text-slate-600">
              Puedes recorrer las secciones en secuencia o acceder directamente a cualquier tramo.
            </p>
          </div>
          <span className="text-xs text-slate-500 font-mono tabular-nums">
            {visitedSections.length} de {SECTIONS.length} tramos explorados
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECTIONS.map((sec) => {
            const visited = visitedSections.includes(sec.id);
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => onNavigate(sec.id)}
                className="group text-left bg-white border border-slate-200 hover:border-blue-600 rounded-xl p-5 transition-colors flex flex-col justify-between gap-4 cursor-pointer"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-mono tabular-nums">Tramo {sec.order}</span>
                    <span className="inline-flex items-center gap-1 font-medium">
                      {visited ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Explorado</span>
                        </>
                      ) : (
                        <>
                          <Circle className="w-3.5 h-3.5 text-slate-400" />
                          <span>Pendiente</span>
                        </>
                      )}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {sec.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{sec.subtitle}</p>
                </div>

                <div className="flex items-center justify-between text-xs font-medium text-slate-500 pt-2 border-t border-slate-100">
                  <span className="tabular-nums">{sec.estimatedMinutes} min aproximados</span>
                  <span className="text-blue-700 group-hover:translate-x-0.5 transition-transform">
                    Abrir →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
