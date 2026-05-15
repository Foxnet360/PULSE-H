import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-display text-6xl font-bold text-primary-200 mb-4">404</h1>
        <h2 className="font-display text-2xl font-bold text-primary-900 mb-4">
          Página no encontrada
        </h2>
        <p className="text-primary-600 mb-8">
          Lo sentimos, la página que buscas no existe.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent-dark transition-colors"
          >
            <Home className="w-4 h-4" />
            Ir al inicio
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary-900 font-medium rounded-lg border border-primary-200 hover:border-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver atrás
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
