import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAssessment } from '../hooks/useAssessment'
import { assessmentModules } from '../data/assessmentData'
import CircularProgress from '../components/ui/CircularProgress'
import LeadCaptureModal from '../components/leads/LeadCaptureModal'
import { useLeadCapture } from '../hooks/useLeadCapture'
import { useAssessmentTimer } from '../hooks/useAssessmentTimer'
import { ArrowRight, ArrowLeft, Heart, Clock, Save } from 'lucide-react'
import { trackAssessmentStart, trackQuestionAnswered, trackAssessmentComplete, trackLeadCaptureStart, trackLeadCaptureComplete } from '../utils/analytics'

const AssessmentPage: React.FC = () => {
  const navigate = useNavigate()
  const {
    assessment,
    responses,
    currentModule,
    startAssessment,
    setResponse,
    nextModule,
    prevModule,
    getResult,
  } = useAssessment()

  const { captureLead } = useLeadCapture()
  const { formattedTime, minutesElapsed, start: startTimer } = useAssessmentTimer()

  const [hasStarted, setHasStarted] = useState(false)
  const [consentGiven, setConsentGiven] = useState(false)
  const [showLeadCapture, setShowLeadCapture] = useState(false)
  const [assessmentResult, setAssessmentResult] = useState<any>(null)
  const [showToast, setShowToast] = useState<string | null>(null)

  const currentModuleData = assessmentModules[currentModule]
  const currentModuleItems = currentModuleData.items

  useEffect(() => {
    if (!assessment) {
      startAssessment()
    }
  }, [])

  const handleStart = () => {
    if (!consentGiven) return
    setHasStarted(true)
    startTimer()
    trackAssessmentStart()
  }

  const handleResponse = (itemId: string, value: number) => {
    setResponse(itemId, value)
    
    // Track question answered
    const questionIndex = responses.findIndex(r => r.itemId === itemId)
    if (questionIndex >= 0) {
      const moduleId = assessmentModules[currentModule].id
      trackQuestionAnswered(questionIndex + 1, moduleId)
    }
  }

  // beforeunload handler
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const answeredCount = responses.filter(r => r.value !== null).length
      if (answeredCount >= 3) {
        e.preventDefault()
        e.returnValue = `Has invertido ${formattedTime} en esta evaluación. ¿Seguro que quieres salir?`
      }
    }

    if (hasStarted) {
      window.addEventListener('beforeunload', handleBeforeUnload)
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [hasStarted, responses, formattedTime])

  // Toast notifications at milestones
  useEffect(() => {
    const answeredCount = responses.filter(r => r.value !== null).length
    
    if (answeredCount === 18) {
      setShowToast(`¡Llevas ${minutesElapsed} minutos! Ya estás a mitad de camino de tu diagnóstico personalizado.`)
    } else if (answeredCount === 27) {
      setShowToast(`¡Casi terminas! Solo te quedan 9 preguntas para recibir tu informe completo.`)
    }

    // Auto-hide toast after 5 seconds
    if (showToast) {
      const timer = setTimeout(() => setShowToast(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [responses, minutesElapsed, showToast])

  const handleNext = () => {
    if (currentModule < assessmentModules.length - 1) {
      nextModule()
    } else {
      const result = getResult()
      if (result) {
        // Store result in sessionStorage for results page
        sessionStorage.setItem('pulso-h-result', JSON.stringify(result))
        setAssessmentResult(result)
        setShowLeadCapture(true)
        
        // Track assessment complete
        trackAssessmentComplete(minutesElapsed, result.profileName, result.irp)
        trackLeadCaptureStart()
      }
    }
  }

  const handleLeadCapture = async (email: string, gdprConsent: boolean, marketingConsent: boolean) => {
    await captureLead(email, {
      profile: assessmentResult?.profileName,
      irp: assessmentResult?.irp,
      gdprConsent,
      marketingConsent,
    })
    
    // Track lead capture complete
    trackLeadCaptureComplete(assessmentResult?.profileName, marketingConsent)
    
    // Navigate to Thank You Page after successful capture
    navigate('/gracias')
  }

  const getEmojiForValue = (value: number): string => {
    if (value <= 1) return '😌'
    if (value <= 3) return '😐'
    if (value === 4) return '😟'
    return '😫'
  }

  const getLabelForValue = (value: number): string => {
    const labels = [
      'Nunca',
      'Casi nunca',
      'Raramente',
      'A veces',
      'Frecuentemente',
      'Muy frecuentemente',
      'Siempre',
    ]
    return labels[value] || ''
  }

  // Welcome screen
  if (!hasStarted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 pt-24">
        <div className="bg-white rounded-2xl shadow-sm border border-primary-100 p-8">
          <div className="text-center mb-8">
            <Heart className="w-16 h-16 text-accent mx-auto mb-4" />
            <h1 className="font-display text-3xl font-bold text-primary-900 mb-4">
              Bienvenido a PULSO-H
            </h1>
            <p className="text-primary-700 text-lg">
              Descubre el pulso de tu bienestar laboral en 8 minutos
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3 p-4 bg-primary-50 rounded-xl">
              <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-accent font-bold">1</span>
              </div>
              <div>
                <h3 className="font-medium text-primary-900">6 módulos de evaluación</h3>
                <p className="text-sm text-primary-600">Cada uno evalúa una dimensión diferente de tu bienestar</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-primary-50 rounded-xl">
              <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-accent font-bold">2</span>
              </div>
              <div>
                <h3 className="font-medium text-primary-900">100% anónimo</h3>
                <p className="text-sm text-primary-600">Tus respuestas se procesan en tu dispositivo. Nadie más las ve.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-primary-50 rounded-xl">
              <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-accent font-bold">3</span>
              </div>
              <div>
                <h3 className="font-medium text-primary-900">Plan de acción personalizado</h3>
                <p className="text-sm text-primary-600">Recibe recomendaciones específicas basadas en tu perfil</p>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-100 pt-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consentGiven}
                onChange={(e) => setConsentGiven(e.target.checked)}
                className="mt-1 w-5 h-5 text-accent border-primary-300 rounded focus:ring-accent"
              />
              <span className="text-sm text-primary-700">
                Entiendo que este diagnóstico es una herramienta de autoevaluación,
                no un diagnóstico médico o psicológico clínico. Mis respuestas serán
                procesadas localmente en mi dispositivo.
              </span>
            </label>

            <button
              onClick={handleStart}
              disabled={!consentGiven}
              className="w-full mt-6 px-8 py-4 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Comenzar evaluación
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Lead Capture Modal
  if (showLeadCapture) {
    return (
      <LeadCaptureModal
        isOpen={showLeadCapture}
        onClose={() => setShowLeadCapture(false)}
        onSubmit={handleLeadCapture}
        variant="required"
        profile={assessmentResult?.profileName}
        irp={assessmentResult?.irp}
      />
    )
  }

  // Calculate question-level progress
  const totalQuestions = 36
  const answeredQuestions = responses.filter(r => r.value !== null && r.value !== undefined).length
  const questionProgress = Math.round((answeredQuestions / totalQuestions) * 100)
  const currentQuestionNumber = answeredQuestions + 1

  // Assessment form
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 pt-24">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-40 bg-accent text-white px-6 py-3 rounded-xl shadow-lg animate-bounce">
          <p className="text-sm font-medium">{showToast}</p>
        </div>
      )}

      {/* Header */}
      <div className="mb-8" aria-live="polite" aria-atomic="true">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-sm text-primary-500">
                Pregunta {currentQuestionNumber} de {totalQuestions}
              </span>
              <span className="text-sm text-primary-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formattedTime}
              </span>
            </div>
            <h1 className="font-display text-2xl font-bold text-primary-900">
              {currentModuleData.title}
            </h1>
            <p className="text-primary-600">{currentModuleData.description}</p>
          </div>
          <CircularProgress
            progress={questionProgress}
            size={80}
            strokeWidth={6}
            showPercentage={true}
          />
        </div>

        <div className="w-full bg-primary-100 rounded-full h-2">
          <div
            className="bg-accent h-2 rounded-full transition-all duration-300"
            style={{ width: `${questionProgress}%` }}
          />
        </div>
      </div>

      {/* Items */}
      <div className="space-y-6">
        {currentModuleItems.map((item, index) => {
          const response = responses.find(r => r.itemId === item.id)
          const value = response?.value ?? -1

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-sm border border-primary-100 p-6"
            >
              <div className="flex items-start gap-4 mb-6">
                <span className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-sm font-medium text-primary-700">
                  {index + 1}
                </span>
                <p className="text-primary-900 font-medium pt-1">{item.text}</p>
              </div>

              <div className="px-4">
                <input
                  type="range"
                  min="0"
                  max="6"
                  step="1"
                  value={value >= 0 ? value : 3}
                  onChange={(e) => handleResponse(item.id, parseInt(e.target.value))}
                  className="w-full mb-4 accent-accent"
                  aria-label={`Respuesta para: ${item.text}`}
                  aria-valuemin={0}
                  aria-valuemax={6}
                  aria-valuenow={value >= 0 ? value : 3}
                  role="slider"
                />

                <div className="flex justify-between items-center">
                  <span className="text-sm text-primary-500">Nunca</span>
                  <div className="text-center" aria-live="polite">
                    {value >= 0 && (
                      <>
                        <span className="text-2xl" aria-hidden="true">{getEmojiForValue(value)}</span>
                        <div className="text-sm text-primary-600 mt-1">{getLabelForValue(value)}</div>
                      </>
                    )}
                  </div>
                  <span className="text-sm text-primary-500">Siempre</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-8 gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={prevModule}
            disabled={currentModule === 0}
            className="px-6 py-3 bg-white text-primary-700 font-medium rounded-xl border border-primary-200 hover:border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 active:scale-[0.98] motion-reduce:active:scale-100"
          >
            <ArrowLeft className="w-4 h-4" />
            Anterior
          </button>

          <button
            onClick={() => {
              alert('Tu progreso ha sido guardado. Puedes retomar desde este dispositivo.')
            }}
            className="px-4 py-3 text-primary-500 font-medium rounded-xl hover:bg-primary-50 transition-colors flex items-center gap-2 text-sm"
          >
            <Save className="w-4 h-4" />
            Guardar progreso
          </button>
        </div>

        <span className="text-sm text-primary-500">
          {answeredQuestions} de {totalQuestions} respondidas
        </span>

        <button
          onClick={handleNext}
          className="px-6 py-3 bg-accent text-white font-medium rounded-xl hover:bg-accent-dark focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none transition-colors flex items-center gap-2 active:scale-[0.98] motion-reduce:active:scale-100"
        >
          {currentModule === assessmentModules.length - 1 ? 'Finalizar' : 'Siguiente'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default AssessmentPage
