import React from 'react'
import { Loader2 } from 'lucide-react'

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <Loader2 className="w-12 h-12 text-accent animate-spin" />
      <p className="text-primary-700 font-medium">Cargando PULSO-H...</p>
    </div>
  )
}

export default LoadingScreen
