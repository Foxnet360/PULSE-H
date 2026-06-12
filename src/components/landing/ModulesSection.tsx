import React from 'react'
import { motion } from 'motion/react'
import { Zap, Heart, Target, Building2, Scale, Dumbbell, Clock, ArrowRight } from 'lucide-react'

interface Module {
  id: string
  title: string
  subtitle: string
  icon: React.ElementType
  items: number
  time: string
  color: string
  bgColor: string
  description: string
}

const modules: Module[] = [
  {
    id: 'energia',
    title: 'Mi Energía',
    subtitle: 'Agotamiento Emocional',
    icon: Zap,
    items: 6,
    time: '1.5 min',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    description: 'Evalúa tu nivel de agotamiento emocional y la energía disponible para enfrentar tu trabajo diario.',
  },
  {
    id: 'conexion',
    title: 'Mi Conexión',
    subtitle: 'Despersonalización',
    icon: Heart,
    items: 5,
    time: '1.5 min',
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
    description: 'Mide tu conexión interpersonal y el nivel de cinismo o desconexión con colegas y usuarios.',
  },
  {
    id: 'proposito',
    title: 'Mi Propósito',
    subtitle: 'Realización Personal',
    icon: Target,
    items: 6,
    time: '1.5 min',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    description: 'Explora tu sentido de propósito laboral y el nivel de satisfacción con tus logros.',
  },
  {
    id: 'entorno',
    title: 'Mi Entorno',
    subtitle: 'Factores Organizacionales',
    icon: Building2,
    items: 7,
    time: '2 min',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    description: 'Analiza los factores de riesgo psicosocial en tu ambiente de trabajo según normativas vigentes.',
  },
  {
    id: 'equilibrio',
    title: 'Mi Equilibrio',
    subtitle: 'Conciliación Vida-Trabajo',
    icon: Scale,
    items: 6,
    time: '1.5 min',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    description: 'Evalúa el balance entre tu vida personal y profesional, y la carga laboral percibida.',
  },
  {
    id: 'fortaleza',
    title: 'Mi Fortaleza',
    subtitle: 'Resiliencia Individual',
    icon: Dumbbell,
    items: 6,
    time: '1.5 min',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    description: 'Mide tus recursos de resiliencia y las estrategias de afrontamiento que utilizas.',
  },
]

const ModulesSection: React.FC = () => {
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-primary-900 rounded-full text-sm font-medium mb-6">
            <Clock className="w-4 h-4" />
            <span>8 minutos en total</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-900 mb-4">
            6 dimensiones de bienestar
          </h2>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            Cada módulo evalúa una dimensión clave de tu experiencia laboral.
            En total son 36 preguntas que toman aproximadamente 8 minutos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod, index) => (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`${mod.bgColor} p-6 rounded-2xl border border-transparent hover:shadow-md transition-shadow`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 bg-white rounded-xl ${mod.color}`}>
                  <mod.icon className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <div className="text-xs text-primary-500">{mod.items} ítems</div>
                  <div className="text-xs text-primary-400">{mod.time}</div>
                </div>
              </div>

              <h3 className={`font-display text-lg font-bold ${mod.color} mb-1`}>
                {mod.title}
              </h3>
              
              <div className="text-sm text-primary-500 mb-3">{mod.subtitle}</div>
              
              <p className="text-sm text-primary-600">{mod.description}</p>
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
          <a
            href="/evaluar"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-primary-900 font-bold rounded-xl hover:bg-accent-dark transition-colors"
          >
            Comenzar evaluación de 8 minutos
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default ModulesSection
