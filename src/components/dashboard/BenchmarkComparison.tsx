import React, { useState } from 'react'
import { motion } from 'motion/react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { TrendingUp, Award, BarChart3 } from 'lucide-react'
import { benchmarkDatabase, calculatePercentile, getPercentileMessage } from '../../data/benchmarkData'


interface BenchmarkComparisonProps {
  currentIRP: number
  currentSector?: string
}

const BenchmarkComparison: React.FC<BenchmarkComparisonProps> = ({
  currentIRP,
  currentSector = 'General',
}) => {
  const [selectedSector, setSelectedSector] = useState(currentSector)
  
  const benchmark = benchmarkDatabase.find(
    (b) => b.sector.toLowerCase() === selectedSector.toLowerCase()
  ) || benchmarkDatabase[benchmarkDatabase.length - 1]

  const percentile = calculatePercentile(currentIRP, benchmark)
  const message = getPercentileMessage(percentile)

  const chartData = [
    {
      name: 'Tu organizacion',
      irp: currentIRP,
      color: '#F5A623',
    },
    {
      name: 'Promedio sector',
      irp: benchmark.averageIRP,
      color: '#5C7565',
    },
    {
      name: 'Percentil 25',
      irp: benchmark.percentile25,
      color: '#1B2A4A',
    },
    {
      name: 'Percentil 75',
      irp: benchmark.percentile75,
      color: '#1B2A4A',
    },
  ]

  const getComparisonColor = (): string => {
    if (currentIRP < benchmark.averageIRP) return 'text-green-500'
    if (currentIRP < benchmark.averageIRP + 10) return 'text-yellow-500'
    return 'text-red-500'
  }

  const difference = currentIRP - benchmark.averageIRP

  return (
    <div className="space-y-6">
      {/* Sector Selector */}
      <div className="bg-white rounded-2xl border border-primary-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-accent" />
            <h3 className="font-display font-bold text-primary-900">Comparativa Sectorial</h3>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-primary-700 mb-2">
            Selecciona tu sector
          </label>
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all bg-white"
          >
            {benchmarkDatabase.map((b) => (
              <option key={b.sector} value={b.sector}>
                {b.sector} (n={b.sampleSize})
              </option>
            ))}
          </select>
        </div>

        {/* Comparison Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-primary-50 rounded-xl p-4 text-center"
          >
            <TrendingUp className="w-6 h-6 text-accent mx-auto mb-2" />
            <p className="text-sm text-primary-600">Diferencia vs sector</p>
            <p className={`text-2xl font-bold ${getComparisonColor()}`}>
              {difference > 0 ? '+' : ''}{difference.toFixed(1)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-primary-50 rounded-xl p-4 text-center"
          >
            <Award className="w-6 h-6 text-accent mx-auto mb-2" />
            <p className="text-sm text-primary-600">Percentil</p>
            <p className="text-2xl font-bold text-primary-900">
              {percentile}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-primary-50 rounded-xl p-4 text-center"
          >
            <BarChart3 className="w-6 h-6 text-accent mx-auto mb-2" />
            <p className="text-sm text-primary-600">Muestra sector</p>
            <p className="text-2xl font-bold text-primary-900">
              {benchmark.sampleSize.toLocaleString()}
            </p>
          </motion.div>
        </div>

        <div className="mt-4 p-4 bg-accent/5 rounded-xl">
          <p className="text-sm text-primary-700 text-center">
            {message}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl border border-primary-100 p-6">
        <h3 className="font-display font-bold text-primary-900 mb-4">
          Comparacion de IRP
        </h3>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="name" type="category" width={120} />
              <RechartsTooltip />
              <ReferenceLine x={benchmark.averageIRP} stroke="#5C7565" strokeDasharray="3 3" />
              <Bar dataKey="irp" fill="#F5A623" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default BenchmarkComparison
