import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { BarChart3, Download, Filter, Loader2, AlertCircle } from 'lucide-react'
import { useDashboard } from '../hooks/useDashboard'
import IRPCard from '../components/dashboard/IRPCard'
import AreaRanking from '../components/dashboard/AreaRanking'

const DashboardPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const evaluationHash = searchParams.get('hash') || undefined

  const {
    dashboardData,
    filteredAreaResults,
    selectedArea,
    setSelectedArea,
    loading,
    error,
  } = useDashboard(evaluationHash)

  const handleExport = () => {
    const csvContent = [
      ['Área', 'Participantes', 'IRP Promedio'],
      ...dashboardData.areaResults.map(area => [
        area.area,
        area.participantCount.toString(),
        area.averageIRP.toFixed(2),
      ]),
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'pulso-h-dashboard.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-accent animate-spin" />
          <p className="text-primary-600">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 pt-24">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="font-display text-2xl font-bold text-red-800 mb-4">
            Error al cargar el dashboard
          </h1>
          <p className="text-red-700 mb-2">
            {error.message}
          </p>
          <p className="text-red-600 text-sm">
            Verifica que el link de la evaluación sea correcto.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pt-24">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-primary-900 mb-2">
            Dashboard Organizacional
          </h1>
          <p className="text-primary-600">
            Análisis agregado de bienestar laboral
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            disabled={!dashboardData.isActive}
            className="flex items-center gap-2 px-4 py-2 bg-white text-primary-700 font-medium rounded-xl border border-primary-200 hover:border-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            Exportar CSV
          </button>
        </div>
      </div>

      {!dashboardData.isActive ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8 text-center mb-8"
        >
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-yellow-600" />
          </div>

          <h2 className="font-display text-xl font-bold text-yellow-800 mb-2">
            Dashboard en espera
          </h2>

          <p className="text-yellow-700 mb-4">
            Se requieren al menos 5 respuestas para activar el análisis organizacional.
          </p>

          <div className="w-full bg-yellow-200 rounded-full h-4 max-w-md mx-auto overflow-hidden">
            <div
              className="bg-yellow-500 h-4 rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(100, (dashboardData.totalParticipants / 5) * 100)}%`,
              }}
            />
          </div>

          <p className="text-sm text-yellow-600 mt-2">
            {dashboardData.totalParticipants} de 5 respuestas recibidas
          </p>
        </motion.div>
      ) : (
        <>
          <IRPCard data={dashboardData} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <AreaRanking areas={filteredAreaResults} />
            </div>

            <div className="space-y-6">
              {/* Filtros */}
              <div className="bg-white rounded-2xl border border-primary-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="w-5 h-5 text-accent" />
                  <h3 className="font-display font-bold text-primary-900">Filtros</h3>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-primary-700">
                    Área
                  </label>
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-primary-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all bg-white"
                  >
                    <option value="all">Todas las áreas</option>
                    {dashboardData.areaResults.map((area) => (
                      <option key={area.area} value={area.area}>
                        {area.area}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-4 p-4 bg-primary-50 rounded-xl">
                  <p className="text-sm text-primary-600">
                    <strong>Nota de privacidad:</strong> Solo se muestran resultados 
                    cuando hay al menos 5 participantes por grupo.
                  </p>
                </div>
              </div>

              {/* Distribución de perfiles */}
              <div className="bg-white rounded-2xl border border-primary-100 p-6">
                <h3 className="font-display font-bold text-primary-900 mb-4">
                  Distribución de Perfiles
                </h3>

                <div className="space-y-3">
                  {Object.entries(dashboardData.profileDistribution).map(([profile, count]) => {
                    if (count === 0) return null
                    const percentage = (count / dashboardData.totalParticipants) * 100
                    
                    return (
                      <div key={profile}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-primary-700 capitalize">{profile}</span>
                          <span className="text-sm font-medium text-primary-900">
                            {count} ({percentage.toFixed(0)}%)
                          </span>
                        </div>
                        <div className="w-full bg-primary-100 rounded-full h-2">
                          <div
                            className="bg-accent h-2 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default DashboardPage
