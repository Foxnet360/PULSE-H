import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AssessmentResult, Intervention } from '../types/assessment';
import { getRecommendedInterventions } from '../data/interventionData';
import { getProfileColor } from '../utils/assessmentEngine';
import { Heart, Sparkles, User, Activity } from 'lucide-react';
import { trackResultsView } from '../utils/analytics';
import DimensionRadarChart from '../components/dashboard/DimensionRadarChart';
import InteractiveRecommendations from '../components/results/InteractiveRecommendations';

const PDFReportGenerator = lazy(() => import('../components/pdf/PDFReportGenerator'));

const dimensionLabels: Record<string, string> = {
  energia: 'Mi Energía (Agotamiento Emocional)',
  conexion: 'Mi Conexión (Relación & Empatía)',
  proposito: 'Mi Propósito (Realización Personal)',
  entorno: 'Mi Entorno (Factores de Clima)',
  equilibrio: 'Mi Equilibrio (Vida - Trabajo)',
  fortaleza: 'Mi Fortaleza (Resiliencia & Recursos)',
  ae: 'Agotamiento Emocional',
  dp: 'Despersonalización',
  rp: 'Realización Personal',
  for: 'Factores Organizacionales',
  cvt: 'Conciliación Vida-Trabajo',
  rri: 'Resiliencia & Recursos',
};

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [interventions, setInterventions] = useState<{
    immediate: Intervention;
    short: Intervention;
    medium: Intervention;
  } | null>(null);

  useEffect(() => {
    const isDemo = window.location.hash === '#demo';

    if (isDemo) {
      const demoDims = {
        ae: { score: 76, rawScore: 27, level: 'alto' as const, label: 'Agotamiento Alto', description: 'Fatiga emocional elevada por exigencia sostenida.' },
        dp: { score: 64, rawScore: 19, level: 'moderado' as const, label: 'Cinismo Moderado', description: 'Desconexión y distanciamiento moderados del trabajo.' },
        rp: { score: 82, rawScore: 29, level: 'bajo' as const, label: 'Realización Alta', description: 'Sentido de propósito y logro bien conservados.' },
        for: { score: 70, rawScore: 70, level: 'moderado' as const, label: 'Moderado', description: 'Factores Organizacionales: Nivel adecuado' },
        cvt: { score: 56, rawScore: 56, level: 'moderado' as const, label: 'Moderado', description: 'Conciliación Vida-Trabajo: Nivel adecuado' },
        rri: { score: 78, rawScore: 78, level: 'alto' as const, label: 'Alto', description: 'Recursos de Resiliencia: Necesita atención' },
      };
      const mockResult: AssessmentResult = {
        id: 'demo-result-123',
        timestamp: new Date(),
        dimensions: demoDims,
        subscales: { ae: demoDims.ae, dp: demoDims.dp, rp: demoDims.rp },
        customDimensions: { for: demoDims.for, cvt: demoDims.cvt, rri: demoDims.rri },
        irp: 58,
        irpZone: 'naranja',
        irpLabel: 'En Alerta',
        irpDescription: 'Sientes fatiga acumulada y desconexión inicial. Es importante tomar acciones preventivas ahora.',
        profile: 'requete',
        profileName: 'En Alerta',
        profileDescription: 'Sientes fatiga acumulada y desconexión inicial. Es importante tomar acciones preventivas ahora.',
      };

      setResult(mockResult);
      setInterventions(getRecommendedInterventions(mockResult.profile, mockResult.dimensions));
      return;
    }

    const savedResult = sessionStorage.getItem('pulso-h-result');
    if (savedResult) {
      const parsed = JSON.parse(savedResult);
      parsed.timestamp = new Date(parsed.timestamp);
      setResult(parsed);
      setInterventions(getRecommendedInterventions(parsed.profile, parsed.dimensions));
      trackResultsView();
      return;
    }

    const leadId = sessionStorage.getItem('pulso-h-lead-id');
    if (!leadId) {
      navigate('/evaluar', { replace: true });
    }
  }, [navigate]);

  if (!result) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 pt-24 font-sans">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 text-center">
          <h1 className="font-display text-2xl font-bold text-slate-900 mb-4">
            No hay resultados disponibles
          </h1>
          <p className="text-slate-600 mb-6">
            Completa la evaluación para ver tus resultados.
          </p>
          <button
            onClick={() => navigate('/evaluar')}
            className="px-6 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors"
          >
            Comenzar evaluación
          </button>
        </div>
      </div>
    );
  }

  const profileColor = getProfileColor(result.profile);

  // Format dimensions array for Radar Chart
  const radarDimensions = Object.entries(result.dimensions).map(([key, dim]) => ({
    key,
    label: dimensionLabels[key] ? dimensionLabels[key].split(' (')[0] : key,
    score: dim.score <= 5 ? Math.round((dim.score / 5) * 100) : dim.score,
  }));

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 pt-24 font-sans space-y-8">
      {/* Executive Header Banner - Centered on the Human Being */}
      <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-slate-200/80 text-left space-y-4 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 border border-primary-200 text-primary-700 font-bold text-xs uppercase tracking-wider">
          <Heart className="w-4 h-4 text-accent fill-accent" />
          Diagnóstico Humano de Bienestar • PULSO-H
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Tu Estado de Bienestar: <span style={{ color: profileColor }} className="underline decoration-accent">{result.profileName}</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
          {result.profileDescription}
        </p>

        {/* Holistic Reassurance Pill */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-start gap-3 mt-4">
          <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            <strong className="font-bold text-slate-900">Enfoque ACRUX:</strong> En nuestra firma creemos que las organizaciones prósperas nacen de individuos sanos, valorados y escuchados. Este informe no es una etiqueta, sino una hoja de ruta para cuidar tu energía y potencial humano.
          </p>
        </div>
      </div>

      {/* Holistic Alert Banner (Replaces economic loss alert with Human Sustainability) */}
      <div className="bg-gradient-to-r from-amber-50 via-primary-50/30 to-amber-50 border border-amber-200 rounded-3xl p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-amber-100/80 rounded-2xl text-amber-700 flex-shrink-0">
            <Activity className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900">
              🌱 Análisis de Sostenibilidad Personal &amp; Clima Laboral
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Tu Índice de Riesgo Psicosocial (IRP) se encuentra en <strong className="text-slate-900 font-bold">{result.irp}%</strong> (Zona {result.irpZone.toUpperCase()}).
              Esto indica la necesidad de introducir pausas activas, balance de cargas y espacios de recuperación sostenibles para resguardar tu salud mental y motivación.
            </p>
          </div>
        </div>
      </div>

      {/* Radar Chart & Dimension Analysis */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80 space-y-8">
        <div className="text-center md:text-left space-y-2">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Mapa Holístico de Dimensiones Evaluadas
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Visualización radial del balance entre tu energía, entorno, propósito y recursos de resiliencia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Radar Chart Component */}
          <div className="flex justify-center p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
            <DimensionRadarChart dimensions={radarDimensions} size={340} />
          </div>

          {/* Dimension Detailed List with Correct Labels */}
          <div className="space-y-4">
            {Object.entries(result.dimensions).map(([key, dimension]) => {
              const label = dimensionLabels[key] || dimensionLabels[key.toLowerCase()] || key;
              const val = dimension.score <= 5 ? Math.round((dimension.score / 5) * 100) : dimension.score;
              const statusColor = val >= 70 ? 'bg-emerald-500' : val >= 50 ? 'bg-amber-500' : 'bg-red-500';

              return (
                <div key={key} className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold text-slate-800">{label}</span>
                    <span className="text-xs font-bold text-primary-700 font-mono">{val}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full ${statusColor} rounded-full transition-all duration-500`}
                      style={{ width: `${val}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Holistic Recommendations & Action Plan (Interactive GUI) */}
      {interventions && (
        <InteractiveRecommendations interventions={interventions} />
      )}

      {/* PDF Download & Executive Consultation CTAs */}
      <div className="bg-gradient-to-br from-[#0D111A] via-[#1B2A4A] to-[#0D111A] text-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-accent/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white">Descargá tu Informe Ejecutivo en PDF</h3>
          <p className="text-xs sm:text-sm text-slate-300">Descargá el documento completo con tablas de dimensiones y guía de bienestar.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Suspense fallback={<div className="text-xs text-white">Cargando PDF...</div>}>
            <PDFReportGenerator result={result} />
          </Suspense>

          <Link
            to="/agendar"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent text-primary-900 font-bold text-xs sm:text-sm rounded-xl hover:bg-accent-dark transition-all shadow-md"
          >
            <User className="w-4 h-4" />
            <span>Agendar Ahora</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
