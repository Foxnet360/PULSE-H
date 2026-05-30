import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react'

interface LeadCaptureModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (email: string, gdprConsent: boolean, marketingConsent: boolean, extraData?: { name?: string; company?: string; concernArea?: string }) => Promise<void>
  variant?: 'optional' | 'required'
  profile?: string
  irp?: number
}

const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({
  isOpen,
  onSubmit,
  profile,
  irp,
}) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [concernArea, setConcernArea] = useState('')
  const [gdprConsent, setGdprConsent] = useState(false)
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes('@')) {
      setError('Por favor ingresa un correo valido')
      return
    }

    if (!gdprConsent) {
      setError('Debes aceptar la politica de privacidad')
      return
    }

    setError('')
    setIsSubmitting(true)
    
    try {
      await onSubmit(email, gdprConsent, marketingConsent, {
        name,
        company,
        concernArea
      })
      setSubmitted(true)
    } catch (err) {
      setError('Hubo un error al guardar tus datos. Por favor intenta de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-primary-900/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-accent to-accent-dark p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  <span className="font-display font-bold">
                    Resultados personalizados
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <p className="text-primary-700 mb-4">
                      Para generar tu informe completo del Índice de Madurez Digital y recibir tu benchmark comparativo, ingresa tu correo. Te enviaremos recursos personalizados basados en tu perfil.
                    </p>

                    {profile && (
                      <div className="bg-primary-50 rounded-xl p-3 mb-4">
                        <p className="text-sm text-primary-700">
                          Tu perfil: <strong>{profile}</strong>
                          {irp && (
                            <span className="block mt-1">
                              IRP: <strong>{irp}</strong>
                            </span>
                          )}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Name (optional) */}
                  <div>
                    <label className="block text-sm font-medium text-primary-700 mb-1">
                      Tu nombre <span className="text-primary-400 font-normal">(opcional)</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej. Juan Pérez"
                      className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Company (optional) */}
                  <div>
                    <label className="block text-sm font-medium text-primary-700 mb-1">
                      Empresa <span className="text-primary-400 font-normal">(opcional)</span>
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Ej. Mi Empresa SAS"
                      className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Concern Area */}
                  <div>
                    <label className="block text-sm font-medium text-primary-700 mb-1">
                      ¿Qué área te preocupa más?
                    </label>
                    <select
                      value={concernArea}
                      onChange={(e) => setConcernArea(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all bg-white"
                      disabled={isSubmitting}
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="energia">Energía/Agotamiento</option>
                      <option value="conexion">Conexión/Cinismo</option>
                      <option value="proposito">Propósito</option>
                      <option value="entorno">Entorno</option>
                      <option value="equilibrio">Equilibrio</option>
                      <option value="fortaleza">Fortaleza</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-700 mb-1">
                      Correo electronico *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setError('')
                      }}
                      placeholder="tu@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-600">{error}</p>
                  )}

                  <div className="space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={gdprConsent}
                        onChange={(e) => {
                          setGdprConsent(e.target.checked)
                          setError('')
                        }}
                        className="mt-1 w-4 h-4 text-accent border-primary-300 rounded focus:ring-accent"
                        required
                        disabled={isSubmitting}
                      />
                      <span className="text-sm text-primary-700">
                        Acepto la{' '}
                        <a href="/privacidad" target="_blank" className="text-accent hover:underline">
                          politica de privacidad
                        </a>
                        {' '}y el procesamiento de mis datos.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={marketingConsent}
                        onChange={(e) => setMarketingConsent(e.target.checked)}
                        className="mt-1 w-4 h-4 text-accent border-primary-300 rounded focus:ring-accent"
                        disabled={isSubmitting}
                      />
                      <span className="text-sm text-primary-700">
                        Quiero recibir contenido de bienestar laboral y ofertas de ACRUX.
                        {' '}
                        <span className="text-primary-500">(Sin spam. Solo valor humano.)</span>
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-colors flex items-center justify-center gap-2 active:scale-[0.98] motion-reduce:active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Guardando...
                      </>
                    ) : (
                      <>
                        Generar mi informe personalizado
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-xs text-primary-500">
                    <Lock className="w-3 h-3" />
                    Tus datos estan protegidos. Nunca compartimos tu correo.
                  </div>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-primary-900 mb-2">
                    ¡Listo!
                  </h3>
                  <p className="text-primary-600">
                    Hemos enviado tu informe a <strong>{email}</strong>
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default LeadCaptureModal
