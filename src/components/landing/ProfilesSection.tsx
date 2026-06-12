import React from 'react'
import { motion } from 'motion/react'
import { Flower, Shield, AlertTriangle, BatteryWarning, ArrowRight } from 'lucide-react'

interface Profile {
  id: string
  name: string
  icon: React.ElementType
  color: string
  bgColor: string
  borderColor: string
  percentage: string
  description: string
  characteristics: string[]
  intervention: string
}

const profiles: Profile[] = [
  {
    id: 'floreciente',
    name: 'Floreciente',
    icon: Flower,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    percentage: '~15%',
    description: 'Alta realización personal, bajo agotamiento emocional. Estás en tu mejor momento.',
    characteristics: [
      'Energía sostenida durante el día',
      'Sentido de propósito claro',
      'Buena conciliación vida-trabajo',
    ],
    intervention: 'Mantenimiento + mentoría de pares',
  },
  {
    id: 'resiliente',
    name: 'Resiliente',
    icon: Shield,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    percentage: '~18%',
    description: 'Agotamiento moderado pero alta realización. Aguanta mucho, pero necesita recargar.',
    characteristics: [
      'Capacidad de resistencia alta',
      'Compromiso con el trabajo',
      'Riesgo de acumulación silenciosa',
    ],
    intervention: 'Gestión de carga + coaching de energía',
  },
  {
    id: 'requete',
    name: 'Requete',
    icon: AlertTriangle,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    percentage: '~22%',
    description: 'Alto agotamiento, realización baja. Señales de alerta que requieren atención.',
    characteristics: [
      'Fatiga persistente',
      'Desconexión emocional',
      'Productividad decreciente',
    ],
    intervention: 'Intervención focalizada + redesign de rol',
  },
  {
    id: 'sobrecargadx',
    name: 'Sobrecargadx',
    icon: BatteryWarning,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    percentage: '~15%',
    description: 'Agotamiento severo, despersonalización alta. Necesita descanso estructurado urgente.',
    characteristics: [
      'Agotamiento crónico',
      'Cinismo hacia el trabajo',
      'Riesgo de enfermedad profesional',
    ],
    intervention: 'Intervención urgente + descanso estructurado',
  },
]

const ProfilesSection: React.FC = () => {
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
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-900 mb-4">
            4 perfiles de bienestar laboral
          </h2>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            Cada persona experimenta el trabajo de forma única. PULSO-H identifica tu perfil
            para ofrecerte recomendaciones personalizadas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {profiles.map((profile, index) => (
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`relative p-6 lg:p-8 rounded-2xl border-2 ${profile.borderColor} ${profile.bgColor} hover:shadow-lg transition-shadow`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-white ${profile.color}`}>
                  <profile.icon className="w-6 h-6" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className={`font-display text-xl font-bold ${profile.color}`}>
                      {profile.name}
                    </h3>
                    <span className="text-sm text-primary-500 font-medium">
                      {profile.percentage} de los usuarios
                    </span>
                  </div>
                  
                  <p className="text-primary-700 mb-4">{profile.description}</p>
                  
                  <ul className="space-y-2 mb-4">
                    {profile.characteristics.map((char, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-primary-600">
                        <div className={`w-1.5 h-1.5 rounded-full ${profile.color.replace('text-', 'bg-')}`} />
                        {char}
                      </li>
                    ))}
                  </ul>
                  
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white text-sm font-medium ${profile.color}`}>
                    <span>Intervención recomendada:</span>
                    <span className="font-semibold">{profile.intervention}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-primary-600 mb-4">
            ¿Quieres saber cuál es tu perfil?
          </p>
          <a
            href="/evaluar"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-primary-900 font-bold rounded-xl hover:bg-accent-dark transition-colors"
          >
            Descubre tu perfil ahora
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default ProfilesSection
