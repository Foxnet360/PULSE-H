import React from 'react'
import { PrivacyModal as SharedPrivacyModal } from '@acrux/design-tokens'
import { Lock, Eye, Trash2 } from 'lucide-react'

interface PrivacyModalProps {
  isOpen: boolean
  onClose: () => void
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  return (
    <SharedPrivacyModal
      isOpen={isOpen}
      onClose={onClose}
      title="Política de Privacidad"
      acceptButtonText="Entendido"
      projectName="PULSO-H"
    >
      <div className="space-y-6">
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
    </SharedPrivacyModal>
  )
}

export default PrivacyModal
