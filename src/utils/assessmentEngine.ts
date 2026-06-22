import {
  ItemResponse,
  AssessmentResult,
  DimensionInterpretation,
  BurnoutProfile,
  IRPZone,
  RiskLevel,
  SubscaleScores,
  CustomDimensionScores,
} from '../types/assessment'
import { getItemsByModule } from '../data/assessmentData'
import { getProfileByKey, getProfileColor as getCanonicalProfileColor } from '../data/profiles'
import { sumRiskValues, averageRiskValue } from './scoring'

// ====== CONSTANTS ======

// Cutoff points for MBI-HSS subscales
const CUTOFFS = {
  ae: { low: 18, moderate: 26 }, // 0-36 range (6 items × 6)
  dp: { low: 5, moderate: 9 },   // 0-30 range (5 items × 6)
  rp: { high: 28, moderate: 22 }, // Reversed: high RP = low burnout (6 items × 6)
}

// IRP thresholds
const IRP_THRESHOLDS = {
  verde: 25,
  amarilla: 50,
  naranja: 75,
}

// Weights for IRP calculation
const IRP_WEIGHTS = {
  ae: 0.25,
  dp: 0.20,
  rp: 0.20,
  for: 0.20,
  cvt: 0.10,
  rri: 0.05,
}

// Profile definitions loaded from canonical source of truth
const getProfileDefinition = (profile: BurnoutProfile) => {
  const definition = getProfileByKey(profile)
  if (!definition) {
    throw new Error(`Unknown profile: ${profile}`)
  }
  return definition
}

// ====== CALCULATION FUNCTIONS ======

/**
 * Calculate MBI-HSS subscales
 */
export const calculateSubscales = (
  responses: ItemResponse[]
): SubscaleScores => {
  const aeItems = getItemsByModule('energia')
  const dpItems = getItemsByModule('conexion')
  const rpItems = getItemsByModule('proposito')

  const responseMap = Object.fromEntries(
    responses.map(r => [r.itemId, r.value])
  )

  return {
    ae: sumRiskValues(aeItems, responseMap),
    dp: sumRiskValues(dpItems, responseMap),
    rp: sumRiskValues(rpItems, responseMap),
  }
}

/**
 * Calculate custom dimension scores (normalized 0-100)
 */
export const calculateCustomDimensions = (
  responses: ItemResponse[]
): CustomDimensionScores => {
  const forItems = getItemsByModule('entorno')
  const cvtItems = getItemsByModule('equilibrio')
  const rriItems = getItemsByModule('fortaleza')

  const responseMap = Object.fromEntries(
    responses.map(r => [r.itemId, r.value])
  )

  return {
    for: (averageRiskValue(forItems, responseMap) / 6) * 100,
    cvt: (averageRiskValue(cvtItems, responseMap) / 6) * 100,
    rri: (averageRiskValue(rriItems, responseMap) / 6) * 100,
  }
}

/**
 * Interpret subscale risk level
 */
export const interpretSubscale = (
  score: number,
  type: 'ae' | 'dp' | 'rp'
): { level: RiskLevel; label: string; description: string } => {
  if (type === 'ae') {
    if (score <= CUTOFFS.ae.low) return {
      level: 'bajo',
      label: 'Bajo',
      description: 'Niveles saludables de agotamiento emocional',
    }
    if (score <= CUTOFFS.ae.moderate) return {
      level: 'moderado',
      label: 'Moderado',
      description: 'Atención preventiva recomendada',
    }
    return {
      level: 'alto',
      label: 'Alto',
      description: 'Intervención organizacional necesaria',
    }
  }

  if (type === 'dp') {
    if (score <= CUTOFFS.dp.low) return {
      level: 'bajo',
      label: 'Bajo',
      description: 'Buena conexión con el trabajo',
    }
    if (score <= CUTOFFS.dp.moderate) return {
      level: 'moderado',
      label: 'Moderado',
      description: 'Señales de desconexión emergentes',
    }
    return {
      level: 'alto',
      label: 'Alto',
      description: 'Alto cinismo y despersonalización',
    }
  }

  // RP is reverse-scored: high risk value = low personal realization
  if (score >= CUTOFFS.rp.high) return {
    level: 'alto',
    label: 'Bajo',
    description: 'Baja realización personal - factor de riesgo',
  }
  if (score >= CUTOFFS.rp.moderate) return {
    level: 'moderado',
    label: 'Moderado',
    description: 'Realización personal adecuada',
  }
  return {
    level: 'bajo',
    label: 'Alto',
    description: 'Alta realización personal',
  }
}

