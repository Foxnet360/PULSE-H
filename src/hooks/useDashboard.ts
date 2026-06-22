import { useState, useMemo, useEffect } from 'react'
import type { BurnoutProfile, IRPZone } from '../types/assessment'

export interface DashboardData {
  totalParticipants: number
  averageIRP: number
  irpDistribution: Record<IRPZone, number>
  profileDistribution: Record<BurnoutProfile, number>
  areaResults: AreaResult[]
  isActive: boolean
  responsesNeeded: number
}

export interface AreaResult {
  area: string
  participantCount: number
  averageIRP: number
}

interface DashboardApiResponse {
  evaluation_id: number
  is_active: boolean
  responses_needed: number
  stats: {
    total_responses: number
    average_irp: number
  }
  irp_distribution: Array<{ zone: IRPZone; count: number }>
  profile_distribution: Array<{ profile: BurnoutProfile; count: number }>
  area_results: Array<{ area: string; participant_count: number; average_irp: number }>
}

const API_URL = '/api/dashboard.php'

const emptyDashboardData: DashboardData = {
  totalParticipants: 0,
  averageIRP: 0,
  irpDistribution: {
    verde: 0,
    amarilla: 0,
    naranja: 0,
    roja: 0,
  },
  profileDistribution: {
    floreciente: 0,
    estable: 0,
    resiliente: 0,
    requete: 0,
    sobrecargado: 0,
    fragil: 0,
  },
  areaResults: [],
  isActive: false,
  responsesNeeded: 5,
}

const mapApiToDashboard = (apiData: DashboardApiResponse): DashboardData => {
  const irpDistribution: Record<IRPZone, number> = {
    verde: 0,
    amarilla: 0,
    naranja: 0,
    roja: 0,
  }

  apiData.irp_distribution.forEach(({ zone, count }) => {
    if (zone in irpDistribution) {
      irpDistribution[zone] = count
    }
  })

  const profileDistribution: Record<BurnoutProfile, number> = {
    floreciente: 0,
    estable: 0,
    resiliente: 0,
    requete: 0,
    sobrecargado: 0,
    fragil: 0,
  }

  apiData.profile_distribution.forEach(({ profile, count }) => {
    if (profile in profileDistribution) {
      profileDistribution[profile] = count
    }
  })

  return {
    totalParticipants: apiData.stats.total_responses ?? 0,
    averageIRP: apiData.stats.average_irp ?? 0,
    irpDistribution,
    profileDistribution,
    areaResults: apiData.area_results.map((area) => ({
      area: area.area,
      participantCount: area.participant_count,
      averageIRP: area.average_irp,
    })),
    isActive: apiData.is_active,
    responsesNeeded: apiData.responses_needed,
  }
}

export const useDashboard = (evaluationHash?: string) => {
  const [data, setData] = useState<DashboardData>(emptyDashboardData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [selectedArea, setSelectedArea] = useState<string>('all')

  useEffect(() => {
    if (!evaluationHash) {
      setData(emptyDashboardData)
      setLoading(false)
      setError(null)
      return
    }

    let cancelled = false

    const fetchDashboard = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`${API_URL}?hash=${encodeURIComponent(evaluationHash)}`)

        if (!response.ok) {
          throw new Error(`Dashboard request failed: ${response.status}`)
        }

        const apiData: DashboardApiResponse = await response.json()

        if (!cancelled) {
          setData(mapApiToDashboard(apiData))
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Failed to load dashboard'))
          setData(emptyDashboardData)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchDashboard()

    return () => {
      cancelled = true
    }
  }, [evaluationHash])

  const filteredAreaResults = useMemo(() => {
    if (selectedArea === 'all') return data.areaResults
    return data.areaResults.filter((area) => area.area === selectedArea)
  }, [data.areaResults, selectedArea])

  return {
    dashboardData: data,
    filteredAreaResults,
    selectedArea,
    setSelectedArea,
    loading,
    error,
  }
}

export default useDashboard
