import { Intervention, BurnoutProfile, RiskLevel } from '../types/assessment'

// Evidence-based interventions library
export const interventions: Intervention[] = [
  // Immediate actions (can be done today, < 5 min)
  {
    id: 'breathing-4-7-8',
    title: 'Respiración 4-7-8',
    description: 'Técnica de respiración para reducir el estrés agudo y activar el sistema parasimpático.',
    dimension: 'energia',
    level: 'alto',
    type: 'immediate',
    duration: '2 minutos',
    difficulty: 'facil',
    evidence: 'Reduce cortisol en 15% después de 2 minutos',
    evidenceSource: 'Grossman et al., 2004',
    requiresConsulting: false,
    actions: [
      'Inhala por la nariz contando 4 segundos',
      'Mantén el aire contando 7 segundos',
      'Exhala por la boca contando 8 segundos',
      'Repite 4 ciclos',
    ],
  },
  {
    id: 'gratitude-journal',
    title: 'Diario de Gratitud Laboral',
    description: 'Escribe 3 cosas positivas de tu trabajo cada día para cambiar el foco mental.',
    dimension: 'proposito',
    level: 'moderado',
    type: 'immediate',
    duration: '5 minutos',
    difficulty: 'facil',
    evidence: 'Aumenta bienestar subjetivo en 25% después de 2 semanas',
    evidenceSource: 'Emmons & McCullough, 2003',
    requiresConsulting: false,
    actions: [
      'Encuentra un cuaderno o app de notas',
      'Escribe 3 cosas buenas de tu día laboral',
      'Sé específico: "La reunión con María resolvió el problema X"',
      'Hazlo a la misma hora cada día',
    ],
  },
  {
    id: 'digital-boundaries',
    title: 'Límites de Disponibilidad Digital',
    description: 'Configura horarios de no-disponibilidad en email y mensajería para proteger tu tiempo personal.',
    dimension: 'equilibrio',
    level: 'alto',
    type: 'immediate',
    duration: '10 minutos',
    difficulty: 'facil',
    evidence: 'Mejora conciliación vida-trabajo en 31%',
    evidenceSource: 'Park et al., 2020',
    requiresConsulting: false,
    actions: [
      'Configura "No molestar" en tu celular después de horario',
      'Activa respuesta automática en email fuera de horario',
      'Comunícale a tu equipo tus horarios de disponibilidad',
      'Desactiva notificaciones de trabajo en tiempo personal',
    ],
  },

  // Short-term actions (this week, < 30 min)
  {
    id: 'micro-breaks',
    title: 'Micro-pausas Estructuradas',
    description: 'Toma 5 minutos de descanso cada 90 minutos de trabajo para recuperar energía.',
    dimension: 'energia',
    level: 'moderado',
    type: 'short',
    duration: '5 min cada 90 min',
    difficulty: 'facil',
    evidence: 'Reduce agotamiento emocional en 18%',
    evidenceSource: 'Trougakos et al., 2014',
    requiresConsulting: false,
    actions: [
      'Setea un timer cada 90 minutos',
      'Levántate y estira el cuerpo',
      'Mira a la distancia (regla 20-20-20 para ojos)',
      'Toma agua o un breve paseo',
    ],
  },
  {
    id: 'conversation-leader',
    title: 'Conversación con tu Líder',
    description: 'Template para conversar sobre carga laboral y expectativas con tu supervisor.',
    dimension: 'entorno',
    level: 'alto',
    type: 'short',
    duration: '30 minutos',
    difficulty: 'medio',
    evidence: 'Mejora claridad de roles y reduce estrés',
    evidenceSource: 'Bakker & Demerouti, 2017',
    requiresConsulting: false,
    actions: [
      'Programa una reunión de 30 minutos',
      'Prepara 3 puntos específicos: carga, prioridades, apoyo',
      'Usa lenguaje no acusatorio: "Necesito claridad sobre..."',
      'Propón soluciones, no solo problemas',
    ],
  },

  // Medium-term actions (this month, requires planning)
  {
    id: 'job-crafting',
    title: 'Job Crafting Personal',
    description: 'Rediseña pequeños aspectos de tu rol para alinearlo con tus fortalezas.',
    dimension: 'proposito',
    level: 'moderado',
    type: 'medium',
    duration: '1 mes',
    difficulty: 'medio',
    evidence: 'Aumenta engagement en 30% y reduce burnout',
    evidenceSource: 'Wrzesniewski et al., 2013',
    requiresConsulting: false,
    actions: [
      'Identifica tus 3 fortalezas principales',
      'Analiza qué tareas las usan y cuáles no',
      'Propón intercambiar 1-2 tareas con un colega',
      'Busca proyectos que alineen con tus fortalezas',
    ],
  },

  // Organization-level interventions (require consulting)
  {
    id: 'workload-redistribution',
    title: 'Redistribución de Carga Laboral',
    description: 'Análisis y redistribución de cargas de trabajo por área para equilibrar demandas.',
    dimension: 'entorno',
    level: 'alto',
    type: 'medium',
    duration: '2-4 semanas',
    difficulty: 'dificil',
    evidence: 'Reduce AE en 25% cuando se implementa correctamente',
    evidenceSource: 'Leiter & Maslach, 2009',
    requiresConsulting: true,
    actions: [
      'Auditar carga de trabajo por posición',
      'Identificar cuellos de botella',
      'Redistribuir tareas según capacidades',
      'Implementar pausas activas obligatorias',
    ],
  },
  {
    id: 'leadership-training',
    title: 'Capacitación en Liderazgo para Bienestar',
    description: 'Programa de formación para managers en detección y conversación sobre bienestar.',
    dimension: 'entorno',
    level: 'alto',
    type: 'medium',
    duration: '3 meses',
    difficulty: 'dificil',
    evidence: 'Reduce burnout organizacional en 20%',
    evidenceSource: 'Skakon et al., 2010',
    requiresConsulting: true,
    actions: [
      'Taller de detección de señales de alerta',
      'Práctica de conversaciones difíciles',
      'Establecimiento de 1:1s regulares',
      'Feedback específico y frecuente',
    ],
  },
]

// Get interventions by profile and dimensions
export const getRecommendedInterventions = (
  _profile: BurnoutProfile,
  dimensions: Record<string, { level: RiskLevel }>
): { immediate: Intervention; short: Intervention; medium: Intervention } => {
  // Filter by highest risk dimensions
  const highRiskDimensions = Object.entries(dimensions)
    .filter(([, value]) => value.level === 'alto')
    .map(([key]) => key)

  const moderateRiskDimensions = Object.entries(dimensions)
    .filter(([, value]) => value.level === 'moderado')
    .map(([key]) => key)

  // Get matching interventions
  const getIntervention = (type: 'immediate' | 'short' | 'medium'): Intervention => {
    // First try high risk dimensions
    let matches = interventions.filter(
      i => i.type === type && 
      (highRiskDimensions.includes(i.dimension) || i.dimension === 'general')
    )

    // If no matches, try moderate risk
    if (matches.length === 0) {
      matches = interventions.filter(
        i => i.type === type && 
        (moderateRiskDimensions.includes(i.dimension) || i.dimension === 'general')
      )
    }

    // If still no matches, return any of that type
    if (matches.length === 0) {
      matches = interventions.filter(i => i.type === type)
    }

    // Return first match (could be randomized or scored in future)
    return matches[0] || interventions.find(i => i.type === type)!
  }

  return {
    immediate: getIntervention('immediate'),
    short: getIntervention('short'),
    medium: getIntervention('medium'),
  }
}
