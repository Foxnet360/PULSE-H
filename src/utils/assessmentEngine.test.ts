import { describe, it, expect } from 'vitest'
import {
  calculateSubscales,
  interpretSubscale,
  determineProfile,
  calculateIRP,
  generateAssessmentResult,
} from '../utils/assessmentEngine'
import type { ItemResponse } from '../types/assessment'

// Helper to create mock responses
const createResponses = (values: Record<string, number>): ItemResponse[] => {
  return Object.entries(values).map(([itemId, value]) => ({
    itemId,
    value: value as 0 | 1 | 2 | 3 | 4 | 5 | 6,
  }))
}

// Helper to create full assessment responses
const createFullAssessment = (
  ae: number[],
  dp: number[],
  rp: number[],
  entorno: number[],
  equilibrio: number[],
  fortaleza: number[]
): ItemResponse[] => {
  const responses: ItemResponse[] = []
  
  ae.forEach((v, i) => responses.push({ itemId: `ae-${i + 1}`, value: v as 0 | 1 | 2 | 3 | 4 | 5 | 6 }))
  dp.forEach((v, i) => responses.push({ itemId: `dp-${i + 1}`, value: v as 0 | 1 | 2 | 3 | 4 | 5 | 6 }))
  rp.forEach((v, i) => responses.push({ itemId: `rp-${i + 1}`, value: v as 0 | 1 | 2 | 3 | 4 | 5 | 6 }))
  entorno.forEach((v, i) => responses.push({ itemId: `for-${i + 1}`, value: v as 0 | 1 | 2 | 3 | 4 | 5 | 6 }))
  equilibrio.forEach((v, i) => responses.push({ itemId: `cvt-${i + 1}`, value: v as 0 | 1 | 2 | 3 | 4 | 5 | 6 }))
  fortaleza.forEach((v, i) => responses.push({ itemId: `rri-${i + 1}`, value: v as 0 | 1 | 2 | 3 | 4 | 5 | 6 }))
  
  return responses
}

