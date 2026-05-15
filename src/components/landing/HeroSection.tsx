import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { Heart, ArrowRight, Clock, Shield, BarChart3, ChevronDown } from 'lucide-react'
import SocialProofBadge from './SocialProofBadge'

const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-50 via-surface to-primary-100 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge principal */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-medium mb-6">
            <Heart className="w-4 h-4" />
            <span>Desarrollado por psicólogos organizacionales de ACRUX</span>
          </div>
        </motion.div>

        {/* Social Proof */}
        <div className="mb-8">
          <SocialProofBadge />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-900 mb-6 leading-tight"
        >
          Descubre el{' '}
          <span className="text-accent">pulso</span>
          {' '}de tu bienestar laboral
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-primary-700 max-w-2xl mx-auto mb-8"
        >
          Evalúa el bienestar de tu equipo en 8 minutos. Basado en evidencia científica,
          anónimo y gratuito para hasta 5 empleados.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Link
            to="/evaluar"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white font-semibold rounded-xl hover:bg-accent-dark transition-all shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5"
          >
            Comenzar diagnóstico gratuito
            <ArrowRight className="w-5 h-5" />
          </Link>

          <a
            href="#como-funciona"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-900 font-semibold rounded-xl border-2 border-primary-200 hover:border-accent hover:text-accent transition-all"
          >
            Ver cómo funciona
            <ChevronDown className="w-5 h-5" />
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6 text-sm"
        >
          {[
            { icon: Clock, label: '8 minutos', sublabel: 'de duración' },
            { icon: Shield, label: '100% anónimo', sublabel: 'sin registro' },
            { icon: BarChart3, label: 'Basado en evidencia', sublabel: 'MBI-HSS validado' },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3 px-4 py-3 bg-white/60 backdrop-blur-sm rounded-xl">
              <item.icon className="w-5 h-5 text-accent" />
              <div className="text-left">
                <div className="font-semibold text-primary-900">{item.label}</div>
                <div className="text-primary-500 text-xs">{item.sublabel}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
