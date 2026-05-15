import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Mail, Phone, MapPin } from 'lucide-react'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-accent" />
              <span className="font-display text-lg font-bold">PULSO-H</span>
            </div>
            <p className="text-primary-300 text-sm">
              Diagnóstico de bienestar laboral y burnout.
              Desarrollado por psicólogos organizacionales de ACRUX Consultores.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-display font-semibold mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-primary-300 hover:text-accent text-sm transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/evaluar" className="text-primary-300 hover:text-accent text-sm transition-colors">
                  Evaluar
                </Link>
              </li>
              <li>
                <Link to="/privacidad" className="text-primary-300 hover:text-accent text-sm transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link to="/privacidad#eliminacion" className="text-primary-300 hover:text-accent text-sm transition-colors">
                  Eliminar mis datos
                </Link>
              </li>
              <li>
                <a
                  href="https://acrux.life"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-300 hover:text-accent text-sm transition-colors"
                >
                  ACRUX Consultores
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-primary-300 text-sm">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@acrux.life" className="hover:text-accent transition-colors">
                  info@acrux.life
                </a>
              </li>
              <li className="flex items-center gap-2 text-primary-300 text-sm">
                <Phone className="w-4 h-4" />
                <span>+57 (XXX) XXX-XXXX</span>
              </li>
              <li className="flex items-center gap-2 text-primary-300 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Colombia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-800 mt-8 pt-8 text-center">
          <p className="text-primary-400 text-sm">
            © {currentYear} PULSO-H — Una iniciativa de ACRUX Consultores.
            Todos los derechos reservados.
          </p>
          <p className="text-primary-500 text-xs mt-2">
            Este diagnóstico es una herramienta de autoevaluación, no un diagnóstico médico o psicológico clínico.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
