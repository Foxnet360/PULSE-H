import React from 'react'
import { motion } from 'motion/react'
import { TrendingUp, Users, AlertTriangle, Shield } from 'lucide-react'
import type { DashboardData } from '../../hooks/useDashboard'

interface IRPCardProps {
  data: DashboardData
}

const IRPCard: React.FC<IRPCardProps> = ({ data }) => {
  const getIRPColor = (irp: number): string => {
    if (irp < 25) return 'text-green-500'
    if (irp < 50) return 'text-yellow-500'
    if (irp < 75) return 'text-orange-500'
    return 'text-red-500'
  }

  const getIRPBg = (irp: number): string => {
    if (irp < 25) return 'bg-green-50 border-green-200'
    if (irp < 50) return 'bg-yellow-50 border-yellow-200'
    if (irp < 75) return 'bg-orange-50 border-orange-200'
    return 'bg-red-50 border-red-200'
  }

  const getIRPIcon = (irp: number) => {
    if (irp < 50) return <Shield className="w-6 h-6" />
    if (irp < 75) return <AlertTriangle className="w-6 h-6" />
    return <TrendingUp className="w-6 h-6" />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* IRP Promedio */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl border p-6 ${getIRPBg(data.averageIRP)}`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={getIRPColor(data.averageIRP)}>
              {getIRPIcon(data.averageIRP)}
            </div>
            <div>
              <p className="text-sm font-medium text-primary-600">IRP Promedio</p>
              <p className="text-xs text-primary-500">Indice de Riesgo Psicosocial</p>
            </div>
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className={`text-4xl font-bold ${getIRPColor(data.averageIRP)}`}>
            {data.averageIRP.toFixed(1)}
          </span>
          <span className="text-sm text-primary-500">/ 100</span>
        </div>
      </motion.div>

      {/* Participantes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl border border-primary-100 p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-6 h-6 text-accent" />
          <div>
            <p className="text-sm font-medium text-primary-600">Participantes</p>
            <p className="text-xs text-primary-500">Total de respuestas</p>
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-primary-900">{data.totalParticipants}</span>
          <span className="text-sm text-primary-500">empleados</span>
        </div>
        {!data.isActive && (
          <p className="text-sm text-yellow-600 mt-2">
            Faltan {data.responsesNeeded} respuestas para activar el analisis
          </p>
        )}
      </motion.div>

      {/* Estado */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl border border-primary-100 p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-6 h-6 text-accent" />
          <div>
            <p className="text-sm font-medium text-primary-600">Estado</p>
            <p className="text-xs text-primary-500">Disponibilidad del analisis</p>
          </div>
        </div>
        <div>
          {data.isActive ? (
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Dashboard activo
              </span>
              <p className="text-sm text-primary-600 mt-2">
                Analisis completo disponible
              </p>
            </div>
          ) : (
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-100 text-yellow-700 text-sm font-medium rounded-full">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                Esperando datos
              </span>
              <p className="text-sm text-primary-600 mt-2">
                Se requieren al menos 5 respuestas para garantizar privacidad
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default IRPCard
