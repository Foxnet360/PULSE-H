import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { Building2, AlertCircle, ArrowRight, Check } from 'lucide-react'
import { useLinkManagement } from '../hooks/useLinkManagement'
import AssessmentPage from './AssessmentPage'

const OrganizationAssessmentPage: React.FC = () => {
  const { hash } = useParams<{ hash: string }>()
  const navigate = useNavigate()
  const { getEvaluationByHash } = useLinkManagement()
  
  const [evaluation, setEvaluation] = useState(getEvaluationByHash(hash || ''))
  const [isValidating, setIsValidating] = useState(true)
  const [hasConsented, setHasConsented] = useState(false)

  useEffect(() => {
    // Re-check evaluation after hook loads from localStorage
    const found = getEvaluationByHash(hash || '')
    setEvaluation(found)
    setIsValidating(false)
  }, [hash, getEvaluationByHash])

  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    )
  }

  if (!evaluation) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-primary-100 p-8 text-center"
        >
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>

          <h1 className="font-display text-2xl font-bold text-primary-900 mb-4">
            Evaluación no encontrada
          </h1>

          <p className="text-primary-600 mb-6">
            El link que estás usando no existe o ha sido desactivado.
          </p>

          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-accent text-white font-medium rounded-xl hover:bg-accent-dark transition-colors inline-flex items-center gap-2"
          >
            Volver al inicio
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    )
  }

  if (evaluation.status === 'closed') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-primary-100 p-8 text-center"
        >
          <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-yellow-500" />
          </div>

          <h1 className="font-display text-2xl font-bold text-primary-900 mb-4">
            Evaluación cerrada
          </h1>

          <p className="text-primary-600 mb-6">
            Esta evaluación ha finalizado. Contacta al administrador de tu organización
            si crees que esto es un error.
          </p>
        </motion.div>
      </div>
    )
  }

  // Show organization welcome screen before assessment
  if (!hasConsented) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-primary-100 p-8"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-accent" />
            </div>

            <h1 className="font-display text-2xl font-bold text-primary-900 mb-2">
              {evaluation.organizationName}
            </h1>

            <p className="text-primary-600">
              Te invitan a participar en una evaluación de bienestar laboral
            </p>
          </div>

          {evaluation.customMessage && (
            <div className="bg-primary-50 rounded-xl p-4 mb-6">
              <p className="text-primary-700 text-sm italic">
                "{evaluation.customMessage}"
              </p>
            </div>
          )}

          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-lg">
              <Check className="w-5 h-5 text-accent flex-shrink-0" />
              <span className="text-sm text-primary-700">100% anónimo</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-lg">
              <Check className="w-5 h-5 text-accent flex-shrink-0" />
              <span className="text-sm text-primary-700">Toma aproximadamente 8 minutos</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-lg">
              <Check className="w-5 h-5 text-accent flex-shrink-0" />
              <span className="text-sm text-primary-700">Procesamiento local en tu dispositivo</span>
            </div>
          </div>

          {evaluation.deadline && (
            <div className="text-center text-sm text-primary-500 mb-6">
              Fecha límite: {new Date(evaluation.deadline).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          )}

          <div className="border-t border-primary-100 pt-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={hasConsented}
                onChange={(e) => setHasConsented(e.target.checked)}
                className="mt-1 w-5 h-5 text-accent border-primary-300 rounded focus:ring-accent"
              />
              <span className="text-sm text-primary-700">
                Entiendo que este diagnóstico es una herramienta de autoevaluación,
                no un diagnóstico médico o psicológico clínico. Mis respuestas serán
                procesadas localmente en mi dispositivo y solo se compartirán datos
                agregados anónimos con {evaluation.organizationName}.
              </span>
            </label>

            <button
              onClick={() => setHasConsented(true)}
              disabled={!hasConsented}
              className="w-full mt-6 px-8 py-4 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              Comenzar evaluación
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  // If consented, show the regular assessment
  return <AssessmentPage />
}

export default OrganizationAssessmentPage
