import { useState, useEffect, useCallback } from 'react'
import { GamificationState, Badge } from '../types/assessment'

const STORAGE_KEY = 'pulso-h-gamification'

const LEVELS = [
  { level: 1, name: 'Observador', minPoints: 0 },
  { level: 2, name: 'Consciente', minPoints: 500 },
  { level: 3, name: 'Practicante', minPoints: 1200 },
  { level: 4, name: 'Embajador', minPoints: 2500 },
  { level: 5, name: 'Guardián', minPoints: 5000 },
]

const BADGE_DEFINITIONS = [
  { id: 'first-step', name: 'Primer Paso', description: 'Completaste el módulo 1', icon: '🌱', points: 50 },
  { id: 'halfway', name: 'Mitad del Camino', description: 'Completaste el módulo 3', icon: '🌿', points: 100 },
  { id: 'finisher', name: 'Finisher', description: 'Completaste todos los módulos', icon: '🌳', points: 200 },
  { id: 'reflective', name: 'Reflexivo', description: 'Tomaste más de 10 min en la evaluación', icon: '🐢', points: 50 },
  { id: 'explorer', name: 'Explorador', description: 'Revisaste todas las recomendaciones', icon: '🔭', points: 75 },
  { id: 'guardian-wellbeing', name: 'Guardián del Bienestar', description: 'Obtuviste perfil Floreciente', icon: '🛡️', points: 150 },
  { id: 'resilient', name: 'Resiliente', description: 'Obtuviste perfil Resiliente', icon: '🌈', points: 100 },
  { id: 'change-builder', name: 'Constructor de Cambio', description: 'Agendaste llamada con ACRUX', icon: '🔨', points: 200 },
  { id: 'ambassador', name: 'Embajador', description: 'Compartiste PULSO-H con 3+ colegas', icon: '📢', points: 150 },
  { id: 'follower', name: 'Seguidor', description: 'Completaste re-evaluación', icon: '🔄', points: 100 },
]

const POINTS_CONFIG = {
  itemCompleted: 10,
  moduleCompleted: 50,
  assessmentCompleted: 200,
  optimalTime: 25,
  recommendationViewed: 15,
  pdfDownloaded: 30,
  profileShared: 50,
  callScheduled: 100,
}

export const useGamification = () => {
  const [state, setState] = useState<GamificationState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      return {
        ...parsed,
        badges: parsed.badges.map((b: Badge) => ({
          ...b,
          earnedAt: new Date(b.earnedAt),
        })),
      }
    }
    return {
      points: 0,
      badges: [],
      level: 1,
      levelName: 'Observador',
      assessmentsCompleted: 0,
      interventionsViewed: 0,
      pdfsDownloaded: 0,
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const addPoints = useCallback((amount: number) => {
    setState(prev => {
      const newPoints = prev.points + amount
      const newLevel = LEVELS.reduce((acc, level) => 
        newPoints >= level.minPoints ? level : acc
      , LEVELS[0])
      
      return {
        ...prev,
        points: newPoints,
        level: newLevel.level,
        levelName: newLevel.name,
      }
    })
  }, [])

  const awardBadge = useCallback((badgeId: string) => {
    setState(prev => {
      if (prev.badges.some(b => b.id === badgeId)) return prev
      
      const badgeDef = BADGE_DEFINITIONS.find(b => b.id === badgeId)
      if (!badgeDef) return prev

      const newBadge: Badge = {
        id: badgeDef.id,
        name: badgeDef.name,
        description: badgeDef.description,
        icon: badgeDef.icon,
        earnedAt: new Date(),
      }

      return {
        ...prev,
        badges: [...prev.badges, newBadge],
        points: prev.points + badgeDef.points,
      }
    })
  }, [])

  const trackItemCompletion = useCallback(() => {
    addPoints(POINTS_CONFIG.itemCompleted)
  }, [addPoints])

  const trackModuleCompletion = useCallback((moduleIndex: number) => {
    addPoints(POINTS_CONFIG.moduleCompleted)
    
    if (moduleIndex === 0) awardBadge('first-step')
    if (moduleIndex === 2) awardBadge('halfway')
    if (moduleIndex === 5) awardBadge('finisher')
  }, [addPoints, awardBadge])

  const trackAssessmentCompletion = useCallback((timeSpent: number, profile: string) => {
    addPoints(POINTS_CONFIG.assessmentCompleted)
    
    if (timeSpent > 10 * 60 * 1000) { // > 10 minutes
      awardBadge('reflective')
    }
    
    if (profile === 'floreciente') {
      awardBadge('guardian-wellbeing')
    } else if (profile === 'resiliente') {
      awardBadge('resilient')
    }

    setState(prev => ({
      ...prev,
      assessmentsCompleted: prev.assessmentsCompleted + 1,
    }))
  }, [addPoints, awardBadge])

  const trackRecommendationViewed = useCallback(() => {
    addPoints(POINTS_CONFIG.recommendationViewed)
    setState(prev => ({
      ...prev,
      interventionsViewed: prev.interventionsViewed + 1,
    }))
  }, [addPoints])

  const trackPdfDownloaded = useCallback(() => {
    addPoints(POINTS_CONFIG.pdfDownloaded)
    setState(prev => ({
      ...prev,
      pdfsDownloaded: prev.pdfsDownloaded + 1,
    }))
  }, [addPoints])

  const trackCallScheduled = useCallback(() => {
    addPoints(POINTS_CONFIG.callScheduled)
    awardBadge('change-builder')
  }, [addPoints, awardBadge])

  const trackShared = useCallback(() => {
    addPoints(POINTS_CONFIG.profileShared)
    awardBadge('ambassador')
  }, [addPoints, awardBadge])

  const getProgressToNextLevel = useCallback(() => {
    const currentLevelIndex = LEVELS.findIndex(l => l.level === state.level)
    const nextLevel = LEVELS[currentLevelIndex + 1]
    
    if (!nextLevel) return { progress: 100, remaining: 0 }
    
    const currentLevelMin = LEVELS[currentLevelIndex].minPoints
    const range = nextLevel.minPoints - currentLevelMin
    const progress = ((state.points - currentLevelMin) / range) * 100
    const remaining = nextLevel.minPoints - state.points
    
    return { progress: Math.min(100, Math.max(0, progress)), remaining }
  }, [state.level, state.points])

  return {
    state,
    addPoints,
    awardBadge,
    trackItemCompletion,
    trackModuleCompletion,
    trackAssessmentCompletion,
    trackRecommendationViewed,
    trackPdfDownloaded,
    trackCallScheduled,
    trackShared,
    getProgressToNextLevel,
    LEVELS,
    BADGE_DEFINITIONS,
    POINTS_CONFIG,
  }
}
