import React from 'react'
import { Heart, Mail, Phone, MapPin, ExternalLink } from 'lucide-react'

const FooterSection: React.FC = () => {
  return (
    <footer className="bg-primary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-accent" />
              <span className="font-display text-xl font-bold">PULSO-H</span>
            </div>
            
            <p className="text-primary-300 text-sm mb-6">
              Diagnóstico de bienestar laboral y burnout desarrollado por psicólogos
              organizacionales de ACRUX Consultores.
            </p>

            <div className="space-y-2">
              <a
                href="mailto:hola@acrux.life"
                className="flex items-center gap-2 text-sm text-primary-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                hola@acrux.life
              </a>
              
              <a
                href="tel:+573001234567"
                className="flex items-center gap-2 text-sm text-primary-300 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                +57 300 123 4567
              </a>
              
              <div className="flex items-center gap-2 text-sm text-primary-300">
                <MapPin className="w-4 h-4" />
                Bogotá, Colombia
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Producto</h4>
            
            <ul className="space-y-2">
              {[
                { label: 'Evaluación individual', href: '/evaluar' },
                { label: 'Evaluación organizacional', href: '/evaluar' },
                { label: 'Dashboard', href: '/dashboard' },
                { label: 'Resultados', href: '/resultados' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-primary-300 hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            
            <ul className="space-y-2">
              {[
                { label: 'Sobre ACRUX', href: 'https://acrux.life/esencia' },
                { label: 'Servicios de consultoría', href: 'https://acrux.life/soluciones' },
                { label: 'Blog', href: 'https://acrux.life/el-radar' },
                { label: 'Contacto', href: 'https://acrux.life/contacto' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-300 hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    {item.label}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            
            <ul className="space-y-2">
              {[
                { label: 'Privacidad', href: '/privacidad' },
                { label: 'Términos de uso', href: '/terminos' },
                { label: 'Cookies', href: '/cookies' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-primary-300 hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-400">
              © {new Date().getFullYear()} PULSO-H by ACRUX Consultores. Todos los derechos reservados.
            </p>

            <p className="text-xs text-primary-500 max-w-md text-center md:text-right">
              PULSO-H es una herramienta de evaluación de bienestar laboral, no un diagnóstico médico.
              Los resultados no sustituyen la opinión de un profesional de la salud mental.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection
