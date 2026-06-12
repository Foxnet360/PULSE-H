import React, { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Timer, ArrowRight } from 'lucide-react'

const UrgencySection: React.FC = () => {
  const [count, setCount] = useState(500)

  useEffect(() => {
    const stored = localStorage.getItem('pulso-h-offer-count')
    if (stored) {
      setCount(parseInt(stored, 10))
    }
  }, [])

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary">
      <div className="max-w-4xl mx-auto text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/30 rounded-full text-sm font-medium mb-6">
            <Timer className="w-4 h-4" />
            <span>Oferta de lanzamiento</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Primeros 500 diagnósticos gratis
          </h2>

          <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
            Estamos celebrando el lanzamiento de PULSO-H. Los primeros 500 diagnósticos
            organizacionales son completamente gratuitos. No requiere tarjeta de crédito.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-4">
              <div className="text-4xl font-bold">{count}</div>
              <div className="text-sm text-white">cupos disponibles</div>
            </div>

            <div className="text-white text-sm">
              de 500 totales
            </div>
          </div>

          <a
            href="/evaluar"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-accent font-semibold rounded-xl hover:bg-primary-50 transition-colors shadow-lg"
          >
            Reservar mi diagnóstico gratuito
            <ArrowRight className="w-5 h-5" />
          </a>

          <p className="text-sm text-white mt-4">
            Sin compromiso. Cancela cuando quieras.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default UrgencySection