/**
 * Determine burnout profile based on subscales
 */
export const determineProfile = (
  subscales: SubscaleScores
): BurnoutProfile => {
  const aeRisk = interpretSubscale(subscales.ae, 'ae').level
  const dpRisk = interpretSubscale(subscales.dp, 'dp').level
  const rpRisk = interpretSubscale(subscales.rp, 'rp').level

  // High burnout: high AE + high DP + low RP
  if (aeRisk === 'alto' && dpRisk === 'alto' && rpRisk === 'alto') {
    return 'sobrecargado'
  }

  // High AE + high DP (regardless of RP)
  if (aeRisk === 'alto' && dpRisk === 'alto') {
    return 'fragil'
  }

  // High AE + low/moderate DP + high RP
  if (aeRisk === 'alto' && rpRisk !== 'alto') {
    return 'requete'
  }

  // Moderate AE + moderate DP
  if (aeRisk === 'moderado' && dpRisk === 'moderado') {
    return 'estable'
  }

  // Low AE + low DP + low RP
  if (aeRisk === 'bajo' && dpRisk === 'bajo' && rpRisk !== 'alto') {
    return 'floreciente'
  }

  // Low AE + any DP + low RP
  if (aeRisk === 'bajo' && rpRisk !== 'alto') {
    return 'resiliente'
  }

  // Default
  return 'estable'
}

/**
 * Calculate IRP (Índice de Riesgo Psicosocial)
 */
export const calculateIRP = (
  subscales: SubscaleScores,
  customDimensions: CustomDimensionScores
): { score: number; zone: IRPZone; label: string; description: string } => {
  // Normalize subscales to 0-100 (risk direction)
  const aeNorm = (subscales.ae / 36) * 100
  const dpNorm = (subscales.dp / 30) * 100
  const rpNorm = (subscales.rp / 36) * 100

  // Calculate weighted IRP
  const score = Math.round(
    aeNorm * IRP_WEIGHTS.ae +
    dpNorm * IRP_WEIGHTS.dp +
    rpNorm * IRP_WEIGHTS.rp +
    customDimensions.for * IRP_WEIGHTS.for +
    customDimensions.cvt * IRP_WEIGHTS.cvt +
    customDimensions.rri * IRP_WEIGHTS.rri
  )

  // Determine zone
  let zone: IRPZone
  let label: string
  let description: string

  if (score <= IRP_THRESHOLDS.verde) {
    zone = 'verde'
    label = 'Zona Verde'
    description = 'Bienestar óptimo'
  } else if (score <= IRP_THRESHOLDS.amarilla) {
    zone = 'amarilla'
    label = 'Zona Amarilla'
    description = 'Atención preventiva recomendada'
  } else if (score <= IRP_THRESHOLDS.naranja) {
    zone = 'naranja'
    label = 'Zona Naranja'
    description = 'Intervención organizacional necesaria'
  } else {
    zone = 'roja'
    label = 'Zona Roja'
    description = 'Intervención urgente obligatoria'
  }

  return { score, zone, label, description }
}

/**
 * Generate complete assessment result
 */
