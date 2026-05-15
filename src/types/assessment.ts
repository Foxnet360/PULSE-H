/**
 * PULSO-H Assessment Types
 * Core type definitions for the wellness assessment engine
 */

// Likert scale response (0-6)
export type LikertResponse = 0 | 1 | 2 | 3 | 4 | 5 | 6

// Module identifiers
export type ModuleId = 
  | 'energia'      // Agotamiento Emocional
  | 'conexion'     // Despersonalización
  | 'proposito'    // Realización Personal
  | 'entorno'      // Factores Organizacionales
  | 'equilibrio'   // Conciliación Vida-Trabajo
  | 'fortaleza'    // Recursos de Resiliencia

// Burnout profiles
export type BurnoutProfile =
  | 'floreciente'
  | 'estable'
  | 'resiliente'
  | 'requete'
  | 'sobrecargado'
  | 'fragil'

// Risk levels
export type RiskLevel = 'bajo' | 'moderado' | 'alto'

// IRP Zones
export type IRPZone = 'verde' | 'amarilla' | 'naranja' | 'roja'

// Individual assessment item
export interface AssessmentItem {
  id: string
  moduleId: ModuleId
  text: string
  reversed?: boolean // For items where lower score is better
}

// Module definition
export interface AssessmentModule {
  id: ModuleId
  title: string
  description: string
  items: AssessmentItem[]
  color: string
  icon: string
}

// User response for a single item
export interface ItemResponse {
  itemId: string
  value: LikertResponse | null
}

// Complete user assessment
export interface UserAssessment {
  id: string
  evaluationHash: string
  demographicData?: DemographicData
  responses: ItemResponse[]
  completedAt?: Date
  startedAt: Date
}

// Demographic information (optional, anonymous)
export interface DemographicData {
  area?: string
  role?: string
  seniority?: string
  gender?: string
  ageRange?: string
}

// Subscale scores (MBI-HSS)
export interface SubscaleScores {
  ae: number // Agotamiento Emocional (0-36)
  dp: number // Despersonalización (0-30)
  rp: number // Realización Personal (0-36)
}

// Custom dimension scores (PULSO-H)
export interface CustomDimensionScores {
  for: number // Factores Organizacionales (0-100)
  cvt: number // Conciliación Vida-Trabajo (0-100)
  rri: number // Recursos de Resiliencia (0-100)
}

// Complete dimension scores
export interface DimensionScores extends SubscaleScores, CustomDimensionScores {}

// Risk interpretation for a dimension
export interface DimensionInterpretation {
  score: number
  rawScore: number
  level: RiskLevel
  label: string
  description: string
}

// Complete assessment result
export interface AssessmentResult {
  id: string
  profile: BurnoutProfile
  profileName: string
  profileDescription: string
  irp: number
  irpZone: IRPZone
  irpLabel: string
  irpDescription: string
  dimensions: Record<string, DimensionInterpretation>
  subscales: {
    ae: DimensionInterpretation
    dp: DimensionInterpretation
    rp: DimensionInterpretation
  }
  customDimensions: {
    for: DimensionInterpretation
    cvt: DimensionInterpretation
    rri: DimensionInterpretation
  }
  timestamp: Date
}

// Recommendation/Intervention
export interface Intervention {
  id: string
  title: string
  description: string
  dimension: ModuleId | 'general'
  level: RiskLevel
  type: 'immediate' | 'short' | 'medium'
  duration: string
  difficulty: 'facil' | 'medio' | 'dificil'
  evidence: string
  evidenceSource: string
  requiresConsulting: boolean
  actions: string[]
}

// Gamification
export interface GamificationState {
  points: number
  badges: Badge[]
  level: number
  levelName: string
  assessmentsCompleted: number
  interventionsViewed: number
  pdfsDownloaded: number
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  earnedAt: Date
}

// Evaluation configuration (for organizations)
export interface EvaluationConfig {
  id: string
  hash: string
  organizationName: string
  sector?: string
  expectedParticipants: number
  demographicFields: string[]
  customMessage?: string
  deadline?: Date
  status: 'active' | 'closed' | 'pending'
  createdAt: Date
}

// Organization-level aggregated results
export interface OrganizationResults {
  evaluationId: string
  totalParticipants: number
  expectedParticipants: number
  averageIRP: number
  irpDistribution: Record<IRPZone, number>
  profileDistribution: Record<BurnoutProfile, number>
  areaResults: AreaResult[]
  demographicResults: DemographicResult[]
  clusters: ClusterResult[]
  timestamp: Date
}

export interface AreaResult {
  area: string
  participantCount: number
  averageIRP: number
  dimensions: Record<string, number>
}

export interface DemographicResult {
  field: string
  value: string
  participantCount: number
  averageIRP: number
}

export interface ClusterResult {
  id: number
  name: string
  size: number
  percentage: number
  centroid: Record<string, number>
  dominantProfile: BurnoutProfile
}

// Benchmark data
export interface BenchmarkData {
  sector: string
  averageIRP: number
  percentile25: number
  percentile50: number
  percentile75: number
  sampleSize: number
}

// Action Plan (PAP)
export interface ActionPlan {
  immediate: Intervention
  short: Intervention
  medium: Intervention
}
