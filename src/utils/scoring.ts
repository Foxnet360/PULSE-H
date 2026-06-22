import type { AssessmentItem } from '../types/assessment'

export interface NormalizedResponse {
  itemId: string
  rawValue: number
  riskValue: number // 0-6, higher = worse
}

/**
 * Normalize a single item response so that higher values always mean higher risk.
 * For reversed items (e.g. "I feel competent at work"), the risk value is inverted.
 */
export const normalizeResponse = (
  item: AssessmentItem,
  value: number
): NormalizedResponse => ({
  itemId: item.id,
  rawValue: value,
  riskValue: item.reversed ? 6 - value : value,
})

/**
 * Get the risk value for a single item without building a full normalized response.
 */
export const getRiskValue = (item: AssessmentItem, value: number): number => {
  return item.reversed ? 6 - value : value
}

/**
 * Calculate the average risk value for a set of items and responses.
 * Items without a response are ignored.
 */
export const averageRiskValue = (
  items: AssessmentItem[],
  responses: Record<string, number | null | undefined>
): number => {
  const values = items
    .map(item => {
      const value = responses[item.id]
      return value !== null && value !== undefined ? getRiskValue(item, value) : null
    })
    .filter((v): v is number => v !== null)

  if (values.length === 0) return 3 // neutral default
  return values.reduce((sum, v) => sum + v, 0) / values.length
}

/**
 * Sum the risk values for a set of items and responses.
 * Items without a response are ignored.
 */
export const sumRiskValues = (
  items: AssessmentItem[],
  responses: Record<string, number | null | undefined>
): number => {
  return items
    .map(item => {
      const value = responses[item.id]
      return value !== null && value !== undefined ? getRiskValue(item, value) : 0
    })
    .reduce((sum, v) => sum + v, 0)
}
