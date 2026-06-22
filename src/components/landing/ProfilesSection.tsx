import React from 'react'
import { motion } from 'motion/react'
import { Flower, Shield, AlertTriangle, BatteryWarning, ArrowRight } from 'lucide-react'
import { profiles, getProfileColor } from '../../data/profiles'
import type { BurnoutProfile } from '../../types/assessment'

const iconByProfile: Record<BurnoutProfile, React.ElementType> = {
  floreciente: Flower,
  estable: Shield,
  resiliente: Shield,
  requete: AlertTriangle,
  sobrecargado: BatteryWarning,
  fragil: AlertTriangle,
}

const tailwindThemeByProfile: Record<BurnoutProfile, { color: string; bgColor: string; borderColor: string }> = {
  floreciente: { color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
  estable: { color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
  resiliente: { color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
  requete: { color: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' },
  sobrecargado: { color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
  fragil: { color: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' },
}

// Landing page highlights the four most actionable profiles.
const LANDING_PROFILE_ORDER: BurnoutProfile[] = [
  'floreciente',
  'resiliente',
  'requete',
  'sobrecargado',
]

const ProfilesSection: React.FC = () => {
  const landingProfiles = LANDING_PROFILE_ORDER.map(key => {
    const profile = profiles.find(p => p.key === key)
    if (!profile) throw new Error(`Missing canonical profile: ${key}`)
    return {
      ...profile,
      icon: iconByProfile[key],
      theme: tailwindThemeByProfile[key],
    }
  })

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
          {landingProfiles.map((profile, index) => (
            <motion.div
              key={profile.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`relative p-6 lg:p-8 rounded-2xl border-2 ${profile.theme.borderColor} ${profile.theme.bgColor} hover:shadow-lg transition-shadow`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-white ${profile.theme.color}`}>
                  <profile.icon className="w-6 h-6" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className={`font-display text-xl font-bold ${profile.theme.color}`}>
                      {profile.name}
                    </h3>
                    <span className="text-sm text-primary-500 font-medium">
                      {profile.prevalence} de los usuarios
                    </span>
                  </div>
                  
                  <p className="text-primary-700 mb-4">{profile.description}</p>
                  
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white text-sm font-medium ${profile.theme.color}`}>
                    <span>Intervención recomendada:</span>
                    <span className="font-semibold" style={{ color: getProfileColor(profile.key) }}>
                      {profile.key === 'floreciente' && 'Mantenimiento + mentoría de pares'}
                      {profile.key === 'resiliente' && 'Gestión de carga + coaching de energía'}
                      {profile.key === 'requete' && 'Intervención focalizada + redesign de rol'}
                      {profile.key === 'sobrecargado' && 'Intervención urgente + descanso estructurado'}
                    </span>
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
