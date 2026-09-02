import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Circle, Clock, Sparkles, ChevronRight, Zap, Target, ShieldCheck } from 'lucide-react';
import { Intervention } from '../../types/assessment';

interface InteractiveRecommendationsProps {
  interventions: {
    immediate: Intervention;
    short: Intervention;
    medium: Intervention;
  };
}

type TabKey = 'immediate' | 'short' | 'medium';

export const InteractiveRecommendations: React.FC<InteractiveRecommendationsProps> = ({
  interventions,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('immediate');
  const [completedActions, setCompletedActions] = useState<Record<string, boolean>>({});

  const tabs: Array<{
    key: TabKey;
    label: string;
    sublabel: string;
    icon: React.ElementType;
    badgeColor: string;
    intervention: Intervention;
  }> = [
    {
      key: 'immediate',
      label: 'Acción Inmediata',
      sublabel: 'Semana 1',
      icon: Zap,
      badgeColor: 'bg-red-50 text-red-700 border-red-200',
      intervention: interventions.immediate,
    },
    {
      key: 'short',
      label: 'Hábitos a Corto Plazo',
      sublabel: 'Mes 1',
      icon: Target,
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      intervention: interventions.short,
    },
    {
      key: 'medium',
      label: 'Sostenibilidad',
      sublabel: 'Trimestral',
      icon: ShieldCheck,
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      intervention: interventions.medium,
    },
  ];

  const currentTab = tabs.find((t) => t.key === activeTab) || tabs[0];
  const currentIntervention = currentTab.intervention;

  const toggleActionCheck = (actionId: string) => {
    setCompletedActions((prev) => ({
      ...prev,
      [actionId]: !prev[actionId],
    }));
  };

  const actionList = currentIntervention.actions && currentIntervention.actions.length > 0
    ? currentIntervention.actions
    : [
        'Establecer horario de cierre digital al finalizar la jornada laboral.',
        'Implementar 2 pausas activas de 5 minutos durante el día para recuperar enfoque.',
        'Conversar con tu líder o equipo sobre la priorización de entregables clave.',
      ];

  const completedCount = actionList.filter((_, idx) => completedActions[`${activeTab}-${idx}`]).length;
  const progressPercent = Math.round((completedCount / actionList.length) * 100);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80 space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            Guía Interactiva de Bienestar
          </div>
          <h2 className="font-display text-2xl font-bold text-slate-900 tracking-tight">
            Recomendaciones para tu Bienestar Integrado
          </h2>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl self-start sm:self-auto overflow-x-auto max-w-full">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-md border border-slate-200/80 scale-[1.02]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-primary-600' : 'text-slate-400'}`} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Tab Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          {/* Card Header & Impact Metadata */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${currentTab.badgeColor}`}>
                  {currentTab.sublabel}
                </span>
                <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {currentIntervention.duration || '1 a 2 semanas'}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 font-display">
                {currentIntervention.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {currentIntervention.description}
              </p>
            </div>

            {/* Completion Progress Widget */}
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex-shrink-0 text-center min-w-[160px] space-y-1.5">
              <div className="text-xs font-bold text-slate-400 uppercase font-mono">Checklist de Avance</div>
              <div className="text-2xl font-black text-primary-600 font-mono">
                {completedCount} / {actionList.length}
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Interactive Actions Checklist */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              Pasos Prácticos Recomendados (Haz clic para marcar avance)
            </h4>

            <div className="grid grid-cols-1 gap-3">
              {actionList.map((actionText, index) => {
                const actionId = `${activeTab}-${index}`;
                const isChecked = !!completedActions[actionId];

                return (
                  <button
                    key={index}
                    onClick={() => toggleActionCheck(actionId)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-4 ${
                      isChecked
                        ? 'bg-emerald-50/60 border-emerald-200 text-slate-800 shadow-xs'
                        : 'bg-white border-slate-200/80 hover:border-primary-300 text-slate-800 hover:shadow-sm'
                    }`}
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      {isChecked ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-300" />
                      )}
                    </div>

                    <div className="flex-1 space-y-1">
                      <span className={`text-xs sm:text-sm leading-relaxed ${isChecked ? 'line-through text-slate-500 font-normal' : 'font-semibold text-slate-900'}`}>
                        {actionText}
                      </span>
                    </div>

                    <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${isChecked ? 'rotate-90 text-emerald-600' : ''}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scientific Evidence Note */}
          {currentIntervention.evidence && (
            <div className="text-xs text-slate-500 bg-white p-3.5 rounded-xl border border-slate-200/80 flex items-center gap-2">
              <span className="font-bold text-slate-700">Evidencia Psicología Organizacional:</span>
              <span>{currentIntervention.evidence}</span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default InteractiveRecommendations;
