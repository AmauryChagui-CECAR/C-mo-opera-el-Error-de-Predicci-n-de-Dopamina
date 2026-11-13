import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SECTIONS } from '../data/workshopData';
import { SectionId } from '../types/workshop';

interface HeaderProps {
  currentSection: SectionId;
  visitedSections: SectionId[];
  progressPercentage: number;
  onNavigate: (section: SectionId) => void;
}

export function Header({
  currentSection,
  visitedSections,
  progressPercentage,
  onNavigate,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const primaryNavSections = SECTIONS.filter((s) => s.id !== SectionId.CIERRE);

  const handleSelect = (id: SectionId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-8">
        <a
          href={`#${SectionId.INICIO}`}
          onClick={(e) => {
            e.preventDefault();
            handleSelect(SectionId.INICIO);
          }}
          className="font-display text-lg font-semibold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
        >
          Del Cerebro al Aula
        </a>

        <nav
          aria-label="Navegación principal del taller"
          className="hidden lg:flex items-center gap-6"
        >
          {primaryNavSections.map((section) => {
            const isActive = currentSection === section.id;
            const isVisited = visitedSections.includes(section.id);
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => handleSelect(section.id)}
                className={`relative py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'text-blue-700'
                    : isVisited
                    ? 'text-slate-700 hover:text-slate-950'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {section.shortLabel}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-[17px] h-0.5 bg-blue-700"
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleSelect(SectionId.CIERRE)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums ${
              currentSection === SectionId.CIERRE
                ? 'bg-blue-700 text-white'
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            Cierre · {progressPercentage}%
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú de secciones'}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div
        role="progressbar"
        aria-valuenow={progressPercentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progreso total del taller"
        className="w-full h-1 bg-slate-100"
      >
        <div
          className="h-full bg-blue-700 transition-transform duration-300 origin-left"
          style={{ transform: `scaleX(${Math.max(0.03, progressPercentage / 100)})` }}
        />
      </div>

      {mobileMenuOpen && (
        <nav
          aria-label="Menú móvil de secciones"
          className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1"
        >
          {SECTIONS.map((section) => {
            const isActive = currentSection === section.id;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => handleSelect(section.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 text-blue-800'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>
                  <span className="font-mono text-xs text-slate-400 mr-2 tabular-nums">
                    {section.order}.
                  </span>
                  {section.shortLabel}
                </span>
                <span className="text-xs text-slate-500 tabular-nums">
                  {section.estimatedMinutes} min
                </span>
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
}
