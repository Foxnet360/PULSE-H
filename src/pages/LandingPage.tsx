import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowRight, Clock, Shield, BarChart3 } from 'lucide-react'
import { trackLandingView } from '../utils/analytics'
import HeroSection from '../components/landing/HeroSection'
import ProfilesSection from '../components/landing/ProfilesSection'
import ModulesSection from '../components/landing/ModulesSection'
import DeliverablesSection from '../components/landing/DeliverablesSection'
import PrivacySection from '../components/landing/PrivacySection'
import MethodologySection from '../components/landing/MethodologySection'
import TestimonialsSection from '../components/landing/TestimonialsSection'
import PricingSection from '../components/landing/PricingSection'
import FAQSection from '../components/landing/FAQSection'
import GamificationSection from '../components/landing/GamificationSection'
import UrgencySection from '../components/landing/UrgencySection'
import FooterSection from '../components/landing/FooterSection'
import SocialProofBadge from '../components/landing/SocialProofBadge'

const LandingPage: React.FC = () => {
  useEffect(() => {
    trackLandingView()
  }, [])

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <SocialProofBadge className="mb-6" />
            <h2 className="font-display text-3xl font-bold text-primary-900">
              El burnout es una crisis silenciosa en LATAM
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: '60-94%', label: 'Prevalencia de burnout en LATAM', source: 'Buk 2025' },
              { number: '73%', label: 'Empresas sin evaluación formal', source: 'Estudios sectoriales' },
              { number: '4x', label: 'Retorno por cada $ invertido en salud mental', source: 'OMS' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-8 bg-primary-50 rounded-2xl"
              >
                <div className="font-display text-5xl font-bold text-accent mb-3">{stat.number}</div>
                <div className="text-primary-900 font-semibold mb-2">{stat.label}</div>
                <div className="text-primary-500 text-sm">Fuente: {stat.source}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Los 4 Perfiles */}
      <ProfilesSection />

      {/* Los 6 Módulos */}
      <ModulesSection />

      {/* How it Works */}
      <section id="como-funciona" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-primary-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-900 mb-4">
              ¿Cómo funciona?
            </h2>
            <p className="text-lg text-primary-600 max-w-2xl mx-auto">
              Tres pasos simples para evaluar el bienestar de tu equipo
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Evalúa',
                description: 'Tu equipo completa el diagnóstico anónimo de 8 minutos desde cualquier dispositivo.',
                icon: Clock,
              },
              {
                step: '2',
                title: 'Analiza',
                description: 'Recibe un informe completo con el Índice de Riesgo Psicosocial y perfiles de bienestar.',
                icon: BarChart3,
              },
              {
                step: '3',
                title: 'Actúa',
                description: 'Implementa el plan de acción personalizado o agenda una consultoría con ACRUX.',
                icon: Shield,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-primary-100 h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div className="text-4xl font-display font-bold text-primary-200">
                      {item.step}
                    </div>
                  </div>
                  
                  <h3 className="font-display text-xl font-bold text-primary-900 mb-3">{item.title}</h3>
                  <p className="text-primary-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Entregables Preview */}
      <DeliverablesSection />

      {/* Privacidad y Ética */}
      <PrivacySection />

      {/* Metodología MBI-HSS */}
      <MethodologySection />

      {/* Testimonios */}
      <TestimonialsSection />

      {/* Pricing */}
      <PricingSection />

      {/* FAQ */}
      <FAQSection />

      {/* Gamificación */}
      <GamificationSection />

      {/* Urgencia */}
      <UrgencySection />

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center bg-gradient-to-br from-primary-900 to-primary-800 rounded-3xl p-12 lg:p-16 text-white relative overflow-hidden"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-700/50 rounded-full blur-2xl" />
          </div>

          <div className="relative z-10">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Empieza hoy mismo
            </h2>
            
            <p className="text-primary-200 mb-4 max-w-xl mx-auto text-lg">
              El bienestar de tu equipo no puede esperar. Evalúa a hasta 5 empleados
              gratuitamente y descubre el pulso de tu organización.
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm mb-8">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Oferta de lanzamiento: Primeros 500 diagnósticos gratis</span>
            </div>
            
            <Link
              to="/evaluar"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white font-semibold rounded-xl hover:bg-accent-light transition-colors shadow-lg"
            >
              Comenzar evaluación gratuita
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <FooterSection />
    </div>
  )
}

export default LandingPage
