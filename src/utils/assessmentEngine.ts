import {
  LikertResponse,
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

// Profile definitions
const PROFILE_DEFINITIONS: Record<BurnoutProfile, { name: string; description: string; prevalence: string }> = {
  floreciente: {
    name: 'Floreciente',
    description: 'Tienes altos niveles de bienestar, realización y energía. Tu relación con el trabajo es positiva y sostenible.',
    prevalence: '~15%',
  },
  estable: {
    name: 'Estable',
    description: 'Mantienes un balance razonable. Hay áreas de mejora, pero en general manejas bien las demandas laborales.',
    prevalence: '~20%',
  },
  resiliente: {
    name: 'Resiliente',
    description: 'A pesar de la presión, mantienes una buena actitud y encuentras sentido en tu trabajo.',
    prevalence: '~18%',
  },
  requete: {
    name: 'Requete',
    description: 'Sientes agotamiento y desconexión. Es importante tomar acciones preventivas ahora.',
    prevalence: '~22%',
  },
  sobrecargado: {
    name: 'Sobrecargadx',
    description: 'Estás en una situación de alto riesgo. Necesitas atención inmediata y apoyo profesional.',
    prevalence: '~15%',
  },
  fragil: {
    name: 'Funcional pero Frágil',
    description: 'Mantienes el funcionamiento, pero tus recursos están muy limitados.',
    prevalence: '~10%',
  },
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

  const getScore = (itemIds: string[]): number => {
    const scores = itemIds
      .map(id => responses.find(r => r.itemId === id)?.value)
      .filter((v): v is LikertResponse => v !== null && v !== undefined)
    
    return scores.length > 0
      ? scores.reduce((sum: number, val) => sum + val, 0)
      : 0
  }

  return {
    ae: getScore(aeItems.map(i => i.id)),
    dp: getScore(dpItems.map(i => i.id)),
    rp: getScore(rpItems.map(i => i.id)),
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

  const getNormalizedScore = (itemIds: string[]): number => {
    const scores = itemIds
      .map(id => responses.find(r => r.itemId === id)?.value)
      .filter((v): v is LikertResponse => v !== null && v !== undefined)
    
    if (scores.length === 0) return 50 // Default neutral
    
    const avg = scores.reduce((sum: number, val) => sum + val, 0) / scores.length
    return (avg / 6) * 100 // Normalize 0-6 to 0-100
  }

  return {
    for: getNormalizedScore(forItems.map(i => i.id)),
    cvt: getNormalizedScore(cvtItems.map(i => i.id)),
    rri: getNormalizedScore(rriItems.map(i => i.id)),
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

  // RP is reversed
  if (score >= CUTOFFS.rp.high) return {
    level: 'bajo',
    label: 'Alto',
    description: 'Alta realización personal',
  }
  if (score >= CUTOFFS.rp.moderate) return {
    level: 'moderado',
    label: 'Moderado',
    description: 'Realización personal adecuada',
  }
  return {
    level: 'alto',
    label: 'Bajo',
    description: 'Baja realización personal - factor de riesgo',
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
  // Normalize subscales to 0-100
  const aeNorm = (subscales.ae / 36) * 100
  const dpNorm = (subscales.dp / 30) * 100
  const rpNorm = ((36 - subscales.rp) / 36) * 100 // Inverted: low RP = high risk

  // Calculate weighted IRP
  const score = Math.round(
    aeNorm * IRP_WEIGHTS.ae +
    dpNorm * IRP_WEIGHTS.dp +
    rpNorm * IRP_WEIGHTS.rp +
    customDimensions.for * IRP_WEIGHTS.for +
    (100 - customDimensions.cvt) * IRP_WEIGHTS.cvt + // Inverted: low CVT = high risk
    (100 - customDimensions.rri) * IRP_WEIGHTS.rri   // Inverted: low RRI = high risk
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

  const profileDef = PROFILE_DEFINITIONS[profile]

  const createDimensionInterpretation = (
    score: number,
    type: 'ae' | 'dp' | 'rp'
  ): DimensionInterpretation => {
    const interpretation = interpretSubscale(score, type)
    return {
      score: type === 'rp' ? ((36 - score) / 36) * 100 : (score / (type === 'ae' ? 36 : 30)) * 100,
      rawScore: score,
      level: interpretation.level,
      label: interpretation.label,
      description: interpretation.description,
    }
  }

  const createCustomInterpretation = (
    score: number,
    label: string
  ): DimensionInterpretation => ({
    score,
    rawScore: score,
    level: score < 33 ? 'bajo' : score < 66 ? 'moderado' : 'alto',
    label: score < 33 ? 'Bajo' : score < 66 ? 'Moderado' : 'Alto',
    description: `${label}: ${score < 33 ? 'Necesita atención' : score < 66 ? 'Nivel adecuado' : 'Nivel óptimo'}`,
  })

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
  const colors: Record<BurnoutProfile, string> = {
    floreciente: '#4a7c59',
    estable: '#627d98',
    resiliente: '#5c8a9a',
    requete: '#c9872c',
    sobrecargado: '#b83232',
    fragil: '#8b6914',
  }
  return colors[profile]
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
