import React from 'react'
import { motion } from 'motion/react'
import { TrendingUp, TrendingDown, Minus, AlertCircle } from 'lucide-react'
import type { AreaResult } from '../../hooks/useDashboard'

interface AreaRankingProps {
  areas: AreaResult[]
  minParticipants?: number
}

const AreaRanking: React.FC<AreaRankingProps> = ({ areas, minParticipants = 5 }) => {
  const sortedAreas = [...areas].sort((a, b) => b.averageIRP - a.averageIRP)

  const getTrendIcon = (irp: number) => {
    if (irp > 60) return <TrendingUp className="w-4 h-4 text-red-500" />
    if (irp < 30) return <TrendingDown className="w-4 h-4 text-green-500" />
    return <Minus className="w-4 h-4 text-yellow-500" />
  }

  const getIRPColor = (irp: number): string => {
    if (irp < 25) return 'bg-green-500'
    if (irp < 50) return 'bg-yellow-500'
    if (irp < 75) return 'bg-orange-500'
    return 'bg-red-500'
  }

  return (
    <div className="bg-white rounded-2xl border border-primary-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-bold text-primary-900">
          Ranking por Área
        </h3>
        <span className="text-xs text-primary-500">Ordenado por IRP (mayor riesgo)</span>
      </div>

      <div className="space-y-3">
        {sortedAreas.map((area, index) => {
          const hasEnoughData = area.participantCount >= minParticipants
          const percentage = (area.averageIRP / 100) * 100

          return (
            <motion.div
              key={area.area}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-primary-50 transition-colors"
            >
              <span className="w-6 text-center font-bold text-primary-400">
                {index + 1}
              </span>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-primary-900">{area.area}</span>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(area.averageIRP)}
                    <span className="font-bold text-primary-900">
                      {hasEnoughData ? area.averageIRP.toFixed(1) : 'N/A'}
                    </span>
                  </div>
                </div>

                <div className="w-full bg-primary-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${getIRPColor(area.averageIRP)}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-primary-500">
                    {area.participantCount} participantes
                  </span>
                  {!hasEnoughData && (
                    <span className="inline-flex items-center gap-1 text-xs text-yellow-600">
                      <AlertCircle className="w-3 h-3" />
                      Datos insuficientes
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default AreaRanking
