import React from 'react'
import { motion } from 'motion/react'
import { Check, X, ArrowRight, Users, Building2 } from 'lucide-react'

interface Plan {
  name: string
  icon: React.ElementType
  price: string
  period: string
  description: string
  features: { text: string; included: boolean }[]
  cta: string
  highlighted?: boolean
}

const plans: Plan[] = [
  {
    name: 'Gratuito',
    icon: Users,
    price: '$0',
    period: 'para siempre',
    description: 'Perfecto para evaluaciones puntuales',
    features: [
      { text: 'Hasta 5 empleados', included: true },
      { text: 'Informe básico con IRP', included: true },
      { text: 'Radar de dimensiones', included: true },
      { text: 'Plan de acción general', included: true },
      { text: 'Exportar PDF', included: true },
      { text: 'Dashboard organizacional', included: false },
      { text: 'Análisis por áreas', included: false },
      { text: 'Benchmarking sectorial', included: false },
      { text: 'Soporte prioritario', included: false },
    ],
    cta: 'Comenzar gratis',
  },
  {
    name: 'Básico',
    icon: Building2,
    price: '$1,500',
    period: '/año',
    description: 'Para PYMEs en crecimiento',
    features: [
      { text: 'Hasta 25 empleados', included: true },
      { text: 'Informe básico con IRP', included: true },
      { text: 'Radar de dimensiones', included: true },
      { text: 'Plan de acción personalizado', included: true },
      { text: 'Exportar PDF', included: true },
      { text: 'Dashboard organizacional', included: true },
      { text: 'Análisis por áreas', included: true },
      { text: 'Benchmarking sectorial', included: false },
      { text: 'Soporte prioritario', included: false },
    ],
    cta: 'Elegir plan básico',
    highlighted: true,
  },
  {
    name: 'Profesional',
    icon: Building2,
    price: '$4,500',
    period: '/año',
    description: 'Para empresas medianas',
    features: [
      { text: 'Hasta 100 empleados', included: true },
      { text: 'Informe básico con IRP', included: true },
      { text: 'Radar de dimensiones', included: true },
      { text: 'Plan de acción personalizado', included: true },
      { text: 'Exportar PDF', included: true },
      { text: 'Dashboard organizacional', included: true },
      { text: 'Análisis por áreas y cargos', included: true },
      { text: 'Benchmarking sectorial', included: true },
      { text: 'Soporte prioritario', included: true },
    ],
    cta: 'Elegir plan profesional',
  },
  {
    name: 'Enterprise',
    icon: Building2,
    price: '$12,000',
    period: '/año',
    description: 'Para grandes organizaciones',
    features: [
      { text: 'Empleados ilimitados', included: true },
      { text: 'Informe avanzado con IRP', included: true },
      { text: 'Radar de dimensiones', included: true },
      { text: 'Plan de acción personalizado', included: true },
      { text: 'Exportar PDF y Excel', included: true },
      { text: 'Dashboard organizacional', included: true },
      { text: 'Análisis por áreas, cargos y antigüedad', included: true },
      { text: 'Benchmarking sectorial', included: true },
      { text: 'Soporte prioritario + consultoría', included: true },
    ],
    cta: 'Contactar ventas',
  },
]

const PricingSection: React.FC = () => {
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            <span>Planes</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-900 mb-4">
            Individual vs Organizacional
          </h2>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            Comienza gratis y escala según las necesidades de tu organización.
            Sin compromisos, cancela cuando quieras.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`relative p-6 rounded-2xl ${
                plan.highlighted
                  ? 'bg-primary-900 text-white shadow-xl scale-105'
                  : 'bg-white border-2 border-primary-100 hover:border-primary-200'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                  Más popular
                </div>
              )}

              <div className="flex items-center gap-2 mb-4">
                <plan.icon className={`w-5 h-5 ${plan.highlighted ? 'text-white' : 'text-primary-400'}`} />
                <span className={`font-display text-lg font-bold ${plan.highlighted ? 'text-white' : 'text-primary-900'}`}>
                  {plan.name}
                </span>
              </div>

              <div className="mb-4">
                <span className={`text-3xl font-bold ${plan.highlighted ? 'text-white' : 'text-primary-900'}`}>
                  {plan.price}
                </span>
                <span className={`text-sm ${plan.highlighted ? 'text-primary-300' : 'text-primary-500'}`}>
                  {plan.period}
                </span>
              </div>

              <p className={`text-sm mb-6 ${plan.highlighted ? 'text-primary-300' : 'text-primary-600'}`}>
                {plan.description}
              </p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    {feature.included ? (
                      <Check className={`w-4 h-4 flex-shrink-0 ${plan.highlighted ? 'text-green-400' : 'text-green-500'}`} />
                    ) : (
                      <X className="w-4 h-4 text-primary-700 flex-shrink-0" />
                    )}
                    <span className={feature.included ? '' : 'text-primary-900'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="/evaluar"
                className={`block text-center py-3 px-4 rounded-xl font-semibold transition-colors ${
                  plan.highlighted
                    ? 'bg-primary text-white hover:bg-primary-700'
                    : 'bg-primary-100 text-primary-900 hover:bg-primary-200'
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-primary-600 mb-4">
            ¿Necesitas un plan personalizado?
          </p>
          <a
            href="mailto:contacto@acruxconsultores.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
          >
            Contactar con ventas
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default PricingSection
