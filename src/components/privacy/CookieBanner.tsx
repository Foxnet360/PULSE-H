import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Cookie, X, ChevronRight } from 'lucide-react'

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('pulso-h-cookie-consent')
    if (!consent) {
      // Small delay to not show immediately on load
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('pulso-h-cookie-consent', 'accepted')
    setIsVisible(false)
  }

  const declineCookies = () => {
    localStorage.setItem('pulso-h-cookie-consent', 'declined')
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4"
        >
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-primary-100 p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="p-2 bg-accent/10 rounded-full">
                  <Cookie className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-primary-700">
                    <strong className="text-primary-900">Tu privacidad importa</strong> — Utilizamos cookies 
                    esenciales para el funcionamiento del sitio y cookies analíticas para mejorar tu experiencia.
                  </p>
                  <a
                    href="https://acrux.life/privacidad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-accent hover:text-accent-dark transition-colors mt-1"
                  >
                    Más información
                    <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={declineCookies}
                  className="px-4 py-2 text-sm text-primary-600 hover:text-primary-900 transition-colors"
                >
                  Solo esenciales
                </button>
                <button
                  onClick={acceptCookies}
                  className="px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-dark transition-colors"
                >
                  Aceptar todas
                </button>
                <button
                  onClick={declineCookies}
                  className="p-2 hover:bg-primary-50 rounded-full transition-colors"
                  aria-label="Cerrar"
                >
                  <X className="w-4 h-4 text-primary-400" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CookieBanner
