import React from 'react'
import { motion } from 'motion/react'
import { Shield, Lock, Eye, Server, FileCheck, ArrowRight } from 'lucide-react'

interface PrivacyFeature {
  icon: React.ElementType
  title: string
  description: string
}

const privacyFeatures: PrivacyFeature[] = [
  {
    icon: Server,
    title: 'Procesamiento Local',
    description: 'Todos los cálculos se realizan en tu navegador. Tus respuestas nunca salen de tu dispositivo.',
  },
  {
    icon: Lock,
    title: '100% Anónimo',
    description: 'No requiere registro ni datos personales. No sabemos quién eres.',
  },
  {
    icon: Eye,
    title: 'Consentimiento Explícito',
    description: 'Solo compartimos datos agregados si das tu consentimiento informado.',
  },
  {
    icon: FileCheck,
    title: 'Cumplimiento Normativo',
    description: 'Diseñado bajo estándares de protección de datos y ética en investigación.',
  },
]

const PrivacySection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            <span>Privacidad garantizada</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-900 mb-4">
            Tu privacidad es nuestra prioridad
          </h2>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            Entendemos que hablar de bienestar mental es sensible. Por eso diseñamos
            PULSO-H con los más altos estándares de privacidad desde el primer día.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {privacyFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="flex gap-4 p-6 bg-primary-50 rounded-2xl"
            >
              <div className="p-3 bg-white rounded-xl h-fit">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              
              <div>
                <h3 className="font-display text-lg font-bold text-primary-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-primary-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 p-6 bg-amber-50 border border-amber-200 rounded-2xl"
        >
          <div className="flex items-start gap-4">
            <div className="p-2 bg-amber-100 rounded-lg flex-shrink-0">
              <Shield className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-semibold text-amber-900 mb-2">Disclaimer importante</h4>
              <p className="text-amber-800 text-sm">
                PULSO-H es una herramienta de evaluación de bienestar laboral, no un diagnóstico médico.
                Los resultados no sustituyen la opinión de un profesional de la salud mental. Si experimentas
                síntomas severos de agotamiento, te recomendamos buscar ayuda profesional.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="/evaluar"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-colors"
          >
            Evaluar con total privacidad
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default PrivacySection
