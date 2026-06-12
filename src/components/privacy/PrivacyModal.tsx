import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, ExternalLink, Shield, Lock, Eye, Trash2 } from 'lucide-react'

interface PrivacyModalProps {
  isOpen: boolean
  onClose: () => void
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary-900/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[80vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-primary-100">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-accent" />
                <h3 className="font-display text-xl font-bold text-primary-900">
                  Política de Privacidad
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-primary-50 rounded-full transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5 text-primary-400" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
                <p className="text-sm text-primary-700">
                  <strong className="text-accent">Compromiso de privacidad:</strong> En PULSO-H, 
                  tu privacidad es nuestra prioridad. Este diagnóstico se procesa completamente en tu 
                  dispositivo — ACRUX no tiene acceso a tus respuestas individuales.
                </p>
              </div>

              <section className="space-y-3">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-accent" />
                  <h4 className="font-display font-bold text-primary-900">1. Procesamiento Local</h4>
                </div>
                <p className="text-primary-600 text-sm leading-relaxed">
                  Tus respuestas nunca salen de tu dispositivo. Todo el procesamiento matemático 
                  ocurre en tu navegador mediante JavaScript. No enviamos tus respuestas individuales 
                  a ningún servidor.
                </p>
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-accent" />
                  <h4 className="font-display font-bold text-primary-900">2. Datos que Recopilamos</h4>
                </div>
                <ul className="list-disc list-inside text-sm text-primary-600 space-y-1">
                  <li>Información de contacto (solo si decides compartirla)</li>
                  <li>Datos demográficos opcionales (área, cargo)</li>
                  <li>Resultados agregados (NO respuestas individuales)</li>
                </ul>
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-3">
                  <Trash2 className="w-5 h-5 text-accent" />
                  <h4 className="font-display font-bold text-primary-900">3. Derecho al Olvido</h4>
                </div>
                <p className="text-primary-600 text-sm leading-relaxed">
                  Puedes solicitar la eliminación de tus datos en cualquier momento. 
                  Simplemente contáctanos en info@acrux.life y eliminaremos toda tu información 
                  dentro de los 30 días hábiles.
                </p>
              </section>

              <section className="space-y-3">
                <h4 className="font-display font-bold text-primary-900">4. Cumplimiento Normativo</h4>
                <p className="text-primary-600 text-sm leading-relaxed">
                  Cumplimos con las normativas de protección de datos aplicables en LATAM:
                </p>
                <ul className="list-disc list-inside text-sm text-primary-600 space-y-1">
                  <li>Ley 1581 de 2012 (Colombia)</li>
                  <li>NOM-035-STPS-2018 (México)</li>
                  <li>ISO 45003:2021</li>
                  <li>Ley 21.643 (Chile)</li>
                </ul>
              </section>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-primary-100 flex items-center justify-between bg-primary-50">
              <a
                href="https://acrux.life/privacidad"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-accent hover:text-accent-dark flex items-center gap-1 transition-colors"
              >
                Ver política completa
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={onClose}
                className="px-6 py-2 bg-accent text-white rounded-xl font-semibold hover:bg-accent-dark transition-colors"
              >
                Entendido
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default PrivacyModal
