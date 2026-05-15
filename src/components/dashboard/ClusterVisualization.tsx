import React from 'react'
import { motion } from 'motion/react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts'
import { useKMeans } from '../../hooks/useKMeans'
import type { DataPoint } from '../../workers/kmeans.worker'
import { Loader2 } from 'lucide-react'

interface ClusterVisualizationProps {
  points: DataPoint[]
}

const COLORS = ['#1B2A4A', '#5C7565', '#F5A623', '#E74C3C', '#3498DB', '#9B59B6']

const getClusterLabel = (clusterId: number): string => {
  const labels = [
    'Grupo de Alto Rendimiento',
    'Grupo Estable',
    'Grupo en Riesgo',
    'Grupo Resiliente',
    'Grupo Sobrecargado',
  ]
  return labels[clusterId] || `Cluster ${clusterId + 1}`
}

const ClusterVisualization: React.FC<ClusterVisualizationProps> = ({ points }) => {
  const { result, loading, error } = useKMeans({
    points,
    findOptimal: true,
    enabled: points.length >= 5,
  })

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-primary-100 p-8 text-center">
        <Loader2 className="w-8 h-8 text-accent animate-spin mx-auto mb-4" />
        <p className="text-primary-600">Analizando patrones de bienestar...</p>
        <p className="text-sm text-primary-500 mt-2">Esto puede tomar unos segundos</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
        <p className="text-red-700">Error al generar clusters: {error}</p>
      </div>
    )
  }

  if (!result || points.length < 5) {
    return (
      <div className="bg-white rounded-2xl border border-primary-100 p-8 text-center">
        <p className="text-primary-600">
          Se requieren al menos 5 participantes para el análisis de clusters.
        </p>
      </div>
    )
  }

  const chartData = result.clusters.map((cluster) => ({
    name: getClusterLabel(cluster.id),
    value: cluster.size,
    percentage: ((cluster.size / points.length) * 100).toFixed(1),
  }))

  return (
    <div className="space-y-6">
      {/* Chart */}
      <div className="bg-white rounded-2xl border border-primary-100 p-6">
        <h3 className="font-display font-bold text-primary-900 mb-4">
          Distribucion de Clusters
        </h3>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percentage }) => `${name}: ${percentage}%`}
              >
                {chartData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cluster Details */}
      <div className="grid gap-4">
        {result.clusters.map((cluster, index) => (
          <motion.div
            key={cluster.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl border border-primary-100 p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <h4 className="font-display font-bold text-primary-900">
                {getClusterLabel(cluster.id)}
              </h4>
              <span className="ml-auto text-sm text-primary-500">
                {cluster.size} personas ({((cluster.size / points.length) * 100).toFixed(1)}%)
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {cluster.centroid.map((value, dimIndex) => {
                const dimensions = ['AE', 'DP', 'RP', 'FOR', 'CVT', 'RRI']
                return (
                  <div key={dimIndex} className="text-center p-3 bg-primary-50 rounded-xl">
                    <p className="text-xs text-primary-500 mb-1">{dimensions[dimIndex] || `Dim ${dimIndex + 1}`}</p>
                    <p className="text-lg font-bold text-primary-900">{value.toFixed(1)}</p>
                  </div>
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <div className="bg-primary-50 rounded-2xl p-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-primary-600">Clusters encontrados</p>
            <p className="text-2xl font-bold text-primary-900">{result.k}</p>
          </div>
          <div>
            <p className="text-sm text-primary-600">Iteraciones</p>
            <p className="text-2xl font-bold text-primary-900">{result.iterations}</p>
          </div>
          <div>
            <p className="text-sm text-primary-600">Calidad (Silhouette)</p>
            <p className="text-2xl font-bold text-primary-900">{result.silhouette.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClusterVisualization
