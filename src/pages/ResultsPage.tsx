import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AssessmentResult, Intervention } from '../types/assessment'
import { getRecommendedInterventions } from '../data/interventionData'
import { getProfileColor, getIRPZoneColor } from '../utils/assessmentEngine'
import { Download, Calendar, ChevronDown, ChevronUp, AlertTriangle, TrendingUp, ArrowRight, Compass } from 'lucide-react'
import { getTestimonialsByProfile } from '../data/testimonials'
import { trackResultsView, trackPDFDownload, trackCTAClick } from '../utils/analytics'

const ResultsPage: React.FC = () => {
  const navigate = useNavigate()
  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [interventions, setInterventions] = useState<{
    immediate: Intervention
    short: Intervention
    medium: Intervention
  } | null>(null)
  const [expandedAction, setExpandedAction] = useState<string | null>(null)

  useEffect(() => {
    // Check if user has completed lead capture
    const leadId = sessionStorage.getItem('pulso-h-lead-id')
    if (!leadId) {
      // Redirect to evaluation if no lead_id
      navigate('/evaluar', { replace: true })
      return
    }

    const savedResult = sessionStorage.getItem('pulso-h-result')
    if (savedResult) {
      const parsed = JSON.parse(savedResult)
      // Convert string dates back to Date objects
      parsed.timestamp = new Date(parsed.timestamp)
      setResult(parsed)

      // Get recommendations
      const recs = getRecommendedInterventions(parsed.profile, parsed.dimensions)
      setInterventions(recs)
      
      // Track results view
      trackResultsView()
    }
  }, [navigate])

  if (!result) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 pt-24">
        <div className="bg-white rounded-2xl shadow-sm border border-primary-100 p-8 text-center">
          <h1 className="font-display text-2xl font-bold text-primary-900 mb-4">
            No hay resultados disponibles
          </h1>
          <p className="text-primary-700 mb-6">
            Completa la evaluación para ver tus resultados.
          </p>
          <button
            onClick={() => navigate('/evaluar')}
            className="px-6 py-3 bg-accent text-white font-medium rounded-xl hover:bg-accent-dark transition-colors"
          >
            Comenzar evaluación
          </button>
        </div>
      </div>
    )
  }

  const profileColor = getProfileColor(result.profile)
  const irpColor = getIRPZoneColor(result.irpZone)

  const handleDownloadPDF = () => {
    trackPDFDownload()
    // TODO: Implement PDF generation
    alert('Función de descarga de PDF en desarrollo')
  }

  const toggleAction = (id: string) => {
    setExpandedAction(expandedAction === id ? null : id)
  }

  // Calculate productivity metrics
  const hoursLost = Math.floor(result.irp / 8)
  const opportunityCost = hoursLost * 250 * 4 // Approx $250 MXN/hour * 4 weeks

  const testimonials = getTestimonialsByProfile(result.profileName)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pt-24">
      {/* Urgency Alert Banner */}
      {result.irp > 50 && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h2 className="font-display text-xl font-bold text-red-800 mb-2">
                ⚠️ ALERTA DE PRODUCTIVIDAD
              </h2>
              <p className="text-red-700 mb-2">
                Tu IRP de {result.irp} indica riesgo {result.irpZone === 'roja' ? 'ALTO' : result.irpZone === 'naranja' ? 'MODERADO-ALTO' : 'MODERADO'}.
                Estás perdiendo ~{hoursLost} horas semanales de productividad.
              </p>
              <p className="text-red-600 text-sm">
                Costo estimado: ~${opportunityCost.toLocaleString()} MXN mensuales en pérdida de productividad
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Profile Card */}
      <div
        className="bg-white rounded-2xl shadow-lg border-2 p-8 mb-8 text-center"
        style={{ borderColor: profileColor }}
      >
        <div
          className="inline-block px-4 py-1 rounded-full text-white text-sm font-medium mb-4"
          style={{ backgroundColor: profileColor }}
        >
          {result.profileName}
        </div>

        <h1 className="font-display text-3xl font-bold text-primary-900 mb-4">
          {result.profileDescription}
        </h1>

        <p className="text-primary-600">
          Tu pulso indica que estás en un momento de {result.profileName.toLowerCase()}.
          Esto no es un veredicto, es una invitación.
        </p>
      </div>

      {/* IRP Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-primary-100 p-8 mb-8">
        <h2 className="font-display text-2xl font-bold text-primary-900 mb-6">
          Índice de Riesgo Psicosocial
        </h2>

        <div className="flex items-center justify-center mb-6">
          <div className="relative w-48 h-48">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="8"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={irpColor}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(result.irp / 100) * 283} 283`}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-4xl font-bold" style={{ color: irpColor }}>
                {result.irp}
              </span>
              <span className="text-sm text-primary-500">{result.irpLabel}</span>
            </div>
          </div>
        </div>

        <p className="text-center text-primary-700">
          {result.irpDescription}
        </p>
      </div>

      {/* Dimensions */}
      <div className="bg-white rounded-2xl shadow-sm border border-primary-100 p-8 mb-8">
        <h2 className="font-display text-2xl font-bold text-primary-900 mb-6">
          Dimensiones Evaluadas
        </h2>

        <div className="space-y-4">
          {Object.entries(result.dimensions).map(([key, dimension]) => (
            <div key={key} className="flex items-center gap-4">
              <div className="w-32 flex-shrink-0">
                <span className="text-sm font-medium text-primary-700 capitalize">
                  {key === 'ae' ? 'Agotamiento Emocional' :
                   key === 'dp' ? 'Despersonalización' :
                   key === 'rp' ? 'Realización Personal' :
                   key === 'for' ? 'Factores Organizacionales' :
                   key === 'cvt' ? 'Conciliación Vida-Trabajo' :
                   'Resiliencia'}
                </span>
              </div>
              <div className="flex-1">
                <div className="w-full bg-primary-100 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all"
                    style={{
                      width: `${dimension.score}%`,
                      backgroundColor: getIRPZoneColor(
                        dimension.score <= 25 ? 'verde' :
                        dimension.score <= 50 ? 'amarilla' :
                        dimension.score <= 75 ? 'naranja' : 'roja'
                      ),
                    }}
                  />
                </div>
              </div>
              <div className="w-16 text-right">
                <span className="text-sm font-medium">{Math.round(dimension.score)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

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
          {/* Calendly */}
          <a
            href="https://calendly.com/acrux-consultores/30min"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCTAClick('calendly')}
            className="group bg-accent-50 rounded-xl p-6 hover:bg-accent-100 transition-colors cursor-pointer"
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
          </a>

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
          <button
            onClick={handleDownloadPDF}
            className="group bg-green-50 rounded-xl p-6 hover:bg-green-100 transition-colors text-left w-full"
          >
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Download className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-primary-900 mb-2">Descargar informe</h3>
            <p className="text-sm text-primary-600 mb-4">Obtén tu reporte completo en PDF para compartir con tu equipo.</p>
            <span className="inline-flex items-center text-green-600 text-sm font-semibold">
              Descargar
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResultsPage
