import { useState, useEffect, useCallback } from 'react'
import { ItemResponse, UserAssessment, AssessmentResult } from '../types/assessment'
import { allAssessmentItems } from '../data/assessmentData'
import { generateAssessmentResult } from '../utils/assessmentEngine'

const LEGACY_STORAGE_KEY = 'pulso-h-assessment'

interface UseAssessmentReturn {
  assessment: UserAssessment | null
  responses: ItemResponse[]
  currentModule: number
  isComplete: boolean
  progress: number
  hasSavedProgress: boolean
  startAssessment: (evaluationHash?: string) => void
  setResponse: (itemId: string, value: number) => void
  goToModule: (moduleIndex: number) => void
  nextModule: () => void
  prevModule: () => void
  getResult: () => AssessmentResult | null
  clearAssessment: () => void
  saveProgress: () => boolean
}

const getProgressKey = (assessmentId: string): string => `pulso-h-progress-${assessmentId}`

export const useAssessment = (): UseAssessmentReturn => {
  const [assessment, setAssessment] = useState<UserAssessment | null>(null)
  const [responses, setResponses] = useState<ItemResponse[]>([])
  const [currentModule, setCurrentModule] = useState(0)
  const [hasSavedProgress, setHasSavedProgress] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const loadSaved = () => {
      // Try to load keyed progress from the legacy key first (fallback)
      const legacy = localStorage.getItem(LEGACY_STORAGE_KEY)
      if (legacy) {
        try {
          const parsed = JSON.parse(legacy)
          setAssessment(parsed.assessment)
          setResponses(parsed.responses || [])
          setCurrentModule(parsed.currentModule || 0)
          setHasSavedProgress(true)
          return
        } catch {
          localStorage.removeItem(LEGACY_STORAGE_KEY)
        }
      }

      // No legacy progress
      setHasSavedProgress(false)
    }

    loadSaved()
  }, [])

  // Auto-save to localStorage on changes using keyed storage
  useEffect(() => {
    if (assessment) {
      localStorage.setItem(
        getProgressKey(assessment.id),
        JSON.stringify({
          assessment,
          responses,
          currentModule,
          savedAt: new Date().toISOString(),
        })
      )
    }
  }, [assessment, responses, currentModule])

  const startAssessment = (evaluationHash?: string) => {
    const newAssessment: UserAssessment = {
      id: crypto.randomUUID(),
      evaluationHash: evaluationHash || 'individual',
      responses: allAssessmentItems.map(item => ({
        itemId: item.id,
        value: null,
      })),
      startedAt: new Date(),
    }

    setAssessment(newAssessment)
    setResponses(newAssessment.responses)
    setCurrentModule(0)
    setHasSavedProgress(false)
  }

  const setResponse = (itemId: string, value: number) => {
    setResponses(prev =>
      prev.map(r =>
        r.itemId === itemId ? { ...r, value: value as 0 | 1 | 2 | 3 | 4 | 5 | 6 } : r
      )
    )
  }

  const goToModule = (moduleIndex: number) => {
    setCurrentModule(Math.max(0, Math.min(5, moduleIndex)))
  }

  const nextModule = () => {
    setCurrentModule(prev => Math.min(5, prev + 1))
  }

  const prevModule = () => {
    setCurrentModule(prev => Math.max(0, prev - 1))
  }

  const getResult = (): AssessmentResult | null => {
    if (!assessment) return null

    const validResponses = responses.filter(r => r.value !== null)
    if (validResponses.length < allAssessmentItems.length * 0.8) {
      return null // Need at least 80% completion
    }

    try {
      localStorage.setItem('lm-pulso-h-completed', 'true')
    } catch {
      // ignore
    }

    return generateAssessmentResult(responses)
  }

  const clearAssessment = () => {
    if (assessment) {
      localStorage.removeItem(getProgressKey(assessment.id))
    }
    localStorage.removeItem(LEGACY_STORAGE_KEY)
    setAssessment(null)
    setResponses([])
    setCurrentModule(0)
    setHasSavedProgress(false)
  }

  const saveProgress = useCallback((): boolean => {
    if (!assessment) return false

    localStorage.setItem(
      getProgressKey(assessment.id),
      JSON.stringify({
        assessment,
        responses,
        currentModule,
        savedAt: new Date().toISOString(),
      })
    )
    setHasSavedProgress(true)
    return true
  }, [assessment, responses, currentModule])

  const answeredCount = responses.filter(r => r.value !== null).length
  const isComplete = answeredCount === allAssessmentItems.length
  const progress = Math.round((answeredCount / allAssessmentItems.length) * 100)

  return {
    assessment,
    responses,
    currentModule,
    isComplete,
    progress,
    hasSavedProgress,
    startAssessment,
    setResponse,
    goToModule,
    nextModule,
    prevModule,
    getResult,
    clearAssessment,
    saveProgress,
  }
}
