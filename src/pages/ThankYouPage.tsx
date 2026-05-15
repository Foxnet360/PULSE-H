import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { Calendar, ArrowRight, FileText, AlertTriangle, Clock } from 'lucide-react'
import { trackThankYouView, trackCTAClick } from '../utils/analytics'

interface ThankYouData {
  profileName: string
  profileDescription: string
  profileColor: string
  irp: number
  irpLabel: string
  irpZone: string
}

const ThankYouPage: React.FC = () => {
  const navigate = useNavigate()
  const [data, setData] = useState<ThankYouData | null>(null)
  const [countdown, setCountdown] = useState(48 * 60 * 60) // 48 hours in seconds
  const [hoursLost, setHoursLost] = useState(0)

  useEffect(() => {
    const savedResult = sessionStorage.getItem('pulso-h-result')
    const leadId = sessionStorage.getItem('pulso-h-lead-id')

    if (!savedResult || !leadId) {
      navigate('/evaluar')
      return
    }

    try {
      const result = JSON.parse(savedResult)
      setData({
        profileName: result.profileName,
        profileDescription: result.profileDescription,
        profileColor: result.profileColor || '#f5a623',
        irp: result.irp,
        irpLabel: result.irpLabel,
        irpZone: result.irpZone,
      })
      
      // Calculate productivity loss: floor(irp / 8) hours per week
      setHoursLost(Math.floor(result.irp / 8))
      
      // Track Thank You Page view
      trackThankYouView(result.irp)
    } catch {
      navigate('/evaluar')
    }
  }, [navigate])

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return

    const timer = setInterval(() => {
      setCountdown(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [countdown])

  const formatCountdown = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getUrgencyMessage = (irp: number) => {
    if (irp >= 75) return 'Tu equipo está en RIESGO ALTO de burnout. La intervención es urgente.'
    if (irp >= 50) return 'Tu equipo muestra signos de agotamiento que requieren atención.'
    return 'Tu equipo está en una zona de riesgo moderado. Prevenir ahora es clave.'
  }

  const getBenchmarkText = (irp: number) => {
    if (irp > 60) return 'El 73% de empresas en tu sector tienen mejor bienestar laboral'
    if (irp > 40) return 'El 45% de empresas en tu sector tienen mejor bienestar laboral'
    return 'Tu bienestar está por encima del promedio de tu sector'
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pt-24">
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg border-2 p-8 mb-8 text-center"
        style={{ borderColor: data.profileColor }}
      >
        <div
          className="inline-block px-4 py-2 rounded-full text-white text-sm font-bold mb-4"
          style={{ backgroundColor: data.profileColor }}
        >
          {data.profileName}
        </div>

        <h1 className="font-display text-3xl font-bold text-primary-900 mb-4">
          {data.profileDescription}
        </h1>

        <div className="flex items-center justify-center gap-2 text-primary-600 mb-4">
          <span className="font-display text-4xl font-bold" style={{ color: data.profileColor }}>
            {data.irp}
          </span>
          <span className="text-lg">/100 {data.irpLabel}</span>
        </div>
      </motion.div>

      {/* Productivity Loss Alert */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8"
      >
        <div className="flex items-start gap-4">
          <AlertTriangle className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
          <div>
            <h2 className="font-display text-xl font-bold text-red-800 mb-2">
              ⚠️ Pérdida de Productividad
            </h2>
            <p className="text-red-700 mb-2">
              Con un IRP de {data.irp}, estás perdiendo aproximadamente{' '}
              <strong>{hoursLost} horas semanales</strong> de productividad por agotamiento
              emocional.
            </p>
            <p className="text-red-600 text-sm">
              {getUrgencyMessage(data.irp)}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Benchmark */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-primary-50 rounded-2xl p-6 mb-8"
      >
        <p className="text-primary-700 text-center">
          <strong>{getBenchmarkText(data.irp)}</strong>. Las empresas que invierten en
          bienestar laboral ven un retorno de $4 por cada $1 invertido.
        </p>
      </motion.div>

      {/* Urgency Countdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-sm border border-primary-100 p-6 mb-8 text-center"
      >
        <div className="flex items-center justify-center gap-2 text-primary-500 mb-2">
          <Clock className="w-5 h-5" />
          <span className="text-sm font-medium">Oferta de diagnóstico válida por:</span>
        </div>
        <div className="font-display text-4xl font-bold text-accent mb-2">
          {formatCountdown(countdown)}
        </div>
        <p className="text-primary-500 text-sm">
          Después de este tiempo, tu informe expirará y necesitarás completar la evaluación de nuevo.
        </p>
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <button
          onClick={() => {
            trackCTAClick('schedule')
            navigate('/agendar')
          }}
          className="w-full px-8 py-5 bg-gradient-to-r from-accent to-accent-dark text-white font-bold text-lg rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-3 group"
        >
          <Calendar className="w-6 h-6" />
          Agendar mi revisión gratuita de 30 min
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={() => {
            trackCTAClick('view_results')
            navigate('/resultados')
          }}
          className="w-full px-8 py-4 bg-white text-primary-700 font-medium rounded-xl border-2 border-primary-200 hover:border-accent transition-colors flex items-center justify-center gap-2"
        >
          <FileText className="w-5 h-5" />
          Ver mi informe completo
        </button>
      </motion.div>
    </div>
  )
}

export default ThankYouPage
