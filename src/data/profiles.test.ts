import { describe, it, expect } from 'vitest'
import { getProfileByKey, getProfileDisplayName, getProfileColor, profiles } from './profiles'

describe('profiles', () => {
  it('contains all six canonical profile keys', () => {
    const keys = profiles.map(p => p.key)
    expect(keys).toEqual([
      'floreciente',
      'estable',
      'resiliente',
      'requete',
      'sobrecargado',
      'fragil',
    ])
  })

  it('returns the canonical display name for sobrecargado', () => {
    expect(getProfileDisplayName('sobrecargado')).toBe('Sobrecargadx')
  })

  it('returns undefined for unknown profile key', () => {
    expect(getProfileByKey('unknown' as never)).toBeUndefined()
    expect(getProfileDisplayName('unknown' as never)).toBeUndefined()
  })

  it('returns the canonical color for each profile', () => {
    expect(getProfileColor('floreciente')).toBe('#4a7c59')
    expect(getProfileColor('sobrecargado')).toBe('#b83232')
    expect(getProfileColor('fragil')).toBe('#8b6914')
  })
})
