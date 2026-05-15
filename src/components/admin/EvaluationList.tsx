import React from 'react'
import { motion } from 'motion/react'
import { Link2, Users, Calendar, Copy, Check, X, BarChart3 } from 'lucide-react'
import type { EvaluationConfig } from '../../types/assessment'

interface EvaluationListProps {
  evaluations: EvaluationConfig[]
  onCopyLink: (hash: string) => void
  onClose: (id: string) => void
  copiedHash: string | null
}

const EvaluationList: React.FC<EvaluationListProps> = ({ 
  evaluations, 
  onCopyLink, 
  onClose,
  copiedHash 
}) => {
  if (evaluations.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Link2 className="w-8 h-8 text-primary-400" />
        </div>
        <p className="text-primary-500">No hay evaluaciones activas</p>
        <p className="text-sm text-primary-400 mt-1">Crea tu primera evaluación arriba</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {evaluations.map((evaluation, index) => (
        <motion.div
          key={evaluation.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-2xl border border-primary-100 p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-display font-bold text-primary-900">
                {evaluation.organizationName}
              </h3>
              <div className="flex items-center gap-3 mt-1">
                {evaluation.sector && (
                  <span className="text-sm text-primary-500">{evaluation.sector}</span>
                )}
                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  Activa
                </span>
              </div>
            </div>

            <button
              onClick={() => onClose(evaluation.id)}
              className="p-2 hover:bg-red-50 rounded-lg transition-colors text-primary-400 hover:text-red-500"
              aria-label="Cerrar evaluación"
              title="Cerrar evaluación"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary-400" />
              <span className="text-sm text-primary-600">
                {evaluation.expectedParticipants} participantes esperados
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary-400" />
              <span className="text-sm text-primary-600">
                {evaluation.deadline 
                  ? new Date(evaluation.deadline).toLocaleDateString('es-ES')
                  : 'Sin fecha límite'
                }
              </span>
            </div>

            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary-400" />
              <span className="text-sm text-primary-600">
                0 respuestas
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 bg-primary-50 rounded-lg px-3 py-2">
              <code className="text-sm text-primary-700 break-all">
                {window.location.origin}/evaluar/{evaluation.hash}
              </code>
            </div>
            <button
              onClick={() => onCopyLink(evaluation.hash)}
              className="p-2 bg-accent/10 hover:bg-accent/20 rounded-lg transition-colors"
              aria-label="Copiar link"
            >
              {copiedHash === evaluation.hash ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <Copy className="w-5 h-5 text-accent" />
              )}
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default EvaluationList
