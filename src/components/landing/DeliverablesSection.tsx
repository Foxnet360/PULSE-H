import React from 'react'
import { motion } from 'motion/react'
import { FileText, Target, Lightbulb, Download, CheckCircle, ArrowRight } from 'lucide-react'

interface Deliverable {
  icon: React.ElementType
  title: string
  description: string
  features: string[]
}

const deliverables: Deliverable[] = [
  {
    icon: Target,
    title: 'Índice de Riesgo Psicosocial (IRP)',
    description: 'Tu puntuación global de 0 a 100 que integra las 6 dimensiones evaluadas.',
    features: [
      'Puntuación numérica clara',
      'Nivel de riesgo: Bajo, Moderado, Alto, Crítico',
      'Tendencia comparativa',
    ],
  },
  {
    icon: FileText,
    title: 'Radar de Dimensiones',
    description: 'Visualización gráfica de tu bienestar en las 6 dimensiones evaluadas.',
    features: [
      'Gráfico radar interactivo',
      'Identificación de fortalezas',
      'Áreas de oportunidad visibles',
    ],
  },
  {
    icon: Lightbulb,
    title: 'Plan de Acción Personalizado',
    description: 'Recomendaciones específicas basadas en tu perfil de bienestar.',
    features: [
      'Ejercicios prácticos',
      'Rutinas de autocuidado',
      'Recomendaciones por dimensión',
    ],
  },
  {
    icon: Download,
    title: 'Informe PDF Descargable',
    description: 'Documento completo para compartir con RRHH o tu médico.',
    features: [
      'Formato profesional',
      'Incluye todos los resultados',
      'Listo para imprimir',
    ],
  },
]

const DeliverablesSection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-900 mb-4">
            Lo que recibirás
          </h2>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            Un informe completo y personalizado con insights accionables para mejorar
            tu bienestar laboral.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {deliverables.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white p-6 lg:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/10 rounded-xl">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold text-primary-900 mb-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-primary-600 mb-4">{item.description}</p>
                  
                  <ul className="space-y-2">
                    {item.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-primary-700">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mockup del informe */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 bg-white rounded-2xl shadow-lg p-8 lg:p-12"
        >
          <div className="text-center mb-8">
            <h3 className="font-display text-2xl font-bold text-primary-900 mb-2">
              Vista previa del informe
            </h3>
            <p className="text-primary-600">Así se verá tu informe personalizado</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="bg-primary-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-primary-600">Índice de Riesgo Psicosocial</span>
                  <span className="text-2xl font-bold text-accent">42/100</span>
                </div>
                <div className="w-full bg-primary-200 rounded-full h-3">
                  <div className="bg-accent h-3 rounded-full" style={{ width: '42%' }} />
                </div>
                <div className="flex justify-between mt-2 text-xs text-primary-500">
                  <span>Bajo</span>
                  <span>Moderado</span>
                  <span>Alto</span>
                  <span>Crítico</span>
                </div>
              </div>

              <div className="bg-primary-50 rounded-xl p-6">
                <div className="text-sm font-medium text-primary-600 mb-3">Tu perfil de bienestar</div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold">
                  <Target className="w-5 h-5" />
                  Resiliente
                </div>
                <p className="text-sm text-primary-600 mt-3">
                  Agotamiento moderado pero alta realización. Capacidad de resistencia alta.
                </p>
              </div>
            </div>

            <div className="bg-primary-900 rounded-xl p-6 text-white">
              <div className="text-sm text-primary-300 mb-4">Recomendaciones principales</div>
              
              <ul className="space-y-3">
                {[
                  'Establecer límites claros de horario laboral',
                  'Practicar pausas activas cada 90 minutos',
                  'Identificar 3 actividades que te recarguen energía',
                ].map((rec, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-accent">{i + 1}</span>
                    </div>
                    <span className="text-sm">{rec}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-primary-700">
                <div className="text-sm text-primary-300 mb-2">Próximo paso recomendado</div>
                <div className="text-sm">
                  Agenda una sesión de coaching de energía con ACRUX para desarrollar
                  un plan de sostenibilidad personalizado.
                </div>
              </div>
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
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-colors shadow-lg shadow-accent/20"
          >
            Obtener mi informe gratuito
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default DeliverablesSection
