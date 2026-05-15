import React from 'react'
import { motion } from 'motion/react'
import { BookOpen, CheckCircle, Award, ArrowRight } from 'lucide-react'

interface Framework {
  name: string
  country: string
  description: string
}

const frameworks: Framework[] = [
  {
    name: 'NOM-035-STPS-2018',
    country: 'México',
    description: 'Identificación y análisis de factores de riesgo psicosocial',
  },
  {
    name: 'Decreto 2090 de 2021',
    country: 'Colombia',
    description: 'Medidas de prevención del estrés laboral',
  },
  {
    name: 'ISO 45003:2021',
    country: 'Internacional',
    description: 'Marco global para gestión de salud mental en el trabajo',
  },
  {
    name: 'Ley 21.643 (2023)',
    country: 'Chile',
    description: 'Incluye burnout como enfermedad profesional',
  },
]

const MethodologySection: React.FC = () => {
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            <span>Metodología científica</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-900 mb-4">
            Basado en el gold standard mundial
          </h2>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            PULSO-H utiliza el Maslach Burnout Inventory - Human Services Survey (MBI-HSS),
            la herramienta más validada internacionalmente para evaluar burnout.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-2xl shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Award className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display text-lg font-bold text-primary-900">
                  Validación en LATAM
                </h3>
              </div>
              
              <p className="text-primary-600 mb-4">
                Adaptado con puntos de corte validados para poblaciones latinoamericanas,
                no directrices genéricas anglosajonas.
              </p>
              
              <ul className="space-y-2">
                {[
                  'Confiabilidad interna: α = .89',
                  'Validez de constructo confirmada',
                  'Muestra representativa LATAM',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-primary-700">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <BookOpen className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-display text-lg font-bold text-primary-900">
                  Doble perspectiva
                </h3>
              </div>
              
              <p className="text-primary-600">
                Evaluamos tanto la autopercepción del empleado individual como el análisis
                agregado por áreas, cargos y antigüedad para una visión completa.
              </p>
            </motion.div>
          </div>

          <div className="space-y-4">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-display text-xl font-bold text-primary-900 mb-6"
            >
              Marcos regulatorios que cumplimos
            </motion.h3>

            {frameworks.map((framework, index) => (
              <motion.div
                key={framework.name}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-5 rounded-xl shadow-sm border border-primary-100"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-primary-900">{framework.name}</span>
                  <span className="text-xs px-2 py-1 bg-primary-100 text-primary-600 rounded-full">
                    {framework.country}
                  </span>
                </div>
                <p className="text-sm text-primary-600">{framework.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

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
            Evaluar con metodología científica
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default MethodologySection
