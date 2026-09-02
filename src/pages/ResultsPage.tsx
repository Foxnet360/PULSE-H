import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { AssessmentResult, Intervention } from '../types/assessment';
import { getRecommendedInterventions } from '../data/interventionData';
import { getProfileColor, getIRPZoneColor } from '../utils/assessmentEngine';
import { Heart, Sparkles, Shield, User, ArrowRight, Activity } from 'lucide-react';
import { trackResultsView, trackPDFDownload, trackCTAClick } from '../utils/analytics';
import DimensionRadarChart from '../components/dashboard/DimensionRadarChart';

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
      const mockResult: AssessmentResult = {
        id: 'demo-result-123',
        timestamp: new Date(),
        dimensions: {
          energia: { score: 3.8, percentage: 76, level: 'Agotamiento Alto' },
          conexion: { score: 3.2, percentage: 64, level: 'Cinismo Moderado' },
          proposito: { score: 4.1, percentage: 82, level: 'Realización Alta' },
          entorno: { score: 3.5, percentage: 70, level: 'Carga Elevada' },
          equilibrio: { score: 2.8, percentage: 56, level: 'Falta de Desconexión' },
          fortaleza: { score: 3.9, percentage: 78, level: 'Resiliencia Buena' },
        },
        irp: 58,
        irpZone: 'naranja',
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

  const radarDimensions = Object.entries(result.dimensions).map(([key, dim]) => ({
    key,
    label: dimensionLabels[key] ? dimensionLabels[key].split(' (')[0] : key,
    score: dim.score !== undefined ? (dim.score <= 5 ? Math.round((dim.score / 5) * 100) : dim.score) : dim.percentage || 60,
  }));

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 pt-24 font-sans space-y-8">
      <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-slate-200/80 text-left space-y-4 relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 border border-primary-200 text-primary-700 font-bold text-xs uppercase tracking-wider">
          <Heart className="w-4 h-4 text-accent fill-accent" />
          Diagnóstico Humano de Bienestar • PULSO-H
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
          Tu Estado de Bienestar: <span style={{ color: profileColor }} className="underline decoration-accent">{result.profileName}</span>
        </h1>


      {/* Action Plan */}
      {interventions && (
        <div className="bg-white rounded-2xl shadow-sm border border-primary-100 p-8 mb-8">
          <h2 className="font-display text-2xl font-bold text-primary-900 mb-6">
            Plan de Acción Personalizado
          </h2>

          <div className="space-y-4">
            {[
              { key: 'immediate', label: 'Acción Inmediata', intervention: interventions.immediate },
              { key: 'short', label: 'Acción Corto Plazo', intervention: interventions.short },
              { key: 'medium', label: 'Acción Medio Plazo', intervention: interventions.medium },
            ].map(({ key, label, intervention }) => (
              <div
                key={key}
                className="border border-primary-100 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleAction(intervention.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-primary-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                      {label}
                    </span>
                    <span className="font-medium text-primary-900">{intervention.title}</span>
                  </div>
                  {expandedAction === intervention.id ? (
                    <ChevronUp className="w-5 h-5 text-primary-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-primary-400" />
                  )}
                </button>

                {expandedAction === intervention.id && (
                  <div className="px-6 pb-4 border-t border-primary-100 pt-4">
                    <p className="text-primary-700 mb-4">{intervention.description}</p>

                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <span className="text-primary-500">
                        ⏱️ {intervention.duration}
                      </span>
                      <span className="text-primary-500">
                        📊 {intervention.evidence}
                      </span>
                    </div>

                    <ol className="list-decimal list-inside space-y-2">
                      {intervention.actions.map((action, index) => (
                        <li key={index} className="text-primary-700">{action}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-primary-100 p-8 mb-8">
          <h2 className="font-display text-2xl font-bold text-primary-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-accent" />
            Casos de éxito similares
          </h2>
          <div className="space-y-4">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-primary-50 rounded-xl p-6">
                <p className="text-primary-700 italic mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-primary-900">{testimonial.author}</p>
                    <p className="text-sm text-primary-500">{testimonial.role} - {testimonial.company}</p>
                  </div>
                  <span className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full">
                    {testimonial.metric}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next Steps Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-primary-100 p-8">
        <h2 className="font-display text-2xl font-bold text-primary-900 text-center mb-8">
          ¿Quieres profundizar en tus resultados?
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Internal scheduling */}
          <Link
            to="/agendar"
            onClick={() => trackCTAClick('schedule')}
            className="group bg-accent-50 rounded-xl p-6 hover:bg-accent-100 transition-colors cursor-pointer block"
          >
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-primary-900 mb-2">Agendar consultoría</h3>
            <p className="text-sm text-primary-600 mb-4">30 minutos gratuitos para interpretar tus resultados de bienestar.</p>
            <span className="inline-flex items-center text-accent text-sm font-semibold">
              Agendar ahora
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          {/* Services */}
          <a
            href="https://acrux.life/soluciones"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCTAClick('services')}
            className="group bg-primary-50 rounded-xl p-6 hover:bg-primary-100 transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-primary-900 mb-2">Ver soluciones</h3>
            <p className="text-sm text-primary-600 mb-4">Conoce cómo ayudamos a mejorar el bienestar de equipos como el tuyo.</p>
            <span className="inline-flex items-center text-primary-600 text-sm font-semibold">
              Explorar
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>

          {/* PDF */}
          <Suspense fallback={
            <div className="group bg-green-50 rounded-xl p-6 flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-green-600 animate-spin" />
            </div>
          }>
            <PDFReportGenerator
              result={result}
              interventions={interventions}
            >
              {(generatePDF, isGenerating, progress) => (
                <button
                  onClick={() => {
                    trackPDFDownload()
                    generatePDF()
                  }}
                  disabled={isGenerating}
                  className="group bg-green-50 rounded-xl p-6 hover:bg-green-100 transition-colors text-left w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {isGenerating ? (
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    ) : (
                      <Download className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <h3 className="font-semibold text-primary-900 mb-2">
                    {isGenerating ? `Generando PDF... ${progress}%` : 'Descargar informe'}
                  </h3>
                  <p className="text-sm text-primary-600 mb-4">Obtén tu reporte completo en PDF para compartir con tu equipo.</p>
                  <span className="inline-flex items-center text-green-600 text-sm font-semibold">
                    {isGenerating ? 'Generando...' : 'Descargar'}
                    {!isGenerating && (
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    )}
                  </span>
                </button>
              )}
            </PDFReportGenerator>
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default ResultsPage
