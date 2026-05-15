import { useState, useEffect } from 'react'
import { ItemResponse, UserAssessment, AssessmentResult } from '../types/assessment'
import { allAssessmentItems } from '../data/assessmentData'
import { generateAssessmentResult } from '../utils/assessmentEngine'

const STORAGE_KEY = 'pulso-h-assessment'

interface UseAssessmentReturn {
  assessment: UserAssessment | null
  responses: ItemResponse[]
  currentModule: number
  isComplete: boolean
  progress: number
  startAssessment: (evaluationHash?: string) => void
  setResponse: (itemId: string, value: number) => void
  goToModule: (moduleIndex: number) => void
  nextModule: () => void
  prevModule: () => void
  getResult: () => AssessmentResult | null
  clearAssessment: () => void
}

export const useAssessment = (): UseAssessmentReturn => {
  const [assessment, setAssessment] = useState<UserAssessment | null>(null)
  const [responses, setResponses] = useState<ItemResponse[]>([])
  const [currentModule, setCurrentModule] = useState(0)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setAssessment(parsed.assessment)
        setResponses(parsed.responses || [])
        setCurrentModule(parsed.currentModule || 0)
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }, [])

  // Save to localStorage on changes
  useEffect(() => {
    if (assessment) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        assessment,
        responses,
        currentModule,
      }))
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

    return generateAssessmentResult(responses)
  }

  const clearAssessment = () => {
    localStorage.removeItem(STORAGE_KEY)
    setAssessment(null)
    setResponses([])
    setCurrentModule(0)
  }

  const answeredCount = responses.filter(r => r.value !== null).length
  const isComplete = answeredCount === allAssessmentItems.length
  const progress = Math.round((answeredCount / allAssessmentItems.length) * 100)

  return {
    assessment,
    responses,
    currentModule,
    isComplete,
    progress,
    startAssessment,
    setResponse,
    goToModule,
    nextModule,
    prevModule,
    getResult,
    clearAssessment,
  }
}