describe('Assessment Engine', () => {
  describe('calculateSubscales', () => {
    it('calculates zero scores for empty responses', () => {
      const result = calculateSubscales([])
      expect(result.ae).toBe(0)
      expect(result.dp).toBe(0)
      expect(result.rp).toBe(0)
    })

    it('calculates correct AE score', () => {
      const responses = createResponses({
        'ae-1': 3, 'ae-2': 4, 'ae-3': 2, 'ae-4': 5, 'ae-5': 3, 'ae-6': 4,
      })
      const result = calculateSubscales(responses)
      expect(result.ae).toBe(21) // 3+4+2+5+3+4
      expect(result.dp).toBe(0)
      expect(result.rp).toBe(0)
    })

    it('calculates correct DP score', () => {
      const responses = createResponses({
        'dp-1': 2, 'dp-2': 3, 'dp-3': 4, 'dp-4': 2, 'dp-5': 3,
      })
      const result = calculateSubscales(responses)
      expect(result.ae).toBe(0)
      expect(result.dp).toBe(14) // 2+3+4+2+3
      expect(result.rp).toBe(0)
    })

    it('calculates correct RP score', () => {
      const responses = createResponses({
        'rp-1': 5, 'rp-2': 4, 'rp-3': 5, 'rp-4': 3, 'rp-5': 4, 'rp-6': 5,
      })
      const result = calculateSubscales(responses)
      expect(result.ae).toBe(0)
      expect(result.dp).toBe(0)
      expect(result.rp).toBe(26) // 5+4+5+3+4+5
    })

    it('calculates all subscales together', () => {
      const responses = createResponses({
        'ae-1': 3, 'ae-2': 4, 'ae-3': 2, 'ae-4': 5, 'ae-5': 3, 'ae-6': 4,
        'dp-1': 2, 'dp-2': 3, 'dp-3': 4, 'dp-4': 2, 'dp-5': 3,
        'rp-1': 5, 'rp-2': 4, 'rp-3': 5, 'rp-4': 3, 'rp-5': 4, 'rp-6': 5,
      })
      const result = calculateSubscales(responses)
      expect(result.ae).toBe(21)
      expect(result.dp).toBe(14)
      expect(result.rp).toBe(26)
    })
  })

  describe('interpretSubscale', () => {
    describe('AE (Agotamiento Emocional)', () => {
      it('returns bajo for AE <= 18', () => {
        const result = interpretSubscale(15, 'ae')
        expect(result.level).toBe('bajo')
        expect(result.label).toBe('Bajo')
      })

      it('returns moderado for AE 19-26', () => {
        const result = interpretSubscale(22, 'ae')
        expect(result.level).toBe('moderado')
        expect(result.label).toBe('Moderado')
      })

      it('returns alto for AE > 26', () => {
        const result = interpretSubscale(30, 'ae')
        expect(result.level).toBe('alto')
        expect(result.label).toBe('Alto')
      })
    })

    describe('DP (Despersonalizacion)', () => {
      it('returns bajo for DP <= 5', () => {
        const result = interpretSubscale(3, 'dp')
        expect(result.level).toBe('bajo')
      })

      it('returns moderado for DP 6-9', () => {
        const result = interpretSubscale(7, 'dp')
        expect(result.level).toBe('moderado')
      })

      it('returns alto for DP > 9', () => {
        const result = interpretSubscale(12, 'dp')
        expect(result.level).toBe('alto')
      })
    })

    describe('RP (Realizacion Personal) - Reversed', () => {
      it('returns bajo for RP >= 28 (high RP = low burnout)', () => {
        const result = interpretSubscale(30, 'rp')
        expect(result.level).toBe('bajo')
        expect(result.label).toBe('Alto')
      })

      it('returns moderado for RP 22-27', () => {
        const result = interpretSubscale(25, 'rp')
        expect(result.level).toBe('moderado')
        expect(result.label).toBe('Moderado')
      })

      it('returns alto for RP < 22 (low RP = high burnout)', () => {
        const result = interpretSubscale(18, 'rp')
        expect(result.level).toBe('alto')
        expect(result.label).toBe('Bajo')
      })
    })
  })

  describe('determineProfile', () => {
    it('returns sobrecargado for high AE + high DP + low RP', () => {
      const subscales = { ae: 30, dp: 15, rp: 15 }
      const result = determineProfile(subscales)
      expect(result).toBe('sobrecargado')
    })

    it('returns fragil for high AE + high DP + any RP', () => {
      const subscales = { ae: 30, dp: 15, rp: 25 }
      const result = determineProfile(subscales)
      expect(result).toBe('fragil')
    })

    it('returns requete for high AE + low/moderate DP', () => {
      const subscales = { ae: 30, dp: 8, rp: 25 }
      const result = determineProfile(subscales)
      expect(result).toBe('requete')
    })

    it('returns floreciente for low AE + low DP + moderate/high RP', () => {
      const subscales = { ae: 10, dp: 3, rp: 30 }
      const result = determineProfile(subscales)
      expect(result).toBe('floreciente')
    })

    it('returns resiliente for low AE + any DP + moderate/high RP', () => {
      const subscales = { ae: 10, dp: 8, rp: 25 }
      const result = determineProfile(subscales)
      expect(result).toBe('resiliente')
    })

    it('returns estable for moderate AE + moderate DP', () => {
      const subscales = { ae: 22, dp: 7, rp: 20 }
      const result = determineProfile(subscales)
      expect(result).toBe('estable')
    })
  })

  describe('calculateIRP', () => {
    it('returns valid zone for low risk', () => {
      const subscales = { ae: 10, dp: 3, rp: 30 }
      const custom = { for: 80, cvt: 70, rri: 75 }
      const result = calculateIRP(subscales, custom)
      
      expect(result.score).toBeGreaterThanOrEqual(0)
      expect(result.score).toBeLessThanOrEqual(100)
      expect(['verde', 'amarilla', 'naranja', 'roja']).toContain(result.zone)
    })

    it('returns valid zone for high risk', () => {
      const subscales = { ae: 30, dp: 15, rp: 15 }
      const custom = { for: 30, cvt: 25, rri: 20 }
      const result = calculateIRP(subscales, custom)
      
      expect(result.score).toBeGreaterThanOrEqual(0)
      expect(result.score).toBeLessThanOrEqual(100)
      expect(['verde', 'amarilla', 'naranja', 'roja']).toContain(result.zone)
    })

    it('calculates IRP consistently', () => {
      const subscales = { ae: 20, dp: 7, rp: 22 }
      const custom = { for: 55, cvt: 50, rri: 50 }
      const result1 = calculateIRP(subscales, custom)
      const result2 = calculateIRP(subscales, custom)
      
      expect(result1.score).toBe(result2.score)
      expect(result1.zone).toBe(result2.zone)
    })

    it('returns higher IRP for higher risk', () => {
      const lowRiskSubscales = { ae: 10, dp: 3, rp: 30 }
      const lowRiskCustom = { for: 80, cvt: 70, rri: 75 }
      const lowResult = calculateIRP(lowRiskSubscales, lowRiskCustom)
      
      const highRiskSubscales = { ae: 30, dp: 15, rp: 15 }
      const highRiskCustom = { for: 30, cvt: 25, rri: 20 }
      const highResult = calculateIRP(highRiskSubscales, highRiskCustom)
      
      expect(highResult.score).toBeGreaterThan(lowResult.score)
    })
  })

  describe('generateAssessmentResult', () => {
    it('generates complete result structure', () => {
      const responses = createFullAssessment(
        [1, 2, 1, 2, 1, 2], // AE: low (9)
        [1, 1, 2, 1, 1],    // DP: low (6)
        [5, 6, 5, 6, 5, 6], // RP: high (33)
        [5, 5, 4, 5, 5, 4, 5], // Entorno: good
        [5, 4, 5, 5, 4, 5], // Equilibrio: good
        [5, 5, 5, 4, 5, 5]  // Fortaleza: good
      )
      
      const result = generateAssessmentResult(responses)
      
      expect(result.profile).toBeDefined()
      expect(['floreciente', 'estable', 'resiliente', 'requete', 'sobrecargado', 'fragil']).toContain(result.profile)
      expect(result.irp).toBeGreaterThanOrEqual(0)
      expect(result.irp).toBeLessThanOrEqual(100)
    })

    it('generates result for high risk profile', () => {
      const responses = createFullAssessment(
        [5, 6, 5, 6, 5, 6], // AE: high (33)
        [5, 6, 5, 5, 6],    // DP: high (27)
        [1, 2, 1, 2, 1, 2], // RP: low (9)
        [2, 3, 2, 3, 2, 3, 2], // Entorno: poor
        [2, 3, 2, 2, 3, 2], // Equilibrio: poor
        [2, 2, 3, 2, 2, 3]  // Fortaleza: poor
      )
      
      const result = generateAssessmentResult(responses)
      
      expect(result.profile).toBeDefined()
      expect(result.irp).toBeGreaterThanOrEqual(0)
      expect(result.irp).toBeLessThanOrEqual(100)
      expect(result.subscales.ae.level).toBe('alto')
      expect(result.subscales.dp.level).toBe('alto')
      expect(result.subscales.rp.level).toBe('alto')
    })

    it('includes all required fields', () => {
      const responses = createFullAssessment(
        [3, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3, 3],
        [3, 3, 3, 3, 3, 3]
      )
      
      const result = generateAssessmentResult(responses)
      
      expect(result.id).toBeDefined()
      expect(result.profile).toBeDefined()
      expect(result.profileName).toBeDefined()
      expect(result.profileDescription).toBeDefined()
      expect(result.irp).toBeDefined()
      expect(result.irpZone).toBeDefined()
      expect(result.irpLabel).toBeDefined()
      expect(result.irpDescription).toBeDefined()
      expect(result.dimensions).toBeDefined()
      expect(result.subscales).toBeDefined()
      expect(result.customDimensions).toBeDefined()
      expect(result.timestamp).toBeDefined()
    })
  })
})
