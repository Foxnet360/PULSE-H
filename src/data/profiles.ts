import type { BurnoutProfile } from '../types/assessment'

export interface ProfileDefinition {
  key: BurnoutProfile
  name: string
  description: string
  prevalence: string
  color: string
}

export const profiles: ProfileDefinition[] = [
  {
    key: 'floreciente',
    name: 'Floreciente',
    description: 'Tienes altos niveles de bienestar, realización y energía. Tu relación con el trabajo es positiva y sostenible.',
    prevalence: '~15%',
    color: '#4a7c59',
  },
  {
    key: 'estable',
    name: 'Estable',
    description: 'Mantienes un balance razonable. Hay áreas de mejora, pero en general manejas bien las demandas laborales.',
    prevalence: '~20%',
    color: '#627d98',
  },
  {
    key: 'resiliente',
    name: 'Resiliente',
    description: 'A pesar de la presión, mantienes una buena actitud y encuentras sentido en tu trabajo.',
    prevalence: '~18%',
    color: '#5c8a9a',
  },
  {
    key: 'requete',
    name: 'Requete',
    description: 'Sientes agotamiento y desconexión. Es importante tomar acciones preventivas ahora.',
    prevalence: '~22%',
    color: '#c9872c',
  },
  {
    key: 'sobrecargado',
    name: 'Sobrecargadx',
    description: 'Estás en una situación de alto riesgo. Necesitas atención inmediata y apoyo profesional.',
    prevalence: '~15%',
    color: '#b83232',
  },
  {
    key: 'fragil',
    name: 'Funcional pero Frágil',
    description: 'Mantienes el funcionamiento, pero tus recursos están muy limitados.',
    prevalence: '~10%',
    color: '#8b6914',
  },
]

const profileMap = new Map(profiles.map(p => [p.key, p]))

export const getProfileByKey = (key: BurnoutProfile): ProfileDefinition | undefined => {
  return profileMap.get(key)
}

export const getProfileDisplayName = (key: BurnoutProfile): string | undefined => {
  return profileMap.get(key)?.name
}

export const getProfileColor = (key: BurnoutProfile): string => {
  return profileMap.get(key)?.color ?? '#627d98'
}

export const getProfileDescription = (key: BurnoutProfile): string | undefined => {
  return profileMap.get(key)?.description
}
