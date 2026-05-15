import React from 'react'
import { motion } from 'motion/react'
import { Trophy, Zap, Star, Target } from 'lucide-react'

interface Badge {
  icon: React.ElementType
  name: string
  description: string
  color: string
}

const badges: Badge[] = [
  {
    icon: Zap,
    name: 'Primer Paso',
    description: 'Completar el primer módulo',
    color: 'text-amber-500',
  },
  {
    icon: Trophy,
    name: 'Finisher',
    description: 'Completar los 6 módulos',
    color: 'text-blue-500',
  },
  {
    icon: Star,
    name: 'Guardián del Bienestar',
    description: 'Obtener perfil "Floreciente"',
    color: 'text-green-500',
  },
  {
    icon: Target,
    name: 'Resiliente',
    description: 'Obtener perfil "Resiliente"',
    color: 'text-purple-500',
  },
]

const GamificationSection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
            <Trophy className="w-4 h-4" />
            <span>Gamificación</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-900 mb-4">
            Tu progreso cuenta
          </h2>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            Gana badges, acumula puntos ENERGÍA y desbloquea logros mientras
            evalúas y mejoras tu bienestar laboral.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-2xl shadow-sm"
            >
              <div className="text-sm font-medium text-primary-600 mb-4">Sistema de puntos ENERGÍA</div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-primary-600">Nivel 1 - Explorador</span>
                    <span className="text-accent font-semibold">150 / 500 pts</span>
                  </div>
                  <div className="w-full bg-primary-100 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '30%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="bg-accent h-3 rounded-full"
                    />
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-primary-500">
                Completa módulos, obtén perfiles positivos y comparte resultados
                para ganar puntos y subir de nivel.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm"
            >
              <div className="text-sm font-medium text-primary-600 mb-4">Badges disponibles</div>
              
              <div className="grid grid-cols-2 gap-4">
                {badges.map((badge, index) => (
                  <motion.div
                    key={badge.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 p-3 bg-primary-50 rounded-xl"
                  >
                    <div className={`p-2 bg-white rounded-lg ${badge.color}`}>
                      <badge.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-primary-900">{badge.name}</div>
                      <div className="text-xs text-primary-500">{badge.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-primary-900 rounded-2xl p-8 text-white"
          >
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-10 h-10 text-accent" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-2">
                Tu perfil te espera
              </h3>
              <p className="text-primary-300">
                Descubre cuál es tu perfil de bienestar y comienza a desbloquear
                logros mientras mejoras tu experiencia laboral.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {[
                'Evaluación completa de 6 dimensiones',
                'Perfil personalizado de bienestar',
                'Plan de acción con ejercicios',
                'Sistema de badges y logros',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Star className="w-3 h-3 text-accent" />
                  </div>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>

            <a
              href="/evaluar"
              className="block text-center py-3 px-4 bg-accent text-white font-semibold rounded-xl hover:bg-accent-light transition-colors"
            >
              Descubre tu perfil
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default GamificationSection
