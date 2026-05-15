import { useState, useCallback } from 'react'
import type { EvaluationConfig } from '../types/assessment'

// Generate a random 8-character hash
const generateHash = (): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let hash = ''
  for (let i = 0; i < 8; i++) {
    hash += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return hash
}

// Store evaluations in localStorage (in production, this would be a backend API)
const STORAGE_KEY = 'pulso-h-evaluations'

const getStoredEvaluations = (): EvaluationConfig[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

const saveEvaluations = (evaluations: EvaluationConfig[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(evaluations))
}

export const useLinkManagement = () => {
  const [evaluations, setEvaluations] = useState<EvaluationConfig[]>(getStoredEvaluations)
  const [isLoading, setIsLoading] = useState(false)

  const createEvaluation = useCallback((config: Omit<EvaluationConfig, 'id' | 'hash' | 'createdAt'>) => {
    setIsLoading(true)
    
    // Simulate API call
    return new Promise<EvaluationConfig>((resolve) => {
      setTimeout(() => {
        const newEvaluation: EvaluationConfig = {
          ...config,
          id: crypto.randomUUID(),
          hash: generateHash(),
          createdAt: new Date(),
        }
        
        const updated = [...evaluations, newEvaluation]
        setEvaluations(updated)
        saveEvaluations(updated)
        setIsLoading(false)
        resolve(newEvaluation)
      }, 500)
    })
  }, [evaluations])

  const getEvaluationByHash = useCallback((hash: string): EvaluationConfig | undefined => {
    return evaluations.find(e => e.hash === hash)
  }, [evaluations])

  const closeEvaluation = useCallback((id: string) => {
    const updated = evaluations.map(e => 
      e.id === id ? { ...e, status: 'closed' as const } : e
    )
    setEvaluations(updated)
    saveEvaluations(updated)
  }, [evaluations])

  const deleteEvaluation = useCallback((id: string) => {
    const updated = evaluations.filter(e => e.id !== id)
    setEvaluations(updated)
    saveEvaluations(updated)
  }, [evaluations])

  const activeEvaluations = evaluations.filter(e => e.status === 'active')
  const closedEvaluations = evaluations.filter(e => e.status === 'closed')

  return {
    evaluations,
    activeEvaluations,
    closedEvaluations,
    isLoading,
    createEvaluation,
    getEvaluationByHash,
    closeEvaluation,
    deleteEvaluation,
  }
}

export default useLinkManagement
