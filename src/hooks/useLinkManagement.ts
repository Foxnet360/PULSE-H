import { useState, useCallback, useEffect } from 'react'
import type { AssessmentResult, EvaluationConfig } from '../types/assessment'

const API_URL = '/api/evaluation.php'

interface ApiEvaluation {
  id: string
  hash: string
  organization_name: string
  sector?: string | null
  expected_participants: number
  demographic_fields?: string | null
  custom_message?: string | null
  deadline?: string | null
  status: 'active' | 'closed' | 'pending'
  created_at: string
}

const parseApiEvaluation = (apiEval: ApiEvaluation): EvaluationConfig => {
  let demographicFields: string[] = []
  try {
    demographicFields = apiEval.demographic_fields
      ? JSON.parse(apiEval.demographic_fields)
      : []
  } catch {
    demographicFields = []
  }

  return {
    id: apiEval.id,
    hash: apiEval.hash,
    organizationName: apiEval.organization_name,
    sector: apiEval.sector || undefined,
    expectedParticipants: apiEval.expected_participants,
    demographicFields,
    customMessage: apiEval.custom_message || undefined,
    deadline: apiEval.deadline ? new Date(apiEval.deadline) : undefined,
    status: apiEval.status,
    createdAt: new Date(apiEval.created_at),
  }
}

const toApiPayload = (config: Omit<EvaluationConfig, 'id' | 'hash' | 'createdAt'>) => ({
  organization_name: config.organizationName,
  sector: config.sector || null,
  expected_participants: config.expectedParticipants,
  demographic_fields: config.demographicFields,
  custom_message: config.customMessage || null,
  deadline: config.deadline ? config.deadline.toISOString().split('T')[0] : null,
  status: config.status,
})

export interface SaveResponseOptions {
  area?: string
  role?: string
  seniority?: string
  gender?: string
  ageRange?: string
}

export const useLinkManagement = () => {
  const [evaluations, setEvaluations] = useState<EvaluationConfig[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchEvaluations = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(API_URL)
      if (!response.ok) {
        throw new Error(`Failed to fetch evaluations: ${response.status}`)
      }
      const data: ApiEvaluation[] = await response.json()
      setEvaluations(data.map(parseApiEvaluation))
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load evaluations'))
      setEvaluations([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchEvaluations()
  }, [fetchEvaluations])

  const createEvaluation = useCallback(async (
    config: Omit<EvaluationConfig, 'id' | 'hash' | 'createdAt'>
  ): Promise<EvaluationConfig> => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toApiPayload(config)),
      })

      if (!response.ok) {
        throw new Error(`Failed to create evaluation: ${response.status}`)
      }

      const apiEval: ApiEvaluation = await response.json()
      const created = parseApiEvaluation(apiEval)

      setEvaluations((prev) => [...prev, created])
      return created
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create evaluation'))
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const getEvaluationByHash = useCallback(async (hash: string): Promise<EvaluationConfig | undefined> => {
    try {
      const response = await fetch(`${API_URL}?hash=${encodeURIComponent(hash)}`)
      if (!response.ok) {
        return undefined
      }
      const apiEval: ApiEvaluation = await response.json()
      return parseApiEvaluation(apiEval)
    } catch (err) {
      console.error('Failed to fetch evaluation by hash:', err)
      return undefined
    }
  }, [])

  const closeEvaluation = useCallback(async (id: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_URL}?id=${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'closed' }),
      })

      if (!response.ok) {
        throw new Error(`Failed to close evaluation: ${response.status}`)
      }

      setEvaluations((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: 'closed' as const } : e))
      )
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to close evaluation'))
    } finally {
      setIsLoading(false)
    }
  }, [])

  const deleteEvaluation = useCallback(async (id: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_URL}?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error(`Failed to delete evaluation: ${response.status}`)
      }

      setEvaluations((prev) => prev.filter((e) => e.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete evaluation'))
    } finally {
      setIsLoading(false)
    }
  }, [])

  const saveResponse = useCallback(async (
    evaluationHash: string,
    result: AssessmentResult,
    options?: SaveResponseOptions
  ): Promise<boolean> => {
    try {
      const payload = {
        action: 'save_response',
        hash: evaluationHash,
        irp: result.irp,
        profile: result.profile,
        irp_zone: result.irpZone,
        ae_score: result.subscales.ae.score,
        dp_score: result.subscales.dp.score,
        rp_score: result.subscales.rp.score,
        for_score: result.customDimensions.for.score,
        cvt_score: result.customDimensions.cvt.score,
        rri_score: result.customDimensions.rri.score,
        demographic_area: options?.area || null,
        demographic_role: options?.role || null,
        demographic_seniority: options?.seniority || null,
        demographic_gender: options?.gender || null,
        demographic_age_range: options?.ageRange || null,
      }

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`Failed to save response: ${response.status}`)
      }

      return true
    } catch (err) {
      console.error('Failed to save response:', err)
      return false
    }
  }, [])

  const activeEvaluations = evaluations.filter((e) => e.status === 'active')
  const closedEvaluations = evaluations.filter((e) => e.status === 'closed')

  return {
    evaluations,
    activeEvaluations,
    closedEvaluations,
    isLoading,
    error,
    createEvaluation,
    getEvaluationByHash,
    closeEvaluation,
    deleteEvaluation,
    saveResponse,
  }
}

export default useLinkManagement
