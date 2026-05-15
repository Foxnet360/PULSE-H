import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Trash2, Send, Check, AlertCircle } from 'lucide-react'

const DataDeletionRequest: React.FC = () => {
  const [email, setEmail] = useState('')
  const [reason, setReason] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      setError('Por favor ingresa un correo electrónico válido')
      return
    }

    // In a real implementation, this would send to backend
    // For now, we simulate the request
    setError('')
    setSubmitted(true)
    
    // Clear local data if user requests it
    localStorage.removeItem('pulso-h-assessment')
    localStorage.removeItem('pulso-h-gamification')
    localStorage.removeItem('pulso-h-cookie-consent')
    sessionStorage.removeItem('pulso-h-result')
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-primary-100 p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-red-50 rounded-full">
          <Trash2 className="w-5 h-5 text-red-500" />
        </div>
        <h2 className="font-display text-xl font-bold text-primary-900">
          Solicitud de Eliminación de Datos
        </h2>
      </div>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-primary-600 mb-6">
              Puedes solicitar la eliminación completa de tus datos en cualquier momento. 
              Procesaremos tu solicitud dentro de los <strong>30 días hábiles</strong>.
            </p>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-700 mb-1">
                  Motivo (opcional)
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Cuéntanos por qué deseas eliminar tus datos..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all resize-none"
                />
              </div>

              <div className="bg-primary-50 rounded-xl p-4 text-sm text-primary-600">
                <p className="mb-2">
                  <strong>Nota importante:</strong> Si realizaste una evaluación como parte de una organización, 
                  tus datos agregados (sin identificación personal) pueden conservarse para análisis estadísticos.
                </p>
                <p>
                  Datos que eliminaremos: respuestas individuales, progreso de gamificación, preferencias de cookies.
                </p>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Enviar solicitud de eliminación
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-display text-xl font-bold text-primary-900 mb-2">
              Solicitud enviada
            </h3>
            <p className="text-primary-600">
              Hemos recibido tu solicitud de eliminación de datos. Te contactaremos a <strong>{email}</strong> 
              dentro de los 30 días hábiles para confirmar la eliminación.
            </p>
            <p className="text-sm text-primary-500 mt-4">
              Los datos locales de tu navegador han sido eliminados.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DataDeletionRequest
