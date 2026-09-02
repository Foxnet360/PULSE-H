import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Shield, HeartHandshake, CheckCircle, ArrowRight, Zap, Target, ShieldCheck } from 'lucide-react';
import { Intervention } from '../../types/assessment';

interface ExecutiveRecommendationsProps {
  interventions: {
    immediate: Intervention;
    short: Intervention;
    medium: Intervention;
  };
}

export const InteractiveRecommendations: React.FC<ExecutiveRecommendationsProps> = ({
  interventions,
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80 space-y-8 font-sans">
      {/* Header */}
      <div className="text-center md:text-left space-y-2 border-b border-slate-100 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          Plan de Sostenibilidad Personal
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Hoja de Ruta para tu Bienestar Integrado
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
          Estrategias científicamente fundamentadas para restaurar tu energía, proteger tu salud mental y fortalecer tu desempeño profesional.
        </p>
      </div>

      {/* The Golden Insight Card (Recomendación Principal de Oro) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-amber-50 via-primary-50/40 to-amber-50 rounded-2xl p-6 border border-amber-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 bg-amber-500 text-white rounded-2xl shadow-md flex-shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-800 font-mono">
              💡 La Recomendación Principal (Golden Insight)
            </span>
            <h3 className="font-display font-bold text-lg text-slate-900">
              {interventions.immediate.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {interventions.immediate.description}
            </p>
          </div>
        </div>
      </motion.div>

      {/* 3 Executive Action Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pillar 1: Alivio Inmediato */}
        <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-red-50 text-red-700 font-bold text-[11px] uppercase tracking-wider border border-red-200">
                Paso 1 • Enfoque Inmediato
              </span>
              <Zap className="w-5 h-5 text-red-500" />
            </div>

            <h3 className="font-display font-bold text-lg text-slate-900">
              {interventions.immediate.title}
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              {interventions.immediate.description}
            </p>

            <div className="pt-2 border-t border-slate-200/60 space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                Pautas Clave de Cuidado:
              </span>
              <ul className="space-y-2">
                {(interventions.immediate.actions || [
                  'Establecer horario estricto de desconexión al terminar la jornada.',
                  'Realizar pausas activas de 5 minutos cada 90 minutos de trabajo concentrado.'
                ]).map((act, i) => (
                  <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 font-mono pt-2 border-t border-slate-200/60">
            Plazo sugerido: {interventions.immediate.duration || 'Semana 1'}
          </div>
        </div>

        {/* Pillar 2: Rediseño de Cargas */}
        <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-bold text-[11px] uppercase tracking-wider border border-amber-200">
                Paso 2 • Reorganización
              </span>
              <Target className="w-5 h-5 text-amber-500" />
            </div>

            <h3 className="font-display font-bold text-lg text-slate-900">
              {interventions.short.title}
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              {interventions.short.description}
            </p>

            <div className="pt-2 border-t border-slate-200/60 space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                Pautas Clave de Cuidado:
              </span>
              <ul className="space-y-2">
                {(interventions.short.actions || [
                  'Acordar prioridades claras con tu líder de equipo para evitar sobrecarga.',
                  'Agrupar tareas similares en bloques de tiempo dedicados (Batching).'
                ]).map((act, i) => (
                  <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 font-mono pt-2 border-t border-slate-200/60">
            Plazo sugerido: {interventions.short.duration || 'Mes 1'}
          </div>
        </div>

        {/* Pillar 3: Sostenibilidad Organizacional */}
        <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/80 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px] uppercase tracking-wider border border-emerald-200">
                Paso 3 • Sostenibilidad
              </span>
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
            </div>

            <h3 className="font-display font-bold text-lg text-slate-900">
              {interventions.medium.title}
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed">
              {interventions.medium.description}
            </p>

            <div className="pt-2 border-t border-slate-200/60 space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                Pautas Clave de Cuidado:
              </span>
              <ul className="space-y-2">
                {(interventions.medium.actions || [
                  'Fomentar espacios de escucha activa y apoyo mutuo dentro del equipo.',
                  'Evaluar trimestralmente el estado de equilibrio y clima laboral.'
                ]).map((act, i) => (
                  <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 font-mono pt-2 border-t border-slate-200/60">
            Plazo sugerido: {interventions.medium.duration || 'Trimestral'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveRecommendations;