export const generateAssessmentResult = (
  responses: ItemResponse[]
): AssessmentResult => {
  const subscales = calculateSubscales(responses)
  const customDimensions = calculateCustomDimensions(responses)
  const profile = determineProfile(subscales)
  const irp = calculateIRP(subscales, customDimensions)

  const profileDef = getProfileDefinition(profile)

  const createDimensionInterpretation = (
    score: number,
    type: 'ae' | 'dp' | 'rp'
  ): DimensionInterpretation => {
    const interpretation = interpretSubscale(score, type)
    return {
      score: (score / (type === 'ae' ? 36 : type === 'dp' ? 30 : 36)) * 100,
      rawScore: score,
      level: interpretation.level,
      label: interpretation.label,
      description: interpretation.description,
    }
  }

  const createCustomInterpretation = (
    score: number,
    label: string
  ): DimensionInterpretation => {
    const level: RiskLevel = score < 33 ? 'bajo' : score < 66 ? 'moderado' : 'alto'
    const displayLabel = score < 33 ? 'Bajo' : score < 66 ? 'Moderado' : 'Alto'
    const description = score < 33
      ? `${label}: Nivel óptimo`
      : score < 66
        ? `${label}: Nivel adecuado`
        : `${label}: Necesita atención`

    return {
      score,
      rawScore: score,
      level,
      label: displayLabel,
      description,
    }
  }

  return {
    id: crypto.randomUUID(),
    profile,
    profileName: profileDef.name,
    profileDescription: profileDef.description,
    irp: irp.score,
    irpZone: irp.zone,
    irpLabel: irp.label,
    irpDescription: irp.description,
    dimensions: {
      ae: createDimensionInterpretation(subscales.ae, 'ae'),
      dp: createDimensionInterpretation(subscales.dp, 'dp'),
      rp: createDimensionInterpretation(subscales.rp, 'rp'),
      for: createCustomInterpretation(customDimensions.for, 'Factores Organizacionales'),
      cvt: createCustomInterpretation(customDimensions.cvt, 'Conciliación Vida-Trabajo'),
      rri: createCustomInterpretation(customDimensions.rri, 'Resiliencia'),
    },
    subscales: {
      ae: createDimensionInterpretation(subscales.ae, 'ae'),
      dp: createDimensionInterpretation(subscales.dp, 'dp'),
      rp: createDimensionInterpretation(subscales.rp, 'rp'),
    },
    customDimensions: {
      for: createCustomInterpretation(customDimensions.for, 'Factores Organizacionales'),
      cvt: createCustomInterpretation(customDimensions.cvt, 'Conciliación Vida-Trabajo'),
      rri: createCustomInterpretation(customDimensions.rri, 'Resiliencia'),
    },
    timestamp: new Date(),
  }
}

// ====== UTILITY FUNCTIONS ======

/**
 * Get color for IRP zone
 */
export const getIRPZoneColor = (zone: IRPZone): string => {
  const colors: Record<IRPZone, string> = {
    verde: '#4a7c59',
    amarilla: '#e6a817',
    naranja: '#dd6b20',
    roja: '#c53030',
  }
  return colors[zone]
}

/**
 * Get color for risk level
 */
export const getRiskLevelColor = (level: RiskLevel): string => {
  const colors: Record<RiskLevel, string> = {
    bajo: '#4a7c59',
    moderado: '#e6a817',
    alto: '#c53030',
  }
  return colors[level]
}

/**
 * Get color for profile
 */
export const getProfileColor = (profile: BurnoutProfile): string => {
  return getCanonicalProfileColor(profile)
}

/**
 * Validate all responses are complete
 */
export const isAssessmentComplete = (responses: ItemResponse[]): boolean => {
  return responses.every(r => r.value !== null && r.value !== undefined)
}

/**
 * Get completion percentage
 */
export const getCompletionPercentage = (responses: ItemResponse[]): number => {
  const answered = responses.filter(r => r.value !== null && r.value !== undefined).length
  return Math.round((answered / responses.length) * 100)
}
