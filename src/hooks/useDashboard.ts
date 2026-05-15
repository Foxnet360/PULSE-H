import { useState, useMemo } from 'react'
import type { AssessmentResult, BurnoutProfile, IRPZone } from '../types/assessment'

// Mock data generator for development
const generateMockResults = (count: number): AssessmentResult[] => {
  const profiles: BurnoutProfile[] = ['floreciente', 'estable', 'resiliente', 'requete', 'sobrecargado', 'fragil']
  
  return Array.from({ length: count }, (_, i) => {
    const irp = Math.random() * 100
    const profileIndex = Math.floor(Math.random() * profiles.length)
    
    return {
      id: `result-${i}`,
      profile: profiles[profileIndex],
      profileName: profiles[profileIndex],
      profileDescription: 'Perfil de ejemplo',
      irp,
      irpZone: irp < 25 ? 'verde' : irp < 50 ? 'amarilla' : irp < 75 ? 'naranja' : 'roja',
      irpLabel: irp < 25 ? 'Bajo' : irp < 50 ? 'Moderado' : irp < 75 ? 'Alto' : 'Crítico',
      irpDescription: 'Descripción de ejemplo',
      dimensions: {},
      subscales: {
        ae: { score: Math.random() * 36, rawScore: Math.random() * 36, level: 'bajo', label: 'AE', description: '' },
        dp: { score: Math.random() * 30, rawScore: Math.random() * 30, level: 'bajo', label: 'DP', description: '' },
        rp: { score: Math.random() * 36, rawScore: Math.random() * 36, level: 'bajo', label: 'RP', description: '' },
      },
      customDimensions: {
        for: { score: Math.random() * 100, rawScore: Math.random() * 100, level: 'bajo', label: 'FOR', description: '' },
        cvt: { score: Math.random() * 100, rawScore: Math.random() * 100, level: 'bajo', label: 'CVT', description: '' },
        rri: { score: Math.random() * 100, rawScore: Math.random() * 100, level: 'bajo', label: 'RRI', description: '' },
      },
      timestamp: new Date(),
    }
  })
}

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

export const useDashboard = (evaluationHash?: string) => {
  const [results] = useState<AssessmentResult[]>(() => {
    // In production, this would fetch from API based on evaluationHash
    // For now, generate mock data
    return generateMockResults(12)
  })

  const [selectedArea, setSelectedArea] = useState<string>('all')

  const dashboardData: DashboardData = useMemo(() => {
    const totalParticipants = results.length
    const isActive = totalParticipants >= 5
    const responsesNeeded = Math.max(0, 5 - totalParticipants)

    const averageIRP = totalParticipants > 0
      ? results.reduce((sum, r) => sum + r.irp, 0) / totalParticipants
      : 0

    const irpDistribution: Record<IRPZone, number> = {
      verde: 0,
      amarilla: 0,
      naranja: 0,
      roja: 0,
    }

    const profileDistribution: Record<BurnoutProfile, number> = {
      floreciente: 0,
      estable: 0,
      resiliente: 0,
      requete: 0,
      sobrecargado: 0,
      fragil: 0,
    }

    results.forEach((result) => {
      irpDistribution[result.irpZone]++
      profileDistribution[result.profile]++
    })

    // Mock area results
    const areas = ['Ventas', 'TI', 'RRHH', 'Marketing', 'Operaciones']
    const areaResults: AreaResult[] = areas.map((area) => ({
      area,
      participantCount: Math.floor(Math.random() * 5) + 2,
      averageIRP: Math.random() * 100,
    }))

    return {
      totalParticipants,
      averageIRP,
      irpDistribution,
      profileDistribution,
      areaResults,
      isActive,
      responsesNeeded,
    }
  }, [results])

  const filteredResults = useMemo(() => {
    if (selectedArea === 'all') return results
    // In production, filter by actual area data
    return results
  }, [results, selectedArea])

  return {
    dashboardData,
    selectedArea,
    setSelectedArea,
    filteredResults,
    evaluationHash,
  }
}

export default useDashboard
